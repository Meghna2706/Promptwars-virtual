'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { useEco } from '@/components/ClientLayout';
import { Bot, Send, User, Sparkles, Loader2, Trash2, ArrowRight, BookOpen, Route } from 'lucide-react';

interface Message {
  id: string;
  sender: 'user' | 'ai';
  text: string;
  timestamp: Date;
}

export default function CarbonAnalyzerPage() {
  const { user } = useEco();
  const searchParams = useSearchParams();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      sender: 'ai',
      text: `👋 Hello! I am your **EcoVerse AI Coach**. 
      
I can analyze your carbon footprint, construct a customized carbon-reduction roadmap, or answer any question about environmental sustainability.

**Try asking me:**
* *Is riding a bike better than public transport?*
* *How can I reduce my carbon footprint?*
* *How much CO2 does a flight produce?*`,
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  // Automatically trigger query if passed via URL (e.g. from Dashboard click)
  useEffect(() => {
    const queryParam = searchParams.get('q');
    if (queryParam) {
      triggerQuestion(queryParam);
    }
  }, [searchParams]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  const triggerQuestion = async (queryText: string) => {
    if (!queryText.trim() || loading) return;
    
    const userMsg: Message = {
      id: `msg-${Date.now()}-user`,
      sender: 'user',
      text: queryText,
      timestamp: new Date()
    };
    
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setLoading(true);

    try {
      // Map conversation history to api structure
      const history = messages
        .filter(m => m.id !== 'welcome')
        .map(m => ({
          sender: m.sender,
          text: m.text
        }));

      const res = await fetch('/api/gemini/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ query: queryText, history })
      });
      const data = await res.json();
      
      const aiMsg: Message = {
        id: `msg-${Date.now()}-ai`,
        sender: 'ai',
        text: data.response || 'Sorry, I encountered an issue processing that query.',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, aiMsg]);
    } catch (e) {
      console.error(e);
      setMessages(prev => [...prev, {
        id: `msg-${Date.now()}-err`,
        sender: 'ai',
        text: '⚠️ Network connection lost. Please verify your internet or try again.',
        timestamp: new Date()
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    triggerQuestion(input);
  };

  const clearChat = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: 'Chat history cleared. How can I help you improve your sustainability index today?',
        timestamp: new Date()
      }
    ]);
  };

  // Simple custom Markdown rendering to avoid layout shifts or packages issues
  const renderMarkdown = (text: string) => {
    return text.split('\n').map((line, idx) => {
      let content = line;
      let className = "text-xs md:text-sm leading-relaxed";

      // Headings
      if (content.startsWith('### ')) {
        return <h3 key={idx} className="text-sm font-bold text-neon-green mt-3 mb-1.5">{content.replace('### ', '')}</h3>;
      }
      if (content.startsWith('#### ')) {
        return <h4 key={idx} className="text-xs font-bold text-emerald-400 mt-2 mb-1">{content.replace('#### ', '')}</h4>;
      }
      if (content.startsWith('## ')) {
        return <h2 key={idx} className="text-base font-extrabold text-white mt-4 mb-2 border-b border-white/5 pb-1">{content.replace('## ', '')}</h2>;
      }

      // Bullet points
      if (content.trim().startsWith('* ')) {
        content = content.replace('* ', '');
        className = "text-xs md:text-sm text-foreground/80 pl-4 list-disc list-inside";
      }

      // Number list
      if (/^\d+\.\s/.test(content.trim())) {
        className = "text-xs md:text-sm text-foreground/80 pl-4 list-decimal list-inside";
      }

      // Bold replacements **text** -> strong
      const parts = content.split('**');
      const renderedParts = parts.map((part, pIdx) => {
        if (pIdx % 2 === 1) {
          return <strong key={pIdx} className="text-white font-semibold">{part}</strong>;
        }
        // Inline code blocks `code`
        const subParts = part.split('`');
        return subParts.map((subPart, sIdx) => {
          if (sIdx % 2 === 1) {
            return <code key={sIdx} className="bg-emerald-950/40 text-neon-green px-1 py-0.5 rounded font-mono text-xs">{subPart}</code>;
          }
          return subPart;
        });
      });

      return <p key={idx} className={className}>{renderedParts}</p>;
    });
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-8rem)]">
      {/* Sidebar - Coach Stats & Suggested Prompts */}
      <div className="lg:col-span-1 space-y-4 flex flex-col justify-between h-full">
        <div className="space-y-4">
          <div className="p-4 rounded-xl glass-panel space-y-3">
            <h2 className="font-bold text-white text-sm flex items-center gap-1.5">
              <Route size={16} className="text-neon-green" />
              <span>Simulated Twin State</span>
            </h2>
            {user && (
              <div className="space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-foreground/50">Carbon Score:</span>
                  <span className="font-bold text-neon-green">{user.carbonScore}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/50">Climate Age:</span>
                  <span className="font-bold text-white">{user.climateAge} yrs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-foreground/50">Emissions:</span>
                  <span className="font-bold text-white">{user.monthlyEmissions} kg CO2/mo</span>
                </div>
              </div>
            )}
          </div>

          <div className="p-4 rounded-xl glass-panel space-y-2.5">
            <h3 className="font-bold text-white text-xs uppercase tracking-wider">
              Quick Inquiries
            </h3>
            <div className="flex flex-col gap-1.5">
              {[
                "How can I reduce my carbon footprint?",
                "Is riding a bike better than public transport?",
                "How much CO2 does a flight produce?",
                "Suggest a 4-week green lifestyle plan"
              ].map(q => (
                <button
                  key={q}
                  onClick={() => triggerQuestion(q)}
                  className="p-2 text-[11px] rounded-lg bg-white/5 border border-white/5 hover:border-neon-green/20 hover:bg-neon-green/5 text-left text-foreground/70 hover:text-white transition-all flex items-center justify-between group"
                >
                  <span className="truncate pr-2">{q}</span>
                  <ArrowRight size={12} className="text-foreground/30 group-hover:text-neon-green shrink-0 transition-colors" />
                </button>
              ))}
            </div>
          </div>
        </div>

        <button
          onClick={clearChat}
          className="w-full py-2.5 rounded-xl border border-red-500/10 hover:border-red-500/30 bg-red-500/5 hover:bg-red-500/10 text-red-400 font-semibold text-xs transition-all flex items-center justify-center gap-1.5"
        >
          <Trash2 size={14} />
          <span>Clear Chat History</span>
        </button>
      </div>

      {/* Main Chat Terminal */}
      <div className="lg:col-span-3 rounded-2xl glass-panel flex flex-col justify-between overflow-hidden border border-white/10 shadow-2xl relative h-full">
        {/* Chat Terminal Header */}
        <div className="p-4 bg-emerald-950/30 border-b border-white/5 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-neon-green animate-ping" />
            <span className="text-xs font-mono font-bold text-neon-green tracking-widest uppercase">
              ECOVERSE_AI_COACH v1.0.5
            </span>
          </div>
          <span className="text-[10px] text-foreground/45 flex items-center gap-1">
            <BookOpen size={12} />
            <span>AI Environment Core</span>
          </span>
        </div>

        {/* Message Area */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4 min-h-0">
          {messages.map((msg) => {
            const isUser = msg.sender === 'user';
            return (
              <div 
                key={msg.id}
                className={`flex gap-3 max-w-[85%] ${isUser ? 'ml-auto flex-row-reverse' : ''}`}
              >
                {/* Avatar Icon */}
                <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center border ${
                  isUser 
                    ? 'bg-neon-green/10 border-neon-green/30 text-neon-green' 
                    : 'bg-emerald-950/30 border-white/10 text-white'
                }`}>
                  {isUser ? <User size={16} /> : <Bot size={16} />}
                </div>

                {/* Message Box */}
                <div className={`p-3.5 rounded-2xl space-y-1 ${
                  isUser 
                    ? 'bg-neon-green/10 text-white rounded-tr-none border border-neon-green/20' 
                    : 'bg-white/5 text-foreground/80 rounded-tl-none border border-white/5'
                }`}>
                  <div className="text-[10px] text-foreground/35 flex items-center gap-1">
                    <span>{isUser ? 'You' : 'Eco Coach'}</span>
                    <span>•</span>
                    <span>{msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                  </div>
                  <div className="space-y-1.5 mt-1">
                    {renderMarkdown(msg.text)}
                  </div>
                </div>
              </div>
            );
          })}

          {loading && (
            <div className="flex gap-3 max-w-[80%]">
              <div className="w-8 h-8 rounded-lg shrink-0 flex items-center justify-center bg-emerald-950/30 border border-white/10 text-neon-green">
                <Loader2 size={16} className="animate-spin" />
              </div>
              <div className="p-3 bg-white/5 border border-white/5 text-foreground/45 text-xs rounded-2xl rounded-tl-none flex items-center gap-2">
                <span>AI Coach is compiling recommendations...</span>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form 
          onSubmit={handleSend}
          className="p-3 border-t border-white/5 bg-emerald-950/10 flex items-center gap-2"
        >
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            disabled={loading}
            placeholder="Ask about carbon reduction, flight emissions, solar setups..."
            className="flex-1 bg-white/5 hover:bg-white/10 focus:bg-white/10 border border-white/5 focus:border-neon-green/50 text-xs md:text-sm text-white px-4 py-2.5 rounded-xl outline-none transition-all placeholder:text-foreground/30"
          />
          <button
            type="submit"
            disabled={loading || !input.trim()}
            className="p-2.5 rounded-xl bg-neon-green text-black hover:bg-neon-green/90 transition-all disabled:opacity-40 disabled:hover:bg-neon-green flex items-center justify-center shrink-0 shadow-[0_0_15px_rgba(0,255,157,0.15)]"
          >
            <Send size={16} />
          </button>
        </form>
      </div>
    </div>
  );
}
