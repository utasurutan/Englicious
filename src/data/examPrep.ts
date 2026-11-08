import { ExamPractice, ExamType } from '../types';

export interface ExamInfo {
  type: ExamType;
  fullName: string;
  badge: string;
  tagline: string;
  scoringRange: string;
  duration: string;
  sections: Array<{
    name: 'Listening' | 'Reading' | 'Speaking' | 'Writing';
    duration: string;
    questionsCount: string;
    description: string;
    skillsTested: string[];
  }>;
  scoringGuide: string;
  bestFor: string;
}

export const EXAM_INFOS: Record<ExamType, ExamInfo> = {
  IELTS: {
    type: 'IELTS',
    fullName: 'International English Language Testing System',
    badge: 'Academic & General',
    tagline: 'The global standard for UK, Canadian, Australian, and European universities & migration.',
    scoringRange: 'Band 0.0 - 9.0 (0.5 increments)',
    duration: '2 hours 45 minutes',
    sections: [
      {
        name: 'Listening',
        duration: '30 mins (+10 transfer)',
        questionsCount: '40 questions',
        description: 'Four recordings of native English speakers: conversations and monologues in everyday and academic contexts.',
        skillsTested: ['Gist understanding', 'Specific factual information', 'Speaker attitudes and opinions']
      },
      {
        name: 'Reading',
        duration: '60 mins',
        questionsCount: '40 questions (3 texts)',
        description: 'Three long descriptive, factual, or analytical texts taken from books, journals, magazines, and newspapers.',
        skillsTested: ['Skimming & scanning', 'Logical argument analysis', 'Recognizing writer views']
      },
      {
        name: 'Writing',
        duration: '60 mins',
        questionsCount: '2 tasks',
        description: 'Task 1: Describe visual information (chart, diagram, map). Task 2: Write a formal discursive essay on a given topic.',
        skillsTested: ['Task achievement', 'Coherence and cohesion', 'Lexical resource', 'Grammatical accuracy']
      },
      {
        name: 'Speaking',
        duration: '11 - 14 mins',
        questionsCount: '3 parts',
        description: 'Face-to-face oral interview: personal introduction, 2-minute uninterrupted speech, and two-way conceptual discussion.',
        skillsTested: ['Fluency and coherence', 'Pronunciation', 'Lexical variety']
      }
    ],
    scoringGuide: 'Band 7.0+ is considered a "Good User", Band 8.0+ is "Very Good User", Band 9.0 is "Expert User".',
    bestFor: 'Higher education in the UK, Australia, Canada, New Zealand, and immigration requirements.'
  },
  TOEFL: {
    type: 'TOEFL',
    fullName: 'Test of English as a Foreign Language (iBT)',
    badge: 'iBT Enhanced',
    tagline: 'The premier university entrance exam preferred by 100% of US universities and prestigious colleges.',
    scoringRange: '0 - 120 points (0-30 per section)',
    duration: 'Just under 2 hours',
    sections: [
      {
        name: 'Reading',
        duration: '35 mins',
        questionsCount: '20 questions (2 passages)',
        description: 'Academic university-level reading passages followed by multiple-choice questions assessing comprehension and inferences.',
        skillsTested: ['Factual information', 'Inference and rhetorical purpose', 'Vocabulary in context']
      },
      {
        name: 'Listening',
        duration: '36 mins',
        questionsCount: '28 questions',
        description: 'Campus conversations and authentic university lectures with varied academic disciplines and student questions.',
        skillsTested: ['Main idea and key details', 'Speaker tone & stance', 'Synthesizing lecture arguments']
      },
      {
        name: 'Speaking',
        duration: '16 mins',
        questionsCount: '4 tasks',
        description: '1 independent task sharing personal viewpoint, and 3 integrated tasks combining reading, listening, and speaking.',
        skillsTested: ['Delivery and pronunciation', 'Topic development', 'Synthesis precision']
      },
      {
        name: 'Writing',
        duration: '29 mins',
        questionsCount: '2 tasks',
        description: 'Integrated writing (synthesizing a lecture and reading passage) and the new Academic Discussion task.',
        skillsTested: ['Idea development', 'Academic register', 'Synthesizing contrasting points']
      }
    ],
    scoringGuide: 'Scores 90-100 are competitive for top-50 universities; 100-110+ qualifies for Ivy League and elite institutions.',
    bestFor: 'US and Canadian university admissions, graduate programs (MBA/MS/PhD), and academic scholarships.'
  },
  TOEIC: {
    type: 'TOEIC',
    fullName: 'Test of English for International Communication',
    badge: 'Listening & Reading',
    tagline: 'The global benchmark for evaluating workplace English skills used by 14,000+ multinational organizations.',
    scoringRange: '10 - 990 points (Listening 5-495, Reading 5-495)',
    duration: '2 hours',
    sections: [
      {
        name: 'Listening',
        duration: '45 mins',
        questionsCount: '100 questions (Parts 1-4)',
        description: 'Photographs, question-response drills, office conversations, and workplace announcements.',
        skillsTested: ['Business context comprehension', 'Quick decision making', 'Tone and urgency detection']
      },
      {
        name: 'Reading',
        duration: '75 mins',
        questionsCount: '100 questions (Parts 5-7)',
        description: 'Incomplete sentences, text completion, and business correspondence (emails, memo notices, double/triple passages).',
        skillsTested: ['Commercial grammar', 'Business collocations', 'Cross-referencing memos and schedules']
      }
    ],
    scoringGuide: '785+ indicates Working Professional Proficiency; 855-990 denotes International Executive Proficiency.',
    bestFor: 'Corporate hiring, job promotions, multinational corporate transfers, and aviation/maritime certification.'
  }
};

