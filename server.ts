import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI } from '@google/genai';
import {
  CAMPUS_NAME,
  CAMPUS_SERVICES,
  CAMPUS_EVENTS,
  PRESET_FAQS,
  GROUNDING_SYSTEM_PROMPT,
} from './src/data/campusKnowledge.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const isProduction = process.env.NODE_ENV === 'production';
const PORT = Number(process.env.PORT) || 3000;

const app = express();
app.use(express.json());

// Initialize GoogleGenAI client with required User-Agent header
const apiKey = process.env.GEMINI_API_KEY;
let aiClient: GoogleGenAI | null = null;
if (apiKey) {
  aiClient = new GoogleGenAI({
    apiKey: apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Fallback matching logic if Gemini API key is missing or rate limited
function findFallbackAnswer(query: string): {
  text: string;
  category?: string;
  suggestedQuestions?: string[];
  relatedServices?: string[];
} {
  const q = query.toLowerCase();

  // Search in FAQs
  for (const faq of PRESET_FAQS) {
    const questionMatch = faq.question.toLowerCase().includes(q) || q.includes(faq.question.toLowerCase().slice(0, 15));
    const tagMatch = faq.tags.some(tag => q.includes(tag.toLowerCase()));
    if (questionMatch || tagMatch) {
      return {
        text: `**${faq.question}**\n\n${faq.detailedAnswer}\n\n📍 **Location:** ${faq.location}\n🏢 **Department:** ${faq.department}\n📧 **Contact:** ${faq.contactEmail}`,
        category: faq.category,
        suggestedQuestions: faq.tags.slice(0, 3).map(t => `Tell me more about ${t}`),
        relatedServices: [faq.department],
      };
    }
  }

  // Search in Services
  for (const service of CAMPUS_SERVICES) {
    if (q.includes(service.name.toLowerCase()) || q.includes(service.id) || service.popularQuestions.some(pq => q.includes(pq.toLowerCase().slice(0, 15)))) {
      return {
        text: `**${service.name} (${service.department})**\n\n${service.description}\n\n📍 **Location:** ${service.location} (${service.building} ${service.room || ''})\n⏰ **Hours:** Weekdays ${service.hours.weekdays} | Weekends ${service.hours.weekends}\n📞 **Phone:** ${service.contact.phone}\n📧 **Email:** ${service.contact.email}`,
        category: service.category,
        suggestedQuestions: service.popularQuestions.slice(0, 2),
        relatedServices: [service.name],
      };
    }
  }

  // Search in Events
  for (const event of CAMPUS_EVENTS) {
    if (q.includes(event.title.toLowerCase()) || event.tags.some(t => q.includes(t.toLowerCase()))) {
      return {
        text: `**Campus Event: ${event.title}**\n\n${event.description}\n\n📅 **Date & Time:** ${event.date} at ${event.time}\n📍 **Location:** ${event.location}\n👥 **Organizer:** ${event.organizer}`,
        category: 'activities',
        suggestedQuestions: ['Where is the main quad?', 'How do I join a student club?'],
        relatedServices: ['Office of Student Activities & Leadership'],
      };
    }
  }

  // General helpful fallback
  return {
    text: `At **${CAMPUS_NAME}**, we're here to assist you with every aspect of campus life!\n\nHere are some of the most common student inquiries you can ask me about:\n- 📚 **Academics:** Add/Drop deadlines, transcript requests, tutoring & writing center\n- 💰 **Financial Aid:** FAFSA status, scholarships, emergency relief grants\n- 🏢 **Housing & Dining:** Room swap forms, maintenance tickets, meal swipe plans\n- 🩺 **Health & CAPS:** Free mental health counseling, clinic walk-in hours\n- 🎭 **Activities & Rec:** Joining 140+ clubs, intramural sports, campus concert\n- 💻 **IT Support:** Eduroam Wi-Fi, free Adobe & Microsoft Office downloads\n- 🚌 **Transit & Safety:** Night shuttle tracker, SafeWalk 24/7 escorts\n\nFeel free to type any specific question or click one of the suggested topics!`,
    suggestedQuestions: [
      'How do I add or drop a class before the deadline?',
      'How do I connect to Eduroam Wi-Fi?',
      'How do I schedule a free CAPS counseling session?',
    ],
  };
}

// API Routes
app.get('/api/campus-data', (_req: Request, res: Response) => {
  res.json({
    campusName: CAMPUS_NAME,
    services: CAMPUS_SERVICES,
    events: CAMPUS_EVENTS,
    faqs: PRESET_FAQS,
  });
});

app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { messages, userQuestion } = req.body;

    const query = userQuestion || (Array.isArray(messages) && messages[messages.length - 1]?.text) || '';

    if (!query || typeof query !== 'string') {
      res.status(400).json({ error: 'A query or messages array is required.' });
      return;
    }

    if (!aiClient) {
      // Return grounded fallback answer
      const fallback = findFallbackAnswer(query);
      res.json({
        reply: fallback.text,
        category: fallback.category,
        suggestedQuestions: fallback.suggestedQuestions,
        relatedServices: fallback.relatedServices,
        source: 'knowledge-base',
      });
      return;
    }

    // Format contents for @google/genai
    const formattedContents = [];
    if (Array.isArray(messages)) {
      // Take last 8 messages for context
      const recent = messages.slice(-8);
      for (const m of recent) {
        if (m.sender === 'user') {
          formattedContents.push({
            role: 'user',
            parts: [{ text: m.text }],
          });
        } else if (m.sender === 'bot') {
          formattedContents.push({
            role: 'model',
            parts: [{ text: m.text }],
          });
        }
      }
    }

    if (formattedContents.length === 0 || formattedContents[formattedContents.length - 1].role !== 'user') {
      formattedContents.push({
        role: 'user',
        parts: [{ text: query }],
      });
    }

    const response = await aiClient.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction: GROUNDING_SYSTEM_PROMPT,
        temperature: 0.6,
      },
    });

    const replyText = response.text || '';

    // Extract suggested follow-ups if present
    const suggested: string[] = [];
    const followUpMatch = replyText.match(/Suggested Follow-ups?:([\s\S]*?)$/i);
    if (followUpMatch && followUpMatch[1]) {
      const lines = followUpMatch[1].split('\n');
      for (const line of lines) {
        const cleaned = line.replace(/^[\s\-*•\d\.\)]+/, '').trim();
        if (cleaned.length > 5 && cleaned.endsWith('?')) {
          suggested.push(cleaned);
        }
      }
    }

    // Clean reply text if needed
    let cleanReply = replyText;
    if (followUpMatch && followUpMatch.index !== undefined) {
      cleanReply = replyText.slice(0, followUpMatch.index).trim();
    }

    res.json({
      reply: cleanReply,
      suggestedQuestions: suggested.length > 0 ? suggested.slice(0, 3) : [
        'Where is this department located on campus?',
        'What are the operating hours today?',
        'Who can I email for further questions?'
      ],
      source: 'gemini-3.8-flash',
    });
  } catch (error: any) {
    console.error('Error generating AI response:', error);
    // Graceful fallback on API error
    const query = req.body.userQuestion || (Array.isArray(req.body.messages) && req.body.messages[req.body.messages.length - 1]?.text) || '';
    const fallback = findFallbackAnswer(query);
    res.json({
      reply: fallback.text,
      category: fallback.category,
      suggestedQuestions: fallback.suggestedQuestions,
      relatedServices: fallback.relatedServices,
      source: 'knowledge-base-fallback',
      warning: error?.message || 'Generated via offline campus directory',
    });
  }
});

// App server setup (dev vs production)
async function startServer() {
  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT} in ${isProduction ? 'production' : 'development'} mode`);
  });
}

startServer();
