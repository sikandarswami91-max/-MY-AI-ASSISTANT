import React, { useState, useRef } from 'react';
import { Plus, Image as ImageIcon, Send, Paperclip, X } from 'lucide-react';
import { VoiceButton } from '../Voice/VoiceButton';

export interface ChatInputProps {
  onSendMessage: (content: string, attachments?: File[]) => void;
  isLoading?: boolean;
  onVoiceClick?: () => void;
  isVoiceListening?: boolean;
  placeholder?: string;
}

export const ChatInput: React.FC<ChatInputProps> = ({
  onSendMessage,
  isLoading = false,
  onVoiceClick,
  isVoiceListening = false,
  placeholder = 'Ask NOVA anything...',
}) => {
  const [text, setText] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imageInputRef = useRef<HTMLInputElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSend = () => {
    const trimmed = text.trim();
    if (!trimmed && selectedFiles.length === 0) return;
    if (isLoading) return;

    onSendMessage(trimmed, selectedFiles);
    setText('');
    setSelectedFiles([]);
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const filesArr = Array.from(e.target.files);
      setSelectedFiles((prev) => [...prev, ...filesArr]);
    }
  };

  const removeFile = (idx: number) => {
    setSelectedFiles((prev) => prev.filter((_, i) => i !== idx));
  };

  return (
    <div className="w-full bg-white/90 dark:bg-slate-950/80 backdrop-blur-md border-t border-slate-200 dark:border-slate-800/80 p-2.5 sm:p-4 transition-colors duration-200">
      <div className="max-w-4xl mx-auto">
        {/* Selected file preview chips */}
        {selectedFiles.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2 px-1">
            {selectedFiles.map((file, idx) => (
              <div
                key={idx}
                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-xs text-slate-700 dark:text-slate-300"
              >
                <Paperclip className="w-3 h-3 text-cyan-600 dark:text-cyan-400" />
                <span className="truncate max-w-[120px]">{file.name}</span>
                <button
                  type="button"
                  onClick={() => removeFile(idx)}
                  className="hover:text-rose-500 ml-1 transition-colors cursor-pointer"
                  aria-label="Remove attachment"
                >
                  <X className="w-3 h-3" />
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Input Bar Container */}
        <div className="flex items-end gap-1.5 sm:gap-2 bg-slate-50 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 hover:border-slate-300 dark:hover:border-slate-700 focus-within:border-cyan-500/80 focus-within:ring-1 focus-within:ring-cyan-500/30 rounded-2xl p-2 sm:p-2.5 transition-all shadow-sm">
          {/* Left Action Buttons */}
          <div className="flex items-center gap-0.5 sm:gap-1 pb-1">
            {/* Hidden file inputs */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
              multiple
            />
            <input
              type="file"
              ref={imageInputRef}
              accept="image/*"
              onChange={handleFileChange}
              className="hidden"
              multiple
            />

            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="min-w-[40px] min-h-[40px] flex items-center justify-center p-2 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer"
              title="Add attachment"
              aria-label="Add attachment"
            >
              <Plus className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>

            <button
              type="button"
              onClick={() => imageInputRef.current?.click()}
              className="min-w-[40px] min-h-[40px] p-2 text-slate-500 dark:text-slate-400 hover:text-cyan-600 dark:hover:text-cyan-400 hover:bg-slate-200/60 dark:hover:bg-slate-800/80 rounded-xl transition-colors cursor-pointer hidden sm:flex items-center justify-center"
              title="Upload image"
              aria-label="Upload image"
            >
              <ImageIcon className="w-4 h-4 sm:w-5 sm:h-5" />
            </button>
          </div>

          {/* Textarea */}
          <textarea
            ref={textareaRef}
            rows={1}
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              e.target.style.height = 'auto';
              e.target.style.height = `${Math.min(e.target.scrollHeight, 160)}px`;
            }}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            className="flex-1 bg-transparent border-0 text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 focus:ring-0 resize-none text-xs sm:text-sm py-1.5 px-1 max-h-40 min-h-[36px] outline-none"
          />

          {/* Right Action Buttons */}
          <div className="flex items-center gap-1 sm:gap-1.5 pb-1">
            {onVoiceClick && (
              <VoiceButton
                isListening={isVoiceListening}
                onClick={onVoiceClick}
                size="sm"
              />
            )}

            <button
              type="button"
              onClick={handleSend}
              disabled={isLoading || (!text.trim() && selectedFiles.length === 0)}
              className="min-w-[40px] min-h-[40px] flex items-center justify-center p-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold disabled:opacity-30 disabled:pointer-events-none transition-all cursor-pointer shadow-sm shadow-cyan-500/20"
              aria-label="Send message"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 px-3 pt-1.5">
          <span>NOVA AI may produce inaccurate information. Verify critical outputs.</span>
          <span className="hidden sm:inline">Use Shift + Enter for new line</span>
        </div>
      </div>
    </div>
  );
};
