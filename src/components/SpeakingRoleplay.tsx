import React, { useState, useEffect, useRef } from 'react';
import { 
  Mic, MicOff, Send, Volume2, Sparkles, User, 
  RotateCcw, Check, MessageSquare, AlertCircle, Award, ArrowRight 
} from 'lucide-react';
import { sounds } from '../utils/sound';
import { SpeechService } from '../utils/speech';
import confetti from 'canvas-confetti';

interface RoleplayScenario {
  id: string;
  title: string;
  level: string;
  partnerName: string;
  partnerRole: string;
  partnerAvatar: string;
  description: string;
  initialMessage: string;
  turns: Array<{
    triggerKeywords: string[];
    reply: string;
    suggestedPhrases: string[];
    nativeTip: string;
  }>;
}

const SCENARIOS: RoleplayScenario[] = [
  {
    id: 'cafe-order',
    title: 'Ordering at a London Coffee Shop',
    level: 'A2 - B1 Everyday',
    partnerName: 'Oliver',
    partnerRole: 'Barista at Monmouth Coffee',
    partnerAvatar: '☕',
    description: 'Practice natural everyday polite ordering, milk choices, and payment dialogue.',
    initialMessage: "Hi there! Welcome to Monmouth Coffee. What can I get started for you today?",
    turns: [
      {
        triggerKeywords: ['latte', 'cappuccino', 'flat white', 'coffee', 'espresso', 'tea'],
        reply: "Great choice! Would you like that with whole milk, oat milk, or almond milk? And is that to have here or takeaway?",
        suggestedPhrases: [
          "Could I have an oat milk latte to take away, please?",
          "I'll have a flat white with whole milk to have here.",
          "Just black coffee with a splash of oat milk, please."
        ],
        nativeTip: 'In the UK, saying "Could I have..." or "I\'ll have..." sounds more natural than "I want...".'
      },
      {
        triggerKeywords: ['oat', 'whole', 'almond', 'takeaway', 'take away', 'here', 'have here'],
        reply: "Brilliant. Any pastries or sourdough toast for you this morning? Our almond croissants just came fresh out of the oven.",
        suggestedPhrases: [
          "Just the coffee for today, thanks!",
          "Yes, please! I'll take one of those almond croissants.",
          "No pastries for me, just the drink."
        ],
        nativeTip: '"Brilliant" and "Cheers" are very common British informal affirmations.'
      },
      {
        triggerKeywords: ['no', 'croissant', 'just', 'thanks', 'pastry', 'yes'],
        reply: "That comes to £4.20 altogether. Are you paying by card or contactless?",
        suggestedPhrases: [
          "Contactless on my phone, please.",
          "I'll pay by card, thanks.",
          "Here's my card."
        ],
        nativeTip: '"Contactless" is widely used instead of saying "credit card machine".'
      },
      {
        triggerKeywords: ['card', 'contactless', 'phone', 'cash', 'pay'],
        reply: "Tap right on the terminal... Perfect! Here is your receipt. We'll have your coffee ready at the counter in just a moment. Have a lovely day!",
        suggestedPhrases: [
          "Thank you so much! Have a great day.",
          "Cheers, appreciate it!",
          "Thanks, you too!"
        ],
        nativeTip: 'Responding with "You too!" or "Cheers!" completes the interaction warmly.'
      }
    ]
  },
  {
    id: 'job-interview',
    title: 'Tech Company Job Interview',
    level: 'B2 Professional',
    partnerName: 'Claire Vance',
    partnerRole: 'Senior Talent Partner',
    partnerAvatar: '💼',
    description: 'Answer behavioral interview questions using the STAR framework with confident phrasing.',
    initialMessage: "Good morning! Thank you for taking the time to speak with us today. To begin, could you briefly introduce yourself and what drew you to this role?",
    turns: [
      {
        triggerKeywords: ['experience', 'role', 'developer', 'engineer', 'passionate', 'company', 'background'],
        reply: "That sounds like a strong foundation. Could you describe a challenging technical conflict or setback you encountered in a recent project, and how you resolved it?",
        suggestedPhrases: [
          "In my previous project, we encountered unexpected latency bottlenecks...",
          "I took the initiative to coordinate cross-functional code reviews...",
          "By decomposing the architecture, we reduced system downtime significantly."
        ],
        nativeTip: 'Use strong action verbs: "spearheaded", "orchestrated", "decomposed", and "mitigated".'
      },
      {
        triggerKeywords: ['project', 'team', 'resolved', 'communication', 'latency', 'code', 'learned'],
        reply: "Impressive adaptability. Collaboration across diverse disciplines is vital for us. Where do you see yourself contributing most effectively to our product roadmap over the next twelve months?",
        suggestedPhrases: [
          "I look forward to mentoring junior engineers and standardizing testing frameworks.",
          "My priority would be optimizing core infrastructure and data pipelines.",
          "I thrive in fast-paced iterations where user feedback directly drives features."
        ],
        nativeTip: 'Focus on mutual value: how your growth directly benefits their engineering roadmap.'
      },
      {
        triggerKeywords: ['roadmap', 'infrastructure', 'mentoring', 'grow', 'contribute', 'product'],
        reply: "That aligns exceptionally well with our upcoming quarter goals. Do you have any questions for me about our team culture or leadership expectations?",
        suggestedPhrases: [
          "How does the engineering team balance rapid feature delivery with technical debt?",
          "What qualities define the most successful contributors in this department?",
          "How is continuous learning supported within the engineering organization?"
        ],
        nativeTip: 'Always ask thoughtful reverse-interview questions about culture and technical debt.'
      }
    ]
  },
  {
    id: 'academic-debate',
    title: 'IELTS Speaking Part 3: University Academic Debate',
    level: 'C1 Academic',
    partnerName: 'Dr. Harrison',
    partnerRole: 'University Examiner',
    partnerAvatar: '🎓',
    description: 'Engage in formal, abstract discourse with concession, nuance, and synthesis.',
    initialMessage: "Let us discuss urban development. To what extent should governments subsidize public transport infrastructure versus investing in electric private vehicles?",
    turns: [
      {
        triggerKeywords: ['public', 'transport', 'subsidize', 'electric', 'emissions', 'infrastructure', 'equity'],
        reply: "An interesting perspective. However, some argue that public transit subsidies place a disproportionate burden on taxpayers in rural districts who receive zero direct utility from urban rail. How would you counter that argument?",
        suggestedPhrases: [
          "While that concern carries merit, one must consider macroeconomic spillovers...",
          "Rural economies rely heavily on the economic velocity generated by vibrant urban hubs...",
          "A balanced fiscal framework should ring-fence regional transport funds concurrently."
        ],
        nativeTip: 'Use concessions: "While that perspective carries undeniable merit, it overlooks..."'
      },
      {
        triggerKeywords: ['rural', 'economic', 'taxpayer', 'balance', 'benefit', 'congestion'],
        reply: "Looking ahead over the next three decades, do you foresee personal vehicle ownership declining entirely in major metropolitan centers, or will hybrid autonomous fleets become the standard?",
        suggestedPhrases: [
          "The trajectory points toward shared autonomous mobility rather than outright prohibition...",
          "Societal inertia and convenience suggest private ownership will diminish gradually...",
          "Dynamic congestion pricing will make private vehicles economically unviable in central zones."
        ],
        nativeTip: 'In C1 Speaking, avoid binary absolutes ("always", "never"); use probabilistic modals like "tends to", "is projected to".'
      }
    ]
  }
];

