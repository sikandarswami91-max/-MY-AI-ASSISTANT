import React, { useState } from 'react';
import {
  GraduationCap,
  BookOpen,
  FileText,
  HelpCircle,
  CheckCircle2,
  Layers,
  Calendar,
  Sparkles,
} from 'lucide-react';
import { Button } from '../components/Common/Button';

export const StudyMode: React.FC = () => {
  const [topic, setTopic] = useState('React 19 Concurrent Rendering');
  const [difficulty, setDifficulty] = useState<'Beginner' | 'Intermediate' | 'Advanced'>('Intermediate');
  const [activeFeature, setActiveFeature] = useState<'explain' | 'notes' | 'quiz' | 'mcq' | 'flashcards' | 'plan'>('explain');
  const [flippedFlashcard, setFlippedFlashcard] = useState(false);
  const [selectedMcqAnswer, setSelectedMcqAnswer] = useState<number | null>(null);

  const studyFeatures = [
    { id: 'explain', label: 'Explain Concept', icon: <BookOpen className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />, desc: 'First-principles mental models and intuitive analogies' },
    { id: 'notes', label: 'Study Notes', icon: <FileText className="w-4 h-4 text-purple-600 dark:text-purple-400" />, desc: 'Dense, structured summaries with cheat-sheet takeaways' },
    { id: 'quiz', label: 'Interactive Quiz', icon: <HelpCircle className="w-4 h-4 text-amber-600 dark:text-amber-400" />, desc: 'Scenario-based evaluation questions' },
    { id: 'mcq', label: 'MCQ Test', icon: <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />, desc: 'Multiple choice conceptual validation' },
    { id: 'flashcards', label: 'Flashcards', icon: <Layers className="w-4 h-4 text-rose-600 dark:text-rose-400" />, desc: 'Spaced-repetition active recall cards' },
    { id: 'plan', label: 'Study Plan', icon: <Calendar className="w-4 h-4 text-blue-600 dark:text-blue-400" />, desc: 'Milestone-driven 7-day curriculum' },
  ] as const;

  const handleStartLearning = () => {
    if (!topic.trim()) return;
    setFlippedFlashcard(false);
    setSelectedMcqAnswer(null);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30">
            <GraduationCap className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Study Mode
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Personalized neural tutor: synthesize complex academic topics, generate quizzes, and practice active recall.
        </p>
      </div>

      {/* Topic Input & Setup Card */}
      <div className="p-5 sm:p-6 rounded-2xl bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 shadow-xs space-y-5">
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-2">
            What do you want to learn?
          </label>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              placeholder="Enter topic, concept, paper or domain (e.g. Distributed Raft Consensus)..."
              className="flex-1 bg-slate-50 dark:bg-slate-800/90 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-500"
            />
            <Button
              variant="primary"
              size="md"
              onClick={handleStartLearning}
              leftIcon={<Sparkles className="w-4 h-4" />}
            >
              Start Learning
            </Button>
          </div>
        </div>

        {/* Difficulty Selection */}
        <div>
          <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-2">
            Difficulty Level
          </label>
          <div className="grid grid-cols-3 gap-2 max-w-md">
            {(['Beginner', 'Intermediate', 'Advanced'] as const).map((lvl) => (
              <button
                key={lvl}
                onClick={() => setDifficulty(lvl)}
                className={`py-2 px-3 rounded-xl border text-xs sm:text-sm font-medium transition-all cursor-pointer text-center ${
                  difficulty === lvl
                    ? 'bg-cyan-50 dark:bg-cyan-500/10 border-cyan-500 text-cyan-700 dark:text-cyan-300 font-semibold shadow-xs'
                    : 'bg-slate-50 dark:bg-slate-800/50 border-slate-200 dark:border-slate-700/80 text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
                }`}
              >
                {lvl}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {studyFeatures.map((sf) => {
          const isSelected = activeFeature === sf.id;
          return (
            <button
              key={sf.id}
              onClick={() => {
                setActiveFeature(sf.id);
              }}
              className={`flex flex-col text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-cyan-50/80 dark:bg-slate-800/90 border-cyan-500 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className="mb-2">{sf.icon}</div>
              <span className="text-xs sm:text-sm font-semibold truncate">{sf.label}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{sf.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Dynamic Content Preview for Active Feature */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900/60 p-5 sm:p-6 shadow-xs space-y-6">
        <div className="flex items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4">
          <div>
            <span className="text-xs font-mono uppercase text-cyan-600 dark:text-cyan-400 tracking-wider font-semibold">
              {difficulty} Module
            </span>
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-slate-100 mt-0.5">
              {topic}
            </h2>
          </div>
          <span className="text-xs text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full border border-slate-200 dark:border-slate-700 font-mono font-medium">
            {activeFeature.toUpperCase()}
          </span>
        </div>

        {/* Explain View */}
        {activeFeature === 'explain' && (
          <div className="space-y-4 text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            <p>
              In {difficulty.toLowerCase()} terms, <strong>{topic}</strong> centers around breaking synchronous execution bottlenecks into manageable virtual units.
            </p>
            <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 space-y-2">
              <h4 className="font-semibold text-cyan-700 dark:text-cyan-300">Core Mental Model:</h4>
              <p className="text-slate-600 dark:text-slate-400 text-xs">
                Imagine a chef who can pause chopping an onion the instant an urgent VIP order arrives at the kitchen pass, serve the VIP dish immediately, and then resume chopping without wasting ingredients.
              </p>
            </div>
            <ul className="list-disc list-inside space-y-1.5 text-slate-600 dark:text-slate-400 pl-1">
              <li><strong>Time Slicing:</strong> Browser tasks yield to UI interaction frames every 5 milliseconds.</li>
              <li><strong>Prioritization:</strong> Differentiates urgent keystroke events from background queries.</li>
              <li><strong>Consistency:</strong> Never renders half-completed trees to the live DOM.</li>
            </ul>
          </div>
        )}

        {/* Notes View */}
        {activeFeature === 'notes' && (
          <div className="space-y-3 font-mono text-xs text-slate-700 dark:text-slate-300">
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-cyan-600 dark:text-cyan-400 font-bold">1. Transition Boundaries</span>
              <p className="text-slate-600 dark:text-slate-400 font-sans">
                `startTransition(() =&gt; &#123; setState(...) &#125;)` flags calculations as non-blocking.
              </p>
            </div>
            <div className="p-3 bg-slate-50 dark:bg-slate-950 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1">
              <span className="text-purple-600 dark:text-purple-400 font-bold">2. Suspense Streaming</span>
              <p className="text-slate-600 dark:text-slate-400 font-sans">
                Progressively streams HTML chunks from the server to client without blocking initial page layout paint.
              </p>
            </div>
          </div>
        )}

        {/* Flashcards View */}
        {activeFeature === 'flashcards' && (
          <div className="flex flex-col items-center py-4">
            <div
              onClick={() => setFlippedFlashcard(!flippedFlashcard)}
              className="w-full max-w-md h-56 rounded-2xl bg-slate-50 dark:bg-gradient-to-br dark:from-slate-900 dark:to-slate-950 border border-cyan-500/30 dark:border-cyan-500/40 p-6 flex flex-col justify-between text-center cursor-pointer shadow-md hover:border-cyan-500 transition-all select-none"
            >
              <div className="flex justify-between text-[11px] text-slate-400 dark:text-slate-500 uppercase font-mono">
                <span>Card 1 of 5</span>
                <span>Click to Flip</span>
              </div>

              <div className="flex items-center justify-center py-4">
                {flippedFlashcard ? (
                  <div className="space-y-1">
                    <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold block uppercase">Answer:</span>
                    <p className="text-sm sm:text-base font-medium text-slate-800 dark:text-slate-200">
                      Double-buffering with a `current` and `workInProgress` tree to allow interruptible state calculation.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <span className="text-xs text-cyan-600 dark:text-cyan-400 font-semibold block uppercase">Question:</span>
                    <p className="text-sm sm:text-base font-bold text-slate-900 dark:text-slate-100">
                      How does React prevent incomplete tree renders when concurrent rendering interrupts a task?
                    </p>
                  </div>
                )}
              </div>

              <div className="text-[11px] text-slate-400 dark:text-slate-500">
                {flippedFlashcard ? 'Tap to see question' : 'Tap to reveal answer'}
              </div>
            </div>
          </div>
        )}

        {/* MCQ View */}
        {activeFeature === 'mcq' && (
          <div className="space-y-4">
            <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-200">
              Which hook allows developers to mark state updates as non-urgent background transitions?
            </h3>
            <div className="space-y-2">
              {[
                { id: 0, text: 'useTransition()', correct: true },
                { id: 1, text: 'useLayoutEffect()', correct: false },
                { id: 2, text: 'useDeferredEffect()', correct: false },
                { id: 3, text: 'useRef()', correct: false },
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setSelectedMcqAnswer(opt.id)}
                  className={`w-full text-left p-3.5 rounded-xl border text-xs sm:text-sm transition-all cursor-pointer flex items-center justify-between ${
                    selectedMcqAnswer === opt.id
                      ? opt.correct
                        ? 'bg-emerald-50 dark:bg-emerald-500/10 border-emerald-500 text-emerald-700 dark:text-emerald-300 font-semibold'
                        : 'bg-rose-50 dark:bg-rose-500/10 border-rose-500 text-rose-700 dark:text-rose-300 font-semibold'
                      : 'bg-slate-50 dark:bg-slate-900/60 border-slate-200 dark:border-slate-800 text-slate-700 dark:text-slate-300 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  <span>{opt.text}</span>
                  {selectedMcqAnswer === opt.id && (
                    <span className="text-xs font-semibold">
                      {opt.correct ? 'Correct! ✓' : 'Incorrect'}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Study Plan View */}
        {activeFeature === 'plan' && (
          <div className="space-y-3">
            {[
              { day: 'Day 1', focus: 'Fundamentals & Mental Model', task: 'Deconstruct concurrency vs parallelism' },
              { day: 'Day 2', focus: 'Scheduler & Time Slicing', task: 'Analyze browser frame budgets and priorities' },
              { day: 'Day 3', focus: 'Hooks: useTransition & useDeferredValue', task: 'Implement practical search debounce pattern' },
              { day: 'Day 4', focus: 'Server Components & Streaming SSR', task: 'Trace hydration boundaries and HTML chunking' },
            ].map((d, i) => (
              <div key={i} className="flex items-start gap-4 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800">
                <span className="text-xs font-mono font-bold text-cyan-600 dark:text-cyan-400 shrink-0 w-14">
                  {d.day}
                </span>
                <div>
                  <h4 className="text-xs sm:text-sm font-semibold text-slate-900 dark:text-slate-200">{d.focus}</h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">{d.task}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Quiz View */}
        {activeFeature === 'quiz' && (
          <div className="space-y-3">
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Scenario: You have a real-time charting dashboard receiving 60 websocket data points per second while the user is typing in a search bar. How should you structure your rendering updates to eliminate user input lag?
            </p>
            <textarea
              rows={3}
              placeholder="Type your reasoning here..."
              className="w-full bg-slate-50 dark:bg-slate-950 border border-slate-300 dark:border-slate-800 rounded-xl p-3 text-xs sm:text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
            />
            <Button variant="primary" size="sm">
              Submit for AI Feedback
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
