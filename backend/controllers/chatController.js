import Anthropic from '@anthropic-ai/sdk';
import { supabase } from '../utils/supabaseClient.js';
import { contentModeration } from '../utils/contentModeration.js';
import dotenv from 'dotenv';

dotenv.config();

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Generate session ID from request (IP-based for now)
const getSessionId = (req) => {
  // Use IP address + user agent as session identifier
  const ip = req.ip || req.connection.remoteAddress;
  const userAgent = req.headers['user-agent'] || '';
  return `session_${Buffer.from(ip + userAgent).toString('base64').slice(0, 32)}`;
};

// CREATE new conversation
export const createConversation = async (req, res) => {
  try {
    console.log('📝 Creating new conversation...');
    const sessionId = getSessionId(req);
    console.log(`   Session ID: ${sessionId}`);
    const { title = 'New Chat', folder = 'general' } = req.body;
    console.log(`   Title: ${title}, Folder: ${folder}`);

    const { data, error } = await supabase
      .from('chat_conversations')
      .insert([
        {
          session_id: sessionId,
          title,
          folder,
          is_pinned: false
        }
      ])
      .select()
      .single();

    if (error) {
      console.error('❌ Supabase error:', error);
      throw error;
    }

    console.log('✅ Conversation created:', data.id);
    res.status(201).json(data);
  } catch (error) {
    console.error('💥 Error creating conversation:', error.message);
    console.error('   Details:', error);
    res.status(500).json({ error: 'Failed to create conversation', details: error.message });
  }
};

// GET all conversations for session
export const getConversations = async (req, res) => {
  try {
    console.log('📋 Fetching conversations...');
    const sessionId = getSessionId(req);
    console.log(`   Session ID: ${sessionId}`);

    const { data, error } = await supabase
      .from('chat_conversations')
      .select('*')
      .eq('session_id', sessionId)
      .order('updated_at', { ascending: false });

    if (error) {
      console.error('❌ Supabase error:', error);
      throw error;
    }

    console.log(`✅ Found ${data?.length || 0} conversations`);
    res.json(data || []);
  } catch (error) {
    console.error('💥 Error fetching conversations:', error.message);
    console.error('   Details:', error);
    res.status(500).json({ error: 'Failed to fetch conversations', details: error.message });
  }
};

// GET messages for a conversation
export const getMessages = async (req, res) => {
  try {
    const { id } = req.params;

    const { data, error } = await supabase
      .from('chat_messages')
      .select('*')
      .eq('conversation_id', id)
      .order('created_at', { ascending: true });

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error fetching messages:', error);
    res.status(500).json({ error: 'Failed to fetch messages' });
  }
};

