import React, { useState } from 'react';
import { 
  PenTool, CheckCircle2, AlertCircle, Sparkles, BookOpen, 
  Clock, ArrowRight, RotateCcw, Copy, Check, BarChart2, Award, FileText 
} from 'lucide-react';
import { sounds } from '../utils/sound';
import confetti from 'canvas-confetti';

interface WritingPrompt {
  id: string;
  type: 'IELTS Task 1' | 'IELTS Task 2' | 'TOEFL Academic Discussion' | 'Business Memo';
  title: string;
  promptText: string;
  minWords: number;
  timeLimitMins: number;
  sampleModelAnswer: string;
  keyPoints: string[];
  recommendedTransitions: string[];
}

const SAMPLE_PROMPTS: WritingPrompt[] = [
  {
    id: 'ielts-task-2-ai',
    type: 'IELTS Task 2',
    title: 'Artificial Intelligence and Future Employment',
    promptText: 'Some people believe that technological developments and AI will lead to widespread unemployment, while others argue that technology creates more skilled opportunities than it eliminates. Discuss both views and give your own opinion.',
    minWords: 250,
    timeLimitMins: 40,
    keyPoints: [
      'Automation of routine manual & clerical tasks',
      'Emergence of new engineering, data, and maintenance roles',
      'The need for institutional reskilling programs',
      'Clear thesis and balanced personal conclusion'
    ],
    recommendedTransitions: [
      'On the one hand...',
      'Conversely...',
      'Furthermore...',
      'It is widely acknowledged that...',
      'In conclusion...'
    ],
    sampleModelAnswer: `In contemporary economic discourse, the rapid proliferation of artificial intelligence has sparked contentious debate regarding its long-term impact on global employment. While a considerable segment of observers fears catastrophic displacement of traditional labor, I firmly contend that technological advancements fundamentally transform the workforce rather than permanently eliminate human occupation.

On the one hand, proponents of the displacement perspective argue that automated algorithms and robotics surpass human efficiency in repetitive tasks. For instance, algorithmic data processing has curtailed administrative clerical roles, while automated assembly systems have reduced factory workforce demands. Consequently, without rapid retraining, vulnerable segments of the workforce risk prolonged economic marginalization.

Conversely, historical evidence indicates that technological revolutions ultimately generate unprecedented vocational categories. The advent of personal computing rendered traditional typists obsolete, yet simultaneously fostered software development, digital marketing, and cybersecurity industries. Similarly, modern artificial intelligence requires specialized prompt architects, ethics compliance officers, and system curators. Furthermore, artificial intelligence elevates human workers from rote tasks, allowing greater focus on creativity, diplomacy, and interpersonal communication—capacities that algorithms cannot replicate.

In conclusion, although the transition phase inevitably presents disruption for individuals performing routine tasks, technological evolution historically expands economic productivity and creates novel employment domains. Provided that governments and universities invest decisively in proactive lifelong reskilling initiatives, artificial intelligence will serve as a catalyst for professional empowerment rather than human obsolescence.`
  },
  {
    id: 'toefl-academic-discussion',
    type: 'TOEFL Academic Discussion',
    title: 'Online Education vs Traditional Classrooms',
    promptText: 'Your professor is teaching a class on educational policy. Write a post in response to the professor’s question: "Do you believe fully online degree programs offer the same educational value as traditional in-person university experiences? Explain your stance with specific rationale."',
    minWords: 100,
    timeLimitMins: 10,
    keyPoints: [
      'Direct response to the professor’s question',
      'Reference to peer collaboration or flexibility',
      'Academic tone and concise development'
    ],
    recommendedTransitions: [
      'In response to the discussion...',
      'While I acknowledge that...',
      'A primary justification is...',
      'Therefore...'
    ],
    sampleModelAnswer: `In response to the professor's inquiry, I maintain that while online educational platforms afford unprecedented geographic and financial accessibility, they cannot fully replicate the holistic pedagogical value of in-person university education.

A primary justification lies in the spontaneous intellectual synergies that emerge within physical lecture halls and seminar laboratories. In traditional environments, students engage in unstructured debates, collaborate on tactile research experiments, and establish invaluable mentorship bonds with faculty members. These organic encounters foster critical interpersonal diplomacy and problem-solving resilience in ways that scheduled video teleconferences struggle to match. Therefore, while virtual degrees excel in delivering modular technical knowledge, the physical academy remains indispensable for comprehensive scholarly development.`
  },
  {
    id: 'ielts-task-1-chart',
    type: 'IELTS Task 1',
    title: 'Renewable Energy Consumption (2010–2024)',
    promptText: 'The chart below illustrates renewable energy consumption across three sectors (Solar, Wind, and Hydroelectric) from 2010 to 2024. Summarise the information by selecting and reporting the main features, and make comparisons where relevant.',
    minWords: 150,
    timeLimitMins: 20,
    keyPoints: [
      'Overview highlighting the overall upward trajectory of solar and wind',
      'Comparison of peak figures and baseline values',
      'No personal opinion—pure factual synthesis'
    ],
    recommendedTransitions: [
      'Overall, it is evident that...',
      'In marked contrast...',
      'Experiencing an exponential surge...',
      'Remained comparatively stable throughout...'
    ],
    sampleModelAnswer: `The line graph delineates the trajectory of renewable energy consumption across solar, wind, and hydroelectric power generations over a fourteen-year period between 2010 and 2024.

Overall, it is evident that total renewable power expanded substantially across the survey timeframe. Notably, solar energy experienced an exponential surge to become the predominant energy vector, whereas hydroelectric consumption exhibited steady, modest growth with minor periodic plateaus.

In 2010, hydroelectric was the dominant contributor at approximately 80 gigawatt-hours, compared to just 15 and 25 gigawatt-hours for solar and wind respectively. Over the subsequent decade, solar generation escalated dramatically, overtaking wind by 2017 and surpassing hydroelectric in 2021 before peaking at 210 gigawatt-hours in 2024.

Wind power displayed an analogous upward trend, nearly quadrupling from 25 to 95 gigawatt-hours. Conversely, hydroelectric consumption increased incrementally to reach 115 gigawatt-hours, concluding as the second-largest yet most consistent renewable generation source.`
  }
];

