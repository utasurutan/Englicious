import { ExamPractice, ExamType } from '../types';

export interface ExamInfo {
  type: ExamType;
  fullName: string;
  badge: string;
  tagline: string;
  scoringRange: string;
  duration: string;
  totalQuestionsBank: number;
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
    tagline: 'The global standard for UK, Canadian, Australian, and European universities & international migration.',
    scoringRange: 'Band 0.0 - 9.0 (0.5 increments)',
    duration: '2 hours 45 minutes',
    totalQuestionsBank: 22,
    sections: [
      {
        name: 'Listening',
        duration: '30 mins (+10 transfer)',
        questionsCount: '40 questions (10 bank)',
        description: 'Four recordings of native English speakers: conversations and monologues in everyday social and university academic contexts.',
        skillsTested: ['Form completion & numbers', 'Identifying specific details', 'Attitudes and speaker opinions', 'Academic lecture synthesis']
      },
      {
        name: 'Reading',
        duration: '60 mins',
        questionsCount: '40 questions (12 bank)',
        description: 'Three long descriptive, factual, and analytical texts taken from scientific journals, books, magazines, and historical documents.',
        skillsTested: ['Skimming & scanning', 'True/False/Not Given', 'Heading matching', 'Logical argument analysis']
      },
      {
        name: 'Writing',
        duration: '60 mins',
        questionsCount: '2 tasks',
        description: 'Task 1: Describe visual data (diagram, bar chart, flow map). Task 2: Write a formal discursive essay defending a thesis.',
        skillsTested: ['Task achievement', 'Coherence and cohesion', 'Lexical resource', 'Grammatical accuracy']
      },
      {
        name: 'Speaking',
        duration: '11 - 14 mins',
        questionsCount: '3 parts',
        description: 'Face-to-face oral interview: personal introduction, 2-minute uninterrupted speech, and two-way conceptual discussion.',
        skillsTested: ['Fluency and coherence', 'Pronunciation & intonation', 'Lexical variety']
      }
    ],
    scoringGuide: 'Band 7.0+ is considered a "Good User", Band 8.0+ is "Very Good User", Band 9.0 is "Expert User".',
    bestFor: 'Higher education in the UK, Australia, Canada, New Zealand, and global professional immigration.'
  },
  TOEFL: {
    type: 'TOEFL',
    fullName: 'Test of English as a Foreign Language (iBT Enhanced)',
    badge: 'iBT Official Standard',
    tagline: 'The premier university entrance exam preferred by 100% of US universities and prestigious international colleges.',
    scoringRange: '0 - 120 points (0-30 per section)',
    duration: 'Just under 2 hours',
    totalQuestionsBank: 22,
    sections: [
      {
        name: 'Reading',
        duration: '35 mins',
        questionsCount: '20 questions (11 bank)',
        description: 'Academic university-level reading passages followed by multiple-choice questions assessing comprehension, inferences, and vocabulary.',
        skillsTested: ['Factual information', 'Negative factual (EXCEPT)', 'Vocabulary in context', 'Inference & rhetorical purpose']
      },
      {
        name: 'Listening',
        duration: '36 mins',
        questionsCount: '28 questions (11 bank)',
        description: 'Campus conversations and authentic university lectures with varied academic disciplines (Astrophysics, Biology, Architecture).',
        skillsTested: ['Main idea & key details', 'Speaker tone & stance', 'Connecting lecture arguments', 'Implication & advice']
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
        description: 'Integrated writing (synthesizing a lecture and reading passage) and the Academic Discussion task.',
        skillsTested: ['Idea development', 'Academic register', 'Synthesizing contrasting points']
      }
    ],
    scoringGuide: 'Scores 90-100 are competitive for top-50 universities; 100-110+ qualifies for Ivy League and elite institutions.',
    bestFor: 'US and Canadian university admissions, graduate programs (MBA/MS/PhD), and academic scholarships.'
  },
  TOEIC: {
    type: 'TOEIC',
    fullName: 'Test of English for International Communication',
    badge: 'Listening & Reading Official',
    tagline: 'The global benchmark for evaluating workplace English skills used by 14,000+ multinational organizations and corporations.',
    scoringRange: '10 - 990 points (Listening 5-495, Reading 5-495)',
    duration: '2 hours',
    totalQuestionsBank: 22,
    sections: [
      {
        name: 'Listening',
        duration: '45 mins',
        questionsCount: '100 questions (10 bank)',
        description: 'Photographs (Part 1), question-response drills (Part 2), office conversations (Part 3), and workplace talks (Part 4).',
        skillsTested: ['Business context comprehension', 'Quick decision making', 'Tone and urgency detection', 'Logistics & travel schedules']
      },
      {
        name: 'Reading',
        duration: '75 mins',
        questionsCount: '100 questions (12 bank)',
        description: 'Incomplete sentences (Part 5), text completion (Part 6), and business correspondence with cross-referenced double passages (Part 7).',
        skillsTested: ['Commercial grammar', 'Business collocations', 'Contract & memo directives', 'Cross-referencing emails and invoices']
      }
    ],
    scoringGuide: '785+ indicates Working Professional Proficiency; 855-990 denotes International Executive Proficiency.',
    bestFor: 'Corporate hiring, job promotions, multinational corporate transfers, and aviation/maritime certification.'
  }
};

