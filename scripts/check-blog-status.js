import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '../backend/.env' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkBlogStatus() {
  // Get all posts
  const { data: allPosts, error } = await supabase
    .from('seo_blog_posts')
    .select('id, title, status');

  if (error) {
    console.error('Error:', error);
    return;
  }

  // Count by status
  const published = allPosts.filter(p => p.status === 'published').length;
  const draft = allPosts.filter(p => p.status === 'draft').length;
  const total = allPosts.length;

  console.log('📊 BLOG POST STATUS REPORT\n');
  console.log(`Total Posts: ${total}/58 (target)`);
  console.log(`  ✅ Published: ${published}`);
  console.log(`  📝 Draft: ${draft}`);
  console.log(`\nCompletion: ${Math.round(published/58*100)}%`);
  console.log(`Gap: ${58 - total} posts need to be created`);

  if (draft > 0) {
    console.log(`\n📝 Draft Posts Ready for Writing:`);
    allPosts.filter(p => p.status === 'draft').forEach((post, i) => {
      console.log(`  ${i+1}. ${post.title}`);
    });
  }
}

checkBlogStatus();
