const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '../.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function calculateReadTime(content) {
  return Math.ceil(content.split(/\s+/).length / 200)
}

async function main() {
  console.log('Fetching categories and authors...')
  
  const { data: categories } = await supabase.from('seo_blog_categories').select('*')
  const { data: authors } = await supabase.from('seo_authors').select('*')
  
  const catMap = Object.fromEntries(categories.map(c => [c.slug, c.id]))
  const authMap = Object.fromEntries(authors.map(a => [a.slug, a.id]))
  
  console.log('Categories found:', Object.keys(catMap).length)
  console.log('Authors found:', Object.keys(authMap).length)
  console.log('\nSeeding 52 new blog posts...\n')
  
  let success = 0, errors = 0
  
  for (const post of blogPosts) {
    try {
      const { error } = await supabase.from('seo_blog_posts').insert({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        category_id: catMap[post.category],
        author_id: authMap[post.author],
        seo_title: post.seo_title,
        seo_description: post.seo_description,
        seo_keywords: post.seo_keywords,
        avg_read_time_minutes: calculateReadTime(post.content),
        status: 'published',
        published_at: new Date().toISOString(),
        featured_image: true
      })
      
      if (error) {
        console.error(`✗ Error: ${post.title} - ${error.message}`)
        errors++
      } else {
        console.log(`✓ Seeded: ${post.title}`)
        success++
      }
    } catch (err) {
      console.error(`✗ Exception: ${post.title} - ${err.message}`)
      errors++
    }
  }
  
  console.log(`\nComplete! Success: ${success}, Errors: ${errors}`)
}

const blogPosts = [
  {
    title: 'How to Use AI Practice Tests for Exam Preparation',
    slug: 'ai-practice-tests-exam-preparation',
    excerpt: 'Master exam preparation with AI-generated practice tests. Learn to create realistic test conditions and improve scores.',
    content: `# AI Practice Tests: Your Secret Weapon for Exam Success

Practice tests are the single most effective study tool, and AI makes them better than ever. Learn how to use inspir's AI practice test tool to ace your exams.

## Why Practice Tests Work

Research shows practice testing improves retention by up to 50% compared to re-reading notes. It's called the testing effect, and it's your best friend for exam prep.

## Creating Effective Practice Tests

### Choose Your Material
Upload notes, textbooks, or tell the AI your exam topics. The more specific, the better the test quality.

### Set Difficulty Levels
- **Easy**: Basic recall and definitions
- **Medium**: Application and analysis questions
- **Hard**: Complex problem-solving and synthesis

### Question Types
Mix multiple choice, true/false, short answer, and essay questions for comprehensive preparation.

## Using inspir's AI Test Generator

### Step 1: Input Content
Paste your study materials or describe topics. The AI analyzes and identifies key concepts to test.

### Step 2: Customize Test Parameters
- Number of questions (10-50)
- Time limit (or untimed for learning mode)
- Question difficulty distribution
- Question types

### Step 3: Take the Test
Create realistic exam conditions:
- Quiet space, no distractions
- Time yourself
- No notes (unless your real exam allows them)
- Complete in one sitting

### Step 4: Review Results
Carefully review each answer:
- Understand why you got it wrong
- Review related concepts in your notes
- Retake questions you missed

## Test-Taking Strategies

### Time Management
- Allocate time based on point values
- Skip difficult questions, return later
- Leave 10% of time for review

### Multiple Choice Tips
- Eliminate obviously wrong answers
- Watch for absolute words (always, never)
- Trust your first instinct unless you find clear errors

### Essay Questions
- Spend 2 minutes outlining before writing
- Answer all parts of the question
- Use specific examples and evidence

## Practice Test Schedule

### 1 Month Before Exam
- Take baseline practice test
- Identify weak areas
- Create targeted study plan

### 2 Weeks Before
- Weekly full-length practice tests
- Focus study on consistently missed topics
- Track improvement over time

### 1 Week Before
- Daily shorter practice tests (30-45 min)
- Mix of all topics
- Time yourself strictly

### Day Before
- Light review practice test
- Focus on confidence, not cramming
- Get good sleep!

## Analyzing Your Practice Test Performance

### Track These Metrics
- Overall score trends
- Time per question
- Accuracy by topic
- Improvement rate

### Identify Patterns
- Do you rush and make careless errors?
- Run out of time on certain question types?
- Consistently miss specific topics?

### Adjust Your Study Plan
Direct more time to areas where practice tests reveal weaknesses.

## Creating Realistic Test Conditions

### Simulate Exam Environment
- Same time of day as real exam
- Similar location type (quiet room)
- No phone or distractions
- Use allowed materials only

### Manage Test Anxiety
- Practice deep breathing
- Start with easier questions
- Remember: it's practice, mistakes help you learn

## Subject-Specific Test Strategies

### Math and Science
- Show your work
- Check units and sig figs
- Verify answers make sense
- Review formula sheets before starting

### Humanities
- Outline essays before writing
- Use specific examples and quotes
- Address all parts of the question
- Watch your time per essay

### Multiple Choice Exams
- First pass: answer what you know
- Second pass: tackle harder questions
- Final pass: review marked questions

## Common Practice Test Mistakes

1. **Only doing them once**: Retake tests on missed topics
2. **Not timing yourself**: Time pressure is part of the exam
3. **Ignoring wrong answers**: They're your learning opportunities
4. **Testing too late**: Start practice tests early in your prep

## Beyond Practice Tests

Combine with:
- **Active recall**: Test yourself without looking
- **Spaced repetition**: Review at increasing intervals
- **Study groups**: Compare answers and discuss

## Your Practice Test Action Plan

Week 1: Take first practice test, identify weak areas
Week 2-3: Focused study on weak areas, weekly tests
Week 4: Daily practice, simulate real exam conditions
Exam week: Light practice for confidence

Start your first AI practice test today with inspir!`,
    category: 'tool-guides',
    author: 'emily-rodriguez',
    seo_title: 'AI Practice Tests: Complete Exam Preparation Guide (2025)',
    seo_description: 'Master exams with AI-generated practice tests. Learn effective strategies, timing tips, and how to analyze results for better scores.',
    seo_keywords: 'practice tests, AI exam prep, test preparation, practice exam strategies, exam success'
  }
]

// Immediately invoke
main().then(() => process.exit(0)).catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
