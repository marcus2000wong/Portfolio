import { useEffect, useRef, useState } from 'react';
import type { FormEvent } from 'react';
import { ArrowUp, Bot, Cloud, Mail, MessageCircle, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

type Message = { role: 'user' | 'assistant'; content: string };

const starterQuestions = ['What does Marcus design?', 'Is Marcus available?', 'Show me selected work'];

export function CloudflareEdgeChat({ disabled = false }: { disabled?: boolean }) {
  const [open, setOpen] = useState(false);
  const [suppressHover, setSuppressHover] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Hi — I’m Marcus’s portfolio assistant. Ask me about his work, experience, or a potential project.' },
  ]);
  const [loading, setLoading] = useState(false);
  const [showDirectContact, setShowDirectContact] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (disabled) setOpen(false);
  }, [disabled]);

  useEffect(() => {
    if (!open) return;
    inputRef.current?.focus();
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [open]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, loading]);

  const send = async (content: string) => {
    const trimmed = content.trim();
    if (!trimmed || loading) return;

    const nextMessages: Message[] = [...messages, { role: 'user', content: trimmed }];
    setMessages(nextMessages);
    setInput('');
    setLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ messages: nextMessages.slice(-8) }),
      });
      const data = await response.json() as { reply?: string; error?: string };
      if (!response.ok || !data.reply) throw new Error(data.error || 'Chat request failed');
      setShowDirectContact(false);
      setMessages((current) => [...current, { role: 'assistant', content: data.reply! }]);
    } catch {
      setShowDirectContact(true);
      setMessages((current) => [...current, {
        role: 'assistant',
        content: 'Cloudflare AI is not active in this local preview, but you can contact Marcus directly below.',
      }]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (event: FormEvent) => {
    event.preventDefault();
    void send(input);
  };

  if (disabled) return null;

  return (
    <div className="fixed right-3 top-20 z-[220] sm:right-0 sm:top-[18vh]">
      <AnimatePresence>
        {open && (
          <motion.section
            initial={{ opacity: 0, y: 18, scale: 0.96, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: 12, scale: 0.97, filter: 'blur(8px)' }}
            transition={{ duration: 0.42, ease: [0.16, 1, 0.3, 1] }}
            className="absolute right-0 top-[52px] flex h-[min(460px,calc(100svh-9rem))] w-[min(280px,calc(100vw-1.5rem))] origin-top flex-col overflow-hidden border border-white/15 bg-black/70 text-white shadow-[0_28px_100px_rgba(0,0,0,0.78),inset_0_1px_0_rgba(255,255,255,0.055)] backdrop-blur-[24px] sm:right-0"
            aria-label="Marcus portfolio assistant"
          >
            <div ref={scrollRef} className="min-h-0 flex-1 space-y-4 overflow-y-auto px-4 py-5" aria-live="polite">
              {messages.map((message, index) => (
                <motion.div key={`${message.role}-${index}`} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className={`max-w-[88%] text-sm leading-6 ${message.role === 'user' ? 'ml-auto bg-white px-3.5 py-2.5 text-black' : 'text-white/65'}`}>
                  {message.content}
                </motion.div>
              ))}
              {showDirectContact && (
                <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid grid-cols-2 gap-2 pt-1">
                  <a
                    href="https://wa.me/85264296249?text=Hi%20Marcus%2C%20I%20found%20your%20portfolio%20and%20would%20like%20to%20discuss%20a%20project."
                    target="_blank"
                    rel="noreferrer"
                    className="flex min-h-11 items-center justify-center gap-2 bg-white px-3 font-mono text-[9px] uppercase tracking-[0.1em] text-black transition hover:bg-[#4D7CFF] hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D7CFF]"
                  >
                    <MessageCircle size={14} strokeWidth={1.6} /> WhatsApp
                  </a>
                  <a
                    href="mailto:marcus2000wong@yahoo.com?subject=Portfolio%20project%20enquiry"
                    className="flex min-h-11 items-center justify-center gap-2 bg-white/[0.08] px-3 font-mono text-[9px] uppercase tracking-[0.1em] text-white transition hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#4D7CFF]"
                  >
                    <Mail size={14} strokeWidth={1.6} /> Email
                  </a>
                </motion.div>
              )}
              {loading && <div className="flex gap-1.5 py-2" aria-label="Assistant is responding">{[0, 1, 2].map((dot) => <motion.span key={dot} className="h-1.5 w-1.5 rounded-full bg-white/45" animate={{ opacity: [0.25, 1, 0.25] }} transition={{ duration: 0.9, delay: dot * 0.14, repeat: Infinity }} />)}</div>}
            </div>

            {messages.length === 1 && (
              <div className="flex flex-wrap gap-1.5 border-t border-white/[0.07] px-4 py-3">
                {starterQuestions.map((question) => <button key={question} type="button" onClick={() => void send(question)} className="border border-white/12 px-2.5 py-1.5 text-left text-[10px] text-white/45 transition hover:border-white/35 hover:text-white">{question}</button>)}
              </div>
            )}

            <form onSubmit={handleSubmit} className="flex items-center gap-2 border-t border-white/10 p-3">
              <input ref={inputRef} value={input} onChange={(event) => setInput(event.target.value)} maxLength={800} placeholder="Ask about Marcus’s work…" className="min-w-0 flex-1 bg-white/[0.06] px-3.5 py-3 text-sm text-white outline-none placeholder:text-white/25 focus:bg-white/[0.09]" />
              <button type="submit" disabled={!input.trim() || loading} className="grid h-11 w-11 shrink-0 place-items-center bg-white text-black transition hover:bg-[#4D7CFF] hover:text-white disabled:cursor-not-allowed disabled:opacity-25" aria-label="Send message"><ArrowUp size={16} /></button>
            </form>
          </motion.section>
        )}
      </AnimatePresence>

      <motion.div
        onPointerLeave={() => setSuppressHover(false)}
        className={`group/chat flex h-[52px] max-w-[calc(100vw-1.5rem)] items-center overflow-hidden border border-r-0 text-white backdrop-blur-[24px] transition-[width,background-color,box-shadow,border-color] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] focus-within:w-[min(280px,calc(100vw-1.5rem))] focus-within:border-white/15 focus-within:border-r-0 focus-within:bg-black/70 ${open ? 'w-[min(280px,calc(100vw-1.5rem))] border-white/15 border-r-0 bg-black/70 shadow-[0_18px_55px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.055)]' : suppressHover ? 'w-[52px] border-white/45 border-r-0 bg-transparent' : 'w-[52px] border-white/45 border-r-0 bg-transparent hover:w-[min(280px,calc(100vw-1.5rem))] hover:border-white/15 hover:border-r-0 hover:bg-black/70 hover:shadow-[0_18px_55px_rgba(0,0,0,0.6),inset_0_1px_0_rgba(255,255,255,0.055)]'}`}
      >
        <button
          type="button"
          onClick={(event) => {
            if (open) {
              setSuppressHover(true);
              event.currentTarget.blur();
            }
            setOpen(!open);
          }}
          className="group flex h-full min-w-[52px] flex-1 items-center text-left transition-colors hover:bg-white/[0.07] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#4D7CFF]"
          aria-expanded={open}
        >
          <span className="relative ml-[9px] grid h-8 w-8 shrink-0 place-items-center bg-white text-black transition-transform duration-200 group-hover:scale-105">
            <Bot size={15} strokeWidth={1.6} />
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full border-2 border-[#080809] bg-[#4D7CFF]" />
          </span>
          <span className={`ml-2.5 min-w-0 whitespace-nowrap transition-opacity duration-150 group-hover/chat:opacity-100 ${open ? 'opacity-100' : 'opacity-0'}`}>
            <span className="block truncate font-heading text-[13px] font-medium">Portfolio assistant</span>
            <span className="mt-0.5 flex items-center gap-1.5 font-mono text-[8px] uppercase tracking-[0.13em] text-white/35">
              <Cloud size={10} /> Powered at the edge
            </span>
          </span>
        </button>
        <button type="button" onClick={(event) => {
          if (open) {
            setSuppressHover(true);
            event.currentTarget.blur();
          }
          setOpen(!open);
        }} className={`grid h-full shrink-0 place-items-center overflow-hidden text-white/50 transition-[width,opacity,background-color,color] hover:bg-white hover:text-black focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-inset focus-visible:ring-[#4D7CFF] group-hover/chat:w-9 group-hover/chat:opacity-100 ${open ? 'w-9 opacity-100' : 'w-0 opacity-0'}`} aria-label={open ? 'Collapse assistant' : 'Expand assistant'}>
          <motion.span animate={{ rotate: open ? 0 : 45 }} transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}><X size={16} strokeWidth={1.5} /></motion.span>
        </button>
      </motion.div>
    </div>
  );
}
