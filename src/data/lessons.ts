import { Lesson } from '../types';

export const SAMPLE_LESSONS: Lesson[] = [
  // 1. SIMPLE PAST TENSE (Intermediate Grammar)
  {
    id: 'lesson-past-tense',
    title: 'Simple Past Tense',
    subtitle: 'Talking about completed past actions and daily routines',
    level: 'Intermediate',
    category: 'Grammar',
    estimatedMinutes: 8,
    xpTotal: 80,
    progressPercent: 72,
    completed: false,
    unlocked: true,
    theoryGuide: {
      summary: 'Simple Past Tense digunakan untuk menyatakan kejadian yang telah selesai di masa lampau pada waktu spesifik (yesterday, last week, ago).',
      keyFormulas: [
        '(+) Subject + Verb 2 (Past Form) + Object',
        '(-) Subject + did not (didn\'t) + Verb 1 + Object',
        '(?) Did + Subject + Verb 1 + Object?'
      ],
      rules: [
        {
          title: 'Regular vs Irregular Verbs',
          explanation: 'Sebagian besar kata kerja beraturan berakhiran -ed (work ➔ worked, bake ➔ baked). Namun kata kerja tidak beraturan berubah total (go ➔ went, buy ➔ bought).',
          example: 'She baked a delicious chocolate cake yesterday.'
        },
        {
          title: 'Bentuk Negatif dan Tanya Kembali ke Verb 1',
          explanation: 'Saat menggunakan auxiliary "did" atau "didn\'t", kata kerja utama SELALU kembali ke bentuk dasar (Verb 1).',
          formula: 'Did you go? (BUKAN: Did you went?)',
          example: 'I did not see the airplane in the sky.'
        }
      ],
      teacherTip: 'Jangan pernah menggabungkan "did" dengan Verb 2. Contoh salah: "I didn\'t knew" ❌. Yang benar: "I didn\'t know" ✔️.'
    },
    activities: [
      {
        id: 'act-past-3d-object',
        type: 'multiple-choice',
        title: '3D Object Vocabulary in Past Tense',
        xpValue: 15,
        data: {
          kind: 'visual-object',
          data: {
            objectId: 'coffee',
            objectName: 'Coffee Mug',
            category: 'Daily Objects & Routine',
            phonetic: '/ˈkɒf.i mʌɡ/',
            indonesianMeaning: 'Cangkir Kopi',
            question: 'Look at this 3D object: What did Sultan drink from yesterday morning?',
            options: ['Coffee Mug', 'Water Bottle', 'Soup Bowl', 'Wine Glass'],
            correctAnswer: 'Coffee Mug',
            exampleSentence: 'Sultan drank hot espresso from his favorite coffee mug yesterday morning.',
            funFact: 'Coffee is the second most traded commodity on Earth after crude oil!',
            hint: 'A ceramic container with a handle used for drinking hot beverages like cappuccino or latte.'
          }
        }
      },
      {
        id: 'act-1-flashcard',
        type: 'flashcard',
        title: 'Essential Past Verbs',
        xpValue: 15,
        data: {
          kind: 'flashcard',
          data: {
            word: 'WENT',
            phonetic: '/wɛnt/',
            accentNote: 'w-eh-nt',
            partOfSpeech: 'verb (past tense of go)',
            meaning: 'Moved or traveled from one place to another in the past.',
            example: 'I went to the library yesterday to study for my exam.',
            translationHint: 'Past form of "go"',
            audioPrompt: 'went. I went to the library yesterday.'
          }
        }
      },
      {
        id: 'act-2-fill-blank',
        type: 'fill-blank',
        title: 'Complete the sentence',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'Last weekend, Sarah ___ a delicious chocolate cake for her friend.',
            options: ['baked', 'bakes', 'baking', 'was bake'],
            correctAnswer: 'baked',
            explanation: 'We use the simple past "baked" for completed actions in past time expressions like "last weekend".'
          }
        }
      },
      {
        id: 'act-3-drag-drop',
        type: 'drag-drop',
        title: 'Word Order Challenge',
        xpValue: 20,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Put the words in the correct order to form a natural English sentence.',
            scrambledWords: ['yesterday', 'school', 'went', 'I', 'to'],
            correctSentence: 'I went to school yesterday',
            translationHint: 'Subject + Verb + Prepositional Phrase + Time Expression'
          }
        }
      },
      {
        id: 'act-4-listening',
        type: 'listening',
        title: 'Listen & Identify',
        xpValue: 15,
        data: {
          kind: 'listening',
          data: {
            audioText: 'We visited three different art galleries during our trip to London last summer.',
            instruction: 'Listen carefully to the native speaker and choose the correct statement.',
            question: 'What did the speaker do last summer in London?',
            options: [
              'They visited three art galleries',
              'They opened three new galleries',
              'They stayed home during the summer',
              'They planned to visit London next year'
            ],
            correctIndex: 0,
            transcript: 'We visited three different art galleries during our trip to London last summer.',
            explanation: 'The speaker clearly says "visited three different art galleries during our trip".'
          }
        }
      },
      {
        id: 'act-5-listen-arrange',
        type: 'listen-arrange',
        title: 'Listen and Arrange',
        xpValue: 20,
        data: {
          kind: 'listen-arrange',
          data: {
            audioText: 'She arrived early for the morning interview.',
            instruction: 'Listen to the audio clip and arrange the spoken words in the exact sequence you heard.',
            words: ['the', 'for', 'early', 'She', 'interview', 'morning', 'arrived'],
            correctSequence: ['She', 'arrived', 'early', 'for', 'the', 'morning', 'interview']
          }
        }
      }
    ]
  },

  // 2. EVERYDAY VOCABULARY (Beginner Vocabulary)
  {
    id: 'lesson-vocab-foundations',
    title: 'Everyday Vocabulary Foundations',
    subtitle: 'High-frequency words for daily conversations & routines',
    level: 'Beginner',
    category: 'Vocabulary',
    estimatedMinutes: 6,
    xpTotal: 65,
    progressPercent: 100,
    completed: true,
    unlocked: true,
    activities: [
      {
        id: 'vocab-act-1',
        type: 'flashcard',
        title: 'Core Vocabulary Card',
        xpValue: 15,
        data: {
          kind: 'flashcard',
          data: {
            word: 'APPLE',
            phonetic: '/ˈæpəl/',
            accentNote: 'apel',
            partOfSpeech: 'noun',
            meaning: 'A round fruit with red, green, or yellow skin and crisp white flesh.',
            example: 'I eat an apple every morning before going to work.',
            translationHint: 'A nutritious daily fruit',
            audioPrompt: 'apple. I eat an apple every morning.'
          }
        }
      },
      {
        id: 'vocab-act-2',
        type: 'matching',
        title: 'Word & Meaning Pairs',
        xpValue: 20,
        data: {
          kind: 'matching',
          pairs: [
            { id: 'p1', word: 'Perseverance', definition: 'Continued effort despite difficulties' },
            { id: 'p2', word: 'Eloquent', definition: 'Fluent and persuasive in speech' },
            { id: 'p3', word: 'Diligent', definition: 'Showing steady care and hard work' },
            { id: 'p4', word: 'Subtle', definition: 'Delicate, precise, not obvious' }
          ]
        }
      },
      {
        id: 'vocab-act-3',
        type: 'fill-blank',
        title: 'Verb to Be',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'I ___ going to school right now.',
            options: ['am', 'is', 'are', 'be'],
            correctAnswer: 'am',
            explanation: 'With the first-person singular pronoun "I", the present form of "be" is always "am".'
          }
        }
      },
      {
        id: 'vocab-act-4-drag',
        type: 'drag-drop',
        title: 'Build Daily Greeting',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Arrange the greeting politely.',
            scrambledWords: ['morning', 'Good', 'you', 'how', 'are', 'today?'],
            correctSentence: 'Good morning how are you today?',
            translationHint: 'Greeting + Question'
          }
        }
      }
    ]
  },

  // 3. PHRASAL VERBS IN ACTION (Intermediate Vocabulary & Drag-and-Drop)
  {
    id: 'lesson-phrasal-verbs',
    title: 'Phrasal Verbs in Daily Action',
    subtitle: 'Master natural colloquial verbs and separable particles',
    level: 'Intermediate',
    category: 'Vocabulary',
    estimatedMinutes: 9,
    xpTotal: 90,
    progressPercent: 40,
    completed: false,
    unlocked: true,
    activities: [
      {
        id: 'pv-flash-1',
        type: 'flashcard',
        title: 'Essential Phrasal Verb',
        xpValue: 15,
        data: {
          kind: 'flashcard',
          data: {
            word: 'LOOK FORWARD TO',
            phonetic: '/lʊk ˈfɔːrwərd tuː/',
            accentNote: 'look for-ward to',
            partOfSpeech: 'phrasal verb (+ gerund/noun)',
            meaning: 'To anticipate something in the future with enthusiasm and pleasure.',
            example: 'I look forward to meeting your development team next Monday.',
            translationHint: 'Anticipate excitedly',
            audioPrompt: 'look forward to. I look forward to meeting you.'
          }
        }
      },
      {
        id: 'pv-categorize-1',
        type: 'categorize',
        title: 'Sort Phrasal Verbs by Particle',
        xpValue: 25,
        data: {
          kind: 'categorize',
          data: {
            instruction: 'Classify these common phrasal verbs by their core prepositional particle:',
            category1: 'Verbs with "UP"',
            category2: 'Verbs with "OUT"',
            items: [
              { id: 'c1', text: 'Give up', targetCategory: 'Verbs with "UP"' },
              { id: 'c2', text: 'Find out', targetCategory: 'Verbs with "OUT"' },
              { id: 'c3', text: 'Look up', targetCategory: 'Verbs with "UP"' },
              { id: 'c4', text: 'Run out of', targetCategory: 'Verbs with "OUT"' },
              { id: 'c5', text: 'Bring up', targetCategory: 'Verbs with "UP"' },
              { id: 'c6', text: 'Figure out', targetCategory: 'Verbs with "OUT"' }
            ]
          }
        }
      },
      {
        id: 'pv-drag-drop-2',
        type: 'drag-drop',
        title: 'Sentence Order: Separable Phrasal Verb',
        xpValue: 20,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Arrange the sentence with the pronoun in between the verb and particle.',
            scrambledWords: ['turned', 'down', 'lucrative', 'the', 'She', 'offer'],
            correctSentence: 'She turned down the lucrative offer',
            translationHint: 'Subject + turned + down + object'
          }
        }
      },
      {
        id: 'pv-fill-3',
        type: 'fill-blank',
        title: 'Complete the Phrasal Verb',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'We have completely run ___ of coffee beans this morning.',
            options: ['out', 'up', 'down', 'off'],
            correctAnswer: 'out',
            explanation: '"Run out of" means to exhaust the supply of an item so that none is left.'
          }
        }
      },
      {
        id: 'pv-match-4',
        type: 'matching',
        title: 'Phrasal Verb Meanings',
        xpValue: 15,
        data: {
          kind: 'matching',
          pairs: [
            { id: 'm1', word: 'Call off', definition: 'To cancel an event' },
            { id: 'm2', word: 'Put off', definition: 'To delay or postpone' },
            { id: 'm3', word: 'Take after', definition: 'To resemble an older family member' },
            { id: 'm4', word: 'Catch on', definition: 'To understand or become popular' }
          ]
        }
      }
    ]
  },

  // 4. CONDITIONAL CLAUSES (Intermediate Grammar)
  {
    id: 'lesson-conditionals',
    title: 'Conditional Mastery: Real & Unreal Hypotheses',
    subtitle: 'Zero, First, Second & Third conditionals with confidence',
    level: 'Intermediate',
    category: 'Grammar',
    estimatedMinutes: 10,
    xpTotal: 85,
    progressPercent: 20,
    completed: false,
    unlocked: true,
    activities: [
      {
        id: 'cond-drag-1',
        type: 'drag-drop',
        title: 'Build a Second Conditional Hypothesis',
        xpValue: 20,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Assemble the unreal present hypothesis:',
            scrambledWords: ['had', 'If', 'time', 'more', 'I', 'would', 'travel', 'the', 'world'],
            correctSentence: 'If I had more time I would travel the world',
            translationHint: 'If + Past Simple + would + infinitive'
          }
        }
      },
      {
        id: 'cond-fill-2',
        type: 'fill-blank',
        title: 'First Conditional Real Future',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'If it ___ tomorrow morning, the outdoor soccer match will be rescheduled.',
            options: ['rains', 'will rain', 'rained', 'is rain'],
            correctAnswer: 'rains',
            explanation: 'In the if-clause of a first conditional sentence, we use simple present ("rains"), not future with "will".'
          }
        }
      },
      {
        id: 'cond-categorize-3',
        type: 'categorize',
        title: 'Categorize Real vs Unreal Conditionals',
        xpValue: 25,
        data: {
          kind: 'categorize',
          data: {
            instruction: 'Classify whether these clauses express real possibilities or unreal/hypothetical ideas:',
            category1: 'Real Future (1st Conditional)',
            category2: 'Unreal Hypothesis (2nd Conditional)',
            items: [
              { id: 'cd1', text: 'If you study hard, you will pass', targetCategory: 'Real Future (1st Conditional)' },
              { id: 'cd2', text: 'If I won a million dollars, I would buy a boat', targetCategory: 'Unreal Hypothesis (2nd Conditional)' },
              { id: 'cd3', text: 'If the train arrives on time, we will call you', targetCategory: 'Real Future (1st Conditional)' },
              { id: 'cd4', text: 'If she knew the answer, she would tell us', targetCategory: 'Unreal Hypothesis (2nd Conditional)' }
            ]
          }
        }
      },
      {
        id: 'cond-listen-4',
        type: 'listening',
        title: 'Catch the Spoken Contraction ("I\'d")',
        xpValue: 25,
        data: {
          kind: 'listening',
          data: {
            audioText: 'If I were in your position, I would take the scholarship offer immediately.',
            instruction: 'Listen carefully to the advice given by the academic advisor.',
            question: 'What does the advisor recommend?',
            options: [
              'Accepting the scholarship offer right away',
              'Declining the scholarship and staying home',
              'Waiting until next year to apply',
              'Negotiating a higher tuition fee'
            ],
            correctIndex: 0,
            transcript: 'If I were in your position, I would take the scholarship offer immediately.',
            explanation: 'The speaker uses "If I were in your position, I would take..." to give emphatic advice.'
          }
        }
      }
    ]
  },

  // 5. ACADEMIC PASSIVE VOICE & FORMAL REGISTER (Advanced Grammar)
  {
    id: 'lesson-passive-voice',
    title: 'Passive Voice in Academic & IELTS Writing',
    subtitle: 'Shift focus to empirical findings, methodology, and objectivity',
    level: 'Advanced',
    category: 'Writing',
    estimatedMinutes: 11,
    xpTotal: 95,
    progressPercent: 0,
    completed: false,
    unlocked: true,
    activities: [
      {
        id: 'pas-categorize-1',
        type: 'categorize',
        title: 'Formal Academic vs Informal Casual Register',
        xpValue: 25,
        data: {
          kind: 'categorize',
          data: {
            instruction: 'Distinguish between formal academic expressions and casual conversational slang:',
            category1: 'Formal Academic Register',
            category2: 'Informal Casual Register',
            items: [
              { id: 'rg1', text: 'Substantiate the hypothesis', targetCategory: 'Formal Academic Register' },
              { id: 'rg2', text: 'Kind of cool', targetCategory: 'Informal Casual Register' },
              { id: 'rg3', text: 'Consequently, the data suggests', targetCategory: 'Formal Academic Register' },
              { id: 'rg4', text: 'A bunch of stuff', targetCategory: 'Informal Casual Register' },
              { id: 'rg5', text: 'Conduct an empirical review', targetCategory: 'Formal Academic Register' },
              { id: 'rg6', text: 'Gonna chill out', targetCategory: 'Informal Casual Register' }
            ]
          }
        }
      },
      {
        id: 'pas-drag-2',
        type: 'drag-drop',
        title: 'Construct an Academic Passive Statement',
        xpValue: 25,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Form the objective scientific sentence in passive voice:',
            scrambledWords: ['was', 'vaccine', 'The', 'experimental', 'trialed', 'in', 'fifty', 'clinics'],
            correctSentence: 'The experimental vaccine was trialed in fifty clinics',
            translationHint: 'Subject + was + past participle + prepositional phrase'
          }
        }
      },
      {
        id: 'pas-fill-3',
        type: 'fill-blank',
        title: 'Passive Agent Omission',
        xpValue: 20,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'The groundbreaking research findings ___ published in a prestigious scientific journal last month.',
            options: ['were', 'was', 'have been', 'are being'],
            correctAnswer: 'were',
            explanation: 'The plural subject "research findings" paired with past time marker "last month" takes the plural past auxiliary "were".'
          }
        }
      },
      {
        id: 'pas-match-4',
        type: 'matching',
        title: 'Formal Academic Verbs & Definitions',
        xpValue: 25,
        data: {
          kind: 'matching',
          pairs: [
            { id: 'ac1', word: 'Substantiate', definition: 'Provide evidence to support truth' },
            { id: 'ac2', word: 'Delineate', definition: 'Describe or portray precisely' },
            { id: 'ac3', word: 'Elucidate', definition: 'Make clear or explain in detail' },
            { id: 'ac4', word: 'Disseminate', definition: 'Spread information widely' }
          ]
        }
      }
    ]
  },

  // 6. INVERSION & ELEVATED PROSE (Advanced C1/C2 Grammar)
  {
    id: 'lesson-inversion-academic',
    title: 'Negative Inversion & Stylistic Emphasis',
    subtitle: 'Command elevated academic prose: "Hardly had I...", "Seldom do we..."',
    level: 'Advanced',
    category: 'Grammar',
    estimatedMinutes: 8,
    xpTotal: 85,
    progressPercent: 0,
    completed: false,
    unlocked: true,
    activities: [
      {
        id: 'inv-drag-1',
        type: 'drag-drop',
        title: 'Construct Negative Inversion',
        xpValue: 25,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Invert the auxiliary verb after the negative adverb "Rarely":',
            scrambledWords: ['have', 'Rarely', 'I', 'such', 'witnessed', 'resilience', 'profound'],
            correctSentence: 'Rarely have I witnessed such profound resilience',
            translationHint: 'Negative Adverb + Auxiliary + Subject + Main Verb + Object'
          }
        }
      },
      {
        id: 'inv-fill-2',
        type: 'fill-blank',
        title: 'Seldom Inversion',
        xpValue: 20,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'Seldom ___ climatologists recorded such elevated ocean temperatures across the North Atlantic.',
            options: ['have', 'has', 'they have', 'did'],
            correctAnswer: 'have',
            explanation: 'After negative adverbs like "seldom", the auxiliary verb "have" precedes the plural subject "climatologists".'
          }
        }
      },
      {
        id: 'inv-flash-3',
        type: 'flashcard',
        title: 'Inversion Structure Formula',
        xpValue: 20,
        data: {
          kind: 'flashcard',
          data: {
            word: 'HARDLY ... WHEN',
            phonetic: '/ˈhɑːrdli ... wɛn/',
            accentNote: 'hard-lee ... wen',
            partOfSpeech: 'correlative conjunction',
            meaning: 'Used to show that one action happened almost immediately after another past action.',
            example: 'Hardly had the keynote speaker begun when the projector malfunctioned.',
            translationHint: 'Hardly + had + S + V3 ... when + S + V2',
            audioPrompt: 'Hardly had the keynote speaker begun when the projector malfunctioned.'
          }
        }
      },
      {
        id: 'inv-listen-4',
        type: 'listen-arrange',
        title: 'Listen and Assemble Inversion',
        xpValue: 20,
        data: {
          kind: 'listen-arrange',
          data: {
            audioText: 'Not only did they exceed sales quotas, but they also expanded market share.',
            instruction: 'Listen carefully and assemble the parallel inverted sentence:',
            words: ['they', 'exceed', 'quotas', 'Not', 'sales', 'only', 'did'],
            correctSequence: ['Not', 'only', 'did', 'they', 'exceed', 'sales', 'quotas']
          }
        }
      }
    ]
  },

  // 7. LISTENING ESSENTIALS (Intermediate Listening)
  {
    id: 'lesson-listening-essentials',
    title: 'Listening Essentials: Fast Speech & Reductions',
    subtitle: 'Master connected speech, elisions, and natural contractions',
    level: 'Intermediate',
    category: 'Listening',
    estimatedMinutes: 10,
    xpTotal: 75,
    progressPercent: 35,
    completed: false,
    unlocked: true,
    activities: [
      {
        id: 'listen-1',
        type: 'listening',
        title: 'Connected Speech Detection',
        xpValue: 20,
        data: {
          kind: 'listening',
          data: {
            audioText: 'What are you going to do this weekend?',
            instruction: 'Listen to the natural spoken reduction ("gonna") and select what the speaker asks.',
            question: 'What is the speaker asking about?',
            options: [
              'Weekend plans and activities',
              'Past holidays and vacations',
              'Work schedule for next month',
              'Directions to a conference'
            ],
            correctIndex: 0,
            transcript: 'What are you going to do this weekend?',
            explanation: '"Going to" is commonly pronounced as "gonna" in casual spoken American English.'
          }
        }
      },
      {
        id: 'listen-2',
        type: 'listen-arrange',
        title: 'Catch the Spoken Sentence',
        xpValue: 25,
        data: {
          kind: 'listen-arrange',
          data: {
            audioText: 'Could you please send me the report by five PM?',
            instruction: 'Listen closely and assemble the sentence exactly as spoken.',
            words: ['the', 'send', 'report', 'Could', 'by', 'you', 'please', 'me', 'five', 'PM?'],
            correctSequence: ['Could', 'you', 'please', 'send', 'me', 'the', 'report', 'by', 'five', 'PM?']
          }
        }
      },
      {
        id: 'listen-3-drag',
        type: 'drag-drop',
        title: 'Reductions in Connected Speech',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Assemble the full formal equivalent of the spoken reduction "wanna go":',
            scrambledWords: ['want', 'to', 'I', 'leave', 'now'],
            correctSentence: 'I want to leave now',
            translationHint: '"wanna" = "want to"'
          }
        }
      }
    ]
  },

  // 8. ACADEMIC READING: CLIMATE & CITIES (Advanced Reading)
  {
    id: 'lesson-reading-mastery',
    title: 'Academic Reading: Climate & Cities',
    subtitle: 'Distraction-free deep reading with interactive vocabulary & highlighting',
    level: 'Advanced',
    category: 'Reading',
    estimatedMinutes: 12,
    xpTotal: 90,
    progressPercent: 0,
    completed: false,
    unlocked: true,
    activities: [
      {
        id: 'read-act-1',
        type: 'reading',
        title: 'Deep Reading Comprehension',
        xpValue: 35,
        data: {
          kind: 'reading',
          data: {
            title: 'Urban Heat Islands and Sustainable Architecture',
            category: 'Environmental Science & Architecture',
            level: 'B2 - C1 Advanced',
            passage: [
              'Urban heat islands occur when metropolitan areas experience significantly warmer temperatures than surrounding rural hinterlands. The phenomenon is largely driven by human activities, dense concentrations of asphalt, and the scarcity of vegetation.',
              'To mitigate these microclimatic extremes, modern architects are incorporating biophilic design elements, such as living green roofs and reflective building materials. Such innovations not only lower ambient surface temperatures by several degrees, but also substantially reduce energy consumption for indoor air conditioning.',
              'Furthermore, municipal planners emphasize permeable pavements that allow stormwater infiltration, recharging regional aquifers while simultaneously cooling city streets through natural evaporative processes.'
            ],
            interactiveVocab: {
              hinterlands: {
                word: 'Hinterlands',
                phonetic: '/ˈhɪntərlændz/',
                definition: 'The remote or less developed areas surrounding a major city or port.',
                example: 'Farmers from the hinterlands supplied fresh vegetables to the bustling capital.'
              },
              mitigate: {
                word: 'Mitigate',
                phonetic: '/ˈmɪtɪɡeɪt/',
                definition: 'To make something bad less severe, serious, or painful.',
                example: 'Good urban design can mitigate the harsh effects of extreme summer temperatures.'
              },
              biophilic: {
                word: 'Biophilic',
                phonetic: '/ˌbaɪoʊˈfɪlɪk/',
                definition: 'Relating to architecture that incorporates natural elements to enhance human health.',
                example: 'The tech headquarters featured biophilic gardens, waterfalls, and natural sunlight.'
              },
              permeable: {
                word: 'Permeable',
                phonetic: '/ˈpɜːrmiəbəl/',
                definition: 'Allowing liquids or gases to pass through it.',
                example: 'Permeable concrete allows rainwater to seep into the soil rather than causing floods.'
              }
            },
            question: 'According to the passage, how do biophilic design elements help urban environments?',
            options: [
              'By lowering surface temperatures and decreasing air conditioning energy use',
              'By eliminating the need for municipal public transport systems',
              'By replacing all concrete buildings with traditional wooden structures',
              'By generating geothermal energy for power grids'
            ],
            correctIndex: 0,
            explanation: 'The text states: "Such innovations not only lower ambient surface temperatures by several degrees, but also substantially reduce energy consumption for indoor air conditioning."'
          }
        }
      }
    ]
  },

  // 9. SPEAKING & PRONUNCIATION (Intermediate Speaking)
  {
    id: 'lesson-speaking-fluency',
    title: 'Speaking & Pronunciation: Intonation & Stress',
    subtitle: 'Real-time speech practice with waveform feedback',
    level: 'Intermediate',
    category: 'Speaking',
    estimatedMinutes: 7,
    xpTotal: 70,
    progressPercent: 0,
    completed: false,
    unlocked: true,
    activities: [
      {
        id: 'speak-act-1',
        type: 'speaking',
        title: 'Sentence Stress Practice',
        xpValue: 30,
        data: {
          kind: 'speaking',
          data: {
            prompt: 'Practice saying: "I never said she stole my money."',
            phonetic: '/aɪ ˈnɛvər sɛd ʃi stoʊl maɪ ˈmʌni/',
            sampleAudioText: 'I never said she stole my money.',
            keyPhrases: ['never said', 'stole my money'],
            tips: 'Notice how shifting the stress onto "never" or "she" completely alters the implicit meaning of the sentence.'
          }
        }
      }
    ]
  },

  // 10. VISUAL 3D OBJECT VOCABULARY MASTERY
  {
    id: 'lesson-visual-objects',
    title: 'Visual 3D Vocabulary & Object Mastery',
    subtitle: 'Learn and identify real-world 3D objects with audio and phonetic guides',
    level: 'Beginner',
    category: 'Vocabulary',
    estimatedMinutes: 8,
    xpTotal: 90,
    progressPercent: 0,
    completed: false,
    unlocked: true,
    theoryGuide: {
      summary: 'Mengasosiasikan kata bahasa Inggris langsung dengan bentuk objek visual (tanpa menerjemahkan dalam hati terlebih dahulu) adalah metode tercepat membangun kefasihan alami.',
      rules: [
        {
          title: 'Direct Association (Metode Asosiasi Langsung)',
          explanation: 'Alih-alih mengingat: "Apple ➔ Apel ➔ Buah merah", langsung lihat bentuk 3D apel dan sebutkan "Apple" / "An apple".',
          example: 'I see a red apple on the table.'
        },
        {
          title: 'Gunakan Artikel "a" dan "an" dengan Benar',
          explanation: 'Gunakan "an" di depan kata yang berbunyi huruf vokal (a, i, u, e, o), dan "a" di depan konsonan.',
          formula: 'an apple, an airplane | a coffee mug, a backpack, a car',
          example: 'She packed a backpack and an apple for the flight.'
        }
      ],
      teacherTip: 'Perhatikan pengucapan simbol fonetik. Klik tombol audio untuk mendengarkan pelafalan penutur asli!'
    },
    activities: [
      {
        id: 'vis-act-1',
        type: 'multiple-choice',
        title: 'Identify 3D Object 1',
        xpValue: 15,
        data: {
          kind: 'visual-object',
          data: {
            objectId: 'apple',
            objectName: 'Apple',
            category: 'Food & Fruits',
            phonetic: '/ˈæp.əl/',
            indonesianMeaning: 'Apel',
            question: 'Look at the 3D object above: What is this fruit called in English?',
            options: ['Apple', 'Orange', 'Pomegranate', 'Pear'],
            correctAnswer: 'Apple',
            exampleSentence: 'An apple is a sweet, crisp fruit. "An apple a day keeps the doctor away."',
            funFact: 'Apples float in water because 25% of their volume is air!',
            hint: 'A round fruit with red skin and a small green leaf on top.'
          }
        }
      },
      {
        id: 'vis-act-2',
        type: 'multiple-choice',
        title: 'Identify 3D Object 2',
        xpValue: 15,
        data: {
          kind: 'visual-object',
          data: {
            objectId: 'coffee',
            objectName: 'Coffee Mug',
            category: 'Daily Objects & Beverages',
            phonetic: '/ˈkɒf.i mʌɡ/',
            indonesianMeaning: 'Cangkir Kopi',
            question: 'Look at the steaming 3D container: What is this called in English?',
            options: ['Water Bottle', 'Coffee Mug', 'Teapot', 'Soup Bowl'],
            correctAnswer: 'Coffee Mug',
            exampleSentence: 'She poured hot freshly brewed latte into her ceramic coffee mug.',
            funFact: 'Over 2.25 billion cups of coffee are enjoyed around the world every single day!',
            hint: 'A cup with a side handle that holds hot beverages with rising steam.'
          }
        }
      },
      {
        id: 'vis-act-3',
        type: 'multiple-choice',
        title: 'Identify 3D Object 3',
        xpValue: 15,
        data: {
          kind: 'visual-object',
          data: {
            objectId: 'airplane',
            objectName: 'Airplane',
            category: 'Travel & Transportation',
            phonetic: '/ˈeə.pleɪn/',
            indonesianMeaning: 'Pesawat Terbang',
            question: 'Look at the flying 3D vehicle: What is this called in English?',
            options: ['Helicopter', 'Airplane', 'Cruise Ship', 'Bullet Train'],
            correctAnswer: 'Airplane',
            exampleSentence: 'We boarded the international airplane at Heathrow Airport for our holiday.',
            funFact: 'Commercial passenger airplanes typically cruise at an altitude of 35,000 feet!',
            hint: 'A winged flying aircraft with jet engines and passenger cabin windows.'
          }
        }
      },
      {
        id: 'vis-act-4',
        type: 'multiple-choice',
        title: 'Identify 3D Object 4',
        xpValue: 15,
        data: {
          kind: 'visual-object',
          data: {
            objectId: 'headphones',
            objectName: 'Headphones',
            category: 'Electronics & Audio',
            phonetic: '/ˈhɛd.foʊnz/',
            indonesianMeaning: 'Headphone / Earphone',
            question: 'Look at the 3D audio gadget: What is this called in English?',
            options: ['Microphone', 'Smart Watch', 'Headphones', 'Speaker Box'],
            correctAnswer: 'Headphones',
            exampleSentence: 'He put on his noise-cancelling headphones to listen to the English podcast.',
            funFact: 'Headphones were originally invented in 1910 for naval communication!',
            hint: 'An over-ear audio accessory with two padded speakers joined by a headband.'
          }
        }
      },
      {
        id: 'vis-act-5',
        type: 'multiple-choice',
        title: 'Identify 3D Object 5',
        xpValue: 15,
        data: {
          kind: 'visual-object',
          data: {
            objectId: 'backpack',
            objectName: 'Backpack',
            category: 'School & Travel Essentials',
            phonetic: '/ˈbæk.pæk/',
            indonesianMeaning: 'Ransel / Tas Punggung',
            question: 'Look at this travel bag: What is this called in English?',
            options: ['Handbag', 'Briefcase', 'Backpack', 'Suitcase'],
            correctAnswer: 'Backpack',
            exampleSentence: 'She packed her English notebook and pencils inside her green backpack.',
            funFact: 'The word "backpack" was coined in the United States in the 1910s.',
            hint: 'A sturdy bag with shoulder straps carried on your back, commonly used for school or hiking.'
          }
        }
      },
      {
        id: 'vis-act-6',
        type: 'multiple-choice',
        title: 'Identify 3D Object 6',
        xpValue: 15,
        data: {
          kind: 'visual-object',
          data: {
            objectId: 'clock',
            objectName: 'Alarm Clock',
            category: 'Daily Living & Time',
            phonetic: '/əˈlɑːm klɒk/',
            indonesianMeaning: 'Jam Beker / Jam Alarm',
            question: 'Look at this 3D time device: What is this called in English?',
            options: ['Thermometer', 'Alarm Clock', 'Hourglass', 'Calendar'],
            correctAnswer: 'Alarm Clock',
            exampleSentence: 'My alarm clock rings loudly at six o\'clock every weekday morning.',
            funFact: 'The first mechanical alarm clock was invented in 1787 and could only ring at 4 AM!',
            hint: 'A circular device with bells on top that makes a sound to wake you up.'
          }
        }
      }
    ]
  }
];
