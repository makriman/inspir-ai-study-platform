#!/bin/bash
set -e

# Generate 58 blog post featured images (1200x630)

ASSETS_DIR="/root/inspir/nextjs-seo/public/assets/blog"

# Color mapping
declare -A COLORS
COLORS=(
  ["red"]="#EF4444"
  ["blue"]="#3B82F6"
  ["purple"]="#7C3AED"
  ["indigo"]="#4F46E5"
  ["cyan"]="#06B6D4"
  ["yellow"]="#EAB308"
  ["green"]="#10B981"
  ["emerald"]="#059669"
  ["orange"]="#F59E0B"
)

echo "📝 Generating 58 blog post featured images..."

# Read blog posts and generate images
while IFS='||' read -r slug title color; do
  # Get the hex color
  hex_color="${COLORS[$color]:-#7C3AED}"

  # Wrap title at 40 characters for better display
  wrapped_title=$(echo "$title" | fold -w 40 -s)

  echo "  $slug"

  # Generate featured image with gradient background
  convert -size 1200x630 \
    gradient:"$hex_color"-"#1E293B" \
    -gravity center \
    -fill white \
    -font DejaVu-Sans-Bold \
    -pointsize 52 \
    -annotate +0-80 "$wrapped_title" \
    -pointsize 28 \
    -fill "#E2E8F0" \
    -annotate +0+80 "inspir Blog" \
    "$ASSETS_DIR/$slug.png"

done <<EOF
act-prep-complete-study-strategy||ACT Prep: Complete Study Strategy||red
active-recall-study-technique-guide||Active Recall: The Science-Backed Study Technique||blue
ai-math-solver-step-by-step-solutions||AI Math Solver: Step-by-Step Solutions Explained||purple
ai-study-planner-personalized-schedules||AI Study Planner: Create Personalized Study Schedules||purple
ap-exam-preparation-guide||AP Exam Preparation Guide||red
best-study-apps-2025-ai-powered-learning-tools||Best Study Apps for 2025: AI-Powered Learning Tools||indigo
building-study-habits-that-stick||Building Study Habits That Stick||yellow
chatgpt-vs-inspir-choosing-the-right-ai-tutor||ChatGPT vs inspir: Choosing the Right AI Tutor||indigo
chemistry-study-guide||Chemistry Study Guide: Master Chemical Reactions and Problem-Solving||green
computer-science-study-strategies||Computer Science Study Strategies: Programming and Concepts||green
create-effective-study-notes-guide||How to Create Effective Study Notes That Actually Work||cyan
digital-flashcards-vs-paper-comparison-guide||Digital Flashcards vs Paper: Complete Comparison Guide||purple
digital-minimalism-for-students||Digital Minimalism for Students: Focus Without Distractions||yellow
draw-sketch-visual-learning-guide||Draw and Sketch: Visual Learning Through Digital Drawing||purple
economics-study-guide||Economics Study Guide: Understanding Concepts Simply||green
english-literature-analysis-guide||English Literature Analysis: How to Write Better Literary Essays||green
essay-exam-writing-guide||Essay Exam Writing Guide||red
ethical-use-of-ai-tools-for-homework-and-study||Ethical Use of AI Tools for Homework and Study||indigo
explain-concept-ai-explanations-guide||Explain Concept: Get AI-Powered Explanations That Click||purple
finals-week-survival-guide||Finals Week Survival Guide||red
foreign-language-learning-methods||Foreign Language Learning: Effective Methods for Fluency||green
gcse-revision-strategies-month-by-month-plan||GCSE Revision Strategies: Month-by-Month Plan||red
goal-setter-academic-goals-guide||Goal Setter: Achieve Academic Goals with Smart Planning||purple
goal-setting-for-academic-achievement||Goal Setting for Academic Achievement||yellow
group-study-strategies-collaborative-learning||Group Study Strategies: Collaborative Learning & Study Buddies||blue
growth-mindset-students-academic-success||Growth Mindset for Students: How Beliefs Shape Academic Success||yellow
habit-tracker-students-study-routines||Habit Tracker for Students: Build Consistent Study Routines||purple
history-essay-writing-guide||History Essay Writing: Research, Structure, and Analysis Guide||green
how-ai-is-transforming-education-complete-guide||How AI is Transforming Education: Complete Guide||indigo
how-to-study-biology-guide||How to Study Biology: Complete Guide to Mastering Life Science||green
how-to-study-math-effectively-guide||How to Study Math Effectively: Strategies from Experts||green
how-to-use-quiz-generator-test-prep||How to Use AI Quiz Generator for Instant Test Prep||purple
image-to-text-homework-help-ai-analysis||Image to Text Homework Help: AI Photo Analysis Guide||purple
memory-techniques-mnemonics-methods||Memory Techniques: Mnemonics and Methods for Better Recall||blue
morning-routine-for-academic-success||Morning Routine for Academic Success||yellow
multiple-choice-test-strategies||Multiple Choice Test Strategies||red
notes-sync-organization-guide||Notes Sync: Smart Note Organization and Management||purple
physics-problem-solving-guide||Physics Problem-Solving: Master Equations and Concepts||green
practice-tests-exam-simulation-guide||Practice Tests: Master Exam Simulation and Self-Assessment||purple
psychology-study-guide||Psychology Study Guide: Master Theories and Research||green
sat-study-guide-complete-preparation-timeline||SAT Study Guide: Complete Preparation Timeline||red
science-lab-virtual-experiments-guide||Science Lab: Virtual Experiments and Simulations Guide||purple
sleep-study-memory-consolidation-science||Sleep and Study: The Science of Memory Consolidation||emerald
spaced-repetition-memory-retention-guide||Spaced Repetition: The Secret to Long-Term Memory Retention||blue
speed-reading-techniques-students||Speed Reading Techniques for Students: Read Faster & Retain More||blue
statistics-for-students-guide||Statistics for Students: Understanding Data and Analysis||green
stay-motivated-studying-gets-hard-guide||How to Stay Motivated When Studying Gets Hard||yellow
study-burnout-recovery-strategies||Dealing with Study Burnout: Recovery Strategies||yellow
study-environment-optimization-space||Study Environment Optimization: Create Your Perfect Study Space||blue
study-music-focus-soundtrack-guide||Study Music: Find Your Perfect Focus Soundtrack||purple
study-timer-pomodoro-focus-strategies||Study Timer Mastery: Pomodoro Technique and Focus Strategies||purple
test-anxiety-strategies-stay-calm-exams||Test Anxiety: 10 Strategies to Stay Calm During Exams||emerald
test-taking-skills-time-management-strategy||Test-Taking Skills: Time Management and Strategy||red
the-future-of-learning-ai-powered-personalized-education||The Future of Learning: AI-Powered Personalized Education||indigo
time-management-for-students||Time Management for Students: Complete Guide||yellow
time-management-students-balancing-study-work-life||Time Management for Students: Balancing Study, Work, and Life||orange
visual-learning-mind-maps-guide||Visual Learning: Mind Maps and Diagrams for Understanding||purple
writing-research-papers-guide||Research Paper Writing: Complete Academic Guide||green
EOF

echo "✅ Generated 58 blog post images!"
