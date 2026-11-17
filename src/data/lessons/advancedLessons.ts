import { Lesson } from '../../types';

export const ADVANCED_LESSONS: Lesson[] = [
  // 1. ACADEMIC INVERSION & EMPHATIC STRUCTURES (20 ACTIVITIES)
  {
    id: 'lesson-inversion-academic',
    title: 'Academic Inversion & Emphatic Prose',
    subtitle: 'Negative inversion, fronting, and high-register rhetoric for C1/C2 & IELTS Band 8.0+ (20 Latihan Soal)',
    level: 'Advanced',
    category: 'Grammar',
    estimatedMinutes: 20,
    xpTotal: 320,
    progressPercent: 25,
    completed: false,
    unlocked: true,
    theoryGuide: {
      summary: 'Inversion adalah pembalikan susunan subjek dan kata kerja bantu (auxiliary verb) yang diawali oleh kata keterangan negatif atau restriktif untuk memberikan penekanan gaya bahasa tinggi (stylistic emphasis).',
      rules: [
        {
          title: 'Rumus Inversion Negatif',
          explanation: 'Ketika kalimat diawali adverb negatif (Rarely, Seldom, Never, Hardly, Under no circumstances, Little), gunakan susunan seperti kalimat tanya.',
          formula: 'Negative Adverb + Auxiliary Verb (did/have/should) + Subject + Main Verb',
          example: 'Rarely have I seen such dedication. Seldom do we witness this phenomenon.'
        },
        {
          title: 'Not only... but also Inversion',
          explanation: 'Klausa pertama yang diawali "Not only" wajib mengalami pembalikan (inversion), sedangkan klausa "but also" tetap bersusunan normal.',
          formula: 'Not only + Auxiliary + S + Verb, but S also + Verb',
          example: 'Not only did she win the tournament, but she also set a world record.'
        }
      ],
      keyFormulas: [
        'Rarely / Seldom + have/do/did + Subject + Verb',
        'Under no circumstances + should/must + Subject + Verb',
        'Hardly + had + Subject + Verb 3 + when + Past Simple'
      ],
      teacherTip: 'Gunakan 1 kalimat Inversion dalam esai IELTS Writing Task 2 untuk langsung membuktikan penguasaan grammar tingkat tinggi (Band 8+) kepada penguji!'
    },
    activities: [
      {
        id: 'inv-1',
        type: 'fill-blank',
        title: 'Negative Inversion: Rarely have I',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'Rarely ___ I encountered such an extraordinary interactive learning app.',
            options: ['have', 'I have', 'am', 'was'],
            correctAnswer: 'have',
            explanation: 'Setelah adverb negatif "Rarely", kata kerja bantu "have" wajib diletakkan sebelum subjek "I".'
          }
        }
      },
      {
        id: 'inv-2',
        type: 'fill-blank',
        title: 'Negative Inversion: Seldom do',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'Seldom ___ scientists observe such rapid climate fluctuations in the Arctic.',
            options: ['do', 'are', 'have', 'were'],
            correctAnswer: 'do',
            explanation: 'Untuk kalimat bentuk Present Simple setelah "Seldom", auxiliary "do" mendahului subjek jamak "scientists".'
          }
        }
      },
      {
        id: 'inv-3',
        type: 'fill-blank',
        title: 'Negative Inversion: Under no circumstances',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'Under no circumstances ___ candidates open the test booklet before the signal.',
            options: ['should', 'they should', 'are', 'have'],
            correctAnswer: 'should',
            explanation: 'Frasa restriktif "Under no circumstances" mewajibkan modal "should" sebelum subjek "candidates".'
          }
        }
      },
      {
        id: 'inv-4',
        type: 'fill-blank',
        title: 'Negative Inversion: Not only did',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'Not only ___ she pass the certification, but she also achieved the highest band score.',
            options: ['did', 'she did', 'was', 'has'],
            correctAnswer: 'did',
            explanation: 'Inversion lampau setelah "Not only" menggunakan auxiliary "did" sebelum subjek "she".'
          }
        }
      },
      {
        id: 'inv-5',
        type: 'fill-blank',
        title: 'Negative Inversion: Little did they know',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'Little ___ they know that this project would transform English education.',
            options: ['did', 'do', 'had', 'were'],
            correctAnswer: 'did',
            explanation: 'Idiom naratif "Little did they know" (Sama sekali mereka tidak menduga sebelumnya).'
          }
        }
      },
      // 6 to 10: Drag & Drop Inversion
      {
        id: 'inv-6',
        type: 'drag-drop',
        title: 'Inversion: Rarely have I seen',
        xpValue: 20,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat inversion negatif yang tepat:',
            scrambledWords: ['Rarely', 'I', 'seen', 'have', 'such', 'dedication', 'academic'],
            correctSentence: 'Rarely have I seen such academic dedication',
            translationHint: 'Rarely + have + I + seen'
          }
        }
      },
      {
        id: 'inv-7',
        type: 'drag-drop',
        title: 'Inversion: Hardly had we arrived',
        xpValue: 20,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat "Hardly... when":',
            scrambledWords: ['Hardly', 'we', 'arrived', 'had', 'the', 'started', 'when', 'presentation'],
            correctSentence: 'Hardly had we arrived when the presentation started',
            translationHint: 'Hardly had we arrived when...'
          }
        }
      },
      {
        id: 'inv-8',
        type: 'drag-drop',
        title: 'Inversion: Under no circumstances',
        xpValue: 20,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat larangan formal:',
            scrambledWords: ['Under', 'no', 'should', 'circumstances', 'you', 'give', 'up'],
            correctSentence: 'Under no circumstances should you give up',
            translationHint: 'Under no circumstances should you give up'
          }
        }
      },
      {
        id: 'inv-9',
        type: 'drag-drop',
        title: 'Inversion: Only after finishing',
        xpValue: 20,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat penekanan "Only after":',
            scrambledWords: ['Only', 'after', 'did', 'studying,', 'we', 'understand', 'the', 'theory'],
            correctSentence: 'Only after studying, did we understand the theory',
            translationHint: 'Only after studying did we understand'
          }
        }
      },
      {
        id: 'inv-10',
        type: 'drag-drop',
        title: 'Inversion: Nowhere will you find',
        xpValue: 20,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat inversion tempat "Nowhere":',
            scrambledWords: ['Nowhere', 'will', 'you', 'better', 'materials', 'find', 'learning'],
            correctSentence: 'Nowhere will you find better learning materials',
            translationHint: 'Nowhere will you find...'
          }
        }
      },
      // 11 to 15: Multiple Choice Inversion
      {
        id: 'inv-11',
        type: 'multiple-choice',
        title: 'Multiple Choice: Grammatical Inversion',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'Which of the following sentences exhibits correct negative inversion?',
            options: [
              'Seldom have I witnessed such profound cognitive development.',
              'Seldom I have witnessed such profound cognitive development.',
              'Seldom I witnessed such profound cognitive development.',
              'Seldom have witnessed I such profound cognitive development.'
            ],
            correctIndex: 0,
            explanation: 'Urutan baku inversion adalah: Negative Adverb + Auxiliary (have) + Subject (I) + Main Verb (witnessed).'
          }
        }
      },
      {
        id: 'inv-12',
        type: 'multiple-choice',
        title: 'Multiple Choice: No sooner... than',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'No sooner ___ the lecture begun than the fire alarm sounded.',
            options: ['had', 'did', 'was', 'has'],
            correctIndex: 0,
            explanation: 'Pola baku korelasi "No sooner had + S + V3 than..."'
          }
        }
      },
      {
        id: 'inv-13',
        type: 'multiple-choice',
        title: 'Multiple Choice: Cleft Sentence',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: '"It was Sultan ___ designed the visual 3D vocabulary engine." What word completes the cleft focus?',
            options: ['who', 'which', 'whom', 'where'],
            correctIndex: 0,
            explanation: 'Dalam cleft sentence yang memfokuskan orang (Sultan), gunakan pronoun "who".'
          }
        }
      },
      {
        id: 'inv-14',
        type: 'multiple-choice',
        title: 'Multiple Choice: Fronting Prepositional Phrase',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: '"On the hill ___ an ancient stone observatory." (Full inversion of place)',
            options: ['stood', 'did stand', 'was standing it', 'standing'],
            correctIndex: 0,
            explanation: 'Dalam full inversion tempat (locative inversion), kata kerja intransitif "stood" langsung mendahului subjek tanpa auxiliary.'
          }
        }
      },
      {
        id: 'inv-15',
        type: 'multiple-choice',
        title: 'Multiple Choice: Subjunctive Mood',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'The academic committee recommended that each student ___ a project report.',
            options: ['submit', 'submits', 'submitted', 'is submitting'],
            correctIndex: 0,
            explanation: 'Subjunctive mood setelah kata kerja "recommend that..." selalu menggunakan kata kerja dasar tanpa akhiran -s (bare infinitive: submit).'
          }
        }
      },
      // 16 to 20: Matching & Complex Structures
      {
        id: 'inv-16',
        type: 'matching',
        title: 'Match Inversion Triggers with Functions',
        xpValue: 15,
        data: {
          kind: 'matching',
          pairs: [
            { id: 'iv1', word: 'Rarely / Seldom', definition: 'Menyatakan kejadian yang luar biasa langka' },
            { id: 'iv2', word: 'Under no circumstances', definition: 'Larangan mutlak tanpa pengecualian' },
            { id: 'iv3', word: 'Hardly ... when', definition: 'Dua kejadian terjadi berurutan hampir bersamaan' },
            { id: 'iv4', word: 'Not only ... but also', definition: 'Menambahkan poin argumen kedua yang lebih kuat' }
          ]
        }
      },
      {
        id: 'inv-17',
        type: 'fill-blank',
        title: 'Inversion: Only by working together',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'Only by working together ___ we overcome these environmental crises.',
            options: ['can', 'we can', 'are', 'have'],
            correctAnswer: 'can',
            explanation: 'Frasa "Only by..." di awal kalimat mewajibkan inversion modal "can" mendahului subjek "we".'
          }
        }
      },
      {
        id: 'inv-18',
        type: 'fill-blank',
        title: 'Subjunctive Demand: Insist that',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'The professor insists that the student ___ on time for the mock interview.',
            options: ['be', 'is', 'was', 'are'],
            correctAnswer: 'be',
            explanation: 'Subjunctive mood setelah "insist that" menggunakan bentuk dasar "be".'
          }
        }
      },
      {
        id: 'inv-19',
        type: 'fill-blank',
        title: 'Inversion: Should you require',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: '___ you require further academic assistance, please do not hesitate to ask.',
            options: ['Should', 'If should', 'Had', 'Were'],
            correctAnswer: 'Should',
            explanation: 'Inversion Conditional Type 1 formal: "Should you require..." menggantikan "If you require...".'
          }
        }
      },
      {
        id: 'inv-20',
        type: 'multiple-choice',
        title: 'Final Inversion Challenge',
        xpValue: 20,
        data: {
          kind: 'multiple-choice',
          data: {
            question: '"Not until the results were published did he realize his outstanding success." Why is inversion placed on the second clause?',
            options: [
              'Because the time clause (Not until...) modifies the whole sentence, and the main clause receives the negative inversion.',
              'Because the author made an error.',
              'Because the first clause is in present tense.',
              'Because of the word published.'
            ],
            correctIndex: 0,
            explanation: 'Pada struktur "Not until...", inversion selalu diletakkan pada klausa utama (main clause: "did he realize").'
          }
        }
      }
    ]
  },

  // 2. LISTENING ESSENTIALS & AUDIO LAB (20 ACTIVITIES)
  {
    id: 'lesson-listening-essentials',
    title: 'Listening Essentials & Sound Waveforms',
    subtitle: 'Comprehend native numbers, clock times, flight announcements, and connected speech (20 Latihan Soal)',
    level: 'Beginner',
    category: 'Listening',
    estimatedMinutes: 20,
    xpTotal: 300,
    progressPercent: 35,
    completed: false,
    unlocked: true,
    theoryGuide: {
      summary: 'Mendengarkan penutur asli bahasa Inggris membutuhkan kepekaan terhadap connected speech, elisions, dan reduksi kata seperti "wanna" (want to), "gonna" (going to).',
      rules: [
        {
          title: 'Consonant to Vowel Linking',
          explanation: 'Ketika sebuah kata berakhiran konsonan dan kata berikutnya berawalan vokal, bunyinya tersambung mulus seakan satu kata.',
          example: '"Turn on" dilafalkan /tɜː.nɒn/ (Tur-non).'
        }
      ],
      keyFormulas: [
        'Wanna = Want to | Gonna = Going to | Gotta = Got to',
        'Could have ➔ Could\'ve /kʊdəv/'
      ],
      teacherTip: 'Dengarkan audio penutur asli melalui gelombang waveform sebelum memilih jawaban!'
    },
    activities: [
      {
        id: 'lis-1',
        type: 'listening',
        title: 'Flight Boarding Announcement',
        xpValue: 15,
        data: {
          kind: 'listening',
          data: {
            audioText: 'Attention passengers on flight BA 249 to London Heathrow. Immediate boarding is now taking place at Gate B14.',
            instruction: 'Dengarkan pengumuman bandara dan pilih nomor gerbang yang disebutkan:',
            question: 'Which gate is flight BA 249 boarding at?',
            options: ['Gate B14', 'Gate D40', 'Gate A12', 'Gate C24'],
            correctIndex: 0,
            transcript: 'Immediate boarding is now taking place at Gate B14.',
            explanation: 'Audio menyebutkan "Gate B14" secara jelas.'
          }
        }
      },
      {
        id: 'lis-2',
        type: 'listening',
        title: 'Doctor Appointment Time',
        xpValue: 15,
        data: {
          kind: 'listening',
          data: {
            audioText: 'Your medical checkup is confirmed for quarter past ten on Wednesday morning.',
            instruction: 'Dengarkan waktu janji temu dan pilih jam yang tepat:',
            question: 'What time is the appointment scheduled for?',
            options: ['10:15 AM', '9:45 AM', '10:30 AM', '11:15 AM'],
            correctIndex: 0,
            transcript: 'quarter past ten on Wednesday morning.',
            explanation: '"Quarter past ten" bermakna lewat seperempat dari jam sepuluh (10:15 AM).'
          }
        }
      },
      {
        id: 'lis-3',
        type: 'listening',
        title: 'Price of Coffee and Pastry',
        xpValue: 15,
        data: {
          kind: 'listening',
          data: {
            audioText: 'That will be four pounds fifty for the cappuccino and two pounds twenty for the croissant.',
            instruction: 'Dengarkan total harga dan hitung berapa yang harus dibayar:',
            question: 'How much is the cappuccino alone?',
            options: ['Four pounds fifty (£4.50)', 'Six pounds seventy (£6.70)', 'Two pounds twenty (£2.20)', 'Five pounds (£5.00)'],
            correctIndex: 0,
            transcript: 'four pounds fifty for the cappuccino',
            explanation: 'Audio menyebutkan secara langsung: "four pounds fifty for the cappuccino".'
          }
        }
      },
      {
        id: 'lis-4',
        type: 'listening',
        title: 'Street Direction',
        xpValue: 15,
        data: {
          kind: 'listening',
          data: {
            audioText: 'Walk straight down this boulevard for two blocks, then take the first right opposite the national library.',
            instruction: 'Dengarkan petunjuk arah jalan:',
            question: 'Where should the pedestrian turn right?',
            options: [
              'Opposite the national library',
              'Next to the petrol station',
              'Behind the supermarket',
              'At the roundabout'
            ],
            correctIndex: 0,
            transcript: 'take the first right opposite the national library.',
            explanation: 'Petunjuk arah mengatakan: "take the first right opposite the national library".'
          }
        }
      },
      {
        id: 'lis-5',
        type: 'listening',
        title: 'Weather Forecast',
        xpValue: 15,
        data: {
          kind: 'listening',
          data: {
            audioText: 'Tomorrow will start crisp and sunny, followed by light afternoon showers and a maximum temperature of twenty-two degrees.',
            instruction: 'Dengarkan ramalan cuaca:',
            question: 'What weather is expected in the afternoon?',
            options: ['Light showers', 'Heavy snowfall', 'Violent thunderstorms', 'Dense fog'],
            correctIndex: 0,
            transcript: 'followed by light afternoon showers',
            explanation: 'Penyiar cuaca menyebutkan "light afternoon showers" (hujan rintik di sore hari).'
          }
        }
      },
      // 6 to 10: Listen and Arrange
      {
        id: 'lis-6',
        type: 'listen-arrange',
        title: 'Arrange: She arrived early for interview',
        xpValue: 15,
        data: {
          kind: 'listen-arrange',
          data: {
            audioText: 'She arrived early for the morning interview.',
            instruction: 'Dengarkan dan susun kata yang diucapkan secara berurutan:',
            words: ['the', 'for', 'early', 'She', 'interview', 'morning', 'arrived'],
            correctSequence: ['She', 'arrived', 'early', 'for', 'the', 'morning', 'interview']
          }
        }
      },
      {
        id: 'lis-7',
        type: 'listen-arrange',
        title: 'Arrange: We need to book our tickets',
        xpValue: 15,
        data: {
          kind: 'listen-arrange',
          data: {
            audioText: 'We need to book our flight tickets today.',
            instruction: 'Dengarkan dan susun urutan kata:',
            words: ['today', 'book', 'need', 'We', 'our', 'flight', 'to', 'tickets'],
            correctSequence: ['We', 'need', 'to', 'book', 'our', 'flight', 'tickets', 'today']
          }
        }
      },
      {
        id: 'lis-8',
        type: 'listen-arrange',
        title: 'Arrange: Please turn off your mobile phone',
        xpValue: 15,
        data: {
          kind: 'listen-arrange',
          data: {
            audioText: 'Please turn off your mobile phones inside the room.',
            instruction: 'Dengarkan dan susun kalimat pengumuman:',
            words: ['mobile', 'off', 'inside', 'Please', 'turn', 'your', 'phones', 'the', 'room'],
            correctSequence: ['Please', 'turn', 'off', 'your', 'mobile', 'phones', 'inside', 'the', 'room']
          }
        }
      },
      {
        id: 'lis-9',
        type: 'listen-arrange',
        title: 'Arrange: Sultan scored high on the exam',
        xpValue: 15,
        data: {
          kind: 'listen-arrange',
          data: {
            audioText: 'Sultan scored the highest mark on the English exam.',
            instruction: 'Dengarkan dan susun kata-katanya:',
            words: ['highest', 'mark', 'on', 'Sultan', 'scored', 'the', 'English', 'exam'],
            correctSequence: ['Sultan', 'scored', 'the', 'highest', 'mark', 'on', 'the', 'English', 'exam']
          }
        }
      },
      {
        id: 'lis-10',
        type: 'listen-arrange',
        title: 'Arrange: Practice makes perfect every day',
        xpValue: 15,
        data: {
          kind: 'listen-arrange',
          data: {
            audioText: 'Practice makes perfect when you study consistently.',
            instruction: 'Dengarkan dan susun kalimat pepatah motivasi:',
            words: ['consistently', 'study', 'when', 'Practice', 'makes', 'you', 'perfect'],
            correctSequence: ['Practice', 'makes', 'perfect', 'when', 'you', 'study', 'consistently']
          }
        }
      },
      // 11 to 20: More Listening & Multiple Choice
      {
        id: 'lis-11',
        type: 'listening',
        title: 'Train Departure Time',
        xpValue: 15,
        data: {
          kind: 'listening',
          data: {
            audioText: 'The express train to Manchester will depart from platform four at seventeen thirty.',
            instruction: 'Dengarkan pengumuman stasiun kereta:',
            question: 'What time does the train depart?',
            options: ['17:30 (5:30 PM)', '16:30 (4:30 PM)', '18:15 (6:15 PM)', '15:40 (3:40 PM)'],
            correctIndex: 0,
            transcript: 'at seventeen thirty.',
            explanation: '"Seventeen thirty" adalah format waktu 24-jam untuk 17:30 (5:30 PM).'
          }
        }
      },
      {
        id: 'lis-12',
        type: 'listening',
        title: 'Conference Topic',
        xpValue: 15,
        data: {
          kind: 'listening',
          data: {
            audioText: 'The keynote speaker will discuss renewable solar energy solutions for modern urban cities.',
            instruction: 'Dengarkan topik seminar:',
            question: 'What is the main topic of the keynote presentation?',
            options: ['Renewable solar energy solutions', 'Coal mining techniques', 'Deep sea fishing', 'Rocket manufacturing'],
            correctIndex: 0,
            transcript: 'renewable solar energy solutions for modern urban cities.',
            explanation: 'Audio menyebutkan "renewable solar energy solutions".'
          }
        }
      },
      {
        id: 'lis-13',
        type: 'listening',
        title: 'Hotel Breakfast Room',
        xpValue: 15,
        data: {
          kind: 'listening',
          data: {
            audioText: 'Complimentary buffet breakfast is served on the second floor between seven and ten in the morning.',
            instruction: 'Dengarkan info hotel:',
            question: 'Where is the buffet breakfast served?',
            options: ['On the second floor', 'In the hotel lobby', 'By the swimming pool', 'In room service only'],
            correctIndex: 0,
            transcript: 'served on the second floor',
            explanation: 'Audio menyatakan sarapan disajikan "on the second floor".'
          }
        }
      },
      {
        id: 'lis-14',
        type: 'listening',
        title: 'Library Borrowing Policy',
        xpValue: 15,
        data: {
          kind: 'listening',
          data: {
            audioText: 'Students are permitted to borrow up to five reference books for a period of fourteen days.',
            instruction: 'Dengarkan peraturan perpustakaan:',
            question: 'How long can students keep the borrowed books?',
            options: ['Fourteen days (two weeks)', 'Seven days', 'Thirty days', 'Three days'],
            correctIndex: 0,
            transcript: 'for a period of fourteen days.',
            explanation: '"Fourteen days" bermakna 14 hari (2 minggu).'
          }
        }
      },
      {
        id: 'lis-15',
        type: 'listening',
        title: 'Meeting Postponement',
        xpValue: 15,
        data: {
          kind: 'listening',
          data: {
            audioText: 'Please note that the weekly project briefing has been postponed until Thursday afternoon.',
            instruction: 'Dengarkan pengumuman jadwal kerja:',
            question: 'When will the project briefing take place?',
            options: ['Thursday afternoon', 'Tuesday morning', 'Friday evening', 'Monday noon'],
            correctIndex: 0,
            transcript: 'postponed until Thursday afternoon.',
            explanation: 'Rapat ditunda hingga "Thursday afternoon".'
          }
        }
      },
      {
        id: 'lis-16',
        type: 'fill-blank',
        title: 'Audio Contraction: Wanna',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'In casual conversation, native speakers pronounce "want to" as "___".',
            options: ['wanna', 'gonna', 'gotta', 'hafta'],
            correctAnswer: 'wanna',
            explanation: '"Want to" disingkat dan dilafalkan menjadi "wanna".'
          }
        }
      },
      {
        id: 'lis-17',
        type: 'fill-blank',
        title: 'Audio Contraction: Gonna',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'The phrase "going to" is frequently contracted in speech to "___".',
            options: ['gonna', 'wanna', 'kinda', 'sorta'],
            correctAnswer: 'gonna',
            explanation: '"Going to" disingkat dan dilafalkan menjadi "gonna".'
          }
        }
      },
      {
        id: 'lis-18',
        type: 'fill-blank',
        title: 'Audio Linking: Pick it up',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'The phrase "pick it up" links consonants to vowels, sounding like "pi-ki-___".',
            options: ['tup', 'top', 'tap', 'tip'],
            correctAnswer: 'tup',
            explanation: 'Bunyi konsonan t pada "it" menyambung ke vokal u pada "up", menghasilkan bunyi "pi-ki-tup".'
          }
        }
      },
      {
        id: 'lis-19',
        type: 'multiple-choice',
        title: 'Listening Strategy: Intonation',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'In English, yes/no questions usually end with which intonation pattern?',
            options: ['Rising intonation (nada naik)', 'Falling intonation (nada turun)', 'Flat monotone', 'Whispering'],
            correctIndex: 0,
            explanation: 'Pertanyaan Yes/No (seperti "Are you ready?") biasanya diakhiri intonasi nada naik (rising intonation).'
          }
        }
      },
      {
        id: 'lis-20',
        type: 'multiple-choice',
        title: 'Listening Strategy: WH-Questions',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'WH-questions (What, Where, When, Why, Who, How) typically conclude with which intonation?',
            options: ['Falling intonation (nada turun)', 'Rising intonation', 'Singing tone', 'Screaming'],
            correctIndex: 0,
            explanation: 'Pertanyaan WH (seperti "Where do you live?") diakhiri dengan intonasi nada menurun (falling intonation).'
          }
        }
      }
    ]
  },

  // 3. READING PRACTICE & TEXT MASTERY (20 ACTIVITIES)
  {
    id: 'lesson-reading-mastery',
    title: 'Reading Studio & Text Comprehension',
    subtitle: 'Passages, interactive clickable vocabulary, and analytical questions (20 Latihan Soal)',
    level: 'Beginner',
    category: 'Reading',
    estimatedMinutes: 22,
    xpTotal: 320,
    progressPercent: 0,
    completed: false,
    unlocked: true,
    theoryGuide: {
      summary: 'Keterampilan membaca efisien melibatkan dua teknik utama: Skimming (membaca cepat untuk menangkap ide pokok umum) dan Scanning (mencari detail spesifik seperti angka, tanggal, atau nama).',
      rules: [
        {
          title: 'Skimming vs Scanning',
          explanation: 'Skimming: baca kalimat pertama setiap paragraf untuk memahami topik umum. Scanning: cari kata kunci spesifik di dalam teks tanpa membaca kata per kata.',
          example: 'Scan for names, years (2026), and numbers in reading exams!'
        }
      ],
      keyFormulas: [
        'Main Idea = Topic Sentence (First 1-2 lines of paragraph)',
        'Inference = Clues from text + Logical reasoning'
      ],
      teacherTip: 'Klik kata-kata yang bergaris bawah di dalam teks bacaan untuk membuka tooltip definisi, fonetik, dan contoh kalimat!'
    },
    activities: [
      {
        id: 'rd-1',
        type: 'reading',
        title: 'Passage 1: Digital Learning',
        xpValue: 15,
        data: {
          kind: 'reading',
          data: {
            title: 'The Rise of Interactive Learning Media',
            category: 'Technology & Education',
            level: 'A2 - B1',
            passage: [
              'Modern education is undergoing a revolutionary transformation through digital interactive media. Students are no longer passive recipients of static paper textbooks; instead, they interact with three-dimensional visual models, responsive audio waveforms, and gamified progress tracking.',
              'Research demonstrates that multisensory learning significantly enhances retention. When learners manipulate 3D objects and receive immediate diagnostic feedback, their cognitive comprehension improves by over 40 percent compared to traditional rote memorization methods.'
            ],
            interactiveVocab: {
              'revolutionary': { word: 'revolutionary', phonetic: '/ˌrev.əˈluː.ʃən.ər.i/', definition: 'Involving complete or dramatic change', example: 'The internet brought a revolutionary shift.' },
              'multisensory': { word: 'multisensory', phonetic: '/ˌmʌl.tiˈsen.sər.i/', definition: 'Involving several senses (sight, hearing, touch)', example: 'Multisensory tools help visual and auditory learners.' },
              'retention': { word: 'retention', phonetic: '/rɪˈten.ʃən/', definition: 'The ability to retain knowledge in memory', example: 'Spaced repetition improves long-term retention.' }
            },
            question: 'According to the passage, by how much does multisensory interactive learning improve cognitive comprehension compared to rote memorization?',
            options: ['By over 40 percent', 'By exactly 10 percent', 'By less than 5 percent', 'No improvement was observed'],
            correctIndex: 0,
            explanation: 'Teks menyatakan secara langsung: "cognitive comprehension improves by over 40 percent compared to traditional rote memorization methods".'
          }
        }
      },
      {
        id: 'rd-2',
        type: 'reading',
        title: 'Passage 1 - Q2: Main Topic',
        xpValue: 15,
        data: {
          kind: 'reading',
          data: {
            title: 'The Rise of Interactive Learning Media',
            category: 'Technology & Education',
            level: 'A2 - B1',
            passage: [
              'Modern education is undergoing a revolutionary transformation through digital interactive media. Students are no longer passive recipients of static paper textbooks; instead, they interact with three-dimensional visual models, responsive audio waveforms, and gamified progress tracking.'
            ],
            interactiveVocab: {},
            question: 'What is the primary role of students in modern interactive education according to the text?',
            options: [
              'Active participants interacting with 3D models and audio',
              'Passive listeners who only read paper textbooks',
              'Observers without access to computers',
              'Examiners who grade teacher presentations'
            ],
            correctIndex: 0,
            explanation: 'Siswa aktif berinteraksi dengan model 3D visual, gelombang audio, dan tracking progres.'
          }
        }
      },
      // 3 to 10: Reading comprehension questions
      {
        id: 'rd-3',
        type: 'multiple-choice',
        title: 'Passage 2: Public Notice Comprehension',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'A sign in the museum reads: "Photography allowed without flash. Food and drinks strictly prohibited." What is a visitor allowed to do?',
            options: [
              'Take photos without using flash',
              'Eat a sandwich in the exhibition hall',
              'Take pictures with high-powered flash',
              'Drink soda near the paintings'
            ],
            correctIndex: 0,
            explanation: 'Pemberitahuan mengizinkan fotografi tanpa lampu kilat (without flash) dan melarang makanan/minuman.'
          }
        }
      },
      {
        id: 'rd-4',
        type: 'multiple-choice',
        title: 'Email Comprehension: Meeting Reschedule',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'An email states: "Due to flight delays, Mr. Smith will arrive on Wednesday morning instead of Tuesday afternoon." When will Mr. Smith arrive?',
            options: ['Wednesday morning', 'Tuesday afternoon', 'Friday night', 'Monday morning'],
            correctIndex: 0,
            explanation: 'Mr. Smith akan tiba pada "Wednesday morning" karena penerbangan tertunda.'
          }
        }
      },
      {
        id: 'rd-5',
        type: 'multiple-choice',
        title: 'Menu Comprehension: Dietary Info',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'On a restaurant menu, a dish has a green leaf symbol and says: "100% plant-based and gluten-free." Who is this dish suitable for?',
            options: [
              'Vegetarians and people allergic to gluten',
              'People who only eat beef steak',
              'People who want seafood',
              'Animals only'
            ],
            correctIndex: 0,
            explanation: '"Plant-based and gluten-free" cocok untuk vegetarian dan orang yang menghindari gluten.'
          }
        }
      },
      {
        id: 'rd-6',
        type: 'fill-blank',
        title: 'Reading Vocabulary: Prohibited',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'The word "prohibited" in official signs means strictly "___".',
            options: ['forbidden', 'encouraged', 'optional', 'enjoyable'],
            correctAnswer: 'forbidden',
            explanation: '"Prohibited" adalah istilah formal untuk dilarang (forbidden / not allowed).'
          }
        }
      },
      {
        id: 'rd-7',
        type: 'fill-blank',
        title: 'Reading Vocabulary: Mandatory',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'Wearing safety helmets on the construction site is "___" (required by rule).',
            options: ['mandatory', 'optional', 'forbidden', 'impossible'],
            correctAnswer: 'mandatory',
            explanation: '"Mandatory" berarti wajib / diharuskan oleh peraturan.'
          }
        }
      },
      {
        id: 'rd-8',
        type: 'fill-blank',
        title: 'Reading Vocabulary: Postpone',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'To "postpone" a scheduled sports event means to "___" it to a later date.',
            options: ['delay', 'cancel', 'win', 'celebrate'],
            correctAnswer: 'delay',
            explanation: '"Postpone" bermakna menunda (delay / put off).'
          }
        }
      },
      {
        id: 'rd-9',
        type: 'drag-drop',
        title: 'Reading Summary Builder',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat kesimpulan bacaan:',
            scrambledWords: ['improves', 'practice', 'Daily', 'reading', 'vocabulary', 'comprehension'],
            correctSentence: 'Daily reading practice improves vocabulary comprehension',
            translationHint: 'Daily reading practice + improves vocabulary comprehension'
          }
        }
      },
      {
        id: 'rd-10',
        type: 'drag-drop',
        title: 'Sentence Order: Finding Main Idea',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat tips membaca cepat:',
            scrambledWords: ['for', 'Scan', 'specific', 'dates', 'numbers', 'and', 'first'],
            correctSentence: 'Scan for specific numbers and dates first',
            translationHint: 'Scan for specific numbers and dates first'
          }
        }
      },
      // 11 to 20: More Reading Skills
      {
        id: 'rd-11',
        type: 'multiple-choice',
        title: 'Inference Skill: Tone of Author',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: '"Despite severe initial setbacks, the dedicated developer Sultan tirelessly built the interactive educational platform, ensuring every student had access to free learning." What is the author\'s tone?',
            options: ['Admiring and appreciative', 'Critical and angry', 'Sarcastic', 'Bored'],
            correctIndex: 0,
            explanation: 'Kata-kata "tirelessly built", "dedicated developer", dan "ensuring every student had access" menunjukkan nada kagum dan mengapresiasi.'
          }
        }
      },
      {
        id: 'rd-12',
        type: 'multiple-choice',
        title: 'Scanning Skill: Locating Dates',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: '"The global summit was inaugurated in Geneva on October 14, 2026, welcoming 140 foreign delegates." On what date was the summit opened?',
            options: ['October 14, 2026', 'October 24, 2026', 'September 14, 2025', 'December 1, 2026'],
            correctIndex: 0,
            explanation: 'Scanning tanggal: "October 14, 2026".'
          }
        }
      },
      {
        id: 'rd-13',
        type: 'multiple-choice',
        title: 'Context Clue: Synonym of Rapid',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'In the sentence "The technology experienced rapid expansion," what does "rapid" mean?',
            options: ['Fast and swift', 'Slow and gradual', 'Expensive', 'Dangerous'],
            correctIndex: 0,
            explanation: '"Rapid" adalah sinonim dari cepat (fast / swift / quick).'
          }
        }
      },
      {
        id: 'rd-14',
        type: 'multiple-choice',
        title: 'Context Clue: Antonym of Abundant',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'What is the opposite (antonym) of the word "abundant" (berlimpah)?',
            options: ['Scarce (langka / sedikit)', 'Plentiful', 'Rich', 'Overflowing'],
            correctIndex: 0,
            explanation: 'Lawan kata dari berlimpah (abundant) adalah langka / sangat sedikit (scarce).'
          }
        }
      },
      {
        id: 'rd-15',
        type: 'multiple-choice',
        title: 'Author Perspective: Fact vs Opinion',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'Which of the following statements is an OPINION rather than a factual statement?',
            options: [
              'Englicious is the most enjoyable and beautiful learning platform in the world.',
              'Water freezes at zero degrees Celsius under standard atmospheric pressure.',
              'The airplane landed at Heathrow Airport at 3:00 PM.',
              'There are seven days in one standard week.'
            ],
            correctIndex: 0,
            explanation: 'Pernyataan "the most enjoyable and beautiful" adalah opini subjektif, sedangkan pilihan lain adalah fakta objektif.'
          }
        }
      },
      {
        id: 'rd-16',
        type: 'matching',
        title: 'Match Academic Word with Definition',
        xpValue: 15,
        data: {
          kind: 'matching',
          pairs: [
            { id: 'rw1', word: 'Hypothesis', definition: 'Proposed explanation made on limited evidence' },
            { id: 'rw2', word: 'Empirical', definition: 'Based on observation rather than theory' },
            { id: 'rw3', word: 'Paradox', definition: 'Seemingly contradictory yet true statement' },
            { id: 'rw4', word: 'Consensus', definition: 'General agreement among a group' }
          ]
        }
      },
      {
        id: 'rd-17',
        type: 'fill-blank',
        title: 'Academic Collocation: Conduct research',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'Scientists ___ thorough research before publishing experimental results.',
            options: ['conduct', 'make', 'do have', 'take'],
            correctAnswer: 'conduct',
            explanation: 'Kolokasi akademis yang tepat adalah "conduct research" (melakukan penelitian).'
          }
        }
      },
      {
        id: 'rd-18',
        type: 'fill-blank',
        title: 'Academic Collocation: Draw conclusions',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'After analyzing the empirical data, researchers ___ logical conclusions.',
            options: ['drew', 'painted', 'wrote down', 'built'],
            correctAnswer: 'drew',
            explanation: 'Kolokasi baku untuk menarik kesimpulan adalah "draw conclusions" (lampau: drew conclusions).'
          }
        }
      },
      {
        id: 'rd-19',
        type: 'fill-blank',
        title: 'Academic Transition: Therefore',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'The hypothesis was supported by data; ___, further testing was scheduled.',
            options: ['therefore', 'although', 'despite', 'whereas'],
            correctAnswer: 'therefore',
            explanation: '"Therefore" (oleh karena itu) menyatakan akibat logis.'
          }
        }
      },
      {
        id: 'rd-20',
        type: 'multiple-choice',
        title: 'Final Reading Mastery Question',
        xpValue: 20,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'What is the most effective strategy when encountering an unfamiliar word in a reading exam?',
            options: [
              'Use surrounding context clues and sentence meaning to deduce its definition',
              'Panic and immediately give up',
              'Skip the entire reading passage',
              'Randomly guess without reading the sentence'
            ],
            correctIndex: 0,
            explanation: 'Strategi terbaik adalah memanfaatkan konteks kalimat di sekitarnya (context clues) untuk menyimpulkan arti kata tersebut.'
          }
        }
      }
    ]
  }
];
