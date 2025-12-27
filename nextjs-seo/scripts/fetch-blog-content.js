#!/usr/bin/env node

const { createClient } = require('@supabase/supabase-js');
require('dotenv').config({ path: '../.env.local' });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function fetchContent() {
  const slugs = [
    'create-effective-study-notes-guide',
    'stay-motivated-studying-gets-hard-guide',
    'how-to-study-math-effectively-guide',
    'digital-flashcards-vs-paper-comparison-guide'
  ];

  for (const slug of slugs) {
    const { data, error } = await supabase
      .from('seo_blog_posts')
      .select('content')
      .eq('slug', slug)
      .single();

    if (error) {
      console.error(`Error fetching ${slug}:`, error);
      continue;
    }

    console.log(`\n${'='.repeat(60)}`);
    console.log(`SLUG: ${slug}`);
    console.log('='.repeat(60));
    console.log(data.content.substring(0, 1000));
    console.log('\n...[CONTENT TRUNCATED]...\n');

    // Look for key phrases
    const searchPhrases = [
      "The key to effective studying",
      "Math isn't like other subjects",
      "Understanding what drives your motivation",
      "The rise of spaced repetition apps"
    ];

    for (const phrase of searchPhrases) {
      if (data.content.includes(phrase)) {
        const index = data.content.indexOf(phrase);
        console.log(`Found phrase at index ${index}:`);
        console.log(data.content.substring(index, index + 300));
        console.log('');
      }
    }
  }
}

fetchContent().catch(console.error);
