import React, { useState } from 'react';
import {
  Code2,
  Terminal,
  Play,
  Copy,
  Check,
  Bug,
  Database,
  FileCode2,
  Sparkles,
  HelpCircle,
  FileSearch,
} from 'lucide-react';
import { Button } from '../components/Common/Button';

export const DeveloperMode: React.FC = () => {
  const [activeFeature, setActiveFeature] = useState<'generate' | 'explain' | 'debug' | 'review' | 'sql' | 'api'>('generate');
  const [language, setLanguage] = useState<'typescript' | 'python' | 'sql' | 'rust' | 'javascript'>('typescript');
  const [copied, setCopied] = useState(false);
  const [promptInput, setPromptInput] = useState('');
  const [isCompiling, setIsCompiling] = useState(false);
  const [consoleOutput, setConsoleOutput] = useState<string | null>(null);

  const codeSnippets: Record<string, string> = {
    generate: `// NOVA AI Code Generator - Distributed Rate Limiter
import Redis from 'ioredis';

export class TokenBucketRateLimiter {
  private redis: Redis;
  private capacity: number;
  private refillRate: number; // tokens per second

  constructor(redisClient: Redis, capacity = 100, refillRate = 10) {
    this.redis = redisClient;
    this.capacity = capacity;
    this.refillRate = refillRate;
  }

  async acquire(userId: string, tokensRequested = 1): Promise<boolean> {
    const key = \`rate_limit:\${userId}\`;
    const now = Date.now();
    // Execute atomic Lua script evaluation in Redis
    const allowed = await this.redis.eval(
      \`local key = KEYS[1]
       local capacity = tonumber(ARGV[1])
       local rate = tonumber(ARGV[2])
       local req = tonumber(ARGV[3])
       local now = tonumber(ARGV[4])
       -- logic computes bucket tokens
       return 1\`,
      1,
      key,
      this.capacity,
      this.refillRate,
      tokensRequested,
      now
    );
    return allowed === 1;
  }
}`,
    explain: `/**
 * ANALYSIS OF YOUR CODE:
 * 1. Time Complexity: O(1) amortized lookup utilizing atomic Redis Lua evaluation.
 * 2. Concurrency Safety: Atomic guarantees ensure no race conditions between cluster pods.
 * 3. Memory Footprint: Key expiration TTL bounds active memory to active sliding windows.
 */`,
    debug: `// Fixed potential unhandled Promise rejection and memory leak
export async function fetchWithRetry(url: string, retries = 3) {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), 5000);
  try {
    const res = await fetch(url, { signal: controller.signal });
    return await res.json();
  } catch (err) {
    if (retries > 0) return fetchWithRetry(url, retries - 1);
    throw err;
  } finally {
    clearTimeout(timeoutId);
  }
}`,
    review: `// Code Review Checklist & Suggestions:
// [Pass] Type Safety: Strict TypeScript definitions applied throughout.
// [Pass] Error Handling: Fallback strategies implemented.
// [Recommend]: Memoize callback to prevent excessive re-renders in children.`,
    sql: `-- High Performance Normalized Schema with Partial Indexes
CREATE TABLE IF NOT EXISTS assistant_sessions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL,
  title VARCHAR(255) NOT NULL,
  metadata JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_sessions_user_active 
ON assistant_sessions (user_id, created_at DESC);`,
    api: `// Express typed middleware with JWT verification
import { Request, Response, NextFunction } from 'express';

export interface AuthenticatedUser {
  userId: string;
  role: 'user' | 'admin';
}

export function authGuard(req: Request & { user?: AuthenticatedUser }, res: Response, next: NextFunction) {
  const authHeader = req.headers.authorization;
  if (!authHeader?.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Missing authorization bearer token' });
  }
  // Token verification routine
  next();
}`,
  };

  const [activeCode, setActiveCode] = useState(codeSnippets.generate);

  const handleSelectFeature = (feat: 'generate' | 'explain' | 'debug' | 'review' | 'sql' | 'api') => {
    setActiveFeature(feat);
    setActiveCode(codeSnippets[feat]);
    setConsoleOutput(null);
    if (feat === 'sql') setLanguage('sql');
    else setLanguage('typescript');
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(activeCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunSimulation = () => {
    setIsCompiling(true);
    setConsoleOutput(null);
    setTimeout(() => {
      setIsCompiling(false);
      setConsoleOutput(`[Execution Sandbox]: Syntax validation passed.\n[Output]: Modules resolved cleanly. Execution returned 0 errors with simulated benchmark latency of 3.4ms.`);
    }, 800);
  };

  const featureCards = [
    { id: 'generate', label: 'Generate Code', icon: <Sparkles className="w-4 h-4 text-cyan-600 dark:text-cyan-400" />, desc: 'Transform prompts into clean architectural code' },
    { id: 'explain', label: 'Explain Code', icon: <HelpCircle className="w-4 h-4 text-purple-600 dark:text-purple-400" />, desc: 'Deconstruct complex algorithms & state machines' },
    { id: 'debug', label: 'Debug Code', icon: <Bug className="w-4 h-4 text-rose-600 dark:text-rose-400" />, desc: 'Trace runtime bugs and race conditions' },
    { id: 'review', label: 'Review Code', icon: <FileSearch className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />, desc: 'Comprehensive safety and performance audits' },
    { id: 'sql', label: 'SQL Generator', icon: <Database className="w-4 h-4 text-amber-600 dark:text-amber-400" />, desc: 'High-performance PostgreSQL and analytics schemas' },
    { id: 'api', label: 'API Helper', icon: <FileCode2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />, desc: 'Build typed endpoints, middlewares & webhooks' },
  ] as const;

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 mb-1">
          <div className="p-1.5 rounded-lg bg-cyan-50 dark:bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 border border-cyan-200 dark:border-cyan-500/30">
            <Code2 className="w-5 h-5" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Developer Mode
          </h1>
        </div>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400">
          Neural programming assistant with compiler intelligence, refactoring engines, and typed code synthesis.
        </p>
      </div>

      {/* Feature Cards Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {featureCards.map((fc) => {
          const isSelected = activeFeature === fc.id;
          return (
            <button
              key={fc.id}
              onClick={() => handleSelectFeature(fc.id)}
              className={`flex flex-col text-left p-3.5 rounded-xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-cyan-50/80 dark:bg-slate-800/90 border-cyan-500 text-slate-900 dark:text-slate-100 shadow-xs'
                  : 'bg-white dark:bg-slate-900/60 border-slate-200 dark:border-slate-800/80 text-slate-600 dark:text-slate-400 hover:border-slate-300 dark:hover:border-slate-700 hover:text-slate-900 dark:hover:text-slate-200'
              }`}
            >
              <div className="mb-2">{fc.icon}</div>
              <span className="text-xs sm:text-sm font-semibold truncate">{fc.label}</span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">{fc.desc}</span>
            </button>
          );
        })}
      </div>

      {/* Interactive Code Editor */}
      <div className="rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-900 dark:bg-slate-950 overflow-hidden shadow-xl text-white">
        {/* Editor Top Bar */}
        <div className="flex flex-wrap items-center justify-between px-4 py-3 bg-slate-800/90 dark:bg-slate-900/90 border-b border-slate-700 dark:border-slate-800 gap-3">
          <div className="flex items-center gap-3">
            {/* Window control dots */}
            <div className="flex items-center gap-1.5">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
            </div>

            <div className="h-4 w-px bg-slate-700 dark:bg-slate-800" />

            <div className="flex items-center gap-1.5 text-xs text-slate-300 font-mono">
              <Terminal className="w-3.5 h-3.5 text-cyan-400" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value as any)}
                className="bg-transparent border-0 text-slate-200 text-xs font-mono font-medium focus:ring-0 focus:outline-none cursor-pointer"
              >
                <option value="typescript" className="bg-slate-900 text-white">TypeScript</option>
                <option value="python" className="bg-slate-900 text-white">Python</option>
                <option value="sql" className="bg-slate-900 text-white">PostgreSQL</option>
                <option value="rust" className="bg-slate-900 text-white">Rust</option>
                <option value="javascript" className="bg-slate-900 text-white">JavaScript</option>
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCode}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-700/80 hover:bg-slate-700 text-slate-200 hover:text-white text-xs font-medium border border-slate-600 transition-colors cursor-pointer"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>

            <Button
              variant="primary"
              size="sm"
              leftIcon={<Play className="w-3.5 h-3.5 fill-current" />}
              onClick={handleRunSimulation}
              isLoading={isCompiling}
            >
              Run Code
            </Button>
          </div>
        </div>

        {/* Code Viewport */}
        <div className="relative p-5 overflow-x-auto min-h-[320px] max-h-[500px]">
          <textarea
            value={activeCode}
            onChange={(e) => setActiveCode(e.target.value)}
            spellCheck={false}
            className="w-full h-80 bg-transparent border-0 text-cyan-300 font-mono text-xs sm:text-sm leading-relaxed focus:outline-none resize-none scrollbar-thin"
          />
        </div>

        {/* Console Simulation Output */}
        {consoleOutput && (
          <div className="px-5 py-3.5 bg-slate-950 border-t border-slate-800 font-mono text-xs text-emerald-400 whitespace-pre-wrap">
            {consoleOutput}
          </div>
        )}
      </div>

      {/* Interactive Developer Prompt Bar */}
      <div className="p-4 rounded-2xl bg-white dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 flex flex-col sm:flex-row items-center gap-3 shadow-xs">
        <input
          type="text"
          value={promptInput}
          onChange={(e) => setPromptInput(e.target.value)}
          placeholder="Ask Developer Mode to refactor, write a unit test, or convert this code..."
          className="flex-1 bg-slate-50 dark:bg-slate-800/80 border border-slate-300 dark:border-slate-700 rounded-xl px-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 w-full"
        />
        <Button
          variant="primary"
          size="sm"
          className="self-stretch sm:self-auto"
          onClick={() => {
            if (!promptInput.trim()) return;
            setIsCompiling(true);
            setTimeout(() => {
              setIsCompiling(false);
              setActiveCode(`// Refactored Output according to: "${promptInput}"\n\n${activeCode}\n\n// Optimization completed.`);
              setPromptInput('');
            }, 600);
          }}
        >
          Execute
        </Button>
      </div>
    </div>
  );
};
