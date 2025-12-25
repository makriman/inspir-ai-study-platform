const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function calculateReadTime(content) {
  return Math.ceil(content.split(/\s+/).length / 200)
}

const batch3Posts = [
  {
    title: 'Exam Anxiety: How to Stay Calm During Tests',
    slug: 'exam-anxiety-stay-calm-tests',
    author_name: 'Dr. Sarah Chen',
    category: 'exam-prep',
    excerpt: 'Overcome exam anxiety with proven psychological techniques. Learn to manage stress, stay focused, and perform your best under pressure.',
    content: `# Exam Anxiety: How to Stay Calm During Tests

Exam anxiety affects 25-40% of students. Learn evidence-based techniques to manage stress and perform at your best when it matters most.

## Understanding Exam Anxiety

Anxiety is a normal response to high-stakes situations. It becomes a problem when it interferes with performance.

### Physical Symptoms
- Rapid heartbeat
- Sweating
- Nausea
- Shaking hands
- Difficulty breathing
- Mind going blank

### Mental Symptoms
- Racing thoughts
- Negative self-talk
- Inability to concentrate
- Memory blocks
- Catastrophic thinking

## Before the Exam: Prevention Strategies

### Preparation is Key

The best anxiety reducer is thorough preparation:
- Start studying early (not last minute)
- Use active study methods
- Take practice tests
- Know the material inside out

Confidence comes from competence.

### Sleep and Nutrition

**Sleep**: Get 7-8 hours the night before

**Breakfast**: Protein + complex carbs:
- Oatmeal with nuts
- Eggs and toast
- Greek yogurt with fruit

Avoid: Heavy meals, excess caffeine, sugar crashes

### Exam Day Preparation

- Arrive 15 minutes early
- Bring all required materials
- Visit restroom before
- Review one confidence-boosting note card
- Then stop reviewing - trust your prep

## During the Exam: Immediate Techniques

### The 4-7-8 Breathing Technique

When anxiety hits:
1. Inhale for 4 counts
2. Hold for 7 counts
3. Exhale for 8 counts
4. Repeat 3-4 times

This activates your parasympathetic nervous system and calms your body.

### Progressive Muscle Relaxation

Tense and release muscle groups:
1. Clench fists tight
2. Hold for 5 seconds
3. Release completely
4. Feel the tension drain away
5. Move to shoulders, then legs

### Grounding Exercise

If feeling overwhelmed:
- Name 5 things you can see
- 4 things you can touch
- 3 things you can hear
- 2 things you can smell
- 1 thing you can taste

Brings you back to present moment.

## Cognitive Strategies

### Reframe Anxiety as Excitement

Research shows telling yourself "I'm excited" instead of "I'm anxious" improves performance. Both feelings have similar physical responses - reframe as positive energy.

### Challenge Negative Thoughts

**Catastrophizing**: "I'll fail and ruin my life"
**Reality**: One exam doesn't determine your future

**All-or-Nothing**: "I must get 100% or I'm a failure"
**Reality**: You just need to do your reasonable best

**Mind Reading**: "Everyone thinks I'm stupid"
**Reality**: Others are focused on their own exams

### Use Positive Self-Talk

Replace negative thoughts:
- "I can't do this" → "I've prepared well"
- "I'm going to fail" → "I'll do my best"
- "Everyone's smarter" → "I know this material"

## Test-Taking Strategies to Reduce Anxiety

### The Strategic Approach

**Step 1**: Read ALL instructions carefully

**Step 2**: Quickly scan entire exam

**Step 3**: Start with easiest questions (builds confidence)

**Step 4**: Skip difficult ones, return later

**Step 5**: Budget time wisely

**Step 6**: Leave time to review

### If You Draw a Blank

**Don't panic**. Try these:
- Take 3 deep breaths
- Move to next question
- Write down anything related
- Come back later when relaxed

Memory often returns once pressure decreases.

### Time Management

Divide time by points:
- 100-point exam in 60 minutes = 0.6 min per point
- 20-point question = 12 minutes maximum
- Check time every 15-20 minutes

Knowing you have enough time reduces anxiety.

## Long-Term Anxiety Management

### Regular Exercise

30 minutes of aerobic exercise daily reduces baseline anxiety by 20-30%.

### Meditation Practice

Daily 10-minute meditation builds emotional regulation skills that transfer to exam situations.

### Professional Support

If anxiety is severe, seek help:
- Campus counseling
- Therapist specializing in anxiety
- Psychiatric evaluation if needed
- Accommodations from disability services

## Practice Exposure

### Simulate Exam Conditions

Take practice tests:
- Same time limit
- Same location type
- No notes
- Timer visible

Repeated exposure reduces anxiety response.

### Visualize Success

Spend 5 minutes daily imagining yourself:
- Feeling calm before exam
- Reading questions confidently
- Remembering information easily
- Completing exam successfully

Mental rehearsal improves actual performance.

## Emergency Techniques

If panic attack occurs:
1. **Excuse yourself** (go to restroom if needed)
2. **Breathing exercises** (4-7-8 technique)
3. **Cold water** on face or wrists
4. **Remind yourself**: "This is temporary"
5. **Return when calmer**

## Build Exam Confidence

Start with low-stakes quizzes and practice tests. Gradually increase difficulty. Each successful experience builds confidence for the real thing.

Remember: You've prepared. You know the material. Trust yourself.

Use inspir's AI practice tests to build confidence through repetition!`,
    seo_title: 'Exam Anxiety: How to Stay Calm During Tests (2025 Guide)',
    seo_description: 'Overcome exam anxiety with proven techniques. Learn stress management, breathing exercises, and test strategies to perform your best.',
    seo_keywords: ['exam anxiety', 'test anxiety', 'exam stress', 'stay calm during tests', 'test anxiety tips']
  },

  {
    title: 'Math Study Tips: Master Equations and Problem-Solving',
    slug: 'math-study-tips-master-equations',
    author_name: 'James Wright',
    category: 'subject-help',
    excerpt: 'Excel at math with proven study strategies. Learn to master equations, understand concepts deeply, and solve problems confidently.',
    content: `# Math Study Tips: Master Equations and Problem-Solving

Math isn't about memorization - it's about understanding patterns and building problem-solving skills. Learn strategies that actually work.

## Why Traditional Math Study Fails

Most students:
- Memorize formulas without understanding
- Watch examples without practicing
- Cram before exams
- Don't learn from mistakes

## The Right Way to Study Math

### 1. Understand, Don't Memorize

**Why formulas work** is more important than the formula itself.

Example: Area of circle = πr²
- **Memorized**: Just a formula
- **Understood**: Circle is infinite regular polygons, area approaches π times radius squared

### 2. Practice Problems Actively

**Wrong**: Read solution, think "makes sense"
**Right**: Attempt problem, get stuck, learn from struggle

Struggling and failing builds understanding.

### 3. Space Your Practice

- Study math 30-45 min daily
- Not 3 hours once weekly
- Distributed practice beats massed practice

### 4. Mix Problem Types

**Wrong**: 10 problems of same type
**Right**: Mix different types in each session

Interleaved practice improves problem identification skills.

## Step-by-Step Math Study Process

### Before Class

**Preview** tomorrow's lesson (10 min):
- Read textbook section
- Identify 3 questions to ask
- Attempt one example problem

Priming your brain makes lecture stick better.

### During Class

**Active listening**:
- Write down every step of examples
- Note WHY each step works
- Ask questions immediately
- Mark confusing parts

### After Class (Within 24 Hours)

**The 3-Pass Method**:

**Pass 1 - Notes Review** (15 min)
- Fill gaps in notes
- Highlight key concepts
- Add your own examples

**Pass 2 - Easy Problems** (20 min)
- Work textbook examples WITH book closed
- Check your work
- Understand mistakes

**Pass 3 - Challenge Problems** (25 min)
- Harder textbook problems
- No peeking at solutions
- Struggle is learning

## Problem-Solving Framework

### The POLYA Method

**1. Understand the Problem**
- What's given?
- What's unknown?
- What's the condition?
- Draw a diagram

**2. Devise a Plan**
- Have I seen similar problems?
- What formulas apply?
- Can I break it into steps?
- Is there a pattern?

**3. Execute the Plan**
- Work step-by-step
- Check each step
- Show all work
- Use proper notation

**4. Review Solution**
- Does answer make sense?
- Could I solve it differently?
- What did I learn?
- Create similar problem

## Common Math Study Mistakes

### Mistake 1: Only Doing Easy Problems

**Fix**: Tackle problems slightly above current level

### Mistake 2: Giving Up Too Quickly

**Fix**: Struggle for 15 minutes before checking solution

### Mistake 3: Not Learning from Errors

**Fix**: Keep error log, review before exams

### Mistake 4: Skipping Steps

**Fix**: Write every step, even "obvious" ones

### Mistake 5: Working Alone Always

**Fix**: Study groups for problem discussion (after attempting alone)

## Subject-Specific Strategies

### Algebra

- Master factoring patterns
- Practice equation manipulation
- Build strong number sense
- Check answers by substitution

### Geometry

- Always draw diagrams
- Label everything clearly
- Know theorem conditions
- Practice proofs regularly

### Calculus

- Understand limits conceptually
- Connect derivative and integral
- Practice application problems
- Use graphing for intuition

### Statistics

- Understand distributions
- Know when to use each test
- Interpret results, not just calculate
- Real-world examples matter

## Building Math Intuition

### Connect to Real Life

Every formula solves real problems:
- Derivatives: Rate of change (speed, growth)
- Integrals: Total accumulation (distance, area)
- Probability: Risk assessment (games, finance)

### Use Multiple Representations

Understand each concept:
- Algebraically (equations)
- Geometrically (graphs/diagrams)
- Numerically (examples)
- Verbally (explanations)

### Teach Others

Explaining math forces deeper understanding. Study groups or tutoring cements knowledge.

## Test Preparation

### 2 Weeks Before

- Identify weak topics
- Review all formulas
- Practice mixed problem sets
- Start formula sheet (even if can't use it)

### 1 Week Before

- Take full practice test
- Review all mistakes
- Memorize key formulas
- Practice time management

### Day Before

- Light review only
- Review formula sheet
- Solve a few confidence builders
- Get good sleep

### During Exam

- Read all questions first
- Start with easiest
- Show all work (partial credit!)
- Check dimensional analysis
- Verify final answers make sense

## When You're Stuck

### Level 1: Review Fundamentals

Often, confusion stems from gaps in prerequisite knowledge.

### Level 2: Find Multiple Explanations

- Different textbook
- YouTube tutorials (Khan Academy, 3Blue1Brown)
- Ask classmates
- Office hours

### Level 3: Change Study Method

If current approach isn't working, try different strategies.

### Level 4: Get Help

- Tutoring center
- Study groups
- Professor office hours
- Online communities (r/learnmath)

## Long-Term Math Success

### Build Strong Foundation

Each math course builds on previous ones. Don't leave gaps.

### Practice Consistently

10 problems daily beats 70 problems the day before the exam.

### Develop Growth Mindset

Math ability isn't fixed. Struggle means you're learning, not that you're "bad at math."

## Start Improving Today

Pick one weak topic. Watch an explanation. Do 5 problems. Repeat daily.

Use inspir's AI math solver for step-by-step solutions and concept explanations!`,
    seo_title: 'Math Study Tips: Master Equations & Problem-Solving (2025)',
    seo_description: 'Excel at math with proven study strategies. Learn to understand concepts deeply, solve problems confidently, and ace math exams.',
    seo_keywords: ['math study tips', 'how to study math', 'math problem solving', 'math study strategies', 'learn math better']
  }
]

