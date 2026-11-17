import { Lesson } from '../../types';

export const INTERMEDIATE_LESSONS: Lesson[] = [
  // 1. PAST TENSE MASTERY & IRREGULAR VERBS (20 ACTIVITIES)
  {
    id: 'lesson-past-tense',
    title: 'Past Tense Mastery & Narrative Flow',
    subtitle: 'Simple Past, Past Continuous, Irregular Verbs, and Time Signals (20 Latihan Soal)',
    level: 'Intermediate',
    category: 'Grammar',
    estimatedMinutes: 18,
    xpTotal: 280,
    progressPercent: 72,
    completed: false,
    unlocked: true,
    theoryGuide: {
      summary: 'Simple Past digunakan untuk kejadian yang dimulai dan SELESAI di masa lampau pada titik waktu spesifik (yesterday, last night, ago). Past Continuous digunakan untuk kejadian yang sedang berlangsung saat kejadian lain terjadi.',
      rules: [
        {
          title: 'Rumus Simple Past Tense',
          explanation: 'Gunakan Verb 2 pada kalimat positif. Pada kalimat negatif dan tanya, gunakan auxiliary "did" dan kembalikan kata kerja ke Verb 1 dasar.',
          formula: 'Positif (+): S + Verb 2 | Negatif (-): S + did not + Verb 1 | Tanya (?): Did + S + Verb 1?',
          example: 'I went to school yesterday. She did not call me. Did you see that film?'
        },
        {
          title: 'Kombinasi Past Continuous & Simple Past (when / while)',
          explanation: 'Gunakan Past Continuous (was/were + V-ing) untuk kegiatan berdurasi panjang, dan Simple Past (V2) untuk aksi pemotong (interruption).',
          formula: 'While I was studying (continuous), my friend knocked on the door (past simple).',
          example: 'She was cooking dinner when the power went out.'
        }
      ],
      keyFormulas: [
        'Positive: S + Verb 2 + Object + Past Time Marker',
        'Negative: S + did not (didn\'t) + Verb 1',
        'Question: Did + S + Verb 1 + Object?'
      ],
      teacherTip: 'Perhatikan sinyal waktu spesifik: yesterday, ago, last week, in 2022. Jika ada kata ini, WAJIB gunakan Verb 2!'
    },
    activities: [
      // 1. Flashcard: Went
      {
        id: 'pst-1',
        type: 'flashcard',
        title: 'Irregular Verb: Go ➔ Went',
        xpValue: 10,
        data: {
          kind: 'flashcard',
          data: {
            word: 'WENT',
            phonetic: '/went/',
            accentNote: 'pergi (lampau)',
            partOfSpeech: 'verb (past tense of go)',
            meaning: 'Moved from one place to another in the past.',
            example: 'I went to school yesterday by bicycle.',
            translationHint: 'Bentuk lampau V2 dari kata go',
            audioPrompt: 'went. I went to school yesterday by bicycle.'
          }
        }
      },
      // 2. Flashcard: Saw
      {
        id: 'pst-2',
        type: 'flashcard',
        title: 'Irregular Verb: See ➔ Saw',
        xpValue: 10,
        data: {
          kind: 'flashcard',
          data: {
            word: 'SAW',
            phonetic: '/sɔː/',
            accentNote: 'melihat (lampau)',
            partOfSpeech: 'verb (past tense of see)',
            meaning: 'Perceived with the eyes at a specific past moment.',
            example: 'We saw a beautiful shooting star in the sky last night.',
            translationHint: 'Bentuk lampau V2 dari kata see',
            audioPrompt: 'saw. We saw a beautiful shooting star in the sky last night.'
          }
        }
      },
      // 3. Flashcard: Bought
      {
        id: 'pst-3',
        type: 'flashcard',
        title: 'Irregular Verb: Buy ➔ Bought',
        xpValue: 10,
        data: {
          kind: 'flashcard',
          data: {
            word: 'BOUGHT',
            phonetic: '/bɔːt/',
            accentNote: 'membeli (lampau)',
            partOfSpeech: 'verb (past tense of buy)',
            meaning: 'Acquired something in exchange for money in the past.',
            example: 'She bought three new grammar books two days ago.',
            translationHint: 'Bentuk lampau V2 dari kata buy',
            audioPrompt: 'bought. She bought three new grammar books two days ago.'
          }
        }
      },
      // 4. Flashcard: Wrote
      {
        id: 'pst-4',
        type: 'flashcard',
        title: 'Irregular Verb: Write ➔ Wrote',
        xpValue: 10,
        data: {
          kind: 'flashcard',
          data: {
            word: 'WROTE',
            phonetic: '/roʊt/',
            accentNote: 'menulis (lampau)',
            partOfSpeech: 'verb (past tense of write)',
            meaning: 'Composed text or letters in the past.',
            example: 'Sultan wrote an outstanding essay for the exam.',
            translationHint: 'Bentuk lampau V2 dari kata write',
            audioPrompt: 'wrote. Sultan wrote an outstanding essay for the exam.'
          }
        }
      },
      // 5. Flashcard: Spoke
      {
        id: 'pst-5',
        type: 'flashcard',
        title: 'Irregular Verb: Speak ➔ Spoke',
        xpValue: 10,
        data: {
          kind: 'flashcard',
          data: {
            word: 'SPOKE',
            phonetic: '/spoʊk/',
            accentNote: 'berbicara (lampau)',
            partOfSpeech: 'verb (past tense of speak)',
            meaning: 'Conversed or delivered speech in the past.',
            example: 'The teacher spoke clearly during the English lecture.',
            translationHint: 'Bentuk lampau V2 dari kata speak',
            audioPrompt: 'spoke. The teacher spoke clearly during the English lecture.'
          }
        }
      },
      // 6. Fill in the blank: Did negative
      {
        id: 'pst-6',
        type: 'fill-blank',
        title: 'Negative Past Simple: did not',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'She did not ___ to the party last Saturday.',
            options: ['go', 'went', 'gone', 'going'],
            correctAnswer: 'go',
            explanation: 'Setelah auxiliary verb "did not", kata kerja wajib kembali ke bentuk dasar Verb 1 ("go").'
          }
        }
      },
      // 7. Fill in the blank: Irregular V2
      {
        id: 'pst-7',
        type: 'fill-blank',
        title: 'Irregular Past Verb: Ate',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'We ___ delicious pizza for dinner yesterday evening.',
            options: ['ate', 'eat', 'eaten', 'eating'],
            correctAnswer: 'ate',
            explanation: 'Keterangan waktu "yesterday evening" menandakan Simple Past, bentuk V2 dari eat adalah "ate".'
          }
        }
      },
      // 8. Fill in the blank: Past Question
      {
        id: 'pst-8',
        type: 'fill-blank',
        title: 'Question Formation: Did',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: '___ you finish the English homework last night?',
            options: ['Did', 'Do', 'Have', 'Were'],
            correctAnswer: 'Did',
            explanation: 'Untuk menanyakan kejadian lampau pada waktu spesifik "last night", gunakan "Did".'
          }
        }
      },
      // 9. Fill in the blank: Was vs Were
      {
        id: 'pst-9',
        type: 'fill-blank',
        title: 'Past To Be: They were',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'They ___ in Paris during their summer vacation last year.',
            options: ['were', 'was', 'are', 'been'],
            correctAnswer: 'were',
            explanation: 'Subjek jamak "They" pada masa lampau berpasangan dengan "were".'
          }
        }
      },
      // 10. Fill in the blank: Past Continuous interruption
      {
        id: 'pst-10',
        type: 'fill-blank',
        title: 'Past Continuous & Past Simple',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'While I was studying in my room, the telephone ___.',
            options: ['rang', 'ring', 'rung', 'was ringing'],
            correctAnswer: 'rang',
            explanation: 'Aksi pemotong (interruption) saat kejadian lain sedang berlangsung menggunakan Simple Past V2 ("rang").'
          }
        }
      },
      // 11. Drag & Drop: Yesterday School
      {
        id: 'pst-11',
        type: 'drag-drop',
        title: 'Sentence Builder: I went to school yesterday',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kata-kata berikut menjadi kalimat bahasa Inggris yang natural:',
            scrambledWords: ['yesterday', 'school', 'went', 'I', 'to'],
            correctSentence: 'I went to school yesterday',
            translationHint: 'Subject + Verb + Prepositional Phrase + Time Expression'
          }
        }
      },
      // 12. Drag & Drop: Last Night Call
      {
        id: 'pst-12',
        type: 'drag-drop',
        title: 'Sentence Builder: Negative Past Sentence',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat lampau negatif yang benar:',
            scrambledWords: ['call', 'She', 'night', 'not', 'me', 'last', 'did'],
            correctSentence: 'She did not call me last night',
            translationHint: 'Subject + did not + Verb 1 + Object + Time'
          }
        }
      },
      // 13. Drag & Drop: Two Days Ago
      {
        id: 'pst-13',
        type: 'drag-drop',
        title: 'Sentence Builder: Purchase Time Marker',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat transaksi lampau:',
            scrambledWords: ['laptop', 'a', 'He', 'bought', 'new', 'two', 'days', 'ago'],
            correctSentence: 'He bought a new laptop two days ago',
            translationHint: 'Subject + Verb 2 + Object + Time Expression'
          }
        }
      },
      // 14. Drag & Drop: Question Order
      {
        id: 'pst-14',
        type: 'drag-drop',
        title: 'Sentence Builder: Past Question',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun pertanyaan lampau yang benar:',
            scrambledWords: ['Did', 'see', 'the', 'museum', 'you', 'yesterday?'],
            correctSentence: 'Did you see the museum yesterday?',
            translationHint: 'Did + Subject + Verb 1 + Object + Time'
          }
        }
      },
      // 15. Drag & Drop: While Continuous
      {
        id: 'pst-15',
        type: 'drag-drop',
        title: 'Sentence Builder: Narrative Sequence',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat gabungan past continuous:',
            scrambledWords: ['While', 'was', 'raining,', 'we', 'inside', 'it', 'stayed'],
            correctSentence: 'While it was raining, we stayed inside',
            translationHint: 'Dependent Clause + Independent Clause'
          }
        }
      },
      // 16. Matching: V1 to V2 Irregular Verbs
      {
        id: 'pst-16',
        type: 'matching',
        title: 'Match Verb 1 with Past Form (Verb 2)',
        xpValue: 15,
        data: {
          kind: 'matching',
          pairs: [
            { id: 'v1', word: 'Take', definition: 'Took (Mengambil)' },
            { id: 'v2', word: 'Drive', definition: 'Drove (Mengemudi)' },
            { id: 'v3', word: 'Begin', definition: 'Began (Memulai)' },
            { id: 'v4', word: 'Think', definition: 'Thought (Berpikir)' }
          ]
        }
      },
      // 17. Matching: More Irregular Verbs
      {
        id: 'pst-17',
        type: 'matching',
        title: 'Match Irregular Past Tense Forms',
        xpValue: 15,
        data: {
          kind: 'matching',
          pairs: [
            { id: 'v5', word: 'Find', definition: 'Found (Menemukan)' },
            { id: 'v6', word: 'Teach', definition: 'Taught (Mengajar)' },
            { id: 'v7', word: 'Bring', definition: 'Brought (Membawa)' },
            { id: 'v8', word: 'Leave', definition: 'Left (Meninggalkan)' }
          ]
        }
      },
      // 18. Multiple Choice: Signal Word Check
      {
        id: 'pst-18',
        type: 'multiple-choice',
        title: 'Multiple Choice: Past Time Signal',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'Which sentence is grammatically correct?',
            options: [
              'I met him two days ago at the central station.',
              'I have met him two days ago at the central station.',
              'I am meeting him two days ago at the central station.',
              'I meet him two days ago at the central station.'
            ],
            correctIndex: 0,
            explanation: 'Karena ada keterangan waktu lampau spesifik "two days ago", wajib menggunakan Simple Past V2 ("met"), bukan Present Perfect.'
          }
        }
      },
      // 19. Multiple Choice: Past Continuous
      {
        id: 'pst-19',
        type: 'multiple-choice',
        title: 'Multiple Choice: Action in Progress in Past',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'At 8:00 PM last night, we ___ dinner with our grandparents.',
            options: ['were having', 'have had', 'are having', 'have'],
            correctIndex: 0,
            explanation: 'Keterangan waktu pada jam spesifik di masa lampau ("At 8:00 PM last night") menunjukkan kejadian yang sedang berlangsung (Past Continuous: were having).'
          }
        }
      },
      // 20. Listening: Past Narration
      {
        id: 'pst-20',
        type: 'listening',
        title: 'Listening: London Art Galleries',
        xpValue: 20,
        data: {
          kind: 'listening',
          data: {
            audioText: 'We visited three different art galleries during our memorable trip to London last summer.',
            instruction: 'Dengarkan penutur asli dan pilih pernyataan yang sesuai:',
            question: 'What did the speaker do last summer in London?',
            options: [
              'They visited three art galleries',
              'They bought three paintings',
              'They lived in London permanently',
              'They cancelled their summer trip'
            ],
            correctIndex: 0,
            transcript: 'We visited three different art galleries during our memorable trip to London last summer.',
            explanation: 'Audio menyatakan dengan jelas: "We visited three different art galleries during our memorable trip".'
          }
        }
      }
    ]
  },

  // 2. CONDITIONALS & HYPOTHESES BUILDER (20 ACTIVITIES)
  {
    id: 'lesson-conditionals',
    title: 'Conditionals & Hypotheses Masterclass',
    subtitle: 'Zero, First, Second, and Third Conditionals with Drag-and-Drop Builders (20 Latihan Soal)',
    level: 'Intermediate',
    category: 'Grammar',
    estimatedMinutes: 20,
    xpTotal: 300,
    progressPercent: 0,
    completed: false,
    unlocked: true,
    theoryGuide: {
      summary: 'Kalimat pengandaian (Conditionals) terbagi menjadi 4 tipe: Type 0 (fakta ilmiah), Type 1 (kemungkinan masa depan), Type 2 (khayalan saat ini), dan Type 3 (penyesalan masa lalu).',
      rules: [
        {
          title: 'Conditionals Type 1 (Real Possibility)',
          explanation: 'Gunakan Simple Present di klausa IF, dan will + Verb 1 di klausa hasil.',
          formula: 'If + S + Verb 1, S + will + Verb 1',
          example: 'If it rains tomorrow, we will stay at home.'
        },
        {
          title: 'Conditionals Type 2 (Unreal / Imaginary)',
          explanation: 'Gunakan Simple Past (were/V2) di klausa IF, dan would + Verb 1 di klausa hasil.',
          formula: 'If + S + Verb 2 / were, S + would + Verb 1',
          example: 'If I were rich, I would travel around the world.'
        },
        {
          title: 'Conditionals Type 3 (Past Regret)',
          explanation: 'Gunakan Past Perfect (had + V3) di klausa IF, dan would have + Verb 3 di klausa hasil.',
          formula: 'If + S + had + Verb 3, S + would have + Verb 3',
          example: 'If I had studied harder, I would have passed the IELTS test.'
        }
      ],
      keyFormulas: [
        'Type 0: If + V1, V1 (Fakta ilmiah)',
        'Type 1: If + V1, will + V1 (Kemungkinan nyata)',
        'Type 2: If + V2/were, would + V1 (Khayalan)',
        'Type 3: If + had V3, would have + V3 (Penyesalan lampau)'
      ],
      teacherTip: 'Ingat: Jangan pernah menggunakan "will" atau "would" di dalam klausa IF! Rumus yang benar selalu meletakkan will/would di klausa hasil (main clause).'
    },
    activities: [
      {
        id: 'cnd-1',
        type: 'fill-blank',
        title: 'Conditional Type 1: Will Pass',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'If you study diligently every day, you ___ pass the examination.',
            options: ['will', 'would', 'would have', 'had'],
            correctAnswer: 'will',
            explanation: 'Conditional Type 1 menggunakan "will + Verb 1" pada klausa hasil.'
          }
        }
      },
      {
        id: 'cnd-2',
        type: 'fill-blank',
        title: 'Conditional Type 2: Were rich',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'If I ___ you, I would take that prestigious scholarship offer.',
            options: ['were', 'was', 'am', 'be'],
            correctAnswer: 'were',
            explanation: 'Dalam tata bahasa Conditional Type 2 formal, "were" digunakan untuk semua subjek (termasuk I).'
          }
        }
      },
      {
        id: 'cnd-3',
        type: 'fill-blank',
        title: 'Conditional Type 3: Had known',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'If she ___ about the traffic, she would have left home earlier.',
            options: ['had known', 'knew', 'knows', 'has known'],
            correctAnswer: 'had known',
            explanation: 'Conditional Type 3 di klausa IF wajib menggunakan Past Perfect: had + Verb 3 ("had known").'
          }
        }
      },
      {
        id: 'cnd-4',
        type: 'fill-blank',
        title: 'Conditional Type 0: Ice melts',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'If you heat ice to 100 degrees, it ___ into water.',
            options: ['melts', 'will melt', 'melted', 'would melt'],
            correctAnswer: 'melts',
            explanation: 'Fakta ilmiah mutlak (Conditional Type 0) menggunakan Simple Present di kedua klausa.'
          }
        }
      },
      {
        id: 'cnd-5',
        type: 'fill-blank',
        title: 'Conditional Type 2: Would buy',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'If he had more free time, he ___ learn acoustic guitar.',
            options: ['would', 'will', 'would have', 'can'],
            correctAnswer: 'would',
            explanation: 'Conditional Type 2 menggunakan "would + Verb 1" pada klausa hasil.'
          }
        }
      },
      // 6 to 10: Drag & Drop Conditionals
      {
        id: 'cnd-6',
        type: 'drag-drop',
        title: 'Builder: Type 1 Future Condition',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat Conditional Type 1:',
            scrambledWords: ['tomorrow,', 'rains', 'it', 'If', 'will', 'we', 'stay', 'home'],
            correctSentence: 'If it rains tomorrow, we will stay home',
            translationHint: 'If clause + Main clause'
          }
        }
      },
      {
        id: 'cnd-7',
        type: 'drag-drop',
        title: 'Builder: Type 2 Unreal Dream',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat pengandaian Type 2:',
            scrambledWords: ['rich,', 'were', 'I', 'If', 'would', 'I', 'travel', 'the', 'world'],
            correctSentence: 'If I were rich, I would travel the world',
            translationHint: 'If I were rich + I would travel the world'
          }
        }
      },
      {
        id: 'cnd-8',
        type: 'drag-drop',
        title: 'Builder: Type 3 Past Regret',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat penyesalan lampau Type 3:',
            scrambledWords: ['had', 'harder,', 'she', 'studied', 'she', 'passed', 'would', 'have'],
            correctSentence: 'If she had studied harder, she would have passed',
            translationHint: 'If + had studied + would have passed'
          }
        }
      },
      {
        id: 'cnd-9',
        type: 'drag-drop',
        title: 'Builder: Inverted Condition without IF',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat bersyarat tanpa kata "if":',
            scrambledWords: ['Had', 'known,', 'I', 'would', 'called', 'have', 'I', 'you'],
            correctSentence: 'Had I known, I would have called you',
            translationHint: 'Inversion: Had I known'
          }
        }
      },
      {
        id: 'cnd-10',
        type: 'drag-drop',
        title: 'Builder: Unless clause',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat menggunakan "Unless" (If not):',
            scrambledWords: ['hurry,', 'Unless', 'we', 'will', 'we', 'miss', 'the', 'train'],
            correctSentence: 'Unless we hurry, we will miss the train',
            translationHint: 'Unless = If we do not hurry'
          }
        }
      },
      // 11 to 15: Multiple Choice Conditionals
      {
        id: 'cnd-11',
        type: 'multiple-choice',
        title: 'Identify Conditional Type: Fact',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: '"If water reaches 100 degrees Celsius, it boils." What type of conditional is this?',
            options: ['Type 0 (Zero Conditional)', 'Type 1', 'Type 2', 'Type 3'],
            correctIndex: 0,
            explanation: 'Kalimat ini menyatakan hukum alam dan kebenaran ilmiah mutlak, sehingga merupakan Zero Conditional.'
          }
        }
      },
      {
        id: 'cnd-12',
        type: 'multiple-choice',
        title: 'Identify Real Meaning of Type 2',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'What does "If I had a car, I would drive to campus" imply in reality?',
            options: [
              'I do not have a car, so I do not drive to campus.',
              'I had a car last year, but I sold it.',
              'I will definitely buy a car tomorrow.',
              'I have a car and I drive it every day.'
            ],
            correctIndex: 0,
            explanation: 'Conditional Type 2 mengandaikan situasi yang berlawanan dengan fakta saat ini (faktanya: I don\'t have a car).'
          }
        }
      },
      {
        id: 'cnd-13',
        type: 'multiple-choice',
        title: 'Identify Real Meaning of Type 3',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'What does "If Sultan had set an alarm, he would not have missed the morning bus" mean?',
            options: [
              'Sultan did not set an alarm, and he missed the bus.',
              'Sultan woke up early and caught the bus easily.',
              'Sultan was driving his own electric car.',
              'The bus did not arrive this morning.'
            ],
            correctIndex: 0,
            explanation: 'Conditional Type 3 menyatakan penyesalan lampau: faktanya Sultan tidak memasang alarm dan akibatnya tertinggal bus.'
          }
        }
      },
      {
        id: 'cnd-14',
        type: 'multiple-choice',
        title: 'Mixed Conditional Form',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'If she had taken English lessons in school, she ___ fluent today.',
            options: ['would be', 'would have been', 'will be', 'is'],
            correctIndex: 0,
            explanation: 'Mixed Conditional: sebab di masa lampau (had taken) berdampak langsung ke kondisi sekarang "today" (would be).'
          }
        }
      },
      {
        id: 'cnd-15',
        type: 'multiple-choice',
        title: 'Providing that / As long as',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'You can borrow my laptop, ___ you return it before Friday.',
            options: ['as long as', 'unless', 'although', 'in case of'],
            correctIndex: 0,
            explanation: '"As long as" bermakna "dengan syarat bahwa" (provided that / on the condition that).'
          }
        }
      },
      // 16 to 20: Matching Pairs Conditionals
      {
        id: 'cnd-16',
        type: 'matching',
        title: 'Match Conditions with Real-life Results',
        xpValue: 15,
        data: {
          kind: 'matching',
          pairs: [
            { id: 'cd1', word: 'If you don\'t sleep enough,', definition: 'you feel tired all day.' },
            { id: 'cd2', word: 'If you study with Englicious,', definition: 'your English score will rise.' },
            { id: 'cd3', word: 'If I were a doctor,', definition: 'I would help sick patients.' },
            { id: 'cd4', word: 'If he had arrived on time,', definition: 'he would have met the director.' }
          ]
        }
      },
      {
        id: 'cnd-17',
        type: 'fill-blank',
        title: 'Conditional Type 1: Will invite',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'If they throw a graduation party, they ___ invite all their classmates.',
            options: ['will', 'would', 'had', 'have'],
            correctAnswer: 'will',
            explanation: 'Klausa IF berbentuk Simple Present ("throw"), maka klausa hasil menggunakan "will".'
          }
        }
      },
      {
        id: 'cnd-18',
        type: 'fill-blank',
        title: 'Conditional Type 2: Were president',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'If she ___ president, she would invest heavily in public education.',
            options: ['were', 'was', 'is', 'be'],
            correctAnswer: 'were',
            explanation: 'Pengandaian Type 2 menggunakan subjunctive "were" untuk menyatakan peran khayalan.'
          }
        }
      },
      {
        id: 'cnd-19',
        type: 'fill-blank',
        title: 'Conditional Type 3: Would have visited',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'If I had visited London, I ___ seen Big Ben in person.',
            options: ['would have', 'will have', 'would', 'had'],
            correctAnswer: 'would have',
            explanation: 'Type 3 result clause formula: would have + Verb 3 ("would have seen").'
          }
        }
      },
      {
        id: 'cnd-20',
        type: 'multiple-choice',
        title: 'Final Conditional Challenge',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: '"If you touch fire, you get burned." Why are both verbs in the Simple Present?',
            options: [
              'Because it describes a timeless natural law with 100% certainty.',
              'Because it is an imaginary scenario.',
              'Because it is a past regret.',
              'Because the speaker made a grammatical mistake.'
            ],
            correctIndex: 0,
            explanation: 'Zero Conditional digunakan untuk fakta ilmiah dan hukum alam mutlak yang selalu bernilai benar.'
          }
        }
      }
    ]
  },

  // 3. B2 GATEWAY CERTIFICATION EXAM (20 ACTIVITIES)
  {
    id: 'lesson-checkpoint-i',
    title: 'B2 Gateway Comprehensive Certification Exam',
    subtitle: 'Calibrated 20-question evaluation testing B1-B2 past tenses, conditionals, passive voice, and reading',
    level: 'Intermediate',
    category: 'Grammar',
    estimatedMinutes: 22,
    xpTotal: 350,
    progressPercent: 0,
    completed: false,
    unlocked: true,
    theoryGuide: {
      summary: 'Ujian komprehensif menguji seluruh kompetensi level Intermediate: past narrative, conditionals Type 0-3, passive voice di berbagai tenses, dan phrasal verbs.',
      rules: [
        {
          title: 'Strategi Ujian Sertifikasi B2',
          explanation: 'Perhatikan apakah kalimat aktif atau pasif, apakah pengandaian nyata (Type 1) atau khayalan (Type 2/3), dan perhatikan keselarasan tenses.',
          example: 'Check subject-verb agreement and tense consistency before submitting your answer!'
        }
      ],
      teacherTip: 'Kerjakan seluruh 20 soal dengan cermat untuk membuka sertifikat kemahiran B2 Independent Speaker!'
    },
    activities: [
      {
        id: 'cp-i1',
        type: 'multiple-choice',
        title: 'Q1: Past Simple vs Present Perfect',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'Sultan ___ to the UK two years ago for an educational exchange.',
            options: ['went', 'has gone', 'goes', 'had gone'],
            correctIndex: 0,
            explanation: 'Sinyal waktu spesifik "two years ago" mewajibkan penggunaan Simple Past V2 ("went").'
          }
        }
      },
      {
        id: 'cp-i2',
        type: 'multiple-choice',
        title: 'Q2: Passive Voice Present Perfect',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'All the interactive lesson modules ___ completed by the student.',
            options: ['have been', 'has been', 'was', 'is being'],
            correctIndex: 0,
            explanation: 'Subjek jamak "All the interactive lesson modules" menggunakan "have been + V3".'
          }
        }
      },
      {
        id: 'cp-i3',
        type: 'multiple-choice',
        title: 'Q3: Conditional Type 2 Subjunctive',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'If she ___ more attention in class, she would understand the lesson.',
            options: ['paid', 'pays', 'had paid', 'will pay'],
            correctIndex: 0,
            explanation: 'Klausa hasil menggunakan "would understand" (Type 2), sehingga klausa IF memerlukan Verb 2 ("paid").'
          }
        }
      },
      {
        id: 'cp-i4',
        type: 'multiple-choice',
        title: 'Q4: Phrasal Verb Meaning',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'Due to severe stormy weather, the flight was ___.',
            options: ['called off', 'given up', 'run out of', 'looked forward to'],
            correctIndex: 0,
            explanation: 'Phrasal verb "called off" bermakna dibatalkan (cancelled).'
          }
        }
      },
      {
        id: 'cp-i5',
        type: 'multiple-choice',
        title: 'Q5: Past Continuous Interruption',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'While they were hiking in the forest, it ___ to rain heavily.',
            options: ['began', 'was beginning', 'has begun', 'begun'],
            correctIndex: 0,
            explanation: 'Kejadian pemotong mendadak (sudden interruption) menggunakan Simple Past V2 ("began").'
          }
        }
      },
      {
        id: 'cp-i6',
        type: 'multiple-choice',
        title: 'Q6: Conditional Type 3 Regret',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'If we had booked earlier, we ___ cheaper airline tickets.',
            options: ['would have obtained', 'will obtain', 'obtained', 'would obtain'],
            correctIndex: 0,
            explanation: 'Type 3 result clause formula: would have + Verb 3 ("would have obtained").'
          }
        }
      },
      {
        id: 'cp-i7',
        type: 'multiple-choice',
        title: 'Q7: Passive Voice in Past Continuous',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'When I arrived at the repair shop, my car ___ by two mechanics.',
            options: ['was being inspected', 'inspected', 'is inspected', 'has been inspected'],
            correctIndex: 0,
            explanation: 'Bentuk pasif dari kegiatan yang sedang berlangsung di masa lampau adalah "was/were being + V3".'
          }
        }
      },
      {
        id: 'cp-i8',
        type: 'multiple-choice',
        title: 'Q8: Modal Verbs of Deduction',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'The classroom lights are off and the door is locked. The teacher ___ left.',
            options: ['must have', 'should', 'can', 'would'],
            correctIndex: 0,
            explanation: '"Must have + V3" digunakan untuk kesimpulan logis yang sangat meyakinkan tentang kejadian lampau.'
          }
        }
      },
      {
        id: 'cp-i9',
        type: 'multiple-choice',
        title: 'Q9: Idiom Comprehension',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'What does "The new sports car cost an arm and a leg" mean?',
            options: [
              'The car was extremely expensive.',
              'The car was cheap and affordable.',
              'The car caused an injury.',
              'The car was painted red.'
            ],
            correctIndex: 0,
            explanation: 'Idiom "cost an arm and a leg" bermakna harganya sangat mahal sekali.'
          }
        }
      },
      {
        id: 'cp-i10',
        type: 'multiple-choice',
        title: 'Q10: Polite Disagreement in Debate',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'Which phrase expresses polite academic disagreement?',
            options: [
              'I see your point, but evidence suggests a different conclusion.',
              'You are totally wrong and foolish.',
              'I hate this proposal.',
              'Shut up and listen.'
            ],
            correctIndex: 0,
            explanation: 'Frasa "I see your point, but..." adalah teknik pelembut (softening) standar dalam debat formal.'
          }
        }
      },
      // 11 to 15: Fill-in-the-blank Checkpoint
      {
        id: 'cp-i11',
        type: 'fill-blank',
        title: 'Q11: Phrasal Verb Particle',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'We have completely run ___ of printing paper.',
            options: ['out', 'away', 'in', 'off'],
            correctAnswer: 'out',
            explanation: '"Run out of" bermakna kehabisan stok persediaan.'
          }
        }
      },
      {
        id: 'cp-i12',
        type: 'fill-blank',
        title: 'Q12: Passive Modal',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'All safety guidelines must ___ followed strictly.',
            options: ['be', 'been', 'being', 'is'],
            correctAnswer: 'be',
            explanation: 'Setelah modal verb "must", bentuk pasifnya adalah "must be + V3".'
          }
        }
      },
      {
        id: 'cp-i13',
        type: 'fill-blank',
        title: 'Q13: Conditional Type 1',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'If they offer Sultan the job, he ___ accept it immediately.',
            options: ['will', 'would', 'had', 'would have'],
            correctAnswer: 'will',
            explanation: 'Conditional Type 1 menggunakan "will" pada klausa hasil.'
          }
        }
      },
      {
        id: 'cp-i14',
        type: 'fill-blank',
        title: 'Q14: Irregular Past Participle',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'She has ___ three research articles this semester.',
            options: ['written', 'wrote', 'write', 'writing'],
            correctAnswer: 'written',
            explanation: 'Setelah "has", bentuk kata kerja wajib berupa Past Participle V3 ("written").'
          }
        }
      },
      {
        id: 'cp-i15',
        type: 'fill-blank',
        title: 'Q15: Relative Pronoun',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'The developer ___ created this interactive media is named Sultan.',
            options: ['who', 'which', 'whom', 'whose'],
            correctAnswer: 'who',
            explanation: 'Relative pronoun untuk subjek orang (developer) adalah "who".'
          }
        }
      },
      // 16 to 18: Drag & Drop Builders
      {
        id: 'cp-i16',
        type: 'drag-drop',
        title: 'Q16: Passive Voice Sentence Order',
        xpValue: 20,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat pasif yang benar:',
            scrambledWords: ['was', 'The', 'designed', 'renowned', 'bridge', 'by', 'architects'],
            correctSentence: 'The bridge was designed by renowned architects',
            translationHint: 'Subject + was + V3 + by agent'
          }
        }
      },
      {
        id: 'cp-i17',
        type: 'drag-drop',
        title: 'Q17: Conditional Type 2 Sentence',
        xpValue: 20,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat pengandaian Type 2:',
            scrambledWords: ['had', 'time,', 'more', 'I', 'If', 'would', 'I', 'join', 'the', 'club'],
            correctSentence: 'If I had more time, I would join the club',
            translationHint: 'If clause + would clause'
          }
        }
      },
      {
        id: 'cp-i18',
        type: 'drag-drop',
        title: 'Q18: Phrasal Verb Sentence Order',
        xpValue: 20,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat yang menggunakan phrasal verb:',
            scrambledWords: ['look', 'I', 'forward', 'meeting', 'to', 'the', 'examiner', 'tomorrow'],
            correctSentence: 'I look forward to meeting the examiner tomorrow',
            translationHint: 'look forward to + V-ing'
          }
        }
      },
      // 19 to 20: Matching & Listening
      {
        id: 'cp-i19',
        type: 'matching',
        title: 'Q19: Match Formal and Informal Terms',
        xpValue: 20,
        data: {
          kind: 'matching',
          pairs: [
            { id: 'b2_1', word: 'Informal: Find out', definition: 'Formal: Discover / Investigate' },
            { id: 'b2_2', word: 'Informal: Put off', definition: 'Formal: Postpone / Defer' },
            { id: 'b2_3', word: 'Informal: Set up', definition: 'Formal: Establish / Configure' },
            { id: 'b2_4', word: 'Informal: Get by', definition: 'Formal: Survive / Manage' }
          ]
        }
      },
      {
        id: 'cp-i20',
        type: 'listening',
        title: 'Q20: Comprehensive B2 Audio Evaluation',
        xpValue: 20,
        data: {
          kind: 'listening',
          data: {
            audioText: 'Congratulations on completing the B2 examination! You have demonstrated clear command of complex grammar structures and nuanced vocabulary.',
            instruction: 'Dengarkan evaluasi penutur asli dan pilih kesimpulan yang tepat:',
            question: 'What does the examiner conclude about the candidate\'s English capability?',
            options: [
              'The candidate demonstrated clear command of complex grammar and nuanced vocabulary',
              'The candidate needs to repeat beginner phonics classes',
              'The candidate spoke too quietly to be evaluated',
              'The candidate forgot to attend the examination'
            ],
            correctIndex: 0,
            transcript: 'Congratulations on completing the B2 examination! You have demonstrated clear command of complex grammar structures and nuanced vocabulary.',
            explanation: 'Penguji menyatakan secara langsung bahwa kandidat telah menunjukkan penguasaan tata bahasa kompleks dan kosakata bernuansa.'
          }
        }
      }
    ]
  },

  // 4. PHRASAL VERBS IN ACTION (20 ACTIVITIES)
  {
    id: 'lesson-phrasal-verbs',
    title: 'Phrasal Verbs in Daily Action',
    subtitle: 'Master natural colloquial verbs and separable particles (20 Latihan Soal)',
    level: 'Intermediate',
    category: 'Vocabulary',
    estimatedMinutes: 20,
    xpTotal: 300,
    progressPercent: 0,
    completed: false,
    unlocked: true,
    theoryGuide: {
      summary: 'Phrasal verbs adalah gabungan kata kerja dasar dengan satu atau dua preposisi yang menghasilkan makna baru. Pahami phrasal verbs separable (dapat dipisah oleh objek) dan inseparable (wajib menyatu).',
      rules: [
        {
          title: 'Separable Phrasal Verbs',
          explanation: 'Jika objek berupa pronoun (it/him/her/them), pronoun WAJIB diletakkan di antara kata kerja dan partikel: "Turn it off" ✔️ (bukan "Turn off it" ❌).',
          formula: 'Verb + Pronoun + Particle (Turn it on / Turn it off)',
          example: 'I have the report here. Let me hand it in.'
        }
      ],
      keyFormulas: [
        'Give up = Berhenti / Menyerah | Figure out = Memecahkan masalah',
        'Look forward to + V-ing = Menantikan dengan antusias'
      ],
      teacherTip: 'Gunakan phrasal verbs secara kontekstual dalam percakapan lisan untuk terdengar luwes seperti penutur asli!'
    },
    activities: [
      {
        id: 'pv-1',
        type: 'flashcard',
        title: 'Phrasal Verb: Look Forward To',
        xpValue: 15,
        data: {
          kind: 'flashcard',
          data: {
            word: 'LOOK FORWARD TO',
            phonetic: '/lʊk ˈfɔːr.wərd tuː/',
            accentNote: 'menantikan dengan senang',
            partOfSpeech: 'phrasal verb (+ gerund / noun)',
            meaning: 'To anticipate future events with pleasure and excitement.',
            example: 'I look forward to attending the international English conference next month.',
            translationHint: 'Sangat menanti-nanti kejadian mendatang',
            audioPrompt: 'look forward to. I look forward to attending the conference.'
          }
        }
      },
      {
        id: 'pv-2',
        type: 'flashcard',
        title: 'Phrasal Verb: Figure Out',
        xpValue: 15,
        data: {
          kind: 'flashcard',
          data: {
            word: 'FIGURE OUT',
            phonetic: '/ˈfɪɡ.jər aʊt/',
            accentNote: 'menemukan solusi / memahami',
            partOfSpeech: 'phrasal verb (separable)',
            meaning: 'To solve a difficult problem or understand someone\'s motive.',
            example: 'Sultan finally figured out the complex programming bug in the app.',
            translationHint: 'Memecahkan misteri atau teka-teki',
            audioPrompt: 'figure out. Sultan finally figured out the complex programming bug.'
          }
        }
      },
      {
        id: 'pv-3',
        type: 'flashcard',
        title: 'Phrasal Verb: Give Up',
        xpValue: 15,
        data: {
          kind: 'flashcard',
          data: {
            word: 'GIVE UP',
            phonetic: '/ɡɪv ʌp/',
            accentNote: 'menyerah / berhenti mencoba',
            partOfSpeech: 'phrasal verb',
            meaning: 'To cease making an effort; to surrender or quit an activity.',
            example: 'Never give up when studying a foreign language; consistency is key.',
            translationHint: 'Berhenti berusaha atau putus asa',
            audioPrompt: 'give up. Never give up when studying a foreign language.'
          }
        }
      },
      {
        id: 'pv-4',
        type: 'flashcard',
        title: 'Phrasal Verb: Run Out Of',
        xpValue: 15,
        data: {
          kind: 'flashcard',
          data: {
            word: 'RUN OUT OF',
            phonetic: '/rʌn aʊt əv/',
            accentNote: 'kehabisan persediaan',
            partOfSpeech: 'three-word phrasal verb',
            meaning: 'To have none left of a necessary supply or resource.',
            example: 'We ran out of printer ink while producing the student handouts.',
            translationHint: 'Kehabisan stok persediaan',
            audioPrompt: 'run out of. We ran out of printer ink.'
          }
        }
      },
      // 5 to 8: Fill-in-the-blank
      {
        id: 'pv-5',
        type: 'fill-blank',
        title: 'Fill Blank: Call off',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'They had to ___ the football match because of torrential rain.',
            options: ['call off', 'give up', 'look for', 'break into'],
            correctAnswer: 'call off',
            explanation: '"Call off" berarti membatalkan (cancel).'
          }
        }
      },
      {
        id: 'pv-6',
        type: 'fill-blank',
        title: 'Fill Blank: Put off',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'Do not ___ your homework until the last minute before class.',
            options: ['put off', 'call out', 'run out', 'break up'],
            correctAnswer: 'put off',
            explanation: '"Put off" berarti menunda pekerjaan (postpone / procrastinate).'
          }
        }
      },
      {
        id: 'pv-7',
        type: 'fill-blank',
        title: 'Fill Blank: Turn down',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'She had to ___ the job offer because the office was in another country.',
            options: ['turn down', 'bring up', 'look into', 'give in'],
            correctAnswer: 'turn down',
            explanation: '"Turn down" bermakna menolak tawaran (refuse / decline).'
          }
        }
      },
      {
        id: 'pv-8',
        type: 'fill-blank',
        title: 'Fill Blank: Break down',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'Our vehicle suddenly ___ on the highway, requiring road service.',
            options: ['broke down', 'gave out', 'turned off', 'looked up'],
            correctAnswer: 'broke down',
            explanation: '"Break down" bermakna mesin kendaraan mogok atau rusak.'
          }
        }
      },
      // 9 to 12: Categorization & Drag-drop
      {
        id: 'pv-9',
        type: 'categorize',
        title: 'Sort Phrasal Verbs by Particle',
        xpValue: 20,
        data: {
          kind: 'categorize',
          data: {
            instruction: 'Kelompokkan phrasal verbs berikut berdasarkan partikel preposisinya:',
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
        id: 'pv-10',
        type: 'drag-drop',
        title: 'Sentence Order: Separable Verb',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat pemisahan partikel yang benar:',
            scrambledWords: ['turned', 'down', 'lucrative', 'the', 'She', 'offer'],
            correctSentence: 'She turned down the lucrative offer',
            translationHint: 'Subject + turned + down + object'
          }
        }
      },
      {
        id: 'pv-11',
        type: 'drag-drop',
        title: 'Sentence Order: Look forward to meeting',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat penutup email profesional:',
            scrambledWords: ['I', 'forward', 'look', 'to', 'hearing', 'you', 'from', 'soon'],
            correctSentence: 'I look forward to hearing from you soon',
            translationHint: 'I look forward to hearing from you soon'
          }
        }
      },
      {
        id: 'pv-12',
        type: 'drag-drop',
        title: 'Sentence Order: Find out the answer',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat mencari tahu:',
            scrambledWords: ['need', 'We', 'out', 'to', 'find', 'the', 'truth', 'today'],
            correctSentence: 'We need to find out the truth today',
            translationHint: 'We need to find out the truth today'
          }
        }
      },
      // 13 to 20: Matching & Multiple Choice
      {
        id: 'pv-13',
        type: 'matching',
        title: 'Match Phrasal Verbs with Formal Meanings',
        xpValue: 15,
        data: {
          kind: 'matching',
          pairs: [
            { id: 'pvm1', word: 'Take off', definition: 'Depart into the air (pesawat lepas landas)' },
            { id: 'pvm2', word: 'Look into', definition: 'Investigate / Examine (menyelidiki)' },
            { id: 'pvm3', word: 'Come across', definition: 'Find by chance (menemukan kebetulan)' },
            { id: 'pvm4', word: 'Get along with', definition: 'Have a friendly relationship (akur)' }
          ]
        }
      },
      {
        id: 'pv-14',
        type: 'matching',
        title: 'Match Workplace Phrasal Verbs',
        xpValue: 15,
        data: {
          kind: 'matching',
          pairs: [
            { id: 'pvm5', word: 'Carry out', definition: 'Execute / Conduct (melaksanakan tugas)' },
            { id: 'pvm6', word: 'Hold on', definition: 'Wait a short moment (tunggu sebentar)' },
            { id: 'pvm7', word: 'Point out', definition: 'Draw attention to a fact (menunjukkan fakta)' },
            { id: 'pvm8', word: 'Set up', definition: 'Arrange or configure (mengatur / mendirikan)' }
          ]
        }
      },
      {
        id: 'pv-15',
        type: 'multiple-choice',
        title: 'Contextual Meaning: Catch up',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: '"Let\'s meet for coffee on Saturday to catch up." What does "catch up" mean here?',
            options: [
              'Exchange recent life news and updates after being apart',
              'Run after a moving bus',
              'Play sports together',
              'Argue about politics'
            ],
            correctIndex: 0,
            explanation: '"Catch up" dalam konteks santai bermakna saling bertukar kabar terbaru setelah sekian lama tidak bertemu.'
          }
        }
      },
      {
        id: 'pv-16',
        type: 'multiple-choice',
        title: 'Grammar Rule: Pronoun with Separable Verb',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'Which of the following sentences with pronoun "it" is grammatically CORRECT?',
            options: [
              'Please turn it off before leaving the classroom.',
              'Please turn off it before leaving the classroom.',
              'Please it turn off before leaving the classroom.',
              'Please off turn it before leaving the classroom.'
            ],
            correctIndex: 0,
            explanation: 'Objek berupa pronoun (it) WAJIB diletakkan di antara kata kerja dan partikel ("turn it off").'
          }
        }
      },
      {
        id: 'pv-17',
        type: 'multiple-choice',
        title: 'Meaning: Bring up',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: '"She brought up an important financial concern during the meeting." What did she do?',
            options: [
              'Mentioned or introduced a topic for discussion',
              'Carried a heavy box upstairs',
              'Cancelled the meeting',
              'Fell asleep'
            ],
            correctIndex: 0,
            explanation: '"Bring up a topic" bermakna mengangkat topik tertentu untuk dibahas.'
          }
        }
      },
      {
        id: 'pv-18',
        type: 'multiple-choice',
        title: 'Meaning: Look up to',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: '"Young students deeply look up to their dedicated teachers." What does "look up to" mean?',
            options: [
              'Admire and respect deeply',
              'Look at the ceiling',
              'Feel envious of',
              'Search in a dictionary'
            ],
            correctIndex: 0,
            explanation: '"Look up to someone" bermakna sangat mengagumi dan menghormati seseorang.'
          }
        }
      },
      {
        id: 'pv-19',
        type: 'fill-blank',
        title: 'Phrasal Verb: Go on',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'Please ___ on with your presentation; we are listening intently.',
            options: ['go', 'take', 'make', 'give'],
            correctAnswer: 'go',
            explanation: '"Go on" bermakna melanjutkan (continue).'
          }
        }
      },
      {
        id: 'pv-20',
        type: 'fill-blank',
        title: 'Phrasal Verb: Get over',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'It took him several days to get ___ the bad flu.',
            options: ['over', 'under', 'through', 'by'],
            correctAnswer: 'over',
            explanation: '"Get over an illness" bermakna sembuh dari sakit (recover).'
          }
        }
      }
    ]
  },

  // 5. SPEAKING FLUENCY & CONVERSATIONAL DIALOGUES (20 ACTIVITIES)
  {
    id: 'lesson-speaking-fluency',
    title: 'Speaking Fluency & Interactive Dialogues',
    subtitle: 'Confident spoken English, daily interactions, debate, and pronunciation cues (20 Latihan Soal)',
    level: 'Beginner',
    category: 'Speaking',
    estimatedMinutes: 20,
    xpTotal: 300,
    progressPercent: 0,
    completed: false,
    unlocked: true,
    theoryGuide: {
      summary: 'Kefasihan lisan (oral fluency) bukan berarti berbicara terburu-buru, melainkan menyampaikan gagasan secara alami dengan intonasi yang tepat dan frasa penghubung (discourse markers).',
      rules: [
        {
          title: 'Gunakan Fillers Alami',
          explanation: 'Alih-alih diam hening saat berpikir, gunakan frasa alami seperti: "Well, let me see...", "Actually...", "To be honest...".',
          example: 'Well, to be honest, I really enjoy interactive media.'
        }
      ],
      keyFormulas: [
        'Asking politely: Could you please... / Would you mind...',
        'Giving opinion: From my perspective... / In my view...'
      ],
      teacherTip: 'Ucapkan setiap frasa lisan dengan suara lantang untuk melatih otot bicara lidah dan mulut!'
    },
    activities: [
      {
        id: 'spk-1',
        type: 'speaking',
        title: 'Self-Introduction in Interview',
        xpValue: 15,
        data: {
          kind: 'speaking',
          data: {
            prompt: 'Introduce yourself in a professional and confident manner.',
            phonetic: '/həˈloʊ maɪ neɪm ɪz sʊlˈtɑːn/',
            sampleAudioText: 'Hello, my name is Sultan. I am an enthusiastic developer creating interactive English media.',
            keyPhrases: ['My name is...', 'I specialize in...', 'Pleasure to meet you.'],
            tips: 'Jaga kontak mata, tersenyum ramah, dan bicara dengan tempo tenang.'
          }
        }
      },
      {
        id: 'spk-2',
        type: 'speaking',
        title: 'Ordering at a Cafe',
        xpValue: 15,
        data: {
          kind: 'speaking',
          data: {
            prompt: 'Order a beverage politely from the barista.',
            phonetic: '/kʊd aɪ hæv ə lɑː.teɪ pliːz/',
            sampleAudioText: 'Could I have a hot latte with oat milk, please?',
            keyPhrases: ['Could I please have...', 'With oat milk', 'To go / For here'],
            tips: 'Gunakan nada intonasi naik di akhir kata "please" agar terdengar santun.'
          }
        }
      },
      {
        id: 'spk-3',
        type: 'speaking',
        title: 'Asking for Directions',
        xpValue: 15,
        data: {
          kind: 'speaking',
          data: {
            prompt: 'Ask a stranger on the street for the nearest station.',
            phonetic: '/ɪkˈskjuːz miː weər ɪz ðə steɪ.ʃən/',
            sampleAudioText: 'Excuse me, could you tell me where the nearest train station is?',
            keyPhrases: ['Excuse me...', 'Could you tell me...', 'Is it far?'],
            tips: 'Awali selalu dengan kata "Excuse me" sebelum menanyakan alamat.'
          }
        }
      },
      {
        id: 'spk-4',
        type: 'speaking',
        title: 'Diplomatic Disagreement',
        xpValue: 15,
        data: {
          kind: 'speaking',
          data: {
            prompt: 'Disagree diplomatically with a colleague\'s proposal in a meeting.',
            phonetic: '/aɪ siː jɔːr pɔɪnt bʌt aɪ siː ɪt ˈdɪf.rənt.li/',
            sampleAudioText: 'I see your point, but I see it somewhat differently.',
            keyPhrases: ['I see your point, however...', 'Have we considered...', 'From my view...'],
            tips: 'Akui ide lawan bicara terlebih dahulu sebelum menyampaikan sudut pandang alternatif.'
          }
        }
      },
      // 5 to 10: Dialogue Fill-in-the-blank
      {
        id: 'spk-5',
        type: 'fill-blank',
        title: 'Polite Request Modal',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: '"___ you mind closing the window? It is getting chilly."',
            options: ['Would', 'Do', 'Are', 'Can have'],
            correctAnswer: 'Would',
            explanation: 'Frasa baku yang sangat sopan adalah "Would you mind + V-ing?".'
          }
        }
      },
      {
        id: 'spk-6',
        type: 'fill-blank',
        title: 'Clarification Request',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: '"Could you please ___ that? I did not hear clearly."',
            options: ['repeat', 'repeating', 'repeated', 'repeats'],
            correctAnswer: 'repeat',
            explanation: 'Setelah modal "Could you please...", gunakan kata kerja dasar "repeat".'
          }
        }
      },
      {
        id: 'spk-7',
        type: 'fill-blank',
        title: 'Expressing Gratitude',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: '"Thank you so much for your guidance." — "You are ___ welcome!"',
            options: ['most', 'more', 'many', 'much'],
            correctAnswer: 'most',
            explanation: 'Ungkapan resmi membalas terima kasih: "You are most welcome!"'
          }
        }
      },
      {
        id: 'spk-8',
        type: 'fill-blank',
        title: 'Giving Opinion Marker',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: '"In my honest ___, interactive media makes learning twice as fast."',
            options: ['opinion', 'idea', 'thought', 'think'],
            correctAnswer: 'opinion',
            explanation: 'Frasa pembuka opini baku: "In my honest opinion...".'
          }
        }
      },
      {
        id: 'spk-9',
        type: 'drag-drop',
        title: 'Speaking Builder: Hotel Check-in',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat saat check-in di resepsionis hotel:',
            scrambledWords: ['reservation', 'under', 'a', 'I', 'have', 'name', 'Sultan', 'the'],
            correctSentence: 'I have a reservation under the name Sultan',
            translationHint: 'I have a reservation under the name Sultan'
          }
        }
      },
      {
        id: 'spk-10',
        type: 'drag-drop',
        title: 'Speaking Builder: Polite Phone Call',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat memulai panggilan telepon kantor:',
            scrambledWords: ['May', 'to', 'I', 'speak', 'director,', 'please?', 'the'],
            correctSentence: 'May I speak to the director, please?',
            translationHint: 'May I speak to the director, please?'
          }
        }
      },
      // 11 to 20: Matching & Multiple Choice Spoken English
      {
        id: 'spk-11',
        type: 'matching',
        title: 'Match Conversational Situations',
        xpValue: 15,
        data: {
          kind: 'matching',
          pairs: [
            { id: 'sp1', word: 'Can you hold on a second?', definition: 'Asking someone to wait on phone' },
            { id: 'sp2', word: 'Congratulations on your win!', definition: 'Expressing joy for someone\'s success' },
            { id: 'sp3', word: 'I am terribly sorry for the delay.', definition: 'Apologizing politely for being late' },
            { id: 'sp4', word: 'Could you give me a hand?', definition: 'Asking for physical assistance' }
          ]
        }
      },
      {
        id: 'spk-12',
        type: 'matching',
        title: 'Match Discourse Markers with Meanings',
        xpValue: 15,
        data: {
          kind: 'matching',
          pairs: [
            { id: 'dm1', word: 'By the way', definition: 'Introducing an incidental fresh topic' },
            { id: 'dm2', word: 'On the other hand', definition: 'Introducing a contrasting perspective' },
            { id: 'dm3', word: 'In other words', definition: 'Rephrasing something more simply' },
            { id: 'dm4', word: 'As a matter of fact', definition: 'Emphasizing the true reality' }
          ]
        }
      },
      {
        id: 'spk-13',
        type: 'multiple-choice',
        title: 'Spoken English: Answering "How are things?"',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'When a friend greets you with "How are things?", what is the most natural reply?',
            options: [
              'Things are great, thanks! How about you?',
              'These things belong to my desk.',
              'I am eating a banana.',
              'No, things are not here.'
            ],
            correctIndex: 0,
            explanation: '"How are things?" adalah sapaan santai yang bermakna bagaimana kabarmu (How are you doing?).'
          }
        }
      },
      {
        id: 'spk-14',
        type: 'multiple-choice',
        title: 'Spoken English: Offering Help',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'Which of the following is the most natural phrase to offer assistance to a guest?',
            options: [
              'How may I help you today?',
              'Why are you here today?',
              'What do you want from me?',
              'Stop standing there.'
            ],
            correctIndex: 0,
            explanation: '"How may I help you today?" adalah ungkapan layanan profesional standar.'
          }
        }
      },
      {
        id: 'spk-15',
        type: 'multiple-choice',
        title: 'Spoken English: Ending Conversation',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'What is a polite way to end a conversation when you need to leave?',
            options: [
              'It was wonderful catching up, but I must head out now.',
              'I am bored, so go away.',
              'Shut your mouth now.',
              'Conversation terminated.'
            ],
            correctIndex: 0,
            explanation: '"It was wonderful catching up, but I must head out now" adalah penutup percakapan yang santun dan hangat.'
          }
        }
      },
      {
        id: 'spk-16',
        type: 'fill-blank',
        title: 'Spoken Expression: Never mind',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: '"Do you still need that pencil?" — "No, I found mine, so never ___!"',
            options: ['mind', 'think', 'worry', 'care'],
            correctAnswer: 'mind',
            explanation: '"Never mind" bermakna tidak apa-apa / lupakan saja (tidak perlu repot).'
          }
        }
      },
      {
        id: 'spk-17',
        type: 'fill-blank',
        title: 'Spoken Expression: Take your time',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'There is no rush at all; please take your ___ to inspect the design.',
            options: ['time', 'clock', 'hour', 'minute'],
            correctAnswer: 'time',
            explanation: '"Take your time" bermakna silakan gunakan waktu santai tanpa terburu-buru.'
          }
        }
      },
      {
        id: 'spk-18',
        type: 'drag-drop',
        title: 'Builder: Giving Advice Politely',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat memberi saran dengan santun:',
            scrambledWords: ['take', 'You', 'might', 'to', 'a', 'want', 'break'],
            correctSentence: 'You might want to take a break',
            translationHint: 'You might want to take a break'
          }
        }
      },
      {
        id: 'spk-19',
        type: 'drag-drop',
        title: 'Builder: Asking for Recommendation',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat menanyakan rekomendasi kuliner:',
            scrambledWords: ['would', 'What', 'recommend', 'you', 'for', 'dinner?'],
            correctSentence: 'What would you recommend for dinner?',
            translationHint: 'What would you recommend for dinner?'
          }
        }
      },
      {
        id: 'spk-20',
        type: 'multiple-choice',
        title: 'Final Speaking Mastery Challenge',
        xpValue: 20,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'In an IELTS Speaking interview, what should you do if you do not understand a word in the examiner\'s question?',
            options: [
              'Ask politely: "Could you please rephrase the question for me?"',
              'Stay silent for two minutes',
              'Pretend to understand and talk about a completely unrelated topic',
              'Stand up and walk out of the room'
            ],
            correctIndex: 0,
            explanation: 'Penguji IELTS mengizinkan siswa meminta parafrasa pertanyaan ("Could you rephrase that?"), dan ini dinilai sebagai keterampilan komunikasi alami (repair strategy).'
          }
        }
      }
    ]
  }
