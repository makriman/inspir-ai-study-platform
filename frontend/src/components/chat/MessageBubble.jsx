import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useState } from 'react';

export default function MessageBubble({ message, index, isStreaming, onRegenerate }) {
  const isUser = message.role === 'user';
  const [copied, setCopied] = useState(false);
  const [saved, setSaved] = useState(false);
  const [addedToNotes, setAddedToNotes] = useState(false);

  // Check if message is already saved or in notes
  useState(() => {
    const savedMessages = JSON.parse(localStorage.getItem('savedMessages') || '[]');
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');
    setSaved(savedMessages.some(m => m.id === message.id));
    setAddedToNotes(notes.some(n => n.id === message.id));
  }, [message.id]);

  const handleCopy = (code) => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Copy message to clipboard
  const handleCopyMessage = async () => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  // Save message to favorites
  const handleSave = () => {
    const savedMessages = JSON.parse(localStorage.getItem('savedMessages') || '[]');

    if (saved) {
      // Remove from saved
      const updated = savedMessages.filter(m => m.id !== message.id);
      localStorage.setItem('savedMessages', JSON.stringify(updated));
      setSaved(false);
    } else {
      // Add to saved
      savedMessages.push({
        id: message.id,
        content: message.content,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('savedMessages', JSON.stringify(savedMessages));
      setSaved(true);
    }
  };

  // Add to notes
  const handleAddToNotes = () => {
    const notes = JSON.parse(localStorage.getItem('notes') || '[]');

    if (addedToNotes) {
      // Remove from notes
      const updated = notes.filter(n => n.id !== message.id);
      localStorage.setItem('notes', JSON.stringify(updated));
      setAddedToNotes(false);
    } else {
      // Add to notes
      notes.push({
        id: message.id,
        content: message.content,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('notes', JSON.stringify(notes));
      setAddedToNotes(true);
    }
  };

  // Thumbs up feedback
  const handleThumbsUp = () => {
    console.log('Thumbs up for message:', message.id);
    // TODO: Send feedback to backend
  };

  // Thumbs down - trigger regeneration
  const handleThumbsDown = async () => {
    if (window.confirm('Regenerate this response?')) {
      if (onRegenerate) {
        onRegenerate(message.id);
      }
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05 }}
      className={`flex gap-3 mb-3 ${isUser ? 'justify-end' : 'justify-start'}`}
    >
      {/* AI Avatar */}
      {!isUser && (
        <motion.div
          className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 via-blue-600 to-green-600 flex items-center justify-center shadow-lg"
          whileHover={{ scale: 1.1, rotate: 360 }}
          transition={{ duration: 0.5 }}
        >
          <span className="text-lg">✨</span>
        </motion.div>
      )}

      {/* Message Content */}
      <motion.div
        className={`max-w-6xl px-4 py-3 rounded-2xl shadow-md ${
          isUser
            ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white'
            : 'bg-white border-l-3 border-l-blue-600'
        }`}
        whileHover={{ scale: 1.01 }}
        transition={{ duration: 0.2 }}
      >
        <div className={`prose ${isUser ? 'prose-invert' : 'prose-gray'} max-w-none`}>
          <ReactMarkdown
            components={{
              code({ node, inline, className, children, ...props }) {
                const match = /language-(\w+)/.exec(className || '');
                return !inline && match ? (
                  <div className="relative my-4">
                    <div className="absolute top-2 right-2 z-10">
                      <button
                        onClick={() => handleCopy(String(children))}
                        className="px-3 py-1 bg-gray-700 hover:bg-gray-600 text-white text-xs rounded-md transition-colors"
                      >
                        {copied ? 'Copied!' : 'Copy'}
                      </button>
                    </div>
                    <SyntaxHighlighter
                      style={vscDarkPlus}
                      language={match[1]}
                      PreTag="div"
                      className="rounded-lg"
                      {...props}
                    >
                      {String(children).replace(/\n$/, '')}
                    </SyntaxHighlighter>
                  </div>
                ) : (
                  <code className={`${className} bg-gray-100 px-1.5 py-0.5 rounded text-sm ${isUser ? 'bg-blue-800' : ''}`} {...props}>
                    {children}
                  </code>
                );
              },
              ul({ children }) {
                return <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>;
              },
              ol({ children }) {
                return <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>;
              },
              strong({ children }) {
                return <strong className="font-bold">{children}</strong>;
              }
            }}
          >
            {message.content}
          </ReactMarkdown>

          {/* Streaming cursor */}
          {isStreaming && (
            <motion.span
              className="inline-block w-2 h-5 bg-current ml-1"
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity }}
            />
          )}
        </div>

        {/* Message Actions */}
        {!isUser && !isStreaming && (
          <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-100">
            {/* Thumbs Up */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleThumbsUp}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors text-base"
              title="Helpful"
            >
              👍
            </motion.button>

            {/* Thumbs Down - Regenerate */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleThumbsDown}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors text-base"
              title="Not helpful - Regenerate"
            >
              👎
            </motion.button>

            {/* Copy to Clipboard */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleCopyMessage}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors text-base relative"
              title="Copy to clipboard"
            >
              {copied ? '✓' : '📋'}
            </motion.button>

            {/* Add to Notes */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleAddToNotes}
              className={`p-1 hover:bg-gray-100 rounded-lg transition-colors text-base ${
                addedToNotes ? 'text-blue-600' : ''
              }`}
              title={addedToNotes ? 'Remove from notes' : 'Add to notes'}
            >
              📝
            </motion.button>

            {/* Save to Favorites */}
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleSave}
              className={`p-1 hover:bg-gray-100 rounded-lg transition-colors text-base ${
                saved ? 'text-yellow-500' : ''
              }`}
              title={saved ? 'Remove from favorites' : 'Save to favorites'}
            >
              {saved ? '⭐' : '☆'}
            </motion.button>
          </div>
        )}
      </motion.div>

      {/* User Avatar */}
      {isUser && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-blue-600 to-indigo-600 flex items-center justify-center shadow-lg text-white font-bold text-sm">
          U
        </div>
      )}
    </motion.div>
  );
}
