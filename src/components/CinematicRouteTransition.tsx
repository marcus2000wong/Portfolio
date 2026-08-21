import { useEffect, useMemo, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

type TransitionPhase = 'entering' | 'idle' | 'leaving';

const routeDetails = (pathname: string) => pathname === '/projects'
  ? { index: '02', name: 'Selected Work', short: 'Projects' }
  : { index: '01', name: 'Creative Portfolio', short: 'Home' };

interface CinematicRouteTransitionProps {
  onNavigate: (url: URL) => void;
}

export function CinematicRouteTransition({ onNavigate }: CinematicRouteTransitionProps) {
  const reduceMotion = useReducedMotion();
  const [phase, setPhase] = useState<TransitionPhase>('entering');
  const [progress, setProgress] = useState(0);
  const [destinationPath, setDestinationPath] = useState(window.location.pathname);
  const destinationRef = useRef<string | null>(null);
  const details = useMemo(() => routeDetails(destinationPath), [destinationPath]);

  useEffect(() => {
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
      setDestinationPath(url.pathname);
      document.querySelectorAll('video').forEach((video) => video.pause());
      window.dispatchEvent(new Event('portfolio:route-leaving'));
      setPhase('leaving');
    };

    document.addEventListener('click', handleClick, true);
    return () => document.removeEventListener('click', handleClick, true);
  }, []);

  useEffect(() => {
    if (phase !== 'entering') return;
    if (reduceMotion) setProgress(100);
    else setProgress(0);
    const startedAt = performance.now();
    const progressTimer = reduceMotion ? 0 : window.setInterval(() => {
      const elapsed = performance.now() - startedAt;
      const normalized = Math.min(1, elapsed / 760);
      const eased = 1 - Math.pow(1 - normalized, 3);
      setProgress(Math.round(eased * 100));
    }, 32);
    const introTimer = window.setTimeout(() => setPhase('idle'), reduceMotion ? 140 : 940);
    return () => {
      window.clearTimeout(introTimer);
      if (progressTimer) window.clearInterval(progressTimer);
    };
  }, [phase, reduceMotion]);

  useEffect(() => {
    if (phase !== 'leaving' || !destinationRef.current) return;
    const navigationTimer = window.setTimeout(() => {
      const url = new URL(destinationRef.current!);
      window.history.pushState({}, '', url);
      onNavigate(url);
      destinationRef.current = null;
      setPhase('entering');
    }, reduceMotion ? 140 : 720);
    return () => window.clearTimeout(navigationTimer);
  }, [onNavigate, phase, reduceMotion]);

  const visible = phase !== 'idle';
  const entering = phase === 'entering';
  const panelEase = [0.76, 0, 0.24, 1] as const;

  const transitionCopy = () => (
    <div className="relative flex h-full w-full flex-col justify-between px-6 py-7 sm:px-10 sm:py-9 lg:px-14 lg:py-11">
      <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 font-heading text-[clamp(9rem,24vw,24rem)] font-medium leading-none tracking-[-0.08em] text-white/[0.025] sm:right-8">
        {String(progress).padStart(3, '0')}
      </span>
      <div className="flex items-center justify-between font-mono text-[9px] uppercase tracking-[0.24em] text-white/45 sm:text-[10px]">
        <span>Mainframe® / Marcus Wong</span>
        <span>{entering ? 'Loading' : 'Entering'} / {details.index} / {String(progress).padStart(3, '0')}%</span>
      </div>

      <div className="overflow-hidden py-3">
        <motion.div
          className="transform-gpu will-change-transform"
          initial={false}
          animate={{ y: '0%' }}
          transition={{
            duration: reduceMotion ? 0.12 : 0.42,
            delay: reduceMotion ? 0 : 0.08,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <p className="mb-3 font-mono text-[9px] uppercase tracking-[0.32em] text-[#7094ff] sm:text-[10px]">
            {details.index} — {details.short}
          </p>
          <p className="max-w-[12ch] font-heading text-[clamp(3.25rem,10vw,9.5rem)] font-medium leading-[0.78] tracking-[-0.075em] text-white">
            {details.name}
          </p>
        </motion.div>
      </div>

      <div className="flex items-end justify-between gap-8">
        <div className="h-px flex-1 overflow-hidden bg-white/15">
          <motion.div
            className="h-full origin-left bg-white"
            initial={false}
            animate={{ scaleX: visible ? progress / 100 : 1, opacity: visible ? 1 : 0 }}
            transition={{ duration: reduceMotion ? 0.1 : 0.16, ease: 'linear' }}
          />
        </div>
        <span className="font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">HK · 2026</span>
      </div>
    </div>
  );

  return (
    <div
      className={`fixed inset-0 z-[300] overflow-hidden ${phase === 'leaving' ? 'pointer-events-auto' : 'pointer-events-none'}`}
      aria-hidden="true"
    >
      <div className="absolute inset-0 flex">
        {Array.from({ length: 5 }, (_, index) => (
          <motion.div
            key={index}
            className="relative h-full flex-1 transform-gpu border-r border-white/[0.055] bg-[#050506] will-change-transform last:border-r-0"
            initial={{ y: entering ? '0%' : '105%' }}
            animate={{ y: visible ? '0%' : '-105%' }}
            transition={{
              duration: reduceMotion ? 0.12 : 0.58,
              delay: reduceMotion ? 0 : entering ? index * 0.035 : index * 0.04,
              ease: panelEase,
            }}
          />
        ))}
      </div>

      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 5 }, (_, index) => (
          <motion.div
            key={`copy-mask-${index}`}
            className="absolute inset-0 transform-gpu will-change-transform"
            style={{ clipPath: `inset(0 ${80 - index * 20}% 0 ${index * 20}%)` }}
            initial={{ y: entering ? '0%' : '105%' }}
            animate={{ y: visible ? '0%' : '-105%', opacity: visible ? 1 : 0 }}
            transition={{
              y: {
                duration: reduceMotion ? 0.12 : 0.58,
                delay: reduceMotion ? 0 : entering ? index * 0.035 : index * 0.04,
                ease: panelEase,
              },
              opacity: {
                duration: reduceMotion ? 0.1 : visible ? 0.24 : 0.68,
                delay: reduceMotion ? 0 : visible ? 0.06 : 0.08,
                ease: [0.16, 1, 0.3, 1],
              },
            }}
          >
            {transitionCopy()}
          </motion.div>
        ))}
      </div>
    </div>
  );
}
