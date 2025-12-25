const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function calculateReadTime(content) {
  return Math.ceil(content.split(/\s+/).length / 200)
}

const blogPosts = [
  {
    title: 'Cornell Note-Taking System: Complete Guide',
    slug: 'cornell-note-taking-complete-guide',
    author_name: 'Dr. Sarah Chen',
    category: 'study-skills',
    excerpt: 'Master the Cornell note-taking method. Improve retention by 40% with this proven system used by top students worldwide.',
    content: `# Cornell Note-Taking System: Complete Guide

The Cornell Note-Taking System is one of the most effective methods for organizing and retaining information. Developed at Cornell University, this system has helped millions of students improve their grades.

## What is the Cornell System?

The page is divided into three sections:
- **Cue Column** (left, 2.5 inches): Questions and keywords
- **Note-taking Column** (right, 6 inches): Main notes during lecture
- **Summary Section** (bottom, 2 inches): Brief summary

## How to Use Cornell Notes

### During Class
Write notes in the main column. Focus on key concepts and important details, not every word.

### After Class
Within 24 hours, create questions or cues in the left column that prompt recall of the main content.

### Review
Cover the notes column and test yourself using only the cues. This active recall method dramatically improves retention.

### Summary
Write a 2-3 sentence summary synthesizing the entire page's content.

## Benefits

- 40% better retention than traditional notes
- Built-in study method with cues
- Organized and easy to review
- Perfect for all subjects

## Tips for Success

1. Review within 24 hours for best results
2. Use abbreviations to write faster
3. Leave space to add information later
4. Color-code different topics

Start using Cornell notes today with inspir's AI study tools!`,
    seo_title: 'Cornell Note-Taking System: Complete Student Guide (2025)',
    seo_description: 'Master Cornell notes to improve retention by 40%. Complete guide with templates and tips for effective note-taking.',
    seo_keywords: ['cornell notes', 'note-taking', 'study methods', 'effective notes']
  },
  {
    title: 'Mind Mapping: Complete Visual Learning Guide',
    slug: 'mind-mapping-visual-learning-guide',
    author_name: 'Dr. Sarah Chen',
    category: 'study-skills',
    excerpt: 'Transform study sessions with mind mapping. Boost memory by 32% and see concept connections clearly with visual learning.',
    content: `# Mind Mapping: Visual Learning for Students

Mind mapping harnesses your brain's natural ability to make connections, turning complex information into memorable visual diagrams.

## What is Mind Mapping?

A mind map is a diagram branching out from a central concept, showing relationships between ideas visually. It mirrors how your brain organizes information.

## Benefits

- 32% better memory retention
- See relationships between concepts
- Faster review than linear notes
- Encourages creative thinking

## How to Create Mind Maps

### 1. Central Idea
Write your main topic in the center with a clear image or icon.

### 2. Main Branches
Draw 3-7 thick branches for main themes radiating from center.

### 3. Sub-branches
Add thinner branches for details and examples.

### 4. Colors and Images
Use different colors per branch. Add drawings or symbols.

### 5. Keep It Brief
Single words or short phrases only.

## Tools

**Digital**: MindMeister, XMind, Coggle
**Traditional**: Large paper, colored markers

## Subject Applications

**Essays**: Brainstorm and organize ideas
**Math**: Map formulas and strategies
**History**: Show causes and effects
**Science**: Visualize systems and processes

Start mind mapping with inspir today!`,
    seo_title: 'Mind Mapping: Visual Learning Guide for Students 2025',
    seo_description: 'Master mind mapping to boost memory 32%. Visual study techniques with tools and strategies for all subjects.',
    seo_keywords: ['mind mapping', 'visual learning', 'study techniques', 'memory improvement']
  }
]

async function seedBlogs() {
  console.log('Fetching categories and authors...\n')
  
  const { data: categories } = await supabase.from('seo_blog_categories').select('*')
  const { data: authors } = await supabase.from('seo_authors').select('*')
  
  const catMap = Object.fromEntries(categories.map(c => [c.slug, c.id]))
  const authMap = Object.fromEntries(authors.map(a => [a.name, a.id]))
  
  console.log('Categories:', Object.keys(catMap))
  console.log('Authors:', Object.keys(authMap))
  console.log(`\nSeeding ${blogPosts.length} blog posts...\n`)
  
  let success = 0, errors = 0
  
  for (const post of blogPosts) {
    try {
      const { error } = await supabase.from('seo_blog_posts').insert({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category_id: catMap[post.category],
        author_id: authMap[post.author_name],
        seo_title: post.seo_title,
        seo_description: post.seo_description,
        seo_keywords: post.seo_keywords,
        avg_read_time_minutes: calculateReadTime(post.content),
        status: 'published',
        published_at: new Date().toISOString()
      })
      
      if (error) {
        if (error.code === '23505') {
          console.log(`⊘ Skipped (already exists): ${post.title}`)
        } else {
          console.error(`✗ Error: ${post.title} - ${error.message}`)
          errors++
        }
      } else {
        console.log(`✓ Seeded: ${post.title}`)
        success++
      }
    } catch (err) {
      console.error(`✗ Exception: ${post.title} - ${err.message}`)
      errors++
    }
  }
  
  console.log(`\n=== Complete ===`)
  console.log(`Success: ${success}`)
  console.log(`Errors: ${errors}`)
  console.log(`\nRun 'npm run build' to regenerate static pages`)
}

seedBlogs().then(() => process.exit(0)).catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
