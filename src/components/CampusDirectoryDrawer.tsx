import React, { useState } from 'react';
import {
  X,
  Building2,
  Clock,
  MapPin,
  Phone,
  Mail,
  ExternalLink,
  MessageSquare,
  Search,
} from 'lucide-react';
import { CampusService } from '../types/campus';

interface CampusDirectoryDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  services: CampusService[];
  onAskAboutService: (serviceName: string) => void;
  onSelectQuestion: (question: string) => void;
}

export const CampusDirectoryDrawer: React.FC<CampusDirectoryDrawerProps> = ({
  isOpen,
  onClose,
  services,
  onAskAboutService,
  onSelectQuestion,
}) => {
  const [search, setSearch] = useState('');
  const [filterCategory, setFilterCategory] = useState<string>('all');

  if (!isOpen) return null;

  const filtered = services.filter(s => {
    const matchesCategory = filterCategory === 'all' || s.category === filterCategory;
    const matchesSearch =
      !search ||
      s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.building.toLowerCase().includes(search.toLowerCase()) ||
      s.description.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="fixed inset-0 z-50 overflow-hidden bg-slate-900/40 backdrop-blur-xs flex justify-end">
      <div className="w-full max-w-xl bg-white h-full flex flex-col shadow-2xl animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="px-6 py-4 border-b border-slate-200 flex items-center justify-between bg-slate-50">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-slate-900 text-white">
              <Building2 className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">Campus Offices & Services Directory</h2>
              <p className="text-xs text-slate-500">Official locations, operating hours, and contacts</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-200 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Filter */}
        <div className="p-4 border-b border-slate-100 space-y-3 bg-white">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search office, building, or service..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-sm bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900"
            />
          </div>

          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            {['all', 'academic', 'financial', 'housing', 'dining', 'health', 'tech', 'transit', 'career'].map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCategory(cat)}
                className={`px-2.5 py-1 rounded-md capitalize font-medium transition-colors ${
                  filterCategory === cat
                    ? 'bg-slate-900 text-white'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Directory List */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {filtered.length === 0 ? (
            <div className="text-center py-12 text-slate-500 text-sm">
              No campus offices matched your search query.
            </div>
          ) : (
            filtered.map(service => (
              <div
                key={service.id}
                className="p-4 rounded-xl border border-slate-200 bg-white hover:border-slate-300 transition-all shadow-xs"
              >
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <h3 className="font-bold text-slate-900 text-sm">{service.name}</h3>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span>{service.department}</span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{service.category}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      onAskAboutService(service.name);
                      onClose();
                    }}
                    className="flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-slate-800 bg-slate-100 hover:bg-slate-200 rounded-md transition-colors"
                  >
                    <MessageSquare className="w-3.5 h-3.5" />
                    <span>Ask Bot</span>
                  </button>
                </div>

                <p className="text-xs text-slate-600 leading-relaxed mb-3">
                  {service.description}
                </p>

                {/* Location & Hours Metadata */}
                <div className="space-y-1.5 text-xs text-slate-600 bg-slate-50 p-2.5 rounded-lg mb-3">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>
                      {service.location} {service.room ? `(${service.room})` : ''}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                    <span>
                      {service.hours.weekdays} {service.hours.weekends !== 'Closed' ? `· Wknds: ${service.hours.weekends}` : '· Wknds: Closed'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 pt-1 border-t border-slate-200/60">
                    <a
                      href={`tel:${service.contact.phone.replace(/[^0-9]/g, '')}`}
                      className="flex items-center gap-1 text-slate-700 hover:text-slate-900 font-medium"
                    >
                      <Phone className="w-3 h-3 text-slate-400" />
                      <span>{service.contact.phone}</span>
                    </a>
                    <a
                      href={`mailto:${service.contact.email}`}
                      className="flex items-center gap-1 text-slate-700 hover:text-slate-900 font-medium"
                    >
                      <Mail className="w-3 h-3 text-slate-400" />
                      <span>{service.contact.email}</span>
                    </a>
                  </div>
                </div>

                {/* Popular Questions */}
                {service.popularQuestions.length > 0 && (
                  <div className="space-y-1">
                    <span className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                      Frequently Asked:
                    </span>
                    <div className="flex flex-col gap-1">
                      {service.popularQuestions.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => {
                            onSelectQuestion(q);
                            onClose();
                          }}
                          className="text-left text-xs text-blue-700 hover:text-blue-900 hover:underline flex items-center justify-between group py-0.5"
                        >
                          <span className="truncate">{q}</span>
                          <span className="text-slate-300 group-hover:text-blue-700 text-xs">→</span>
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
