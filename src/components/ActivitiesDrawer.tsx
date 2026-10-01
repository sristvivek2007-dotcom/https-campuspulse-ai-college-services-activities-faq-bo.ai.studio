import React, { useState } from 'react';
import {
  X,
  Calendar,
  Clock,
  MapPin,
  Users,
  MessageSquare,
  Sparkles,
} from 'lucide-react';
import { CampusEvent } from '../types/campus';

interface ActivitiesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  events: CampusEvent[];
  onAskAboutEvent: (eventTitle: string) => void;
}

export const ActivitiesDrawer: React.FC<ActivitiesDrawerProps> = ({
  isOpen,
  onClose,
  events,
  onAskAboutEvent,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const filtered = events.filter(e => {
    return selectedCategory === 'all' || e.category === selectedCategory;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-xl bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-amber-500 text-slate-950 font-bold">
              <Calendar className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Campus Activities & Events Calendar</h2>
              <p className="text-xs text-slate-500">Student life, club meetings, fairs & athletic events</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Filter buttons */}
        <div className="p-4 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto text-xs bg-white">
          {['all', 'social', 'career', 'academic', 'wellness', 'sports'].map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg capitalize font-medium transition-colors ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat === 'all' ? 'All Activities' : cat}
            </button>
          ))}
        </div>

        {/* Event List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filtered.map(evt => (
            <div
              key={evt.id}
              className={`p-4 rounded-xl border transition-all ${
                evt.isFeatured
                  ? 'border-amber-300 bg-amber-50/30'
                  : 'border-slate-200 bg-white hover:border-slate-300'
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <div>
                  {evt.isFeatured && (
                    <div className="flex items-center gap-1 text-[11px] font-bold text-amber-700 uppercase tracking-wider mb-1">
                      <Sparkles className="w-3 h-3 text-amber-600" />
                      <span>Featured Campus Highlight</span>
                    </div>
                  )}
                  <h3 className="font-bold text-slate-900 text-sm">{evt.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                    <span>{evt.organizer}</span>
                    <span aria-hidden="true">·</span>
                    <span className="capitalize">{evt.category}</span>
                  </div>
                </div>

                <button
                  onClick={() => {
                    onAskAboutEvent(evt.title);
                    onClose();
                  }}
                  className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors flex-shrink-0"
                >
                  <MessageSquare className="w-3.5 h-3.5" />
                  <span>Ask Bot</span>
                </button>
              </div>

              <p className="text-xs text-slate-600 leading-relaxed mb-3">
                {evt.description}
              </p>

              <div className="space-y-1 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg mb-2">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span className="font-medium text-slate-800">{evt.date}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{evt.time}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  <span>{evt.location}</span>
                </div>
              </div>

              {/* Tags without pills - clean unboxed typography */}
              <div className="flex items-center gap-2 text-[11px] text-slate-400 pt-1">
                <span>Tags:</span>
                {evt.tags.map((t, idx) => (
                  <React.Fragment key={idx}>
                    <span className="text-slate-600 font-medium">{t}</span>
                    {idx < evt.tags.length - 1 && <span aria-hidden="true">·</span>}
                  </React.Fragment>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