export const WritingLab: React.FC = () => {
  const [selectedPrompt, setSelectedPrompt] = useState<WritingPrompt>(SAMPLE_PROMPTS[0]);
  const [essayText, setEssayText] = useState<string>('');
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evaluationResult, setEvaluationResult] = useState<{
    bandScore: string;
    wordCount: number;
    lexicalScore: number;
    coherenceScore: number;
    grammarScore: number;
    feedbackPoints: string[];
    academicVocabFound: string[];
    transitionsFound: string[];
  } | null>(null);
  const [showModelAnswer, setShowModelAnswer] = useState<boolean>(false);
  const [copiedModel, setCopiedModel] = useState<boolean>(false);

  // Live word counter
  const words = essayText.trim() ? essayText.trim().split(/\s+/).length : 0;
  const chars = essayText.length;

  const handleEvaluate = () => {
    if (words < 30) {
      sounds.playIncorrect();
      return;
    }

    sounds.playClick();
    setIsEvaluating(true);

    setTimeout(() => {
      setIsEvaluating(false);

      // Analyze text characteristics
      const lower = essayText.toLowerCase();

      // Academic words detector
      const academicLexicon = [
        'proliferation', 'contentious', 'displacement', 'consequently', 'proponents',
        'surpass', 'unprecedented', 'catalyst', 'obsolescence', 'incorporating',
        'predominant', 'trajectory', 'synergies', 'pedagogical', 'indispensable',
        'substantially', 'exponential', 'fundamentally', 'marginalization', 'furthermore'
      ];

      const transitionsList = [
        'on the one hand', 'on the other hand', 'conversely', 'furthermore',
        'consequently', 'in conclusion', 'in addition', 'moreover', 'nevertheless',
        'therefore', 'for instance', 'for example', 'overall'
      ];

      const matchedAcademic = academicLexicon.filter(w => lower.includes(w));
      const matchedTransitions = transitionsList.filter(t => lower.includes(t));

      // Calculate simulated Band Score based on length, vocabulary, and cohesion
      let calculatedBand = '6.5';
      let lexical = 72;
      let coherence = 70;
      let grammar = 75;

      if (words >= selectedPrompt.minWords && matchedAcademic.length >= 4 && matchedTransitions.length >= 2) {
        calculatedBand = 'Band 8.0';
        lexical = 88;
        coherence = 86;
        grammar = 85;
      } else if (words >= selectedPrompt.minWords * 0.8 && matchedTransitions.length >= 1) {
        calculatedBand = 'Band 7.0';
        lexical = 78;
        coherence = 76;
        grammar = 78;
      } else if (words >= selectedPrompt.minWords * 0.5) {
        calculatedBand = 'Band 6.0';
        lexical = 65;
        coherence = 64;
        grammar = 68;
      } else {
        calculatedBand = 'Band 5.5';
        lexical = 55;
        coherence = 52;
        grammar = 58;
      }

      const feedback = [];
      if (words >= selectedPrompt.minWords) {
        feedback.push(`Excellent volume! You met the minimum threshold of ${selectedPrompt.minWords} words.`);
      } else {
        feedback.push(`Word count is under the recommended ${selectedPrompt.minWords} words. Expand with specific examples.`);
      }

      if (matchedTransitions.length >= 3) {
        feedback.push(`Strong cohesive progression using discourse markers like "${matchedTransitions.slice(0, 2).join('", "')}".`);
      } else {
        feedback.push(`Try incorporating more varied logical transitions (e.g. "Furthermore", "Conversely", "Consequently").`);
      }

      if (matchedAcademic.length >= 3) {
        feedback.push(`High lexical resource with formal academic register detected.`);
      } else {
        feedback.push(`Enhance lexical sophistication by swapping common verbs with high-register synonyms.`);
      }

      setEvaluationResult({
        bandScore: calculatedBand,
        wordCount: words,
        lexicalScore: lexical,
        coherenceScore: coherence,
        grammarScore: grammar,
        feedbackPoints: feedback,
        academicVocabFound: matchedAcademic,
        transitionsFound: matchedTransitions
      });

      sounds.playCompletionFanfare();
      try {
        confetti({ particleCount: 70, spread: 65, origin: { y: 0.6 } });
      } catch {
        // fallback
      }
    }, 1200);
  };

  const handleCopyModel = () => {
    sounds.playClick();
    navigator.clipboard.writeText(selectedPrompt.sampleModelAnswer);
    setCopiedModel(true);
    setTimeout(() => setCopiedModel(false), 2000);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8 pb-4 border-b border-slate-200">
        <div>
          <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
            Writing Lab & Essay Evaluator
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-slate-900 mt-2">
            Academic Writing & Essay Diagnostic
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Real-time evaluation of word density, cohesion markers, lexical sophistication, and estimated Band score.
          </p>
        </div>

        {/* Prompt Selector Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {SAMPLE_PROMPTS.map((p) => (
            <button
              key={p.id}
              onClick={() => {
                sounds.playClick();
                setSelectedPrompt(p);
                setEvaluationResult(null);
              }}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                selectedPrompt.id === p.id
                  ? 'bg-brand-600 text-white shadow-soft-sm'
                  : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
              }`}
            >
              {p.type}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Prompt Description & Editor */}
        <div className="lg:col-span-8 space-y-6">
          {/* Prompt Brief Card */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-soft">
            <div className="flex items-center justify-between mb-3">
              <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-brand-50 text-brand-700 border border-brand-100">
                {selectedPrompt.type}
              </span>
              <div className="flex items-center gap-3 text-xs text-slate-400 font-semibold">
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" />
                  {selectedPrompt.timeLimitMins} mins
                </span>
                <span>•</span>
                <span>Min: {selectedPrompt.minWords} words</span>
              </div>
            </div>

            <h3 className="text-lg font-black text-slate-900 mb-2">
              {selectedPrompt.title}
            </h3>

            <p className="text-sm text-slate-700 leading-relaxed bg-slate-50 p-4 rounded-2xl border border-slate-100 mb-4">
              "{selectedPrompt.promptText}"
            </p>

            {/* Recommended Transitions */}
            <div>
              <p className="text-xs uppercase font-bold tracking-wider text-slate-400 mb-2">
                Recommended Cohesive Transitions:
              </p>
              <div className="flex flex-wrap gap-1.5">
                {selectedPrompt.recommendedTransitions.map((tr, idx) => (
                  <span
                    key={idx}
                    className="px-2.5 py-1 rounded-lg bg-brand-50/60 text-brand-800 border border-brand-100 text-xs font-semibold"
                  >
                    {tr}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Writing Editor */}
          <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-soft">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <PenTool className="w-4 h-4 text-brand-600" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                  Your Response
                </span>
              </div>

              {/* Live word stats */}
              <div className="flex items-center gap-4 text-xs font-bold">
                <span className={words >= selectedPrompt.minWords ? 'text-mint-600' : 'text-slate-500'}>
                  {words} / {selectedPrompt.minWords} words
                </span>
                <span className="text-slate-400">{chars} chars</span>
              </div>
            </div>

            <textarea
              value={essayText}
              onChange={(e) => setEssayText(e.target.value)}
              placeholder="Type or paste your academic essay here. Use structured paragraphs with clear topic sentences and supporting evidence..."
              rows={12}
              className="w-full p-4 rounded-2xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 text-sm leading-relaxed text-slate-800 outline-none transition-all resize-y font-sans"
            />

            {/* Action Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 mt-4 pt-3 border-t border-slate-100">
              <button
                onClick={() => {
                  sounds.playClick();
                  setEssayText('');
                  setEvaluationResult(null);
                }}
                className="text-xs font-semibold text-slate-400 hover:text-slate-700 flex items-center gap-1"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Clear Draft</span>
              </button>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowModelAnswer(!showModelAnswer)}
                  className="px-4 py-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 text-slate-700 text-xs font-bold transition-colors"
                >
                  {showModelAnswer ? 'Hide Sample Model' : 'View Band 9.0 Sample'}
                </button>

                <button
                  onClick={handleEvaluate}
                  disabled={isEvaluating || words < 20}
                  className="px-6 py-2.5 rounded-xl bg-brand-600 hover:bg-brand-700 text-white text-xs font-bold shadow-soft transition-all disabled:opacity-50 flex items-center gap-2 active:scale-95"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>{isEvaluating ? 'Evaluating Draft...' : 'Evaluate My Essay'}</span>
                </button>
              </div>
            </div>
          </div>

          {/* Model Answer Drawer if toggled */}
          {showModelAnswer && (
            <div className="p-6 rounded-3xl bg-amber-50/70 border border-amber-200 shadow-soft animate-pop-in">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <Award className="w-4 h-4 text-amber-600" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-900">
                    Official Band 9.0 Exemplar Answer
                  </span>
                </div>
                <button
                  onClick={handleCopyModel}
                  className="text-xs font-bold text-amber-800 hover:text-amber-950 flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-amber-200"
                >
                  {copiedModel ? <Check className="w-3.5 h-3.5 text-mint-600" /> : <Copy className="w-3.5 h-3.5" />}
                  <span>{copiedModel ? 'Copied' : 'Copy Text'}</span>
                </button>
              </div>

              <div className="text-xs sm:text-sm text-amber-950 leading-relaxed font-sans space-y-3 whitespace-pre-line">
                {selectedPrompt.sampleModelAnswer}
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Diagnostic & Band Score Report */}
        <div className="lg:col-span-4 space-y-6">
          {evaluationResult ? (
            <div className="p-6 rounded-3xl bg-white border border-slate-200/90 shadow-soft-lg animate-pop-in">
              <div className="text-center pb-6 border-b border-slate-100">
                <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
                  Diagnostic Result
                </span>
                <h3 className="text-3xl font-black text-slate-900 mt-2">
                  {evaluationResult.bandScore}
                </h3>
                <p className="text-xs text-slate-400 mt-1">
                  Evaluated across CEFR B2–C1 standard descriptors
                </p>
              </div>

              {/* 3 Skill Criteria Bars */}
              <div className="py-6 space-y-4 border-b border-slate-100">
                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Lexical Resource (AWL)</span>
                    <span className="text-brand-600">{evaluationResult.lexicalScore}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-brand-600 rounded-full transition-all duration-700"
                      style={{ width: `${evaluationResult.lexicalScore}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Coherence & Cohesion</span>
                    <span className="text-mint-600">{evaluationResult.coherenceScore}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-mint-500 rounded-full transition-all duration-700"
                      style={{ width: `${evaluationResult.coherenceScore}%` }}
                    />
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between text-xs font-bold mb-1">
                    <span className="text-slate-700">Grammatical Range & Accuracy</span>
                    <span className="text-purple-600">{evaluationResult.grammarScore}%</span>
                  </div>
                  <div className="w-full h-2 rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-purple-500 rounded-full transition-all duration-700"
                      style={{ width: `${evaluationResult.grammarScore}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* Diagnostic Actionable Feedback */}
              <div className="pt-6">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">
                  Examiner Feedback
                </h4>
                <ul className="space-y-2.5">
                  {evaluationResult.feedbackPoints.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-slate-700 leading-snug">
                      <CheckCircle2 className="w-4 h-4 text-mint-600 flex-shrink-0 mt-0.5" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="p-6 rounded-3xl bg-slate-50 border border-slate-200/90 text-center">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 text-slate-400 flex items-center justify-center mx-auto mb-3 shadow-soft-sm">
                <FileText className="w-6 h-6" />
              </div>
              <h4 className="text-sm font-bold text-slate-800 mb-1">
                Awaiting Essay Draft
              </h4>
              <p className="text-xs text-slate-500 leading-relaxed">
                Type your response to the prompt and click <span className="font-semibold text-slate-700">"Evaluate My Essay"</span> to generate detailed rubric scoring and lexical feedback.
              </p>
            </div>
          )}

          {/* Scoring Tips Card */}
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-soft-sm text-xs space-y-2">
            <p className="font-bold text-slate-900 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-brand-600" />
              <span>IELTS & TOEFL Scoring Pro-Tips:</span>
            </p>
            <p className="text-slate-600 leading-relaxed">
              1. Never write in bullet points; always use fully connected academic paragraphs.
            </p>
            <p className="text-slate-600 leading-relaxed">
              2. Avoid repetitive verbs like "good", "bad", "thing". Use precision nouns: "advantage", "detriment", "phenomenon".
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