export const SAMPLE_EXAM_PRACTICES: Record<ExamType, ExamPractice> = {
  IELTS: {
    id: 'ielts-mock-full',
    exam: 'IELTS',
    title: 'IELTS Academic Comprehensive Simulation',
    description: 'Authentic 22-question exam simulation featuring 10 Listening audio drills and 12 Reading questions across 3 academic texts.',
    timeLimitMinutes: 25,
    totalQuestions: 22,
    sections: [
      { name: 'Listening', questionCount: 10, description: 'Parts 1-4: Social booking, facility guide, tutorial debate, and marine lecture' },
      { name: 'Reading', questionCount: 12, description: 'Passages 1-3: Urban Microclimates, Bilingual Brain, and Bronze Age Metallurgy' }
    ],
    questions: [
      // --- IELTS LISTENING (Questions 1 - 10) ---
      {
        id: 'ielts-q1',
        section: 'Listening',
        audioPrompt: 'Good morning, Highland Eco-Retreat. This is Callum. Yes, we are located exactly eighteen point five kilometers west of Inverness along the A82 road. For your arrival on Thursday the twelfth of June, we have one deluxe timber cabin available for four guests.',
        question: 'Where is the Highland Eco-Retreat situated?',
        options: [
          '18.5 kilometers west of Inverness along the A82 road',
          '80.5 kilometers north of Edinburgh near Aberdeen',
          '12 kilometers south of Glasgow city centre',
          'Directly inside the Inverness central bus terminal'
        ],
        correctIndex: 0,
        explanation: 'Callum explicitly states: "we are located exactly eighteen point five kilometers west of Inverness along the A82 road".',
        skillTested: 'IELTS Part 1: Form Completion & Distance Extraction'
      },
      {
        id: 'ielts-q2',
        section: 'Listening',
        audioPrompt: 'Regarding breakfast arrangements, all our meals are sourced organically. If any guest requires a gluten-free meal, we must be informed seventy-two hours in advance so our local baker can prepare the sourdough loaves.',
        question: 'What is the requirement for ordering a gluten-free breakfast?',
        options: [
          'Pay an extra cash surcharge upon arrival',
          'Provide notice at least 72 hours in advance',
          'Bring their own sourdough flour to the kitchen',
          'Request it on the morning of departure'
        ],
        correctIndex: 1,
        explanation: 'The speaker specifies: "we must be informed seventy-two hours in advance so our local baker can prepare the sourdough loaves".',
        skillTested: 'IELTS Part 1: Specific Customer Condition'
      },
      {
        id: 'ielts-q3',
        section: 'Listening',
        audioPrompt: 'Welcome visitors. The marine wave simulator behind me generates cross-directional swell waves up to three meters high. While solar panels depend heavily on weather stability, ocean current generators deliver kinetic power on a remarkably predictable tidal schedule.',
        question: 'What main advantage of ocean current generators does the guide emphasize?',
        options: [
          'They produce zero underwater vibrations',
          'Their kinetic power delivery operates on a predictable schedule',
          'They are significantly cheaper to build than solar arrays',
          'They do not require connection to the electrical grid'
        ],
        correctIndex: 1,
        explanation: 'The guide contrasts weather-dependent solar with ocean currents that deliver "kinetic power on a remarkably predictable tidal schedule".',
        skillTested: 'IELTS Part 2: Comparative Analysis'
      },
      {
        id: 'ielts-q4',
        section: 'Listening',
        audioPrompt: 'The primary engineering hurdle we face underwater isn\'t blade velocity, but the intense corrosive impact of saline seawater on the generator\'s mechanical bearings, requiring titanium-reinforced seals.',
        question: 'What is cited as the primary engineering obstacle for submerged generators?',
        options: [
          'The high risk of ship collisions in deep water',
          'Saltwater corrosion affecting mechanical bearings',
          'Insufficient water velocity during low tides',
          'Excessive biological growth on turbine blades'
        ],
        correctIndex: 1,
        explanation: 'Saline seawater corrosive impact on mechanical bearings is cited as the "primary engineering hurdle".',
        skillTested: 'IELTS Part 2: Technical Barrier Identification'
      },
      {
        id: 'ielts-q5',
        section: 'Listening',
        audioPrompt: 'Liam: "Professor Henderson suggested we sample at least sixty audio recordings of adolescent speech, but transcribing all those phonetic elisions will take forever." Chloe: "True, but if we use automated speech recognition software to generate the rough drafts, we can cut our manual transcription workload in half."',
        question: 'How does Chloe suggest expediting their speech transcription work?',
        options: [
          'By hiring third-party student transcribers',
          'By using automated speech recognition for initial drafts',
          'By reducing their target sample from 60 to 30 recordings',
          'By omitting phonetic elisions from the study'
        ],
        correctIndex: 1,
        explanation: 'Chloe suggests: "if we use automated speech recognition software to generate the rough drafts, we can cut our manual transcription workload in half".',
        skillTested: 'IELTS Part 3: Tutorial Discussion & Strategy'
      },
      {
        id: 'ielts-q6',
        section: 'Listening',
        audioPrompt: 'Chloe: "We must also ensure our sample group includes equal representation from both bilingual and monolingual speakers from urban secondary schools, otherwise our findings on dialect drift won\'t hold statistical validity."',
        question: 'Why does Chloe insist on balancing bilingual and monolingual participants?',
        options: [
          'To satisfy the university ethics committee deadline',
          'To preserve the statistical validity of their dialect study',
          'To obtain higher research grant funding from the department',
          'To prove that bilingual students speak faster'
        ],
        correctIndex: 1,
        explanation: 'Chloe explains that without equal representation, "our findings on dialect drift won\'t hold statistical validity".',
        skillTested: 'IELTS Part 3: Research Methodology Criteria'
      },
      {
        id: 'ielts-q7',
        section: 'Listening',
        audioPrompt: 'Liam: "Agreed. And we shouldn\'t rely solely on self-reported questionnaires because subjects tend to over-report standard grammar. Direct recorded conversational observation is much more reliable."',
        question: 'What weakness of self-reported questionnaires does Liam point out?',
        options: [
          'Subjects often refuse to fill out personal details',
          'Participants tend to over-report standard grammar forms',
          'Questionnaires cost more to print and distribute',
          'They take longer to evaluate than recorded interviews'
        ],
        correctIndex: 1,
        explanation: 'Liam notes that "subjects tend to over-report standard grammar", preferring direct conversational observation.',
        skillTested: 'IELTS Part 3: Evaluating Research Limitations'
      },
      {
        id: 'ielts-q8',
        section: 'Listening',
        audioPrompt: 'In the bathypelagic zone, sunlight ceases to penetrate beyond one thousand meters. Over seventy-five percent of organisms here generate cold biochemical light via luciferin oxidation. Rather than simply illuminating the darkness, downward-directed photophores produce counter-illumination that precisely mirrors surface downwelling light, rendering the animal virtually invisible to predators below.',
        question: 'How does counter-illumination function as a survival mechanism?',
        options: [
          'It generates high heat to ward off dangerous marine predators',
          'Downward photophores mirror surface light to erase silhouettes from below',
          'It creates bright erratic flashes that disorient prey',
          'It signals distress calls across miles of open ocean'
        ],
        correctIndex: 1,
        explanation: 'Downward photophores mirror downwelling light so the animal is "virtually invisible to predators below".',
        skillTested: 'IELTS Part 4: Academic Lecture Mechanism'
      },
      {
        id: 'ielts-q9',
        section: 'Listening',
        audioPrompt: 'Consider the energetic marvel: human incandescent lighting dissipates up to ninety percent of consumed energy as useless thermal heat. Bioluminescent reactions in deep-sea squid, however, boast an astonishing ninety-six percent photometric efficiency, with near-zero thermal loss.',
        question: 'Why does the lecturer contrast human lighting with bioluminescence?',
        options: [
          'To argue that human incandescent bulbs should be installed underwater',
          'To highlight the remarkable 96% photometric efficiency of cold bioluminescence',
          'To explain why deep-sea research submarines require external batteries',
          'To demonstrate that squid generate intense body warmth'
        ],
        correctIndex: 1,
        explanation: 'The lecturer contrasts human 90% heat loss with the squid\'s 96% photometric efficiency with near-zero thermal loss.',
        skillTested: 'IELTS Part 4: Rhetorical Purpose & Comparison'
      },
      {
        id: 'ielts-q10',
        section: 'Listening',
        audioPrompt: 'Furthermore, certain anglerfish utilize bioluminescent bacterial symbionts suspended on an illicium—a modified dorsal spine. This glowing lure attracts unsuspecting copepods and crustacea directly into strike range.',
        question: 'What is the role of the illicium in the anglerfish\'s predation strategy?',
        options: [
          'It acts as an anchor on deep-sea rocky trenches',
          'It houses glowing bacterial symbionts that lure prey into striking distance',
          'It filters toxic minerals out of cold deep ocean currents',
          'It protects the fish against sudden hydrostatic pressure changes'
        ],
        correctIndex: 1,
        explanation: 'The speaker describes the illicium as a modified spine with a glowing lure that "attracts unsuspecting copepods and crustacea directly into strike range".',
        skillTested: 'IELTS Part 4: Specialized Biological Adaptation'
      },

      // --- IELTS READING (Questions 11 - 22) ---
      {
        id: 'ielts-q11',
        section: 'Reading',
        passageTitle: 'The Architecture of Urban Microclimates',
        passageText: 'High-density urban centers routinely exhibit temperatures between 3°C and 7°C higher than peripheral rural countryside, a phenomenon termed the Urban Heat Island (UHI) effect. Dark asphalt pavements and concrete building envelopes absorb incident solar shortwave radiation during daylight hours and re-radiate it as longwave thermal flux throughout the night. Compounding this thermal retention is anthropogenic heat released by building air conditioning condenser units and vehicular combustion. Mitigating UHI requires multifaceted architectural strategies. Reflective "cool roofs" engineered with high solar reflectance index (SRI) coatings reflect up to 80% of sunlight. Concurrently, vegetative green roofs provide natural evapotranspiration, where plants absorb moisture through roots and release water vapor through stomata, chilling ambient air. Crucially, computer fluid dynamic (CFD) modeling indicates that urban wind corridors—arranging high-rise tower clusters along prevailing seasonal wind axes—significantly augment convective ventilation, flushing stagnant thermal plumes from street canyons.',
        question: 'According to paragraph 1, how do dark asphalt and concrete surfaces contribute to nighttime urban warming?',
        options: [
          'By emitting toxic chemical aerosols into the troposphere',
          'By releasing stored shortwave solar energy as longwave thermal radiation at night',
          'By preventing groundwater from filtering into street sewers',
          'By reflecting sunlight directly into residential windows'
        ],
        correctIndex: 1,
        explanation: 'The text states that dark pavements "absorb incident solar shortwave radiation during daylight hours and re-radiate it as longwave thermal flux throughout the night".',
        skillTested: 'IELTS Reading: Identifying Factual Detail'
      },
      {
        id: 'ielts-q12',
        section: 'Reading',
        passageTitle: 'The Architecture of Urban Microclimates',
        passageText: 'Concurrently, vegetative green roofs provide natural evapotranspiration, where plants absorb moisture through roots and release water vapor through stomata, chilling ambient air. Crucially, computer fluid dynamic (CFD) modeling indicates that urban wind corridors—arranging high-rise tower clusters along prevailing seasonal wind axes—significantly augment convective ventilation, flushing stagnant thermal plumes from street canyons.',
        question: 'What physiological process enables green roofs to cool ambient city air?',
        options: [
          'Photosynthetic carbon sequestration in topsoil',
          'Evapotranspiration releasing moisture into the surrounding air',
          'Cellular respiration generating cool nitrogen clouds',
          'Thermal insulation blocking wind corridors'
        ],
        correctIndex: 1,
        explanation: 'The passage explicitly explains: "vegetative green roofs provide natural evapotranspiration, where plants absorb moisture through roots and release water vapor through stomata, chilling ambient air".',
        skillTested: 'IELTS Reading: Scientific Process Comprehension'
      },
      {
        id: 'ielts-q13',
        section: 'Reading',
        passageTitle: 'The Architecture of Urban Microclimates',
        passageText: 'Reflective "cool roofs" engineered with high solar reflectance index (SRI) coatings reflect up to 80% of sunlight. Concurrently, vegetative green roofs provide natural evapotranspiration... Crucially, computer fluid dynamic (CFD) modeling indicates that urban wind corridors—arranging high-rise tower clusters along prevailing seasonal wind axes—significantly augment convective ventilation.',
        question: 'According to the passage, computer fluid dynamic (CFD) modeling is primarily used to:',
        options: [
          'Calculate the exact manufacturing cost of reflective SRI paint',
          'Design tower layouts along prevailing wind axes to enhance ventilation',
          'Measure the water consumption rate of individual roof plants',
          'Predict automobile carbon emissions at busy traffic intersections'
        ],
        correctIndex: 1,
        explanation: 'CFD modeling indicates that urban wind corridors—arranging high-rise towers along prevailing wind axes—augment convective ventilation.',
        skillTested: 'IELTS Reading: Identifying Writer\'s Key Points'
      },
      {
        id: 'ielts-q14',
        section: 'Reading',
        passageTitle: 'The Architecture of Urban Microclimates',
        passageText: 'High-density urban centers routinely exhibit temperatures between 3°C and 7°C higher than peripheral rural countryside, a phenomenon termed the Urban Heat Island (UHI) effect. Dark asphalt pavements and concrete building envelopes absorb incident solar shortwave radiation...',
        question: 'Do the following statements agree with the information in the passage? "Urban Heat Island effects are exclusively caused by motor vehicle emissions."',
        options: [
          'FALSE (It is caused by dark asphalt, concrete thermal retention, and AC condenser heat as well)',
          'TRUE',
          'NOT GIVEN'
        ],
        correctIndex: 0,
        explanation: 'The statement is FALSE because the passage states UHI is caused by asphalt, concrete envelopes re-radiating heat, and AC condenser coils in addition to vehicles.',
        skillTested: 'IELTS Reading: True / False / Not Given'
      },
      {
        id: 'ielts-q15',
        section: 'Reading',
        passageTitle: 'Cognitive Plasticity in Bilingualism',
        passageText: 'For much of the twentieth century, pedagogical dogma warned that exposing young children to two languages simultaneously would induce cognitive overload, vocabulary attrition, and developmental delay. Contemporary cognitive neuroscience has radically repudiated this view. Neuroimaging studies utilizing functional MRI demonstrate that both linguistic systems in a bilingual brain remain concurrently active, even when context demands the use of only one. Consequently, bilingual individuals must perpetually deploy non-linguistic executive control mechanisms—specifically the prefrontal cortex and anterior cingulate cortex—to suppress interfering lexical tokens from the dormant language while selecting the target syntax.',
        question: 'The word "repudiated" in paragraph 1 is closest in meaning to:',
        options: [
          'rejected and disproved',
          'temporarily postponed',
          'celebrated and expanded',
          'cautiously examined'
        ],
        correctIndex: 0,
        explanation: 'In this context, "repudiated" means completely rejected or shown to be false based on new neuroscientific evidence.',
        skillTested: 'IELTS Reading: Academic Vocabulary in Context'
      },
      {
        id: 'ielts-q16',
        section: 'Reading',
        passageTitle: 'Cognitive Plasticity in Bilingualism',
        passageText: 'Neuroimaging studies utilizing functional MRI demonstrate that both linguistic systems in a bilingual brain remain concurrently active, even when context demands the use of only one. Consequently, bilingual individuals must perpetually deploy non-linguistic executive control mechanisms—specifically the prefrontal cortex and anterior cingulate cortex—to suppress interfering lexical tokens from the dormant language while selecting the target syntax.',
        question: 'What occurs in the brain of a bilingual speaker when communicating in just one language?',
        options: [
          'The dormant language completely ceases all neurological firing',
          'Both linguistic systems remain concurrently active, requiring cognitive suppression',
          'The left hemisphere shuts down to preserve energy',
          'The prefrontal cortex becomes temporarily deactivated'
        ],
        correctIndex: 1,
        explanation: 'fMRI studies demonstrate that "both linguistic systems in a bilingual brain remain concurrently active", requiring executive control to suppress the dormant language.',
        skillTested: 'IELTS Reading: Synthesis of Complex Concepts'
      },
      {
        id: 'ielts-q17',
        section: 'Reading',
        passageTitle: 'Cognitive Plasticity in Bilingualism',
        passageText: 'Strikingly, epidemiological longitudinal data indicate that lifelong bilingualism confers cognitive reserve against neurodegenerative pathologies, delaying the clinical onset of Alzheimer\'s dementia symptoms by an average of 4.5 years relative to monolingual cohorts, despite equivalent neuropathological brain atrophy.',
        question: 'According to longitudinal data, what impact does lifelong bilingualism have on Alzheimer\'s disease?',
        options: [
          'It permanently prevents any brain tissue atrophy from occurring',
          'It delays the clinical onset of dementia symptoms by approximately 4.5 years',
          'It accelerates the deterioration of linguistic retrieval in old age',
          'It cures neurodegenerative pathologies before age seventy'
        ],
        correctIndex: 1,
        explanation: 'The text states that bilingualism confers cognitive reserve, "delaying the clinical onset of Alzheimer\'s dementia symptoms by an average of 4.5 years".',
        skillTested: 'IELTS Reading: Locating Statistical Findings'
      },
      {
        id: 'ielts-q18',
        section: 'Reading',
        passageTitle: 'Cognitive Plasticity in Bilingualism',
        passageText: 'This lifelong neurological workout strengthens attentional switching, cognitive flexibility, and working memory. Strikingly, epidemiological longitudinal data indicate that lifelong bilingualism confers cognitive reserve against neurodegenerative pathologies...',
        question: 'What is the main conclusion of the passage regarding early bilingual exposure?',
        options: [
          'It hinders academic performance by splitting childhood vocabulary in half',
          'It builds robust executive control mechanisms that provide lifelong cognitive benefits',
          'It should be restricted until children have mastered mathematics',
          'It is only beneficial when both languages share the Latin alphabet'
        ],
        correctIndex: 1,
        explanation: 'The passage demonstrates that managing two active languages exercises the prefrontal cortex, enhancing attentional switching and conferring cognitive reserve.',
        skillTested: 'IELTS Reading: Main Thesis Identification'
      },
      {
        id: 'ielts-q19',
        section: 'Reading',
        passageTitle: 'Bronze Age Metallurgy and Trade Networks',
        passageText: 'The transition from chalcolithic copper tools to true tin-bronze alloys around 3000 BCE revolutionized human civilization, prompting the emergence of the world\'s first interconnected intercontinental trade conduits. While copper ores were comparatively widespread throughout the Mediterranean basin and Anatolia, geological deposits of cassiterite (tin oxide)—the vital alloying mineral needed in a 1:9 ratio to confer tensile durability and sharpness—were exceptionally scarce, concentrated primarily in Cornwall, the Iberian peninsula, and the remote mountains of Central Asia.',
        question: 'Why were ancient societies forced to establish long-distance trade routes to produce bronze?',
        options: [
          'Copper was entirely depleted across the Mediterranean basin',
          'Cassiterite (tin oxide) was exceptionally scarce and located far from copper deposits',
          'Bronze could only be smelted using Central Asian charcoal',
          'Imperial decrees banned the localized mining of minerals'
        ],
        correctIndex: 1,
        explanation: 'The author notes that while copper was widespread, tin deposits were "exceptionally scarce", concentrated thousands of miles away in Cornwall, Iberia, and Central Asia.',
        skillTested: 'IELTS Reading: Causal Reasoning in Historical Texts'
      },
      {
        id: 'ielts-q20',
        section: 'Reading',
        passageTitle: 'Bronze Age Metallurgy and Trade Networks',
        passageText: 'Chemical isotope analysis of lead trace elements embedded in Aegean bronze daggers and ingots recovered from the Uluburun shipwreck has conclusively traced the origin of their tin to mines located over 3,000 kilometers away in modern-day Uzbekistan and Tajikistan. This geo-chemical fingerprinting demonstrates that long before the formal Silk Road, nomadic pastoralists and maritime traders maintained sophisticated reciprocal trade corridors.',
        question: 'What did chemical isotope analysis of artifacts from the Uluburun shipwreck reveal?',
        options: [
          'The ship was manufactured in Western Europe out of cedarwood',
          'The tin in Aegean bronze artifacts originated from mines in Central Asia',
          'The Bronze Age was hundreds of years shorter than previously assumed',
          'Nomadic pastoralists were unable to trade with maritime sailors'
        ],
        correctIndex: 1,
        explanation: 'Isotope analysis "conclusively traced the origin of their tin to mines located over 3,000 kilometers away in modern-day Uzbekistan and Tajikistan".',
        skillTested: 'IELTS Reading: Interpreting Archaeological Evidence'
      },
      {
        id: 'ielts-q21',
        section: 'Reading',
        passageTitle: 'Bronze Age Metallurgy and Trade Networks',
        passageText: 'This geo-chemical fingerprinting demonstrates that long before the formal Silk Road, nomadic pastoralists and maritime traders maintained sophisticated reciprocal trade corridors, exchanging Baltic amber, Egyptian glass beads, and Mesopotamian textiles for Central Asian tin.',
        question: 'The author mentions "Baltic amber, Egyptian glass beads, and Mesopotamian textiles" in order to:',
        options: [
          'Illustrate the wide diversity of commodities exchanged in ancient reciprocal trade networks',
          'Argue that textile manufacturing was more profitable than bronze smelting',
          'Prove that Egypt conquered all of Central Asia in 3000 BCE',
          'Criticize historians for overlooking pottery artifacts'
        ],
        correctIndex: 0,
        explanation: 'These items are cited to illustrate the sophisticated, diverse reciprocal trade network that exchanged goods across continents.',
        skillTested: 'IELTS Reading: Identifying Exemplification Function'
      },
      {
        id: 'ielts-q22',
        section: 'Reading',
        passageTitle: 'Bronze Age Metallurgy and Trade Networks',
        passageText: 'The transition from chalcolithic copper tools to true tin-bronze alloys around 3000 BCE revolutionized human civilization, prompting the emergence of the world\'s first interconnected intercontinental trade conduits.',
        question: 'Which of the following headings best encapsulates the primary theme of the entire passage?',
        options: [
          'The Technological Decline of the Mediterranean Basin',
          'Tin Scarcity and the Genesis of Intercontinental Bronze Age Commerce',
          'Mining Techniques for Pure Copper in Ancient Anatolia',
          'The Navigational Routes of the Uluburun Shipwreck'
        ],
        correctIndex: 1,
        explanation: 'The entire passage argues that the scarcity of tin forced societies to create the world\'s first intercontinental trade networks to produce bronze.',
        skillTested: 'IELTS Reading: Matching Section Headings'
      }
    ]
  },

  TOEFL: {
    id: 'toefl-mock-full',
    exam: 'TOEFL',
    title: 'TOEFL iBT Academic Standard Simulation',
    description: 'Realistic university-style assessment featuring 11 Reading questions on biology & ancient history and 11 Listening questions on campus dialogues & university lectures.',
    timeLimitMinutes: 25,
    totalQuestions: 22,
    sections: [
      { name: 'Reading', questionCount: 11, description: 'Passages 1-2: Hawaiian Honeycreepers (Biology) & Hydraulic Civilizations (History)' },
      { name: 'Listening', questionCount: 11, description: 'Academic Advisor Meeting, Astrophysics Lecture, Library Archival Session, and Bauhaus Modernism' }
    ],
    questions: [
      // --- TOEFL READING (Questions 1 - 11) ---
      {
        id: 'toefl-q1',
        section: 'Reading',
        passageTitle: 'Adaptive Radiation in Hawaiian Honeycreepers',
        passageText: 'When a single ancestral finch species colonized the volcanic archipelago of Hawaii approximately five million years ago, it encountered an extraordinary ecological vacuum. Isolated by thousands of miles of open Pacific Ocean, the islands harbored abundant diverse ecosystems—from lush rainforests to subalpine shrublands—with virtually no mammalian competitors and few avian rivals. Over evolutionary millennia, this ancestral lineage underwent adaptive radiation, diversifying into more than fifty distinct species known collectively as Hawaiian honeycreepers (Drepanidinae). Each species evolved remarkably specialized morphological adaptations, most notably in bill morphology and foraging behavior.',
        question: 'According to paragraph 1, what primary ecological condition fostered the adaptive radiation of the ancestral finch species?',
        options: [
          'Fierce predatory pressure from large native predatory cats',
          'An absence of mammalian competitors and diverse unoccupied ecosystems',
          'A rapid warming trend that dried out all coastal rainforests',
          'Continuous interbreeding with continental migratory birds'
        ],
        correctIndex: 1,
        explanation: 'The text highlights an "extraordinary ecological vacuum" with "abundant diverse ecosystems... with virtually no mammalian competitors and few avian rivals".',
        skillTested: 'TOEFL Reading: Factual Information'
      },
      {
        id: 'toefl-q2',
        section: 'Reading',
        passageTitle: 'Adaptive Radiation in Hawaiian Honeycreepers',
        passageText: 'When a single ancestral finch species colonized the volcanic archipelago of Hawaii approximately five million years ago, it encountered an extraordinary ecological vacuum. Isolated by thousands of miles of open Pacific Ocean...',
        question: 'The word "vacuum" in the passage is closest in meaning to:',
        options: [
          'unoccupied space or absence of competition',
          'violent tropical weather system',
          'hostile and uninhabitable terrain',
          'dense underground cave network'
        ],
        correctIndex: 0,
        explanation: 'In ecology, an "ecological vacuum" refers to an environment devoid of competitors where resources are widely accessible.',
        skillTested: 'TOEFL Reading: Vocabulary in Context'
      },
      {
        id: 'toefl-q3',
        section: 'Reading',
        passageTitle: 'Adaptive Radiation in Hawaiian Honeycreepers',
        passageText: 'The \'I\'iwi developed a long, decurved scarlet bill precisely curved to match the tubular corollas of native lobelia blossoms for nectar extraction. Conversely, the Palila evolved a stout, heavy bill capable of cracking the hard seed pods of māmane trees, while the \'Akiapōlā\'au evolved a dual-purpose chisel-and-probe bill: a short, straight lower mandible used to hammer away tree bark like a woodpecker, and a long, flexible upper mandible to probe for wood-boring larvae.',
        question: 'How does the \'Akiapōlā\'au use its specialized two-part bill to obtain food?',
        options: [
          'It uses both mandibles to crack hard volcanic rocks in search of salt',
          'Its lower mandible hammers bark while the upper mandible probes for larvae',
          'It dips its scarlet bill into flowers to suck liquid nectar',
          'It filters tiny aquatic plankton from fast-flowing mountain streams'
        ],
        correctIndex: 1,
        explanation: 'The passage describes the bill as having "a short, straight lower mandible used to hammer away tree bark... and a long, flexible upper mandible to probe for wood-boring larvae".',
        skillTested: 'TOEFL Reading: Synthesis of Detailed Descriptions'
      },
      {
        id: 'toefl-q4',
        section: 'Reading',
        passageTitle: 'Adaptive Radiation in Hawaiian Honeycreepers',
        passageText: 'The \'I\'iwi developed a long, decurved scarlet bill precisely curved to match the tubular corollas of native lobelia blossoms for nectar extraction. Conversely, the Palila evolved a stout, heavy bill capable of cracking the hard seed pods of māmane trees...',
        question: 'According to paragraph 2, all of the following are specialized adaptations of honeycreepers EXCEPT:',
        options: [
          'A decurved bill matching tubular flower blossoms',
          'A heavy bill suited for cracking hard seed pods',
          'Webbed feet adapted for deep underwater diving',
          'A chisel-like lower mandible for hammering tree bark'
        ],
        correctIndex: 2,
        explanation: 'Webbed feet for diving are never mentioned in the text (honeycreepers are forest/shrubland birds with bill adaptations).',
        skillTested: 'TOEFL Reading: Negative Factual (EXCEPT)'
      },
      {
        id: 'toefl-q5',
        section: 'Reading',
        passageTitle: 'Adaptive Radiation in Hawaiian Honeycreepers',
        passageText: 'Tragically, the introduction of non-native mosquitoes carrying avian malaria (Plasmodium relictum) in 1826 decimated low-elevation populations, restricting surviving species to high-altitude cold zones where mosquitoes cannot reproduce.',
        question: 'Which of the following can be inferred from the final sentence about the surviving honeycreeper populations?',
        options: [
          'They have developed natural genetic immunity to avian malaria',
          'Their long-term survival depends on cold high-elevation thermal barriers against mosquitoes',
          'They migrate annually to the North American continent during winter',
          'They only feed on mosquitoes in low-elevation valleys'
        ],
        correctIndex: 1,
        explanation: 'The text states surviving species are restricted to "high-altitude cold zones where mosquitoes cannot reproduce", implying cold elevation is their sole barrier.',
        skillTested: 'TOEFL Reading: Inference'
      },
      {
        id: 'toefl-q6',
        section: 'Reading',
        passageTitle: 'Adaptive Radiation in Hawaiian Honeycreepers',
        passageText: 'Conversely, the Palila evolved a stout, heavy bill capable of cracking the hard seed pods of māmane trees...',
        question: 'Why does the author mention the "māmane trees"?',
        options: [
          'To introduce the primary predator that hunts honeycreepers',
          'To provide an example of a specific botanical food source driving bill specialization',
          'To explain why early Hawaiian volcanic soil lacked essential minerals',
          'To argue that deforestation in Hawaii began millions of years ago'
        ],
        correctIndex: 1,
        explanation: 'The author mentions māmane trees to illustrate how the Palila\'s heavy bill evolved specifically to exploit their hard seed pods.',
        skillTested: 'TOEFL Reading: Rhetorical Purpose'
      },
      {
        id: 'toefl-q7',
        section: 'Reading',
        passageTitle: 'The Hydraulic Hypothesis and Mesopotamian Urbanization',
        passageText: 'In the mid-twentieth century, historian Karl Wittfogel formulated the "Hydraulic Hypothesis," arguing that the monumental challenges of water management in arid alluvial floodplains necessitated the rise of centralized despotic state bureaucracies. In southern Mesopotamia, the Tigris and Euphrates rivers did not flood during the autumn agricultural planting season, but rather unpredictably in late spring when melting snow in the Anatolian highlands coincided with crop maturation. Consequently, survival mandated extensive communal irrigation networks: digging massive diversion channels, constructing earthen levees, and dredging silted canals.',
        question: 'What is the core argument of Karl Wittfogel\'s Hydraulic Hypothesis?',
        options: [
          'Civilizations collapse whenever their domestic water supplies become contaminated',
          'Large-scale water management in arid climates required centralized despotic governments',
          'Ancient Mesopotamians abandoned agriculture in favor of nomadic fishing',
          'Democratic city-states are more efficient at building canals than kingdoms'
        ],
        correctIndex: 1,
        explanation: 'Wittfogel argued that "the monumental challenges of water management in arid alluvial floodplains necessitated the rise of centralized despotic state bureaucracies".',
        skillTested: 'TOEFL Reading: Core Thesis Comprehension'
      },
      {
        id: 'toefl-q8',
        section: 'Reading',
        passageTitle: 'The Hydraulic Hypothesis and Mesopotamian Urbanization',
        passageText: 'In southern Mesopotamia, the Tigris and Euphrates rivers did not flood during the autumn agricultural planting season, but rather unpredictably in late spring when melting snow in the Anatolian highlands coincided with crop maturation. Consequently, survival mandated extensive communal irrigation networks...',
        question: 'Why did the natural flooding cycle of the Tigris and Euphrates pose a severe danger to Mesopotamian farmers?',
        options: [
          'The rivers dried up completely for decades at a time',
          'Spring floodwaters arrived late during harvest season rather than planting, risking crop destruction',
          'The water was poisoned by volcanic ash from Anatolia',
          'The currents were too slow to turn irrigation waterwheels'
        ],
        correctIndex: 1,
        explanation: 'The rivers flooded "unpredictably in late spring when melting snow... coincided with crop maturation", threatening ripening crops instead of assisting autumn planting.',
        skillTested: 'TOEFL Reading: Factual Detail Extraction'
      },
      {
        id: 'toefl-q9',
        section: 'Reading',
        passageTitle: 'The Hydraulic Hypothesis and Mesopotamian Urbanization',
        passageText: 'Wittfogel posited that the coordination of labor required to build and maintain these vast hydraulic systems propelled the emergence of an administrative hierarchy, priestly accounting systems (cuneiform tablets), and coercive political authority.',
        question: 'The word "coercive" in the passage is closest in meaning to:',
        options: [
          'enforced through power or threat of force',
          'gentle and purely advisory',
          'universally popular among voters',
          'short-lived and ineffective'
        ],
        correctIndex: 0,
        explanation: '"Coercive" describes political authority that compels obedience through legal or physical enforcement.',
        skillTested: 'TOEFL Reading: Vocabulary in Context'
      },
      {
        id: 'toefl-q10',
        section: 'Reading',
        passageTitle: 'The Hydraulic Hypothesis and Mesopotamian Urbanization',
        passageText: 'While contemporary archaeologists critique Wittfogel\'s unilinear determinism—noting that smaller localized irrigation existed centuries before centralized kingship emerged—most concede that irrigation infrastructure and state bureaucracy developed in a reciprocal, mutually reinforcing dialectic.',
        question: 'What is the primary criticism that modern archaeologists level against Wittfogel\'s hypothesis?',
        options: [
          'Mesopotamia never experienced any flooding in recorded history',
          'Small-scale localized irrigation existed long before powerful centralized monarchs arose',
          'Wittfogel falsified his archaeological excavation reports in Iraq',
          'Canals were constructed entirely by foreign mercenary armies'
        ],
        correctIndex: 1,
        explanation: 'Archaeologists critique Wittfogel\'s deterministic claim by noting that "smaller localized irrigation existed centuries before centralized kingship emerged".',
        skillTested: 'TOEFL Reading: Counter-Argument Analysis'
      },
      {
        id: 'toefl-q11',
        section: 'Reading',
        passageTitle: 'The Hydraulic Hypothesis and Mesopotamian Urbanization',
        passageText: 'While contemporary archaeologists critique Wittfogel\'s unilinear determinism... most concede that irrigation infrastructure and state bureaucracy developed in a reciprocal, mutually reinforcing dialectic.',
        question: 'Which of the following sentences best expresses the essential meaning of the highlighted statement?',
        options: [
          'Modern scholars believe that irrigation systems and state institutions evolved together by influencing each other',
          'State bureaucracy was completely responsible for destroying ancient irrigation canals',
          'Archaeologists now reject all connections between water canals and ancient politics',
          'Irrigation networks were abandoned as soon as centralized kings came to power'
        ],
        correctIndex: 0,
        explanation: 'A "reciprocal, mutually reinforcing dialectic" means both systems developed together, each stimulating the growth of the other.',
        skillTested: 'TOEFL Reading: Sentence Simplification'
      },

      // --- TOEFL LISTENING (Questions 12 - 22) ---
      {
        id: 'toefl-q12',
        section: 'Listening',
        audioPrompt: 'Student: "Hi Dr. Patterson, thanks for seeing me. I was hoping to get approval for an overload waiver to register for nineteen credits next semester. I need to take Advanced Econometrics to finish my economics major, but I also have to complete the laboratory science distribution requirement with Environmental Geology." Advisor: "Well Sultan, nineteen credits is a rigorous courseload. Looking at your transcript, your GPA is strong at three point eight, but Econometrics requires twenty hours of weekly problem sets. If your lab course also has three hours of field excursions every Saturday, you risk burning out before midterms. Have you considered taking Environmental Geology online during the summer term instead?"',
        question: 'Why did the student visit Dr. Patterson\'s office?',
        options: [
          'To apply for a scholarship in the economics department',
          'To request permission for a 19-credit academic overload',
          'To withdraw from the Environmental Geology laboratory',
          'To dispute a low grade received on an econometrics exam'
        ],
        correctIndex: 1,
        explanation: 'The student states: "I was hoping to get approval for an overload waiver to register for nineteen credits next semester".',
        skillTested: 'TOEFL Listening: Main Purpose of Conversation'
      },
      {
        id: 'toefl-q13',
        section: 'Listening',
        audioPrompt: 'Advisor: "Looking at your transcript, your GPA is strong at three point eight, but Econometrics requires twenty hours of weekly problem sets. If your lab course also has three hours of field excursions every Saturday, you risk burning out before midterms."',
        question: 'What specific risk does the advisor warn the student about?',
        options: [
          'Failing the economics graduation thesis defense',
          'Burning out due to excessive weekly problem sets and Saturday field excursions',
          'Losing financial aid due to dropping below full-time status',
          'Conflicting final exam schedules in December'
        ],
        correctIndex: 1,
        explanation: 'The advisor warns that 20 hours of problem sets plus 3 hours of Saturday fieldwork risks "burning out before midterms".',
        skillTested: 'TOEFL Listening: Identifying Specific Detail & Concern'
      },
      {
        id: 'toefl-q14',
        section: 'Listening',
        audioPrompt: 'Advisor: "Have you considered taking Environmental Geology online during the summer term instead? That way you can dedicate your full intellectual energy to Econometrics this spring, keep your high GPA, and still graduate on schedule in August."',
        question: 'What alternative does the advisor suggest to resolve the student\'s scheduling dilemma?',
        options: [
          'Dropping the economics major in favor of environmental science',
          'Postponing graduation by an entire academic year',
          'Taking Environmental Geology online during the summer term',
          'Auditing Econometrics without receiving course credit'
        ],
        correctIndex: 2,
        explanation: 'The advisor suggests taking "Environmental Geology online during the summer term instead" to balance workload.',
        skillTested: 'TOEFL Listening: Connecting Advice & Recommendations'
      },
      {
        id: 'toefl-q15',
        section: 'Listening',
        audioPrompt: 'Professor: "Beyond the orbit of Neptune, past thirty astronomical units, lies the Kuiper Belt—a vast circumstellar disc populated by icy planetesimals left over from the formation of our solar system. Now, what\'s fascinating is that the spatial distribution of Kuiper Belt objects isn\'t random. Neptune\'s gravitational pull exerts what we call orbital resonances. Take Pluto, for example. For every three orbits Neptune completes around the Sun, Pluto completes exactly two. This two-to-three mean-motion resonance prevents Pluto and Neptune from ever colliding, even though Pluto\'s eccentric elliptical orbit actually crosses inside Neptune\'s orbital path."',
        question: 'What is the primary topic of the astrophysics lecture excerpt?',
        options: [
          'The chemical composition of cometary tails in the Oort Cloud',
          'How Neptune\'s gravitational orbital resonances structure the Kuiper Belt',
          'The discovery of life beneath the icy crust of Europa',
          'Why Pluto was reclassified as a terrestrial planet'
        ],
        correctIndex: 1,
        explanation: 'The professor discusses the Kuiper Belt and explains how "Neptune\'s gravitational pull exerts what we call orbital resonances" with bodies like Pluto.',
        skillTested: 'TOEFL Listening: Lecture Main Idea'
      },
      {
        id: 'toefl-q16',
        section: 'Listening',
        audioPrompt: 'Professor: "For every three orbits Neptune completes around the Sun, Pluto completes exactly two. This two-to-three mean-motion resonance prevents Pluto and Neptune from ever colliding, even though Pluto\'s eccentric elliptical orbit actually crosses inside Neptune\'s orbital path."',
        question: 'How does the 2:3 orbital resonance protect Pluto from colliding with Neptune?',
        options: [
          'It synchronizes their positions so Pluto is always far from Neptune when crossing its orbit',
          'It forces Pluto into a completely circular orbit outside Neptune\'s plane',
          'It pushes Neptune backwards into the inner solar system every two years',
          'It creates a magnetic barrier that repels Pluto\'s moons'
        ],
        correctIndex: 0,
        explanation: 'The resonance synchronizes their orbital periods so they are never in the same spatial vicinity when Pluto crosses Neptune\'s orbital distance.',
        skillTested: 'TOEFL Listening: Understanding Complex Scientific Explanations'
      },
      {
        id: 'toefl-q17',
        section: 'Listening',
        audioPrompt: 'Professor: "Kuiper Belt objects are pristine relic planetesimals left over from the primordial protoplanetary disc. By measuring the isotopic ratios of deuterium to hydrogen in their water ice, planetary scientists can reconstruct the thermal conditions of the infant solar system four point six billion years ago."',
        question: 'Why do planetary scientists value the chemical study of Kuiper Belt objects?',
        options: [
          'They contain pristine ancient isotopes that reveal conditions in the early solar system',
          'They provide commercial rocket fuel for interstellar space travel',
          'They prove that the Sun once had two companion stars',
          'They emit radio signals that assist deep-space navigation'
        ],
        correctIndex: 0,
        explanation: 'The professor states they are "pristine relic planetesimals" whose isotopic ratios help "reconstruct the thermal conditions of the infant solar system".',
        skillTested: 'TOEFL Listening: Recognizing Scientific Significance'
      },
      {
        id: 'toefl-q18',
        section: 'Listening',
        audioPrompt: 'Librarian: "For your history seminar paper on nineteenth-century labor strikes, digital databases are great for secondary articles, but primary source newspapers on microfilm are located in the basement special collections. You\'ll need to submit a call slip forty-eight hours before your scheduled reading room session because those archives are kept in off-site climate-controlled storage."',
        question: 'Why must the student submit a call slip 48 hours in advance for microfilm materials?',
        options: [
          'The microfilm archives are housed in off-site climate-controlled storage',
          'The reading room only allows five visitors per month',
          'The student must pay an archival viewing deposit in advance',
          'The original newspapers must be translated from German first'
        ],
        correctIndex: 0,
        explanation: 'The librarian explains: "because those archives are kept in off-site climate-controlled storage".',
        skillTested: 'TOEFL Listening: Identifying Procedural Requirements'
      },
      {
        id: 'toefl-q19',
        section: 'Listening',
        audioPrompt: 'Student: "Can I take smartphone photographs of the 1894 strike articles, or do I need to use the library scanners?" Librarian: "Under special collection policy, flash photography is strictly prohibited to preserve paper integrity, but you can save digital scans directly to a USB drive using our overhead high-resolution scanners free of charge."',
        question: 'What is the library\'s policy regarding copying special collection documents?',
        options: [
          'All copying or photography is strictly forbidden under federal copyright',
          'Students can use overhead high-resolution scanners without flash, free of charge',
          'Students must pay fifty cents per photocopy at the checkout desk',
          'Only faculty members are permitted to scan microfilm'
        ],
        correctIndex: 1,
        explanation: 'Flash is prohibited, but students "can save digital scans directly to a USB drive using our overhead high-resolution scanners free of charge".',
        skillTested: 'TOEFL Listening: Policy & Constraint Comprehension'
      },
      {
        id: 'toefl-q20',
        section: 'Listening',
        audioPrompt: 'Professor: "Founded by Walter Gropius in 1919 in Weimar, the Bauhaus school dismantled the traditional hierarchy between fine art and industrial craft. Gropius argued that modern architecture must discard superfluous ornamental plasterwork and historical revivalism. Instead, the form of a building must follow its utilitarian function—hence the maxim \'form follows function.\' By celebrating industrial materials—reinforced concrete, tubular steel, and expansive curtain walls of plate glass—Bauhaus architects created bright, hygienic, egalitarian living spaces designed for mass production in an industrialized democratic society."',
        question: 'What was Walter Gropius\'s revolutionary vision for the Bauhaus school?',
        options: [
          'Reviving Greek and Gothic decorative marble facades',
          'Dismantling the divide between fine art and craft to create functional, mass-produced design',
          'Restricting architectural education solely to royal academy graduates',
          'Designing elaborate private palaces for European aristocrats'
        ],
        correctIndex: 1,
        explanation: 'Gropius sought to "dismantle the traditional hierarchy between fine art and industrial craft" and create utilitarian design for mass society.',
        skillTested: 'TOEFL Listening: Art History Philosophical Stance'
      },
      {
        id: 'toefl-q21',
        section: 'Listening',
        audioPrompt: 'Professor: "Instead, the form of a building must follow its utilitarian function—hence the maxim \'form follows function.\' By celebrating industrial materials—reinforced concrete, tubular steel, and expansive curtain walls of plate glass..."',
        question: 'Which materials were celebrated by Bauhaus architects in their designs?',
        options: [
          'Carved mahogany, ornamental gold leaf, and stained glass',
          'Reinforced concrete, tubular steel, and plate glass curtain walls',
          'Adobe sun-dried clay and hand-woven thatch roofing',
          'Polished Carrara marble and decorative wrought iron'
        ],
        correctIndex: 1,
        explanation: 'The professor lists "reinforced concrete, tubular steel, and expansive curtain walls of plate glass".',
        skillTested: 'TOEFL Listening: Material Identification'
      },
      {
        id: 'toefl-q22',
        section: 'Listening',
        audioPrompt: 'Professor: "Notice how Gropius connected architecture with civic democracy. For him, a glass curtain wall wasn\'t just an aesthetic choice; it was an embodiment of transparency and egalitarian light accessible to all social strata, not merely the elite."',
        question: 'What symbolic meaning did Bauhaus architects associate with glass curtain walls?',
        options: [
          'Civic transparency, egalitarian light, and democratic access',
          'Extreme secrecy and commercial isolation',
          'A desire to trap solar thermal heat in cold winters',
          'Subservience to traditional imperial authority'
        ],
        correctIndex: 0,
        explanation: 'The professor notes the glass wall was "an embodiment of transparency and egalitarian light accessible to all social strata".',
        skillTested: 'TOEFL Listening: Inferring Symbolic & Philosophical Meaning'
      }
    ]
  },

  TOEIC: {
    id: 'toeic-mock-full',
    exam: 'TOEIC',
    title: 'TOEIC Workplace & Business Communication Simulation',
    description: 'Comprehensive 22-question corporate assessment featuring 10 Listening questions (Parts 1-4) and 12 Reading questions (Parts 5-7).',
    timeLimitMinutes: 25,
    totalQuestions: 22,
    sections: [
      { name: 'Listening', questionCount: 10, description: 'Parts 1-4: Photographs, Q&A responses, office dialogue, and keynote announcements' },
      { name: 'Reading', questionCount: 12, description: 'Parts 5-7: Commercial grammar, internal policy memo, and cross-referenced purchase order' }
    ],
    questions: [
      // --- TOEIC LISTENING (Questions 1 - 10) ---
      {
        id: 'toeic-q1',
        section: 'Listening',
        audioPrompt: 'Look at photo number 1: Four executives are gathered around an oval conference table reviewing projected quarterly revenue figures on a wall-mounted digital display screen.',
        question: 'Which statement best describes what is shown in the photograph?',
        options: [
          'Executives are seated around a conference table examining quarterly data on a display screen',
          'A technician is repairing an overhead projector in an empty auditorium',
          'Employees are packing cardboard boxes in a distribution warehouse',
          'A waiter is serving lunch to customers at an outdoor café'
        ],
        correctIndex: 0,
        explanation: 'Option A matches the audio description of executives around an oval conference table viewing projected revenue figures.',
        skillTested: 'TOEIC Part 1: Photographs (Workplace Scenarios)'
      },
      {
        id: 'toeic-q2',
        section: 'Listening',
        audioPrompt: 'Look at photo number 2: A forklift operator wearing a yellow safety helmet is carefully positioning a wooden pallet stacked with corrugated shipping cartons onto an industrial storage rack.',
        question: 'Which statement accurately depicts the activity in the warehouse photograph?',
        options: [
          'A forklift operator is stacking a pallet of shipping cartons onto a storage rack',
          'Workers are painting yellow safety lines onto the warehouse concrete floor',
          'A delivery driver is signing an invoice on a digital handheld clipboard',
          'An inspector is measuring empty wooden crates outside a cargo dock'
        ],
        correctIndex: 0,
        explanation: 'Option A directly reflects the forklift operator positioning a pallet of corrugated cartons onto an industrial storage rack.',
        skillTested: 'TOEIC Part 1: Photographs (Logistics & Industrial Operations)'
      },
      {
        id: 'toeic-q3',
        section: 'Listening',
        audioPrompt: 'Question: "Where did Ms. Chen leave the signed purchase agreement for the server equipment?" Option A: "At three thirty this afternoon." Option B: "She placed it in the folder on the director\'s desk." Option C: "Yes, it was very expensive."',
        question: 'What is the most appropriate response to the question?',
        options: [
          'At three thirty this afternoon.',
          'She placed it in the folder on the director\'s desk.',
          'Yes, it was very expensive.'
        ],
        correctIndex: 1,
        explanation: 'Option B correctly answers the "Where" location question. Option A answers "When", and Option C is an irrelevant yes/no reply.',
        skillTested: 'TOEIC Part 2: Question-Response (Location Inquiries)'
      },
      {
        id: 'toeic-q4',
        section: 'Listening',
        audioPrompt: 'Question: "Should we hold the client presentation in Conference Room B or stream it via the web auditorium?" Option A: "The client specifically requested a virtual videoconference." Option B: "Yes, the conference was very informative." Option C: "Mr. Davis will speak about marketing."',
        question: 'What is the most appropriate response to the alternative question?',
        options: [
          'The client specifically requested a virtual videoconference.',
          'Yes, the conference was very informative.',
          'Mr. Davis will speak about marketing.'
        ],
        correctIndex: 0,
        explanation: 'Option A resolves the choice between Conference Room B and web auditorium by citing the client\'s preference for a virtual format.',
        skillTested: 'TOEIC Part 2: Question-Response (Alternative Choices)'
      },
      {
        id: 'toeic-q5',
        section: 'Listening',
        audioPrompt: 'Question: "Isn\'t the third-quarter budget revision due by five PM today?" Option A: "No, the finance committee granted us an extension until Monday." Option B: "Around fifteen dollars per ticket." Option C: "I enjoyed the annual banquet very much."',
        question: 'What is the most appropriate response to the negative question?',
        options: [
          'No, the finance committee granted us an extension until Monday.',
          'Around fifteen dollars per ticket.',
          'I enjoyed the annual banquet very much.'
        ],
        correctIndex: 0,
        explanation: 'Option A addresses the deadline inquiry directly by confirming that an extension was approved.',
        skillTested: 'TOEIC Part 2: Question-Response (Deadline Confirmations)'
      },
      {
        id: 'toeic-q6',
        section: 'Listening',
        audioPrompt: 'Woman: "Hi Mark, have you heard if the graphic design firm finished the marketing brochures for next week\'s Tokyo Trade Expo?" Man: "I spoke with their account manager this morning. They completed the layout proofs, but printing is delayed because our overseas shipping agent hasn\'t confirmed delivery rates." Woman: "That\'s concerning. Let\'s arrange an expedited courier service directly. I\'ll authorize the additional express freight cost from our discretionary marketing fund."',
        question: 'What is the primary topic of the conversation?',
        options: [
          'Booking hotel rooms for the Tokyo Trade Expo',
          'A delay in shipping promotional brochures for an upcoming trade expo',
          'Interviewing graphic designers for a full-time position',
          'Negotiating lower advertising rates with local newspapers'
        ],
        correctIndex: 1,
        explanation: 'The speakers are discussing brochures for the Tokyo Trade Expo that are facing delivery delays due to freight rates.',
        skillTested: 'TOEIC Part 3: Office Conversations (Identifying Main Topic)'
      },
      {
        id: 'toeic-q7',
        section: 'Listening',
        audioPrompt: 'Man: "They completed the layout proofs, but printing is delayed because our overseas shipping agent hasn\'t confirmed delivery rates."',
        question: 'What obstacle is currently delaying the printing of the brochures?',
        options: [
          'The graphic designers lost the company logo files',
          'The overseas shipping agent has not confirmed freight rates',
          'The Tokyo Expo was unexpectedly cancelled',
          'The printing press ran out of colored ink'
        ],
        correctIndex: 1,
        explanation: 'The man explicitly states printing is delayed "because our overseas shipping agent hasn\'t confirmed delivery rates".',
        skillTested: 'TOEIC Part 3: Office Conversations (Identifying Causes)'
      },
      {
        id: 'toeic-q8',
        section: 'Listening',
        audioPrompt: 'Woman: "That\'s concerning. Let\'s arrange an expedited courier service directly. I\'ll authorize the additional express freight cost from our discretionary marketing fund."',
        question: 'What action does the woman propose to solve the problem?',
        options: [
          'Cancelling the company\'s booth reservation in Tokyo',
          'Authorizing express courier costs from the discretionary marketing budget',
          'Printing black-and-white flyers on the office copier',
          'Demanding a full refund from the graphic design agency'
        ],
        correctIndex: 1,
        explanation: 'The woman offers to "arrange an expedited courier service directly" and "authorize the additional express freight cost from our discretionary marketing fund".',
        skillTested: 'TOEIC Part 3: Office Conversations (Action Proposals)'
      },
      {
        id: 'toeic-q9',
        section: 'Listening',
        audioPrompt: 'Attention passengers holding boarding passes for Global Airways flight eight nine zero to London Heathrow. Due to routine mechanical maintenance on our Boeing 787 aircraft, boarding will now take place at Gate F fourteen instead of Gate D eight. Flight departure time remains unchanged at six fifteen PM. Passengers requiring special assistance are invited to board first.',
        question: 'What change does the airport announcer communicate to passengers?',
        options: [
          'A three-hour departure delay due to weather',
          'A change of departure gate from D8 to F14',
          'A cancellation of all transatlantic flights',
          'A change in passenger baggage allowance fees'
        ],
        correctIndex: 1,
        explanation: 'The announcer states: "boarding will now take place at Gate F fourteen instead of Gate D eight".',
        skillTested: 'TOEIC Part 4: Short Talks (Airport Announcements)'
      },
      {
        id: 'toeic-q10',
        section: 'Listening',
        audioPrompt: 'Good morning, delegates. It is my pleasure to introduce Dr. Sandra Bell, Chief Technology Officer at Nexus Robotics. Before Dr. Bell presents her keynote on artificial intelligence in automated supply chain distribution, please silence all cellular devices. Following her forty-minute lecture, there will be a brief fifteen-minute question-and-answer period in the main foyer.',
        question: 'What are attendees instructed to do before the keynote begins?',
        options: [
          'Turn off or silence all cellular phones',
          'Submit written questions to the stage assistants',
          'Move to the second-floor breakout room',
          'Purchase copies of Dr. Bell\'s latest textbook'
        ],
        correctIndex: 0,
        explanation: 'The speaker asks: "Before Dr. Bell presents her keynote... please silence all cellular devices".',
        skillTested: 'TOEIC Part 4: Short Talks (Conference Directives)'
      },

      // --- TOEIC READING (Questions 11 - 22) ---
      {
        id: 'toeic-q11',
        section: 'Reading',
        question: 'The senior legal counsel reviewed the licensing terms ________ before submitting the finalized contract to the board of directors.',
        options: [
          'thoroughly',
          'thorough',
          'thoroughness',
          'more thorough'
        ],
        correctIndex: 0,
        explanation: 'The sentence requires an adverb ("thoroughly") to modify the action verb "reviewed".',
        skillTested: 'TOEIC Part 5: Incomplete Sentences (Adverb vs Adjective)'
      },
      {
        id: 'toeic-q12',
        section: 'Reading',
        question: 'Due to ongoing international supply chain bottlenecks, management decided to implement a ________ plan to ensure uninterrupted manufacturing operations.',
        options: [
          'contingency',
          'continuation',
          'contentious',
          'contingent'
        ],
        correctIndex: 0,
        explanation: '"Contingency plan" (rencana darurat / cadangan) is a standard business collocation denoting a backup procedure for unexpected crises.',
        skillTested: 'TOEIC Part 5: Incomplete Sentences (Business Collocations)'
      },
      {
        id: 'toeic-q13',
        section: 'Reading',
        question: '________ all reimbursement expense claims are accompanied by valid itemized receipts, accounting will disburse payments within five business days.',
        options: [
          'Provided that',
          'In spite of',
          'As a result of',
          'Whereas'
        ],
        correctIndex: 0,
        explanation: '"Provided that" functions as a conditional conjunction meaning "on the condition that" / "as long as".',
        skillTested: 'TOEIC Part 5: Incomplete Sentences (Conditional Conjunctions)'
      },
      {
        id: 'toeic-q14',
        section: 'Reading',
        question: 'All legacy desktop computers in the billing department ________ by high-performance workstations before the start of the next fiscal quarter.',
        options: [
          'will be replaced',
          'are replacing',
          'have replaced',
          'replace'
        ],
        correctIndex: 0,
        explanation: 'The subject "legacy desktop computers" receives the action, requiring a future passive construction ("will be replaced").',
        skillTested: 'TOEIC Part 5: Incomplete Sentences (Future Passive Voice)'
      },
      {
        id: 'toeic-q15',
        section: 'Reading',
        question: 'The regional sales director commended the field marketing team ________ exceeding their quarterly sales quotas by over twenty percent.',
        options: [
          'for',
          'with',
          'at',
          'upon'
        ],
        correctIndex: 0,
        explanation: 'The verb "commend" pairs with the preposition "for" (commend someone for doing something).',
        skillTested: 'TOEIC Part 5: Incomplete Sentences (Prepositional Collocations)'
      },
      {
        id: 'toeic-q16',
        section: 'Reading',
        passageTitle: 'Internal Memorandum: Revised Travel Policy',
        passageText: 'To: All Regional Staff\nFrom: Executive Committee\nDate: December 1\nSubject: Updated Travel & Lodging Guidelines\n\nEffective January 1, Apex Global will implement updated corporate travel regulations. All domestic and international business flights exceeding six hours in continuous duration will now be eligible for business class upgrades. (16) ________, hotel reservations must be booked exclusively through our designated enterprise travel portal.\n\nEmployees who secure lodging independently will not be eligible for reimbursement unless prior written (17) ________ has been granted by their department vice president. We appreciate your cooperation in helping the company streamline administrative workflows while maintaining fiscal (18) ________.',
        question: 'Which transitional word best fits in blank (16)?',
        options: [
          'Furthermore',
          'Otherwise',
          'Consequently',
          'Instead'
        ],
        correctIndex: 0,
        explanation: '"Furthermore" appropriately introduces an additional related corporate regulation (mandatory hotel booking portal).',
        skillTested: 'TOEIC Part 6: Text Completion (Cohesive Transitions)'
      },
      {
        id: 'toeic-q17',
        section: 'Reading',
        passageTitle: 'Internal Memorandum: Revised Travel Policy',
        passageText: 'Employees who secure lodging independently will not be eligible for reimbursement unless prior written (17) ________ has been granted by their department vice president.',
        question: 'Which word form best completes blank (17)?',
        options: [
          'authorization',
          'authorized',
          'authoritative',
          'authoritatively'
        ],
        correctIndex: 0,
        explanation: 'The adjective "written" requires a noun ("authorization") to serve as the subject of the passive clause "has been granted".',
        skillTested: 'TOEIC Part 6: Text Completion (Part of Speech)'
      },
      {
        id: 'toeic-q18',
        section: 'Reading',
        passageTitle: 'Internal Memorandum: Revised Travel Policy',
        passageText: 'We appreciate your cooperation in helping the company streamline administrative workflows while maintaining fiscal (18) ________.',
        question: 'Which business noun best completes blank (18)?',
        options: [
          'discipline',
          'hesitation',
          'penalty',
          'confrontation'
        ],
        correctIndex: 0,
        explanation: '"Fiscal discipline" is a widespread corporate term referring to careful, prudent financial management.',
        skillTested: 'TOEIC Part 6: Text Completion (Corporate Terminology)'
      },
      {
        id: 'toeic-q19',
        section: 'Reading',
        passageTitle: 'Cross-Referenced Correspondence: Order Inquiry #4489',
        passageText: 'Document 1: Email from Client\nTo: sales@kensingtonoffice.com\nFrom: s.arifin@englicious.com\nDate: October 14\nSubject: Order Inquiry - PO #4489\n\nDear Kensington Sales Team,\nI am writing to inquire regarding Purchase Order #4489 placed on October 5 for twenty ergonomic office workstations. Our billing department received the automated shipping confirmation, but the courier tracking number indicates that only fifteen workstations have cleared your regional warehouse. We have a scheduled branch grand opening on October 25, so timely delivery of the complete order is critical to our launch schedule.\n\nDocument 2: Vendor Response\nTo: s.arifin@englicious.com\nFrom: c.reyes@kensingtonoffice.com\nDate: October 15\nSubject: RE: Order Inquiry - PO #4489\n\nDear Mr. Arifin,\nThank you for bringing this to our attention. Upon reviewing our assembly line inventory, we experienced a temporary component shortage for the mahogany desktop panels on the remaining five units. The final five units were inspected yesterday and dispatched via priority air cargo this morning at no additional charge to your account. Both shipments are guaranteed to arrive at your Jakarta facility by October 20, well ahead of your October 25 opening.',
        question: 'Why did Mr. Arifin send the initial email to Kensington Office Supplies?',
        options: [
          'To request a product catalog for ergonomic chairs',
          'To inquire why only fifteen of the twenty ordered workstations were dispatched',
          'To cancel the purchase order due to defective equipment',
          'To ask for an extension on paying the final invoice'
        ],
        correctIndex: 1,
        explanation: 'Mr. Arifin wrote because "the courier tracking number indicates that only fifteen workstations have cleared your regional warehouse" out of 20 ordered.',
        skillTested: 'TOEIC Part 7: Reading Comprehension (Stated Purpose)'
      },
      {
        id: 'toeic-q20',
        section: 'Reading',
        passageTitle: 'Cross-Referenced Correspondence: Order Inquiry #4489',
        passageText: 'Upon reviewing our assembly line inventory, we experienced a temporary component shortage for the mahogany desktop panels on the remaining five units.',
        question: 'What caused the partial delay in fulfilling the order?',
        options: [
          'Severe weather grounded all regional cargo planes',
          'A component shortage of mahogany desktop panels',
          'Mr. Arifin provided an incorrect delivery postal code',
          'The factory was closed for annual maintenance'
        ],
        correctIndex: 1,
        explanation: 'Ms. Reyes explains they had "a temporary component shortage for the mahogany desktop panels on the remaining five units".',
        skillTested: 'TOEIC Part 7: Reading Comprehension (Factual Cause Extraction)'
      },
      {
        id: 'toeic-q21',
        section: 'Reading',
        passageTitle: 'Cross-Referenced Correspondence: Order Inquiry #4489',
        passageText: 'The final five units were inspected yesterday and dispatched via priority air cargo this morning at no additional charge to your account.',
        question: 'What accommodation did Kensington Office Supplies provide to resolve the client\'s concern?',
        options: [
          'A fifty percent refund on the entire invoice',
          'Shipping the remaining units via priority air cargo at no extra charge',
          'Sending five temporary plastic desks as replacements',
          'Offering free assembly tools for the workstations'
        ],
        correctIndex: 1,
        explanation: 'The vendor dispatched the remaining units "via priority air cargo this morning at no additional charge".',
        skillTested: 'TOEIC Part 7: Reading Comprehension (Recognizing Customer Service Resolution)'
      },
      {
        id: 'toeic-q22',
        section: 'Reading',
        passageTitle: 'Cross-Referenced Correspondence: Order Inquiry #4489',
        passageText: 'Both shipments are guaranteed to arrive at your Jakarta facility by October 20, well ahead of your October 25 opening.',
        question: 'By what date is the entire shipment guaranteed to reach Mr. Arifin\'s facility?',
        options: [
          'October 5',
          'October 14',
          'October 20',
          'October 25'
        ],
        correctIndex: 2,
        explanation: 'The email explicitly guarantees that both shipments will arrive "by October 20".',
        skillTested: 'TOEIC Part 7: Cross-Referenced Schedule Verification'
      }
    ]
  }
};
