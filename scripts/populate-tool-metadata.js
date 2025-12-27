/**
 * Script to populate missing metadata fields in seo_tool_pages table
 *
 * Fills in:
 * - og_image_url (custom tool-specific images)
 * - seo_keywords (tool-specific keywords)
 * - screenshots (placeholder for tool screenshots)
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '../backend/.env' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

/**
 * Tool-specific keyword mappings
 */
const TOOL_KEYWORDS = {
  'quiz-generator': ['quiz generator', 'create quizzes', 'test maker', 'quiz builder', 'ai quiz', 'practice tests', 'assessment tool'],
  'flashcards': ['flashcards', 'study cards', 'memorization', 'spaced repetition', 'active recall', 'flash card maker'],
  'practice-tests': ['practice tests', 'mock exams', 'test prep', 'exam simulator', 'practice questions', 'assessment'],
  'study-timer': ['study timer', 'pomodoro timer', 'focus timer', 'productivity timer', 'time management', 'study sessions'],
  'math-solver': ['math solver', 'math help', 'equation solver', 'step-by-step solutions', 'ai math tutor', 'calculator'],
  'draw-sketch': ['drawing tool', 'sketch tool', 'visual learning', 'diagrams', 'mind maps', 'visual notes'],
  'habit-tracker': ['habit tracker', 'study habits', 'routine tracker', 'goal tracking', 'productivity habits'],
  'notes-sync': ['note taking', 'cornell notes', 'study notes', 'note organization', 'digital notes'],
  'ai-planner': ['study planner', 'ai scheduler', 'study schedule', 'time management', 'study plan generator'],
  'goal-setter': ['goal setting', 'academic goals', 'study goals', 'progress tracking', 'achievement tracker'],
  'study-music': ['study music', 'focus music', 'concentration music', 'lo-fi beats', 'productivity music'],
  'image-analysis': ['image analysis', 'homework help', 'photo solver', 'scan homework', 'ocr tool'],
  'science-lab': ['science lab', 'virtual experiments', 'science simulations', 'interactive learning'],
  'visual-learning': ['visual learning', 'mind maps', 'concept maps', 'flowcharts', 'diagram maker'],
  'explain-concept': ['concept explanation', 'ai tutor', 'learning assistant', 'explain topics', 'study help']
};

/**
 * Generate OG image path for tool (assumes images will be created)
 */
function generateToolOgImage(slug) {
  return `/assets/tools/og/${slug}-og.png`;
}

/**
 * Main function to populate tool metadata
 */
async function populateToolMetadata() {
  console.log('🚀 Starting tool metadata population...\n');

  try {
    // Fetch all tool pages
    const { data: tools, error } = await supabase
      .from('seo_tool_pages')
      .select('*');

    if (error) {
      console.error('❌ Error fetching tools:', error);
      return;
    }

    console.log(`📊 Found ${tools.length} tool pages\n`);

    let updatedCount = 0;

    for (const tool of tools) {
      const updates = {};
      let needsUpdate = false;

      // 1. Populate seo_keywords if missing or empty
      if (!tool.seo_keywords || tool.seo_keywords.length === 0) {
        updates.seo_keywords = TOOL_KEYWORDS[tool.slug] || [
          tool.title.toLowerCase(),
          'study tool',
          'ai learning',
          'student tools'
        ];
        needsUpdate = true;
      }

      // 2. Set og_image_url if missing (note: actual images need to be created separately)
      if (!tool.og_image_url) {
        updates.og_image_url = generateToolOgImage(tool.slug);
        needsUpdate = true;
        console.log(`ℹ️  Note: Create OG image at public${updates.og_image_url}`);
      }

      // 3. Set placeholder screenshots if empty
      if (!tool.screenshots || tool.screenshots.length === 0) {
        updates.screenshots = [
          {
            url: `/assets/tools/screenshots/${tool.slug}-1.png`,
            alt: `${tool.title} - Main Interface`,
            caption: 'Intuitive and easy-to-use interface'
          },
          {
            url: `/assets/tools/screenshots/${tool.slug}-2.png`,
            alt: `${tool.title} - Features`,
            caption: 'Powerful features for effective learning'
          }
        ];
        needsUpdate = true;
        console.log(`ℹ️  Note: Create screenshots at public/assets/tools/screenshots/`);
      }

      // Update if any fields need updating
      if (needsUpdate) {
        const { error: updateError } = await supabase
          .from('seo_tool_pages')
          .update(updates)
          .eq('id', tool.id);

        if (updateError) {
          console.error(`❌ Error updating tool "${tool.title}":`, updateError);
        } else {
          console.log(`✅ Updated: ${tool.title}`);
          if (updates.seo_keywords) {
            console.log(`   Keywords: ${updates.seo_keywords.slice(0, 4).join(', ')}...`);
          }
          updatedCount++;
        }
      } else {
        console.log(`⏭️  Skipped (already complete): ${tool.title}`);
      }
    }

    console.log(`\n✨ Tool metadata population complete!`);
    console.log(`📈 Updated ${updatedCount} out of ${tools.length} tools`);

    console.log(`\n📝 TODO: Create actual OG images and screenshots for tools`);
    console.log(`   - Size for OG images: 1200x630px`);
    console.log(`   - Size for screenshots: 1280x720px or larger`);
    console.log(`   - Location: /root/inspir/nextjs-seo/public/assets/tools/`);

  } catch (err) {
    console.error('💥 Unexpected error:', err);
  }
}

// Run the script
populateToolMetadata();
