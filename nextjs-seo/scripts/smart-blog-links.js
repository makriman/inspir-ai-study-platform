#!/usr/bin/env node

/**
 * Smart Blog Link Enhancement
 * Intelligently adds internal links to blog posts
 */

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

// Define strategic link insertions for each post
const linkStrategies = {
  'create-effective-study-notes-guide': {
    title: 'How to Create Effective Study Notes',
    links: [
      {
        after: '## Why Traditional Note-Taking Often Fails',
        insert: '\n\n**Looking for faster ways to test your knowledge?** Try our [AI Quiz Generator](/tools/quiz-generator) to create custom quizzes from your notes instantly.\n'
      },
      {
        after: '## The Cornell Method: Structure That Works',
        insert: '\n\nThis method pairs perfectly with our [AI Study Planner](/tools/ai-planner), which can help you schedule regular review sessions.\n'
      },
      {
        after: 'Mathematical formulas and problem-solving steps',
        insert: ' (Learn more in our [guide to studying math effectively](/blog/how-to-study-math-effectively-guide))'
      },
      {
        after: '## Converting Notes to Flashcards',
        insert: '\n\nWondering which format to use? Read our comprehensive comparison: [Digital Flashcards vs Paper](/blog/digital-flashcards-vs-paper-comparison-guide).\n'
      },
      {
        after: '## Review and Retention Strategies',
        insert: '\n\nUse our [AI Practice Tests](/tools/practice-tests) to verify your understanding and identify gaps in your knowledge.\n'
      },
      {
        before: '---\n\n*Ready to transform',
        insert: '\n## Tools to Enhance Your Note-Taking\n\ninspir offers several tools designed to work with your study notes:\n\n- **[AI Note-Taking](/tools/notes-sync)** - Smart organization and sync across devices\n- **[Flashcards](/tools/flashcards)** - Convert notes to spaced repetition cards\n- **[Quiz Generator](/tools/quiz-generator)** - Test yourself on your material\n- **[Study Planner](/tools/ai-planner)** - Schedule review sessions automatically\n\nThese tools integrate seamlessly with the note-taking strategies outlined above.\n\n'
      }
    ]
  },

  'stay-motivated-studying-gets-hard-guide': {
    title: 'How to Stay Motivated When Studying Gets Hard',
    links: [
      {
        after: '## Understanding Why Motivation Disappears',
        insert: '\n\n**Tip:** Use our [AI Study Planner](/tools/ai-planner) to create realistic study schedules that prevent overwhelm.\n'
      },
      {
        after: 'Set specific, measurable goals',
        insert: ' - our [Goal Setter tool](/tools/goal-setter) makes this process simple and trackable'
      },
      {
        after: 'The Pomodoro Technique',
        insert: ' (use our [Study Timer](/tools/study-timer) for effortless implementation)'
      },
      {
        after: '## Building Sustainable Study Habits',
        insert: '\n\nCombine these motivation strategies with [effective note-taking](/blog/create-effective-study-notes-guide) and [proven math study techniques](/blog/how-to-study-math-effectively-guide) for maximum academic success.\n'
      },
      {
        before: '---\n\n*Ready to stay motivated',
        insert: '\n## Tools That Support Long-Term Motivation\n\ninspir provides tools specifically designed to maintain motivation:\n\n- **[Study Timer](/tools/study-timer)** - Pomodoro technique made easy\n- **[Goal Setter](/tools/goal-setter)** - Track progress toward your objectives\n- **[Habit Tracker](/tools/habit-tracker)** - Build consistent study routines\n- **[AI Planner](/tools/ai-planner)** - Personalized schedules that adapt to you\n\n'
      }
    ]
  },

  'how-to-study-math-effectively-guide': {
    title: 'How to Study Math Effectively',
    links: [
      {
        after: '## Why Math Feels Different',
        insert: '\n\n**Struggling with complex problems?** Our [AI Math Solver](/tools/math-solver) provides step-by-step solutions to help you understand the process.\n'
      },
      {
        after: 'Create flashcards',
        insert: ' ([learn which type works best](/blog/digital-flashcards-vs-paper-comparison-guide))'
      },
      {
        after: 'Write out problem-solving steps',
        insert: ' (see our [effective note-taking strategies](/blog/create-effective-study-notes-guide) for organizing these)'
      },
      {
        after: '## Practice Strategies That Actually Work',
        insert: '\n\nTest yourself regularly with our [AI Practice Tests](/tools/practice-tests) to identify weak areas before exam day.\n'
      },
      {
        after: 'When motivation dips',
        insert: ', revisit our [motivation strategies guide](/blog/stay-motivated-studying-gets-hard-guide)'
      },
      {
        before: '---\n\n*Transform your math',
        insert: '\n## Math-Specific Tools That Help\n\ninspir offers specialized tools for math learners:\n\n- **[Math Solver](/tools/math-solver)** - Step-by-step solutions explained\n- **[Practice Tests](/tools/practice-tests)** - Assess your understanding\n- **[Flashcards](/tools/flashcards)** - Memorize formulas and theorems\n- **[Visual Learning](/tools/visual-learning)** - Create diagrams and graphs\n\n'
      }
    ]
  },

  'digital-flashcards-vs-paper-comparison-guide': {
    title: 'Digital Flashcards vs Paper',
    links: [
      {
        after: '## The Science Behind Flashcards',
        insert: '\n\nWant instant flashcard creation? Try our [AI Quiz Generator](/tools/quiz-generator) to automatically generate questions from any topic.\n'
      },
      {
        after: 'Converting notes to flashcards',
        insert: ' starts with [effective note-taking techniques](/blog/create-effective-study-notes-guide)'
      },
      {
        after: 'Mathematical formulas',
        insert: ' ([master math study strategies here](/blog/how-to-study-math-effectively-guide))'
      },
      {
        after: '## Making Your Decision',
        insert: '\n\n**Need help staying consistent?** Our [Habit Tracker](/tools/habit-tracker) ensures you review your flashcards daily.\n'
      },
      {
        before: '---\n\n*Ready to supercharge',
        insert: '\n## Digital Flashcard Tools on inspir\n\ninspir includes powerful flashcard features:\n\n- **[Flashcards](/tools/flashcards)** - Digital spaced repetition system\n- **[Quiz Generator](/tools/quiz-generator)** - Auto-create from any content\n- **[Study Timer](/tools/study-timer)** - Time your review sessions\n- **[AI Planner](/tools/ai-planner)** - Schedule optimal review times\n\nCombine these with [proven motivation techniques](/blog/stay-motivated-studying-gets-hard-guide) for best results.\n\n'
      }
    ]
  }
};

