import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { mockChats } from '../services/mockData';
import { ChatSession } from '../types/chat';
import { Search, Trash2, Edit3, MessageSquare, ArrowRight, Clock, Plus } from 'lucide-react';
import { Button } from '../components/Common/Button';
import { EmptyState } from '../components/Common/EmptyState';
import { Modal } from '../components/Common/Modal';

export const History: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [sessions, setSessions] = useState<ChatSession[]>(mockChats);
  const [renameModalOpen, setRenameModalOpen] = useState(false);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [currentSessionToRename, setCurrentSessionToRename] = useState<ChatSession | null>(null);
  const [sessionToDelete, setSessionToDelete] = useState<string | null>(null);
  const [newTitle, setNewTitle] = useState('');

  const filteredSessions = sessions.filter(
    (s) =>
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.preview.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const groups = ['Today', 'Yesterday', 'Previous 7 days'];

  const handleOpenDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setSessionToDelete(id);
    setDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    if (sessionToDelete) {
      setSessions((prev) => prev.filter((s) => s.id !== sessionToDelete));
      setSessionToDelete(null);
    }
    setDeleteModalOpen(false);
  };

  const handleOpenRename = (session: ChatSession, e: React.MouseEvent) => {
    e.stopPropagation();
    setCurrentSessionToRename(session);
    setNewTitle(session.title);
    setRenameModalOpen(true);
  };

  const handleSaveRename = () => {
    if (!currentSessionToRename || !newTitle.trim()) return;
    setSessions((prev) =>
      prev.map((s) => (s.id === currentSessionToRename.id ? { ...s, title: newTitle.trim() } : s))
    );
    setRenameModalOpen(false);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-6">
      {/* Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-slate-100">
            Conversation History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Search, resume, or manage your historical interactions with NOVA AI.
          </p>
        </div>

        <Button
          variant="primary"
          size="sm"
          leftIcon={<Plus className="w-4 h-4" />}
          onClick={() => navigate('/chat')}
        >
          New Conversation
        </Button>
      </div>

      {/* Search Input Bar */}
      <div className="relative">
        <Search className="w-4 h-4 text-slate-400 dark:text-slate-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search conversation topics, code discussions, notes..."
          className="w-full bg-white dark:bg-slate-900/80 border border-slate-200 dark:border-slate-800 rounded-xl pl-10 pr-4 py-2.5 text-xs sm:text-sm text-slate-900 dark:text-slate-200 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:outline-none focus:border-cyan-500 shadow-xs transition-all"
        />
      </div>

      {/* Date Groups List */}
      {filteredSessions.length === 0 ? (
        <EmptyState
          icon={<MessageSquare className="w-6 h-6" />}
          title="No conversations found"
          description="Try modifying your search keywords or initiate a brand new conversation."
          actionLabel="Start New Chat"
          onAction={() => navigate('/chat')}
        />
      ) : (
        <div className="space-y-6">
          {groups.map((group) => {
            const groupSessions = filteredSessions.filter((s) => s.date === group);
            if (groupSessions.length === 0) return null;

            return (
              <div key={group} className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
                  <Clock className="w-3.5 h-3.5 text-cyan-600 dark:text-cyan-400" />
                  <span>{group}</span>
                  <span className="text-slate-400 dark:text-slate-600">({groupSessions.length})</span>
                </div>

                <div className="space-y-2.5">
                  {groupSessions.map((session) => (
                    <div
                      key={session.id}
                      onClick={() => navigate('/chat')}
                      className="group flex items-center justify-between p-4 rounded-xl bg-white dark:bg-slate-900/60 hover:bg-slate-50 dark:hover:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all cursor-pointer shadow-xs"
                    >
                      <div className="space-y-1 pr-4 truncate">
                        <div className="flex items-center gap-2">
                          <h3 className="text-sm sm:text-base font-semibold text-slate-900 dark:text-slate-200 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 transition-colors truncate">
                            {session.title}
                          </h3>
                          {session.category && (
                            <span className="text-[11px] text-slate-500 dark:text-slate-400 shrink-0 font-medium">
                              · {session.category}
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 truncate max-w-xl">
                          {session.preview}
                        </p>
                      </div>

                      {/* Right Action Icons */}
                      <div className="flex items-center gap-1 shrink-0">
                        <span className="text-xs font-mono text-slate-400 dark:text-slate-500 mr-2 hidden sm:inline tabular-nums">
                          {session.messagesCount} msgs
                        </span>

                        <button
                          onClick={(e) => handleOpenRename(session, e)}
                          className="p-1.5 text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                          title="Rename conversation"
                          aria-label="Rename conversation"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>

                        <button
                          onClick={(e) => handleOpenDelete(session.id, e)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
                          title="Delete conversation"
                          aria-label="Delete conversation"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>

                        <ArrowRight className="w-4 h-4 text-slate-400 dark:text-slate-500 group-hover:text-cyan-600 dark:group-hover:text-cyan-400 group-hover:translate-x-1 transition-all ml-1" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Rename Conversation Modal */}
      <Modal
        isOpen={renameModalOpen}
        onClose={() => setRenameModalOpen(false)}
        title="Rename Conversation"
        description="Update the display title for this session thread."
        maxWidth="md"
      >
        <div className="space-y-4 pt-2">
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-300 dark:border-slate-700 rounded-xl px-3.5 py-2.5 text-sm text-slate-900 dark:text-slate-100 focus:outline-none focus:border-cyan-500"
            placeholder="Enter session title..."
            autoFocus
          />

          <div className="flex justify-end gap-2 pt-2 border-t border-slate-200 dark:border-slate-800">
            <Button variant="ghost" size="sm" onClick={() => setRenameModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="primary" size="sm" onClick={handleSaveRename}>
              Save Title
            </Button>
          </div>
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        title="Delete Conversation"
        description="Are you sure you want to permanently delete this conversation history?"
        maxWidth="sm"
      >
        <div className="flex justify-end gap-2 pt-4">
          <Button variant="ghost" size="sm" onClick={() => setDeleteModalOpen(false)}>
            Cancel
          </Button>
          <Button variant="danger" size="sm" onClick={handleConfirmDelete}>
            Delete
          </Button>
        </div>
      </Modal>
    </div>
  );
};
