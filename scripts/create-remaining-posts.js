/**
 * Create the remaining blog posts that failed due to title length
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';

dotenv.config({ path: '../backend/.env' });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const REMAINING_POSTS = [
  {
    title: 'How to Create Effective Study Notes That Actually Work',
    slug: 'create-effective-study-notes-guide',
    category: 'Note-Taking',
    seoTitle: 'How to Take Study Notes: Systems That Improve Grades', // Shortened
    seoDescription: 'Master 5 note-taking systems (Cornell, outline, mapping) with examples. Learn what makes notes stick and how to organize them for easy review.',
    excerpt: 'Master the art of note-taking with 5 proven systems including Cornell notes, mind mapping, and digital strategies that boost comprehension and retention.',
    keywords: ['note taking', 'study notes', 'cornell notes', 'note-taking methods', 'study skills', 'organization', 'learning strategies'],
    readTime: 7
  },
  {
    title: 'Digital Flashcards vs Paper: Complete Comparison Guide',
    slug: 'digital-flashcards-vs-paper-comparison-guide',
    category: 'Tool Guides & Tutorials',
    seoTitle: 'Digital vs Paper Flashcards: Which Helps You Learn?', // Shortened
    seoDescription: 'Comprehensive comparison of digital and paper flashcards. Learn the pros/cons of each and which method works best for your learning style.',
    excerpt: 'Detailed comparison of digital and paper flashcards with scientific research on effectiveness, cost analysis, and recommendations for different learning styles.',
    keywords: ['flashcards', 'digital flashcards', 'paper flashcards', 'study cards', 'memorization', 'active recall', 'spaced repetition'],
    readTime: 7
  },
  {
    title: 'How to Stay Motivated When Studying Gets Hard',
    slug: 'stay-motivated-studying-gets-hard-guide',
    category: 'Productivity & Motivation',
    seoTitle: 'Study Motivation: Strategies When Learning Gets Tough', // Shortened
    seoDescription: 'Overcome study slumps with proven motivation techniques. Learn how to stay focused, maintain momentum, and achieve your academic goals.',
    excerpt: 'Practical strategies to overcome study motivation challenges using psychology-backed techniques. Learn how to maintain momentum when learning gets difficult.',
    keywords: ['study motivation', 'staying motivated', 'study tips', 'motivation strategies', 'overcoming procrastination', 'student productivity'],
    readTime: 8
  },
  {
    title: 'How to Study Math Effectively: Strategies from Experts',
    slug: 'how-to-study-math-effectively-guide',
    category: 'Subject-Specific Help',
    seoTitle: 'How to Study Math: 8 Proven Strategies & Tips', // Shortened
    seoDescription: 'Master math with expert strategies: problem-solving techniques, concept mastery, practice schedules, and mistakes to avoid on exams.',
    excerpt: 'Evidence-based strategies for studying mathematics effectively. Learn problem-solving workflows, practice techniques, and how to avoid common mistakes.',
    keywords: ['study math', 'math study tips', 'math strategies', 'problem solving', 'math help', 'learning mathematics', 'math practice'],
    readTime: 9
  },
  {
    title: 'Time Management for Students: Balancing Study, Work, and Life',
    slug: 'time-management-students-balancing-study-work-life',
    category: 'Time Management',
    seoTitle: 'Student Time Management: Balance Study, Work & Life', // Shortened
    seoDescription: 'Master time management as a student. Learn proven techniques to balance coursework, part-time work, social life, and self-care without burnout.',
    excerpt: 'Practical time management strategies for busy students. Learn to balance academic work, part-time jobs, social life, and self-care using proven techniques.',
    keywords: ['time management', 'student productivity', 'study schedule', 'work life balance', 'time management tips', 'organization', 'productivity'],
    readTime: 8
  }
];

async function getCategoryId(categoryName) {
  const { data } = await supabase
    .from('seo_blog_categories')
    .select('id')
    .eq('name', categoryName)
    .single();

  return data?.id || null;
}

async function getRandomAuthorId() {
  const { data } = await supabase
    .from('seo_authors')
    .select('id')
    .limit(1);

  return data?.[0]?.id || null;
}

function generatePostContent(post) {
  return `# ${post.title}

${post.excerpt}

---

## Introduction

[Write an engaging introduction that hooks the reader and previews the value they'll get from this guide.]

## Section Placeholders

[Fill in the detailed content for each section based on research, expert insights, and practical examples.]

## Try inspir Tools

This post pairs perfectly with these learning tools available on inspir.

## Final Thoughts

[Wrap up the main points, provide encouragement, and give readers a clear next step or call to action.]

---

**Keywords:** ${post.keywords.join(', ')}
`;
}

async function createRemainingPosts() {
  console.log('🚀 Creating remaining blog posts with fixed titles...\n');

  const authorId = await getRandomAuthorId();
  let createdCount = 0;

  for (const post of REMAINING_POSTS) {
    const { data: existing } = await supabase
      .from('seo_blog_posts')
      .select('id')
      .eq('slug', post.slug)
      .single();

    if (existing) {
      console.log(`⏭️  Skipped (already exists): ${post.title}`);
      continue;
    }

    const categoryId = await getCategoryId(post.category);
    const content = generatePostContent(post);

    const { error } = await supabase
      .from('seo_blog_posts')
      .insert({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: content,
        author_id: authorId,
        category_id: categoryId,
        seo_title: post.seoTitle,
        seo_description: post.seoDescription,
        seo_keywords: post.keywords,
        canonical_url: `https://inspir.uk/blog/${post.slug}`,
        og_image_alt: `${post.title} - inspir Blog`,
        status: 'draft',
        avg_read_time_minutes: post.readTime,
        featured: false
      });

    if (error) {
      console.error(`❌ Error creating post "${post.title}":`, error);
    } else {
      console.log(`✅ Created: ${post.title}`);
      console.log(`   SEO Title (${post.seoTitle.length} chars): ${post.seoTitle}`);
      createdCount++;
    }
  }

  console.log(`\n✨ Complete! Created ${createdCount} posts`);
}

createRemainingPosts();
