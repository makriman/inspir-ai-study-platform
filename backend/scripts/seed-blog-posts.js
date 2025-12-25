/**
 * Seed Blog Posts Script
 * Inserts blog posts from seed-blog-posts-fixed.sql into Supabase
 */

import dotenv from 'dotenv';
import { createClient } from '@supabase/supabase-js';

// Load environment variables
dotenv.config({ path: './.env' });

// Initialize Supabase client
const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

const blogPosts = [
  {
    title: 'The Ultimate Guide to Active Recall: Science-Backed Study Technique',
    slug: 'active-recall-study-technique-guide',
    excerpt: 'Discover why active recall is one of the most powerful study techniques backed by cognitive science. Learn how to implement it effectively.',
    content: `# What is Active Recall?

Active recall is a learning technique where you actively stimulate your memory during the learning process. Instead of passively reading or highlighting text, you force yourself to retrieve information from memory without looking at your notes.

## Why Active Recall Works

Research shows that **active recall is 50-70% more effective** than passive review methods like re-reading or highlighting. When you actively retrieve information, you strengthen the neural connections in your brain.

## How to Implement Active Recall

### Method 1: The Blank Page Technique
1. Study your material thoroughly
2. Close your books and notes
3. Write everything you remember on a blank page
4. Check your notes and identify gaps
5. Repeat the process focusing on gaps

### Method 2: Flashcards
Create flashcards with questions on one side and answers on the other. Test yourself regularly, and remove cards you've mastered.

### Method 3: Practice Questions
After each study session, answer practice questions from memory. This simulates exam conditions and strengthens recall.

## Conclusion

Active recall transforms passive studying into an engaging, effective process. Start implementing it today, and watch your exam scores improve dramatically.

**Ready to supercharge your studies?** Try inspir's AI-powered flashcards and quiz generator.`,
    author_name: 'Dr Sarah Mitchell',
    category_slug: 'study-skills',
    seo_title: 'Active Recall Study Technique: Complete Guide | inspir',
    seo_description: 'Master active recall to boost retention by 50-70%. Complete guide with proven methods, examples, and implementation tips.',
    seo_keywords: ['active recall', 'study techniques', 'learning methods', 'exam preparation'],
    status: 'published',
    days_ago: 10,
    featured: true,
    avg_read_time_minutes: 8
  },
  {
    title: 'Pomodoro Technique for Students: Study Smarter, Not Harder',
    slug: 'pomodoro-technique-students-guide',
    excerpt: 'Learn how the Pomodoro Technique can transform your study sessions with focused 25-minute intervals and strategic breaks.',
    content: `# The Pomodoro Technique: A Student's Secret Weapon

Struggling to maintain focus during long study sessions? The Pomodoro Technique might be exactly what you need.

## What is the Pomodoro Technique?

The Pomodoro Technique breaks work into 25-minute focused intervals (called "pomodoros") separated by short breaks.

### The Basic Structure
- **25 minutes:** Focused study (1 Pomodoro)
- **5 minutes:** Short break
- **After 4 Pomodoros:** Take a 15-30 minute long break

## Why It Works for Students

### 1. Combats Procrastination
Starting feels less overwhelming when you only commit to 25 minutes.

### 2. Maintains Peak Focus
Our brains can only maintain intense focus for 20-45 minutes. Pomodoros align perfectly with this natural rhythm.

### 3. Prevents Burnout
Regular breaks prevent mental fatigue and keep you fresh throughout the day.

## Optimizing Your Pomodoros

### Before Starting
1. Plan your session - list tasks and estimate pomodoros needed
2. Eliminate distractions - phone on silent, close unnecessary tabs
3. Set clear goals - know exactly what you'll accomplish

### During the Pomodoro
- No multitasking - one task only
- Note interruptions - write down thoughts and return later
- Track completion - mark off each finished pomodoro

## Conclusion

The Pomodoro Technique isn't just a productivity hack – it's a sustainable way to study that respects your brain's natural rhythms.

**Try inspir's study timer** with built-in Pomodoro functionality and automatic break reminders.`,
    author_name: 'Alex Chen',
    category_slug: 'study-skills',
    seo_title: 'Pomodoro Technique for Students: Complete Guide | inspir',
    seo_description: 'Master the Pomodoro Technique: 25-minute focused sessions to boost productivity, reduce burnout, and improve grades.',
    seo_keywords: ['pomodoro technique', 'study timer', 'time management', 'productivity'],
    status: 'published',
    days_ago: 8,
    featured: true,
    avg_read_time_minutes: 9
  },
  {
    title: 'How to Study Math Effectively: 12 Proven Strategies',
    slug: 'how-to-study-math-effectively',
    excerpt: 'Mathematics requires a different study approach. Learn 12 proven strategies that math experts use to master challenging concepts.',
    content: `# How to Study Math Effectively

Mathematics is different from other subjects. You can't passively read math and expect to understand it – you need an active, strategic approach.

## 12 Proven Strategies for Math Success

### 1. Master Prerequisites First
Before tackling new material, ensure you understand all prerequisite concepts.

### 2. Practice Problems, Not Just Examples
Don't just read solutions – solve problems yourself. The study cycle: watch example, cover solution, attempt independently, check work, repeat.

### 3. Understand the "Why," Not Just the "How"
Memorizing formulas without understanding leads to disaster on exams. Ask: Why does this work? Where does this formula come from?

### 4. Do the Homework (All of It)
Homework is where learning happens in math. Start within 24 hours of learning, space out over days.

### 5. Work Through Mistakes
Your mistakes are your best teachers. Identify where you went wrong, understand why, redo correctly, find similar problems.

### 6. Study in Short, Frequent Sessions
Better to study 30 minutes twice a day than 2 hours once. Math brain gets tired quickly.

### 7. Use Multiple Resources
Khan Academy, YouTube channels, practice websites, and inspir AI tutor for 24/7 explanations.

### 8. Create a Formula Sheet
Even if allowed on exams, make your own. Creating it is the real study method.

### 9. Explain Concepts Out Loud
If you can't explain it, you don't fully understand it. Use the Feynman Technique.

### 10. Form a Study Group
Solve independently first, then compare solutions and explain to each other.

### 11. Practice Under Exam Conditions
Set timer, no notes, solve past exam problems. Builds exam stamina and reduces anxiety.

### 12. Ask for Help Early
Don't wait until you're lost. Office hours, tutoring center, study groups, or inspir AI tutor.

## Conclusion

Math success isn't about being "naturally good" – it's about using effective study strategies consistently.

**Need help with math homework?** Try inspir's AI math solver for step-by-step solutions.`,
    author_name: 'Dr Sarah Mitchell',
    category_slug: 'subject-specific',
    seo_title: 'How to Study Math Effectively: 12 Expert Strategies | inspir',
    seo_description: 'Master mathematics with 12 proven study strategies. Learn to understand deeply, practice effectively, and ace exams.',
    seo_keywords: ['how to study math', 'math study tips', 'learning mathematics', 'math strategies'],
    status: 'published',
    days_ago: 6,
    featured: false,
    avg_read_time_minutes: 10
  },
  {
    title: 'Complete SAT Study Guide: 3-Month Preparation Timeline',
    slug: 'sat-study-guide-3-month-plan',
    excerpt: 'Planning to take the SAT? This comprehensive 3-month study plan breaks down exactly what to study each week.',
    content: `# Your Complete SAT Study Guide

Preparing for the SAT can feel overwhelming, but with a structured 3-month plan, you can achieve your target score.

## Understanding the SAT

### Test Structure (Digital SAT)
**Section 1: Reading and Writing (64 minutes)** - 54 questions across 2 modules
**Section 2: Math (70 minutes)** - 44 questions across 2 modules

### Scoring
Scale: 400-1600 (Reading/Writing: 200-800, Math: 200-800)

## Month 1: Foundation Building

### Week 1-2: Reading and Writing Foundations
- Study 1-2 grammar rules daily
- Practice 10 reading questions
- Learn 20-30 vocabulary words

### Week 3-4: Math Foundations
- Review 1 math topic daily
- Solve 20-25 practice problems
- Focus on algebra – it's ~50% of the math section

## Month 2: Strategy and Speed

### Week 5-6: Reading Strategies
- Target: 13 minutes per passage
- Skim questions first
- Answer evidence-based questions carefully

### Week 7-8: Math Strategies
- Easy questions: 30-45 seconds
- Medium: 60-90 seconds
- Hard: 2-3 minutes
- Use plug-in, pick numbers, draw diagrams techniques

## Month 3: Practice and Perfection

### Week 9-10: Intensive Practice
Take full practice tests weekly, review thoroughly

### Week 11: Targeted Weakness Elimination
Focus 80% of study time on weaknesses

### Week 12: Final Prep
Light review, prepare materials, get to bed early before test

## Test Day Tips

**What to Bring:** Admission ticket, photo ID, calculator, #2 pencils, water, snacks

**During Test:** Read carefully, manage energy, stay confident

## Conclusion

With this 3-month plan, consistent daily practice, and smart strategies, you can significantly improve your SAT score.

**Study Resources:** Khan Academy, Official College Board tests, inspir AI tutor for 24/7 explanations.`,
    author_name: 'Emily Rodriguez',
    category_slug: 'exam-prep',
    seo_title: 'SAT Study Guide: 3-Month Preparation Plan 2025 | inspir',
    seo_description: 'Complete SAT prep with week-by-week study plan. Proven strategies, time management, test-taking techniques for your target score.',
    seo_keywords: ['SAT study guide', 'SAT preparation', 'SAT test prep', 'how to study for SAT'],
    status: 'published',
    days_ago: 4,
    featured: false,
    avg_read_time_minutes: 12
  },
  {
    title: 'Digital Flashcards vs Paper: Complete Comparison 2025',
    slug: 'digital-flashcards-vs-paper-comparison',
    excerpt: 'Should you use digital flashcards or stick with paper? Compare effectiveness, features, and use cases to choose the right method.',
    content: `# Digital Flashcards vs Paper: Which Should You Choose?

Flashcards are one of the most effective study tools, but should you go digital or stick with traditional paper cards?

## The Science: Both Work!

Research shows both digital and paper flashcards are effective. The key is **active recall** and **spaced repetition**, not the medium.

## Paper Flashcards: Pros and Cons

### Advantages
- Physical writing enhances memory
- No distractions
- Tactile learning
- Battery independent
- Great for quick review

### Disadvantages
- Time-consuming to create
- No built-in spaced repetition
- Difficult to update
- Not portable in large numbers
- Can't include multimedia

### Best For:
Students who learn better by writing, short-term memorization, visual/kinesthetic learners

## Digital Flashcards: Pros and Cons

### Advantages
- Automatic spaced repetition
- Create cards faster
- Edit and update easily
- Infinitely portable
- Rich multimedia support
- Progress tracking
- Sync across devices

### Disadvantages
- Screen fatigue
- Distractions
- Learning curve
- Battery dependence
- Typing isn't as memorable

### Best For:
Long-term learning, large volumes, multimedia needs, spaced repetition

## The Hybrid Approach

Use both: Paper for creating (memory boost), digital for long-term review (spaced repetition).

## Top Digital Apps

**Anki** - Most powerful, proven algorithm
**inspir Flashcards** - AI-powered, modern design
**Quizlet** - Easy to use, large library

## Conclusion

There's no universal "better" choice. Consider your learning style, subject matter, time frame, and volume.

**Our recommendation:** Short-term or small volume - either works. Long-term or large volume - digital is more practical.

**Ready to start?** Try inspir's AI-powered flashcard tool that generates study cards automatically.`,
    author_name: 'Alex Chen',
    category_slug: 'tool-guides',
    seo_title: 'Digital Flashcards vs Paper: Complete Comparison | inspir',
    seo_description: 'Digital or paper flashcards? Compare effectiveness, features, use cases. Scientific breakdown to choose the best study method.',
    seo_keywords: ['digital flashcards', 'paper flashcards', 'flashcard apps', 'study methods'],
    status: 'published',
    days_ago: 3,
    featured: false,
    avg_read_time_minutes: 7
  },
  {
    title: 'How to Stay Motivated When Studying Gets Hard: 10 Strategies',
    slug: 'stay-motivated-studying-psychology-strategies',
    excerpt: 'Losing motivation to study? Learn 10 science-backed psychological strategies to overcome burnout and achieve your academic goals.',
    content: `# How to Stay Motivated When Studying Gets Hard

We've all been there: staring at textbooks, motivation at zero, exams looming. The good news? Motivation isn't magic – it's a skill.

## Understanding Why Motivation Disappears

1. The goal feels too far away
2. The work feels overwhelming
3. No immediate reward
4. You're exhausted
5. You don't see progress

## 10 Strategies to Rebuild Motivation

### Strategy 1: Make Goals Achievable (SMART Framework)

**Instead of:** "I need to do well on finals"
**Use:** "I will complete 3 practice tests this week, scoring at least 75%"

SMART goals are Specific, Measurable, Achievable, Relevant, Time-bound.

### Strategy 2: Use the 2-Minute Rule

Start with just 2 minutes. Motivation often appears AFTER starting, not before.

### Strategy 3: Gamify Your Studying

Create a point system with rewards. Turn studying into a game with points, levels, and prizes.

### Strategy 4: Study with Others (Accountability)

Social pressure works. Study groups hold you accountable.

### Strategy 5: Change Your Environment

Your brain associates locations with activities. Library, coffee shop, or different room.

### Strategy 6: Break Down Overwhelming Tasks

Transform "study all of biology" into small, manageable tasks like "read pages 45-52".

### Strategy 7: Visualize Your Success (Mental Contrasting)

Visualize success AND obstacles. Plan how to overcome each obstacle.

### Strategy 8: Track Progress Visibly

Seeing progress creates motivation. Use habit trackers, progress bars, study logs.

### Strategy 9: Use Strategic Rewards

Immediate micro-rewards after sessions, daily rewards after goals, weekly rewards after strong weeks.

### Strategy 10: Take Real Breaks

Strategic breaks INCREASE productivity. Follow Pomodoro technique: 25 min work, 5 min break.

## Conclusion

Motivation isn't about feeling excited every day – it's about systems that work even when motivation is low.

**Start with:** Set one SMART goal today, use 2-minute rule, track progress visibly.

**Need support?** Try inspir's AI tutor with built-in habit tracking and 24/7 motivation support.`,
    author_name: 'Emily Rodriguez',
    category_slug: 'productivity',
    seo_title: 'Stay Motivated Studying: 10 Psychology Tips | inspir',
    seo_description: 'Lost study motivation? Learn 10 psychology-backed strategies to overcome burnout, stay focused, and achieve goals.',
    seo_keywords: ['study motivation', 'staying motivated', 'academic motivation', 'overcome burnout'],
    status: 'published',
    days_ago: 2,
    featured: false,
    avg_read_time_minutes: 11
  }
];

