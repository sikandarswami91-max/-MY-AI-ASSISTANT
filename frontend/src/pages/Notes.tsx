import React, { useState } from 'react';
import { mockNotes } from '../services/mockData';
import { NoteItem } from '../types/note';
import { Search, Plus, Pin, Star, Trash2, Edit3, FileText } from 'lucide-react';
import { Button } from '../components/Common/Button';
import { Modal } from '../components/Common/Modal';
import { EmptyState } from '../components/Common/EmptyState';

export const Notes: React.FC = () => {
  const [notes, setNotes] = useState<NoteItem[]>(mockNotes);
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<'all' | 'pinned' | 'favorites'>('all');
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [editingNote, setEditingNote] = useState<NoteItem | null>(null);

  // Form states
  const [formTitle, setFormTitle] = useState('');
  const [formContent, setFormContent] = useState('');
  const [formCategory, setFormCategory] = useState('General');
  const [formTags, setFormTags] = useState('');

  const filteredNotes = notes.filter((note) => {
    const matchesSearch =
      note.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
      note.tags.some((t) => t.toLowerCase().includes(searchQuery.toLowerCase()));

    if (!matchesSearch) return false;
    if (filter === 'pinned') return note.isPinned;
    if (filter === 'favorites') return note.isFavorite;
    return true;
  });

  const handleOpenCreate = () => {
    setEditingNote(null);
    setFormTitle('');
    setFormContent('');
    setFormCategory('General');
    setFormTags('');
    setIsEditorOpen(true);
  };

  const handleOpenEdit = (note: NoteItem) => {
    setEditingNote(note);
    setFormTitle(note.title);
    setFormContent(note.content);
    setFormCategory(note.category);
    setFormTags(note.tags.join(', '));
    setIsEditorOpen(true);
  };

  const handleSaveNote = () => {
    if (!formTitle.trim()) return;

    const tagsArray = formTags
      .split(',')
      .map((t) => t.trim())
      .filter(Boolean);

    if (editingNote) {
      setNotes((prev) =>
        prev.map((n) =>
          n.id === editingNote.id
            ? {
                ...n,
                title: formTitle,
                content: formContent,
                category: formCategory,
                tags: tagsArray,
                updatedAt: 'Just now',
              }
            : n
        )
      );
    } else {
      const newNote: NoteItem = {
        id: `note-${Date.now()}`,
        title: formTitle,
        content: formContent,
        category: formCategory,
        tags: tagsArray.length > 0 ? tagsArray : ['general'],
        isPinned: false,
        isFavorite: false,
        createdAt: 'Just now',
        updatedAt: 'Just now',
      };
      setNotes((prev) => [newNote, ...prev]);
    }

    setIsEditorOpen(false);
  };

  const togglePin = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isPinned: !n.isPinned } : n))
    );
  };

  const toggleFavorite = (id: string) => {
    setNotes((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isFavorite: !n.isFavorite } : n))
    );
  };

  const handleDelete = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Technical Notes & Ideas
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Store architectures, code snippets, research observations, and AI session summaries.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={handleOpenCreate}
        >
          Create Note
        </Button>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-md">
          <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search notes by keyword or tag..."
            className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2 text-xs sm:text-sm text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 shadow-xs"
          />
        </div>

        {/* Filter Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-100 dark:bg-slate-900/80 rounded-xl border border-slate-200 dark:border-slate-800 self-stretch sm:self-auto">
          <button
            onClick={() => setFilter('all')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filter === 'all'
                ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            All ({notes.length})
          </button>
          <button
            onClick={() => setFilter('pinned')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filter === 'pinned'
                ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Pinned ({notes.filter((n) => n.isPinned).length})
          </button>
          <button
            onClick={() => setFilter('favorites')}
            className={`flex-1 sm:flex-initial px-3 py-1.5 text-xs font-semibold rounded-lg transition-colors cursor-pointer ${
              filter === 'favorites'
                ? 'bg-white dark:bg-slate-800 text-cyan-600 dark:text-cyan-400 shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            Favorites ({notes.filter((n) => n.isFavorite).length})
          </button>
        </div>
      </div>

      {/* Notes Grid */}
      {filteredNotes.length === 0 ? (
        <EmptyState
          icon={<FileText className="w-6 h-6" />}
          title="No notes match your filter"
          description="Create a new technical note or clear your active search query."
          actionLabel="Create Note"
          onAction={handleOpenCreate}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredNotes.map((note) => (
            <div
              key={note.id}
              className={`flex flex-col justify-between p-5 rounded-2xl bg-white dark:bg-slate-900/60 border transition-all duration-200 hover:bg-slate-50 dark:hover:bg-slate-900/90 shadow-xs ${
                note.isPinned ? 'border-cyan-400/80 dark:border-cyan-500/40 shadow-xs' : 'border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700'
              }`}
            >
              <div>
                {/* Header with category and actions */}
                <div className="flex items-center justify-between gap-2 mb-2">
                  <span className="text-[11px] text-cyan-600 dark:text-cyan-400 font-semibold tracking-wide">
                    {note.category}
                  </span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => togglePin(note.id)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        note.isPinned
                          ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10'
                          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                      }`}
                      title={note.isPinned ? 'Unpin note' : 'Pin note'}
                    >
                      <Pin className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => toggleFavorite(note.id)}
                      className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
                        note.isFavorite
                          ? 'text-amber-500 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/10'
                          : 'text-slate-400 hover:text-slate-600 dark:hover:text-slate-300'
                      }`}
                      title={note.isFavorite ? 'Remove favorite' : 'Mark favorite'}
                    >
                      <Star className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>

                <h3 className="text-base font-semibold text-slate-900 dark:text-slate-100 mb-2 leading-snug">
                  {note.title}
                </h3>

                <p className="text-xs text-slate-600 dark:text-slate-300 line-clamp-4 leading-relaxed whitespace-pre-line">
                  {note.content}
                </p>
              </div>

              {/* Footer with tags, date and edit/delete */}
              <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80">
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {note.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="text-[10px] text-slate-600 dark:text-slate-400 bg-slate-100 dark:bg-slate-800/80 px-2 py-0.5 rounded-md border border-slate-200 dark:border-slate-700/60 font-mono"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-[11px] text-slate-400 dark:text-slate-500">
                  <span>Updated {note.updatedAt}</span>
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => handleOpenEdit(note)}
                      className="p-1 hover:text-cyan-600 dark:hover:text-cyan-400 rounded transition-colors cursor-pointer"
                      title="Edit note"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleDelete(note.id)}
                      className="p-1 hover:text-rose-500 dark:hover:text-rose-400 rounded transition-colors cursor-pointer"
                      title="Delete note"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Create / Edit Note Modal */}
      <Modal
        isOpen={isEditorOpen}
        onClose={() => setIsEditorOpen(false)}
        title={editingNote ? 'Edit Note' : 'Create New Note'}
        description="Write notes, code ideas or session summaries."
        maxWidth="xl"
      >
        <div className="space-y-4 pt-1">
          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-1">
              Title
            </label>
            <input
              type="text"
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              placeholder="e.g. Distributed Consensus Patterns"
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
              autoFocus
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-1">
                Category
              </label>
              <select
                value={formCategory}
                onChange={(e) => setFormCategory(e.target.value)}
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
              >
                <option value="Architecture">Architecture</option>
                <option value="AI Systems">AI Systems</option>
                <option value="Frontend">Frontend</option>
                <option value="Databases">Databases</option>
                <option value="Research">Research</option>
                <option value="General">General</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-1">
                Tags (comma separated)
              </label>
              <input
                type="text"
                value={formTags}
                onChange={(e) => setFormTags(e.target.value)}
                placeholder="React, State, Hooks"
                className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-semibold uppercase tracking-wider text-slate-600 dark:text-slate-400 block mb-1">
              Content
            </label>
            <textarea
              rows={6}
              value={formContent}
              onChange={(e) => setFormContent(e.target.value)}
              placeholder="Write your note markdown or observations..."
              className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl p-3 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500 resize-none font-sans"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <Button variant="ghost" size="sm" onClick={() => setIsEditorOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveNote}>
              {editingNote ? 'Update Note' : 'Save Note'}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};
