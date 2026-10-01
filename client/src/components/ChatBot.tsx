import { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle } from 'lucide-react';
import { trpc } from '@/lib/trpc';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: 'Hi! I am the Nudge assistant. Ask me about services, pricing or how it works for tech and AI companies, or send Harrison a Nudge directly.',
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Simulate LLM response (replace with actual tRPC call)
      const response = await generateChatResponse(input, messages);

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Failed to get response:', error);
      const errorMessage: Message = {
        id: (Date.now() + 2).toString(),
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again or contact our team directly.',
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 p-4 rounded-full glass-panel text-accent hover:shadow-lg transition-all duration-300 z-40 animate-float"
          aria-label="Open chat"
        >
          <MessageCircle className="w-6 h-6" />
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-6 right-6 w-96 max-w-[calc(100vw-2rem)] h-[600px] max-h-[calc(100vh-8rem)] glass-panel flex flex-col z-50 animate-slide-in-up">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-accent/20">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 rounded-full bg-accent animate-pulse"></div>
              <h3 className="font-semibold text-foreground">Nudge Assistant</h3>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-accent/10 rounded-lg transition-colors"
              aria-label="Close chat"
            >
              <X className="w-5 h-5 text-foreground/60" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    message.role === 'user'
                      ? 'bg-accent text-accent-foreground'
                      : 'bg-accent/10 text-foreground border border-accent/20'
                  }`}
                >
                  <p className="text-sm">{message.content}</p>
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-accent/10 text-foreground border border-accent/20 px-4 py-2 rounded-lg">
                  <div className="flex gap-1">
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-accent rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <form onSubmit={handleSendMessage} className="p-4 border-t border-accent/20">
            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 rounded-lg bg-accent/5 border border-accent/20 text-foreground placeholder-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="p-2 rounded-lg bg-accent text-accent-foreground hover:shadow-lg transition-all disabled:opacity-50"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}

// Mock LLM response function (replace with actual tRPC call)
async function generateChatResponse(userMessage: string, previousMessages: Message[]): Promise<string> {
  const q = userMessage.toLowerCase();
  const has = (...w: string[]) => w.some((x) => q.includes(x));

  if (has('service', 'offer', 'what do you do'))
    return 'Harrison is a marketing partner for tech companies and AI startups. The work covers Strategy & Go-To-Market, Marketing Ops & Automation, Performance & Analytics, Brand & Content and Technical Fixes: 30 services in all, from CRM and lifecycle email to SEO, AI search and paid media. See the Services page for the full list.';
  if (has('pricing', 'cost', 'price', 'how much', 'rate'))
    return 'Work is priced hourly, as a fixed-price project, as a monthly retainer or as a fractional CMO. Every project is quoted up front, so you know the cost before you commit. The Pricing page has rates and example projects.';
  if (has('ai search', 'chatgpt', 'perplexity', 'geo'))
    return 'Harrison helps AI systems find, understand and cite your company through content, structured data and entity clarity. Nobody can guarantee a recommendation, but visibility can be improved and measured.';
  if (has('tracking', 'analytics', 'ga4', 'attribution'))
    return 'Tracking and attribution are a core specialty: GA4, GTM, Segment and CRM closed-loop reporting, so you can see which channels create pipeline and revenue.';
  if (has('crm', 'automation', 'hubspot', 'workflow'))
    return 'Harrison builds CRM, lead enrichment and scoring, lifecycle email and AI workflows inside your own accounts, documented so your team owns it.';
  if (has('seo', 'search', 'content'))
    return 'SEO for tech products covers docs, integration and comparison pages, technical and JavaScript SEO, plus the content that supports them.';
  if (has('who', 'industry', 'industries', 'saas', 'startup', 'hardware'))
    return 'Tech companies and AI startups, and everyone in that field: SaaS, developer tools, cybersecurity, fintech, healthtech, hardware, consumer tech and more.';
  if (has('contact', 'nudge', 'quote', 'start'))
    return 'The easiest way to start is the Send a Nudge page. Tell Harrison what you are building and what is stuck, and you will get a plan, a fixed price and a timeline within 24 hours.';
  if (has('how', 'process', 'work'))
    return 'You send a Nudge, Harrison scopes it and sends a fixed quote, you approve, and he builds it. There is no lock-in. The How I Work page walks through it.';
  if (has('help', 'question'))
    return 'I can tell you about services, pricing, the process, or who the work suits. Or send Harrison a Nudge to talk it through directly.';
  return 'Good question. For the detail on your situation, the best next step is to send Harrison a Nudge. He will reply within 24 hours.';
}
