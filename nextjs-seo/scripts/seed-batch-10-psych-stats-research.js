const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function calculateReadTime(content) {
  return Math.ceil(content.split(/\s+/).length / 200)
}

const posts = [
  {
    title: 'Psychology Study Guide: Master Theories and Research',
    slug: 'psychology-study-guide',
    author_name: 'Dr. Sarah Chen',
    category: 'subject-help',
    excerpt: 'Understand psychology with effective strategies for theories, research methods, and concepts. Master cognitive, social, and developmental psychology.',
    content: `# Psychology Study Guide: Master Theories and Research

Psychology studies mind, brain, and behavior through scientific methods. Success requires understanding theories, remembering studies, and applying concepts to real-world scenarios.

## Why Psychology Is Unique

**Combines science and application:**
- Scientific research methods
- Statistical analysis
- Human behavior complexity
- Real-world applications

**Memory-intensive:**
- Researchers and their studies
- Theories and theorists
- Key terminology
- Statistical concepts

**Critical thinking required:**
- Evaluate research quality
- Recognize biases
- Apply to scenarios
- Synthesize multiple perspectives

## Core Psychology Domains

### Research Methods

**Essential concepts:**
- Experimental vs correlational designs
- Independent and dependent variables
- Control groups and random assignment
- Confounding variables
- Operational definitions

**Study strategy:**
- Analyze research studies critically
- Practice identifying variables
- Design your own experiments
- Understand why correlation ≠ causation

### Biological Psychology

**Key topics:**
- Brain structure and functions
- Neurotransmitters and hormones
- Nervous system organization
- Genetics and behavior
- Sleep and consciousness

**Study approach:**
- Draw and label brain diagrams
- Create neurotransmitter flashcards
- Connect biology to behavior
- Use mnemonics for brain regions

**Example mnemonic:**
"Old Opossums Occasionally Try Paws" = Occipital, Orbital, Olfactory, Temporal, Parietal (brain regions)

### Developmental Psychology

**Lifespan stages:**
- Prenatal and infancy
- Childhood and adolescence
- Adulthood and aging
- Physical, cognitive, social development

**Major theories:**
- Piaget's cognitive development
- Erikson's psychosocial stages
- Kohlberg's moral development
- Attachment theory

**Study method:**
- Create timeline charts
- Compare theories side-by-side
- Apply to case studies
- Identify real-life examples

### Cognitive Psychology

**Core areas:**
- Memory (encoding, storage, retrieval)
- Attention and perception
- Language and thinking
- Problem-solving and decision-making

**Key concepts:**
- Working vs long-term memory
- Forgetting curves
- Schemas and heuristics
- Cognitive biases

**Practice:**
- Demonstrate phenomena yourself
- Create examples for each bias
- Practice memory techniques
- Analyze own thinking

### Social Psychology

**Major topics:**
- Attribution theory
- Conformity and obedience
- Group behavior
- Prejudice and stereotypes
- Attraction and relationships

**Famous studies:**
- Milgram's obedience
- Asch's conformity
- Stanford prison experiment
- Bystander effect

**Study strategy:**
- Link studies to concepts
- Remember researcher names
- Understand ethical issues
- Apply to current events

### Abnormal Psychology

**Mental disorders:**
- Anxiety disorders
- Mood disorders
- Personality disorders
- Schizophrenia spectrum
- Neurodevelopmental disorders

**Diagnostic criteria:**
- DSM-5 categories
- Symptoms and duration
- Differential diagnosis
- Comorbidity

**Study approach:**
- Create disorder comparison charts
- Use case studies
- Understand controversies
- Apply biopsychosocial model

## Effective Psychology Study Strategies

### The Case Study Method

**Why it works:**
- Applies abstract concepts
- Creates memorable examples
- Integrates multiple topics
- Tests understanding

**How to use:**
1. Read scenario carefully
2. Identify relevant concepts
3. Apply theories
4. Support with research
5. Consider alternative explanations

**Create your own:**
- Write scenarios for concepts
- Exchange with classmates
- Practice application
- Build connections

### Research Study Organization

**For each major study, know:**
- **Researcher(s)**: Who conducted it?
- **Purpose**: What question asked?
- **Method**: How was it done?
- **Results**: What was found?
- **Conclusion**: What does it mean?
- **Significance**: Why does it matter?

**Example - Loftus & Palmer (1974):**
- **Researchers**: Elizabeth Loftus and John Palmer
- **Purpose**: How does wording affect eyewitness memory?
- **Method**: Showed car accident video, varied verb in question ("hit" vs "smashed")
- **Results**: "Smashed" group estimated higher speed
- **Conclusion**: Leading questions distort memory
- **Significance**: Implications for eyewitness testimony reliability

**Organization system:**
- Flashcards for each study
- Grouped by topic
- Include researcher and year
- Add one-sentence summary

### Concept Mapping

**Visual connections:**
- Place main concept in center
- Branch out to related ideas
- Show relationships with lines
- Add examples at edges
- Use colors for categories

**Example map - Memory:**
- Center: "Memory Systems"
- Branches: Sensory, Short-term, Long-term
- Sub-branches: Types, processes, theories
- Examples: Specific studies and phenomena

### The Feynman Technique

**Four steps:**
1. Choose concept (e.g., classical conditioning)
2. Explain in simple language (no jargon)
3. Identify knowledge gaps
4. Review and simplify

**Example:**

**Complex**: "Classical conditioning involves pairing a neutral stimulus with an unconditioned stimulus to produce a conditioned response."

**Simple**: "If you ring a bell every time you feed a dog, eventually the dog will drool just hearing the bell, even without food."

## Remembering Researchers and Studies

### Mnemonic Devices

**For multiple theorists:**
Create story or sentence using first letters

**Example - Learning theorists:**
"People Say Problems Bring Sadness"
- Pavlov (classical conditioning)
- Skinner (operant conditioning)
- Piaget (cognitive development)
- Bandura (social learning)
- Seligman (learned helplessness)

### Timeline Creation

**Chronological organization:**
- Place theories/studies on timeline
- See evolution of ideas
- Understand context
- Remember order

**Major eras:**
- Structuralism and functionalism (1870s-1890s)
- Psychoanalysis (1900s-1920s)
- Behaviorism (1920s-1950s)
- Cognitive revolution (1950s-1970s)
- Contemporary psychology (1970s-present)

### Study Association Method

**Link concepts together:**
- "Pavlov's dogs" → Classical conditioning
- "Skinner box" → Operant conditioning
- "Little Albert" → Watson, conditioned fear
- "Bobo doll" → Bandura, observational learning

## Statistics in Psychology

### Descriptive Statistics

**Measures of central tendency:**
- Mean (average)
- Median (middle value)
- Mode (most frequent)

**Measures of variability:**
- Range
- Standard deviation
- Variance

**Study approach:**
- Practice calculations
- Understand when to use each
- Interpret in context

### Inferential Statistics

**Key concepts:**
- Null hypothesis
- p-value and significance
- Type I and Type II errors
- Effect size

**Statistical tests:**
- t-tests
- ANOVA
- Chi-square
- Correlation

**Focus on:**
- What test answers what question
- Interpreting results
- Understanding significance
- Recognizing limitations

## Common Psychology Study Mistakes

### Mistake 1: Passive Reading

**The problem:**
- Just reading textbook
- Highlighting everything
- Not engaging with material

**The fix:**
- Active reading with questions
- Create practice questions
- Teach concepts to others
- Apply to real situations

### Mistake 2: Confusing Similar Terms

**The problem:**
- Many similar-sounding concepts
- Easy to mix up (e.g., assimilation vs accommodation)

**The fix:**
- Create comparison charts
- Use visual distinctions
- Practice with examples
- Test yourself frequently

### Mistake 3: Ignoring Applications

**The problem:**
- Learning theory without application
- Not seeing relevance
- Missing connections

**The fix:**
- Find real-world examples
- Apply to own life
- Read current research
- Think critically

### Mistake 4: Not Understanding Research

**The problem:**
- Memorizing study names
- Not understanding methodology
- Missing significance

**The fix:**
- Analyze studies deeply
- Critique methodology
- Consider implications
- Compare approaches

## Exam Preparation Strategies

### Multiple Choice Tips

**Strategy:**
- Read question carefully
- Eliminate obviously wrong answers
- Watch for absolute words (always, never)
- Consider all options
- Don't overthink

**Common question types:**
- Definition questions
- Application scenarios
- Study identification
- Best example questions

### Essay Questions

**Structure:**
- Clear thesis statement
- Use psychological terms
- Cite research/theories
- Provide examples
- Synthesize concepts

**Example prompt:**
"Discuss the nature vs nurture debate in psychology"

**Good response includes:**
- Define both terms
- Cite relevant research (twin studies, adoption studies)
- Mention theorists
- Provide examples (language acquisition, intelligence)
- Conclude with interactionist perspective

### Free Response (AP Psychology)

**Format:**
- Define each term
- Apply to scenario
- Show understanding
- Be specific

**Tips:**
- Answer all parts
- Use proper terminology
- Give concrete examples
- Stay on topic

## Study Schedule for Psychology

### Weekly

- 3 hours: Lecture and reading
- 2 hours: Creating study materials (flashcards, concept maps)
- 2 hours: Practice questions
- 1 hour: Review previous material

### Before Exams

**Two weeks out:**
- Review all notes
- Create master study guide
- Identify weak areas

**One week out:**
- Daily practice tests
- Focus on weak areas
- Study group review
- Teach concepts aloud

**Night before:**
- Light review only
- Review researcher names
- Quick concept check
- Get good sleep

## Essential Psychology Resources

**Textbooks:**
- Myers' Psychology (comprehensive)
- Zimbardo's Psychology Core Concepts
- Your course textbook

**Online:**
- **inspir**: AI psychology tutor
- Khan Academy (AP Psychology)
- Crash Course Psychology
- APA website

**Research:**
- PsycINFO database
- Google Scholar
- Research summaries
- Classic studies collection

## Final Psychology Study Tips

1. **Understand, don't memorize**: Focus on concepts
2. **Use real examples**: Makes abstract concrete
3. **Create connections**: Link concepts together
4. **Practice application**: Use case studies
5. **Review regularly**: Spaced repetition works
6. **Stay current**: Read psychology news
7. **Think critically**: Evaluate research
8. **Teach others**: Tests understanding
9. **Use mnemonics**: For lists and names
10. **Apply to life**: Psychology is everywhere

## Master Psychology with AI Help

Need explanations of psychological concepts or help with research studies? **[Try inspir's psychology tutor free for 14 days](https://inspir.uk/pricing)**.

---

**Related Resources:**
- [Active Recall Technique](https://inspir.uk/blog/active-recall-study-technique)
- [Mind Mapping Guide](https://inspir.uk/blog/mind-mapping-visual-learning-guide)
- [Flashcard System](https://inspir.uk/tools/flashcards)`,
    seo_title: 'Psychology Study Guide: Master Theories & Research (2025)',
    seo_description: 'Master psychology with strategies for theories, research methods, and concepts. Understand cognitive, social, and developmental psychology.',
    seo_keywords: ['psychology study guide', 'how to study psychology', 'psychology tips', 'psychology theories', 'psychology research', 'psychology exam prep', 'learn psychology', 'psychology concepts', 'AP psychology study', 'psychology student'],
    status: 'published',
    published_at: new Date().toISOString()
  },

  {
    title: 'Statistics for Students: Understanding Data and Analysis',
    slug: 'statistics-for-students-guide',
    author_name: 'Dr. Sarah Chen',
    category: 'subject-help',
    excerpt: 'Master statistics with clear explanations of data analysis, probability, and hypothesis testing. Learn to interpret results and avoid common mistakes.',
    content: `# Statistics for Students: Understanding Data and Analysis

Statistics transforms data into insights through mathematical analysis. Success requires understanding concepts, practicing calculations, and interpreting results correctly.

## Why Statistics Feels Challenging

**Abstract concepts:**
- Probability and distributions
- Hypothesis testing logic
- Statistical significance
- Type I and II errors

**Formula-heavy:**
- Multiple equations to remember
- Similar formulas with different uses
- Calculation complexity

**Conceptual understanding needed:**
- Can't just memorize formulas
- Must know when to use each test
- Interpretation crucial

## Fundamental Statistical Concepts

### Descriptive Statistics

**Summarizing data:**

**Measures of central tendency:**
- **Mean**: Average (sum ÷ count)
- **Median**: Middle value when ordered
- **Mode**: Most frequent value

**When to use each:**
- Mean: Symmetric distributions, no outliers
- Median: Skewed data, outliers present
- Mode: Categorical data, bimodal distributions

**Measures of spread:**
- **Range**: Max - min
- **Variance**: Average squared deviation from mean
- **Standard deviation**: Square root of variance

**Why spread matters:**
- Shows data variability
- Indicates reliability
- Helps compare datasets

### Data Visualization

**Common graphs:**
- **Histogram**: Distribution of continuous data
- **Box plot**: Shows median, quartiles, outliers
- **Scatter plot**: Relationship between variables
- **Bar chart**: Comparing categories

**Choosing the right graph:**
- One variable, continuous → Histogram
- Multiple groups comparison → Box plot or bar chart
- Two variables → Scatter plot
- Time series → Line graph

### Probability Basics

**Core concepts:**
- Probability: 0 to 1 scale
- Independent events: Don't affect each other
- Mutually exclusive: Can't both happen
- Conditional probability: P(A|B)

**Common distributions:**

**Normal distribution:**
- Bell-shaped curve
- Symmetric around mean
- 68-95-99.7 rule
- Foundation for many tests

**t-distribution:**
- Similar to normal
- Heavier tails
- Used with small samples

**Chi-square distribution:**
- Skewed right
- Used for categorical data

## Inferential Statistics

### Sampling and Estimation

**Why sample?**
- Can't measure entire population
- Cost and time constraints
- Sample represents population

**Sampling methods:**
- Random sampling (best)
- Stratified sampling
- Cluster sampling
- Convenience sampling (weakest)

**Key concepts:**
- Population parameter vs sample statistic
- Sampling distribution
- Central limit theorem
- Standard error

### Confidence Intervals

**What they are:**
- Range likely to contain true parameter
- Expressed with confidence level (95%, 99%)
- Wider interval = more confidence

**Interpretation:**
- "95% confident true mean is between X and Y"
- NOT "95% probability mean is in this range"
- Confidence about method, not specific interval

**Factors affecting width:**
- Sample size (larger n = narrower CI)
- Variability (larger SD = wider CI)
- Confidence level (higher confidence = wider CI)

### Hypothesis Testing

**The logic:**
1. State null hypothesis (H₀)
2. State alternative hypothesis (H₁ or Hₐ)
3. Choose significance level (α, usually 0.05)
4. Calculate test statistic
5. Find p-value
6. Make decision

**Example:**

**Research question**: Does tutoring improve test scores?

**H₀**: Tutoring has no effect (μ₁ = μ₂)
**H₁**: Tutoring improves scores (μ₁ > μ₂)
**α**: 0.05
**Test**: Independent samples t-test
**Result**: p = 0.03
**Decision**: Reject H₀, tutoring appears effective

**p-value interpretation:**
- p < α: Reject null hypothesis
- p ≥ α: Fail to reject null hypothesis
- NOT "accept" null hypothesis

**Common misconceptions:**
- p-value is NOT probability hypothesis is true
- Significance doesn't mean importance
- Failure to reject ≠ proving null true

## Common Statistical Tests

### t-tests

**One-sample t-test:**
- Compare sample mean to known value
- Example: Is class average different from 75?

**Independent samples t-test:**
- Compare means of two groups
- Example: Men vs women heights

**Paired samples t-test:**
- Compare means of related groups
- Example: Before vs after treatment

**Assumptions:**
- Approximately normal distribution
- Independent observations
- Equal variances (for independent t-test)

### ANOVA

**Purpose:**
- Compare means of 3+ groups
- One dependent variable

**Why not multiple t-tests?**
- Inflates Type I error rate
- ANOVA controls error

**Types:**
- One-way ANOVA: One independent variable
- Two-way ANOVA: Two independent variables
- Repeated measures: Same subjects multiple times

**Post-hoc tests:**
- If ANOVA significant, which groups differ?
- Tukey HSD, Bonferroni correction
- Control family-wise error rate

### Chi-Square Tests

**Goodness of fit:**
- Do observed frequencies match expected?
- Example: Dice fairness

**Test of independence:**
- Are two categorical variables related?
- Example: Gender and major choice

**Requirements:**
- Categorical data
- Independent observations
- Expected frequency ≥ 5 per cell

### Correlation and Regression

**Correlation (r):**
- Measures strength and direction of linear relationship
- Range: -1 to +1
- r = 0: No linear relationship
- r near ±1: Strong relationship

**Important:** Correlation ≠ causation

**Regression:**
- Predicts one variable from another
- Equation: y = mx + b
- Slope (m) and intercept (b)
- R² = proportion of variance explained

**Assumptions:**
- Linear relationship
- Homoscedasticity (constant variance)
- Normality of residuals
- Independent observations

## Effective Statistics Study Strategies

### Formula Sheet Organization

**Create master sheet:**
- Group formulas by topic
- Include when to use each
- Add example with numbers
- Note key assumptions

**Format:**
- **Test name**
- **Formula**: [equation]
- **Use when**: [conditions]
- **Example**: [quick calculation]

### Practice with Real Data

**Don't just use textbook examples:**
- Collect your own data
- Analyze from real sources
- Download public datasets
- Makes concepts concrete

**Data sources:**
- Sports statistics
- Weather data
- Academic records (anonymized)
- Survey responses

### The Interpretation Focus

**For each test, practice:**
1. State hypotheses
2. Check assumptions
3. Calculate test statistic
4. Find p-value
5. Make decision
6. **Interpret in context**

**Example interpretation:**

❌ Bad: "p = 0.03, reject null"

✅ Good: "With p = 0.03 < 0.05, we reject the null hypothesis and conclude there is statistically significant evidence that tutoring improves test scores by an average of 8.5 points (95% CI: 1.2 to 15.8 points)."

### Visual Understanding

**Draw distributions:**
- Sketch normal curves
- Show rejection regions
- Mark critical values
- Shade p-value areas

**Creates intuition:**
- What does p-value represent?
- Why does sample size matter?
- How do outliers affect tests?

## Common Statistics Mistakes

### Mistake 1: Confusing Population and Sample

**The problem:**
- Using wrong symbols (μ vs x̄)
- Applying wrong formulas
- Incorrect interpretation

**The fix:**
- Population: μ, σ (parameters)
- Sample: x̄, s (statistics)
- Clear notation consistently

### Mistake 2: Misinterpreting p-values

**Wrong interpretations:**
- "p = 0.05 means 5% chance hypothesis is true"
- "p = 0.06 means no effect"
- "p = 0.001 means huge effect"

**Correct understanding:**
- p-value is probability of data (or more extreme) given null hypothesis is true
- Arbitrary threshold (α = 0.05)
- Says nothing about effect size

### Mistake 3: Ignoring Assumptions

**The problem:**
- Running tests without checking assumptions
- Violating normality, independence
- Results invalid

**The fix:**
- Check assumptions first
- Use appropriate tests
- Consider non-parametric alternatives
- Report assumption violations

### Mistake 4: Data Dredging

**The problem:**
- Testing many hypotheses
- Reporting only significant results
- p-hacking

**The fix:**
- Pre-specify hypotheses
- Correct for multiple comparisons
- Report all tests conducted
- Use appropriate α adjustments

## Using Technology Effectively

### Statistical Software

**Options:**
- **Excel**: Basic calculations, graphing
- **SPSS**: User-friendly, point-and-click
- **R**: Free, powerful, programming required
- **Python**: Flexible, general programming
- **GraphPad**: t-tests, ANOVA, simple analyses

**Learning approach:**
- Start with calculations by hand
- Then use software to check
- Understand output
- Don't blindly trust results

### Calculator Skills

**Essential functions:**
- Mean, standard deviation
- t-tests
- Regression
- Probability distributions

**Practice:**
- Know where functions are
- Verify with hand calculations
- Understand what calculator does

## Study Schedule for Statistics

### Weekly

- 2 hours: Concepts and theory
- 3 hours: Practice problems
- 1 hour: Software practice
- 1 hour: Review and self-testing

### Before Exams

**Formula sheet creation:**
- Allowed? Create comprehensive sheet
- Not allowed? Practice until memorized

**Practice exams:**
- Timed conditions
- Review all mistakes
- Understand why wrong

**Concept review:**
- When to use each test
- Assumption checking
- Interpretation practice

## Statistics Exam Tips

### Multiple Choice

**Strategy:**
- Eliminate impossible answers
- Check units and direction
- Use process of elimination
- Verify calculations

**Common traps:**
- Correlation vs causation
- Population vs sample
- One-tailed vs two-tailed
- Type I vs Type II errors

### Calculation Problems

**Show all work:**
- Write formula
- Substitute values
- Show calculation steps
- Include units
- Check reasonableness

**Partial credit:**
- Even if final answer wrong
- Correct method = points
- Clear work helps grader

### Interpretation Questions

**Structure:**
- State conclusion clearly
- Use appropriate terminology
- Reference statistical evidence
- Answer in context of problem

## Essential Statistics Resources

**Textbooks:**
- OpenIntro Statistics (free online)
- Your course textbook
- Khan Academy (free videos)

**Software:**
- R (free, powerful)
- Excel (accessible)
- Online calculators

**Practice:**
- **inspir**: AI statistics tutor
- Practice problem sets
- Old exams
- Real datasets

## Final Statistics Study Tips

1. **Understand concepts first**: Then memorize formulas
2. **Practice interpretation**: Numbers mean nothing without context
3. **Check assumptions**: Invalid if violated
4. **Use real examples**: Makes abstract concrete
5. **Draw pictures**: Visualize distributions
6. **Learn software**: But understand what it does
7. **Practice, practice, practice**: Statistics requires doing
8. **Don't fear mistakes**: Learn from them
9. **Ask "does this make sense?"**: Reality check
10. **Stay organized**: Keep formulas and notes systematic

## Get Statistics Help

Confused about hypothesis testing or confidence intervals? **[Try inspir's statistics tutor free for 14 days](https://inspir.uk/pricing)** for step-by-step explanations.

---

**Related Resources:**
- [Math Solver](https://inspir.uk/tools/math-solver)
- [Visual Learning Tools](https://inspir.uk/tools/visual-learning)
- [Study Schedule Creator](https://inspir.uk/tools/ai-planner)`,
    seo_title: 'Statistics Study Guide: Data Analysis & Testing (2025)',
    seo_description: 'Master statistics with clear explanations of data analysis, probability, and hypothesis testing. Learn to interpret results correctly.',
    seo_keywords: ['statistics study guide', 'how to study statistics', 'statistics tips', 'hypothesis testing', 'statistics for students', 'learn statistics', 'statistics help', 'statistics exam prep', 'data analysis', 'probability guide'],
    status: 'published',
    published_at: new Date().toISOString()
  },

  {
    title: 'Research Paper Writing: Complete Academic Guide',
    slug: 'writing-research-papers-guide',
    author_name: 'Emily Parker',
    category: 'subject-help',
    excerpt: 'Write excellent research papers with effective strategies for topic selection, research, outlining, writing, and citation. Master academic writing.',
    content: `# Research Paper Writing: Complete Academic Guide

Research papers synthesize existing knowledge, present original analysis, and contribute to academic discourse. Success requires careful research, critical thinking, and clear academic writing.

## Understanding Research Papers

**Key characteristics:**
- Original analysis or argument
- Evidence from credible sources
- Proper citation of all sources
- Academic tone and structure
- Contributes to field knowledge

**Not just a report:**
- Must have thesis/argument
- Synthesize multiple sources
- Show critical thinking
- Add your interpretation

## The Research Paper Process

### Step 1: Choose and Refine Topic

**Starting broad:**
- General interest area
- Course-related topic
- Current issues in field

**Narrowing down:**
- Too broad: "Climate change"
- Better: "Climate change effects on coastal cities"
- Focused: "Economic impact of rising sea levels on Miami's real estate market (2000-2025)"

**Topic criteria:**
- Specific enough for depth
- Broad enough for sources
- Interesting to you
- Appropriate scope for length
- Researchable with available resources

### Step 2: Preliminary Research

**Goals:**
- Understand topic background
- Identify key issues
- Find potential sources
- Refine research question

**Where to start:**
- Course textbooks
- Encyclopedia articles
- Review articles
- Recent news coverage

**Develop research question:**
- Should be specific
- Answerable through research
- Significant to field
- Not yes/no question

**Example:**
- Weak: "Is social media bad?"
- Strong: "How does social media use correlate with anxiety levels in college students?"

### Step 3: Find and Evaluate Sources

**Source types:**

**Primary sources:**
- Original research articles
- Historical documents
- Raw data
- First-hand accounts

**Secondary sources:**
- Review articles
- Textbooks
- Analysis and commentary
- Synthesis of primary sources

**Where to search:**
- Library databases (JSTOR, EBSCO, PubMed)
- Google Scholar
- University library catalog
- Subject-specific databases

**Evaluating sources:**
- **Authority**: Who wrote it? Credentials?
- **Accuracy**: Peer-reviewed? Evidence-based?
- **Currency**: When published? Still relevant?
- **Objectivity**: Biased? Balanced?
- **Coverage**: Depth of information?

**Academic vs non-academic:**
- Prefer peer-reviewed journals
- Books from university presses
- .edu and .gov websites
- Avoid Wikipedia as source (use for background only)

### Step 4: Take Research Notes

**Effective note-taking:**
- One idea per note card/file
- Always include citation info
- Mark direct quotes clearly
- Paraphrase in your own words
- Add your thoughts/connections

**Organization systems:**
- By source
- By topic/theme
- Chronologically
- Whatever works for you

**Avoid plagiarism:**
- Quote marks for exact words
- Paraphrase thoroughly (change structure and words)
- Always cite, even when paraphrasing
- When in doubt, cite

### Step 5: Develop Thesis Statement

**Strong thesis characteristics:**
- Makes specific claim
- Arguable (not obvious fact)
- Supported by evidence
- Answers research question
- Provides roadmap

**Example progression:**

**Topic**: Social media and student performance

**Weak**: "Social media affects students."

**Better**: "Social media has negative effects on students."

**Strong**: "Excessive social media use (>3 hours daily) correlates with lower GPA among college students due to reduced study time, sleep deprivation, and decreased attention span."

### Step 6: Create Detailed Outline

**Standard structure:**

**I. Introduction**
   A. Hook
   B. Background/context
   C. Research question
   D. Thesis statement

**II. Body Section 1** (Main point 1)
   A. Sub-point with evidence
   B. Sub-point with evidence
   C. Analysis and connection to thesis

**III. Body Section 2** (Main point 2)
   A. Sub-point with evidence
   B. Sub-point with evidence
   C. Analysis

**IV. Body Section 3** (Main point 3)
   [Continue pattern]

**V. Counterargument** (if applicable)
   A. Present opposing view
   B. Refute or acknowledge limits

**VI. Conclusion**
   A. Restate thesis
   B. Summarize main points
   C. Broader implications
   D. Future research suggestions

### Step 7: Write First Draft

**Introduction strategies:**

**Hook options:**
- Surprising statistic
- Relevant quote
- Brief anecdote
- Provocative question
- Current event connection

**Background information:**
- Define key terms
- Historical context
- Scope of problem
- Why topic matters

**Thesis placement:**
- Usually end of introduction
- Clear and specific
- Prepares reader for argument

**Body paragraphs:**

**MEAL structure:**
- **M**ain idea (topic sentence)
- **E**vidence (quote/data/example)
- **A**nalysis (explain significance)
- **L**ink (connect to thesis)

**Example paragraph:**

"Social media use directly impacts study time allocation. Smith et al. (2023) found that students spending 3+ hours daily on social media studied 40% less than peers with minimal use. This reduction in study time likely explains the observed correlation with lower GPA, as less time spent engaging with course material naturally leads to weaker understanding and performance. This finding supports the central argument that excessive social media use undermines academic success."

**Integrating sources:**
- Introduce quotes with context
- Quote selectively (key phrases, not paragraphs)
- Always analyze after quoting
- Vary introduction styles
- Balance quotes with your analysis

**Citation integration styles:**

**Narrative citation:**
"According to Johnson (2022), climate change will cost billions."

**Parenthetical citation:**
"Climate change will cost billions (Johnson, 2022)."

**Direct quote:**
"Johnson (2022) warns that 'climate costs will exceed $2 trillion annually by 2050' (p. 45)."

**Conclusion elements:**
- Restate thesis (new words)
- Synthesize main arguments
- Avoid new information
- Broader significance
- Call to action or future research

### Step 8: Revise and Edit

**Revision levels:**

**Content revision** (big picture):
- Does thesis match argument?
- Is evidence sufficient?
- Are paragraphs organized logically?
- Is analysis deep enough?
- Any gaps in logic?

**Paragraph revision:**
- Does each paragraph have clear point?
- Topic sentences effective?
- Smooth transitions?
- Evidence supports claims?

**Sentence revision:**
- Vary sentence structure
- Eliminate wordiness
- Strengthen weak verbs
- Active vs passive voice
- Clear and precise language

**Editing** (final polish):
- Grammar and punctuation
- Spelling
- Citation formatting
- Consistency
- Formatting requirements

### Step 9: Format and Cite Properly

**Common citation styles:**

**MLA** (humanities):
- In-text: (Author page)
- Works Cited at end
- Example: (Smith 45)

**APA** (social sciences):
- In-text: (Author, year)
- References at end
- Example: (Smith, 2023)

**Chicago** (history):
- Footnotes or endnotes
- Bibliography at end
- Example: Smith, Book Title, 45.

**Citation tools:**
- Zotero
- Mendeley
- EasyBib
- Citation generators (check accuracy!)

**Formatting checklist:**
- [ ] Correct margins (usually 1")
- [ ] Proper font (Times New Roman 12pt usually)
- [ ] Double-spaced (unless specified otherwise)
- [ ] Page numbers
- [ ] Title page (if required)
- [ ] Heading/header
- [ ] Citations formatted correctly
- [ ] Bibliography/Works Cited complete

## Common Research Paper Mistakes

### Mistake 1: Weak Thesis

**Problem:**
- Too broad
- States fact, not argument
- Vague

**Fix:**
- Make specific claim
- Ensure arguable
- Preview main points

### Mistake 2: Insufficient Sources

**Problem:**
- Too few sources
- Only one perspective
- Outdated sources

**Fix:**
- Multiple credible sources
- Variety of perspectives
- Current research

### Mistake 3: Poor Integration

**Problem:**
- Dropped quotes
- Too many long quotes
- No analysis

**Fix:**
- Introduce all quotes
- Keep quotes concise
- Always analyze
- Balance quote and your voice

### Mistake 4: Plagiarism

**Problem:**
- Copying without quotes/citation
- Inadequate paraphrasing
- Missing citations

**Fix:**
- Always cite sources
- True paraphrasing (rewrite completely)
- When in doubt, cite
- Use plagiarism checker

## Research Paper Checklist

**Before submitting:**
- [ ] Thesis clear and specific
- [ ] Organized logically
- [ ] All claims supported with evidence
- [ ] Sources properly cited
- [ ] Works Cited/References complete
- [ ] Formatted correctly
- [ ] Proofread multiple times
- [ ] Read aloud for flow
- [ ] Met all assignment requirements
- [ ] Submitted on time

## Time Management

### For 8-10 page paper:

**Week 1:**
- Choose and refine topic
- Preliminary research
- Develop research question

**Week 2:**
- In-depth research
- Take detailed notes
- Develop thesis

**Week 3:**
- Create detailed outline
- Write first draft
- Gather any additional sources

**Week 4:**
- Revise content
- Edit for clarity
- Format and proofread
- Submit

## Essential Research Tools

**Citation management:**
- Zotero (free, excellent)
- Mendeley (free)
- EndNote (paid)

**Writing:**
- Google Docs (collaboration)
- Microsoft Word (standard)
- Scrivener (organizing long papers)

**Research:**
- Google Scholar
- Library databases
- **inspir** for organization and feedback

**Editing:**
- Grammarly (grammar check)
- Hemingway Editor (clarity)
- Read aloud (catches errors)

## Final Research Paper Tips

1. **Start early**: Research takes time
2. **Stay organized**: Track sources from start
3. **Cite as you write**: Don't wait until end
4. **Multiple drafts**: First draft always needs work
5. **Get feedback**: Peer review, writing center
6. **Read aloud**: Catches awkward phrasing
7. **Follow requirements**: Check assignment sheet
8. **Backup your work**: Cloud storage essential
9. **Proofread carefully**: Errors undermine credibility
10. **Don't plagiarize**: Always cite sources

## Get Research Paper Help

Need help organizing research or refining your thesis? **[Try inspir's writing tutor free for 14 days](https://inspir.uk/pricing)** for instant feedback.

---

**Related Resources:**
- [Note-Taking Methods](https://inspir.uk/blog/cornell-note-taking-system-guide)
- [Study Schedule Creator](https://inspir.uk/tools/ai-planner)
- [AI Writing Assistant](https://inspir.uk/chat)`,
    seo_title: 'Research Paper Writing Guide: Complete Steps (2025)',
    seo_description: 'Write excellent research papers with strategies for research, outlining, writing, and citation. Master academic writing.',
    seo_keywords: ['research paper writing', 'how to write research paper', 'academic writing', 'research paper guide', 'research paper tips', 'citation guide', 'thesis statement', 'research methods', 'academic paper', 'college writing'],
    status: 'published',
    published_at: new Date().toISOString()
  }
]

async function seedPosts() {
  console.log('🌱 Seeding Psychology, Statistics, and Research Writing posts...\n')

  try {
    const { data: authors } = await supabase
      .from('seo_authors')
      .select('id, name')

    const { data: categories } = await supabase
      .from('seo_blog_categories')
      .select('id, slug')

    const subjectHelpCategory = categories.find(c => c.slug === 'subject-help')

    for (const post of posts) {
      const author = authors.find(a => a.name === post.author_name)

      const postData = {
        ...post,
        author_id: author.id,
        category_id: subjectHelpCategory.id,
        avg_read_time_minutes: calculateReadTime(post.content)
      }

      delete postData.author_name
      delete postData.category

      const { error } = await supabase
        .from('seo_blog_posts')
        .insert(postData)

      if (error) {
        console.log(`❌ Error: ${post.title}:`, error.message)
      } else {
        console.log(`✅ Created: ${post.title}`)
      }
    }

    console.log('\n🎉 All subject-specific help posts complete!')
    console.log('📊 Total seeded: 11 posts')

  } catch (error) {
    console.error('❌ Fatal error:', error)
  }
}

seedPosts()
