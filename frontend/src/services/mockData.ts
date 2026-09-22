import { ChatMessage, ChatSession } from '../types/chat';
import { NoteItem } from '../types/note';
import { TaskItem } from '../types/task';
import { FileItem } from '../types/file';

export const mockChats: ChatSession[] = [
  {
    id: 'chat-1',
    title: 'React Concurrent Mode & Fiber Architecture',
    date: 'Today',
    preview: 'Explaining how React scheduler breaks rendering into interruptible units of work...',
    messagesCount: 6,
    category: 'Development',
    updatedAt: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
  },
  {
    id: 'chat-2',
    title: 'Designing High-Performance Vector Indexing',
    date: 'Today',
    preview: 'Comparison between HNSW and IVF-PQ indexing for nearest neighbor queries...',
    messagesCount: 8,
    category: 'Research',
    updatedAt: new Date(Date.now() - 1000 * 60 * 180).toISOString(),
  },
  {
    id: 'chat-3',
    title: 'PostgreSQL Query Plan Optimization',
    date: 'Yesterday',
    preview: 'Using EXPLAIN (ANALYZE, BUFFERS) to detect sequential scans on user accounts...',
    messagesCount: 4,
    category: 'Development',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
  },
  {
    id: 'chat-4',
    title: 'Autonomous Multi-Agent Collaboration Patterns',
    date: 'Previous 7 days',
    preview: 'Hierarchical routing versus black-board consensus for multi-step engineering tasks...',
    messagesCount: 12,
    category: 'Research',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
  {
    id: 'chat-5',
    title: 'Microservices Circuit Breaker Implementation',
    date: 'Previous 7 days',
    preview: 'Implementing resilience policies with exponential backoff and half-open triggers...',
    messagesCount: 5,
    category: 'Development',
    updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 120).toISOString(),
  },
];

export const mockMessages: Record<string, ChatMessage[]> = {
  'chat-1': [
    {
      id: 'msg-1-1',
      role: 'user',
      content: 'Can you explain how React 19 concurrent features and the Fiber tree structure handle high-frequency re-renders without locking the main thread?',
      timestamp: '10:14 AM',
    },
    {
      id: 'msg-1-2',
      role: 'assistant',
      content: 'React Fiber reimagines the traditional recursive call stack into an interruptible virtual stack frame linked list.\n\n### Key Architectural Pillars:\n1. **Work In Progress (WIP) Tree**: Fiber maintains two copies of the tree (`current` and `workInProgress`). Mutations happen in memory before double-buffering swapping.\n2. **Time Slicing**: The Scheduler yields execution to browser frames (via `MessageChannel` / `postTask`) if a slice exceeds 5ms.\n3. **Transition Priority**: Non-urgent updates marked with `startTransition` yield immediately to urgent user input gestures.',
      timestamp: '10:15 AM',
      codeBlocks: [
        {
          language: 'typescript',
          code: `import { useTransition, useState } from 'react';

export function SearchFilter() {
  const [query, setQuery] = useState('');
  const [filteredList, setFilteredList] = useState<string[]>([]);
  const [isPending, startTransition] = useTransition();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 1. High-priority urgent input update
    const nextVal = e.target.value;
    setQuery(nextVal);

    // 2. Non-blocking transition update
    startTransition(() => {
      const results = expensiveFilterAlgorithm(nextVal);
      setFilteredList(results);
    });
  };

  return <input value={query} onChange={handleChange} />;
}`,
        },
      ],
      liked: true,
    },
    {
      id: 'msg-1-3',
      role: 'user',
      content: 'What happens if a new high-priority keystroke arrives while the transition slice is still computing?',
      timestamp: '10:17 AM',
    },
    {
      id: 'msg-1-4',
      role: 'assistant',
      content: 'React immediately discards the current uncommitted `workInProgress` subtree for that transition, prioritizes the keystroke event handler, updates the input UI immediately, and then restarts the transition computation with the newest state value.\n\nThis guarantees zero input lag while keeping background calculations fully synchronized.',
      timestamp: '10:18 AM',
    },
  ],
};

