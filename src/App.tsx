import React, { useState, useEffect, useRef } from 'react';
import {
  Send,
  Mic,
  MicOff,
  GraduationCap,
  Sparkles,
  BookOpen,
  DollarSign,
  Home,
  Utensils,
  HeartPulse,
  Users,
  Laptop,
  Bus,
  Briefcase,
  ShieldAlert,
  ArrowRight,
  Info,
  Building2,
  Calendar,
  Bookmark,
  CheckCircle2,
} from 'lucide-react';
import { Header } from './components/Header';
import { QuickFaqBar } from './components/QuickFaqBar';
import { ChatMessageBubble } from './components/ChatMessageBubble';
import { CampusDirectoryDrawer } from './components/CampusDirectoryDrawer';
import { ActivitiesDrawer } from './components/ActivitiesDrawer';
import { BookmarksDrawer } from './components/BookmarksDrawer';
import { EmergencyModal } from './components/EmergencyModal';
import { ChatMessage, CampusService, CampusEvent, FAQItem } from './types/campus';
import {
  CAMPUS_NAME,
  CAMPUS_SERVICES,
  CAMPUS_EVENTS,
  PRESET_FAQS,
} from './data/campusKnowledge';

const INITIAL_WELCOME_MESSAGE: ChatMessage = {
  id: 'msg-welcome',
  sender: 'bot',
  text: `Hello! I'm **CampusPulse AI**, your 24/7 college student advisor for **${CAMPUS_NAME}**.\n\nWhether you need help with **academic deadlines**, **financial aid disbursement**, **dorm maintenance & room changes**, **meal swipe plans**, **free mental health counseling**, **joining student clubs**, or **campus transit**, I have real-time access to official university policies and directories.\n\nHow can I help you today? Choose any popular question below or ask me anything directly!`,
  timestamp: 'Just now',
  suggestedQuestions: [
    'How do I add or drop a class before the deadline?',
    'How do I book a confidential counseling session at CAPS?',
    'Where can I use my EagleBucks and meal swipes?',
    'When is the Spring Involvement & Club Fair?'
  ]
};

