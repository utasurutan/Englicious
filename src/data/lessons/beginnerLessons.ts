import { Lesson } from '../../types';

export const BEGINNER_LESSONS: Lesson[] = [
  // 1. EVERYDAY VOCABULARY & GRAMMAR FOUNDATIONS (20 ACTIVITIES)
  {
    id: 'lesson-vocab-foundations',
    title: 'Everyday Vocabulary & Grammar Foundations',
    subtitle: 'High-frequency words, basic sentence patterns, and pronouns (20 Latihan Soal)',
    level: 'Beginner',
    category: 'Grammar',
    estimatedMinutes: 15,
    xpTotal: 250,
    progressPercent: 100,
    completed: true,
    unlocked: true,
    theoryGuide: {
      summary: 'Kalimat bahasa Inggris paling dasar tersusun atas Subjek (Subject) + Kata Kerja (Verb) + Objek (Object). Pahami penggunaan kata kerja bantu to be (am/is/are) dan kata ganti (pronoun).',
      rules: [
        {
          title: 'Aturan To Be (Present Tense)',
          explanation: 'Gunakan "am" untuk subjek I; gunakan "is" untuk He, She, It, dan benda tunggal; gunakan "are" untuk You, We, They, dan benda jamak.',
          formula: 'I am | He/She/It is | You/We/They are',
          example: 'I am a student. She is a teacher. They are in the classroom.'
        },
        {
          title: 'Aturan Artikel a / an',
          explanation: 'Gunakan "a" di depan kata berbunyi konsonan (a book, a car). Gunakan "an" di depan kata berbunyi vokal (an apple, an umbrella, an hour).',
          formula: 'a + consonant sound | an + vowel sound',
          example: 'I have a pen and an orange.'
        }
      ],
      keyFormulas: [
        'Positive (+): Subject + Verb / to be + Object',
        'Negative (-): Subject + do/does not + Verb 1 + Object',
        'Question (?): Do/Does + Subject + Verb 1 + Object?'
      ],
      teacherTip: 'Jangan pernah membuat kalimat tanpa kata kerja! Jika tidak ada kata kerja tindakan, wajib gunakan to be (am/is/are)!'
    },
    activities: [
      // 1. Flashcard: Apple
      {
        id: 'bg-1',
        type: 'flashcard',
        title: 'Core Vocabulary: Apple',
        xpValue: 10,
        data: {
          kind: 'flashcard',
          data: {
            word: 'APPLE',
            phonetic: '/ˈæp.əl/',
            accentNote: 'apel',
            partOfSpeech: 'noun',
            meaning: 'A round fruit with red or green skin and crisp white flesh.',
            example: 'I eat a fresh red apple every morning before school.',
            translationHint: 'Buah apel segar bergizi',
            audioPrompt: 'apple. I eat a fresh red apple every morning before school.'
          }
        }
      },
      // 2. Flashcard: School
      {
        id: 'bg-2',
        type: 'flashcard',
        title: 'Core Vocabulary: School',
        xpValue: 10,
        data: {
          kind: 'flashcard',
          data: {
            word: 'SCHOOL',
            phonetic: '/skuːl/',
            accentNote: 'sekolah',
            partOfSpeech: 'noun',
            meaning: 'An institution for educating children and students.',
            example: 'We walk together to school every weekday morning.',
            translationHint: 'Gedung tempat belajar',
            audioPrompt: 'school. We walk together to school every weekday morning.'
          }
        }
      },
      // 3. Flashcard: Water
      {
        id: 'bg-3',
        type: 'flashcard',
        title: 'Core Vocabulary: Water',
        xpValue: 10,
        data: {
          kind: 'flashcard',
          data: {
            word: 'WATER',
            phonetic: '/ˈwɔː.tər/',
            accentNote: 'air minum',
            partOfSpeech: 'noun',
            meaning: 'A clear liquid without color or taste that humans and animals drink.',
            example: 'Please drink eight glasses of water every day.',
            translationHint: 'Air bersih esensial',
            audioPrompt: 'water. Please drink eight glasses of water every day.'
          }
        }
      },
      // 4. Flashcard: Friend
      {
        id: 'bg-4',
        type: 'flashcard',
        title: 'Core Vocabulary: Friend',
        xpValue: 10,
        data: {
          kind: 'flashcard',
          data: {
            word: 'FRIEND',
            phonetic: '/frend/',
            accentNote: 'teman / sahabat',
            partOfSpeech: 'noun',
            meaning: 'A person with whom one has a bond of mutual affection and trust.',
            example: 'Sultan is my best friend in English class.',
            translationHint: 'Kawan atau sahabat baik',
            audioPrompt: 'friend. Sultan is my best friend in English class.'
          }
        }
      },
      // 5. Flashcard: Happy
      {
        id: 'bg-5',
        type: 'flashcard',
        title: 'Core Vocabulary: Happy',
        xpValue: 10,
        data: {
          kind: 'flashcard',
          data: {
            word: 'HAPPY',
            phonetic: '/ˈhæp.i/',
            accentNote: 'senang / gembira',
            partOfSpeech: 'adjective',
            meaning: 'Feeling or showing pleasure, contentment, and joy.',
            example: 'The children were very happy when they received new books.',
            translationHint: 'Perasaan ceria dan gembira',
            audioPrompt: 'happy. The children were very happy when they received new books.'
          }
        }
      },
      // 6. Fill in the blank: To be "am"
      {
        id: 'bg-6',
        type: 'fill-blank',
        title: 'Pronoun & To Be: I',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'I ___ ready to learn English today.',
            options: ['am', 'is', 'are', 'be'],
            correctAnswer: 'am',
            explanation: 'Subjek "I" selalu berpasangan dengan kata kerja bantu "am" pada present tense.'
          }
        }
      },
      // 7. Fill in the blank: To be "is"
      {
        id: 'bg-7',
        type: 'fill-blank',
        title: 'Pronoun & To Be: She',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'She ___ reading an interesting book in the library.',
            options: ['is', 'are', 'am', 'be'],
            correctAnswer: 'is',
            explanation: 'Subjek orang ketiga tunggal (She, He, It) selalu menggunakan "is".'
          }
        }
      },
      // 8. Fill in the blank: To be "are"
      {
        id: 'bg-8',
        type: 'fill-blank',
        title: 'Pronoun & To Be: They',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'They ___ playing football in the school field.',
            options: ['are', 'is', 'am', 'was'],
            correctAnswer: 'are',
            explanation: 'Subjek jamak "They" selalu berpasangan dengan "are".'
          }
        }
      },
      // 9. Fill in the blank: Article a vs an
      {
        id: 'bg-9',
        type: 'fill-blank',
        title: 'Article: a or an',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'My father bought ___ electric car yesterday.',
            options: ['an', 'a', 'the', 'some'],
            correctAnswer: 'an',
            explanation: 'Kata "electric" diawali bunyi vokal /ɪˈlek.trɪk/, sehingga wajib menggunakan artikel "an".'
          }
        }
      },
      // 10. Fill in the blank: Plural nouns
      {
        id: 'bg-10',
        type: 'fill-blank',
        title: 'Irregular Plurals: Child',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'Three ___ are playing together in the park.',
            options: ['children', 'childs', 'childes', 'childrens'],
            correctAnswer: 'children',
            explanation: 'Bentuk jamak tidak beraturan dari "child" adalah "children" (bukan childs).'
          }
        }
      },
      // 11. Drag & Drop: Basic S-V-O
      {
        id: 'bg-11',
        type: 'drag-drop',
        title: 'Word Order: Daily Habit',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kata-kata berikut menjadi kalimat bahasa Inggris yang tepat:',
            scrambledWords: ['drinks', 'water', 'He', 'every', 'morning'],
            correctSentence: 'He drinks water every morning',
            translationHint: 'Subject + Verb + Object + Time'
          }
        }
      },
      // 12. Drag & Drop: Cafe Ordering
      {
        id: 'bg-12',
        type: 'drag-drop',
        title: 'Word Order: Polite Request',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat permintaan sopan saat memesan minuman:',
            scrambledWords: ['like', 'would', 'a', 'I', 'cup', 'of', 'coffee'],
            correctSentence: 'I would like a cup of coffee',
            translationHint: 'I + would like + a cup of coffee'
          }
        }
      },
      // 13. Drag & Drop: Study Routine
      {
        id: 'bg-13',
        type: 'drag-drop',
        title: 'Word Order: Classroom Routine',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kata berikut menjadi kalimat lengkap:',
            scrambledWords: ['English', 'study', 'We', 'at', 'school', 'together'],
            correctSentence: 'We study English at school together',
            translationHint: 'Subject + Verb + Object + Adverb'
          }
        }
      },
      // 14. Drag & Drop: Question Formation
      {
        id: 'bg-14',
        type: 'drag-drop',
        title: 'Word Order: Question Formation',
        xpValue: 15,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun pertanyaan bahasa Inggris yang benar:',
            scrambledWords: ['Where', 'do', 'live?', 'you', 'now'],
            correctSentence: 'Where do you live now',
            translationHint: 'Question Word + Auxiliary + Subject + Verb'
          }
        }
      },
      // 15. Matching: Opposites Pairs
      {
        id: 'bg-15',
        type: 'matching',
        title: 'Match English Opposites',
        xpValue: 15,
        data: {
          kind: 'matching',
          pairs: [
            { id: 'm1', word: 'Big', definition: 'Small (Kecil)' },
            { id: 'm2', word: 'Hot', definition: 'Cold (Dingin)' },
            { id: 'm3', word: 'Happy', definition: 'Sad (Sedih)' },
            { id: 'm4', word: 'Fast', definition: 'Slow (Lambat)' }
          ]
        }
      },
      // 16. Matching: Everyday Objects & Meanings
      {
        id: 'bg-16',
        type: 'matching',
        title: 'Match Everyday Vocabulary',
        xpValue: 15,
        data: {
          kind: 'matching',
          pairs: [
            { id: 'm5', word: 'Breakfast', definition: 'Morning meal (Sarapan)' },
            { id: 'm6', word: 'Library', definition: 'Place with many books (Perpustakaan)' },
            { id: 'm7', word: 'Teacher', definition: 'Person who educates (Guru)' },
            { id: 'm8', word: 'Clock', definition: 'Device showing time (Jam)' }
          ]
        }
      },
      // 17. Multiple Choice: Daily Routine
      {
        id: 'bg-17',
        type: 'multiple-choice',
        title: 'Multiple Choice: Present Habit',
        xpValue: 10,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'Sultan always ___ up at 6:00 AM every morning.',
            context: 'Pilih kata kerja bentuk Simple Present yang tepat untuk subjek tunggal orang ketiga.',
            options: ['wakes', 'wake', 'waking', 'woken'],
            correctIndex: 0,
            explanation: 'Subjek tunggal "Sultan" (He) memerlukan kata kerja dengan akhiran -s, yaitu "wakes".'
          }
        }
      },
      // 18. Multiple Choice: Negative Sentence
      {
        id: 'bg-18',
        type: 'multiple-choice',
        title: 'Multiple Choice: Negative Present',
        xpValue: 10,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'They ___ like spicy food very much.',
            context: 'Bentuk kalimat negatif Simple Present untuk subjek "They".',
            options: ['do not', 'does not', 'is not', 'are not'],
            correctIndex: 0,
            explanation: 'Subjek "They" menggunakan auxiliary verb "do not" (don\'t) sebelum kata kerja dasar.'
          }
        }
      },
      // 19. Multiple Choice: Question Word
      {
        id: 'bg-19',
        type: 'multiple-choice',
        title: 'Multiple Choice: Asking for Time',
        xpValue: 10,
        data: {
          kind: 'multiple-choice',
          data: {
            question: '"___ time is the English class tomorrow?" — "It starts at 9:00 AM."',
            context: 'Pilih kata tanya yang tepat untuk menanyakan jam.',
            options: ['What', 'Where', 'Who', 'Why'],
            correctIndex: 0,
            explanation: 'Frasa baku bahasa Inggris untuk menanyakan jam adalah "What time".'
          }
        }
      },
      // 20. Multiple Choice: Polite Greeting Response
      {
        id: 'bg-20',
        type: 'multiple-choice',
        title: 'Multiple Choice: Social Response',
        xpValue: 10,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'Person A: "How do you do?" — What is the natural polite response?',
            context: 'Salam perkenalan formal pertama kali.',
            options: ['How do you do?', 'I am 16 years old.', 'Yes, I do it.', 'No, thank you.'],
            correctIndex: 0,
            explanation: 'Dalam etika bahasa Inggris formal, sapaan perkenalan pertama "How do you do?" dibalas kembali dengan "How do you do?".'
          }
        }
      }
    ]
  },

  // 2. 3D VISUAL OBJECTS VOCABULARY MASTERY (20 ACTIVITIES)
  {
    id: 'lesson-visual-objects',
    title: 'Visual 3D Vocabulary & Object Mastery',
    subtitle: 'Learn and identify real-world 3D objects with audio, phonetic guides, and spelling (20 Latihan Soal)',
    level: 'Beginner',
    category: 'Vocabulary',
    estimatedMinutes: 18,
    xpTotal: 300,
    progressPercent: 100,
    completed: true,
    unlocked: true,
    theoryGuide: {
      summary: 'Mengasosiasikan kata bahasa Inggris langsung dengan bentuk objek 3D interaktif mempercepat ingatan jangka panjang tanpa harus menerjemahkan dalam hati.',
      rules: [
        {
          title: 'Direct Visual Association',
          explanation: 'Lihat bentuk visual 3D apel, dengarkan audio "/ˈæp.əl/", dan sebutkan "An apple" secara spontan.',
          example: 'I see a ripe red apple on the table.'
        },
        {
          title: 'Artikel a dan an pada Objek 3D',
          explanation: 'Gunakan "an" untuk kata berbunyi vokal (an apple, an airplane), gunakan "a" untuk konsonan (a backpack, a clock, a pencil).',
          formula: 'an + vowel | a + consonant',
          example: 'She packed a backpack, a notebook, and an apple.'
        }
      ],
      keyFormulas: [
        'What is this? ➔ It is a/an [object name].',
        'What are these? ➔ They are [plural objects].'
      ],
      teacherTip: 'Gunakan tombol 3D View (Depan, 3D Isometrik, Samping) untuk melihat objek dari berbagai sudut, dan ketuk tombol Listen untuk mendengar suara native!'
    },
    activities: [
      // 1. Apple
      {
        id: 'vis-1',
        type: 'multiple-choice',
        title: 'Identify 3D Object: Apple',
        xpValue: 15,
        data: {
          kind: 'visual-object',
          data: {
            objectId: 'apple',
            objectName: 'Apple',
            category: 'Food & Fruits',
            phonetic: '/ˈæp.əl/',
            indonesianMeaning: 'Apel',
            question: 'Look at the 3D fruit above: What is this called in English?',
            options: ['Apple', 'Orange', 'Pomegranate', 'Pear'],
            correctAnswer: 'Apple',
            exampleSentence: 'An apple a day keeps the doctor away.',
            funFact: 'Apples float in water because 25% of their volume is air!',
            hint: 'A round fruit with red skin and a small green leaf on top.'
          }
        }
      },
      // 2. Coffee Mug
      {
        id: 'vis-2',
        type: 'multiple-choice',
        title: 'Identify 3D Object: Coffee Mug',
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
            exampleSentence: 'She poured fresh hot latte into her ceramic coffee mug.',
            funFact: 'Over 2.25 billion cups of coffee are enjoyed around the world every day!',
            hint: 'A ceramic cup with a side handle holding hot drinks.'
          }
        }
      },
      // 3. Airplane
      {
        id: 'vis-3',
        type: 'multiple-choice',
        title: 'Identify 3D Object: Airplane',
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
            exampleSentence: 'We boarded the international airplane for our flight to London.',
            funFact: 'Commercial airplanes cruise at an altitude of approximately 35,000 feet!',
            hint: 'A winged aircraft powered by jet engines with cabin windows.'
          }
        }
      },
      // 4. Headphones
      {
        id: 'vis-4',
        type: 'multiple-choice',
        title: 'Identify 3D Object: Headphones',
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
            exampleSentence: 'He put on his noise-cancelling headphones to listen to English audio.',
            funFact: 'Headphones were originally invented in 1910 for naval communication!',
            hint: 'Padded ear speakers joined by a flexible overhead band.'
          }
        }
      },
      // 5. Backpack
      {
        id: 'vis-5',
        type: 'multiple-choice',
        title: 'Identify 3D Object: Backpack',
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
            exampleSentence: 'She packed her English notebooks and pencil inside her green backpack.',
            funFact: 'The term "backpack" was coined in the United States in the 1910s.',
            hint: 'A sturdy bag with shoulder straps carried on your back.'
          }
        }
      },
      // 6. Alarm Clock
      {
        id: 'vis-6',
        type: 'multiple-choice',
        title: 'Identify 3D Object: Alarm Clock',
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
            funFact: 'The first mechanical alarm clock in 1787 could only ring at 4 AM!',
            hint: 'A circular clock with twin bells on top that rings to wake you up.'
          }
        }
      },
      // 7. Pencil
      {
        id: 'vis-7',
        type: 'multiple-choice',
        title: 'Identify 3D Object: Pencil',
        xpValue: 15,
        data: {
          kind: 'visual-object',
          data: {
            objectId: 'pencil',
            objectName: 'Pencil',
            category: 'School & Stationery',
            phonetic: '/ˈpen.səl/',
            indonesianMeaning: 'Pensil Kayu',
            question: 'Look at this wooden writing instrument: What is this called in English?',
            options: ['Marker', 'Pencil', 'Fountain Pen', 'Chalk'],
            correctAnswer: 'Pencil',
            exampleSentence: 'She sharpened her yellow pencil before starting the English grammar test.',
            funFact: 'An average pencil has enough graphite to draw a continuous line 35 miles long!',
            hint: 'A hexagonal yellow wooden stick with graphite lead and a pink eraser.'
          }
        }
      },
      // 8. Microscope
      {
        id: 'vis-8',
        type: 'multiple-choice',
        title: 'Identify 3D Object: Microscope',
        xpValue: 15,
        data: {
          kind: 'visual-object',
          data: {
            objectId: 'microscope',
            objectName: 'Microscope',
            category: 'Science & Laboratory',
            phonetic: '/ˈmaɪ.krə.skoʊp/',
            indonesianMeaning: 'Mikroskop',
            question: 'Look at this laboratory instrument: What is this called in English?',
            options: ['Telescope', 'Thermometer', 'Microscope', 'Stethoscope'],
            correctAnswer: 'Microscope',
            exampleSentence: 'Students used a compound microscope in biology class to examine cells.',
            funFact: 'Antonie van Leeuwenhoek improved the microscope in the 1670s, discovering bacteria!',
            hint: 'An optical instrument used for magnifying microscopic specimens.'
          }
        }
      },
      // 9. Globe
      {
        id: 'vis-9',
        type: 'multiple-choice',
        title: 'Identify 3D Object: Globe',
        xpValue: 15,
        data: {
          kind: 'visual-object',
          data: {
            objectId: 'globe',
            objectName: 'Globe',
            category: 'Geography & World',
            phonetic: '/ɡloʊb/',
            indonesianMeaning: 'Bola Dunia / Globe',
            question: 'Look at this spherical model of Earth: What is this called in English?',
            options: ['Atlas', 'Compass', 'Globe', 'Planetarium'],
            correctAnswer: 'Globe',
            exampleSentence: 'The teacher spun the world globe to show the continent of Australia.',
            funFact: 'The oldest surviving terrestrial globe was created in Nuremberg in 1492.',
            hint: 'A spherical 3D representation of the Earth mounted on a stand.'
          }
        }
      },
      // 10. Guitar
      {
        id: 'vis-10',
        type: 'multiple-choice',
        title: 'Identify 3D Object: Guitar',
        xpValue: 15,
        data: {
          kind: 'visual-object',
          data: {
            objectId: 'guitar',
            objectName: 'Guitar',
            category: 'Music & Instruments',
            phonetic: '/ɡɪˈtɑːr/',
            indonesianMeaning: 'Gitar Akustik',
            question: 'Look at this stringed musical instrument: What is this called in English?',
            options: ['Violin', 'Guitar', 'Cello', 'Ukulele'],
            correctAnswer: 'Guitar',
            exampleSentence: 'He strummed a melodic song on his acoustic wooden guitar.',
            funFact: 'The acoustic guitar evolved from Renaissance four-string instruments in Spain.',
            hint: 'A wooden instrument with a sound hole and six strings.'
          }
        }
      },
      // 11. Telescope
      {
        id: 'vis-11',
        type: 'multiple-choice',
        title: 'Identify 3D Object: Telescope',
        xpValue: 15,
        data: {
          kind: 'visual-object',
          data: {
            objectId: 'telescope',
            objectName: 'Telescope',
            category: 'Astronomy & Space',
            phonetic: '/ˈtel.ə.skoʊp/',
            indonesianMeaning: 'Teleskop / Teropong Bintang',
            question: 'Look at this astronomical optical instrument: What is this called in English?',
            options: ['Binoculars', 'Periscope', 'Telescope', 'Kaleidoscope'],
            correctAnswer: 'Telescope',
            exampleSentence: 'We peered through the astronomical telescope to observe the rings of Saturn.',
            funFact: 'Galileo Galilei was the first person to point a telescope toward the night sky in 1609.',
            hint: 'A long tube on a tripod used to view distant stars and planets.'
          }
        }
      },
      // 12. Car
      {
        id: 'vis-12',
        type: 'multiple-choice',
        title: 'Identify 3D Object: Electric Car',
        xpValue: 15,
        data: {
          kind: 'visual-object',
          data: {
            objectId: 'car',
            objectName: 'Car',
            category: 'Transportation & Travel',
            phonetic: '/kɑːr/',
            indonesianMeaning: 'Mobil',
            question: 'Look at this modern passenger vehicle: What is this called in English?',
            options: ['Motorcycle', 'Bus', 'Car', 'Truck'],
            correctAnswer: 'Car',
            exampleSentence: 'They drove their red electric car along the scenic coastal highway.',
            funFact: 'There are over 1.4 billion motor vehicles in active use worldwide today!',
            hint: 'A four-wheeled road vehicle powered by an engine or battery.'
          }
        }
      },
      // 13. Bicycle
      {
        id: 'vis-13',
        type: 'multiple-choice',
        title: 'Identify 3D Object: Bicycle',
        xpValue: 15,
        data: {
          kind: 'visual-object',
          data: {
            objectId: 'bicycle',
            objectName: 'Bicycle',
            category: 'Sports & Transportation',
            phonetic: '/ˈbaɪ.sɪ.kəl/',
            indonesianMeaning: 'Sepeda',
            question: 'Look at this two-wheeled pedal vehicle: What is this called in English?',
            options: ['Skateboard', 'Bicycle', 'Scooter', 'Wheelbarrow'],
            correctAnswer: 'Bicycle',
            exampleSentence: 'Riding a bicycle is an eco-friendly and healthy way to commute.',
            funFact: 'The Netherlands has more bicycles than permanent human residents!',
            hint: 'A two-wheeled vehicle that you pedal with your feet.'
          }
        }
      },
      // 14. Books Stack
      {
        id: 'vis-14',
        type: 'multiple-choice',
        title: 'Identify 3D Object: Books Stack',
        xpValue: 15,
        data: {
          kind: 'visual-object',
          data: {
            objectId: 'books',
            objectName: 'Books',
            category: 'Education & Literature',
            phonetic: '/bʊks/',
            indonesianMeaning: 'Tumpukan Buku',
            question: 'Look at this stack of reading literature: What is this called in English?',
            options: ['Newspapers', 'Books', 'Magazines', 'Notepads'],
            correctAnswer: 'Books',
            exampleSentence: 'She stacked her three favorite hardcover books on the wooden desk.',
            funFact: 'The world\'s largest library, the US Library of Congress, holds over 170 million items!',
            hint: 'Bound printed paper pages between hardcover covers.'
          }
        }
      },
      // 15. House
      {
        id: 'vis-15',
        type: 'multiple-choice',
        title: 'Identify 3D Object: Cottage House',
        xpValue: 15,
        data: {
          kind: 'visual-object',
          data: {
            objectId: 'house',
            objectName: 'House',
            category: 'Architecture & Living',
            phonetic: '/haʊs/',
            indonesianMeaning: 'Rumah',
            question: 'Look at this residential dwelling: What is this called in English?',
            options: ['Castle', 'House', 'Tent', 'Skyscraper'],
            correctAnswer: 'House',
            exampleSentence: 'They lived happily in a cozy yellow cottage house near the green hills.',
            funFact: 'The oldest known wooden house still standing was built around the year 1100 in the Faroe Islands!',
            hint: 'A building for human habitation with a roof, windows, and front door.'
          }
        }
      },
      // 16. Context Question: Apple in Sentence
      {
        id: 'vis-16',
        type: 'fill-blank',
        title: 'Context Clue: Apple',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'She picked a fresh red ___ from the orchard tree.',
            options: ['apple', 'car', 'telescope', 'airplane'],
            correctAnswer: 'apple',
            explanation: 'Buah yang dipetik dari pohon kebun adalah "apple".'
          }
        }
      },
      // 17. Context Question: Pencil Function
      {
        id: 'vis-17',
        type: 'fill-blank',
        title: 'Context Clue: Pencil',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'Students use a sharp ___ to sketch drawings and write notes.',
            options: ['pencil', 'coffee', 'clock', 'bicycle'],
            correctAnswer: 'pencil',
            explanation: 'Alat untuk menggambar sketsa dan mencatat adalah "pencil".'
          }
        }
      },
      // 18. Context Question: Microscope in Lab
      {
        id: 'vis-18',
        type: 'fill-blank',
        title: 'Context Clue: Microscope',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'The scientist observed tiny bacteria through a powerful ___.',
            options: ['microscope', 'backpack', 'guitar', 'house'],
            correctAnswer: 'microscope',
            explanation: 'Alat optik laboratorium untuk mengamati bakteri kecil adalah "microscope".'
          }
        }
      },
      // 19. Context Question: Guitar Melody
      {
        id: 'vis-19',
        type: 'fill-blank',
        title: 'Context Clue: Guitar',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'He strummed the six strings of his wooden ___ to play a melody.',
            options: ['guitar', 'airplane', 'apple', 'clock'],
            correctAnswer: 'guitar',
            explanation: 'Alat musik berdawai enam yang dipetik adalah "guitar".'
          }
        }
      },
      // 20. Context Question: Telescope Stars
      {
        id: 'vis-20',
        type: 'fill-blank',
        title: 'Context Clue: Telescope',
        xpValue: 10,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'At night, astronomers use an optical ___ to study distant galaxies.',
            options: ['telescope', 'coffee', 'backpack', 'bicycle'],
            correctAnswer: 'telescope',
            explanation: 'Alat teropong untuk mengamati galaksi dan bintang di langit malam adalah "telescope".'
          }
        }
      }
    ]
  },

  // 3. A2 BREAKTHROUGH CERTIFICATION EXAM (20 ACTIVITIES)
  {
    id: 'lesson-checkpoint-b',
    title: 'A2 Mastery Breakthrough Certification Exam',
    subtitle: 'Comprehensive 20-question evaluation testing A1-A2 grammar, vocabulary, listening, and sentence patterns',
    level: 'Beginner',
    category: 'Grammar',
    estimatedMinutes: 20,
    xpTotal: 300,
    progressPercent: 0,
    completed: false,
    unlocked: true,
    theoryGuide: {
      summary: 'Ujian komprehensif menguji seluruh kompetensi level A1-A2: tenses present, pronouns, artikel, kosakata 3D, dan pemahaman percakapan dasar.',
      rules: [
        {
          title: 'Tips Mengerjakan Ujian Sertifikasi',
          explanation: 'Baca soal dengan teliti, perhatikan subjek kalimat apakah tunggal atau jamak, dan perhatikan sinyal waktu (time signal).',
          example: 'Always check if the subject is singular (He/She) or plural (They/We)!'
        }
      ],
      teacherTip: 'Kerjakan ke-20 soal ini dengan fokus penuh untuk membuktikan kesiapan Anda melangkah ke level Intermediate B1!'
    },
    activities: [
      {
        id: 'cp-b1',
        type: 'multiple-choice',
        title: 'Q1: Pronoun Selection',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: '"Is that your sister?" — "Yes, ___ is an English teacher."',
            options: ['she', 'he', 'they', 'it'],
            correctIndex: 0,
            explanation: 'Kata ganti untuk subjek perempuan tunggal (sister) adalah "she".'
          }
        }
      },
      {
        id: 'cp-b2',
        type: 'multiple-choice',
        title: 'Q2: To Be in Present',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'The students ___ very excited about the school trip today.',
            options: ['are', 'is', 'am', 'be'],
            correctIndex: 0,
            explanation: 'Subjek jamak "The students" menggunakan to be "are".'
          }
        }
      },
      {
        id: 'cp-b3',
        type: 'multiple-choice',
        title: 'Q3: Article Usage',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'She wants to buy ___ umbrella because it is raining outside.',
            options: ['an', 'a', 'the', 'some'],
            correctIndex: 0,
            explanation: 'Kata "umbrella" berbunyi vokal /ʌmˈbrel.ə/, sehingga memakai "an".'
          }
        }
      },
      {
        id: 'cp-b4',
        type: 'multiple-choice',
        title: 'Q4: Present Simple Habit',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'My brother ___ coffee every morning before work.',
            options: ['drinks', 'drink', 'drinking', 'drank'],
            correctIndex: 0,
            explanation: 'Subjek tunggal "My brother" (He) memerlukan Verb 1 + s ("drinks").'
          }
        }
      },
      {
        id: 'cp-b5',
        type: 'multiple-choice',
        title: 'Q5: Negative Present Auxiliary',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'He ___ know how to operate the new computer software.',
            options: ['does not', 'do not', 'is not', 'are not'],
            correctIndex: 0,
            explanation: 'Subjek "He" pada kalimat negatif Simple Present menggunakan "does not" (doesn\'t).'
          }
        }
      },
      {
        id: 'cp-b6',
        type: 'multiple-choice',
        title: 'Q6: Asking for Location',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: '"___ is the nearest post office?" — "It is on Maple Street."',
            options: ['Where', 'When', 'Who', 'What'],
            correctIndex: 0,
            explanation: 'Kata tanya untuk menanyakan lokasi tempat adalah "Where".'
          }
        }
      },
      {
        id: 'cp-b7',
        type: 'multiple-choice',
        title: 'Q7: Possessive Adjective',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'We love ___ new English learning platform!',
            options: ['our', 'us', 'ours', 'we'],
            correctIndex: 0,
            explanation: 'Possessive adjective untuk subjek "We" sebelum kata benda platform adalah "our".'
          }
        }
      },
      {
        id: 'cp-b8',
        type: 'multiple-choice',
        title: 'Q8: Time Expression',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'The library closes ___ 8:00 PM on Friday nights.',
            options: ['at', 'on', 'in', 'by'],
            correctIndex: 0,
            explanation: 'Preposisi waktu untuk jam spesifik adalah "at" (at 8:00 PM).'
          }
        }
      },
      {
        id: 'cp-b9',
        type: 'multiple-choice',
        title: 'Q9: Plural Noun Form',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'Several ___ were working diligently in the technology office.',
            options: ['people', 'persons', 'peoples', 'persones'],
            correctIndex: 0,
            explanation: 'Bentuk jamak umum dari "person" adalah "people".'
          }
        }
      },
      {
        id: 'cp-b10',
        type: 'multiple-choice',
        title: 'Q10: Present Continuous',
        xpValue: 15,
        data: {
          kind: 'multiple-choice',
          data: {
            question: 'Listen! Someone ___ on the front door.',
            options: ['is knocking', 'knocks', 'knocked', 'are knocking'],
            correctIndex: 0,
            explanation: 'Kata seru "Listen!" menandakan kejadian sedang berlangsung (is knocking).'
          }
        }
      },
      {
        id: 'cp-b11',
        type: 'fill-blank',
        title: 'Q11: Question Auxiliary',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: '___ you have a pencil I can borrow?',
            options: ['Do', 'Does', 'Is', 'Are'],
            correctAnswer: 'Do',
            explanation: 'Subjek "you" menggunakan auxiliary "Do" dalam pertanyaan Simple Present.'
          }
        }
      },
      {
        id: 'cp-b12',
        type: 'fill-blank',
        title: 'Q12: Object Pronoun',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'Please give ___ the book on the table.',
            options: ['me', 'I', 'my', 'mine'],
            correctAnswer: 'me',
            explanation: 'Setelah kata kerja "give" memerlukan object pronoun "me".'
          }
        }
      },
      {
        id: 'cp-b13',
        type: 'fill-blank',
        title: 'Q13: Days Preposition',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'We attend English class ___ Mondays and Wednesdays.',
            options: ['on', 'in', 'at', 'for'],
            correctAnswer: 'on',
            explanation: 'Preposisi untuk hari (days of the week) selalu "on".'
          }
        }
      },
      {
        id: 'cp-b14',
        type: 'fill-blank',
        title: 'Q14: Demonstrative Pronoun',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: '___ apples here in my hand are very sweet.',
            options: ['These', 'This', 'That', 'Those'],
            correctAnswer: 'These',
            explanation: 'Benda jamak (apples) yang berada dekat di tangan menggunakan "These".'
          }
        }
      },
      {
        id: 'cp-b15',
        type: 'fill-blank',
        title: 'Q15: Ability Modal',
        xpValue: 15,
        data: {
          kind: 'fill-blank',
          data: {
            sentenceWithBlank: 'Sultan ___ speak English fluently and confidently.',
            options: ['can', 'is', 'does', 'has'],
            correctAnswer: 'can',
            explanation: 'Modal verb "can" digunakan untuk menyatakan kemampuan (ability).'
          }
        }
      },
      // 16 to 18: Drag-drop Checkpoint
      {
        id: 'cp-b16',
        type: 'drag-drop',
        title: 'Q16: Complete Sentence Order',
        xpValue: 20,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat bahasa Inggris yang benar:',
            scrambledWords: ['breakfast', 'eats', 'She', 'at', 'every', 'morning', 'seven'],
            correctSentence: 'She eats breakfast at seven every morning',
            translationHint: 'Subject + Verb + Object + Time'
          }
        }
      },
      {
        id: 'cp-b17',
        type: 'drag-drop',
        title: 'Q17: Cafe Interaction',
        xpValue: 20,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat percakapan memesan di restoran:',
            scrambledWords: ['Can', 'have', 'the', 'bill,', 'please?', 'we'],
            correctSentence: 'Can we have the bill, please?',
            translationHint: 'Polite request for bill'
          }
        }
      },
      {
        id: 'cp-b18',
        type: 'drag-drop',
        title: 'Q18: Study Habit',
        xpValue: 20,
        data: {
          kind: 'drag-drop',
          data: {
            instruction: 'Susun kalimat pernyataan tentang belajar:',
            scrambledWords: ['practice', 'Every', 'English', 'I', 'words', 'day'],
            correctSentence: 'Every day I practice English words',
            translationHint: 'Time + Subject + Verb + Object'
          }
        }
      },
      // 19 to 20: Matching & Listening
      {
        id: 'cp-b19',
        type: 'matching',
        title: 'Q19: Match Questions and Answers',
        xpValue: 20,
        data: {
          kind: 'matching',
          pairs: [
            { id: 'c1', word: 'What is your name?', definition: 'My name is Sultan.' },
            { id: 'c2', word: 'Where are you from?', definition: 'I am from Indonesia.' },
            { id: 'c3', word: 'How old are you?', definition: 'I am seventeen years old.' },
            { id: 'c4', word: 'Nice to meet you.', definition: 'Nice to meet you too.' }
          ]
        }
      },
      {
        id: 'cp-b20',
        type: 'listening',
        title: 'Q20: Final Audio Comprehension',
        xpValue: 20,
        data: {
          kind: 'listening',
          data: {
            audioText: 'Welcome to the final certification exam. You have completed the Beginner A2 course successfully!',
            instruction: 'Dengarkan audio penutur asli dan pilih pernyataan yang sesuai:',
            question: 'What milestone did the student achieve in this audio announcement?',
            options: [
              'Completed the Beginner A2 course successfully',
              'Failed the vocabulary placement test',
              'Registered for a chemistry class',
              'Lost their student library card'
            ],
            correctIndex: 0,
            transcript: 'Welcome to the final certification exam. You have completed the Beginner A2 course successfully!',
            explanation: 'Audio menyatakan dengan jelas bahwa siswa telah berhasil menyelesaikan kursus Beginner A2.'
          }
        }
      }
    ]
  }
];
