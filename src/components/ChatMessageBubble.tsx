import React, { useState } from 'react';
import {
  GraduationCap,
  User,
  Bookmark,
  BookmarkCheck,
  Copy,
  Check,
  Volume2,
  VolumeX,
  ThumbsUp,
  ThumbsDown,
  ArrowRight,
  ExternalLink,
} from 'lucide-react';
import { ChatMessage } from '../types/campus';
import { MarkdownRenderer } from './MarkdownRenderer';

interface ChatMessageBubbleProps {
  message: ChatMessage;
  onSelectPrompt: (prompt: string) => void;
  onToggleBookmark: (messageId: string) => void;
  onSetFeedback: (messageId: string, feedback: 'helpful' | 'unhelpful') => void;
}

export const ChatMessageBubble: React.FC<ChatMessageBubbleProps> = ({
  message,
  onSelectPrompt,
  onToggleBookmark,
  onSetFeedback,
}) => {
  const isBot = message.sender === 'bot';
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(message.text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleToggleSpeech = () => {
    if (!('speechSynthesis' in window)) return;

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      window.speechSynthesis.cancel();
      // Clean markdown tags for natural speech
      const cleanText = message.text
        .replace(/[*#`_\[\]]/g, '')
        .replace(/\(http[^)]+\)/g, '')
        .replace(/Suggested Follow-ups?:[\s\S]*$/i, '');
      const utterance = new SpeechSynthesisUtterance(cleanText);
      utterance.rate = 1.0;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  if (!isBot) {
    return (
      <div className="flex justify-end gap-3 max-w-3xl ml-auto mb-6">
        <div className="flex flex-col items-end">
          <div className="bg-slate-900 text-white px-4 py-3 rounded-2xl rounded-tr-sm text-sm sm:text-base leading-relaxed shadow-sm max-w-xl">
            <p className="whitespace-pre-wrap">{message.text}</p>
          </div>
          <span className="text-[11px] text-slate-400 mt-1 px-1">
            {message.timestamp}
          </span>
        </div>
        <div className="w-8 h-8 rounded-full bg-slate-200 text-slate-700 flex items-center justify-center flex-shrink-0 text-xs font-semibold">
          <User className="w-4 h-4" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-start gap-3 max-w-3xl mr-auto mb-6 group">
      {/* Bot Icon */}
      <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center flex-shrink-0 shadow-sm mt-0.5">
        <GraduationCap className="w-5 h-5" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="bg-white border border-slate-200/90 rounded-2xl rounded-tl-sm p-4 sm:p-5 shadow-sm text-slate-800">
          {/* Main Answer Content */}
          <MarkdownRenderer content={message.text} />

          {/* Action Toolbar */}
          <div className="flex flex-wrap items-center justify-between gap-3 pt-3.5 mt-3.5 border-t border-slate-100 text-xs text-slate-500">
            <div className="flex items-center gap-1">
              <button
                onClick={() => onToggleBookmark(message.id)}
                className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                  message.isBookmarked
                    ? 'text-amber-700 bg-amber-50 font-medium'
                    : 'hover:text-slate-900 hover:bg-slate-100'
                }`}
                title={message.isBookmarked ? 'Pinned to Saved Answers' : 'Save to Cheat Sheet'}
              >
                {message.isBookmarked ? (
                  <>
                    <BookmarkCheck className="w-3.5 h-3.5 text-amber-600" />
                    <span>Pinned</span>
                  </>
                ) : (
                  <>
                    <Bookmark className="w-3.5 h-3.5" />
                    <span>Pin to Cheat Sheet</span>
                  </>
                )}
              </button>

              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2.5 py-1 rounded-md hover:text-slate-900 hover:bg-slate-100 transition-colors"
                title="Copy response text"
              >
                {copied ? (
                  <>
                    <Check className="w-3.5 h-3.5 text-emerald-600" />
                    <span className="text-emerald-600">Copied</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy</span>
                  </>
                )}
              </button>

              {'speechSynthesis' in window && (
                <button
                  onClick={handleToggleSpeech}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md transition-colors ${
                    isSpeaking ? 'text-blue-600 bg-blue-50 font-medium' : 'hover:text-slate-900 hover:bg-slate-100'
                  }`}
                  title={isSpeaking ? 'Stop listening' : 'Listen to answer'}
                >
                  {isSpeaking ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-blue-600 animate-pulse" />
                      <span>Stop</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5" />
                      <span>Listen</span>
                    </>
                  )}
                </button>
              )}
            </div>

            {/* Helpful Feedback */}
            <div className="flex items-center gap-1">
              <span className="text-slate-400 mr-1 text-[11px]">Helpful?</span>
              <button
                onClick={() => onSetFeedback(message.id, 'helpful')}
                className={`p-1 rounded hover:bg-slate-100 transition-colors ${
                  message.feedback === 'helpful' ? 'text-emerald-600 bg-emerald-50' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Mark as helpful"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={() => onSetFeedback(message.id, 'unhelpful')}
                className={`p-1 rounded hover:bg-slate-100 transition-colors ${
                  message.feedback === 'unhelpful' ? 'text-rose-600 bg-rose-50' : 'text-slate-400 hover:text-slate-700'
                }`}
                title="Mark as unhelpful"
              >
                <ThumbsDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* Suggested Next Questions */}
        {message.suggestedQuestions && message.suggestedQuestions.length > 0 && (
          <div className="mt-3 ml-1">
            <p className="text-xs font-medium text-slate-500 mb-2">Suggested follow-ups:</p>
            <div className="flex flex-wrap gap-2">
              {message.suggestedQuestions.map((q, idx) => (
                <button
                  key={idx}
                  onClick={() => onSelectPrompt(q)}
                  className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-700 bg-white hover:bg-slate-100 hover:text-slate-900 border border-slate-200 px-3 py-1.5 rounded-lg transition-all text-left group/btn"
                >
                  <span>{q}</span>
                  <ArrowRight className="w-3 h-3 text-slate-400 group-hover/btn:translate-x-0.5 transition-transform" />
                </button>
              ))}
            </div>
          </div>
        )}

        <div className="text-[11px] text-slate-400 mt-1.5 ml-2">
          {message.timestamp} · Summit Academic & Campus Information System
        </div>
      </div>
    </div>
  );
};
