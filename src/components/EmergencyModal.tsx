import React from 'react';
import {
  X,
  ShieldAlert,
  PhoneCall,
  Navigation,
  HeartPulse,
  AlertTriangle,
  ExternalLink,
} from 'lucide-react';
import { CAMPUS_NAME } from '../data/campusKnowledge';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAskBot: (question: string) => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({
  isOpen,
  onClose,
  onAskBot,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl max-w-lg w-full shadow-2xl border border-rose-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-rose-600 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="p-2 rounded-xl bg-white/20">
              <ShieldAlert className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-base font-bold">Campus Emergency & Safety Center</h2>
              <p className="text-xs text-rose-100">{CAMPUS_NAME} 24/7 Response Services</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-rose-200 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Numbers & Resources */}
        <div className="p-6 space-y-4">
          {/* Immediate Police 911 */}
          <div className="p-3.5 rounded-xl bg-rose-50 border border-rose-200 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-rose-700">
                Life Safety / Medical Emergency
              </div>
              <div className="text-lg font-extrabold text-rose-950 mt-0.5">
                (555) 019-9111
              </div>
              <div className="text-xs text-rose-700">
                Direct to Summit University Police Dispatch (or dial 911)
              </div>
            </div>
            <a
              href="tel:5550199111"
              className="px-3 py-2 rounded-lg bg-rose-600 hover:bg-rose-700 text-white font-semibold text-xs flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <PhoneCall className="w-4 h-4" />
              <span>Call Now</span>
            </a>
          </div>

          {/* SafeWalk Escort Service */}
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center gap-1.5">
                <Navigation className="w-3.5 h-3.5 text-blue-600" />
                <span>SafeWalk 24/7 Night Escort</span>
              </div>
              <div className="text-sm font-bold text-slate-900 mt-0.5">
                (555) 019-2000
              </div>
              <div className="text-xs text-slate-500">
                Free walking escort to any campus dorm, library, or parking lot
              </div>
            </div>
            <a
              href="tel:5550192000"
              className="px-3 py-2 rounded-lg bg-slate-900 hover:bg-slate-800 text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Call SafeWalk</span>
            </a>
          </div>

          {/* 24/7 Mental Health Crisis */}
          <div className="p-3.5 rounded-xl bg-indigo-50 border border-indigo-200 flex items-center justify-between">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-indigo-700 flex items-center gap-1.5">
                <HeartPulse className="w-3.5 h-3.5 text-indigo-600" />
                <span>24/7 Crisis & Counseling Line</span>
              </div>
              <div className="text-sm font-bold text-indigo-950 mt-0.5">
                (555) 019-SAFE or 988
              </div>
              <div className="text-xs text-indigo-700">
                Confidential crisis support or text HOME to 741741
              </div>
            </div>
            <a
              href="tel:988"
              className="px-3 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-700 text-white font-medium text-xs flex items-center gap-1.5 transition-colors"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Dial 988</span>
            </a>
          </div>

          {/* Emergency Blue Light stations info */}
          <div className="p-3 rounded-lg bg-slate-100 text-xs text-slate-600 leading-relaxed">
            <span className="font-semibold text-slate-800">Blue Light Stations:</span> Over 60 emergency pedestals are placed along all campus pathways and parking decks. Pressing the red button instantly dispatches an officer with real-time GPS location.
          </div>

          {/* Quick Bot Actions */}
          <div className="pt-2 border-t border-slate-100 flex items-center justify-between">
            <button
              onClick={() => {
                onAskBot('How does the SafeWalk night escort service work and how do I request one?');
                onClose();
              }}
              className="text-xs text-blue-700 hover:text-blue-900 font-medium hover:underline"
            >
              Ask Bot about SafeWalk rules →
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-100 rounded-lg transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
