import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'motion/react';

export function AwardCursor() {
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const smoothX = useSpring(x, { stiffness: 720, damping: 42, mass: 0.18 });
  const smoothY = useSpring(y, { stiffness: 720, damping: 42, mass: 0.18 });
  const [visible, setVisible] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [label, setLabel] = useState('');
  const forcedZoneRef = useRef<string | null>(null);
  const galleryCardHoverRef = useRef(false);
  const scrollMode = label === 'Scroll down';

  useEffect(() => {
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    document.documentElement.classList.add('award-cursor-enabled');

    const handleCursorZone = (event: Event) => {
      const detail = (event as CustomEvent<{ active: boolean; label?: string }>).detail;
      forcedZoneRef.current = detail.active ? detail.label || 'View' : null;
      if (forcedZoneRef.current) {
        setVisible(true);
        setInteractive(true);
        setLabel(forcedZoneRef.current);
      }
    };

    const handleGalleryCardHover = (event: Event) => {
      const hovered = (event as CustomEvent<{ hovered: boolean }>).detail.hovered;
      galleryCardHoverRef.current = hovered;
      if (hovered) setVisible(false);
    };

    const handlePointerMove = (event: PointerEvent) => {
      x.set(event.clientX);
      y.set(event.clientY);

      const target = event.target as HTMLElement | null;
      if (galleryCardHoverRef.current) {
        setVisible(false);
        return;
      }

      if (target?.closest('[data-cursor-passive]')) {
        setVisible(true);
        setInteractive(false);
        setLabel('');
        return;
      }

      if (forcedZoneRef.current) {
        setVisible(true);
        setInteractive(true);
        setLabel(forcedZoneRef.current);
        return;
      }

      const action = target?.closest<HTMLElement>('a, button, [role="button"], [data-cursor-label]');
      setVisible(true);
      setInteractive(Boolean(action));

      if (!action) {
        setLabel('');
      } else if (action.dataset.cursorLabel) {
        setLabel(action.dataset.cursorLabel);
      } else if (action.getAttribute('aria-label')?.toLowerCase().includes('close')) {
        setLabel('Close');
      } else if (action instanceof HTMLAnchorElement && action.target === '_blank') {
        setLabel('Visit');
      } else {
        setLabel('View');
      }
    };

    const handlePointerLeave = () => setVisible(false);
    const handlePointerEnter = () => setVisible(true);
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('portfolio:cursor-zone', handleCursorZone);
    window.addEventListener('portfolio:gallery-card-hover', handleGalleryCardHover);
    document.documentElement.addEventListener('mouseleave', handlePointerLeave);
    document.documentElement.addEventListener('mouseenter', handlePointerEnter);

    return () => {
      document.documentElement.classList.remove('award-cursor-enabled');
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('portfolio:cursor-zone', handleCursorZone);
      window.removeEventListener('portfolio:gallery-card-hover', handleGalleryCardHover);
      document.documentElement.removeEventListener('mouseleave', handlePointerLeave);
      document.documentElement.removeEventListener('mouseenter', handlePointerEnter);
    };
  }, [x, y]);

  return (
    <motion.div
      className={`pointer-events-none fixed left-0 top-0 z-[290] hidden items-center justify-center uppercase text-white md:flex ${scrollMode ? 'font-heading text-sm font-bold tracking-[-0.02em]' : 'rounded-full border font-mono text-[8px] tracking-[0.14em] backdrop-blur-md'}`}
      style={{ x: smoothX, y: smoothY, translateX: '-50%', translateY: '-50%' }}
      animate={{
        width: scrollMode ? 176 : interactive ? 64 : 18,
        height: scrollMode ? 48 : interactive ? 64 : 18,
        opacity: visible ? 1 : 0,
        scale: visible ? 1 : 0.35,
        color: scrollMode ? '#ffffff' : '#ffffff',
        borderColor: scrollMode ? 'rgba(0,0,0,0)' : 'rgba(255,255,255,0.72)',
        backgroundColor: scrollMode ? 'rgba(0,0,0,0)' : interactive ? 'rgba(3,3,4,0.92)' : 'rgba(0,0,0,0.28)',
        boxShadow: scrollMode ? '0 0 0 rgba(0,0,0,0)' : interactive ? '0 14px 44px rgba(0,0,0,0.55), inset 0 0 18px rgba(255,255,255,0.04)' : '0 0 18px rgba(255,255,255,0.08)',
      }}
      transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
      aria-hidden="true"
    >
      {scrollMode ? (
        <motion.div
          className="relative flex items-center gap-3.5 whitespace-nowrap drop-shadow-[0_3px_12px_rgba(0,0,0,0.9)]"
          initial={false}
          animate={{ opacity: interactive ? 1 : 0, scale: interactive ? 1 : 0.72 }}
          transition={{ duration: 0.36, ease: [0.16, 1, 0.3, 1] }}
        >
          <span className="relative h-9 w-5 overflow-hidden" aria-hidden="true">
            <motion.span
              className="absolute inset-x-0 flex justify-center text-lg font-light leading-none text-white"
              animate={{ y: [-18, 10, 28], opacity: [0, 1, 0] }}
              transition={{ duration: 1.35, repeat: Infinity, times: [0, 0.45, 1], ease: [0.45, 0, 0.55, 1] }}
            >
              ↓
            </motion.span>
            <motion.span
              className="absolute inset-x-0 flex justify-center text-lg font-light leading-none text-white/45"
              animate={{ y: [-18, 10, 28], opacity: [0, 0.75, 0] }}
              transition={{ duration: 1.35, delay: 0.67, repeat: Infinity, times: [0, 0.45, 1], ease: [0.45, 0, 0.55, 1] }}
            >
              ↓
            </motion.span>
          </span>

          <span className="relative overflow-hidden text-[15px] normal-case tracking-[-0.025em]">
            <motion.span
              className="block"
              initial={false}
              animate={{ y: interactive ? 0 : 18, filter: interactive ? 'blur(0px)' : 'blur(5px)' }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            >
              Scroll down
            </motion.span>
          </span>
        </motion.div>
      ) : (
        <motion.span animate={{ opacity: interactive ? 1 : 0, scale: interactive ? 1 : 0.6 }}>
          {label}
        </motion.span>
      )}
      <motion.span
        className="absolute inset-[-1px] rounded-full border border-white/65"
        animate={{ scale: interactive && !scrollMode ? [0.9, 1.72] : 1, opacity: interactive && !scrollMode ? [0.65, 0] : 0 }}
        transition={{ duration: 1.45, repeat: interactive && !scrollMode ? Infinity : 0, ease: [0.16, 1, 0.3, 1] }}
      />
      <motion.span
        className="absolute inset-[-1px] rounded-full border border-white/35"
        animate={{ scale: interactive && !scrollMode ? [0.9, 1.72] : 1, opacity: interactive && !scrollMode ? [0.5, 0] : 0 }}
        transition={{ duration: 1.45, delay: 0.72, repeat: interactive && !scrollMode ? Infinity : 0, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}