async function seedBlogPosts() {
  try {
    console.log('Starting blog post seeding...\n');

    // Step 1: Ensure required authors exist
    console.log('Step 1: Ensuring authors exist...');
    const requiredAuthors = [
      { name: 'Dr Sarah Mitchell', bio: 'Educational psychologist and learning specialist', role: 'Learning Specialist' },
      { name: 'Alex Chen', bio: 'Productivity expert and student success coach', role: 'Productivity Expert' },
      { name: 'Emily Rodriguez', bio: 'Test prep specialist and academic advisor', role: 'Academic Advisor' }
    ];

    const authorMap = {};
    for (const authorData of requiredAuthors) {
      // Check if author exists
      let { data: existing } = await supabase
        .from('seo_authors')
        .select('id, name')
        .eq('name', authorData.name)
        .single();

      if (existing) {
        console.log(`  ✓ Author "${authorData.name}" already exists`);
        authorMap[authorData.name] = existing.id;
      } else {
        // Create the author
        const { data: newAuthor, error } = await supabase
          .from('seo_authors')
          .insert({
            name: authorData.name,
            bio: authorData.bio,
            role: authorData.role
          })
          .select()
          .single();

        if (error) {
          throw new Error(`Failed to create author "${authorData.name}": ${error.message}`);
        }

        console.log(`  ✓ Created new author: "${authorData.name}"`);
        authorMap[authorData.name] = newAuthor.id;
      }
    }

    // Step 2: Ensure required categories exist
    console.log('\nStep 2: Ensuring categories exist...');
    const requiredCategories = [
      {
        slug: 'subject-specific',
        name: 'Subject-Specific Tips',
        description: 'Study tips and strategies for specific subjects',
        icon: '📚'
      }
    ];

    const { data: existingCategories, error: categoriesError } = await supabase
      .from('seo_blog_categories')
      .select('id, slug');

    if (categoriesError) {
      throw new Error(`Failed to fetch categories: ${categoriesError.message}`);
    }

    const categoryMap = {};
    existingCategories.forEach(category => {
      categoryMap[category.slug] = category.id;
    });

    for (const categoryData of requiredCategories) {
      if (categoryMap[categoryData.slug]) {
        console.log(`  ✓ Category "${categoryData.slug}" already exists`);
      } else {
        // Create the category
        const { data: newCategory, error } = await supabase
          .from('seo_blog_categories')
          .insert({
            slug: categoryData.slug,
            name: categoryData.name,
            description: categoryData.description,
            icon: categoryData.icon
          })
          .select()
          .single();

        if (error) {
          throw new Error(`Failed to create category "${categoryData.slug}": ${error.message}`);
        }

        console.log(`  ✓ Created new category: "${categoryData.slug}"`);
        categoryMap[categoryData.slug] = newCategory.id;
      }
    }

    console.log(`Found/created ${Object.keys(categoryMap).length} categories`);

    // Step 3: Insert blog posts
    console.log('\nStep 3: Inserting blog posts...');
    let successCount = 0;
    let skipCount = 0;
    let errorCount = 0;

    for (const post of blogPosts) {
      const authorId = authorMap[post.author_name];
      const categoryId = categoryMap[post.category_slug];

      if (!authorId) {
        console.log(`⚠️  Warning: Author "${post.author_name}" not found. Skipping post "${post.title}"`);
        skipCount++;
        continue;
      }

      if (!categoryId) {
        console.log(`⚠️  Warning: Category "${post.category_slug}" not found. Skipping post "${post.title}"`);
        skipCount++;
        continue;
      }

      // Calculate published_at
      const publishedAt = new Date();
      publishedAt.setDate(publishedAt.getDate() - post.days_ago);

      // Prepare the insert data
      const insertData = {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        author_id: authorId,
        category_id: categoryId,
        seo_title: post.seo_title,
        seo_description: post.seo_description,
        seo_keywords: post.seo_keywords,
        status: post.status,
        published_at: publishedAt.toISOString(),
        featured: post.featured,
        avg_read_time_minutes: post.avg_read_time_minutes
      };

      // Check if post already exists
      const { data: existingPost } = await supabase
        .from('seo_blog_posts')
        .select('slug')
        .eq('slug', post.slug)
        .single();

      if (existingPost) {
        console.log(`⏭️  Post "${post.slug}" already exists. Skipping.`);
        skipCount++;
        continue;
      }

      // Insert the post
      const { data, error } = await supabase
        .from('seo_blog_posts')
        .insert(insertData)
        .select();

      if (error) {
        console.log(`❌ Error inserting "${post.title}": ${error.message}`);
        errorCount++;
      } else {
        console.log(`✅ Successfully inserted: "${post.title}"`);
        successCount++;
      }
    }

    // Summary
    console.log('\n' + '='.repeat(60));
    console.log('SUMMARY:');
    console.log(`✅ Successfully inserted: ${successCount} posts`);
    console.log(`⏭️  Skipped (already exist): ${skipCount} posts`);
    console.log(`❌ Errors: ${errorCount} posts`);
    console.log('='.repeat(60));

    if (successCount > 0) {
      console.log('\n🎉 Blog posts have been seeded successfully!');
    }

  } catch (error) {
    console.error('\n❌ Fatal error during seeding:', error.message);
    process.exit(1);
  }
}

// Run the seeding
seedBlogPosts();