,
  // 6. PASSIVE VOICE IN ACTION (20 ACTIVITIES)
  {
    id: 'lesson-passive-voice',
    title: 'Passive Voice in Action',
    subtitle: 'Active to passive transformation across 8 tenses, formal reports, and academic prose (20 Latihan Soal)',
    level: 'Intermediate',
    category: 'Grammar',
    estimatedMinutes: 20,
    xpTotal: 320,
    progressPercent: 0,
    completed: false,
    unlocked: true,
    theoryGuide: {
      summary: 'Passive Voice (Kalimat Pasif) digunakan saat fokus pembicaraan adalah pada OBJEK yang menerima tindakan atau saat pelaku tindakan tidak diketahui, tidak penting, atau sudah jelas dari konteks.',
      rules: [
        {
          title: 'Rumus Inti Passive Voice',
          explanation: 'Semua kalimat pasif dalam bahasa Inggris wajib mengandung bentuk [to be] yang disesuaikan dengan tense, diikuti oleh [Past Participle / Verb 3].',
          formula: 'Subject (Objek asal) + BE (am/is/are/was/were/been/being) + Verb 3 + (by Agent)',
          example: 'Active: Alexander Graham Bell invented the telephone. -> Passive: The telephone was invented by Alexander Graham Bell.'
        },
        {
          title: 'Tabel Perubahan Tense ke Pasif',
          explanation: 'Present Simple: is/are + V3 | Past Simple: was/were + V3 | Present Continuous: is/are being + V3 | Present Perfect: has/have been + V3 | Modals: modal + be + V3.',
          formula: 'Modal Passive: Modal (must/can/should) + BE + Verb 3',
          example: 'Active: Students must wear helmets. -> Passive: Helmets must be worn by students.'
        }
      ],
      keyFormulas: [
        'Present Simple: is / am / are + Verb 3',
        'Past Simple: was / were + Verb 3',
        'Continuous: is / are / was / were + being + Verb 3',
        'Perfect: has / have / had + been + Verb 3',
        'Modals: can / must / should / will + be + Verb 3'
      ],
      teacherTip: 'Gunakan kalimat pasif pada laporan laboratorium, berita koran, dan esai akademik formal untuk menjaga objektivitas ilmiah!'
    },
    activities: [
      {
        id: 'pas-1',
        type: 'flashcard',
        title: 'Core Passive Formula',
        xpValue: 15,
        data: {
          kind: 'flashcard',
          data: {
            word: 'PASSIVE VOICE',
            phonetic: '/ˈpæs.ɪv vɔɪs/',
            accentNote: 'pas-iv voys',
            partOfSpeech: 'grammatical voice',
            meaning: 'A grammatical construction where the grammatical subject is the recipient of the action rather than the performer.',
            example: 'The historical monument was erected in 1888.',
            translationHint: 'Rumus: Subject + [BE] + Verb 3 (Past Participle)',
            audioPrompt: 'The historical monument was erected in 1888.'
          }
        }
      },
      {
        id: 'pas-2',
        type: 'multiple-choice',
        title: 'Simple Present Passive: Daily Newsletter',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'Complete the sentence in the passive voice: "The company\'s daily newsletter ___ to ten thousand subscribers every morning."',
            options: ['is sent', 'was sent', 'is sending', 'sent'],
            correctIndex: 0,
            explanation: 'Subjek tunggal (newsletter) + kebiasaan rutin (every morning) membutuhkan Simple Present Passive: is + Verb 3 (sent).'
          }
        }
      },
      {
        id: 'pas-3',
        type: 'fill-blank',
        title: 'Simple Present: Global Language',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'English ___ by over 1.5 billion people worldwide as a global lingua franca.',
            options: ['is spoken', 'speaks', 'is speaking', 'was spoken'],
            correctAnswer: 'is spoken',
            explanation: 'Fakta umum sekarang (Present Simple) untuk subjek tunggal (English) menggunakan "is spoken" (is + V3).'
          }
        }
      },
      {
        id: 'pas-4',
        type: 'drag-drop',
        title: 'Drag & Drop: Historic Bridge',
        xpValue: 20,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat pasif lampau yang tepat:',
            scrambledWords: ['bridge', 'The', 'was', 'grand', 'designed', 'engineers', 'by', 'famous'],
            correctSentence: 'The grand bridge was designed by famous engineers',
            translationHint: 'The grand bridge + was designed + by famous engineers'
          }
        }
      },
      {
        id: 'pas-5',
        type: 'multiple-choice',
        title: 'Simple Past Passive: Historic Invention',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'Complete with the correct past passive form: "The telephone ___ by Alexander Graham Bell in 1876."',
            options: ['was invented', 'is invented', 'invented', 'has been invented'],
            correctIndex: 0,
            explanation: 'Tahun 1876 menunjukkan waktu lampau spesifik (Simple Past). Bentuk pasifnya adalah was + invented.'
          }
        }
      },
      {
        id: 'pas-6',
        type: 'fill-blank',
        title: 'Simple Past: Concert Tickets',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'All twenty thousand concert tickets ___ within just fifteen minutes yesterday.',
            options: ['were sold', 'was sold', 'are sold', 'had sold'],
            correctAnswer: 'were sold',
            explanation: 'Subjek jamak (tickets) + waktu lampau (yesterday) membutuhkan "were sold" (were + Verb 3).'
          }
        }
      },
      {
        id: 'pas-7',
        type: 'drag-drop',
        title: 'Drag & Drop: Birthday Cake',
        xpValue: 20,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat pasif lampau:',
            scrambledWords: ['delicious', 'The', 'baked', 'cake', 'was', 'Sarah', 'by'],
            correctSentence: 'The delicious cake was baked by Sarah',
            translationHint: 'The delicious cake + was baked + by Sarah'
          }
        }
      },
      {
        id: 'pas-8',
        type: 'multiple-choice',
        title: 'Present Continuous Passive: Ongoing Roadwork',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: '"Traffic is diverted because the main avenue ___ right now."',
            options: ['is being repaired', 'is repaired', 'was repaired', 'repairs'],
            correctIndex: 0,
            explanation: 'Tindakan yang sedang berlangsung sekarang (right now) dalam bentuk pasif membutuhkan: is/are + BEING + Verb 3.'
          }
        }
      },
      {
        id: 'pas-9',
        type: 'fill-blank',
        title: 'Present Continuous: Building Construction',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'A state-of-the-art computer science laboratory ___ on campus currently.',
            options: ['is being built', 'is built', 'was being built', 'builds'],
            correctAnswer: 'is being built',
            explanation: 'Kata kunci "currently" menunjukkan Present Continuous Passive: is being built.'
          }
        }
      },
      {
        id: 'pas-10',
        type: 'matching',
        title: 'Active to Passive Sentence Matcher',
        xpValue: 20,
        data: {
          kind: 'matching',
          pairs: [
            { id: 'pvm1', word: 'Shakespeare wrote Hamlet', definition: 'Hamlet was written by Shakespeare' },
            { id: 'pvm2', word: 'They clean the rooms daily', definition: 'The rooms are cleaned daily' },
            { id: 'pvm3', word: 'Engineers built the stadium', definition: 'The stadium was built by engineers' },
            { id: 'pvm4', word: 'She will sign the agreement', definition: 'The agreement will be signed by her' }
          ]
        }
      },
      {
        id: 'pas-11',
        type: 'multiple-choice',
        title: 'Present Perfect Passive: Completed Milestone',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: '"We can launch the educational platform because all initial modules ___."',
            options: ['have been completed', 'are completed', 'has been completed', 'were completed'],
            correctIndex: 0,
            explanation: 'Subjek jamak (modules) dengan hasil yang relevan di masa sekarang membutuhkan Present Perfect Passive: have been + V3.'
          }
        }
      },
      {
        id: 'pas-12',
        type: 'fill-blank',
        title: 'Present Perfect: Official Email Notice',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'All formal admission letters ___ to the selected scholarship candidates already.',
            options: ['have been dispatched', 'has been dispatched', 'were dispatching', 'dispatch'],
            correctAnswer: 'have been dispatched',
            explanation: 'Subjek jamak (letters) + "already" (Present Perfect Passive) = have been dispatched.'
          }
        }
      },
      {
        id: 'pas-13',
        type: 'drag-drop',
        title: 'Drag & Drop: Future Broadcast',
        xpValue: 20,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat pasif bentuk masa depan (Future Passive):',
            scrambledWords: ['broadcast', 'announcement', 'The', 'will', 'tomorrow', 'be', 'important'],
            correctSentence: 'The important announcement will be broadcast tomorrow',
            translationHint: 'The important announcement + will be broadcast + tomorrow'
          }
        }
      },
      {
        id: 'pas-14',
        type: 'multiple-choice',
        title: 'Future Simple Passive: Winner Declaration',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: '"The winners of the annual science fair ___ by the judges on Friday afternoon."',
            options: ['will be announced', 'will announce', 'are announcing', 'were announced'],
            correctIndex: 0,
            explanation: 'Future Simple Passive menggunakan formula: will + be + Verb 3 (announced).'
          }
        }
      },
      {
        id: 'pas-15',
        type: 'fill-blank',
        title: 'Modal Passive: Safety Regulations',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'Protective safety helmets and goggles ___ at all times in this laboratory.',
            options: ['must be worn', 'must wear', 'must been worn', 'are must wear'],
            correctAnswer: 'must be worn',
            explanation: 'Modal Passive dibentuk dari: Modal (must) + BE + Verb 3 (worn).'
          }
        }
      },
      {
        id: 'pas-16',
        type: 'drag-drop',
        title: 'Drag & Drop: Classroom Code of Conduct',
        xpValue: 20,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat pasif dengan modal verb "must":',
            scrambledWords: ['followed', 'must', 'Rules', 'be', 'every', 'by', 'student'],
            correctSentence: 'Rules must be followed by every student',
            translationHint: 'Rules + must be followed + by every student'
          }
        }
      },
      {
        id: 'pas-17',
        type: 'multiple-choice',
        title: 'Agent Omission: Why Leave Out "By Them"?',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'In the sentence: "The suspect was arrested shortly after midnight," why is "by the police" omitted?',
            options: [
              'Because the agent is obvious, as only police officers can arrest suspects',
              'Because the sentence is grammatically incorrect',
              'Because the police did not arrest anyone',
              'Because passive sentences can never mention the agent'
            ],
            correctIndex: 0,
            explanation: 'Dalam bahasa Inggris, frase "by [agent]" sering dihilangkan saat pelakunya sudah jelas diketahui dari konteks umum (obvious agent).'
          }
        }
      },
      {
        id: 'pas-18',
        type: 'fill-blank',
        title: 'Modal Passive: Eco Recycling',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'Discarded plastic bottles ___ into sturdy eco-friendly fabric.',
            options: ['can be transformed', 'can transform', 'can been transformed', 'are can transform'],
            correctAnswer: 'can be transformed',
            explanation: 'Modal passive "can" menggunakan rumus: can + be + Verb 3 (transformed).'
          }
        }
      },
      {
        id: 'pas-19',
        type: 'matching',
        title: 'Match Tense to Passive Auxiliary Formula',
        xpValue: 20,
        data: {
          kind: 'matching',
          pairs: [
            { id: 'pvf1', word: 'Present Simple Passive', definition: 'am / is / are + Verb 3' },
            { id: 'pvf2', word: 'Past Simple Passive', definition: 'was / were + Verb 3' },
            { id: 'pvf3', word: 'Continuous Passive', definition: 'be + being + Verb 3' },
            { id: 'pvf4', word: 'Perfect Passive', definition: 'have / has been + Verb 3' }
          ]
        }
      },
      {
        id: 'pas-20',
        type: 'multiple-choice',
        title: 'Mastery Challenge: Complex Passive Transformation',
        xpValue: 20,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'What is the correct passive voice for: "The university committee will present the prestigious scholarship to the top student"?',
            options: [
              'The prestigious scholarship will be presented to the top student by the university committee.',
              'The prestigious scholarship will present to the top student.',
              'The top student was presented by the scholarship committee.',
              'The prestigious scholarship is being presented right now.'
            ],
            correctIndex: 0,
            explanation: 'Objek (The prestigious scholarship) menjadi subjek baru + "will be presented" (will + be + V3) + penerima + "by the university committee".'
          }
        }
      }
    ]
  }

];
