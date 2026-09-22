import React, { useState } from 'react';
import { Copy, Check, RotateCw, ThumbsUp, ThumbsDown, Volume2, MoreHorizontal } from 'lucide-react';
import { Dropdown } from '../Common/Dropdown';

export interface MessageActionsProps {
  content: string;
  onRegenerate?: () => void;
  onLikeToggle?: (liked: boolean) => void;
  onDislikeToggle?: (disliked: boolean) => void;
  onSpeak?: () => void;
  initialLiked?: boolean;
  initialDisliked?: boolean;
}

export const MessageActions: React.FC<MessageActionsProps> = ({
  content,
  onRegenerate,
  onLikeToggle,
  onDislikeToggle,
  onSpeak,
  initialLiked = false,
  initialDisliked = false,
}) => {
  const [copied, setCopied] = useState(false);
  const [liked, setLiked] = useState(initialLiked);
  const [disliked, setDisliked] = useState(initialDisliked);

  const handleCopy = () => {
    navigator.clipboard.writeText(content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleLike = () => {
    const next = !liked;
    setLiked(next);
    if (next) setDisliked(false);
    if (onLikeToggle) onLikeToggle(next);
  };

  const handleDislike = () => {
    const next = !disliked;
    setDisliked(next);
    if (next) setLiked(false);
    if (onDislikeToggle) onDislikeToggle(next);
  };

  const dropdownItems = [
    {
      id: 'copy',
      label: 'Copy Full Text',
      icon: <Copy className="w-3.5 h-3.5" />,
      onClick: handleCopy,
    },
    {
      id: 'export',
      label: 'Export as Markdown',
      icon: <Check className="w-3.5 h-3.5" />,
      onClick: () => {
        const blob = new Blob([content], { type: 'text/markdown' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `nova-response-${Date.now()}.md`;
        a.click();
      },
    },
  ];

  return (
    <div className="flex items-center gap-1 text-slate-500 dark:text-slate-400 pt-2 text-xs">
      <button
        onClick={handleCopy}
        className="p-1.5 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
        title={copied ? 'Copied to clipboard' : 'Copy message'}
        aria-label="Copy message"
      >
        {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
      </button>

      {onSpeak && (
        <button
          onClick={onSpeak}
          className="p-1.5 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          title="Read aloud"
          aria-label="Read aloud"
        >
          <Volume2 className="w-3.5 h-3.5" />
        </button>
      )}

      {onRegenerate && (
        <button
          onClick={onRegenerate}
          className="p-1.5 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          title="Regenerate response"
          aria-label="Regenerate response"
        >
          <RotateCw className="w-3.5 h-3.5" />
        </button>
      )}

      <button
        onClick={handleLike}
        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
          liked
            ? 'text-cyan-600 dark:text-cyan-400 bg-cyan-50 dark:bg-cyan-500/10'
            : 'hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
        }`}
        title="Good response"
        aria-label="Like response"
      >
        <ThumbsUp className="w-3.5 h-3.5" />
      </button>

      <button
        onClick={handleDislike}
        className={`p-1.5 rounded-lg transition-colors cursor-pointer ${
          disliked
            ? 'text-rose-500 dark:text-rose-400 bg-rose-50 dark:bg-rose-500/10'
            : 'hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800'
        }`}
        title="Poor response"
        aria-label="Dislike response"
      >
        <ThumbsDown className="w-3.5 h-3.5" />
      </button>

      <Dropdown
        trigger={
          <button
            className="p-1.5 hover:text-slate-900 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
            aria-label="More options"
          >
            <MoreHorizontal className="w-3.5 h-3.5" />
          </button>
        }
        items={dropdownItems}
      />
    </div>
  );
};
