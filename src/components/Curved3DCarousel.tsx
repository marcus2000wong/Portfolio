import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Project } from '../types';

interface Curved3DCarouselProps {
  projects: Project[];
  onSelectProject: (project: Project) => void;
}

export const Curved3DCarousel: React.FC<Curved3DCarouselProps> = ({
  projects,
  onSelectProject,
}) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isHalftone, setIsHalftone] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const startXRef = useRef<number>(0);
  const dragDistanceRef = useRef<number>(0);

  // Keep active index in bounds if projects list changes
  useEffect(() => {
    if (activeIndex >= projects.length) {
      setActiveIndex(Math.max(0, projects.length - 1));
    }
  }, [projects, activeIndex]);

  if (projects.length === 0) {
    return null;
  }

  const handleNext = () => {
    setActiveIndex((prev) => (prev + 1) % projects.length);
  };

  const handlePrev = () => {
    setActiveIndex((prev) => (prev - 1 + projects.length) % projects.length);
  };

  // Drag logic
  const handlePointerDown = (e: React.PointerEvent) => {
    setIsDragging(true);
    startXRef.current = e.clientX;
    dragDistanceRef.current = 0;
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - startXRef.current;
    dragDistanceRef.current = delta;
  };

  const handlePointerUp = () => {
    if (!isDragging) return;
    setIsDragging(false);

    if (dragDistanceRef.current < -40) {
      handleNext();
    } else if (dragDistanceRef.current > 40) {
      handlePrev();
    }
  };

  // Cylindrical Arc Configuration
  // Each card is placed along an arc of a 3D cylinder
  const radius = 620; // Radius in pixels
  const angleStep = 0; // Degrees between adjacent cards

  return (
    <div className="relative w-full py-10 overflow-hidden select-none">
      
      {/* BACKGROUND AMBIENT SPOTLIGHTS */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[650px] h-[350px] bg-gradient-to-r from-orange-600/10 via-amber-500/15 to-emerald-500/10 rounded-full blur-[120px] pointer-events-none" />

      {/* TOP CAROUSEL CONTROLS & HUD */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8 px-2">
        <div className="flex items-center gap-3">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-wider">
            3D Cylindrical View
          </span>
          <div className="h-3 w-[1px] bg-zinc-800" />
          <span className="text-xs font-mono text-amber-400">
            {activeIndex + 1} / {projects.length}
          </span>
        </div>

        {/* Controls: Halftone Toggle & Nav Arrows */}
        <div className="flex items-center gap-3">
          {/* Halftone / Dither Style Toggle */}
          <button
            onClick={() => setIsHalftone(!isHalftone)}
            className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-mono transition-all cursor-pointer ${
              isHalftone
                ? 'bg-white/[0.12] text-white shadow-[0_0_12px_rgba(255,255,255,0.08)]'
                : 'bg-white/[0.04] text-zinc-400 hover:text-white'
            }`}
          >
            <span className="text-[10px]">░▒▓</span>
            <span>Halftone Filter {isHalftone ? 'ON' : 'OFF'}</span>
          </button>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handlePrev}
              className="flex h-9 w-9 items-center justify-center bg-white/[0.04] text-zinc-300 transition-all hover:scale-105 hover:bg-white/[0.1] hover:text-white active:scale-95 cursor-pointer"
              aria-label="Previous project"
            >
              ←
            </button>
            <button
              onClick={handleNext}
              className="flex h-9 w-9 items-center justify-center bg-white/[0.04] text-zinc-300 transition-all hover:scale-105 hover:bg-white/[0.1] hover:text-white active:scale-95 cursor-pointer"
              aria-label="Next project"
            >
              →
            </button>
          </div>
        </div>
      </div>

      {/* 3D CYLINDRICAL CAROUSEL CONTAINER */}
      <div
        className="relative w-full h-[460px] sm:h-[500px] md:h-[540px] flex items-center justify-center cursor-grab active:cursor-grabbing"
        style={{ perspective: '1200px' }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
      >
        <div
          className="relative w-full h-full flex items-center justify-center"
          style={{ transformStyle: 'preserve-3d' }}
        >
          {projects.map((project, idx) => {
            // Offset relative to current active index
            const offset = idx - activeIndex;
            
            // Normalize offset for circular looping display if needed
            const angle = offset * angleStep;
            
            // Only render cards within a reasonable angle range (-90 to +90 deg)
            if (Math.abs(angle) > 100) return null;

            const isCurrent = idx === activeIndex;
            const absOffset = Math.abs(offset);

            // Calculate 3D transforms for cylindrical curve
            // X-position along cylinder arc
            const translateX = Math.sin((angle * Math.PI) / 180) * radius;
            // Z-depth inward on cylinder curve
            const translateZ = (Math.cos((angle * Math.PI) / 180) - 1) * radius - (isCurrent ? 0 : 40);
            // Rotate Y to face camera along cylinder normal
            const rotateY = -angle;

            // Scale & Opacity falloff
            const scale = Math.max(0.65, 1 - absOffset * 0.12);
            const opacity = Math.max(0.15, 1 - absOffset * 0.25);

            return (
              <motion.div
                key={project.id}
                onClick={(e) => {
                  if (Math.abs(dragDistanceRef.current) > 10) return; // Prevent click on drag
                  if (isCurrent) {
                    onSelectProject(project);
                  } else {
                    setActiveIndex(idx);
                  }
                }}
                initial={false}
                animate={{
                  x: translateX,
                  z: translateZ,
                  rotateY: rotateY,
                  scale: scale,
                  opacity: opacity,
                }}
                transition={{
                  type: 'spring',
                  stiffness: 180,
                  damping: 24,
                  mass: 0.8,
                }}
                style={{
                  transformStyle: 'preserve-3d',
                  zIndex: 100 - absOffset * 10,
                }}
                className={`group absolute h-[380px] w-[260px] cursor-pointer overflow-hidden shadow-2xl transition-all duration-300 sm:h-[420px] sm:w-[310px] md:w-[340px] ${
                  isCurrent
                    ? 'bg-zinc-900 shadow-[0_20px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(255,255,255,0.08)]'
                    : 'bg-zinc-950/80'
                }`}
              >
                {/* PROJECT IMAGE WITH OPTIONAL HALFTONE EFFECT */}
                <div className="relative w-full h-[65%] overflow-hidden bg-black">
                  <img
                    src={project.image}
                    alt={project.title}
                    referrerPolicy="no-referrer"
                    className={`w-full h-full object-cover transition-all duration-500 group-hover:scale-105 ${
                      isHalftone
                        ? 'contrast-150 grayscale filter mix-blend-luminosity'
                        : 'opacity-90 group-hover:opacity-100'
                    }`}
                  />

                  {/* HALFTONE DITHER PATTERN OVERLAY */}
                  {isHalftone && (
                    <div
                      className="absolute inset-0 pointer-events-none opacity-40 mix-blend-multiply"
                      style={{
                        backgroundImage:
                          'radial-gradient(#000 25%, transparent 26%), radial-gradient(#000 25%, transparent 26%)',
                        backgroundPosition: '0 0, 3px 3px',
                        backgroundSize: '6px 6px',
                      }}
                    />
                  )}

                  {/* Dark Vignette Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/30 to-transparent" />

                  {/* Top Badges */}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-center z-10">
                    <span className="bg-black/80 px-2.5 py-1 font-mono text-[10px] text-white/80 backdrop-blur-md">
                      {project.category}
                    </span>
                    <span className="bg-black/80 px-2 py-1 font-mono text-[10px] text-zinc-300 backdrop-blur-md">
                      {project.year}
                    </span>
                  </div>
                </div>

                {/* CARD CONTENT */}
                <div className="flex h-[35%] flex-col justify-between bg-zinc-950 p-5 text-left">
                  <div>
                    {project.client && (
                      <span className="mb-1 block font-mono text-[10px] uppercase tracking-wider text-white/45">
                        {project.client}
                      </span>
                    )}
                    <h3 className="font-heading text-base text-white transition-colors group-hover:text-white/65 line-clamp-1 sm:text-lg">
                      {project.title}
                    </h3>
                    <p className="text-xs text-zinc-400 line-clamp-2 mt-1 leading-relaxed">
                      {project.description}
                    </p>
                  </div>

                  {/* Footer CTA & Tags */}
                  <div className="flex items-center justify-between pt-2 font-mono text-[11px] text-zinc-500">
                    <span className="truncate max-w-[70%]">
                      {project.tags.slice(0, 2).join(' • ')}
                    </span>
                    <span className={`transition-all font-bold ${
                      isCurrent ? 'translate-x-1 text-white/80' : 'text-zinc-600 group-hover:text-white'
                    }`}>
                      {isCurrent ? 'Inspect ↗' : 'View →'}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* BOTTOM PAGINATION DOTS */}
      <div className="flex items-center justify-center gap-2 mt-4">
        {projects.map((p, idx) => (
          <button
            key={p.id}
            onClick={() => setActiveIndex(idx)}
            className={`h-1.5 rounded-full transition-all cursor-pointer ${
              idx === activeIndex
                ? 'w-8 bg-white/80 shadow-[0_0_10px_rgba(255,255,255,0.2)]'
                : 'w-2 bg-zinc-800 hover:bg-zinc-600'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
