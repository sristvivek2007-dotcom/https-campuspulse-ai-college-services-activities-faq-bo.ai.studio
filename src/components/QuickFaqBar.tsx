import React from 'react';
import {
  BookOpen,
  DollarSign,
  Home,
  Utensils,
  HeartPulse,
  Users,
  Laptop,
  Bus,
  Briefcase,
  HelpCircle,
  Search,
} from 'lucide-react';
import { ServiceCategory, FAQItem } from '../types/campus';

interface QuickFaqBarProps {
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  faqs: FAQItem[];
  onSelectQuestion: (question: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const CATEGORIES: { id: string; label: string; icon: React.ReactNode }[] = [
  { id: 'all', label: 'All FAQs', icon: <HelpCircle className="w-3.5 h-3.5" /> },
  { id: 'academic', label: 'Academics & Registrar', icon: <BookOpen className="w-3.5 h-3.5" /> },
  { id: 'financial', label: 'Financial Aid & Billing', icon: <DollarSign className="w-3.5 h-3.5" /> },
  { id: 'housing', label: 'Housing & Dorms', icon: <Home className="w-3.5 h-3.5" /> },
  { id: 'dining', label: 'Dining & Meal Plans', icon: <Utensils className="w-3.5 h-3.5" /> },
  { id: 'health', label: 'Health & CAPS', icon: <HeartPulse className="w-3.5 h-3.5" /> },
  { id: 'activities', label: 'Clubs & Recreation', icon: <Users className="w-3.5 h-3.5" /> },
  { id: 'tech', label: 'IT & Software', icon: <Laptop className="w-3.5 h-3.5" /> },
  { id: 'transit', label: 'Transit & Parking', icon: <Bus className="w-3.5 h-3.5" /> },
  { id: 'career', label: 'Career & Jobs', icon: <Briefcase className="w-3.5 h-3.5" /> },
];

export const QuickFaqBar: React.FC<QuickFaqBarProps> = ({
  selectedCategory,
  onSelectCategory,
  faqs,
  onSelectQuestion,
  searchQuery,
  onSearchChange,
}) => {
  const filteredFaqs = faqs.filter(faq => {
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    const matchesSearch =
      !searchQuery ||
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())) ||
      faq.shortAnswer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="bg-white border-b border-slate-200">
      {/* Search & Topic Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 mb-2.5">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Campus Topics & Frequent Inquiries
            </span>
            <span className="text-slate-400 text-xs">·</span>
            <span className="text-xs text-slate-500">
              {filteredFaqs.length} verified answers
            </span>
          </div>

          {/* Quick FAQ Search Filter */}
          <div className="relative w-full sm:w-64">
            <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Filter topics (e.g. WiFi, FAFSA)..."
              value={searchQuery}
              onChange={e => onSearchChange(e.target.value)}
              className="w-full pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-lg text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-1 focus:ring-slate-900 focus:bg-white"
            />
          </div>
        </div>

        {/* Category Filter Buttons (Interactive Segmented Tabs) */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1.5 scrollbar-none no-scrollbar">
          {CATEGORIES.map(cat => {
            const isActive = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => onSelectCategory(cat.id)}
                className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-lg whitespace-nowrap transition-colors flex-shrink-0 ${
                  isActive
                    ? 'bg-slate-900 text-white shadow-sm'
                    : 'bg-slate-100 text-slate-700 hover:bg-slate-200 hover:text-slate-900'
                }`}
              >
                {cat.icon}
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>

        {/* Popular Question Chips for Quick Asking */}
        <div className="flex items-center gap-2 overflow-x-auto pt-2 pb-1 scrollbar-none no-scrollbar text-xs">
          <span className="text-[11px] font-semibold text-slate-400 flex-shrink-0 uppercase tracking-wider">
            Quick Ask:
          </span>
          {filteredFaqs.slice(0, 6).map(item => (
            <button
              key={item.id}
              onClick={() => onSelectQuestion(item.question)}
              className="px-2.5 py-1 text-slate-600 bg-white border border-slate-200 hover:border-slate-400 hover:text-slate-900 hover:bg-slate-50 rounded-md transition-all flex-shrink-0 text-left truncate max-w-[280px]"
              title={item.question}
            >
              {item.question}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
