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
      content: 'Hi there! I am Nudge, your digital marketing assistant. How can I help you today? I can answer questions about our services, pricing, or help you find the right solution for your business.',
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
  const lowerMessage = userMessage.toLowerCase();

  // Service-related queries
  if (lowerMessage.includes('service') || lowerMessage.includes('what do you offer')) {
    return 'We offer five main service pillars: Strategic Advisory & Audits, Marketing Operations & Automation, Performance Marketing & Analytics, Brand & Content Enablement, and Technical Fixes & Optimization. Which area interests you most?';
  }

  if (lowerMessage.includes('pricing') || lowerMessage.includes('cost') || lowerMessage.includes('price')) {
    return 'We have three pricing packages: Diagnostic Audit & Growth Blueprint ($3,500–$7,500), Strategic Implementer Retainer ($4,000–$10,000+/month), and Technical Sprint & Project Execution ($5,000–$20,000+). Would you like to learn more about any of these?';
  }

  if (lowerMessage.includes('tracking') || lowerMessage.includes('analytics') || lowerMessage.includes('ga4')) {
    return 'Advanced tracking and analytics is one of our specialties. We help fix broken tracking, implement GA4 properly, set up server-side tagging, and ensure accurate attribution. This is crucial for making data-driven decisions.';
  }

  if (lowerMessage.includes('crm') || lowerMessage.includes('automation')) {
    return 'We specialize in CRM implementation, optimization, and marketing automation. We can help you set up workflows, integrate your tools, and ensure your data flows correctly across your entire marketing stack.';
  }

  if (lowerMessage.includes('contact') || lowerMessage.includes('nudge')) {
    return 'You can send us a nudge by filling out our contact form on the Send a Nudge page. We typically respond within 24 hours to discuss your specific needs and create a custom proposal.';
  }

  if (lowerMessage.includes('how') || lowerMessage.includes('process') || lowerMessage.includes('work')) {
    return 'Our process is simple: First, you search for what you need. Second, you send us a brief nudge with details. Third, we research and reverse brief to ensure we understand your goals. Finally, we get to work and deliver results.';
  }

  if (lowerMessage.includes('seo') || lowerMessage.includes('search')) {
    return 'Technical SEO is one of our core competencies. We conduct comprehensive audits, fix technical issues, optimize site structure, and implement proper tracking to improve your search visibility and organic traffic.';
  }

  if (lowerMessage.includes('help') || lowerMessage.includes('question')) {
    return 'I can help you with information about our services, pricing, process, and how to get started. Feel free to ask me anything about digital marketing, or you can send us a nudge to speak with our team directly.';
  }

  // Default response
  return 'That is a great question! For more detailed information or to discuss your specific situation, I recommend sending us a nudge. Our team would love to chat with you about how we can help.';
}
