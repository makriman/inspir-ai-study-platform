const { createClient } = require('@supabase/supabase-js')
require('dotenv').config({ path: '.env.local' })

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
)

function calculateReadTime(content) {
  return Math.ceil(content.split(/\s+/).length / 200)
}

const subjectHelpPosts = [
  {
    title: 'How to Study Biology: Complete Guide to Mastering Life Science',
    slug: 'how-to-study-biology-guide',
    author_name: 'Dr. Sarah Chen',
    category: 'subject-help',
    excerpt: 'Master biology with proven study strategies. Learn how to understand complex biological systems, memorize terminology, and ace your biology exams with confidence.',
    content: `# How to Study Biology: Complete Guide to Mastering Life Science

Biology is the study of life itself, from microscopic cells to entire ecosystems. Success in biology requires understanding complex systems, mastering terminology, and connecting concepts across multiple scales.

## Why Biology Feels Overwhelming

### The Vocabulary Challenge

**Biology has its own language:**
- 15,000+ technical terms in a basic course
- Latin and Greek root words
- Similar-sounding terms with different meanings
- New vocabulary in every chapter

**The challenge:**
- Easy to confuse similar terms (mitosis vs. meiosis)
- Etymology helps but requires learning another system
- Memorization alone doesn't create understanding

### The Systems Thinking Requirement

**Biology is about connections:**
- Molecules → Cells → Tissues → Organs → Organisms → Ecosystems
- Every level affects the others
- Cause and effect relationships span multiple scales
- Nothing exists in isolation

## The 5-Step Biology Study System

### Step 1: Build a Concept Map Before Reading

**Before each chapter:**
1. Look at the headings and subheadings
2. Create a blank concept map showing how topics connect
3. Add question marks where you don't understand connections
4. Fill in as you read

**Why this works:**
- Activates prior knowledge
- Creates framework for new information
- Identifies gaps in understanding
- Makes reading purposeful

### Step 2: Learn Vocabulary in Context

**The context method:**
1. Never memorize terms in isolation
2. Always learn: term + function + significance
3. Create analogies to everyday objects
4. Draw simple diagrams for each term

**Example:**
- ❌ "Mitochondria: powerhouse of the cell"
- ✅ "Mitochondria: converts glucose into ATP (cellular energy) through cellular respiration, like a power plant converting fuel into electricity. Malfunction causes fatigue and disease."

**Vocabulary strategies:**
- Group related terms (all organelles together)
- Create comparison charts (DNA vs RNA, prokaryote vs eukaryote)
- Use mnemonic devices for processes (IPMAT for cell division phases)
- Practice using terms in sentences

### Step 3: Draw Everything

**Visual learning is essential for biology:**

**What to draw:**
- Cell structures and organelles
- Biological processes (photosynthesis, cellular respiration)
- Cycles (water cycle, nitrogen cycle, carbon cycle)
- Body systems and their interactions
- Food webs and ecosystems

**Drawing tips:**
- Don't worry about artistic quality
- Focus on accurate labels and arrows
- Show movement and flow
- Use colors to distinguish structures
- Annotate with functions

**The act of drawing:**
- Forces you to understand spatial relationships
- Reveals gaps in knowledge
- Creates memorable mental images
- Engages multiple brain regions

### Step 4: Master Biological Processes

**Processes like photosynthesis and cellular respiration need special attention:**

**The process breakdown method:**
1. **Inputs**: What goes in?
2. **Location**: Where does it happen?
3. **Steps**: What are the stages?
4. **Outputs**: What comes out?
5. **Purpose**: Why does it happen?
6. **Connections**: How does it relate to other processes?

**Example - Photosynthesis:**
- **Inputs**: CO₂, H₂O, sunlight
- **Location**: Chloroplasts (light reactions in thylakoids, Calvin cycle in stroma)
- **Steps**: Light reactions → Calvin cycle
- **Outputs**: Glucose (C₆H₁₂O₆), O₂
- **Purpose**: Convert light energy into chemical energy
- **Connections**: Opposite of cellular respiration, provides oxygen for aerobic organisms

### Step 5: Practice With Real-World Applications

**Make it relevant:**
- Connect topics to human health and disease
- Relate to current events (climate change, pandemics, GMOs)
- Think about evolutionary significance
- Consider ethical implications

**Application activities:**
- Read science news articles
- Watch documentaries
- Explain concepts to non-biology friends
- Consider career applications

## Study Strategies for Different Biology Topics

### Cell Biology

**Focus areas:**
- Cell structure and organelle functions
- Membrane transport mechanisms
- Cell communication
- Cell division (mitosis and meiosis)

**Study strategy:**
- Create detailed cell diagrams with labels
- Compare and contrast prokaryotic vs eukaryotic cells
- Animate processes in your mind
- Use analogies (cell as a city, factory, etc.)

### Genetics and Molecular Biology

**Focus areas:**
- DNA structure and replication
- Central dogma (DNA → RNA → Protein)
- Mendelian genetics and inheritance patterns
- Gene expression and regulation

**Study strategy:**
- Work through Punnett squares (lots of practice problems)
- Understand probability and chi-square analysis
- Trace information flow from gene to trait
- Study pedigrees and inheritance patterns

### Ecology and Evolution

**Focus areas:**
- Population dynamics
- Community interactions
- Energy flow and nutrient cycling
- Natural selection and evolutionary mechanisms

**Study strategy:**
- Think in terms of systems and interactions
- Study real ecosystems and case studies
- Understand evolutionary trade-offs
- Practice creating food webs

### Human Anatomy and Physiology

**Focus areas:**
- Organ systems and their functions
- Homeostasis mechanisms
- Physiological processes
- Disease and dysfunction

**Study strategy:**
- Learn system by system
- Understand structure-function relationships
- Study disease to understand normal function
- Use 3D models and apps

## Common Biology Study Mistakes

### Mistake 1: Passive Reading

**The problem:**
- Reading without engaging
- Highlighting everything
- Not testing yourself

**The fix:**
- Read with questions in mind
- Create study guides while reading
- Quiz yourself after each section

### Mistake 2: Memorizing Without Understanding

**The problem:**
- Cramming vocabulary lists
- Not connecting concepts
- Forgetting immediately after exams

**The fix:**
- Always ask "why?" and "how?"
- Explain concepts in your own words
- Teach someone else

### Mistake 3: Ignoring the Big Picture

**The problem:**
- Getting lost in details
- Not seeing how topics connect
- Missing themes

**The fix:**
- Start each study session with a concept map
- End with summarizing main themes
- Regularly review how topics interconnect

### Mistake 4: Not Practicing Enough

**The problem:**
- Only reading notes once
- Not testing yourself
- Passive review

**The fix:**
- Do practice problems daily
- Take practice quizzes
- Explain concepts aloud
- Use flashcards with active recall

## Exam Preparation Strategies

### Two Weeks Before

**Build your study foundation:**
1. Review all concept maps
2. Identify weak areas
3. Create study schedule
4. Gather all materials

### One Week Before

**Active practice:**
1. Work through practice exams
2. Create summary sheets for each unit
3. Quiz yourself daily
4. Study with peers

### Day Before

**Final review:**
1. Review summary sheets
2. Quick quiz on weak areas
3. Get good sleep (critical for memory consolidation)
4. Light review in morning

### Exam Day

**Performance tips:**
- Read questions carefully
- Draw diagrams if helpful
- Manage time (don't get stuck)
- Check answers if time permits

## Tools and Resources

### Essential Tools

**Digital:**
- **inspir**: AI tutor for biology questions and concept explanations
- **Quizlet**: Flashcards for vocabulary
- **BioDigital Human**: 3D anatomy tool
- **Khan Academy**: Video explanations

**Physical:**
- Whiteboard for drawing diagrams
- Colored pens for concept maps
- Index cards for flashcards
- Study group partners

### Recommended Study Techniques

1. **Active Recall**: Test yourself constantly
2. **Spaced Repetition**: Review at increasing intervals
3. **Feynman Technique**: Explain in simple terms
4. **Practice Testing**: Simulate exam conditions

## Biology Study Schedule Template

### Daily (30-45 minutes)

- 10 min: Review yesterday's notes
- 20 min: Study new material with concept mapping
- 10 min: Practice problems or flashcards
- 5 min: Quick quiz on today's topics

### Weekly (2-3 hours)

- Create comprehensive concept maps
- Work through practice exams
- Study group session
- Review and reorganize notes

## Final Tips for Biology Success

1. **Start early**: Don't cram the night before
2. **Draw constantly**: Visualize everything
3. **Ask "why"**: Understand the purpose behind every structure and process
4. **Connect concepts**: Biology is about systems, not isolated facts
5. **Use all your senses**: Watch videos, draw diagrams, explain aloud
6. **Stay curious**: Think about how biology applies to your life
7. **Practice regularly**: A little every day beats marathon sessions

## Take Your Biology Studies Further

Ready to master biology with AI-powered help? **[Try inspir's biology tutor free for 14 days](https://inspir.uk/pricing)** and get instant explanations, practice quizzes, and personalized study plans.

---

**Related Topics:**
- [Active Recall Study Technique](https://inspir.uk/blog/active-recall-study-technique)
- [Mind Mapping for Visual Learning](https://inspir.uk/blog/mind-mapping-visual-learning-guide)
- [AI Quiz Generator for Biology](https://inspir.uk/tools/quiz-generator)`,
    seo_title: 'How to Study Biology: Complete Guide & Tips (2025)',
    seo_description: 'Master biology with proven study strategies. Understand complex systems, memorize terminology, and ace biology exams. Expert tips for students.',
    seo_keywords: ['how to study biology', 'biology study guide', 'biology study tips', 'how to learn biology', 'biology exam prep', 'study biology effectively', 'biology study strategies', 'biology memorization techniques', 'biology test preparation', 'life science study guide'],
    status: 'published',
    published_at: new Date().toISOString()
  },

  {
    title: 'Chemistry Study Guide: Master Chemical Reactions and Problem-Solving',
    slug: 'chemistry-study-guide',
    author_name: 'Dr. Sarah Chen',
    category: 'subject-help',
    excerpt: 'Conquer chemistry with effective study strategies for equations, reactions, and problem-solving. Learn to balance equations, understand stoichiometry, and excel in chemistry.',
    content: `# Chemistry Study Guide: Master Chemical Reactions and Problem-Solving

Chemistry is the central science, connecting physics, biology, and earth science. Success requires mathematical skills, conceptual understanding, and the ability to visualize the invisible world of atoms and molecules.

## Why Chemistry Is Challenging

### The Abstract Nature

**You can't see what you're studying:**
- Atoms and molecules are invisible
- Reactions happen at molecular level
- Must visualize 3D structures from 2D drawings
- Abstract concepts like orbitals and electron clouds

### The Math Component

**Chemistry requires multiple math skills:**
- Algebra for solving equations
- Proportions for stoichiometry
- Logarithms for pH calculations
- Scientific notation for very large/small numbers

### The Volume of Information

**Three major content areas:**
- **Conceptual**: Understand atomic theory, bonding, reactions
- **Mathematical**: Solve stoichiometry, equilibrium, thermodynamics problems
- **Laboratory**: Know techniques, safety, and procedures

## The Ultimate Chemistry Study System

### Step 1: Master the Periodic Table

**The periodic table is your roadmap:**

**What to memorize:**
- First 20 elements (name and symbol)
- Group names (alkali metals, halogens, noble gases)
- Periodic trends (atomic radius, electronegativity, ionization energy)
- Common ions and charges

**How to use it:**
- Predict chemical behavior
- Understand bonding patterns
- Determine chemical formulas
- Solve stoichiometry problems

**Study techniques:**
- Create flashcards for elements
- Draw and label periodic trends
- Practice writing electron configurations
- Quiz yourself on ion charges

### Step 2: Visualize Molecular Structures

**Chemistry happens in 3D:**

**Visualization strategies:**
- Build molecular models (physical or digital)
- Draw Lewis structures constantly
- Practice VSEPR geometry
- Understand bond angles and molecular shape

**For each molecule, know:**
- Lewis structure (electron arrangement)
- Molecular geometry (3D shape)
- Bond angles
- Polarity
- Intermolecular forces

**Tools:**
- Molecular model kits
- Apps like MolView or ChemDoodle
- Draw structures while studying
- Use color coding for different atoms

### Step 3: Balance Equations Like a Pro

**Chemical equations are the language of chemistry:**

**Balancing strategy:**
1. Write unbalanced equation with correct formulas
2. Count atoms of each element on both sides
3. Start with most complex molecule
4. Balance polyatomic ions as units
5. Save hydrogen and oxygen for last
6. Check all atoms balance
7. Reduce to smallest whole numbers

**Example:**
- Unbalanced: C₃H₈ + O₂ → CO₂ + H₂O
- Balanced: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O

**Practice tips:**
- Do 10 balancing problems daily
- Time yourself to build speed
- Check answers immediately
- Understand, don't just guess and check

### Step 4: Master Stoichiometry

**Stoichiometry connects everything:**

**The BCA table method:**
- **B**efore (initial amounts)
- **C**hange (reaction amounts)
- **A**fter (final amounts)

**Stoichiometry roadmap:**
1. Write balanced equation
2. Convert given amount to moles
3. Use mole ratio from equation
4. Convert to desired unit

**Common conversions:**
- Grams ↔ Moles (use molar mass)
- Moles ↔ Moles (use coefficient ratio)
- Moles ↔ Liters (use 22.4 L/mol at STP for gases)
- Moles ↔ Particles (use Avogadro's number: 6.02 × 10²³)

**Key to success:**
- Write out every step
- Include units in all calculations
- Cancel units like fractions
- Check if answer makes sense

### Step 5: Understand Reaction Types

**Recognize patterns in chemical reactions:**

**Major reaction types:**

1. **Synthesis**: A + B → AB
   - Two or more substances combine
   - Example: 2Na + Cl₂ → 2NaCl

2. **Decomposition**: AB → A + B
   - Compound breaks down
   - Example: 2H₂O → 2H₂ + O₂

3. **Single Replacement**: A + BC → AC + B
   - One element replaces another
   - Example: Zn + 2HCl → ZnCl₂ + H₂

4. **Double Replacement**: AB + CD → AD + CB
   - Exchange of ions
   - Example: AgNO₃ + NaCl → AgCl + NaNO₃

5. **Combustion**: Hydrocarbon + O₂ → CO₂ + H₂O
   - Burning in oxygen
   - Example: CH₄ + 2O₂ → CO₂ + 2H₂O

**Practice:**
- Identify reaction type for 20 equations daily
- Predict products based on reactants
- Understand the driving forces (energy, precipitate, gas)

## Study Strategies by Chemistry Topic

### General Chemistry

**Key concepts:**
- Atomic structure and electron configuration
- Chemical bonding (ionic, covalent, metallic)
- Molecular geometry and polarity
- Gas laws and ideal gas equation

**Study approach:**
- Draw diagrams for every concept
- Practice electron configuration daily
- Build molecular models
- Work gas law problems with dimensional analysis

### Organic Chemistry

**Key concepts:**
- Functional groups
- Nomenclature (naming rules)
- Reaction mechanisms
- Stereochemistry

**Study approach:**
- Memorize functional groups first
- Practice naming compounds daily
- Draw mechanisms step-by-step
- Build models for stereoisomers

### Acid-Base Chemistry

**Key concepts:**
- pH and pOH calculations
- Strong vs. weak acids/bases
- Buffer solutions
- Titration curves

**Study approach:**
- Master logarithm calculations
- Understand Ka and Kb relationships
- Practice pH problems daily
- Draw titration curves

### Thermodynamics

**Key concepts:**
- Enthalpy (ΔH)
- Entropy (ΔS)
- Gibbs free energy (ΔG)
- Reaction spontaneity

**Study approach:**
- Understand sign conventions
- Practice Hess's Law problems
- Connect energy diagrams to calculations
- Predict spontaneity

## Problem-Solving Framework

### The GUESS method:

**G**iven: What information do you have?
**U**nknown: What are you solving for?
**E**quations: What formulas apply?
**S**ubstitute: Plug in values with units
**S**olve: Calculate and check units

### Example Problem:

"Calculate the mass of CO₂ produced when 10.0 g of C₃H₈ is burned completely."

**G**: 10.0 g C₃H₈
**U**: Mass of CO₂ in grams
**E**: C₃H₈ + 5O₂ → 3CO₂ + 4H₂O
**S**: 10.0 g C₃H₈ × (1 mol C₃H₈/44.1 g) × (3 mol CO₂/1 mol C₃H₈) × (44.0 g CO₂/1 mol)
**S**: = 30.0 g CO₂

## Common Chemistry Mistakes

### Mistake 1: Not Writing Out Work

**The problem:**
- Doing calculations mentally
- Skipping steps
- Losing track of units

**The fix:**
- Write every step
- Include units throughout
- Show all conversions

### Mistake 2: Memorizing Without Understanding

**The problem:**
- Learning formulas as meaningless symbols
- Not understanding when to use each equation
- Can't adapt to new problems

**The fix:**
- Understand what each variable represents
- Know when each formula applies
- Practice varied problems

### Mistake 3: Ignoring Significant Figures

**The problem:**
- Too many or too few decimal places
- Incorrect precision
- Lost points on exams

**The fix:**
- Apply sig fig rules consistently
- Round at the end of calculation, not during
- Practice sig fig problems

### Mistake 4: Not Practicing Enough

**The problem:**
- Only reading examples
- Not doing homework problems
- Passive studying

**The fix:**
- Work 10-15 problems daily
- Do extra practice problems
- Redo difficult problems

## Lab Skills and Safety

### Essential Lab Techniques

**Measurement:**
- Read meniscus at eye level
- Record to correct precision
- Use appropriate glassware

**Mixing and Heating:**
- Add acid to water, never reverse
- Use hot plates, not open flames (usually)
- Heat slowly and evenly

**Observation:**
- Note all changes (color, temperature, precipitate, gas)
- Record immediately
- Be specific in descriptions

### Safety First

**Basic safety rules:**
- Wear goggles and lab coat always
- Know location of safety equipment
- Never taste or smell directly
- Dispose of chemicals properly
- Clean up spills immediately

## Chemistry Study Schedule

### Daily (45-60 minutes)

- 15 min: Review previous concepts
- 20 min: Learn new material
- 20 min: Practice problems
- 5 min: Quick self-quiz

### Before Exams

**One week out:**
- Compile formula sheet
- Create summary notes
- Start practice problems

**Three days out:**
- Take practice exams
- Review missed concepts
- Quiz with study group

**Day before:**
- Light review only
- Review formula sheet
- Get good sleep

## Essential Chemistry Resources

**Online:**
- **inspir**: AI chemistry tutor for instant help
- **Khan Academy**: Video lessons
- **ChemLibreTexts**: Comprehensive reference
- **MolView**: 3D molecular visualization

**Physical:**
- Scientific calculator
- Periodic table
- Molecular model kit
- Reference sheet with constants

## Final Chemistry Success Tips

1. **Practice daily**: Chemistry requires consistent practice
2. **Show all work**: Never skip steps in calculations
3. **Draw structures**: Visualize molecules in 3D
4. **Check your units**: Dimensional analysis is your friend
5. **Understand, don't memorize**: Know the "why" behind formulas
6. **Ask for help early**: Don't wait until you're lost
7. **Do extra problems**: More practice = better understanding
8. **Connect to real world**: Think about chemistry in everyday life

## Level Up Your Chemistry Studies

Struggling with chemical equations or stoichiometry? **[Try inspir's chemistry solver free for 14 days](https://inspir.uk/pricing)** for step-by-step solutions and instant explanations.

---

**Related Topics:**
- [Math Solver for Chemistry Calculations](https://inspir.uk/tools/math-solver)
- [Active Recall for Chemistry](https://inspir.uk/blog/active-recall-study-technique)
- [Study Schedule Creation](https://inspir.uk/blog/create-study-schedules)`,
    seo_title: 'Chemistry Study Guide: Master Reactions & Problems (2025)',
    seo_description: 'Master chemistry with strategies for equations, stoichiometry, and problem-solving. Ace chemistry exams with proven study methods.',
    seo_keywords: ['chemistry study guide', 'how to study chemistry', 'chemistry tips', 'stoichiometry help', 'balancing chemical equations', 'chemistry problem solving', 'chemistry exam prep', 'learn chemistry effectively', 'chemistry study strategies', 'ace chemistry tests'],
    status: 'published',
    published_at: new Date().toISOString()
  }
]