export const mockNotes: NoteItem[] = [
  {
    id: 'note-1',
    title: 'Distributed Consensus & Raft Notes',
    content: 'Leader election term states, log replication invariants, and split-brain resolution through quorums. Remember to review safety properties regarding log matching.',
    category: 'Architecture',
    isPinned: true,
    isFavorite: true,
    createdAt: '2026-09-18',
    updatedAt: '2026-09-21',
    tags: ['Distributed Systems', 'Consensus', 'Raft'],
  },
  {
    id: 'note-2',
    title: 'LLM Function Calling & Schema Validation',
    content: 'Always define strict JSON schemas with `additionalProperties: false`. Pass tool execution feedback directly back to model context in the subsequent user turn.',
    category: 'AI Systems',
    isPinned: true,
    isFavorite: false,
    createdAt: '2026-09-19',
    updatedAt: '2026-09-22',
    tags: ['AI', 'Tool Use', 'JSON Schema'],
  },
  {
    id: 'note-3',
    title: 'Tailwind CSS 4.0 Migration Checklist',
    content: 'Replace `@tailwind` directives with single `@import "tailwindcss";`. Update `@theme` block variables and drop legacy postcss plugins.',
    category: 'Frontend',
    isPinned: false,
    isFavorite: true,
    createdAt: '2026-09-20',
    updatedAt: '2026-09-20',
    tags: ['CSS', 'Tailwind', 'Vite'],
  },
  {
    id: 'note-4',
    title: 'Database Sharding & Consistent Hashing',
    content: 'Virtual nodes prevent hot-spot distribution skew in key-value partitions. Monitor ring rebalancing when spinning up new replica sets.',
    category: 'Databases',
    isPinned: false,
    isFavorite: false,
    createdAt: '2026-09-15',
    updatedAt: '2026-09-16',
    tags: ['PostgreSQL', 'Sharding', 'Hashing'],
  },
];

export const mockTasks: TaskItem[] = [
  {
    id: 'task-1',
    title: 'Study React Concurrent Mode and Server Components',
    description: 'Review deep-dive RFCs on hydration boundaries and streaming SSR.',
    timeString: 'Today · 7:00 PM',
    dueDate: '2026-09-22',
    completed: false,
    priority: 'high',
    category: 'today',
    tag: 'Learning',
  },
  {
    id: 'task-2',
    title: 'Complete project UI with responsive mobile navigation',
    description: 'Verify 320px to 1440px viewports, drawer state, and touch affordances.',
    timeString: 'Today · 9:30 PM',
    dueDate: '2026-09-22',
    completed: false,
    priority: 'high',
    category: 'today',
    tag: 'Frontend',
  },
  {
    id: 'task-3',
    title: 'Benchmark Vector Embeddings with Cosine Similarity',
    description: 'Test HNSW graph build times across 100k generated test vectors.',
    timeString: 'Tomorrow · 10:00 AM',
    dueDate: '2026-09-23',
    completed: false,
    priority: 'medium',
    category: 'upcoming',
    tag: 'AI',
  },
  {
    id: 'task-4',
    title: 'Review PR: Circuit Breaker Resilience Policy',
    description: 'Check fallback thresholds, error ratios, and half-open test coverage.',
    timeString: 'Tomorrow · 3:00 PM',
    dueDate: '2026-09-23',
    completed: false,
    priority: 'medium',
    category: 'upcoming',
    tag: 'Code Review',
  },
  {
    id: 'task-5',
    title: 'Initialize repository layout and baseline styles',
    description: 'Setup Vite, Tailwind CSS, TypeScript configurations.',
    timeString: 'Yesterday · 4:00 PM',
    dueDate: '2026-09-21',
    completed: true,
    priority: 'low',
    category: 'completed',
    tag: 'Setup',
  },
  {
    id: 'task-6',
    title: 'Generate high-resolution character avatar assets',
    description: 'Render male and female avatars for Nova AI assistant.',
    timeString: 'Yesterday · 6:15 PM',
    dueDate: '2026-09-21',
    completed: true,
    priority: 'medium',
    category: 'completed',
    tag: 'Design',
  },
];

export const mockFiles: FileItem[] = [
  {
    id: 'file-1',
    name: 'Neural_Architecture_Whitepaper_v2.pdf',
    type: 'pdf',
    size: '4.8 MB',
    uploadedAt: '2 hours ago',
    pages: 28,
    description: 'Deep dive into transformer context windows and attention caching.',
  },
  {
    id: 'file-2',
    name: 'nova_system_design_specs.png',
    type: 'image',
    size: '2.1 MB',
    uploadedAt: 'Yesterday',
    dimensions: '2560 × 1440',
    description: 'High-level component routing and WebSocket streaming blueprint.',
  },
  {
    id: 'file-3',
    name: 'Vector_Database_Benchmark_Results.csv',
    type: 'document',
    size: '840 KB',
    uploadedAt: '3 days ago',
    description: 'QPS and recall measurements across Qdrant, Milvus, and pgvector.',
  },
  {
    id: 'file-4',
    name: 'client_api_contracts.ts',
    type: 'code',
    size: '45 KB',
    uploadedAt: '4 days ago',
    description: 'TypeScript schema definitions for future backend synchronizations.',
  },
];
