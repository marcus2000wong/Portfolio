import { useEffect, useRef } from 'react';

const interactiveSelector = 'a, button, input, textarea, select, [role="button"], [data-cursor]';

/** A lightweight, high-contrast pointer with a softly delayed outer ring. */
export function FluidCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    if (!finePointer.matches) return;

    const cursor = cursorRef.current;
    const ring = ringRef.current;
    if (!cursor || !ring) return;

    let targetX = window.innerWidth / 2;
    let targetY = window.innerHeight / 2;
    let ringX = targetX;
    let ringY = targetY;
    let frame = 0;

    const render = () => {
      ringX += (targetX - ringX) * 0.16;
      ringY += (targetY - ringY) * 0.16;
      cursor.style.transform = `translate3d(${targetX}px, ${targetY}px, 0)`;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      frame = requestAnimationFrame(render);
    };

    const onPointerMove = (event: PointerEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
      cursor.dataset.visible = 'true';
      ring.dataset.visible = 'true';
      const interactive = (event.target as Element | null)?.closest(interactiveSelector);
      cursor.dataset.active = String(Boolean(interactive));
      ring.dataset.active = String(Boolean(interactive));
    };

    const hide = () => {
      cursor.dataset.visible = 'false';
      ring.dataset.visible = 'false';
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerleave', hide);
    frame = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', hide);
    };
  }, []);

  return (
    <>
      <div ref={ringRef} className="fluid-cursor-ring" data-visible="false" data-active="false" aria-hidden="true" />
      <div ref={cursorRef} className="fluid-cursor-dot" data-visible="false" data-active="false" aria-hidden="true" />
    </>
  );
}
