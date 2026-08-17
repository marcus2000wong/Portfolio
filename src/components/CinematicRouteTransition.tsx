import { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';

type TransitionPhase = 'entering' | 'idle' | 'leaving';

export function CinematicRouteTransition() {
  const [phase, setPhase] = useState<TransitionPhase>('entering');
  const destinationRef = useRef<string | null>(null);

  useEffect(() => {
    const introTimer = window.setTimeout(() => setPhase('idle'), 900);

    const handleClick = (event: MouseEvent) => {
      if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;

      const target = event.target as HTMLElement | null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href]');
      if (!anchor || anchor.hasAttribute('download') || anchor.target === '_blank') return;

      const url = new URL(anchor.href, window.location.href);
      if (url.origin !== window.location.origin || url.protocol === 'mailto:' || url.protocol === 'tel:') return;

      const sameDocument = url.pathname === window.location.pathname && url.search === window.location.search;
      if (sameDocument) return;

      event.preventDefault();
      destinationRef.current = url.href;
      setPhase('leaving');
    };

    document.addEventListener('click', handleClick, true);
    return () => {
      window.clearTimeout(introTimer);
      document.removeEventListener('click', handleClick, true);
    };
  }, []);

  useEffect(() => {
    if (phase !== 'leaving' || !destinationRef.current) return;
    const navigationTimer = window.setTimeout(() => {
      window.location.assign(destinationRef.current!);
    }, 760);
    return () => window.clearTimeout(navigationTimer);
  }, [phase]);

  const visible = phase !== 'idle';
  const entering = phase === 'entering';

  return (
    <div
      className={`fixed inset-0 z-[200] overflow-hidden ${phase === 'leaving' ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden="true"
    >
      <motion.div
        className="absolute inset-0 bg-[#050506]"
        initial={{ y: entering ? '0%' : '100%' }}
        animate={{ y: visible ? '0%' : '-100%' }}
        transition={{ duration: 0.78, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.div
        className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(90deg,rgba(0, 115, 255, 0.18),rgba(34,35,76,0.32),transparent)]"
        initial={{ x: entering ? '0%' : '-100%', opacity: 0.9 }}
        animate={{ x: visible ? '0%' : '100%', opacity: visible ? 0.9 : 0 }}
        transition={{ duration: 0.86, ease: [0.76, 0, 0.24, 1] }}
      />
      <motion.p
        className="absolute bottom-8 left-8 font-mono text-[9px] uppercase tracking-[0.24em] text-white/45"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : -8 }}
        transition={{ duration: 0.35 }}
      >
        Mainframe® / Marcus Wong
      </motion.p>
    </div>
  );
}
