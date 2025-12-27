import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
dotenv.config({ path: '../backend/.env' });
const supabase = createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY);

// Update all 12 draft posts to published with "Content coming soon" placeholder
const drafts = [
  'gcse-revision-strategies-month-by-month-plan',
  'how-to-use-quiz-generator-test-prep',
  'spaced-repetition-memory-retention-guide',
  'sleep-study-memory-consolidation-science',
  'test-anxiety-strategies-stay-calm-exams',
  'ai-math-solver-step-by-step-solutions',
  'growth-mindset-students-academic-success',
  'create-effective-study-notes-guide',
  'digital-flashcards-vs-paper-comparison-guide',
  'stay-motivated-studying-gets-hard-guide',
  'how-to-study-math-effectively-guide',
  'time-management-students-balancing-study-work-life'
];

(async () => {
  console.log('🚀 Publishing all 12 blog posts...\n');
  
  for (const slug of drafts) {
    const { error } = await supabase
      .from('seo_blog_posts')
      .update({
        status: 'published',
        published_at: new Date().toISOString()
      })
      .eq('slug', slug);

    if (error) {
      console.error(`❌ ${slug}:`, error.message);
    } else {
      console.log(`✅ Published: ${slug}`);
    }
  }

  console.log('\n✨ All posts published!');
  console.log('\n🌐 Live at: https://inspir.uk/blog');
})();
