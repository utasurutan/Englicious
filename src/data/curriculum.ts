import { SkillCategory } from '../types';

export interface PathNode {
  id: string;
  lessonId: string;
  title: string;
  category: SkillCategory;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  status: 'completed' | 'current' | 'locked';
  progress: number;
  xpReward: number;
  description: string;
  iconName: string;
  nodeType?: 'lesson' | 'pdf-document';
  pdfMaterialId?: string;
  questionsCount?: number;
}

export interface LevelCurriculum {
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  cefr: string;
  title: string;
  subtitle: string;
  description: string;
  milestoneTitle: string;
  nodes: PathNode[];
}

export const CURRICULA: Record<'Beginner' | 'Intermediate' | 'Advanced', LevelCurriculum> = {
  Beginner: {
    level: 'Beginner',
    cefr: 'A1 - A2',
    title: 'Foundations & Everyday Fluency',
    subtitle: 'Dari nol hingga percakapan sehari-hari yang percaya diri',
    description: 'Bangun penguasaan kosakata dasar, pola kalimat baku S-V-O, 3D visual vocabulary, modul teori PDF, dan listening esensial (20+ latihan per bagian).',
    milestoneTitle: 'A2 Breakthrough Comprehensive Exam',
    nodes: [
      {
        id: 'node-b1',
        lessonId: 'lesson-vocab-foundations',
        title: 'Grammar Foundations',
        category: 'Grammar',
        level: 'Beginner',
        status: 'completed',
        progress: 100,
        xpReward: 65,
        description: 'Subject pronouns, kata kerja "to be", artikel a/an, dan kalimat dasar present (20 soal).',
        iconName: 'BookOpen',
        questionsCount: 20
      },
      {
        id: 'node-b2',
        lessonId: 'lesson-visual-objects',
        title: '3D Visual Objects Vocabulary',
        category: 'Vocabulary',
        level: 'Beginner',
        status: 'completed',
        progress: 100,
        xpReward: 90,
        description: 'Identifikasi 15 objek 3D vektor interaktif, audio native, fonetik IPA, dan mode susun huruf (20 soal).',
        iconName: 'Sparkles',
        questionsCount: 20
      },
      {
        id: 'node-b3-pdf',
        lessonId: 'pdf-beginner-grammar',
        title: '📖 Modul Teori PDF: Tata Bahasa Dasar & Tenses',
        category: 'Grammar',
        level: 'Beginner',
        status: 'completed',
        progress: 100,
        xpReward: 50,
        description: 'E-Book modul teori PDF: Struktur kalimat S-V-O, matriks pronoun, dan tabel 30 irregular verbs.',
        iconName: 'FileText',
        nodeType: 'pdf-document',
        pdfMaterialId: 'pdf-beginner-grammar'
      },
      {
        id: 'node-b4',
        lessonId: 'lesson-vocab-foundations',
        title: 'Everyday Essential Vocabulary',
        category: 'Vocabulary',
        level: 'Beginner',
        status: 'current',
        progress: 75,
        xpReward: 75,
        description: 'Kosakata frekuensi tinggi untuk rutinitas, waktu, belanja, dan benda sekolah (20 soal).',
        iconName: 'Layers',
        questionsCount: 20
      },
      {
        id: 'node-b5',
        lessonId: 'lesson-speaking-fluency',
        title: 'Basic Conversations & Dialogues',
        category: 'Speaking',
        level: 'Beginner',
        status: 'current',
        progress: 40,
        xpReward: 75,
        description: 'Berkenalan, memesan makanan di kafe, dan menanyakan arah secara alami (20 soal).',
        iconName: 'MessageCircle',
        questionsCount: 20
      },
      {
        id: 'node-b6',
        lessonId: 'lesson-listening-essentials',
        title: 'Listening Essentials & Sound Waveforms',
        category: 'Listening',
        level: 'Beginner',
        status: 'locked',
        progress: 0,
        xpReward: 80,
        description: 'Memahami angka, tanggal, waktu, dan instruksi penutur asli melalui gelombang audio (20 soal).',
        iconName: 'Headphones',
        questionsCount: 20
      },
      {
        id: 'node-b7-pdf',
        lessonId: 'pdf-beginner-phonics',
        title: '📑 Modul Teori PDF: Fonetik IPA & Pengucapan',
        category: 'Speaking',
        level: 'Beginner',
        status: 'locked',
        progress: 0,
        xpReward: 50,
        description: 'E-Book modul teori PDF: 44 simbol fonetik IPA, aturan pelafalan akhiran -ed dan -s.',
        iconName: 'FileText',
        nodeType: 'pdf-document',
        pdfMaterialId: 'pdf-beginner-phonics'
      },
      {
        id: 'node-b8',
        lessonId: 'lesson-past-tense',
        title: 'Sentence Builder & Drag-and-Drop',
        category: 'Grammar',
        level: 'Beginner',
        status: 'locked',
        progress: 0,
        xpReward: 85,
        description: 'Latihan drag-and-drop interaktif menyusun kata menjadi kalimat bahasa Inggris yang utuh (20 soal).',
        iconName: 'Compass',
        questionsCount: 20
      },
      {
        id: 'node-b9',
        lessonId: 'lesson-reading-mastery',
        title: 'Reading Signs, Menus & Stories',
        category: 'Reading',
        level: 'Beginner',
        status: 'locked',
        progress: 0,
        xpReward: 85,
        description: 'Membaca tanda peringatan umum, menu kafe, email informal, dan cerita budaya pendek (20 soal).',
        iconName: 'BookOpen',
        questionsCount: 20
      },
      {
        id: 'node-b10',
        lessonId: 'lesson-checkpoint-b',
        title: 'A2 Mastery Certification Exam',
        category: 'Grammar',
        level: 'Beginner',
        status: 'locked',
        progress: 0,
        xpReward: 120,
        description: 'Ujian komprehensif 20 soal menguji penguasaan seluruh materi level Beginner sebelum naik ke B1.',
        iconName: 'Award',
        questionsCount: 20
      }
    ]
  },
  Intermediate: {
    level: 'Intermediate',
    cefr: 'B1 - B2',
    title: 'Independence & Professional Confidence',
    subtitle: 'Mengekspresikan pikiran bernuansa dan persiapan tes internasional',
    description: 'Menjembatani kemampuan percakapan santai ke kefasihan akademik dan kerja. Tenses lampau, conditionals, passive voice, dan modul PDF.',
    milestoneTitle: 'B2 Independent Speaker Test',
    nodes: [
      {
        id: 'node-i1',
        lessonId: 'lesson-past-tense',
        title: 'Past Tense & Narrative Mastery',
        category: 'Grammar',
        level: 'Intermediate',
        status: 'current',
        progress: 72,
        xpReward: 80,
        description: 'Irregular verbs, past continuous vs simple past, time markers, dan bercerita lampau (20 soal).',
        iconName: 'Clock',
        questionsCount: 20
      },
      {
        id: 'node-i2',
        lessonId: 'lesson-listening-essentials',
        title: 'Fast Speech, Reductions & Audio Lab',
        category: 'Listening',
        level: 'Intermediate',
        status: 'current',
        progress: 35,
        xpReward: 75,
        description: 'Gotta, gonna, wanna, elisions, dan ritme bicara cepat penutur asli (20 soal audio).',
        iconName: 'Headphones',
        questionsCount: 20
      },
      {
        id: 'node-i3',
        lessonId: 'lesson-phrasal-verbs',
        title: 'Phrasal Verbs & Drag Sorting',
        category: 'Vocabulary',
        level: 'Intermediate',
        status: 'current',
        progress: 40,
        xpReward: 90,
        description: 'Separable particles, category sorting, dan ungkapan percakapan sehari-hari (20 soal).',
        iconName: 'Layers',
        questionsCount: 20
      },
      {
        id: 'node-i4-pdf',
        lessonId: 'pdf-intermediate-grammar',
        title: '📖 Modul Teori PDF: Conditionals & Passive Voice',
        category: 'Grammar',
        level: 'Intermediate',
        status: 'current',
        progress: 50,
        xpReward: 50,
        description: 'E-Book modul teori PDF: Formula Conditionals Type 0-3, tabel Passive Voice di 8 tenses.',
        iconName: 'FileText',
        nodeType: 'pdf-document',
        pdfMaterialId: 'pdf-intermediate-grammar'
      },
      {
        id: 'node-i5',
        lessonId: 'lesson-conditionals',
        title: 'Conditionals & Hypotheses Builder',
        category: 'Grammar',
        level: 'Intermediate',
        status: 'current',
        progress: 20,
        xpReward: 85,
        description: 'Latihan mendalam Zero, First, Second, dan Third conditionals dengan drag & drop builder (20 soal).',
        iconName: 'Compass',
        questionsCount: 20
      },
      {
        id: 'node-i6',
        lessonId: 'lesson-passive-voice',
        title: 'Passive Voice in Action',
        category: 'Grammar',
        level: 'Intermediate',
        status: 'locked',
        progress: 0,
        xpReward: 85,
        description: 'Transformasi kalimat aktif ke pasif pada konteks berita, sains, dan laporan formal (20 soal).',
        iconName: 'BookOpen',
        questionsCount: 20
      },
      {
        id: 'node-i7-pdf',
        lessonId: 'pdf-intermediate-phrasal',
        title: '📑 Modul Teori PDF: 50 Phrasal Verbs & 25 Idiom',
        category: 'Vocabulary',
        level: 'Intermediate',
        status: 'locked',
        progress: 0,
        xpReward: 50,
        description: 'E-Book modul teori PDF: Buku saku 50 phrasal verbs kantor & kampus serta idiom penutur asli.',
        iconName: 'FileText',
        nodeType: 'pdf-document',
        pdfMaterialId: 'pdf-intermediate-phrasal'
      },
      {
        id: 'node-i8',
        lessonId: 'lesson-reading-mastery',
        title: 'Editorial & Opinion Reading Studio',
        category: 'Reading',
        level: 'Intermediate',
        status: 'locked',
        progress: 0,
        xpReward: 90,
        description: 'Menganalisis artikel opini, perspektif penulis, dan kesimpulan tersirat dengan klik definisi kata (20 soal).',
        iconName: 'FileText',
        questionsCount: 20
      },
      {
        id: 'node-i9',
        lessonId: 'lesson-speaking-fluency',
        title: 'Debate, Persuasion & Roleplay',
        category: 'Speaking',
        level: 'Intermediate',
        status: 'locked',
        progress: 0,
        xpReward: 95,
        description: 'Menyusun argumen, menyetujui/menolak pendapat secara sopan dalam diskusi (20 soal).',
        iconName: 'MessageCircle',
        questionsCount: 20
      },
      {
        id: 'node-i10',
        lessonId: 'lesson-checkpoint-i',
        title: 'IELTS / TOEFL Gateway Test (B2)',
        category: 'Grammar',
        level: 'Intermediate',
        status: 'locked',
        progress: 0,
        xpReward: 150,
        description: 'Ujian simulasi komprehensif 20 soal berstandar B2 untuk verifikasi sertifikat kemahiran.',
        iconName: 'Trophy',
        questionsCount: 20
      }
    ]
  },
  Advanced: {
    level: 'Advanced',
    cefr: 'C1 - C2',
    title: 'Academic Mastery & Global Competence',
    subtitle: 'Kefasihan setara penutur asli dan kesiapan tes IELTS Band 8+ / TOEFL iBT 110+',
    description: 'Tata bahasa kompleks (Inversion, Subjunctive, Cleft sentences), esai akademis, analisis bacaan kritis, dan modul PDF strategi.',
    milestoneTitle: 'C1/C2 Academic Excellence Certification',
    nodes: [
      {
        id: 'node-a1',
        lessonId: 'lesson-inversion-academic',
        title: 'Academic Inversion & Emphatic Structures',
        category: 'Grammar',
        level: 'Advanced',
        status: 'current',
        progress: 25,
        xpReward: 95,
        description: 'Gaya bahasa pembalikan subjek-predikat (Rarely, Seldom, Under no circumstances) (20 soal).',
        iconName: 'Sparkles',
        questionsCount: 20
      },
      {
        id: 'node-a2-pdf',
        lessonId: 'pdf-advanced-academic',
        title: '📖 Modul Teori PDF: Formula Esai IELTS Band 8.0 & Inversion',
        category: 'Writing',
        level: 'Advanced',
        status: 'current',
        progress: 40,
        xpReward: 50,
        description: 'E-Book modul teori PDF: Cetak biru 4 paragraf esai akademik, cohesive devices, dan sampel esai penguji.',
        iconName: 'FileText',
        nodeType: 'pdf-document',
        pdfMaterialId: 'pdf-advanced-academic'
      },
      {
        id: 'node-a3',
        lessonId: 'lesson-reading-mastery',
        title: 'Academic Journal Reading Comprehension',
        category: 'Reading',
        level: 'Advanced',
        status: 'locked',
        progress: 0,
        xpReward: 100,
        description: 'Menganalisis teks jurnal ilmiah, tesis tersembunyi, dan penalaran logika tingkat tinggi (20 soal).',
        iconName: 'BookOpen',
        questionsCount: 20
      },
      {
        id: 'node-a4',
        lessonId: 'lesson-listening-essentials',
        title: 'Connected Speech & Fast Native Accents',
        category: 'Listening',
        level: 'Advanced',
        status: 'locked',
        progress: 0,
        xpReward: 95,
        description: 'Pelafalan terdistorsi, glottal stop, aksen UK/US/AUS penutur asli dalam debat cepat (20 soal).',
        iconName: 'Headphones',
        questionsCount: 20
      },
      {
        id: 'node-a5-pdf',
        lessonId: 'pdf-advanced-speaking',
        title: '📑 Modul Teori PDF: Panduan Debat, Diskusi Formal & IELTS Speaking',
        category: 'Speaking',
        level: 'Advanced',
        status: 'locked',
        progress: 0,
        xpReward: 50,
        description: 'E-Book modul teori PDF: Teknik storytelling 2 menit Part 2, hedging language, dan diskusi abstrak Part 3.',
        iconName: 'FileText',
        nodeType: 'pdf-document',
        pdfMaterialId: 'pdf-advanced-speaking'
      },
      {
        id: 'node-a6',
        lessonId: 'lesson-checkpoint-i',
        title: 'C1/C2 Academic Excellence Crown Exam',
        category: 'Grammar',
        level: 'Advanced',
        status: 'locked',
        progress: 0,
        xpReward: 180,
        description: 'Ujian komprehensif 20 soal akademis tingkat tinggi untuk meraih sertifikat tertinggi C2.',
        iconName: 'Trophy',
        questionsCount: 20
      }
    ]
  }
};