export const SAMPLE_EXAM_PRACTICES: Record<ExamType, ExamPractice> = {
  IELTS: {
    id: 'ielts-mock-01',
    exam: 'IELTS',
    title: 'IELTS Academic Mini-Mock (Reading & Listening)',
    description: 'Realistic exam simulation with timer, review navigation, and band diagnostic scoring.',
    timeLimitMinutes: 12,
    totalQuestions: 6,
    sections: [
      { name: 'Listening', questionCount: 3, description: 'Academic lecture on renewable marine turbines' },
      { name: 'Reading', questionCount: 3, description: 'Scientific journal excerpt on bioluminescence' }
    ],
    questions: [
      {
        id: 'ielts-q1',
        section: 'Listening',
        audioPrompt: 'The experimental tidal turbine was installed approximately two point four kilometers off the northern coast of Scotland in late 2023.',
        question: 'Where was the experimental tidal turbine positioned?',
        options: [
          '2.4 kilometers off the northern coast of Scotland',
          '4.2 kilometers from an inland reservoir',
          '24 kilometers south of Edinburgh',
          'Directly in a sheltered bay near Aberdeen'
        ],
        correctIndex: 0,
        explanation: 'The speaker explicitly states "approximately two point four kilometers off the northern coast of Scotland".',
        skillTested: 'Identifying specific geographical figures and distances'
      },
      {
        id: 'ielts-q2',
        section: 'Listening',
        audioPrompt: 'Unlike solar arrays which depend on weather fluctuations, ocean currents provide a remarkably predictable cadence of kinetic energy.',
        question: 'What primary advantage of tidal energy does the researcher emphasize?',
        options: [
          'Its lower initial installation cost',
          'The predictability of marine current kinetic energy',
          'Its portability across continents',
          'Zero requirement for maintenance crews'
        ],
        correctIndex: 1,
        explanation: 'The speaker highlights that ocean currents provide a "remarkably predictable cadence of kinetic energy" compared to weather-dependent solar.',
        skillTested: 'Recognizing comparison and main argument'
      },
      {
        id: 'ielts-q3',
        section: 'Listening',
        audioPrompt: 'The principal barrier to wide commercial deployment remains the corrosive nature of saline environments on submerged generator bearings.',
        question: 'What is cited as the main hurdle to wider adoption?',
        options: [
          'High public opposition to offshore structures',
          'Saltwater corrosion affecting underwater mechanical components',
          'Lack of submarine electrical transmission cables',
          'Excessive heating of turbine blades'
        ],
        correctIndex: 1,
        explanation: 'Saline (saltwater) corrosive effects on submerged generator bearings are named as the "principal barrier".',
        skillTested: 'Understanding technical vocabulary and limitations'
      },
      {
        id: 'ielts-q4',
        section: 'Reading',
        passageTitle: 'Bioluminescence in Bathypelagic Fauna',
        passageText: 'Bioluminescence—the production and emission of cold light by living organisms—is ubiquitous in the twilight and midnight zones of the ocean. In the absence of sunlight, over seventy percent of deep-sea species produce light through luciferin-luciferase chemical reactions. Rather than serving purely ornamental functions, light organs (photophores) facilitate crucial survival mechanisms, notably counter-illumination camouflage, prey luring, and conspecific recognition.',
        question: 'According to paragraph 1, what proportion of deep-sea organisms are estimated to produce bioluminescent light?',
        options: [
          'More than seventy percent',
          'Exactly fifty percent',
          'Less than twenty percent',
          'Only a few rare isolated species'
        ],
        correctIndex: 0,
        explanation: 'The text clearly states: "over seventy percent of deep-sea species produce light through luciferin-luciferase chemical reactions."',
        skillTested: 'Locating factual detail in academic prose'
      },
      {
        id: 'ielts-q5',
        section: 'Reading',
        passageTitle: 'Bioluminescence in Bathypelagic Fauna',
        passageText: 'Counter-illumination represents one of the most sophisticated evolutionary adaptations. By emitting light from downward-facing photophores that precisely matches the intensity and wavelength of downwelling sunlight from the surface, deep-water squid and lanternfish effectively erase their silhouettes from predators lurking beneath them.',
        question: 'How does counter-illumination protect marine animals from predators below?',
        options: [
          'By creating sudden bright flashes that temporarily blind the attacker',
          'By matching the downwelling surface light to conceal their shadow',
          'By signaling to other members of their school to scatter',
          'By changing their body temperature to confuse thermal sensors'
        ],
        correctIndex: 1,
        explanation: 'Downward photophores match surface downwelling light so they "effectively erase their silhouettes from predators lurking beneath them".',
        skillTested: 'Synthesizing explanatory mechanisms'
      },
      {
        id: 'ielts-q6',
        section: 'Reading',
        passageTitle: 'Bioluminescence in Bathypelagic Fauna',
        passageText: 'Unlike human incandescence, which wastes up to ninety percent of energy as thermal radiation, bioluminescent emissions achieve an astonishing ninety-six percent photometric efficiency, with virtually negligible heat generation.',
        question: 'The author mentions incandescent human lighting in order to:',
        options: [
          'Argue that human lighting should be banned in ocean research vessels',
          'Contrast the thermal inefficiency of artificial light with the high efficiency of bioluminescence',
          'Suggest that lanternfish learned light production from humans',
          'Criticize marine biologists for using incandescent bulbs'
        ],
        correctIndex: 1,
        explanation: 'The author directly contrasts human lighting waste (90% heat) against bioluminescence (96% photometric efficiency with negligible heat).',
        skillTested: 'Determining the author\'s rhetorical purpose'
      }
    ]
  },
  TOEFL: {
    id: 'toefl-mock-01',
    exam: 'TOEFL',
    title: 'TOEFL iBT Academic Sprint Test',
    description: 'Realistic university-style assessment with academic passage analysis and lecture comprehension.',
    timeLimitMinutes: 10,
    totalQuestions: 5,
    sections: [
      { name: 'Reading', questionCount: 3, description: 'Cognitive psychology & neuroplasticity' },
      { name: 'Listening', questionCount: 2, description: 'Campus office hours discussion on research methodology' }
    ],
    questions: [
      {
        id: 'toefl-q1',
        section: 'Reading',
        passageTitle: 'Synaptic Plasticity and Memory Consolidation',
        passageText: 'For decades, neuroscientists posited that the adult mammalian brain was structurally fixed, its neural architecture cast in indelible form after early childhood development. However, ground-breaking research in the late twentieth century overturned this dogma, demonstrating that the human brain maintains remarkable neuroplasticity throughout life. Synaptic connections continuously strengthen or atrophy in direct response to cognitive enrichment, physical exercise, and focused deliberate practice.',
        question: 'The word "dogma" in the passage is closest in meaning to:',
        options: [
          'firmly held belief accepted without question',
          'experimental laboratory hypothesis',
          'minor mathematical anomaly',
          'novel unproven scientific theory'
        ],
        correctIndex: 0,
        explanation: 'In academic contexts, "dogma" denotes an established doctrine or belief system accepted uncritically as truth.',
        skillTested: 'Vocabulary in context'
      },
      {
        id: 'toefl-q2',
        section: 'Reading',
        passageTitle: 'Synaptic Plasticity and Memory Consolidation',
        passageText: 'During sleep, particularly slow-wave oscillations and REM stages, the hippocampus replays neural firing sequences encoded during wakefulness, transferring short-term memory traces into the neocortex for long-term consolidation. Chronic sleep deprivation severely impedes this hippocampal transfer, rendering new semantic retention fragile and fragmented.',
        question: 'Which of the following can be inferred from paragraph 2 about sleep deprivation?',
        options: [
          'It only affects physical motor coordination, not cognitive memory',
          'It disrupts the biological transfer of memory from the hippocampus to the neocortex',
          'It permanently destroys all childhood memories stored in the neocortex',
          'It forces the brain to skip slow-wave oscillations completely'
        ],
        correctIndex: 1,
        explanation: 'The passage explicitly notes that chronic deprivation "severely impedes this hippocampal transfer", making retention fragile.',
        skillTested: 'Inference questions'
      },
      {
        id: 'toefl-q3',
        section: 'Reading',
        passageTitle: 'Synaptic Plasticity and Memory Consolidation',
        passageText: 'Furthermore, the synthesis of brain-derived neurotrophic factor (BDNF), a pivotal protein fostering dendritic arborization, peaks following aerobic exertion. Consequently, sedentary lifestyles correlate with expedited volumetric decline in hippocampal grey matter.',
        question: 'Why does the author mention "brain-derived neurotrophic factor (BDNF)"?',
        options: [
          'To illustrate a biological mechanism through which aerobic exercise supports brain health',
          'To introduce a synthetic prescription drug used to cure insomnia',
          'To show that sedentary people produce more brain proteins than athletes',
          'To contest the importance of the hippocampus in long-term memory'
        ],
        correctIndex: 0,
        explanation: 'BDNF is presented as the chemical protein promoted by aerobic exercise that fosters dendritic growth.',
        skillTested: 'Rhetorical purpose'
      },
      {
        id: 'toefl-q4',
        section: 'Listening',
        audioPrompt: 'Professor: "So Sultan, looking at your literature review draft, your thesis on urban heat islands is well supported, but your methodology section lacks empirical data sampling. I suggest including at least three temperature sensor logs from downtown transit hubs."',
        question: 'What is the professor\'s primary critique of the student\'s paper draft?',
        options: [
          'The thesis statement is too broad and unfocused',
          'The paper lacks empirical data samples in the methodology section',
          'The grammar and formatting fail university style requirements',
          'The topic is not relevant to modern environmental science'
        ],
        correctIndex: 1,
        explanation: 'The professor says: "your methodology section lacks empirical data sampling. I suggest including at least three temperature sensor logs".',
        skillTested: 'Understanding main concern in academic conversation'
      },
      {
        id: 'toefl-q5',
        section: 'Listening',
        audioPrompt: 'Student: "I can definitely collect sensor data from the subway stations by Friday, but would you prefer I analyze the rush hour peaks or the midnight baseline readings?" Professor: "Both, actually. The differential between those two is where your real insights will emerge."',
        question: 'What does the professor recommend the student focus on?',
        options: [
          'Only the midnight baseline readings when stations are quiet',
          'Only rush hour peaks when passenger traffic is highest',
          'The comparative differential between rush hour peaks and midnight baseline',
          'Discarding station readings in favor of satellite imagery'
        ],
        correctIndex: 2,
        explanation: 'The professor responds: "Both, actually. The differential between those two is where your real insights will emerge."',
        skillTested: 'Connecting information & advice'
      }
    ]
  },
  TOEIC: {
    id: 'toeic-mock-01',
    exam: 'TOEIC',
    title: 'TOEIC Professional Workplace Simulation',
    description: 'Corporate business communication, executive memos, and listening drills.',
    timeLimitMinutes: 8,
    totalQuestions: 4,
    sections: [
      { name: 'Listening', questionCount: 2, description: 'Office voicemails & conference announcements' },
      { name: 'Reading', questionCount: 2, description: 'Corporate memo & contract review' }
    ],
    questions: [
      {
        id: 'toeic-q1',
        section: 'Listening',
        audioPrompt: 'Attention all passengers on flight KL six eight two to Singapore. The departure gate has been changed from B twelve to C twenty-four. Boarding will commence at three forty-five PM.',
        question: 'What is the announcement mainly about?',
        options: [
          'A change of departure gate for flight KL 682',
          'A flight cancellation due to severe weather',
          'Lost luggage at the international baggage carousel',
          'A boarding delay of two hours'
        ],
        correctIndex: 0,
        explanation: 'The speaker announces: "The departure gate has been changed from B twelve to C twenty-four."',
        skillTested: 'Public announcement comprehension'
      },
      {
        id: 'toeic-q2',
        section: 'Listening',
        audioPrompt: 'Hi Sultan, this is Elena from Global Logistics. Just confirming that our shipment of fifty ergonomic chairs has cleared customs and will be delivered to your warehouse tomorrow by nine AM.',
        question: 'When will the chairs be delivered to the warehouse?',
        options: [
          'Tomorrow morning by 9:00 AM',
          'Later this evening at 5:00 PM',
          'Next Monday after inspection',
          'Within the next two weeks'
        ],
        correctIndex: 0,
        explanation: 'Elena specifies "will be delivered to your warehouse tomorrow by nine AM".',
        skillTested: 'Telephone message detail extraction'
      },
      {
        id: 'toeic-q3',
        section: 'Reading',
        passageTitle: 'Memo: Annual Corporate Audit',
        passageText: 'To: All Regional Department Heads\nFrom: Marcus Vance, Chief Compliance Officer\nDate: November 8\nSubject: Third-Quarter Fiscal Review\n\nPlease ensure that all discretionary expenditure vouchers for Q3 are uploaded to the enterprise portal no later than Friday, November 14. Late submissions will require written sign-off from the Executive Vice President of Finance. Reimbursement checks will be processed on the final banking day of the month.',
        question: 'What must department heads do by November 14?',
        options: [
          'Submit discretionary expenditure vouchers to the portal',
          'Schedule an interview with the Executive Vice President',
          'Issue reimbursement checks to regional clients',
          'Organize an in-person compliance meeting'
        ],
        correctIndex: 0,
        explanation: 'The memo requests to "ensure that all discretionary expenditure vouchers for Q3 are uploaded... no later than Friday, November 14".',
        skillTested: 'Business memo directives'
      },
      {
        id: 'toeic-q4',
        section: 'Reading',
        passageTitle: 'Corporate Announcement',
        passageText: 'All employees who complete the advanced business English communication seminar will receive a three hundred dollar professional development stipend and priority consideration for international branch assignments.',
        question: 'What benefit is offered to seminar graduates?',
        options: [
          'A $300 stipend and priority for international assignments',
          'Free international flights for their immediate family',
          'An automatic promotion to senior department director',
          'Full exemption from all future quarterly audits'
        ],
        correctIndex: 0,
        explanation: 'The announcement clearly lists "a three hundred dollar professional development stipend and priority consideration for international branch assignments".',
        skillTested: 'Incentive and policy detail recognition'
      }
    ]
  }
};