export default function App() {
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    try {
      const saved = localStorage.getItem('campuspulse_chat_history');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch (e) {
      console.error(e);
    }
    return [INITIAL_WELCOME_MESSAGE];
  });

  const [inputQuery, setInputQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchFilter, setSearchFilter] = useState('');

  // Modals & Drawers
  const [isDirectoryOpen, setIsDirectoryOpen] = useState(false);
  const [isEventsOpen, setIsEventsOpen] = useState(false);
  const [isBookmarksOpen, setIsBookmarksOpen] = useState(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState(false);

  // Voice recording state
  const [isRecording, setIsRecording] = useState(false);
  const recognitionRef = useRef<any>(null);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto scroll on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isLoading]);

  // Persist messages to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('campuspulse_chat_history', JSON.stringify(messages));
    } catch (e) {
      console.error(e);
    }
  }, [messages]);

  // Setup Web Speech Recognition if available
  useEffect(() => {
    const SpeechRecognition =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      const recognizer = new SpeechRecognition();
      recognizer.continuous = false;
      recognizer.interimResults = false;
      recognizer.lang = 'en-US';

      recognizer.onresult = (event: any) => {
        const transcript = event.results[0][0].transcript;
        setInputQuery(prev => (prev ? `${prev} ${transcript}` : transcript));
        setIsRecording(false);
      };

      recognizer.onerror = () => {
        setIsRecording(false);
      };

      recognizer.onend = () => {
        setIsRecording(false);
      };

      recognitionRef.current = recognizer;
    }
  }, []);

  const handleToggleVoice = () => {
    if (!recognitionRef.current) {
      alert('Speech recognition is not supported in this browser.');
      return;
    }

    if (isRecording) {
      recognitionRef.current.stop();
      setIsRecording(false);
    } else {
      try {
        recognitionRef.current.start();
        setIsRecording(true);
      } catch (err) {
        console.error('Speech recognition error:', err);
        setIsRecording(false);
      }
    }
  };

  const handleSendMessage = async (customText?: string) => {
    const textToSend = (customText || inputQuery).trim();
    if (!textToSend || isLoading) return;

    const userMsg: ChatMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text: textToSend,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages(prev => [...prev, userMsg]);
    setInputQuery('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userQuestion: textToSend,
          messages: [...messages, userMsg],
        }),
      });

      if (!response.ok) {
        throw new Error(`Server returned ${response.status}`);
      }

      const data = await response.json();

      const botMsg: ChatMessage = {
        id: `bot-${Date.now()}`,
        sender: 'bot',
        text: data.reply || 'Here is the relevant information from our campus database.',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        category: data.category,
        suggestedQuestions: data.suggestedQuestions,
        relatedServices: data.relatedServices,
      };

      setMessages(prev => [...prev, botMsg]);
    } catch (error: any) {
      console.error('Failed to get answer:', error);

      // Instant local fallback
      const matchingFaq = PRESET_FAQS.find(
        f =>
          f.question.toLowerCase().includes(textToSend.toLowerCase()) ||
          f.tags.some(t => textToSend.toLowerCase().includes(t.toLowerCase()))
      );

      const botMsg: ChatMessage = {
        id: `bot-fallback-${Date.now()}`,
        sender: 'bot',
        text: matchingFaq
          ? `**${matchingFaq.question}**\n\n${matchingFaq.detailedAnswer}\n\n📍 **Location:** ${matchingFaq.location}\n🏢 **Department:** ${matchingFaq.department}\n📧 **Contact:** ${matchingFaq.contactEmail}`
          : `At **${CAMPUS_NAME}**, we're here to assist you with every aspect of campus life!\n\nHere are some of the most common student inquiries you can ask me about:\n- 📚 **Academics:** Add/Drop deadlines, transcript requests, tutoring & writing center\n- 💰 **Financial Aid:** FAFSA status, scholarships, emergency relief grants\n- 🏢 **Housing & Dining:** Room swap forms, maintenance tickets, meal swipe plans\n- 🩺 **Health & CAPS:** Free mental health counseling, clinic walk-in hours\n- 🎭 **Activities & Rec:** Joining 140+ clubs, intramural sports, campus concert\n- 💻 **IT Support:** Eduroam Wi-Fi, free Adobe & Microsoft Office downloads\n- 🚌 **Transit & Safety:** Night shuttle tracker, SafeWalk 24/7 escorts`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        suggestedQuestions: [
          'How do I add or drop a class before the deadline?',
          'How do I connect to Eduroam Wi-Fi?',
          'Where can I use my EagleBucks and meal swipes?'
        ],
      };

      setMessages(prev => [...prev, botMsg]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleToggleBookmark = (messageId: string) => {
    setMessages(prev =>
      prev.map(m => (m.id === messageId ? { ...m, isBookmarked: !m.isBookmarked } : m))
    );
  };

  const handleSetFeedback = (messageId: string, feedback: 'helpful' | 'unhelpful') => {
    setMessages(prev =>
      prev.map(m => (m.id === messageId ? { ...m, feedback } : m))
    );
  };

  const handleResetChat = () => {
    if (confirm('Start a fresh conversation? Saved answers will remain in your cheat sheet.')) {
      setMessages([INITIAL_WELCOME_MESSAGE]);
      localStorage.removeItem('campuspulse_chat_history');
    }
  };

  const bookmarkedMessages = messages.filter(m => m.isBookmarked);

  return (
    <div className="min-h-screen flex flex-col bg-slate-100 text-slate-800">
      {/* Top Navigation */}
      <Header
        onOpenDirectory={() => setIsDirectoryOpen(true)}
        onOpenEvents={() => setIsEventsOpen(true)}
        onOpenBookmarks={() => setIsBookmarksOpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        onResetChat={handleResetChat}
        bookmarkCount={bookmarkedMessages.length}
      />

      {/* Quick Category and FAQ Filter Bar */}
      <QuickFaqBar
        selectedCategory={selectedCategory}
        onSelectCategory={cat => setSelectedCategory(cat)}
        faqs={PRESET_FAQS}
        onSelectQuestion={q => handleSendMessage(q)}
        searchQuery={searchFilter}
        onSearchChange={q => setSearchFilter(q)}
      />

      {/* Main Two-Column Campus Layout */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 flex flex-col lg:flex-row gap-6">
        {/* Left Column: Quick Campus Glance & Shortcuts (Desktop) */}
        <aside className="hidden lg:flex flex-col gap-4 w-80 flex-shrink-0">
          {/* Campus Services Quick Directory Card */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-slate-700" />
                <h3 className="font-bold text-slate-900 text-sm">Key Campus Offices</h3>
              </div>
              <button
                onClick={() => setIsDirectoryOpen(true)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
              >
                View All
              </button>
            </div>

            <div className="space-y-2.5">
              {CAMPUS_SERVICES.slice(0, 4).map(srv => (
                <div
                  key={srv.id}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-200/60"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-semibold text-slate-900 text-xs truncate max-w-[170px]">
                      {srv.name}
                    </span>
                    <button
                      onClick={() => handleSendMessage(`What are the hours and location for ${srv.name}?`)}
                      className="text-[11px] font-medium text-blue-600 hover:underline flex-shrink-0"
                    >
                      Ask Hours
                    </button>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                    <span>{srv.building}</span>
                    <span aria-hidden="true">·</span>
                    <span>{srv.hours.weekdays}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Upcoming Campus Events Mini Feed */}
          <div className="bg-white rounded-2xl border border-slate-200 p-4 shadow-xs">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-slate-700" />
                <h3 className="font-bold text-slate-900 text-sm">Upcoming Activities</h3>
              </div>
              <button
                onClick={() => setIsEventsOpen(true)}
                className="text-xs font-semibold text-blue-600 hover:text-blue-800 hover:underline"
              >
                Calendar
              </button>
            </div>

            <div className="space-y-2.5">
              {CAMPUS_EVENTS.slice(0, 3).map(evt => (
                <div
                  key={evt.id}
                  className="p-2.5 rounded-xl bg-slate-50 hover:bg-slate-100/80 transition-colors border border-slate-200/60"
                >
                  <div className="flex items-start justify-between gap-1">
                    <span className="font-semibold text-slate-900 text-xs line-clamp-1">
                      {evt.title}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 text-[11px] text-slate-500 mt-1">
                    <span className="font-medium text-slate-700">{evt.date.split(',')[0]}</span>
                    <span aria-hidden="true">·</span>
                    <span>{evt.time.split('–')[0]}</span>
                  </div>
                  <button
                    onClick={() => handleSendMessage(`Tell me all details about the ${evt.title} on campus.`)}
                    className="text-[11px] font-medium text-blue-600 hover:underline mt-1.5 inline-block"
                  >
                    Ask about event →
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Student Essentials Help Card */}
          <div className="bg-gradient-to-br from-slate-900 to-slate-800 text-white rounded-2xl p-4 shadow-sm">
            <div className="flex items-center gap-2 mb-1.5">
              <Sparkles className="w-4 h-4 text-amber-400" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-amber-400">
                Student Advisory Tips
              </h4>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              Need quick answers during exams or registration? You can pin important hours and contacts to your Cheat Sheet.
            </p>
            <div className="flex items-center justify-between text-xs pt-2 border-t border-slate-700/80">
              <span className="text-slate-400">Night Shuttle: 6pm–2:30am</span>
              <button
                onClick={() => handleSendMessage('What is the schedule and route for the campus night shuttle?')}
                className="text-amber-400 hover:text-amber-300 font-semibold"
              >
                Track Bus →
              </button>
            </div>
          </div>
        </aside>

        {/* Center / Main Conversation Area */}
        <section className="flex-1 flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xs overflow-hidden h-[calc(100vh-14rem)] sm:h-[calc(100vh-12.5rem)] min-h-[500px]">
          {/* Chat Messages Scroll Container */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-2">
            {messages.map(msg => (
              <ChatMessageBubble
                key={msg.id}
                message={msg}
                onSelectPrompt={p => handleSendMessage(p)}
                onToggleBookmark={id => handleToggleBookmark(id)}
                onSetFeedback={(id, fb) => handleSetFeedback(id, fb)}
              />
            ))}

            {/* Thinking / Searching Indicator */}
            {isLoading && (
              <div className="flex items-start gap-3 max-w-xl mr-auto mb-6">
                <div className="w-8 h-8 rounded-xl bg-amber-500 text-slate-950 flex items-center justify-center flex-shrink-0 shadow-sm animate-pulse">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <div className="bg-white border border-slate-200 rounded-2xl rounded-tl-sm px-4 py-3 shadow-xs">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"></div>
                    <div
                      className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"
                      style={{ animationDelay: '0.15s' }}
                    ></div>
                    <div
                      className="w-2 h-2 rounded-full bg-amber-500 animate-bounce"
                      style={{ animationDelay: '0.3s' }}
                    ></div>
                    <span className="text-xs text-slate-500 font-medium ml-1">
                      Checking university policies & campus directory...
                    </span>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input Box Footer */}
          <div className="p-3 sm:p-4 bg-slate-50/80 border-t border-slate-200">
            <form
              onSubmit={e => {
                e.preventDefault();
                handleSendMessage();
              }}
              className="flex items-center gap-2"
            >
              {/* Voice Input Button */}
              <button
                type="button"
                onClick={handleToggleVoice}
                className={`p-2.5 rounded-xl border transition-colors flex-shrink-0 ${
                  isRecording
                    ? 'bg-rose-500 text-white border-rose-600 animate-pulse'
                    : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-100 hover:text-slate-900'
                }`}
                title={isRecording ? 'Listening... click to stop' : 'Ask with voice'}
              >
                {isRecording ? <MicOff className="w-4 h-4" /> : <Mic className="w-4 h-4" />}
              </button>

              {/* Text Input */}
              <div className="relative flex-1">
                <input
                  ref={inputRef}
                  type="text"
                  value={inputQuery}
                  onChange={e => setInputQuery(e.target.value)}
                  placeholder={
                    isRecording
                      ? 'Listening to your question...'
                      : 'Ask about campus services, activities, deadlines, dining, or dorms...'
                  }
                  disabled={isLoading}
                  className="w-full px-4 py-2.5 text-sm bg-white border border-slate-200 rounded-xl text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-slate-900 focus:border-transparent transition-all disabled:opacity-50"
                />
              </div>

              {/* Send Button */}
              <button
                type="submit"
                disabled={!inputQuery.trim() || isLoading}
                className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 disabled:opacity-40 disabled:hover:bg-slate-900 text-white transition-colors flex-shrink-0 shadow-xs"
                title="Send question"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>

            <div className="flex items-center justify-between text-[11px] text-slate-400 mt-2 px-1">
              <span>Press Enter to send · Powered by official Summit University records</span>
              <span className="hidden sm:inline">24/7 Student Advisory</span>
            </div>
          </div>
        </section>
      </main>

      {/* Drawers and Modals */}
      <CampusDirectoryDrawer
        isOpen={isDirectoryOpen}
        onClose={() => setIsDirectoryOpen(false)}
        services={CAMPUS_SERVICES}
        onAskAboutService={name => handleSendMessage(`What are the services, hours, and location for ${name}?`)}
        onSelectQuestion={q => handleSendMessage(q)}
      />

      <ActivitiesDrawer
        isOpen={isEventsOpen}
        onClose={() => setIsEventsOpen(false)}
        events={CAMPUS_EVENTS}
        onAskAboutEvent={title => handleSendMessage(`Can you tell me all details about the upcoming campus event: "${title}"?`)}
      />

      <BookmarksDrawer
        isOpen={isBookmarksOpen}
        onClose={() => setIsBookmarksOpen(false)}
        bookmarkedMessages={bookmarkedMessages}
        onRemoveBookmark={id => handleToggleBookmark(id)}
        onClearAllBookmarks={() => {
          if (confirm('Clear all saved answers from your cheat sheet?')) {
            setMessages(prev => prev.map(m => ({ ...m, isBookmarked: false })));
          }
        }}
      />

      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
        onAskBot={q => handleSendMessage(q)}
      />
    </div>
  );
}
