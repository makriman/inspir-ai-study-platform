/**
 * Verify Blog Posts Script
 * Checks that all blog posts were inserted correctly
 */

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

dotenv.config({ path: './.env' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function verifyBlogPosts() {
  console.log('Verifying blog posts...\n');

  const { data: posts, error } = await supabase
    .from('seo_blog_posts')
    .select(`
      id,
      title,
      slug,
      status,
      featured,
      avg_read_time_minutes,
      published_at,
      seo_authors (name, role),
      seo_blog_categories (name, slug)
    `)
    .order('published_at', { ascending: false });

  if (error) {
    console.error('Error fetching posts:', error);
    return;
  }

  console.log(`Found ${posts.length} blog posts:\n`);

  posts.forEach((post, index) => {
    console.log(`${index + 1}. ${post.title}`);
    console.log(`   Slug: ${post.slug}`);
    console.log(`   Author: ${post.seo_authors?.name} (${post.seo_authors?.role})`);
    console.log(`   Category: ${post.seo_blog_categories?.name}`);
    console.log(`   Status: ${post.status}${post.featured ? ' (FEATURED)' : ''}`);
    console.log(`   Read time: ${post.avg_read_time_minutes} min`);
    console.log(`   Published: ${new Date(post.published_at).toLocaleDateString()}`);
    console.log('');
  });
}

verifyBlogPosts();
