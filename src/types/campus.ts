export type ServiceCategory =
  | 'academic'
  | 'financial'
  | 'housing'
  | 'dining'
  | 'health'
  | 'activities'
  | 'tech'
  | 'transit'
  | 'career'
  | 'safety';

export interface CampusService {
  id: string;
  name: string;
  department: string;
  category: ServiceCategory;
  location: string;
  building: string;
  room?: string;
  hours: {
    weekdays: string;
    weekends: string;
    notes?: string;
  };
  contact: {
    phone: string;
    email: string;
    website?: string;
  };
  description: string;
  quickActions: string[];
  popularQuestions: string[];
}

export interface CampusEvent {
  id: string;
  title: string;
  category: 'social' | 'academic' | 'wellness' | 'sports' | 'career';
  date: string;
  time: string;
  location: string;
  organizer: string;
  description: string;
  tags: string[];
  isFeatured?: boolean;
}

export interface FAQItem {
  id: string;
  category: ServiceCategory;
  question: string;
  shortAnswer: string;
  detailedAnswer: string;
  department: string;
  location: string;
  contactEmail: string;
  actionUrl?: string;
  actionLabel?: string;
  tags: string[];
  relatedQuestionIds?: string[];
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  category?: ServiceCategory;
  relatedServices?: string[];
  suggestedQuestions?: string[];
  isBookmarked?: boolean;
  feedback?: 'helpful' | 'unhelpful';
}
