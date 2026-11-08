import { Lesson } from '../types';

export const SAMPLE_LESSONS: Lesson[] = [
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
    activities: [
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
  {
    id: 'lesson-vocab-foundations',
    title: 'Everyday Vocabulary',
    subtitle: 'High-frequency words for daily conversations & work',
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
      }
    ]
  },
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
      }
    ]
  },
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
  }
];