async function seedBatch3() {
  console.log('🚀 Batch 3: Adding 8 more blog posts\n')

  const { data: categories } = await supabase.from('seo_blog_categories').select('*')
  const { data: authors } = await supabase.from('seo_authors').select('*')

  const catMap = Object.fromEntries(categories.map(c => [c.slug, c.id]))
  const authMap = Object.fromEntries(authors.map(a => [a.name, a.id]))

  console.log(`Seeding ${batch3Posts.length} posts...\n`)

  let success = 0, errors = 0, skipped = 0

  for (const post of batch3Posts) {
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
          console.log(`⊘ Skipped: ${post.title}`)
          skipped++
        } else {
          console.error(`✗ Error: ${post.title}\n  ${error.message}`)
          errors++
        }
      } else {
        console.log(`✓ ${post.title}`)
        success++
      }
    } catch (err) {
      console.error(`✗ Exception: ${post.title}\n  ${err.message}`)
      errors++
    }
  }

  const total = 12 + success
  console.log(`\n${'='.repeat(50)}`)
  console.log(`✓ Success: ${success}`)
  console.log(`⊘ Skipped: ${skipped}`)
  console.log(`✗ Errors: ${errors}`)
  console.log(`📊 Total posts now: ${total}`)
  console.log(`🎯 Target: 58 posts`)
  console.log(`📈 Progress: ${Math.round((total / 58) * 100)}%`)
  console.log(`${'='.repeat(50)}`)
}

seedBatch3().then(() => process.exit(0)).catch(err => {
  console.error('Fatal error:', err)
  process.exit(1)
})
