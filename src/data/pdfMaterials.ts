export interface PdfPageSection {
  heading: string;
  text: string;
  formula?: string;
  table?: {
    headers: string[];
    rows: string[][];
  };
  bulletPoints?: string[];
  examples?: Array<{ en: string; id: string }>;
  warningOrTip?: string;
}

export interface PdfPageContent {
  pageNumber: number;
  title: string;
  subtitle?: string;
  sections: PdfPageSection[];
}

export interface PdfDocumentData {
  id: string;
  title: string;
  documentCode: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  cefr: string;
  topic: string;
  totalPages: number;
  estimatedReadTimeMinutes: number;
  author: string;
  summary: string;
  pages: PdfPageContent[];
}

export const PDF_MATERIALS: Record<string, PdfDocumentData> = {
  // 1. BEGINNER GRAMMAR PDF
  'pdf-beginner-grammar': {
    id: 'pdf-beginner-grammar',
    title: 'Modul Teori PDF: Tata Bahasa Dasar & Pola Kalimat Bahasa Inggris',
    documentCode: 'ENG-MOD-A1-001',
    level: 'Beginner',
    cefr: 'A1 - A2',
    topic: 'Sentence Structure, Pronouns & Simple Tenses',
    totalPages: 3,
    estimatedReadTimeMinutes: 8,
    author: 'Englicious Curriculum Team (Author: Sultan)',
    summary: 'Panduan cetak komprehensif mengenai struktur dasar kalimat bahasa Inggris S-V-O, penggunaan kata ganti (pronouns), serta perbedaan Simple Present dan Simple Past tense.',
    pages: [
      {
        pageNumber: 1,
        title: 'Halaman 1: Struktur Kalimat Dasar S-V-O & Pronoun Matrix',
        subtitle: 'Pondasi utama menyusun kalimat bahasa Inggris yang alami dan benar',
        sections: [
          {
            heading: '1. Aturan Susunan Kalimat Baku (S + V + O)',
            text: 'Kalimat bahasa Inggris paling dasar wajib memiliki minimal Subjek (Subject) dan Kata Kerja (Verb). Jika kata kerja membutuhkan objek, tambahkan Object di belakangnya.',
            formula: 'Positive (+): Subject + Verb + Object / Complement\nNegative (-): Subject + Auxiliary (do/does/is/am/are) + not + Verb\nQuestion (?): Auxiliary + Subject + Verb + Object?',
            examples: [
              { en: 'Sultan studies English every day.', id: 'Sultan belajar bahasa Inggris setiap hari.' },
              { en: 'They do not watch television on weekdays.', id: 'Mereka tidak menonton televisi di hari kerja.' },
              { en: 'Do you understand this grammar rule?', id: 'Apakah kamu memahami aturan tata bahasa ini?' }
            ],
            warningOrTip: 'Jangan pernah membuat kalimat tanpa kata kerja! Contoh salah: "She beautiful" ❌. Yang benar: "She is beautiful" ✔️ (menggunakan to be sebagai kata kerja bantu).'
          },
          {
            heading: '2. Matriks Kata Ganti (Pronouns Matrix)',
            text: 'Tabel referensi lengkap perubahan kata ganti dari Subjek ke Objek dan Kepemilikan (Possessive):',
            table: {
              headers: ['Subject Pronoun', 'Object Pronoun', 'Possessive Adjective', 'Possessive Pronoun'],
              rows: [
                ['I (Saya)', 'me', 'my (book)', 'mine (milik saya)'],
                ['You (Kamu)', 'you', 'your (book)', 'yours'],
                ['He (Dia lk)', 'him', 'his (book)', 'his'],
                ['She (Dia pr)', 'her', 'her (book)', 'hers'],
                ['It (Benda/hewan)', 'it', 'its (color)', 'its'],
                ['We (Kami/Kita)', 'us', 'our (book)', 'ours'],
                ['They (Mereka)', 'them', 'their (book)', 'theirs']
              ]
            }
          }
        ]
      },
      {
        pageNumber: 2,
        title: 'Halaman 2: Simple Present Tense vs. Present Continuous Tense',
        subtitle: 'Membedakan kebiasaan rutin vs. kejadian yang sedang berlangsung sekarang',
        sections: [
          {
            heading: '1. Simple Present Tense (Habits & Facts)',
            text: 'Digunakan untuk fakta umum, kebiasaan sehari-hari, dan rutinitas berulang.',
            formula: 'He / She / It ➔ Verb 1 + s/es (Contoh: He works, She teaches, It rains)\nI / You / We / They ➔ Verb 1 murni (Contoh: I work, They teach)',
            bulletPoints: [
              'Sinyal waktu: always, usually, often, sometimes, rarely, every morning/week.',
              'Fakta ilmiah: The sun rises in the east (Matahari terbit di timur).'
            ],
            examples: [
              { en: 'My sister always drinks a glass of warm milk before bed.', id: 'Saudara perempuan saya selalu minum segelas susu hangat sebelum tidur.' }
            ]
          },
          {
            heading: '2. Present Continuous Tense (Action in Progress)',
            text: 'Digunakan untuk kegiatan yang sedang dilakukan saat ini pada detik berbicara.',
            formula: 'Subject + to be (am / is / are) + Verb-ing',
            bulletPoints: [
              'Sinyal waktu wajib: right now, at the moment, currently, Listen!, Look!.',
              'Contoh: Look! The children are playing football in the school yard.'
            ],
            warningOrTip: 'Stative Verbs (kata kerja perasaan & pikiran seperti: know, believe, like, love, understand) TIDAK BOLEH dijadikan bentuk -ing! Contoh salah: "I am knowing you" ❌. Yang benar: "I know you" ✔️.'
          }
        ]
      },
      {
        pageNumber: 3,
        title: 'Halaman 3: Tabel 30 Irregular Verbs Esensial & Latihan Mandiri',
        subtitle: 'Daftar kata kerja tidak beraturan paling sering muncul di ujian sekolah',
        sections: [
          {
            heading: 'Daftar 30 Kata Kerja Tidak Beraturan Paling Populer',
            text: 'Hafalkan bentuk V1 (Present), V2 (Past), dan V3 (Past Participle) berikut:',
            table: {
              headers: ['Verb 1 (Base)', 'Verb 2 (Past)', 'Verb 3 (Participle)', 'Arti Indonesia'],
              rows: [
                ['go', 'went', 'gone', 'pergi'],
                ['eat', 'ate', 'eaten', 'makan'],
                ['see', 'saw', 'seen', 'melihat'],
                ['write', 'wrote', 'written', 'menulis'],
                ['buy', 'bought', 'bought', 'membeli'],
                ['take', 'took', 'taken', 'mengambil'],
                ['speak', 'spoke', 'spoken', 'berbicara'],
                ['read /riːd/', 'read /red/', 'read /red/', 'membaca'],
                ['drive', 'drove', 'driven', 'mengemudi'],
                ['begin', 'began', 'begun', 'memulai']
              ]
            },
            warningOrTip: 'Tips Guru: Kelompokkan kata kerja dengan pola perubahan berirama seperti: sing - sang - sung, drink - drank - drunk, swim - swam - swum!'
          }
        ]
      }
    ]
  },

  // 2. BEGINNER PHONICS & PRONUNCIATION PDF
  'pdf-beginner-phonics': {
    id: 'pdf-beginner-phonics',
    title: 'Modul Teori PDF: Fonetik Simbol IPA & Panduan Pelafalan Penutur Asli',
    documentCode: 'ENG-MOD-A1-002',
    level: 'Beginner',
    cefr: 'A1 - A2',
    topic: 'Pronunciation, Phonics & Accent Reduction',
    totalPages: 2,
    estimatedReadTimeMinutes: 6,
    author: 'Englicious Curriculum Team (Author: Sultan)',
    summary: 'Kuasai aturan pelafalan akhiran -ed (t/d/id), akhiran -s, serta simbol fonetik International Phonetic Alphabet (IPA) untuk berbicara dengan aksen jelas dan percaya diri.',
    pages: [
      {
        pageNumber: 1,
        title: 'Halaman 1: Aturan Pelafalan Akhiran Lampau "-ed"',
        subtitle: 'Tiga cara pengucapan akhiran -ed yang wajib diketahui setiap siswa',
        sections: [
          {
            heading: 'Kapan -ed dibaca /t/, /d/, atau /ɪd/?',
            text: 'Akhiran -ed tidak selalu dibaca "ed"! Bunyinya ditentukan oleh huruf konsonan sebelum akhiran tersebut.',
            table: {
              headers: ['Bunyi Akhiran', 'Aturan Konsonan Terakhir', 'Contoh Kata & Cara Baca'],
              rows: [
                ['/ɪd/ (Extra syllable)', 'Jika berakhiran bunyi /t/ atau /d/', 'Wanted (/wɒn.tɪd/), Needed (/niː.dɪd/)'],
                ['/t/ (Voiceless)', 'Jika berakhiran p, k, f, s, sh, ch', 'Watched (/wɒtʃt/), Laughed (/lɑːft/), Stopped (/stɒpt/)'],
                ['/d/ (Voiced)', 'Jika berakhiran bunyi vokal atau b, g, v, z, m, n, l, r', 'Played (/pleɪd/), Loved (/lʌvd/), Cleaned (/kliːnd/)']
              ]
            },
            warningOrTip: 'Hanya kata yang berakhiran bunyi T atau D yang menambahkan suku kata baru! Kata "watched" diucapkan SATU suku kata (/wɒtʃt/), bukan "wat-ched"!'
          }
        ]
      },
      {
        pageNumber: 2,
        title: 'Halaman 2: Pelafalan Huruf "TH" & Aturan Silent Letters',
        subtitle: 'Mengatasi kesulitan paling umum pembelajar Indonesia',
        sections: [
          {
            heading: '1. Dua Bunyi Huruf "TH": Voiceless /θ/ vs Voiced /ð/',
            text: 'Tempatkan ujung lidah di antara gigi atas dan gigi bawah, lalu hembuskan udara:',
            bulletPoints: [
              'Voiceless /θ/ (tanpa getaran pita suara): Think, Thank, Three, Birthday, Earth.',
              'Voiced /ð/ (disertai getaran pita suara di leher): This, That, These, Father, Together.'
            ],
            examples: [
              { en: 'I think that this is their father.', id: 'Saya rasa bahwa ini adalah ayah mereka.' }
            ]
          },
          {
            heading: '2. Daftar Huruf Bisu (Silent Letters) Populer',
            text: 'Huruf-huruf berikut TIDAK diucapkan dalam bahasa Inggris baku:',
            bulletPoints: [
              'Silent K: Knife (/naɪf/), Know (/noʊ/), Knee (/niː/).',
              'Silent W: Write (/raɪt/), Wrong (/rɒŋ/), Answer (/ˈæn.sər/).',
              'Silent B: Doubt (/daʊt/), Debt (/det/), Comb (/koʊm/).',
              'Silent L: Half (/hæf/), Calm (/kɑːm/), Walk (/wɔːk/).'
            ]
          }
        ]
      }
    ]
  },

  // 3. INTERMEDIATE CONDITIONALS & PASSIVE VOICE PDF
  'pdf-intermediate-grammar': {
    id: 'pdf-intermediate-grammar',
    title: 'Modul Teori PDF: Conditionals Type 0-3 & Passive Voice Masterclass',
    documentCode: 'ENG-MOD-B1-001',
    level: 'Intermediate',
    cefr: 'B1 - B2',
    topic: 'Advanced Tenses, Hypotheses & Passive Voice',
    totalPages: 3,
    estimatedReadTimeMinutes: 10,
    author: 'Englicious Curriculum Team (Author: Sultan)',
    summary: 'Modul komprehensif mengenai kalimat pengandaian (Conditionals Type 0, 1, 2, 3), kalimat pasif (Passive Voice) di seluruh tenses, serta trik menjawab soal TOEFL/IELTS.',
    pages: [
      {
        pageNumber: 1,
        title: 'Halaman 1: Rangkuman Lengkap Conditionals Type 0, 1, 2, dan 3',
        subtitle: 'Rumus baku, makna situasi, dan pola waktu klausanya',
        sections: [
          {
            heading: 'Tabel Komparasi 4 Tipe Kalimat Pengandaian',
            text: 'Gunakan tabel di bawah ini sebagai lembar contekan cepat saat belajar:',
            table: {
              headers: ['Tipe', 'Klausa IF (Syarat)', 'Klausa Hasil (Result)', 'Fakta Sebenarnya'],
              rows: [
                ['Type 0', 'If + Simple Present (V1)', 'Simple Present (V1)', 'Hukum alam & fakta ilmiah mutlak'],
                ['Type 1', 'If + Simple Present (V1)', 'will / can + Verb 1', 'Kemungkinan nyata di masa depan'],
                ['Type 2', 'If + Simple Past (V2/were)', 'would / could + Verb 1', 'Khayalan berlawanan dengan masa kini'],
                ['Type 3', 'If + Past Perfect (had V3)', 'would have + Verb 3', 'Penyesalan kejadian masa lampau']
              ]
            },
            warningOrTip: 'Pada Conditional Type 2 formal, SELALU gunakan "were" untuk semua subjek (termasuk I, he, she, it): "If I were you, I would take the scholarship" ✔️.'
          }
        ]
      },
      {
        pageNumber: 2,
        title: 'Halaman 2: Formula Passive Voice di 8 Tenses Berbeda',
        subtitle: 'Mengubah fokus dari pelaku tindakan ke objek penerima tindakan',
        sections: [
          {
            heading: 'Rumus Umum: Subject + to be (sesuai tenses) + Verb 3 (Past Participle)',
            text: 'Perhatikan transformasi kata kerja bantu "to be" pada tabel berikut:',
            table: {
              headers: ['Tenses', 'Bentuk Aktif (Active)', 'Bentuk Pasif (Passive)'],
              rows: [
                ['Simple Present', 'The chef prepares the meal.', 'The meal is prepared by the chef.'],
                ['Present Continuous', 'They are renovating the hall.', 'The hall is being renovated.'],
                ['Simple Past', 'Sultan built this interactive app.', 'This interactive app was built by Sultan.'],
                ['Past Continuous', 'She was typing the report.', 'The report was being typed.'],
                ['Present Perfect', 'We have completed 20 lessons.', '20 lessons have been completed.'],
                ['Modal Verbs', 'Students must submit the paper.', 'The paper must be submitted.']
              ]
            }
          }
        ]
      },
      {
        pageNumber: 3,
        title: 'Halaman 3: Soal Analisis Ujian & Tips Menjawab Cepat',
        subtitle: 'Strategi menjawab soal Structure TOEFL iBT & IELTS',
        sections: [
          {
            heading: 'Trik Mengenali Passive Voice di Ujian',
            text: 'Jika subjek di awal kalimat adalah benda mati (seperti: the bridge, the document, the software), hampir 90% kalimat tersebut memerlukan kata kerja PASIF (be + Verb 3).',
            examples: [
              { en: 'The new bridge was designed by renowned architects last year.', id: 'Jembatan baru tersebut dirancang oleh arsitek terkemuka tahun lalu.' }
            ],
            warningOrTip: 'Hati-hati dengan kata kerja intransitif (tidak butuh objek seperti: happen, occur, arrive, disappear). Kata kerja ini TIDAK PERNAH bisa dipasifkan! Contoh salah: "The accident was happened" ❌. Yang benar: "The accident happened" ✔️.'
          }
        ]
      }
    ]
  },

  // 4. INTERMEDIATE PHRASAL VERBS & IDIOMS PDF
  'pdf-intermediate-phrasal': {
    id: 'pdf-intermediate-phrasal',
    title: 'Modul Teori PDF: Buku Saku 50 Phrasal Verbs & 25 Idiom Kolokial',
    documentCode: 'ENG-MOD-B1-002',
    level: 'Intermediate',
    cefr: 'B1 - B2',
    topic: 'Colloquial English, Multi-word Verbs & Idioms',
    totalPages: 2,
    estimatedReadTimeMinutes: 7,
    author: 'Englicious Curriculum Team (Author: Sultan)',
    summary: 'Buku saku praktis memuat 50 phrasal verbs paling sering dipakai di lingkungan kantor, kampus, dan percakapan sehari-hari lengkap dengan contoh kalimat kontekstual.',
    pages: [
      {
        pageNumber: 1,
        title: 'Halaman 1: Top 25 Phrasal Verbs Keseharian & Karir',
        subtitle: 'Kombinasi kata kerja + preposisi yang mengubah makna secara drastis',
        sections: [
          {
            heading: 'Daftar Phrasal Verbs Esensial',
            text: 'Gunakan frasa ini agar percakapan terdengar luwes selayaknya penutur asli:',
            table: {
              headers: ['Phrasal Verb', 'Makna Formal Inggris', 'Arti Indonesia', 'Contoh Kalimat'],
              rows: [
                ['Figure out', 'Understand / Solve', 'Menemukan solusi / memahami', 'I finally figured out how to solve the problem.'],
                ['Give up', 'Quit / Surrender', 'Menyerah / berhenti', 'Never give up on your learning goals!'],
                ['Look forward to', 'Anticipate with joy', 'Sangat menanti-nanti', 'I look forward to meeting your teacher.'],
                ['Call off', 'Cancel', 'Membatalkan', 'They called off the outdoor sports match.'],
                ['Put off', 'Postpone / Delay', 'Menunda', 'Do not put off your English practice today.'],
                ['Run out of', 'Deplete supply', 'Kehabisan pasokan', 'We ran out of coffee this morning.'],
                ['Catch up with', 'Reach same level', 'Menyusul ketertinggalan', 'I need to catch up with my class modules.']
              ]
            }
          }
        ]
      },
      {
        pageNumber: 2,
        title: 'Halaman 2: 25 Idiom Bahasa Inggris Populer di Ujian',
        subtitle: 'Ungkapan figuratif yang mendongkrak skor Lexical Resource',
        sections: [
          {
            heading: 'Tabel Idiom Terpopuler',
            text: 'Pelajari makna kiasannya dan hindari menerjemahkan kata demi kata:',
            table: {
              headers: ['Idiom', 'Makna Asli', 'Contoh Penggunaan'],
              rows: [
                ['Piece of cake', 'Sangat mudah dilakukan', 'The grammar exam was a piece of cake.'],
                ['Break a leg', 'Semoga sukses berprestasi', 'Break a leg on your speaking presentation!'],
                ['Bite the bullet', 'Menghadapi kesulitan dengan tegar', 'He bit the bullet and took the difficult mock exam.'],
                ['Under the weather', 'Sedang agak sakit / kurang fit', 'She stayed home because she felt under the weather.'],
                ['See eye to eye', 'Sepakat / sependapat seutuhnya', 'We finally saw eye to eye on the project deadline.']
              ]
            }
          }
        ]
      }
    ]
  },

  // 5. ADVANCED ACADEMIC WRITING PDF
  'pdf-advanced-academic': {
    id: 'pdf-advanced-academic',
    title: 'Modul Teori PDF: Formula Esai Akademik IELTS Band 8.0 & Inversion',
    documentCode: 'ENG-MOD-C1-001',
    level: 'Advanced',
    cefr: 'C1 - C2',
    topic: 'Academic Writing, Cohesion & Stylistic Inversion',
    totalPages: 3,
    estimatedReadTimeMinutes: 12,
    author: 'Englicious Curriculum Team (Author: Sultan)',
    summary: 'Cetak biru menulis esai akademis 250 kata, tata kalimat tingkat lanjut (Inversion, Fronting, Cleft sentences), serta cohesive transitional devices untuk mencapai IELTS Band 8+.',
    pages: [
      {
        pageNumber: 1,
        title: 'Halaman 1: Struktur Esai Akademik 4 Paragraf Standar IELTS/TOEFL',
        subtitle: 'Cetak biru penulisan esai argumentatif yang dinilai tinggi oleh penguji',
        sections: [
          {
            heading: 'Anatomi Esai 250 Kata',
            text: 'Pola 4 paragraf adalah struktur paling teruji dalam ujian sertifikasi internasional:',
            bulletPoints: [
              'Paragraf 1 (Introduction - 40 kata): 1 kalimat parafrasa soal (paraphrase) + 1 kalimat tesis (thesis statement yang menyatakan posisi penulis).',
              'Paragraf 2 (Body 1 - 90 kata): Topic sentence 1 + Elaborasi penjelasan mendalam + 1 Contoh konkrit nyata (concrete real-world example).',
              'Paragraf 3 (Body 2 - 90 kata): Topic sentence 2 (sudut pandang lain/penguat) + Elaborasi + Dampak/akibat nyata.',
              'Paragraf 4 (Conclusion - 35 kata): Menyatakan kembali tesis dengan kata berbeda (restatement) + Pandangan penutup ke masa depan.'
            ]
          }
        ]
      },
      {
        pageNumber: 2,
        title: 'Halaman 2: Tata Bahasa C1: Inversion & Emphatic Structures',
        subtitle: 'Membalikkan susunan kata untuk memberi penekanan gaya bahasa tinggi',
        sections: [
          {
            heading: 'Aturan Inversion dengan Kata Keterangan Negatif',
            text: 'Ketika kalimat diawali oleh adverb negatif/restriktif (Never, Rarely, Seldom, Hardly, Under no circumstances, Not only), susunan kalimat dibalik seperti kalimat tanya:',
            formula: 'Negative Adverb + Auxiliary Verb (did / have / will / should) + Subject + Main Verb',
            examples: [
              { en: 'Rarely have I witnessed such profound dedication to interactive learning.', id: 'Jarang sekali saya menyaksikan dedikasi sedalam itu terhadap pembelajaran interaktif.' },
              { en: 'Under no circumstances should students share their private credentials.', id: 'Dalam keadaan apapun siswa tidak boleh membagikan kredensial pribadi mereka.' },
              { en: 'Not only did she pass the TOEFL exam, but she also earned the highest scholarship.', id: 'Tidak hanya dia lulus ujian TOEFL, tetapi dia juga meraih beasiswa tertinggi.' }
            ],
            warningOrTip: 'Penggunaan 1 struktur Inversion yang tepat di Body Paragraph esai secara langsung membuktikan penguasaan tata bahasa kompleks C1/C2 kepada penguji!'
          }
        ]
      },
      {
        pageNumber: 3,
        title: 'Halaman 3: Bank Cohesive Devices & Transisi Antar Paragraf',
        subtitle: 'Kosakata penghubung ide tingkat lanjut (Advanced Linking Words)',
        sections: [
          {
            heading: 'Tabel Pengelompokan Transitional Devices',
            text: 'Variasikan kata transisi agar esai mengalir dengan kohesif dan elegan:',
            table: {
              headers: ['Fungsi Transisi', 'Frasa Tingkat Lanjut (Band 8+)', 'Contoh Kalimat'],
              rows: [
                ['Menambah argumen', 'Furthermore, Moreover, In addition, Not to mention', 'Furthermore, empirical evidence demonstrates substantial cognitive gains.'],
                ['Menunjukkan kontras', 'Conversely, In stark contrast, However, On the other hand', 'Conversely, opponents argue that digital screens cause unnecessary fatigue.'],
                ['Menyatakan akibat', 'Consequently, Thus, Hence, As an inevitable consequence', 'Consequently, governments must enact decisive environmental legislation.'],
                ['Memberikan contoh', 'A compelling illustration of this is, For instance, To exemplify', 'A compelling illustration of this is Singapore\'s urban green policy.']
              ]
            }
          }
        ]
      }
    ]
  },

  // 6. ADVANCED SPEAKING & FORMAL DEBATE PDF
  'pdf-advanced-speaking': {
    id: 'pdf-advanced-speaking',
    title: 'Modul Teori PDF: Panduan Debat, Diskusi Formal & IELTS Speaking Mastery',
    documentCode: 'ENG-MOD-C1-002',
    level: 'Advanced',
    cefr: 'C1 - C2',
    topic: 'Fluency, Public Speaking, Nuance & Debate',
    totalPages: 2,
    estimatedReadTimeMinutes: 8,
    author: 'Englicious Curriculum Team (Author: Sultan)',
    summary: 'Strategi menjawab pertanyaan spontan Speaking Part 1, teknik berbicara monolog 2 menit Part 2 dengan storytelling, serta teknik debat argumen abstrak Part 3.',
    pages: [
      {
        pageNumber: 1,
        title: 'Halaman 1: Teknik Storytelling 2 Menit (The Cue Card Mastery)',
        subtitle: 'Menguasai IELTS Speaking Part 2 tanpa jeda hening',
        sections: [
          {
            heading: 'Formula P.P.F (Past - Present - Future)',
            text: 'Jika Anda kehabisan ide saat berbicara monolog 2 menit, perluas rentang waktu topik Anda:',
            bulletPoints: [
              'Past: Ceritakan bagaimana Anda pertama kali mengenal orang/benda/tempat tersebut di masa lalu.',
              'Present: Jelaskan kondisi atau interaksi Anda saat ini dengan detail sensorik.',
              'Future: Sampaikan harapan atau rencana Anda di masa depan terkait hal tersebut.'
            ],
            examples: [
              { en: 'Initially, five years ago, I barely understood coding. Nowadays, I develop web apps daily.', id: 'Awalnya, lima tahun lalu, saya hampir tidak paham coding. Sekarang, saya mengembangkan aplikasi web setiap hari.' }
            ]
          }
        ]
      },
      {
        pageNumber: 2,
        title: 'Halaman 2: Menjawab Pertanyaan Abstrak & Diplomatis Part 3',
        subtitle: 'Frasa pelembut (hedging) untuk menyampaikan argumen yang berimbang',
        sections: [
          {
            heading: 'Gunakan Hedging Language untuk Menghindari Klaim Mutlak',
            text: 'Penutur berpendidikan tinggi tidak pernah membuat klaim 100% mutlak. Gunakan kata pereda (hedges):',
            bulletPoints: [
              '"It appears to me that..." (Tampaknya bagi saya bahwa...)',
              '"It is widely acknowledged that..." (Diakui secara luas bahwa...)',
              '"Evidence suggests that there is a tendency to..." (Bukti menunjukkan kecenderungan untuk...)',
              '"While that may hold true in certain contexts, one must also account for..." (Meskipun hal itu benar dalam beberapa konteks, kita juga harus memperhitungkan...)'
            ]
          }
        ]
      }
    ]
  }
};
