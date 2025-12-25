// Content moderation for age-appropriate filtering
export const contentModeration = {
  // Blocked keywords by category
  blockedPatterns: {
    violence: [
      'kill', 'murder', 'suicide', 'self harm', 'cut myself', 'hurt myself',
      'shoot', 'stab', 'attack', 'bomb', 'weapon', 'gun'
    ],
    explicit: [
      'porn', 'sex', 'nude', 'naked', 'xxx', 'nsfw',
      'sexy', 'hot girl', 'hot guy', 'dating'
    ],
    drugs: [
      'get high', 'smoke weed', 'buy drugs', 'cocaine', 'heroin',
      'meth', 'ecstasy', 'lsd', 'marijuana'
    ],
    personalInfo: [
      'home address', 'phone number', 'social security', 'ssn',
      'credit card', 'bank account', 'password'
    ],
    bullying: [
      'kill yourself', 'kys', "you're stupid", 'loser', 'idiot kid',
      'hate you', "you're ugly", 'nobody likes you'
    ]
  },

  // Flagged topics (allowed but logged)
  flaggedTopics: {
    mentalHealth: [
      'depressed', 'depression', 'anxiety', 'scared', 'afraid',
      'worried', 'stressed', 'bullied', 'lonely'
    ],
    academicIntegrity: [
      'homework answer', 'test answer', 'cheat', 'copy homework',
      'quiz answers', 'exam answers'
    ],
    aggression: [] // Checked by caps ratio
  },

  // Jailbreak detection patterns
  jailbreakPatterns: [
    'ignore previous instructions',
    'ignore all instructions',
    'you are now',
    'act as',
    'pretend to be',
    'forget your rules',
    'forget your guidelines',
    'forget your instructions',
    'developer mode',
    'jailbreak',
    'DAN mode',
    'do anything now'
  ],

  // Check if content should be blocked
  shouldBlock(content, ageFilter = 'teen') {
    const lowerContent = content.toLowerCase();

    // Check jailbreak attempts first
    for (const pattern of this.jailbreakPatterns) {
      if (lowerContent.includes(pattern)) {
        return {
          blocked: true,
          reason: 'jailbreak_attempt',
          message: "I can't help with that. Let's focus on learning!"
        };
      }
    }

    // Check blocked patterns
    for (const [category, patterns] of Object.entries(this.blockedPatterns)) {
      for (const pattern of patterns) {
        if (lowerContent.includes(pattern)) {
          return {
            blocked: true,
            reason: category,
            message: this.getBlockedMessage(category, ageFilter)
          };
        }
      }
    }

    return { blocked: false };
  },

  // Check for flagged content (allowed but logged)
  checkFlagged(content) {
    const lowerContent = content.toLowerCase();
    const flags = [];

    // Check mental health concerns
    for (const keyword of this.flaggedTopics.mentalHealth) {
      if (lowerContent.includes(keyword)) {
        flags.push('mental_health');
        break;
      }
    }

    // Check academic integrity
    for (const keyword of this.flaggedTopics.academicIntegrity) {
      if (lowerContent.includes(keyword)) {
        flags.push('academic_integrity');
        break;
      }
    }

    // Check excessive caps (aggression indicator)
    const capsRatio = (content.match(/[A-Z]/g) || []).length / content.length;
    if (capsRatio > 0.5 && content.length > 20) {
      flags.push('excessive_caps');
    }

    return flags;
  },

  getBlockedMessage(category, ageFilter) {
    const messages = {
      violence: "I can't discuss violent content. Let's talk about something positive!",
      explicit: "That's not appropriate for our learning environment. What else can I help you with?",
      drugs: "I can't help with that topic. Let's focus on your studies!",
      personalInfo: "Please don't share personal information online. It's not safe!",
      bullying: "That language isn't okay. Remember to be kind to yourself and others!"
    };

    return messages[category] || "I can't help with that. Let's focus on learning!";
  },

  // Age-appropriate system prompt
  getSystemPrompt(ageFilter = 'teen') {
    const basePrompt = `You are inspir AI, a friendly and helpful AI tutor designed for students.

Your role:
- Help students learn and understand concepts
- Encourage critical thinking and problem-solving
- Be patient, kind, and encouraging
- Use age-appropriate language
- Never provide direct answers to homework/tests - guide instead
- If a student seems distressed, encourage them to talk to a trusted adult

Remember: You're here to help students LEARN, not just get answers.`;

    const ageSpecific = {
      under14: '\n\nAge group: Under 14. Use very simple language, lots of encouragement, and kid-friendly examples.',
      teen: '\n\nAge group: 13-17 (Teen). Use clear language with relatable examples.',
      adult: '\n\nAge group: 18+ (Adult). Use sophisticated language and advanced concepts.'
    };

    return basePrompt + (ageSpecific[ageFilter] || ageSpecific.teen);
  }
};