interface ChatMessage {
  id: string;
  sender: 'partner' | 'user';
  text: string;
  nativeTip?: string;
  audioSpoken?: boolean;
}

export const SpeakingRoleplay: React.FC = () => {
  const [selectedScenario, setSelectedScenario] = useState<RoleplayScenario>(SCENARIOS[0]);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [currentTurnIdx, setCurrentTurnIdx] = useState(0);
  const [inputVal, setInputVal] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isRoleplayFinished, setIsRoleplayFinished] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Initialize scenario messages
  useEffect(() => {
    setMessages([
      {
        id: 'msg-0',
        sender: 'partner',
        text: selectedScenario.initialMessage
      }
    ]);
    setCurrentTurnIdx(0);
    setIsRoleplayFinished(false);
    // Speak initial partner message
    SpeechService.speak(selectedScenario.initialMessage, 0.95);
  }, [selectedScenario]);

  // Scroll to bottom on message update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = (userText: string) => {
    if (!userText.trim()) return;

    sounds.playClick();

    const newMessages: ChatMessage[] = [
      ...messages,
      {
        id: `user-${Date.now()}`,
        sender: 'user',
        text: userText
      }
    ];

    setMessages(newMessages);
    setInputVal('');

    // Determine partner's response
    const currentTurn = selectedScenario.turns[currentTurnIdx];

    if (currentTurn) {
      setTimeout(() => {
        sounds.playCorrect();
        const partnerReplyText = currentTurn.reply;
        setMessages(prev => [
          ...prev,
          {
            id: `partner-${Date.now()}`,
            sender: 'partner',
            text: partnerReplyText,
            nativeTip: currentTurn.nativeTip
          }
        ]);

        SpeechService.speak(partnerReplyText, 0.95);

        if (currentTurnIdx + 1 < selectedScenario.turns.length) {
          setCurrentTurnIdx(prev => prev + 1);
        } else {
          // Finished conversation scenario!
          setIsRoleplayFinished(true);
          sounds.playCompletionFanfare();
          try {
            confetti({ particleCount: 75, spread: 70, origin: { y: 0.6 } });
          } catch {
            // fallback
          }
        }
      }, 1000);
    }
  };

  // Web Speech Recognition for voice input
  const handleToggleRecord = () => {
    if (isRecording) {
      setIsRecording(false);
      return;
    }

    sounds.playClick();

    // Check if browser supports SpeechRecognition
    const windowWithSpeech = window as unknown as {
      SpeechRecognition?: any;
      webkitSpeechRecognition?: any;
    };
    const SpeechRecognitionClass = windowWithSpeech.SpeechRecognition || windowWithSpeech.webkitSpeechRecognition;

    if (!SpeechRecognitionClass) {
      // Fallback: Pick first suggested phrase for seamless demo
      const currentTurn = selectedScenario.turns[currentTurnIdx];
      if (currentTurn && currentTurn.suggestedPhrases.length > 0) {
        setInputVal(currentTurn.suggestedPhrases[0]);
      }
      return;
    }

    try {
      const recognition = new SpeechRecognitionClass();
      recognition.lang = 'en-US';
      recognition.interimResults = false;
      recognition.maxAlternatives = 1;

      setIsRecording(true);

      recognition.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputVal(transcript);
        setIsRecording(false);
      };

      recognition.onerror = () => {
        setIsRecording(false);
      };

      recognition.onend = () => {
        setIsRecording(false);
      };

      recognition.start();
    } catch {
      setIsRecording(false);
    }
  };

  const currentTurnData = selectedScenario.turns[currentTurnIdx];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-8 sm:py-10">
      {/* Top Header */}
      <div className="text-center max-w-xl mx-auto mb-8">
        <span className="text-xs font-bold uppercase tracking-wider text-brand-600 bg-brand-50 px-3 py-1 rounded-full">
          AI Roleplay & Speaking Partner
        </span>
        <h1 className="text-3xl font-black text-slate-900 tracking-tight mt-2 mb-2">
          Real-World Spoken Conversations
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Engage in turn-based audio conversations with native speakers. Practice ordering, job interviews, and academic debates.
        </p>
      </div>

      {/* Scenario Tabs */}
      <div className="flex items-center justify-center flex-wrap gap-2 mb-8">
        {SCENARIOS.map((sc) => (
          <button
            key={sc.id}
            onClick={() => {
              sounds.playClick();
              setSelectedScenario(sc);
            }}
            className={`px-4 py-2.5 rounded-2xl text-xs font-bold transition-all flex items-center gap-2 ${
              selectedScenario.id === sc.id
                ? 'bg-brand-600 text-white shadow-soft'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-50'
            }`}
          >
            <span>{sc.partnerAvatar}</span>
            <span>{sc.title}</span>
            <span className="text-[10px] opacity-75 font-normal">({sc.level.split(' ')[0]})</span>
          </button>
        ))}
      </div>

      {/* Chat Room Workspace */}
      <div className="bg-white rounded-3xl border border-slate-200/90 shadow-soft-lg flex flex-col h-[580px] overflow-hidden">
        {/* Chat Room Top Bar */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-white border border-slate-200 text-xl flex items-center justify-center shadow-soft-sm">
              {selectedScenario.partnerAvatar}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-black text-slate-900">{selectedScenario.partnerName}</h3>
                <span className="w-2 h-2 rounded-full bg-mint-500 animate-pulse" />
              </div>
              <p className="text-xs text-slate-500">{selectedScenario.partnerRole}</p>
            </div>
          </div>

          <button
            onClick={() => {
              sounds.playClick();
              setMessages([{ id: 'msg-0', sender: 'partner', text: selectedScenario.initialMessage }]);
              setCurrentTurnIdx(0);
              setIsRoleplayFinished(false);
              SpeechService.speak(selectedScenario.initialMessage, 0.95);
            }}
            className="text-xs font-semibold text-slate-400 hover:text-slate-700 flex items-center gap-1 p-2 rounded-xl hover:bg-slate-100 transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Restart Scenario</span>
          </button>
        </div>

        {/* Message Stream */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
          {messages.map((m) => (
            <div
              key={m.id}
              className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'} animate-pop-in`}
            >
              <div
                className={`max-w-[85%] sm:max-w-[75%] p-4 rounded-2xl text-sm leading-relaxed ${
                  m.sender === 'user'
                    ? 'bg-brand-600 text-white rounded-br-none shadow-soft-sm'
                    : 'bg-slate-100 text-slate-900 rounded-bl-none border border-slate-200/60'
                }`}
              >
                <div className="flex items-center justify-between gap-2 mb-1">
                  <span className="text-[10px] font-bold uppercase tracking-wider opacity-75">
                    {m.sender === 'user' ? 'You' : selectedScenario.partnerName}
                  </span>
                  {m.sender === 'partner' && (
                    <button
                      onClick={() => SpeechService.speak(m.text, 0.95)}
                      className="p-1 hover:text-brand-600 transition-colors"
                      title="Replay Audio"
                    >
                      <Volume2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
                <p>{m.text}</p>
              </div>

              {/* Native Speaker Tip if present on partner response */}
              {m.nativeTip && (
                <div className="mt-2 max-w-[85%] sm:max-w-[75%] p-2.5 rounded-xl bg-amber-50 border border-amber-200 text-amber-900 text-xs flex items-start gap-2">
                  <Sparkles className="w-3.5 h-3.5 text-amber-600 flex-shrink-0 mt-0.5" />
                  <span>{m.nativeTip}</span>
                </div>
              )}
            </div>
          ))}

          {/* Completed Conversation Banner */}
          {isRoleplayFinished && (
            <div className="p-5 rounded-2xl bg-mint-50 border border-mint-200 text-center animate-pop-in my-4">
              <div className="w-10 h-10 rounded-full bg-mint-100 text-mint-600 flex items-center justify-center mx-auto mb-2">
                <Award className="w-5 h-5" />
              </div>
              <h4 className="text-base font-black text-mint-950">
                Conversation Scenario Completed!
              </h4>
              <p className="text-xs text-mint-800 mt-0.5">
                Excellent fluency, responsiveness, and turn-taking. +35 XP awarded.
              </p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Suggested Response Chips (for learning guidance) */}
        {!isRoleplayFinished && currentTurnData && currentTurnData.suggestedPhrases.length > 0 && (
          <div className="px-4 py-2 bg-slate-50 border-t border-slate-100 overflow-x-auto flex items-center gap-2">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 whitespace-nowrap">
              Suggestions:
            </span>
            {currentTurnData.suggestedPhrases.map((phrase, i) => (
              <button
                key={i}
                onClick={() => setInputVal(phrase)}
                className="px-2.5 py-1 rounded-lg bg-white border border-slate-200 hover:border-brand-300 text-slate-700 text-xs font-medium whitespace-nowrap shadow-soft-sm active:scale-95 transition-all"
              >
                "{phrase}"
              </button>
            ))}
          </div>
        )}

        {/* Input Bar */}
        <div className="p-4 border-t border-slate-100 bg-white flex items-center gap-2">
          {/* Microphone Voice Input */}
          <button
            onClick={handleToggleRecord}
            className={`p-3 rounded-2xl transition-all shadow-soft active:scale-95 flex-shrink-0 ${
              isRecording
                ? 'bg-coral-500 text-white ring-4 ring-coral-100 animate-pulse'
                : 'bg-slate-100 text-slate-700 hover:bg-brand-50 hover:text-brand-600'
            }`}
            title="Speak into microphone"
          >
            {isRecording ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
          </button>

          <input
            type="text"
            value={inputVal}
            onChange={(e) => setInputVal(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSendMessage(inputVal);
            }}
            placeholder={isRecording ? 'Listening to your speech...' : 'Type your reply or use speech to talk...'}
            disabled={isRoleplayFinished}
            className="flex-1 px-4 py-3 rounded-2xl border border-slate-200 focus:border-brand-500 focus:ring-2 focus:ring-brand-100 text-sm outline-none transition-all disabled:opacity-50"
          />

          <button
            onClick={() => handleSendMessage(inputVal)}
            disabled={!inputVal.trim() || isRoleplayFinished}
            className="p-3 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white transition-all shadow-soft active:scale-95 disabled:opacity-40 flex-shrink-0"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