async function seedSubjectHelpPosts() {
  console.log('🌱 Starting to seed Subject-Specific Help posts (Part 1)...\n')

  try {
    // Get author IDs
    const { data: authors, error: authorError } = await supabase
      .from('seo_authors')
      .select('id, name')

    if (authorError) throw authorError

    console.log('📝 Found authors:', authors.map(a => a.name).join(', '))

    // Get category ID for 'subject-help'
    const { data: categories, error: categoryError } = await supabase
      .from('seo_blog_categories')
      .select('id, slug')

    if (categoryError) throw categoryError

    const subjectHelpCategory = categories.find(c => c.slug === 'subject-help')
    if (!subjectHelpCategory) {
      throw new Error('Subject-help category not found')
    }

    console.log('📂 Using category:', subjectHelpCategory.slug, '\n')

    // Insert posts
    for (const post of subjectHelpPosts) {
      const author = authors.find(a => a.name === post.author_name)
      if (!author) {
        console.log(`❌ Author not found: ${post.author_name}`)
        continue
      }

      const postData = {
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        seo_title: post.seo_title,
        seo_description: post.seo_description,
        seo_keywords: post.seo_keywords,
        author_id: author.id,
        category_id: subjectHelpCategory.id,
        status: post.status,
        published_at: post.published_at,
        avg_read_time_minutes: calculateReadTime(post.content)
      }

      const { data, error } = await supabase
        .from('seo_blog_posts')
        .insert(postData)
        .select()

      if (error) {
        console.log(`❌ Error inserting "${post.title}":`, error.message)
      } else {
        console.log(`✅ Created: ${post.title}`)
      }
    }

    console.log('\n🎉 Subject help posts (Part 1) seeding complete!')
    console.log('📊 Seeded 2 posts out of 11 total needed')

  } catch (error) {
    console.error('❌ Fatal error:', error)
  }
}

seedSubjectHelpPosts()
