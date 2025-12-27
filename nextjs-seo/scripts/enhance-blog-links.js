#!/usr/bin/env node

/**
 * Script to enhance blog post internal linking
 * Adds contextual links to other blog posts and tool pages
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../.env.local' });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error('❌ Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseKey);

const updates = [
  // 1. Study Notes Post
  {
    slug: 'create-effective-study-notes-guide',
    replacements: [
      {
        find: "The key to effective studying isn't just about putting in more hours—it's about using techniques that actually work.",
        replace: "The key to effective studying isn't just about putting in more hours—it's about using techniques that actually work. Whether you're preparing for exams with our [AI Quiz Generator](/tools/quiz-generator) or organizing your study schedule with our [AI Study Planner](/tools/ai-planner), effective note-taking is the foundation of academic success."
      },
      {
        find: "Studies show that students who use active recall in their notes perform significantly better than those who passively re-read material.",
        replace: "Studies show that students who use active recall in their notes perform significantly better than those who passively re-read material. For math-specific techniques, check out our guide on [how to study math effectively](/blog/how-to-study-math-effectively-guide)."
      },
      {
        find: "Once you've created your notes, the next step is turning them into active study tools.",
        replace: "Once you've created your notes, the next step is turning them into active study tools. Consider [converting your notes to digital flashcards](/blog/digital-flashcards-vs-paper-comparison-guide) for spaced repetition practice."
      },
      {
        find: "Try inspir free today at [inspir.uk](https://inspir.uk) and discover how AI-powered study tools can help you create better notes and study more effectively.",
        replace: "Try inspir free today at [inspir.uk](https://inspir.uk) and discover how AI-powered study tools like our [AI Note-Taking tool](/tools/notes-sync) can help you create better notes and study more effectively. Don't forget to check our [AI Practice Tests](/tools/practice-tests) to test your knowledge retention."
      }
    ]
  },

  // 2. Stay Motivated Post
  {
    slug: 'stay-motivated-studying-gets-hard-guide',
    replacements: [
      {
        find: "Understanding what drives your motivation is the first step to maintaining it.",
        replace: "Understanding what drives your motivation is the first step to maintaining it. Use our [AI Study Planner](/tools/ai-planner) to create a personalized study schedule that keeps you on track."
      },
      {
        find: "Research shows that students who set specific, measurable goals are 42% more likely to achieve them.",
        replace: "Research shows that students who set specific, measurable goals are 42% more likely to achieve them. Our [Goal Setter tool](/tools/goal-setter) helps you define and track your academic objectives."
      },
      {
        find: "The Pomodoro Technique (25 minutes of focused work followed by 5-minute breaks) leverages this principle beautifully.",
        replace: "The Pomodoro Technique (25 minutes of focused work followed by 5-minute breaks) leverages this principle beautifully. Try our [Study Timer](/tools/study-timer) to implement this technique effortlessly."
      },
      {
        find: "Try inspir free today at [inspir.uk](https://inspir.uk) and discover how our AI-powered motivation tools can help you stay on track and achieve your academic goals.",
        replace: "Try inspir free today at [inspir.uk](https://inspir.uk) and discover how our AI-powered motivation tools can help you stay on track. Pair this with [effective study notes](/blog/create-effective-study-notes-guide) and [proven math strategies](/blog/how-to-study-math-effectively-guide) for maximum results."
      }
    ]
  },

  // 3. Math Study Post
  {
    slug: 'how-to-study-math-effectively-guide',
    replacements: [
      {
        find: "Math isn't like other subjects—you can't just read and memorize. It requires active problem-solving, pattern recognition, and deep conceptual understanding.",
        replace: "Math isn't like other subjects—you can't just read and memorize. It requires active problem-solving, pattern recognition, and deep conceptual understanding. Our [AI Math Solver](/tools/math-solver) provides step-by-step solutions to help you master complex concepts."
      },
      {
        find: "Research shows that students who actively solve problems retain 90% of what they learn, compared to just 20% retention from passive reading.",
        replace: "Research shows that students who actively solve problems retain 90% of what they learn, compared to just 20% retention from passive reading. Combine this with [effective note-taking strategies](/blog/create-effective-study-notes-guide) to maximize retention."
      },
      {
        find: "Create flashcards with formulas on one side and when/how to use them on the other.",
        replace: "Create flashcards with formulas on one side and when/how to use them on the other. Learn more about [digital vs paper flashcards](/blog/digital-flashcards-vs-paper-comparison-guide) to choose the best method for you."
      },
      {
        find: "Try inspir free today at [inspir.uk](https://inspir.uk) and discover how AI-powered math tools can transform your learning experience.",
        replace: "Try inspir free today at [inspir.uk](https://inspir.uk) and discover how our [AI Practice Tests](/tools/practice-tests) and [Math Solver](/tools/math-solver) can transform your learning experience. Stay motivated with our [motivation strategies guide](/blog/stay-motivated-studying-gets-hard-guide)."
      }
    ]
  },

  // 4. Digital Flashcards Post
  {
    slug: 'digital-flashcards-vs-paper-comparison-guide',
    replacements: [
      {
        find: "The rise of spaced repetition apps like Anki, Quizlet, and Brainscape has revolutionized how students study.",
        replace: "The rise of spaced repetition apps like Anki, Quizlet, and Brainscape has revolutionized how students study. You can also generate custom quizzes instantly with our [AI Quiz Generator](/tools/quiz-generator)."
      },
      {
        find: "Research from cognitive science shows that spaced repetition increases long-term retention by up to 200%.",
        replace: "Research from cognitive science shows that spaced repetition increases long-term retention by up to 200%. This principle applies whether you're [studying math](/blog/how-to-study-math-effectively-guide) or preparing for any subject."
      },
      {
        find: "Many students find success in converting their handwritten lecture notes into digital flashcards later.",
        replace: "Many students find success in converting their handwritten lecture notes into digital flashcards later. Learn [how to create effective study notes](/blog/create-effective-study-notes-guide) that translate well to flashcard format."
      },
      {
        find: "Try inspir free today at [inspir.uk](https://inspir.uk) and discover how AI-powered flashcard tools can help you study smarter.",
        replace: "Try inspir free today at [inspir.uk](https://inspir.uk) and discover how AI-powered tools like our [Flashcards](/tools/flashcards) feature can help you study smarter. Need extra motivation? Read our [guide on staying motivated](/blog/stay-motivated-studying-gets-hard-guide)."
      }
    ]
  }
];

async function enhanceBlogLinks() {
  console.log('🔗 Starting blog link enhancement...\n');

  let successCount = 0;
  let failureCount = 0;

  for (const post of updates) {
    console.log(`📝 Processing: ${post.slug}`);

    // Fetch current content
    const { data: currentPost, error: fetchError } = await supabase
      .from('seo_blog_posts')
      .select('content')
      .eq('slug', post.slug)
      .eq('status', 'published')
      .single();

    if (fetchError) {
      console.error(`  ❌ Error fetching ${post.slug}:`, fetchError.message);
      failureCount++;
      continue;
    }

    if (!currentPost) {
      console.error(`  ❌ Post not found: ${post.slug}`);
      failureCount++;
      continue;
    }

    let updatedContent = currentPost.content;
    let replacementCount = 0;

    // Apply all replacements
    for (const { find, replace } of post.replacements) {
      if (updatedContent.includes(find)) {
        updatedContent = updatedContent.replace(find, replace);
        replacementCount++;
      }
    }

    if (replacementCount === 0) {
      console.log(`  ⚠️  No replacements made (content may have changed)`);
      continue;
    }

    // Update the post
    const { error: updateError } = await supabase
      .from('seo_blog_posts')
      .update({
        content: updatedContent,
        updated_at: new Date().toISOString()
      })
      .eq('slug', post.slug);

    if (updateError) {
      console.error(`  ❌ Error updating ${post.slug}:`, updateError.message);
      failureCount++;
    } else {
      console.log(`  ✅ Updated with ${replacementCount} internal links`);
      successCount++;
    }
  }

  console.log('\n' + '='.repeat(50));
  console.log(`✅ Successfully updated: ${successCount} posts`);
  console.log(`❌ Failed: ${failureCount} posts`);
  console.log('='.repeat(50));

  // Verify the updates
  console.log('\n🔍 Verifying updates...\n');

  const { data: verifyPosts, error: verifyError } = await supabase
    .from('seo_blog_posts')
    .select('slug, title, content')
    .eq('status', 'published')
    .order('published_at', { ascending: false });

  if (verifyError) {
    console.error('❌ Error verifying:', verifyError.message);
    return;
  }

  verifyPosts.forEach(post => {
    const hasToolLinks = post.content.includes('/tools/');
    const hasBlogLinks = post.content.includes('/blog/');
    const linkCount = (post.content.match(/\[.*?\]\(\/(?:tools|blog)\/.*?\)/g) || []).length;

    console.log(`📄 ${post.title}`);
    console.log(`   Slug: ${post.slug}`);
    console.log(`   Tool links: ${hasToolLinks ? '✅' : '❌'}`);
    console.log(`   Blog links: ${hasBlogLinks ? '✅' : '❌'}`);
    console.log(`   Total internal links: ${linkCount}`);
    console.log('');
  });

  console.log('✨ Blog enhancement complete!');
}

// Run the script
enhanceBlogLinks().catch(console.error);
