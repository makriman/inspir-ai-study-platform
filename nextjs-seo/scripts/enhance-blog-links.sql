-- SQL Script to Enhance Blog Post Internal Linking
-- This adds contextual internal links to blog posts for better SEO and conversion

-- 1. Update "How to Create Effective Study Notes That Actually Work"
-- Add links to: Math post, Flashcards post, Quiz Generator tool, AI Planner tool
UPDATE seo_blog_posts
SET content = REPLACE(content,
  'The key to effective studying isn''t just about putting in more hours—it''s about using techniques that actually work.',
  'The key to effective studying isn''t just about putting in more hours—it''s about using techniques that actually work. Whether you''re preparing for exams with our [AI Quiz Generator](/tools/quiz-generator) or organizing your study schedule with our [AI Study Planner](/tools/ai-planner), effective note-taking is the foundation of academic success.')
WHERE slug = 'create-effective-study-notes-guide';

UPDATE seo_blog_posts
SET content = REPLACE(content,
  'Studies show that students who use active recall in their notes perform significantly better than those who passively re-read material.',
  'Studies show that students who use active recall in their notes perform significantly better than those who passively re-read material. For math-specific techniques, check out our guide on [how to study math effectively](/blog/how-to-study-math-effectively-guide).')
WHERE slug = 'create-effective-study-notes-guide';

UPDATE seo_blog_posts
SET content = REPLACE(content,
  'Once you''ve created your notes, the next step is turning them into active study tools.',
  'Once you''ve created your notes, the next step is turning them into active study tools. Consider [converting your notes to digital flashcards](/blog/digital-flashcards-vs-paper-comparison-guide) for spaced repetition practice.')
WHERE slug = 'create-effective-study-notes-guide';

UPDATE seo_blog_posts
SET content = REPLACE(content,
  'Try inspir free today at [inspir.uk](https://inspir.uk) and discover how AI-powered study tools can help you create better notes and study more effectively.',
  'Try inspir free today at [inspir.uk](https://inspir.uk) and discover how AI-powered study tools like our [AI Note-Taking tool](/tools/notes-sync) can help you create better notes and study more effectively. Don''t forget to check our [AI Practice Tests](/tools/practice-tests) to test your knowledge retention.')
WHERE slug = 'create-effective-study-notes-guide';

-- 2. Update "How to Stay Motivated When Studying Gets Hard"
-- Add links to: All other blog posts, AI Planner, Study Timer, Goal Setter
UPDATE seo_blog_posts
SET content = REPLACE(content,
  'Understanding what drives your motivation is the first step to maintaining it.',
  'Understanding what drives your motivation is the first step to maintaining it. Use our [AI Study Planner](/tools/ai-planner) to create a personalized study schedule that keeps you on track.')
WHERE slug = 'stay-motivated-studying-gets-hard-guide';

UPDATE seo_blog_posts
SET content = REPLACE(content,
  'Research shows that students who set specific, measurable goals are 42% more likely to achieve them.',
  'Research shows that students who set specific, measurable goals are 42% more likely to achieve them. Our [Goal Setter tool](/tools/goal-setter) helps you define and track your academic objectives.')
WHERE slug = 'stay-motivated-studying-gets-hard-guide';

UPDATE seo_blog_posts
SET content = REPLACE(content,
  'The Pomodoro Technique (25 minutes of focused work followed by 5-minute breaks) leverages this principle beautifully.',
  'The Pomodoro Technique (25 minutes of focused work followed by 5-minute breaks) leverages this principle beautifully. Try our [Study Timer](/tools/study-timer) to implement this technique effortlessly.')
WHERE slug = 'stay-motivated-studying-gets-hard-guide';

UPDATE seo_blog_posts
SET content = REPLACE(content,
  'Try inspir free today at [inspir.uk](https://inspir.uk) and discover how our AI-powered motivation tools can help you stay on track and achieve your academic goals.',
  'Try inspir free today at [inspir.uk](https://inspir.uk) and discover how our AI-powered motivation tools can help you stay on track. Pair this with [effective study notes](/blog/create-effective-study-notes-guide) and [proven math strategies](/blog/how-to-study-math-effectively-guide) for maximum results.')
WHERE slug = 'stay-motivated-studying-gets-hard-guide';

