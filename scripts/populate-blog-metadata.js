/**
 * Script to populate missing metadata fields in seo_blog_posts table
 *
 * Fills in:
 * - seo_keywords (extracted from title/content)
 * - canonical_url (based on slug)
 * - og_image_alt (based on title)
 * - avg_read_time_minutes (calculated from word count)
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '../backend/.env' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const BASE_URL = 'https://inspir.uk';

/**
 * Extract keywords from title and content
 */
function extractKeywords(title, content, categoryName) {
  const keywords = new Set();

  // Add category-related keywords
  if (categoryName) {
    keywords.add(categoryName.toLowerCase());
  }

  // Common educational keywords
  const educationalTerms = [
    'study', 'learning', 'students', 'education', 'techniques',
    'strategies', 'tips', 'guide', 'help', 'tutorial', 'method'
  ];

  // Extract from title
  const titleWords = title.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 3);

  titleWords.forEach(word => {
    if (!['this', 'that', 'with', 'from', 'have', 'your', 'their'].includes(word)) {
      keywords.add(word);
    }
  });

  // Extract from content (look for frequently used words)
  const contentWords = content.toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(word => word.length > 4);

  const wordFreq = {};
  contentWords.forEach(word => {
    if (educationalTerms.includes(word) || titleWords.includes(word)) {
      wordFreq[word] = (wordFreq[word] || 0) + 1;
    }
  });

  // Add top 5 most frequent relevant words
  Object.entries(wordFreq)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .forEach(([word]) => keywords.add(word));

  return Array.from(keywords).slice(0, 10); // Max 10 keywords
}

/**
 * Calculate average read time based on word count
 * Average reading speed: 200-250 words per minute
 */
function calculateReadTime(content) {
  const wordCount = content.split(/\s+/).length;
  const minutes = Math.ceil(wordCount / 225); // 225 words per minute average
  return Math.max(1, Math.min(minutes, 30)); // Clamp between 1-30 minutes
}

/**
 * Generate OG image alt text from title
 */
function generateOgImageAlt(title) {
  return `${title} - inspir Blog Post Cover Image`;
}

/**
 * Main function to populate missing metadata
 */
async function populateBlogMetadata() {
  console.log('🚀 Starting blog metadata population...\n');

  try {
    // Fetch all blog posts with their categories
    const { data: posts, error } = await supabase
      .from('seo_blog_posts')
      .select(`
        id,
        title,
        slug,
        content,
        seo_keywords,
        canonical_url,
        og_image_alt,
        avg_read_time_minutes,
        category:seo_blog_categories(name)
      `)
      .eq('status', 'published');

    if (error) {
      console.error('❌ Error fetching posts:', error);
      return;
    }

    console.log(`📊 Found ${posts.length} published posts\n`);

    let updatedCount = 0;

    for (const post of posts) {
      const updates = {};
      let needsUpdate = false;

      // 1. Populate seo_keywords if missing or empty
      if (!post.seo_keywords || post.seo_keywords.length === 0) {
        updates.seo_keywords = extractKeywords(
          post.title,
          post.content,
          post.category?.name
        );
        needsUpdate = true;
      }

      // 2. Set canonical_url if missing
      if (!post.canonical_url) {
        updates.canonical_url = `${BASE_URL}/blog/${post.slug}`;
        needsUpdate = true;
      }

      // 3. Set og_image_alt if missing
      if (!post.og_image_alt) {
        updates.og_image_alt = generateOgImageAlt(post.title);
        needsUpdate = true;
      }

      // 4. Calculate read time if missing or zero
      if (!post.avg_read_time_minutes || post.avg_read_time_minutes === 0) {
        updates.avg_read_time_minutes = calculateReadTime(post.content);
        needsUpdate = true;
      }

      // Update if any fields need updating
      if (needsUpdate) {
        const { error: updateError } = await supabase
          .from('seo_blog_posts')
          .update(updates)
          .eq('id', post.id);

        if (updateError) {
          console.error(`❌ Error updating post "${post.title}":`, updateError);
        } else {
          console.log(`✅ Updated: ${post.title}`);
          if (updates.seo_keywords) {
            console.log(`   Keywords: ${updates.seo_keywords.slice(0, 5).join(', ')}...`);
          }
          if (updates.avg_read_time_minutes) {
            console.log(`   Read time: ${updates.avg_read_time_minutes} min`);
          }
          updatedCount++;
        }
      } else {
        console.log(`⏭️  Skipped (already complete): ${post.title}`);
      }
    }

    console.log(`\n✨ Metadata population complete!`);
    console.log(`📈 Updated ${updatedCount} out of ${posts.length} posts`);

  } catch (err) {
    console.error('💥 Unexpected error:', err);
  }
}

// Run the script
populateBlogMetadata();
