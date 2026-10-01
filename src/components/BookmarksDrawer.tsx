import React, { useState } from 'react';
import {
  X,
  Bookmark,
  Trash2,
  Copy,
  Check,
  Printer,
  Search,
  ExternalLink,
} from 'lucide-react';
import { ChatMessage } from '../types/campus';
import { MarkdownRenderer } from './MarkdownRenderer';

interface BookmarksDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  bookmarkedMessages: ChatMessage[];
  onRemoveBookmark: (messageId: string) => void;
  onClearAllBookmarks: () => void;
}

export const BookmarksDrawer: React.FC<BookmarksDrawerProps> = ({
  isOpen,
  onClose,
  bookmarkedMessages,
  onRemoveBookmark,
  onClearAllBookmarks,
}) => {
  const [search, setSearch] = useState('');
  const [copiedAll, setCopiedAll] = useState(false);

  if (!isOpen) return null;

  const filtered = bookmarkedMessages.filter(m =>
    m.text.toLowerCase().includes(search.toLowerCase())
  );

  const handleCopyAll = () => {
    const text = bookmarkedMessages
      .map((m, i) => `=== Saved Item #${i + 1} (${m.timestamp}) ===\n${m.text}\n`)
      .join('\n\n');
    navigator.clipboard.writeText(text);
    setCopiedAll(true);
    setTimeout(() => setCopiedAll(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-xl bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500 text-white">
              <Bookmark className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Saved Answers & Student Cheat Sheet</h2>
              <p className="text-xs text-slate-500">
                {bookmarkedMessages.length} pinned answers saved locally
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Toolbar */}
        <div className="p-4 border-b border-slate-100 flex items-center justify-between gap-3 bg-white">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search your saved answers..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          {bookmarkedMessages.length > 0 && (
            <div className="flex items-center gap-2">
              <button
                onClick={handleCopyAll}
                className="flex items-center gap-1 px-2.5 py-1.5 text-xs font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 border border-slate-200 rounded-lg transition-colors"
                title="Copy all saved items"
              >
                {copiedAll ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedAll ? 'Copied' : 'Copy All'}</span>
              </button>

              <button
                onClick={onClearAllBookmarks}
                className="p-1.5 text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
                title="Clear all saved answers"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        {/* List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {bookmarkedMessages.length === 0 ? (
            <div className="text-center py-16 px-4">
              <Bookmark className="w-10 h-10 text-slate-300 mx-auto mb-3" />
              <h3 className="font-semibold text-slate-700 text-sm">No saved answers yet</h3>
              <p className="text-xs text-slate-500 mt-1 max-w-sm mx-auto">
                Click "Pin to Cheat Sheet" on any AI response to save important campus hours, deadlines, and contact steps for quick reference.
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No saved answers matched your search.
            </div>
          ) : (
            filtered.map((msg, index) => (
              <div
                key={msg.id}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-xs"
              >
                <div className="flex items-center justify-between text-xs text-slate-400 mb-2 pb-2 border-b border-slate-100">
                  <span>Saved Note #{index + 1} · {msg.timestamp}</span>
                  <button
                    onClick={() => onRemoveBookmark(msg.id)}
                    className="text-slate-400 hover:text-rose-600 p-1 rounded hover:bg-slate-100 transition-colors"
                    title="Remove from saved"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="text-sm">
                  <MarkdownRenderer content={msg.text} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