// SEND message with SSE streaming
export const sendMessage = async (req, res) => {
  try {
    const { id: conversationId } = req.params;
    const {
      content,
      ageFilter = 'teen',
      isRegeneration = false,
      previousResponseId = null
    } = req.body;

    if (!content || !content.trim()) {
      return res.status(400).json({ error: 'Message content is required' });
    }

    // Content moderation check
    const moderationResult = contentModeration.shouldBlock(content, ageFilter);
    if (moderationResult.blocked) {
      return res.status(400).json({
        error: 'Content blocked',
        reason: moderationResult.reason,
        message: moderationResult.message
      });
    }

    // Check for flagged content
    const flags = contentModeration.checkFlagged(content);

    // Save user message
    const { data: userMessage, error: userMsgError } = await supabase
      .from('chat_messages')
      .insert([
        {
          conversation_id: conversationId,
          role: 'user',
          content: content.trim(),
          was_flagged: flags.length > 0,
          moderation_reason: flags.join(', ') || null
        }
      ])
      .select()
      .single();

    if (userMsgError) throw userMsgError;

    // Get conversation history (last 20 messages)
    const { data: history, error: historyError } = await supabase
      .from('chat_messages')
      .select('role, content')
      .eq('conversation_id', conversationId)
      .order('created_at', { ascending: false })
      .limit(20);

    if (historyError) throw historyError;

    // Prepare messages for Claude (reverse to chronological order)
    const messages = history.reverse().map(msg => ({
      role: msg.role,
      content: msg.content
    }));

    // Prepare system prompt with regeneration context if needed
    let systemPrompt = contentModeration.getSystemPrompt(ageFilter);
    if (isRegeneration) {
      systemPrompt += '\n\nNote: The user was not satisfied with the previous response and requested a regeneration. Please provide a different, improved answer with a fresh perspective and approach.';
    }

    // Setup SSE
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    // Stream response from Claude
    let fullResponse = '';
    let tokenCount = 0;

    const stream = await anthropic.messages.stream({
      model: process.env.ANTHROPIC_MODEL || 'claude-sonnet-4-5-20250929',
      max_tokens: 4096,
      system: systemPrompt,
      messages: messages
    });

    // Handle streaming
    stream.on('text', (text) => {
      fullResponse += text;
      res.write(`data: ${JSON.stringify({ type: 'content', text })}\n\n`);
    });

    stream.on('message', (message) => {
      tokenCount = message.usage?.output_tokens || 0;
    });

    stream.on('end', async () => {
      // Save assistant message
      const { data: assistantMessage, error: assistantMsgError } = await supabase
        .from('chat_messages')
        .insert([
          {
            conversation_id: conversationId,
            role: 'assistant',
            content: fullResponse,
            tokens_used: tokenCount
          }
        ])
        .select()
        .single();

      if (assistantMsgError) {
        console.error('Error saving assistant message:', assistantMsgError);
      }

      // Update conversation title if it's the first exchange
      if (messages.length <= 2) {
        const title = content.slice(0, 50) + (content.length > 50 ? '...' : '');
        await supabase
          .from('chat_conversations')
          .update({ title })
          .eq('id', conversationId);
      }

      res.write(`data: ${JSON.stringify({
        type: 'done',
        messageId: assistantMessage?.id,
        tokens: tokenCount
      })}\n\n`);
      res.end();
    });

    stream.on('error', (error) => {
      console.error('Streaming error:', error);
      res.write(`data: ${JSON.stringify({ type: 'error', message: 'Streaming failed' })}\n\n`);
      res.end();
    });

  } catch (error) {
    console.error('Error sending message:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: 'Failed to send message' });
    }
  }
};

// UPDATE conversation (title, folder, pin status)
export const updateConversation = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const { data, error } = await supabase
      .from('chat_conversations')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;

    res.json(data);
  } catch (error) {
    console.error('Error updating conversation:', error);
    res.status(500).json({ error: 'Failed to update conversation' });
  }
};

// DELETE conversation
export const deleteConversation = async (req, res) => {
  try {
    const { id } = req.params;

    const { error } = await supabase
      .from('chat_conversations')
      .delete()
      .eq('id', id);

    if (error) throw error;

    res.json({ message: 'Conversation deleted successfully' });
  } catch (error) {
    console.error('Error deleting conversation:', error);
    res.status(500).json({ error: 'Failed to delete conversation' });
  }
};

// SEARCH messages
export const searchMessages = async (req, res) => {
  try {
    const sessionId = getSessionId(req);
    const { query } = req.query;

    if (!query) {
      return res.status(400).json({ error: 'Search query is required' });
    }

    // Get all conversations for this session
    const { data: conversations, error: convError } = await supabase
      .from('chat_conversations')
      .select('id')
      .eq('session_id', sessionId);

    if (convError) throw convError;

    const conversationIds = conversations.map(c => c.id);

    // Search messages
    const { data, error } = await supabase
      .from('chat_messages')
      .select('*, conversation:chat_conversations(title)')
      .in('conversation_id', conversationIds)
      .textSearch('content', query)
      .order('created_at', { ascending: false })
      .limit(50);

    if (error) throw error;

    res.json(data || []);
  } catch (error) {
    console.error('Error searching messages:', error);
    res.status(500).json({ error: 'Failed to search messages' });
  }
};
