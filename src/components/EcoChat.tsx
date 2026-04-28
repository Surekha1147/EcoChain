import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, Send, X, Bot, User, Loader2 } from 'lucide-react';
import { ecoChat } from '../services/gemini';
import { GlassCard } from './UI';

export default function EcoChat() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: 'user' | 'bot', content: string }[]>([
    { role: 'bot', content: 'Hi! I am EcoBot. How can I help you save the planet today?' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      const response = await ecoChat(userMsg, messages.map(m => ({ role: m.role, content: m.content })));
      setMessages(prev => [...prev, { role: 'bot', content: response }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: 'bot', content: 'Sorry, I am having trouble connecting. Try again soon!' }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="absolute bottom-20 right-0 w-[350px] md:w-[400px] h-[500px] flex flex-col shadow-2xl"
          >
            <GlassCard className="p-0 flex flex-col h-full border-emerald-500/30 overflow-hidden bg-zinc-950/90 shadow-emerald-500/10">
              <div className="bg-emerald-600 p-4 flex items-center justify-between text-white">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-white/20 rounded-lg flex items-center justify-center">
                    <Bot size={20} />
                  </div>
                  <div>
                    <div className="font-bold text-sm">EcoBot Assistant</div>
                    <div className="text-[10px] opacity-80 uppercase tracking-widest font-black">AI Sustainability Guide</div>
                  </div>
                </div>
                <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-1 rounded-lg">
                  <X size={20} />
                </button>
              </div>

              <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide">
                {messages.map((m, i) => (
                  <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-[80%] p-3 rounded-2xl text-sm ${
                      m.role === 'user' ? 'bg-emerald-600 text-white' : 'bg-zinc-900 text-zinc-300 border border-zinc-800'
                    }`}>
                      {m.content}
                    </div>
                  </div>
                ))}
                {loading && (
                  <div className="flex justify-start">
                    <div className="bg-zinc-900 p-3 rounded-2xl flex items-center gap-2 text-zinc-500">
                      <Loader2 size={16} className="animate-spin" />
                      <span className="text-xs font-bold uppercase tracking-widest">Thinking...</span>
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-zinc-900 bg-zinc-950">
                <div className="relative">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask anything about recycling..."
                    className="w-full bg-zinc-900 border border-zinc-800 rounded-xl py-3 pl-4 pr-12 text-sm text-zinc-300 focus:outline-none focus:border-emerald-500/50 transition-all"
                  />
                  <button 
                    onClick={handleSend}
                    className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-emerald-500 hover:text-emerald-400 transition-colors"
                  >
                    <Send size={20} />
                  </button>
                </div>
              </div>
            </GlassCard>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-14 h-14 bg-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-2xl shadow-emerald-500/40 relative group"
      >
        <MessageSquare size={24} />
        <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full border-2 border-zinc-950 animate-pulse" />
        <div className="absolute right-full mr-4 bg-zinc-900 text-white px-3 py-1.5 rounded-lg text-xs font-bold whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none uppercase tracking-widest border border-zinc-800">
          Chat with AI
        </div>
      </motion.button>
    </div>
  );
}
