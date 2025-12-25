import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: './backend/.env' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyPosts() {
  console.log('Checking blog posts status...\n');

  const { data: posts, error } = await supabase
    .from('seo_blog_posts')
    .select('id, title, slug, status, published_at')
    .order('created_at', { ascending: false });

  if (error) {
    console.error('Error:', error);
    return;
  }

  console.log(`Found ${posts.length} total posts:\n`);
  posts.forEach(post => {
    console.log(`  Title: ${post.title}`);
    console.log(`  Slug: ${post.slug}`);
    console.log(`  Status: ${post.status}`);
    console.log(`  Published: ${post.published_at || 'Not set'}`);
    console.log('');
  });

  const published = posts.filter(p => p.status === 'published');
  console.log(`\n📊 Summary: ${published.length} published, ${posts.length - published.length} not published`);
}

verifyPosts().then(() => process.exit(0));
