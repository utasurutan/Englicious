import { LearningMaterial } from '../types';

export const LEARNING_MATERIALS: LearningMaterial[] = [
  // 1. SIMPLE PAST TENSE VS PRESENT PERFECT
  {
    id: 'material-simple-past',
    title: 'Simple Past Tense vs. Present Perfect Masterclass',
    subtitle: 'Memahami perbedaan waktu lampau spesifik vs. pengalaman hidup yang masih relevan',
    category: 'Grammar',
    level: 'Beginner',
    readingTimeMinutes: 7,
    iconName: 'Clock',
    tags: ['Tenses', 'Past Simple', 'Present Perfect', 'Verbs', 'Grammar'],
    summary: 'Banyak pembelajar bahasa Inggris bingung membedakan Simple Past dan Present Perfect. Pelajari rumus, aturan sinyal waktu, dan perbedaan mendasar keduanya dengan mudah.',
    sections: [
      {
        heading: '1. Kapan Menggunakan Simple Past Tense?',
        content: 'Simple Past digunakan untuk menceritakan kejadian yang dimulai dan SELESAI di masa lampau pada titik waktu yang jelas dan spesifik (definite time).',
        formula: 'Positif (+): Subject + Verb 2 (past) + Object\nNegatif (-): Subject + did not (didn\'t) + Verb 1 + Object\nTanya (?): Did + Subject + Verb 1 + Object?',
        examples: [
          { en: 'I went to school yesterday.', id: 'Saya pergi ke sekolah kemarin.', audioPhrase: 'I went to school yesterday.' },
          { en: 'She did not call me last night.', id: 'Dia tidak menelepon saya tadi malam.', audioPhrase: 'She did not call me last night.' },
          { en: 'Did you finish your homework two hours ago?', id: 'Apakah kamu menyelesaikan PR-mu dua jam yang lalu?', audioPhrase: 'Did you finish your homework two hours ago?' }
        ],
        teacherTip: 'Sinyal waktu wajib Simple Past: yesterday, last week/night/year, two days ago, in 2020. Jika ada waktu spesifik ini, SELALU gunakan Verb 2!'
      },
      {
        heading: '2. Kapan Menggunakan Present Perfect Tense?',
        content: 'Present Perfect digunakan ketika waktu terjadinya TIDAK disebutkan secara spesifik, atau ketika hasil perbuatan di masa lalu masih berdampak langsung ke masa sekarang (indefinite time / life experience).',
        formula: 'Positif (+): Subject + have / has + Verb 3 (past participle)\nNegatif (-): Subject + have / has not + Verb 3\nTanya (?): Have / Has + Subject + Verb 3?',
        examples: [
          { en: 'I have visited London twice.', id: 'Saya pernah mengunjungi London dua kali (sepanjang hidup saya).', audioPhrase: 'I have visited London twice.' },
          { en: 'She has lost her keys, so she cannot enter.', id: 'Dia kehilangan kuncinya, sehingga (sekarang) dia tidak bisa masuk.', audioPhrase: 'She has lost her keys, so she cannot enter.' },
          { en: 'Have you ever eaten sushi?', id: 'Pernahkah kamu makan sushi seumur hidupmu?', audioPhrase: 'Have you ever eaten sushi?' }
        ],
        warning: 'JANGAN PERNAH gunakan "have + V3" bersamaan dengan kata "yesterday" atau "ago". Contoh SALAH: "I have seen him yesterday" ❌. Yang BENAR: "I saw him yesterday" ✔️.'
      },
      {
        heading: '3. Perbandingan Langsung (Side-by-Side Comparison)',
        content: 'Bandingkan kedua kalimat berikut untuk melihat perbedaan maknanya:\n• "I lived in Paris for 3 years." ➔ Artinya sekarang sudah TIDAK tinggal di Paris lagi (lampau selesai).\n• "I have lived in Paris for 3 years." ➔ Artinya dimulai 3 tahun lalu dan SEKARANG MASIH tinggal di Paris.'
      }
    ],
    quickCheck: {
      question: 'Pilih kalimat yang benar secara tata bahasa:',
      options: [
        'I have met him two days ago at the station.',
        'I met him two days ago at the station.',
        'I meet him two days ago at the station.',
        'I had meeting him two days ago at the station.'
      ],
      correctIndex: 1,
      explanation: 'Karena ada keterangan waktu spesifik "two days ago", kita wajib menggunakan Simple Past (Verb 2: "met").'
    },
    relatedLessonId: 'lesson-past-tense'
  },

  // 2. CONDITIONAL SENTENCES
  {
    id: 'material-conditionals',
    title: 'Conditional Sentences (Type 0, 1, 2, dan 3) Lengkap',
    subtitle: 'Panduan lengkap kalimat pengandaian nyata, kemungkinan masa depan, hingga penyesalan masa lalu',
    category: 'Grammar',
    level: 'Intermediate',
    readingTimeMinutes: 9,
    iconName: 'Sparkles',
    tags: ['Conditionals', 'If Clauses', 'Grammar', 'TOEFL', 'IELTS'],
    summary: 'Kuasai 4 jenis kalimat pengandaian (Conditionals). Pahami perbedaan antara fakta ilmiah, rencana masa depan, situasi khayalan saat ini, dan penyesalan masa lampau.',
    sections: [
      {
        heading: 'Type 0: Fakta Ilmiah & Kebenaran Umum (General Truths)',
        content: 'Digunakan saat kondisi selalu menghasilkan akibat yang pasti terjadi secara alami.',
        formula: 'If + Simple Present (V1), Simple Present (V1)',
        examples: [
          { en: 'If you heat ice, it melts.', id: 'Jika kamu memanaskan es, es itu mencair.', audioPhrase: 'If you heat ice, it melts.' },
          { en: 'Plants die if they do not get water.', id: 'Tanaman mati jika tidak mendapat air.', audioPhrase: 'Plants die if they do not get water.' }
        ]
      },
      {
        heading: 'Type 1: Kemungkinan Nyata di Masa Depan (Real Future Possibility)',
        content: 'Digunakan untuk rencana atau kondisi yang sangat mungkin terwujud di masa depan jika syaratnya terpenuhi.',
        formula: 'If + Simple Present (V1), will + Verb 1',
        examples: [
          { en: 'If it rains tomorrow, we will stay at home.', id: 'Jika besok hujan, kita akan tetap tinggal di rumah.', audioPhrase: 'If it rains tomorrow, we will stay at home.' },
          { en: 'If you study hard, you will pass the IELTS exam.', id: 'Jika kamu belajar giat, kamu akan lulus ujian IELTS.', audioPhrase: 'If you study hard, you will pass the IELTS exam.' }
        ],
        teacherTip: 'Jangan masukkan "will" di dalam klausa "if". SALAH: "If it will rain" ❌. BENAR: "If it rains" ✔️.'
      },
      {
        heading: 'Type 2: Situasi Khayalan / Tidak Nyata Saat Ini (Unreal Present)',
        content: 'Digunakan untuk mengandaikan sesuatu yang bertolak belakang dengan fakta saat ini. Catatan: Untuk to be, gunakan "were" untuk semua subjek (I, he, she, it).',
        formula: 'If + Simple Past (V2 / were), would + Verb 1',
        examples: [
          { en: 'If I were you, I would accept that job offer.', id: 'Seandainya saya adalah kamu (faktanya bukan kamu), saya akan menerima tawaran kerja itu.', audioPhrase: 'If I were you, I would accept that job offer.' },
          { en: 'If I had a million dollars, I would travel around the world.', id: 'Jika saya punya 1 juta dolar (faktanya tidak punya), saya akan keliling dunia.', audioPhrase: 'If I had a million dollars, I would travel around the world.' }
        ]
      },
      {
        heading: 'Type 3: Penyesalan Masa Lalu (Past Regret / Unreal Past)',
        content: 'Digunakan untuk membayangkan apa yang seandainya terjadi di masa lampau, padahal sudah tidak bisa diubah lagi.',
        formula: 'If + Past Perfect (had + V3), would have + Verb 3',
        examples: [
          { en: 'If I had studied harder, I would have passed the test.', id: 'Seandainya dulu saya belajar lebih giat, saya pasti sudah lulus ujian itu.', audioPhrase: 'If I had studied harder, I would have passed the test.' }
        ]
      }
    ],
    quickCheck: {
      question: 'Lengkapi kalimat Type 2: "If she ____ (know) the truth, she ____ (tell) us."',
      options: [
        'knows / will tell',
        'knew / would tell',
        'had known / would have told',
        'knew / will tell'
      ],
      correctIndex: 1,
      explanation: 'Type 2 menggunakan rumus: If + Simple Past (knew), would + Verb 1 (would tell).'
    },
    relatedLessonId: 'lesson-conditionals'
  },

  // 3. PASSIVE VOICE
  {
    id: 'material-passive-voice',
    title: 'Passive Voice Mastery: Kapan & Bagaimana Menggunakannya',
    subtitle: 'Teknik menulis kalimat pasif formal untuk esai akademis, berita, dan laporan ilmiah',
    category: 'Grammar',
    level: 'Intermediate',
    readingTimeMinutes: 6,
    iconName: 'FileText',
    tags: ['Passive Voice', 'Academic Writing', 'IELTS Writing', 'Grammar'],
    summary: 'Pelajari kapan menggunakan Passive Voice secara efektif agar tulisan esai Anda terdengar objektif, profesional, dan berstandar internasional.',
    sections: [
      {
        heading: 'Konsep Dasar: Siapa yang Menerima Aksi?',
        content: 'Dalam kalimat aktif, fokusnya adalah Pelaku (Agent). Namun dalam Passive Voice, fokus utamanya adalah Objek yang menerima perbuatan atau hasil dari aksi tersebut.',
        formula: 'Subject (Objek asli) + to be (sesuai tenses) + Verb 3 (Past Participle) + (by Agent)',
        examples: [
          { en: 'Active: The committee approved the new scholarship.', id: 'Aktif: Komite menyetujui beasiswa baru tersebut.', audioPhrase: 'The committee approved the new scholarship.' },
          { en: 'Passive: The new scholarship was approved by the committee.', id: 'Pasif: Beasiswa baru tersebut disetujui oleh komite.', audioPhrase: 'The new scholarship was approved by the committee.' }
        ]
      },
      {
        heading: 'Tabel Perubahan Tenses ke Bentuk Pasif',
        content: '• Simple Present: am/is/are + V3 (e.g., "The car is washed")\n• Simple Past: was/were + V3 (e.g., "The bridge was built in 1995")\n• Present Continuous: am/is/are + being + V3 (e.g., "A new road is being constructed")\n• Present Perfect: have/has + been + V3 (e.g., "The results have been announced")\n• Modals: modal + be + V3 (e.g., "This rule must be followed")'
      }
    ],
    quickCheck: {
      question: 'Bentuk pasif dari "Scientists discovered a new species yesterday" adalah:',
      options: [
        'A new species is discovered by scientists yesterday.',
        'A new species was discovered by scientists yesterday.',
        'A new species has been discovered by scientists yesterday.',
        'A new species was discover by scientists yesterday.'
      ],
      correctIndex: 1,
      explanation: 'Karena kalimat aktifnya adalah Simple Past ("discovered"), bentuk pasifnya menggunakan was/were + Verb 3: "was discovered".'
    },
    relatedLessonId: 'lesson-passive-voice'
  },

  // 4. TOP 30 ESSENTIAL PHRASAL VERBS
  {
    id: 'material-phrasal-verbs',
    title: 'Top 30 Essential Phrasal Verbs untuk Percakapan Natural',
    subtitle: 'Kombinasi kata kerja + preposisi yang sering digunakan penutur asli bahasa Inggris',
    category: 'Vocabulary',
    level: 'Intermediate',
    readingTimeMinutes: 8,
    iconName: 'BookOpen',
    tags: ['Phrasal Verbs', 'Vocabulary', 'Speaking', 'Idioms'],
    summary: 'Phrasal verbs adalah kunci berbicara bahasa Inggris secara alami seperti native speaker. Pelajari 30 phrasal verb paling populer lengkap dengan contoh konteks nyata.',
    sections: [
      {
        heading: '1. Phrasal Verbs dalam Aktivitas Sehari-hari',
        content: 'Kuasai kata-kata yang selalu muncul di percakapan:',
        examples: [
          { en: 'Figure out: Memahami atau menemukan solusi.', id: 'I finally figured out how to solve this math problem.', audioPhrase: 'I finally figured out how to solve this math problem.' },
          { en: 'Give up: Menyerah atau berhenti berusaha.', id: 'Never give up on your dreams, even when it gets tough.', audioPhrase: 'Never give up on your dreams.' },
          { en: 'Look forward to: Sangat menanti-nantikan.', id: 'I am really looking forward to meeting you next week.', audioPhrase: 'I am really looking forward to meeting you.' },
          { en: 'Put off: Menunda (to postpone).', id: 'Do not put off until tomorrow what you can do today.', audioPhrase: 'Do not put off until tomorrow what you can do today.' }
        ],
        teacherTip: 'Ingat bahwa "look forward to" selalu diikuti oleh kata benda atau Verb-ing! Contoh: "I look forward to hearing from you" (BUKAN "to hear").'
      },
      {
        heading: '2. Phrasal Verbs di Lingkungan Kerja & Sekolah',
        content: 'Gunakan phrasal verbs ini saat presentasi atau meeting:',
        examples: [
          { en: 'Bring up: Mengangkat topik pembicaraan.', id: 'He brought up an interesting idea during the meeting.', audioPhrase: 'He brought up an interesting idea.' },
          { en: 'Carry out: Melaksanakan atau mengeksekusi rencana/penelitian.', id: 'The medical team carried out extensive tests.', audioPhrase: 'The medical team carried out extensive tests.' },
          { en: 'Turn down: Menolak tawaran atau lamaran.', id: 'Unfortunately, she turned down the promotion because of the commute.', audioPhrase: 'She turned down the promotion.' }
        ]
      }
    ],
    quickCheck: {
      question: 'Manakah kalimat yang menggunakan bentuk yang benar?',
      options: [
        'I am looking forward to meet you.',
        'I am looking forward to meeting you.',
        'I am looking forward for meet you.',
        'I look forward to met you.'
      ],
      correctIndex: 1,
      explanation: 'Frasa "look forward to" merupakan preposisi tetap yang mewajibkan bentuk gerund (V-ing): "looking forward to meeting you".'
    },
    relatedLessonId: 'lesson-phrasal-verbs'
  },

  // 5. CONNECTED SPEECH & PRONUNCIATION
  {
    id: 'material-connected-speech',
    title: 'Connected Speech: Rahasia Mengapa Native Speaker Bicara Begitu Cepat',
    subtitle: 'Pelajari linking sounds, elision, assimilation, dan weak forms agar listening Anda melonjak',
    category: 'Pronunciation',
    level: 'Intermediate',
    readingTimeMinutes: 7,
    iconName: 'Headphones',
    tags: ['Pronunciation', 'Listening', 'Connected Speech', 'Accents'],
    summary: 'Pernah merasa native speaker berbicara terlalu cepat seperti menggumam? Kuncinya bukan pada kecepatan, melainkan aturan Connected Speech! Pelajari 4 rahasianya di sini.',
    sections: [
      {
        heading: '1. Consonant to Vowel Linking (Penyambungan Bunyi)',
        content: 'Ketika sebuah kata berakhir dengan konsonan dan kata berikutnya diawali huruf vokal, kedua kata itu diucapkan menyambung tanpa jeda.',
        examples: [
          { en: '"Pick it up" terdengar seperti /pɪ-kɪ-tʌp/', id: 'Bukan diucapkan terputus "Pick... it... up", melainkan menyambung.', audioPhrase: 'Pick it up.' },
          { en: '"Hold on" terdengar seperti /həʊl-dɒn/', id: 'Konsonan D menyambung ke vokal O.', audioPhrase: 'Hold on.' }
        ]
      },
      {
        heading: '2. Weak Forms (Kata Fungsional yang Melemah)',
        content: 'Kata-kata fungsional seperti "to", "for", "and", "of", "can" hampir tidak pernah diucapkan penuh dalam percakapan cepat.',
        examples: [
          { en: '"Cup of tea" diucapkan /kʌp əv tiː/ atau /kʌp ə tiː/', id: 'Kata "of" melemah menjadi suara schwa /ə/.', audioPhrase: 'A cup of tea.' },
          { en: '"I can do it" diucapkan /aɪ kən duː ɪt/', id: '"Can" terdengar sangat pendek sebagai /kən/, bukan /kæn/.', audioPhrase: 'I can do it.' }
        ]
      },
      {
        heading: '3. Reductions Populer (Gonna, Wanna, Gotta)',
        content: '• going to ➔ gonna\n• want to ➔ wanna\n• have got to ➔ gotta\n• should have ➔ shoulda / should\'ve\nIni adalah pola percakapan informal sehari-hari yang wajib dipahami di tes Listening IELTS/TOEFL!'
      }
    ],
    quickCheck: {
      question: 'Dalam kalimat "Turn on the light", bagaimana kata "Turn on" dilafalkan oleh native speaker?',
      options: [
        'Terputus dengan jeda: "Turn" (jeda) "on"',
        'Tersambung halus: "Tur-non"',
        'Hanya huruf vokal yang diucapkan',
        'Kata "on" dihilangkan'
      ],
      correctIndex: 1,
      explanation: 'Aturan Consonant-to-Vowel linking menyambungkan konsonan akhir "n" pada "Turn" langsung ke vokal "o" pada "on", menghasilkan bunyi "Tur-non".'
    },
    relatedLessonId: 'lesson-listening-essentials'
  },

  // 6. IELTS & TOEFL ESSAY WRITING FORMULA
  {
    id: 'material-writing-strategies',
    title: 'Formula Menulis Esai 4 Paragraf untuk IELTS Band 7.5 & TOEFL',
    subtitle: 'Struktur baku penulisan argumen, cohesive devices, dan kosakata tingkat tinggi',
    category: 'Writing',
    level: 'Advanced',
    readingTimeMinutes: 10,
    iconName: 'Award',
    tags: ['IELTS Writing', 'TOEFL iBT', 'Essay', 'Advanced'],
    summary: 'Dapatkan cetak biru (blueprint) menulis esai opini akademis 250 kata dengan struktur yang rapi, transisi yang logis, dan tata bahasa tingkat lanjut.',
    sections: [
      {
        heading: 'Struktur 4 Paragraf yang Terbukti Efektif',
        content: '1. Paragraph 1: Introduction (Paraphrase the prompt + Thesis statement)\n2. Paragraph 2: Body Paragraph 1 (Topic sentence + Explanation + Concrete Example)\n3. Paragraph 3: Body Paragraph 2 (Second point / Counter-argument + Explanation + Result)\n4. Paragraph 4: Conclusion (Restate thesis statement + Final concluding thought)',
        teacherTip: 'Jangan pernah menghafal template kaku seluruh paragraf! Hafalkan struktur logisnya dan variasi transitional words (Furthermore, Consequently, In stark contrast).'
      },
      {
        heading: 'Transitional Linking Words yang Mendongkrak Nilai Cohesion',
        content: '• Menambah ide: Furthermore, In addition, Moreover, Not only that, but...\n• Menunjukkan kontras: However, On the contrary, Despite this, Conversely\n• Menunjukkan sebab-akibat: Consequently, As a result, Therefore, Hence\n• Memberi contoh: For instance, To illustrate, A prime example of this is...'
      }
    ],
    quickCheck: {
      question: 'Apa fungsi utama dari kalimat tesis (Thesis Statement) di paragraf pembuka esai?',
      options: [
        'Menuliskan biodata penulis esai',
        'Menyatakan posisi dan poin utama argumen penulis secara jelas dan ringkas',
        'Menghitung jumlah kata dalam esai',
        'Menyalin soal kata demi kata tanpa parafrasa'
      ],
      correctIndex: 1,
      explanation: 'Thesis statement di akhir paragraf pembuka berfungsi memberi tahu penguji posisi/jawaban penulis terhadap pertanyaan esai.'
    },
    relatedLessonId: 'lesson-reading-mastery'
  }
];