async function enhancePost(slug, strategy) {
  console.log(`\n📝 Processing: ${strategy.title}`);

  // Fetch current content
  const { data: post, error: fetchError } = await supabase
    .from('seo_blog_posts')
    .select('content')
    .eq('slug', slug)
    .eq('status', 'published')
    .single();

  if (fetchError || !post) {
    console.error(`  ❌ Error fetching ${slug}`);
    return false;
  }

  let updatedContent = post.content;
  let linksAdded = 0;

  // Apply each link insertion
  for (const link of strategy.links) {
    if (link.after && updatedContent.includes(link.after)) {
      updatedContent = updatedContent.replace(
        link.after,
        link.after + link.insert
      );
      linksAdded++;
    } else if (link.before && updatedContent.includes(link.before)) {
      updatedContent = updatedContent.replace(
        link.before,
        link.insert + link.before
      );
      linksAdded++;
    }
  }

  if (linksAdded === 0) {
    console.log(`  ⚠️  No anchor points found`);
    return false;
  }

  // Update the post
  const { error: updateError } = await supabase
    .from('seo_blog_posts')
    .update({
      content: updatedContent,
      updated_at: new Date().toISOString()
    })
    .eq('slug', slug);

  if (updateError) {
    console.error(`  ❌ Update failed:`, updateError.message);
    return false;
  }

  console.log(`  ✅ Added ${linksAdded} internal link sections`);
  return true;
}

async function main() {
  console.log('🔗 Smart Blog Link Enhancement\n');
  console.log('Adding contextual internal links to blog posts...\n');

  let successCount = 0;
  let totalAttempts = 0;

  for (const [slug, strategy] of Object.entries(linkStrategies)) {
    totalAttempts++;
    const success = await enhancePost(slug, strategy);
    if (success) successCount++;
  }

  console.log('\n' + '='.repeat(60));
  console.log(`✅ Successfully enhanced: ${successCount}/${totalAttempts} posts`);
  console.log('='.repeat(60));

  // Verify the updates
  console.log('\n🔍 Final verification...\n');

  for (const slug of Object.keys(linkStrategies)) {
    const { data } = await supabase
      .from('seo_blog_posts')
      .select('title, content')
      .eq('slug', slug)
      .single();

    if (data) {
      const toolLinks = (data.content.match(/\[.*?\]\(\/tools\/.*?\)/g) || []).length;
      const blogLinks = (data.content.match(/\[.*?\]\(\/blog\/.*?\)/g) || []).length;
      console.log(`📄 ${data.title}`);
      console.log(`   Tool links: ${toolLinks}`);
      console.log(`   Blog links: ${blogLinks}`);
      console.log(`   Total internal links: ${toolLinks + blogLinks}\n`);
    }
  }

  console.log('✨ Enhancement complete!');
}

main().catch(console.error);
