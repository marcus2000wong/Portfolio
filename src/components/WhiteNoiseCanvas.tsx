import React, { useEffect, useRef } from 'react';

export const WhiteNoiseCanvas: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = Math.ceil(window.innerWidth));
    let height = (canvas.height = Math.ceil(window.innerHeight));

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = Math.ceil(window.innerWidth);
      height = canvas.height = Math.ceil(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    // Frame throttle for smooth ultra-fine noise (30 FPS)
    let lastTime = 0;
    const fps = 30;
    const interval = 1000 / fps;

    const renderNoise = (currentTime: number) => {
      animationFrameId = requestAnimationFrame(renderNoise);

      const delta = currentTime - lastTime;
      if (delta < interval) return;
      lastTime = currentTime - (delta % interval);

      const imgData = ctx.createImageData(width, height);
      const buffer32 = new Uint32Array(imgData.data.buffer);
      const len = buffer32.length;

      for (let i = 0; i < len; i++) {
        // Crisp fine film grain speckles
        const rand = Math.random();
        if (rand < 0.15) {
          const val = Math.floor(180 + Math.random() * 75);
          const alpha = Math.floor(90 + Math.random() * 120);
          buffer32[i] = (alpha << 24) | (val << 16) | (val << 8) | val;
        } else {
          buffer32[i] = 0x00000000;
        }
      }

      ctx.putImageData(imgData, 0, 0);
    };

    animationFrameId = requestAnimationFrame(renderNoise);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[90] overflow-hidden select-none">
      {/* 1. REAL-TIME FINE CANVAS NOISE GRAIN */}
      <canvas
        ref={canvasRef}
        className="w-full h-full opacity-15 mix-blend-screen"
      />

      {/* 2. SECONDARY TACTILE HIGH-FREQUENCY SVG NOISE MESH */}
      <div className="absolute inset-[-100%] w-[300%] h-[300%] opacity-12 mix-blend-overlay animate-noise">
        <svg className="w-full h-full">
          <filter id="globalWhiteNoiseFilter">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="1.8"
              numOctaves="2"
              stitchTiles="stitch"
            />
            <feColorMatrix type="saturate" values="0" />
          </filter>
          <rect width="100%" height="100%" filter="url(#globalWhiteNoiseFilter)" />
        </svg>
      </div>
    </div>
  );
};

