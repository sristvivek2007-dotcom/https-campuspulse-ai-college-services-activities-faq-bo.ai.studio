import React from 'react';
import {
  GraduationCap,
  Building2,
  Calendar,
  Bookmark,
  ShieldAlert,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { CAMPUS_NAME } from '../data/campusKnowledge';

interface HeaderProps {
  onOpenDirectory: () => void;
  onOpenEvents: () => void;
  onOpenBookmarks: () => void;
  onOpenEmergency: () => void;
  onResetChat: () => void;
  bookmarkCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenDirectory,
  onOpenEvents,
  onOpenBookmarks,
  onOpenEmergency,
  onResetChat,
  bookmarkCount,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Info */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-slate-900 text-amber-400 flex items-center justify-center shadow-sm">
              <GraduationCap className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-900 text-lg tracking-tight">
                  CampusPulse AI
                </span>
                <span className="text-slate-400 text-xs hidden sm:inline">·</span>
                <span className="text-slate-500 text-xs font-medium hidden sm:inline">
                  {CAMPUS_NAME}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>Student Services & Activities Bot</span>
                <span aria-hidden="true">·</span>
                <span className="text-emerald-600 font-medium flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Advising Online
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Navigation */}
          <div className="flex items-center gap-1.5 sm:gap-2">
            <button
              onClick={onOpenDirectory}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Browse Campus Offices & Services"
            >
              <Building2 className="w-4 h-4 text-slate-500" />
              <span className="hidden md:inline">Offices & Services</span>
            </button>

            <button
              onClick={onOpenEvents}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="Upcoming Campus Activities & Events"
            >
              <Calendar className="w-4 h-4 text-slate-500" />
              <span className="hidden md:inline">Activities & Events</span>
            </button>

            <button
              onClick={onOpenBookmarks}
              className="relative flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-medium text-slate-700 hover:text-slate-900 hover:bg-slate-100 rounded-lg transition-colors"
              title="View Bookmarked Answers (Cheat Sheet)"
            >
              <Bookmark className="w-4 h-4 text-slate-500" />
              <span className="hidden sm:inline">Saved Answers</span>
              {bookmarkCount > 0 && (
                <span className="w-4 h-4 rounded-full bg-amber-500 text-white text-[10px] font-bold flex items-center justify-center">
                  {bookmarkCount}
                </span>
              )}
            </button>

            <button
              onClick={onOpenEmergency}
              className="flex items-center gap-1.5 px-3 py-1.5 text-xs sm:text-sm font-semibold text-rose-700 bg-rose-50 hover:bg-rose-100 rounded-lg transition-colors border border-rose-200"
              title="Campus Emergency Numbers & SafeWalk"
            >
              <ShieldAlert className="w-4 h-4 text-rose-600" />
              <span className="hidden sm:inline">Emergency & Safety</span>
            </button>

            <button
              onClick={onResetChat}
              className="p-2 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-lg transition-colors ml-1"
              title="Reset Conversation"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};
