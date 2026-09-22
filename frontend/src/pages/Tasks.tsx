import React, { useState } from 'react';
import { mockTasks } from '../services/mockData';
import { TaskItem, TaskPriority } from '../types/task';
import { CheckCircle2, Circle, Clock, Plus, Trash2, Calendar, CheckSquare } from 'lucide-react';
import { Button } from '../components/Common/Button';
import { Modal } from '../components/Common/Modal';

export const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<TaskItem[]>(mockTasks);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newTimeString, setNewTimeString] = useState('Today · 7:00 PM');
  const [newPriority, setNewPriority] = useState<TaskPriority>('medium');
  const [newCategory, setNewCategory] = useState<'today' | 'upcoming'>('today');

  const toggleTask = (id: string) => {
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === id) {
          const nextCompleted = !t.completed;
          return {
            ...t,
            completed: nextCompleted,
            category: nextCompleted ? 'completed' : 'today',
          };
        }
        return t;
      })
    );
  };

  const deleteTask = (id: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== id));
  };

  const handleAddTask = () => {
    if (!newTitle.trim()) return;

    const newTask: TaskItem = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      timeString: newTimeString,
      dueDate: new Date().toISOString().split('T')[0],
      completed: false,
      priority: newPriority,
      category: newCategory,
      tag: 'Assistant',
    };

    setTasks((prev) => [newTask, ...prev]);
    setNewTitle('');
    setIsModalOpen(false);
  };

  const todayTasks = tasks.filter((t) => !t.completed && t.category === 'today');
  const upcomingTasks = tasks.filter((t) => !t.completed && t.category === 'upcoming');
  const completedTasks = tasks.filter((t) => t.completed);

  const renderTaskCard = (task: TaskItem) => (
    <div
      key={task.id}
      onClick={() => toggleTask(task.id)}
      className="group flex items-start justify-between p-4 rounded-xl bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer shadow-xs"
    >
      <div className="flex items-start gap-3.5 pr-3">
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            toggleTask(task.id);
          }}
          className="mt-0.5 text-slate-400 dark:text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors cursor-pointer"
        >
          {task.completed ? (
            <CheckCircle2 className="w-5 h-5 text-cyan-600 dark:text-cyan-400 fill-cyan-500/10" />
          ) : (
            <Circle className="w-5 h-5" />
          )}
        </button>

        <div className="space-y-1">
          <h3
            className={`text-sm sm:text-base font-semibold transition-all ${
              task.completed
                ? 'line-through text-slate-400 dark:text-slate-500'
                : 'text-slate-900 dark:text-slate-100 group-hover:text-cyan-700 dark:group-hover:text-cyan-300'
            }`}
          >
            {task.title}
          </h3>

          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 font-mono">
            <Clock className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
            <span className="tabular-nums">{task.timeString}</span>
            {task.tag && (
              <>
                <span>·</span>
                <span className="text-slate-500 dark:text-slate-400">#{task.tag}</span>
              </>
            )}
          </div>
        </div>
      </div>

      <button
        onClick={(e) => {
          e.stopPropagation();
          deleteTask(task.id);
        }}
        className="opacity-0 group-hover:opacity-100 p-1.5 text-slate-400 hover:text-rose-500 dark:hover:text-rose-400 rounded-lg transition-all cursor-pointer"
        title="Delete task"
        aria-label="Delete task"
      >
        <Trash2 className="w-4 h-4" />
      </button>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Task Orchestrator
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Track daily priorities, learning milestones, and AI scheduled deliverables.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => setIsModalOpen(true)}
        >
          Add Task
        </Button>
      </div>

      {/* Today's Tasks */}
      <section className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
          <span className="flex items-center gap-1.5 text-cyan-600 dark:text-cyan-400">
            <Calendar className="w-3.5 h-3.5" /> Today's Tasks
          </span>
          <span className="font-mono tabular-nums">{todayTasks.length} pending</span>
        </div>

        {todayTasks.length === 0 ? (
          <div className="p-5 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-dashed border-slate-300 dark:border-slate-800">
            All tasks for today completed! Excellent focus.
          </div>
        ) : (
          <div className="space-y-2">{todayTasks.map(renderTaskCard)}</div>
        )}
      </section>

      {/* Upcoming Tasks */}
      <section className="space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
          <span className="flex items-center gap-1.5 text-blue-600 dark:text-blue-400">
            <Clock className="w-3.5 h-3.5" /> Upcoming Tasks
          </span>
          <span className="font-mono tabular-nums">{upcomingTasks.length} queued</span>
        </div>

        {upcomingTasks.length === 0 ? (
          <div className="p-5 text-center text-xs text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-900/30 rounded-xl border border-dashed border-slate-300 dark:border-slate-800">
            No upcoming tasks scheduled.
          </div>
        ) : (
          <div className="space-y-2">{upcomingTasks.map(renderTaskCard)}</div>
        )}
      </section>

      {/* Completed Tasks */}
      {completedTasks.length > 0 && (
        <section className="space-y-3 pt-4 border-t border-slate-200 dark:border-slate-800/80">
          <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400">
              <CheckSquare className="w-3.5 h-3.5" /> Completed
            </span>
            <span className="font-mono tabular-nums">{completedTasks.length} finished</span>
          </div>

          <div className="space-y-2 opacity-80 hover:opacity-100 transition-opacity">
            {completedTasks.map(renderTaskCard)}
          </div>
        </section>
      )}

      {/* Add Task Modal */}
      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Add New Task"
        description="Schedule a task or learning objective with NOVA AI."
        maxWidth="md"
      >
        <div className="space-y-4 pt-1">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-1">
              Task Title
            </label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Study React Concurrent Mode"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-1">
                Time / Deadline
              </label>
              <input
                type="text"
                value={newTimeString}
                onChange={(e) => setNewTimeString(e.target.value)}
                placeholder="Today · 7:00 PM"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-1">
                Category
              </label>
              <select
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value as 'today' | 'upcoming')}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
              >
                <option value="today">Today's Task</option>
                <option value="upcoming">Upcoming Task</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <Button variant="ghost" size="sm" onClick={() => setIsModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleAddTask}>
              Add Task
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