-- 3. Update "How to Study Math Effectively: Strategies from Experts"
-- Add links to: Study Notes, Flashcards, Math Solver tool, Practice Tests
UPDATE seo_blog_posts
SET content = REPLACE(content,
  'Math isn''t like other subjects—you can''t just read and memorize. It requires active problem-solving, pattern recognition, and deep conceptual understanding.',
  'Math isn''t like other subjects—you can''t just read and memorize. It requires active problem-solving, pattern recognition, and deep conceptual understanding. Our [AI Math Solver](/tools/math-solver) provides step-by-step solutions to help you master complex concepts.')
WHERE slug = 'how-to-study-math-effectively-guide';

UPDATE seo_blog_posts
SET content = REPLACE(content,
  'Research shows that students who actively solve problems retain 90% of what they learn, compared to just 20% retention from passive reading.',
  'Research shows that students who actively solve problems retain 90% of what they learn, compared to just 20% retention from passive reading. Combine this with [effective note-taking strategies](/blog/create-effective-study-notes-guide) to maximize retention.')
WHERE slug = 'how-to-study-math-effectively-guide';

UPDATE seo_blog_posts
SET content = REPLACE(content,
  'Create flashcards with formulas on one side and when/how to use them on the other.',
  'Create flashcards with formulas on one side and when/how to use them on the other. Learn more about [digital vs paper flashcards](/blog/digital-flashcards-vs-paper-comparison-guide) to choose the best method for you.')
WHERE slug = 'how-to-study-math-effectively-guide';

UPDATE seo_blog_posts
SET content = REPLACE(content,
  'Try inspir free today at [inspir.uk](https://inspir.uk) and discover how AI-powered math tools can transform your learning experience.',
  'Try inspir free today at [inspir.uk](https://inspir.uk) and discover how our [AI Practice Tests](/tools/practice-tests) and [Math Solver](/tools/math-solver) can transform your learning experience. Stay motivated with our [motivation strategies guide](/blog/stay-motivated-studying-gets-hard-guide).')
WHERE slug = 'how-to-study-math-effectively-guide';

-- 4. Update "Digital Flashcards vs Paper: Complete Comparison Guide"
-- Add links to: Study Notes, Math post, Quiz Generator, Flashcards tool (if exists)
UPDATE seo_blog_posts
SET content = REPLACE(content,
  'The rise of spaced repetition apps like Anki, Quizlet, and Brainscape has revolutionized how students study.',
  'The rise of spaced repetition apps like Anki, Quizlet, and Brainscape has revolutionized how students study. You can also generate custom quizzes instantly with our [AI Quiz Generator](/tools/quiz-generator).')
WHERE slug = 'digital-flashcards-vs-paper-comparison-guide';

UPDATE seo_blog_posts
SET content = REPLACE(content,
  'Research from cognitive science shows that spaced repetition increases long-term retention by up to 200%.',
  'Research from cognitive science shows that spaced repetition increases long-term retention by up to 200%. This principle applies whether you''re [studying math](/blog/how-to-study-math-effectively-guide) or preparing for any subject.')
WHERE slug = 'digital-flashcards-vs-paper-comparison-guide';

UPDATE seo_blog_posts
SET content = REPLACE(content,
  'Many students find success in converting their handwritten lecture notes into digital flashcards later.',
  'Many students find success in converting their handwritten lecture notes into digital flashcards later. Learn [how to create effective study notes](/blog/create-effective-study-notes-guide) that translate well to flashcard format.')
WHERE slug = 'digital-flashcards-vs-paper-comparison-guide';

UPDATE seo_blog_posts
SET content = REPLACE(content,
  'Try inspir free today at [inspir.uk](https://inspir.uk) and discover how AI-powered flashcard tools can help you study smarter.',
  'Try inspir free today at [inspir.uk](https://inspir.uk) and discover how AI-powered tools like our [Flashcards](/tools/flashcards) feature can help you study smarter. Need extra motivation? Read our [guide on staying motivated](/blog/stay-motivated-studying-gets-hard-guide).')
WHERE slug = 'digital-flashcards-vs-paper-comparison-guide';

-- Verify updates
SELECT
  slug,
  title,
  CASE
    WHEN content LIKE '%/tools/%' THEN 'Has tool links'
    ELSE 'No tool links'
  END as tool_links,
  CASE
    WHEN content LIKE '%/blog/%' THEN 'Has blog links'
    ELSE 'No blog links'
  END as blog_links
FROM seo_blog_posts
WHERE status = 'published'
ORDER BY published_at DESC;
