const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function calculateReadTime(content) {
  return Math.ceil(content.split(/\s+/).length / 200)
}

const subjectPosts = [
  {
    title: 'Physics Problem-Solving: Master Equations and Concepts',
    slug: 'physics-problem-solving-guide',
    author_name: 'Dr. Sarah Chen',
    category: 'subject-help',
    excerpt: 'Master physics with proven problem-solving strategies. Learn to tackle mechanics, electricity, thermodynamics, and more with confidence and systematic approaches.',
    content: `# Physics Problem-Solving: Master Equations and Concepts

Physics reveals how the universe works through mathematics and experimentation. Success requires strong problem-solving skills, conceptual understanding, and the ability to translate real-world situations into mathematical models.

## Why Physics Feels Difficult

**The mathematical challenge:**
- Complex equations with multiple variables
- Vector mathematics and trigonometry
- Calculus in advanced courses
- Abstract concepts made concrete through math

**The conceptual challenge:**
- Counterintuitive concepts (relativity, quantum mechanics)
- Multiple valid reference frames
- Hidden assumptions in problems
- Connecting math to physical reality

## The Physics Problem-Solving Framework

### Step 1: Read and Visualize

**Extract all information:**
- What is given? (known values)
- What are you solving for? (unknown)
- What are the constraints? (assumptions, conditions)
- What is the physical situation?

**Draw a diagram:**
- Sketch the scenario
- Label all quantities
- Show coordinate system
- Indicate forces, velocities, or fields
- Add dimensions and angles

### Step 2: Identify the Physics

**What principles apply?**
- Conservation laws (energy, momentum, charge)
- Newton's laws
- Kirchhoff's laws (circuits)
- Thermodynamic laws
- Wave principles

**What equations connect to these principles?**
- List relevant formulas
- Check units match
- Verify applicability

### Step 3: Plan Your Solution

**Choose a strategy:**
- Direct calculation (plug and solve)
- Conservation approach (before and after)
- Component method (break into x, y, z)
- Energy method (work-energy theorem)

**Set up equations:**
- Write equations with variable names
- Substitute known values later
- Keep track of signs (direction matters!)

### Step 4: Execute and Check

**Solve systematically:**
- Show all algebraic steps
- Include units throughout
- Cancel units like fractions
- Use proper significant figures

**Reality check:**
- Does the answer make physical sense?
- Are the units correct?
- Is the magnitude reasonable?
- Does the sign indicate correct direction?

## Physics Topics and Strategies

### Mechanics

**Key concepts:**
- Kinematics (motion without forces)
- Dynamics (F = ma)
- Work and energy
- Momentum and collisions

**Problem-solving tips:**
- Draw free-body diagrams for every object
- Break vectors into components
- Choose convenient coordinate systems
- Use energy when forces aren't constant

**Common equations:**
- v = v₀ + at
- x = x₀ + v₀t + ½at²
- F = ma
- W = F·d·cos(θ)
- KE = ½mv²
- PE = mgh

### Electricity and Magnetism

**Key concepts:**
- Electric fields and potential
- Circuits (series and parallel)
- Magnetic fields and forces
- Electromagnetic induction

**Problem-solving tips:**
- Use Kirchhoff's laws for circuits
- Draw electric field lines
- Apply right-hand rules for magnetic forces
- Track energy flow in circuits

**Common equations:**
- V = IR (Ohm's law)
- P = IV = I²R = V²/R
- F = qE (electric force)
- F = qvB (magnetic force)

### Thermodynamics

**Key concepts:**
- Heat and temperature
- Gas laws
- Laws of thermodynamics
- Heat transfer mechanisms

**Problem-solving tips:**
- Track energy conservation carefully
- Distinguish heat, work, and internal energy
- Use state functions for path-independent calculations
- Watch for sign conventions (heat in/out, work on/by)

**Common equations:**
- PV = nRT (ideal gas law)
- Q = mcΔT (heat capacity)
- ΔU = Q - W (first law)
- Efficiency = W/Qₕ

### Waves and Optics

**Key concepts:**
- Wave properties (frequency, wavelength, speed)
- Interference and diffraction
- Reflection and refraction
- Lenses and mirrors

**Problem-solving tips:**
- Draw ray diagrams for optics
- Use wave equation v = fλ
- Apply Snell's law for refraction
- Check for constructive/destructive interference

**Common equations:**
- v = fλ
- n₁sin(θ₁) = n₂sin(θ₂)
- 1/f = 1/dₒ + 1/dᵢ

## Common Physics Mistakes

### Mistake 1: Not Drawing Diagrams

**The problem:**
- Trying to visualize mentally
- Missing important details
- Confusing directions

**The fix:**
- Always sketch the situation
- Label everything
- Show coordinate system
- Draw vectors with arrows

### Mistake 2: Forgetting Vector Nature

**The problem:**
- Treating vectors as scalars
- Ignoring direction
- Adding magnitudes instead of components

**The fix:**
- Break into components
- Track signs carefully
- Use vector addition rules
- Check final direction

### Mistake 3: Unit Confusion

**The problem:**
- Mixing SI and non-SI units
- Forgetting to convert
- Losing track of units

**The fix:**
- Convert everything to SI at start
- Carry units through calculation
- Cancel units algebraically
- Verify final units match expected

### Mistake 4: Not Checking Answers

**The problem:**
- Moving on without verification
- Missing calculation errors
- Unrealistic results

**The fix:**
- Estimate before calculating
- Check order of magnitude
- Verify units
- Ask "does this make sense?"

## Study Strategies for Physics Success

### Practice Problem Types

**Work through:**
- Textbook end-of-chapter problems
- Online problem sets
- Old exams
- Challenge problems

**Focus on:**
- Understanding approach, not just answer
- Different problem variations
- Conceptual questions
- Multi-step problems

### Build Conceptual Understanding

**Go beyond formulas:**
- Understand derivations
- Know when formulas apply
- Recognize limiting cases
- Connect to real-world examples

**Ask yourself:**
- Why does this equation make sense?
- What happens if I change one variable?
- What are the assumptions?
- How does this relate to other concepts?

### Create a Formula Sheet

**Organize by topic:**
- Core equations
- When to use each
- Variable definitions
- Common constants

**Include:**
- Conversion factors
- Trigonometric identities
- Vector relationships
- Key values (g, c, k, etc.)

### Use Multiple Resources

**Textbook:**
- Primary source for theory
- Worked examples
- Practice problems

**Videos:**
- Khan Academy
- MIT OpenCourseWare
- Physics Girl
- MinutePhysics

**Problem-solving:**
- **inspir AI tutor** for instant help
- Study group discussions
- Office hours with instructor
- Online forums (Physics Stack Exchange)

## Exam Preparation

### Two Weeks Before

**Review fundamentals:**
- Redo homework problems
- Identify weak topics
- Create summary sheets
- Practice derivations

### One Week Before

**Intensive practice:**
- Take practice exams
- Time yourself
- Review all mistakes
- Focus on problem types

### Day Before

**Light review:**
- Skim formula sheet
- Quick problem review
- Rest well
- Prepare materials

### During Exam

**Strategy:**
- Read all problems first
- Start with easiest
- Show all work
- Estimate before calculating
- Circle back to difficult problems
- Check time periodically

## Physics Study Schedule

### Daily (45-60 minutes)

- 10 min: Review previous material
- 25 min: Work new problems
- 10 min: Read new concepts
- 10 min: Quick concept quiz

### Weekly (3-4 hours)

- Attend all lectures and labs
- Complete all homework
- Review lecture notes
- Work extra practice problems
- Study group session

## Essential Physics Tools

**Calculator:**
- Scientific calculator
- Know all functions
- Practice using it

**Reference:**
- Formula sheet (create your own)
- Constants table
- Unit conversion chart

**Digital:**
- **inspir** for AI tutoring
- PhET simulations
- Desmos for graphing
- Wolfram Alpha for checking

## Final Tips for Physics Mastery

1. **Practice daily**: Physics requires consistent problem-solving
2. **Draw everything**: Diagrams clarify thinking
3. **Understand, don't memorize**: Know why, not just what
4. **Check your work**: Catch errors before submission
5. **Learn from mistakes**: Each error teaches something
6. **Connect concepts**: Physics is unified, not isolated topics
7. **Ask for help early**: Don't wait until you're completely lost
8. **Think physically**: Does the math match reality?

## Get Instant Physics Help

Stuck on a physics problem? **[Try inspir's AI physics tutor free for 14 days](https://inspir.uk/pricing)** for step-by-step solutions and concept explanations.

---

**Related Resources:**
- [Math Solver for Physics Calculations](https://inspir.uk/tools/math-solver)
- [Study Schedule Creator](https://inspir.uk/blog/create-study-schedules)
- [Active Recall Technique](https://inspir.uk/blog/active-recall-study-technique)`,
    seo_title: 'Physics Problem-Solving Guide: Master Concepts (2025)',
    seo_description: 'Master physics with proven problem-solving strategies. Tackle mechanics, electricity, and thermodynamics with systematic approaches. Expert tips.',
    seo_keywords: ['physics problem solving', 'how to study physics', 'physics study guide', 'physics tips', 'physics equations', 'physics exam prep', 'physics help', 'learn physics effectively', 'physics strategies', 'physics for students'],
    status: 'published',
    published_at: new Date().toISOString()
  },

  {
    title: 'History Essay Writing: Research, Structure, and Analysis Guide',
    slug: 'history-essay-writing-guide',
    author_name: 'Emily Parker',
    category: 'subject-help',
    excerpt: 'Write compelling history essays with effective research, strong thesis statements, and historical analysis. Master argumentation, evidence, and citation for academic success.',
    content: `# History Essay Writing: Research, Structure, and Analysis Guide

History essays require critical thinking, research skills, and the ability to construct compelling arguments about the past. Success means going beyond memorizing facts to analyze causes, effects, and historical significance.

## What Makes History Essays Unique

**Not just storytelling:**
- Requires argument and analysis
- Must use primary and secondary sources
- Needs historical context
- Demands critical evaluation of evidence

**The challenge:**
- Synthesizing multiple perspectives
- Evaluating source reliability
- Making connections across time periods
- Writing clearly about complex events

## The History Essay Writing Process

### Step 1: Understand the Question

**Analyze the prompt carefully:**

**Key command words:**
- **Analyze**: Break down into components, examine relationships
- **Compare**: Identify similarities and differences
- **Contrast**: Focus on differences
- **Evaluate**: Assess importance, effectiveness, or value
- **Discuss**: Present multiple viewpoints
- **Explain**: Clarify causes and effects

**Example prompt analysis:**
"Analyze the causes of the French Revolution."
- Command: Analyze (break down and examine)
- Topic: Causes (not events or results)
- Subject: French Revolution
- Scope: Multiple causes needed

### Step 2: Research and Gather Evidence

**Types of sources:**

**Primary sources** (from the time period):
- Letters and diaries
- Government documents
- Newspapers
- Photographs
- Artifacts

**Secondary sources** (later analysis):
- History textbooks
- Academic articles
- Biographies
- Documentaries

**Research strategy:**
1. Start with course materials
2. Use library databases
3. Check source citations for leads
4. Take detailed notes with citations
5. Evaluate source credibility

**Note-taking system:**
- Record full citation immediately
- Direct quotes in quotation marks
- Paraphrase in your own words
- Add your analysis and connections

### Step 3: Develop Your Thesis

**A strong thesis:**
- Makes an arguable claim
- Answers the question directly
- States your main argument
- Previews your evidence structure

**Weak thesis examples:**
- ❌ "The Civil War happened from 1861-1865." (Statement of fact)
- ❌ "Many factors caused WWI." (Too vague)
- ❌ "Lincoln was a good president." (Too subjective, no argument)

**Strong thesis examples:**
- ✅ "Economic disparities between North and South, rather than slavery alone, were the primary cause of the Civil War."
- ✅ "While nationalism and alliances created tensions, the assassination of Archduke Franz Ferdinand served as the immediate catalyst for WWI."
- ✅ "Lincoln's Emancipation Proclamation, though politically motivated, fundamentally transformed the Civil War into a moral crusade against slavery."

### Step 4: Create an Outline

**Standard essay structure:**

**Introduction (1 paragraph):**
- Hook to grab attention
- Historical context
- Thesis statement

**Body (3-5 paragraphs):**
- Each paragraph = one main point
- Topic sentence states the point
- Evidence supports the point
- Analysis explains significance
- Transition to next point

**Conclusion (1 paragraph):**
- Restate thesis (differently)
- Summarize main points
- Broader significance
- Final thought

**Example outline:**

**Thesis:** Economic factors primarily caused the Civil War

I. Introduction
   - Hook: Quote about economic divide
   - Context: North vs South development
   - Thesis statement

II. Industrial vs. Agricultural Economies
   - North's industrialization
   - South's plantation system
   - Economic interdependence and tensions

III. Tariff Disputes
   - Northern support for tariffs
   - Southern opposition
   - Nullification Crisis evidence

IV. Economic Role of Slavery
   - Cotton economy dependence
   - Northern economic interests
   - Competing labor systems

V. Conclusion
   - Economic factors drove division
   - Slavery central but economically motivated
   - Lasting impacts

### Step 5: Write Your First Draft

**Introduction strategies:**

**Hook options:**
- Compelling quote from the period
- Surprising statistic
- Vivid scene description
- Provocative question

**Example:**
"In 1860, the average Northern wage laborer earned $300 annually, while a single enslaved person represented a $1,200 capital investment for Southern planters—a stark economic reality that would soon tear the nation apart."

**Body paragraph structure:**

**TEAL method:**
- **T**opic sentence: States main point
- **E**vidence: Quote or fact from source
- **A**nalysis: Explain significance
- **L**ink: Connect to thesis

**Example paragraph:**

**Topic:** "Industrial expansion created fundamentally different economic interests in North and South."

**Evidence:** "By 1860, Northern states produced 90% of the nation's manufactured goods, while the South remained 80% agricultural (Foner, 2010)."

**Analysis:** "This economic divergence meant that policies benefiting one region often harmed the other. Northern manufacturers wanted protective tariffs to compete with European imports, while Southern planters needed free trade to sell cotton internationally."

**Link:** "These incompatible economic systems made conflict increasingly likely."

**Using evidence effectively:**
- Integrate quotes smoothly
- Keep quotes concise (under 3 lines usually)
- Always cite sources
- Explain don't just drop quotes
- Use your own analysis

### Step 6: Revise and Polish

**Content revision checklist:**
- Does every paragraph support the thesis?
- Is evidence sufficient and relevant?
- Have I analyzed, not just summarized?
- Are transitions clear?
- Does conclusion tie everything together?

**Style and clarity:**
- Use active voice
- Vary sentence structure
- Define historical terms
- Avoid presentism (judging past by modern values)
- Maintain academic tone

**Citation and formatting:**
- Check citation style (Chicago, MLA, APA)
- Verify all sources cited
- Create bibliography
- Follow formatting guidelines
- Proofread carefully

## Common History Essay Mistakes

### Mistake 1: Narrative Instead of Analysis

**The problem:**
- Simply retelling events
- No argument or interpretation
- Missing the "so what?"

**The fix:**
- Always explain significance
- Answer "why does this matter?"
- Make an argument
- Analyze cause and effect

### Mistake 2: Insufficient Evidence

**The problem:**
- Making claims without support
- Using only one source
- Relying on generalizations

**The fix:**
- Multiple sources per claim
- Specific examples and data
- Direct quotes when powerful
- Statistics when available

### Mistake 3: Weak Thesis

**The problem:**
- No clear argument
- Just restating question
- Too broad or vague

**The fix:**
- Take a specific position
- Make it debatable
- Preview your argument
- Keep it focused

### Mistake 4: Poor Source Evaluation

**The problem:**
- Using unreliable sources
- Not considering bias
- Accepting claims uncritically

**The fix:**
- Check author credentials
- Consider source purpose
- Compare multiple perspectives
- Note publication date

## Writing for Different History Assignments

### DBQ (Document-Based Question)

**Strategy:**
- Read documents first
- Identify point of view in each
- Group documents by theme
- Use majority of documents
- Include outside knowledge

### Comparative Essay

**Organization options:**
- Point-by-point comparison
- Block method (all of A, then all of B)
- Similarities then differences

**Requirements:**
- Equal treatment of both subjects
- Clear basis for comparison
- Analytical not just descriptive

### Historiography Essay

**Focus:**
- How interpretations have changed
- Why historians disagree
- Evolution of historical understanding

**Structure:**
- Chronological (older to newer interpretations)
- Thematic (by interpretation type)

## Research and Citation Tips

### Finding Quality Sources

**Library resources:**
- JSTOR for academic articles
- Historical databases
- University archives
- Reference librarian help

**Online sources:**
- .edu and .gov sites more reliable
- Check Wikipedia citations, not article itself
- Google Scholar for academic work
- Digital archives (Library of Congress)

### Taking Research Notes

**Effective system:**
- One idea per note card/digital note
- Always include full citation
- Mark direct quotes clearly
- Add your thoughts/connections

**Organization:**
- By topic or theme
- Chronologically
- By source
- Whatever works for your brain

### Citation Styles

**Chicago Style** (most common for history):
- Footnotes or endnotes
- Bibliography at end
- Specific format for each source type

**Example:**
- Footnote: ¹Eric Foner, *The Fiery Trial* (New York: Norton, 2010), 45.
- Bibliography: Foner, Eric. *The Fiery Trial*. New York: Norton, 2010.

## Time Management for History Essays

### Week Before Due Date

- Complete all research
- Create detailed outline
- Write thesis statement
- Plan daily writing goals

### 3-4 Days Before

- Write full first draft
- Don't edit while writing
- Focus on getting ideas down
- Include all citations

### 2 Days Before

- Revise for content
- Strengthen analysis
- Add/remove evidence
- Improve transitions

### Day Before

- Edit for clarity
- Proofread carefully
- Check all citations
- Format properly
- Read aloud to catch errors

## History Essay Checklist

**Before submission:**
- [ ] Clear, arguable thesis
- [ ] Introduction with context
- [ ] Topic sentences for each paragraph
- [ ] Specific evidence from sources
- [ ] Analysis of evidence
- [ ] Transitions between paragraphs
- [ ] Conclusion with significance
- [ ] All sources cited properly
- [ ] Bibliography/Works Cited complete
- [ ] Proper formatting
- [ ] Proofread multiple times

## Tools for History Essays

**Writing:**
- **inspir** for outline help and feedback
- Grammarly for grammar checking
- Hemingway for clarity

**Research:**
- Zotero for citation management
- Library databases
- Google Scholar
- Archive.org

**Organization:**
- Note-taking apps
- Outline tools
- Timeline creators

## Final Tips for History Essay Success

1. **Start early**: Research takes time
2. **Choose focused topics**: Narrower is better
3. **Make an argument**: Don't just describe
4. **Use specific evidence**: Details matter
5. **Analyze, analyze, analyze**: Always explain significance
6. **Cite everything**: Better to over-cite
7. **Revise seriously**: First draft is never final
8. **Read your work aloud**: Catches awkward phrasing
9. **Get feedback**: Fresh eyes catch problems
10. **Learn from comments**: Apply feedback to next essay

## Level Up Your History Writing

Need help with research, outlines, or analysis? **[Try inspir's AI writing tutor free for 14 days](https://inspir.uk/pricing)** for instant feedback and guidance.

---

**Related Resources:**
- [Research Paper Writing Guide](https://inspir.uk/blog/writing-research-papers)
- [Note-Taking Methods](https://inspir.uk/blog/note-taking-methods-comparison)
- [Study Schedule Creator](https://inspir.uk/tools/ai-planner)`,
    seo_title: 'History Essay Writing Guide: Research & Analysis (2025)',
    seo_description: 'Write compelling history essays with effective research, thesis development, and analysis. Master structure, evidence, and argumentation.',
    seo_keywords: ['history essay writing', 'how to write history essays', 'history essay tips', 'historical analysis', 'history research', 'thesis statement history', 'history essay structure', 'DBQ writing', 'history paper guide', 'historical writing'],
    status: 'published',
    published_at: new Date().toISOString()
  },

  {
    title: 'English Literature Analysis: How to Write Better Literary Essays',
    slug: 'english-literature-analysis-guide',
    author_name: 'Emily Parker',
    category: 'subject-help',
    excerpt: 'Master literary analysis with techniques for close reading, theme identification, and essay writing. Learn to analyze poetry, novels, and plays with confidence.',
    content: `# English Literature Analysis: How to Write Better Literary Essays

Literary analysis goes beyond understanding the plot to examining how authors craft meaning through language, structure, and literary devices. Success requires close reading, critical thinking, and the ability to support interpretations with textual evidence.

## Understanding Literary Analysis

**What is literary analysis?**
- Examining how texts create meaning
- Analyzing author's choices and techniques
- Interpreting themes, symbols, and motifs
- Supporting interpretations with evidence

**Not plot summary:**
- Analysis explains *how* and *why*
- Focus on literary techniques
- Develop original interpretations
- Make arguments about meaning

## The Close Reading Process

### Step 1: Read Actively

**First reading:**
- Understand basic plot and characters
- Note initial reactions
- Mark confusing passages
- Don't worry about analysis yet

**Second reading:**
- Slow down deliberately
- Mark significant passages
- Look for patterns
- Question everything

**Annotation strategies:**
- Underline powerful language
- Circle repeated words/phrases
- Bracket key passages
- Write questions in margins
- Note literary devices
- Mark tone shifts

### Step 2: Identify Literary Elements

**Language and Style:**
- **Diction**: Word choice (formal, colloquial, archaic)
- **Syntax**: Sentence structure (simple, complex, fragments)
- **Imagery**: Sensory details
- **Figurative language**: Metaphors, similes, personification
- **Tone**: Author's attitude
- **Voice**: Narrator's personality

**Structure:**
- **Plot structure**: Exposition, rising action, climax, resolution
- **Narrative perspective**: First, second, or third person
- **Timeline**: Chronological, flashbacks, flash-forwards
- **Organization**: Chapter breaks, stanzas, acts/scenes

**Literary Devices:**
- **Symbolism**: Objects representing abstract ideas
- **Motifs**: Recurring elements
- **Allusion**: References to other works
- **Irony**: Contrast between expectation and reality
- **Foreshadowing**: Hints about future events
- **Theme**: Central ideas or messages

### Step 3: Develop Interpretations

**Ask analytical questions:**
- Why did the author make this choice?
- What effect does this create?
- How does this connect to themes?
- What is the significance?
- How does this compare to other elements?

**Example analysis:**

**Passage**: "The yellow wallpaper" in Charlotte Perkins Gilman's story

**Surface level**: The narrator doesn't like the wallpaper

**Deeper analysis**:
- **Symbol**: Wallpaper represents domestic confinement
- **Pattern**: Trapped woman in the pattern mirrors narrator's situation
- **Color**: Yellow suggests sickness, decay
- **Progression**: Narrator's obsession parallels mental deterioration
- **Theme**: Critique of medical treatment of women
- **Significance**: Physical space reflects psychological state

## Writing the Literary Analysis Essay

### Crafting a Strong Thesis

**A literary thesis:**
- Makes an arguable interpretation
- References specific literary elements
- Answers "how" or "why" questions
- Focuses on author's techniques

**Weak thesis examples:**
- ❌ "Hamlet is about revenge." (Too broad, no argument)
- ❌ "Shakespeare uses symbolism in Macbeth." (Obvious, not arguable)
- ❌ "The Great Gatsby is a good book." (Opinion, not analysis)

**Strong thesis examples:**
- ✅ "Through Hamlet's soliloquies, Shakespeare explores how excessive contemplation paralyzes action, suggesting that overthinking prevents decisive behavior."
- ✅ "Fitzgerald uses the symbolism of the green light to illustrate how Gatsby's idealization of the past blinds him to present reality."
- ✅ "Morrison's fragmented narrative structure in *Beloved* mirrors the psychological fragmentation caused by trauma, making form reflect content."

### Essay Structure

**Introduction:**
1. Hook (compelling opening)
2. Author, title, brief context
3. Brief relevant summary (1-2 sentences max)
4. Thesis statement

**Body Paragraphs:**
- Topic sentence (one claim supporting thesis)
- Context for evidence
- Direct quote or specific reference
- Analysis (the "how" and "why")
- Connection back to thesis

**Conclusion:**
- Restate thesis in new words
- Synthesize main points
- Broader significance
- Final insight (not just summary)

### The PETAL Paragraph Method

**P**oint: Topic sentence stating claim
**E**vidence: Quote or specific textual reference
**T**echnique: Name the literary device/element
**A**nalysis: Explain how it creates meaning
**L**ink: Connect to thesis

**Example paragraph:**

**Point**: "Fitzgerald uses weather imagery to reflect Gatsby's emotional state and foreshadow his downfall."

**Evidence**: "The rain fell in torrents as Gatsby reunited with Daisy, but 'the sun shone again' when they reconciled (Fitzgerald 88)."

**Technique**: "This weather symbolism correlates Gatsby's hopes directly with atmospheric conditions."

**Analysis**: "The sudden shift from storm to sunshine mirrors Gatsby's emotional volatility and his dependence on Daisy for happiness. However, the temporary nature of weather foreshadows the fragility of their reunion."

**Link**: "This technique reinforces the novel's theme of the impossibility of recapturing the past."

## Analyzing Different Literary Forms

### Poetry Analysis

**Focus areas:**
- Form (sonnet, free verse, haiku)
- Sound devices (rhyme, rhythm, alliteration)
- Line breaks and stanza divisions
- Imagery and figurative language
- Speaker vs. poet

**Approach:**
- Read aloud multiple times
- Note sound and rhythm
- Analyze each stanza
- Consider title significance
- Look for shifts in tone or perspective

### Novel Analysis

**Key elements:**
- Character development arcs
- Narrative perspective and reliability
- Symbolism and motifs
- Plot structure and pacing
- Setting and atmosphere
- Theme development

**Approach:**
- Track character changes
- Note recurring symbols
- Analyze pivotal scenes
- Consider chapter structure
- Examine opening and closing

### Drama Analysis

**Unique considerations:**
- Dialogue and subtext
- Stage directions
- Scene and act structure
- Dramatic irony
- Character relationships

**Approach:**
- Imagine staging
- Analyze character interactions
- Note dramatic tension
- Consider audience perspective
- Examine soliloquies and asides

## Using Textual Evidence Effectively

### Integrating Quotes

**The quote sandwich:**
1. **Introduce**: Set up context
2. **Quote**: Keep it concise
3. **Analyze**: Explain significance

**Example:**

❌ Poor integration:
"The author uses imagery. 'The fog rolled in like a blanket.'"

✅ Good integration:
"Steinbeck establishes an atmosphere of concealment and protection through fog imagery: 'The fog rolled in like a blanket' (23), suggesting both comfort and obscured vision that mirrors the characters' limited understanding of their situation."

**Quote integration techniques:**
- Full sentence quote with attribution
- Partial quote integrated grammatically
- Block quote (4+ lines, indented)
- Paraphrase with citation

### Avoiding Common Evidence Mistakes

**Don't:**
- Drop quotes without context
- Use quotes as topic sentences
- Quote obvious plot points
- Let quotes speak for themselves

**Do:**
- Always analyze after quoting
- Use quotes strategically
- Focus on significant language
- Explain the "how" and "why"

## Common Literary Analysis Mistakes

### Mistake 1: Plot Summary

**The problem:**
- Retelling what happens
- No analysis of how or why
- Missing literary techniques

**The fix:**
- Assume reader knows the plot
- Focus on significance
- Analyze author's choices
- Explain effects on reader

### Mistake 2: Outside Research Without Analysis

**The problem:**
- Relying on others' interpretations
- Not developing own ideas
- Losing your voice

**The fix:**
- Start with your own reading
- Use secondary sources to support
- Always return to text
- Make it your argument

### Mistake 3: Weak or Missing Analysis

**The problem:**
- Identifying devices without explaining
- "The author uses symbolism" (so what?)
- Not connecting to meaning

**The fix:**
- Always answer "how" and "why"
- Explain effect on reader
- Connect to themes
- Show significance

### Mistake 4: Broad Generalizations

**The problem:**
- Vague claims
- No specific evidence
- Universal statements

**The fix:**
- Be specific
- Use textual evidence
- Make focused claims
- Avoid absolutes

## Advanced Analysis Techniques

### Comparative Analysis

**Comparing texts:**
- Similar themes, different approaches
- Same author, different works
- Different time periods

**Structure:**
- Point-by-point comparison
- Analyze technique in both texts
- Explain significance of differences

### Historical/Cultural Context

**When to use:**
- Understanding allusions
- Interpreting social commentary
- Recognizing historical significance

**How to integrate:**
- Brief context only
- Always connect to text
- Support with evidence
- Don't let it overshadow analysis

### Theoretical Approaches

**Lenses for analysis:**
- Feminist criticism
- Marxist criticism
- Psychoanalytic criticism
- Post-colonial criticism

**Application:**
- Choose relevant lens
- Apply consistently
- Support with text
- Acknowledge limitations

## Literary Analysis Checklist

**Before writing:**
- [ ] Read text multiple times
- [ ] Annotate thoroughly
- [ ] Identify key literary elements
- [ ] Develop original thesis
- [ ] Gather specific evidence

**During writing:**
- [ ] Clear thesis statement
- [ ] Topic sentences with claims
- [ ] Integrated quotes
- [ ] Analysis after each quote
- [ ] Transitions between ideas

**Before submission:**
- [ ] Every paragraph supports thesis
- [ ] Analysis, not plot summary
- [ ] Specific textual evidence
- [ ] Proper MLA citations
- [ ] Proofread carefully

## Tools and Resources

**Digital tools:**
- **inspir** for essay feedback
- LitCharts for study guides
- Poetry Foundation for poems
- SparkNotes for context (not analysis!)

**Study techniques:**
- Close reading practice
- Annotation systems
- Commonplace book
- Discussion groups

## Time Management

### Week before due date

- Complete all readings
- Annotate thoroughly
- Brainstorm thesis ideas
- Gather evidence

### 3-4 days before

- Draft thesis
- Create detailed outline
- Write body paragraphs
- Find supporting quotes

### 2 days before

- Revise for analysis depth
- Strengthen connections
- Write intro and conclusion
- Check all citations

### Day before

- Edit for clarity
- Proofread carefully
- Read aloud
- Final formatting

## Final Tips for Literary Analysis Success

1. **Read actively**: Annotate everything
2. **Develop original ideas**: Trust your interpretation
3. **Focus on techniques**: Analyze how authors create meaning
4. **Use specific evidence**: Quote strategically
5. **Always analyze**: Never let quotes stand alone
6. **Connect to thesis**: Every paragraph supports your argument
7. **Revise deeply**: First draft is never enough
8. **Seek feedback**: Fresh perspective helps
9. **Practice regularly**: Analysis improves with repetition
10. **Enjoy the process**: Find what interests you

## Enhance Your Literary Analysis

Need help developing thesis statements or analyzing literary devices? **[Try inspir's AI English tutor free for 14 days](https://inspir.uk/pricing)** for instant guidance.

---

**Related Resources:**
- [Research Paper Writing](https://inspir.uk/blog/writing-research-papers)
- [Study Schedule Creator](https://inspir.uk/tools/ai-planner)
- [Note-Taking for Literature](https://inspir.uk/blog/cornell-note-taking-system-guide)`,
    seo_title: 'Literary Analysis Guide: Write Better Essays (2025)',
    seo_description: 'Master literary analysis with close reading, theme identification, and essay writing techniques. Analyze poetry, novels, and plays effectively.',
    seo_keywords: ['literary analysis', 'how to analyze literature', 'english essay writing', 'literary devices', 'close reading', 'literature essay tips', 'poetry analysis', 'novel analysis', 'literary criticism', 'english literature study'],
    status: 'published',
    published_at: new Date().toISOString()
  }
]

async function seedPosts() {
  console.log('🌱 Seeding Physics, History, and English Literature posts...\n')

  try {
    const { data: authors } = await supabase
      .from('seo_authors')
      .select('id, name')

    const { data: categories } = await supabase
      .from('seo_blog_categories')
      .select('id, slug')

    const subjectHelpCategory = categories.find(c => c.slug === 'subject-help')

    for (const post of subjectPosts) {
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

    console.log('\n🎉 Batch complete! 3 posts seeded.')

  } catch (error) {
    console.error('❌ Fatal error:', error)
  }
}

seedPosts()
