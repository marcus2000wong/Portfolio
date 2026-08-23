import React, { lazy, Suspense, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { CategoryFilter, Project } from '../types';

const ProjectHelixGallery = lazy(() => import('./ProjectHelixGallery').then((module) => ({
  default: module.ProjectHelixGallery,
})));

const CATEGORIES: CategoryFilter[] = ['All', 'UI/UX', 'Print & E-commerce', 'Social Media', 'Video'];
const MOBILE_CATEGORY_LABELS: Record<CategoryFilter, string> = {
  All: 'All',
  'UI/UX': 'UI/UX',
  'Print & E-commerce': 'Print',
  'Social Media': 'Social',
  Video: 'Video',
};
const FALLBACK_IMAGES = [
  new URL('../assets/images/blue_nile_center_model_1786542360474.jpg', import.meta.url).href,
  new URL('../assets/images/editorial-hero-portrait-v1.png', import.meta.url).href,
  new URL('../assets/images/designer_hero_portrait_1786522414368.jpg', import.meta.url).href,
  new URL('../assets/images/monochrome-hero-valley-v1.png', import.meta.url).href,
];

const fallbackFor = (project: Project) => {
  const numericId = Number.parseInt(project.id, 10);
  const stableIndex = Number.isNaN(numericId)
    ? [...project.id].reduce((total, character) => total + character.charCodeAt(0), 0)
    : numericId - 1;
  return FALLBACK_IMAGES[stableIndex % FALLBACK_IMAGES.length];
};

interface PortfolioSectionProps {
  onModalChange?: (open: boolean) => void;
}

export const PortfolioSection: React.FC<PortfolioSectionProps> = ({ onModalChange }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDivElement | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const [galleryCursorVisible, setGalleryCursorVisible] = useState(false);
  const reduceMotion = useReducedMotion();
  const cursorX = useMotionValue(-120);
  const cursorY = useMotionValue(-120);
  const smoothCursorX = useSpring(cursorX, { stiffness: 520, damping: 38, mass: 0.35 });
  const smoothCursorY = useSpring(cursorY, { stiffness: 520, damping: 38, mass: 0.35 });

  useEffect(() => () => {
    window.dispatchEvent(new CustomEvent('portfolio:gallery-card-hover', { detail: { hovered: false } }));
  }, []);

  const filteredProjects = useMemo(
    () => PROJECTS.filter((project) => activeCategory === 'All' || project.category === activeCategory),
    [activeCategory],
  );
  const visibleProjectIds = useMemo(
    () => filteredProjects.map((project) => project.id),
    [filteredProjects],
  );

  useEffect(() => {
    setActiveIndex(0);
    setSelectedProject(null);
  }, [activeCategory]);

  useEffect(() => {
    if (!selectedProject) return;

    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = 'hidden';
    const focusFrame = window.requestAnimationFrame(() => closeButtonRef.current?.focus());

    return () => {
      window.cancelAnimationFrame(focusFrame);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [selectedProject]);

  const handleDialogKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Escape') {
      event.preventDefault();
      setSelectedProject(null);
      return;
    }

    if (event.key !== 'Tab') return;
    const focusable: HTMLElement[] = dialogRef.current
      ? Array.from(dialogRef.current.querySelectorAll<HTMLElement>('button:not([disabled]), a[href]'))
      : [];
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first.focus();
    }
  };

  useEffect(() => {
    onModalChange?.(Boolean(selectedProject));
    return () => onModalChange?.(false);
  }, [onModalChange, selectedProject]);

  const currentProject = filteredProjects[activeIndex] || filteredProjects[0] || PROJECTS[0];

  const handleProjectSelect = useCallback((project: Project) => {
    setGalleryCursorVisible(false);
    setSelectedProject(project);
  }, []);

  const handleCardHoverChange = useCallback((hovered: boolean) => {
    setGalleryCursorVisible(hovered);
    window.dispatchEvent(new CustomEvent('portfolio:gallery-card-hover', { detail: { hovered } }));
  }, []);

  return (
    <section id="portfolio" className="relative z-20 h-[100svh] min-h-0 w-full overflow-hidden bg-black/68 text-white backdrop-blur-[12px]">
      <div
        inert={selectedProject ? true : undefined}
        className={`transition-[filter] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${selectedProject ? 'blur-[8px]' : 'blur-0'}`}
      >
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_61%_46%,rgba(62,68,146,0.24),transparent_35%),radial-gradient(circle_at_38%_70%,rgba(39,31,88,0.18),transparent_42%)]" />

      <motion.div
        key={activeCategory}
        initial={{ opacity: 0, filter: 'blur(16px)', y: 18 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 top-[10%] z-[1] overflow-hidden px-5 sm:px-8 lg:px-10"
        aria-hidden="true"
      >
        <p className="font-mono text-[15px] uppercase text-[#4D7CFF]">■ Selected work</p>
        <p className="mt-4 whitespace-nowrap font-heading text-[clamp(5rem,15vw,15rem)] font-medium leading-[0.72] py-2 text-white/[0.055]">
          {currentProject?.title}
        </p>
      </motion.div>

      <div
        className="project-gallery-cursor-zone absolute inset-0 z-10"
        onPointerEnter={(event) => {
          if (event.pointerType === 'touch') return;
          cursorX.set(event.clientX);
          cursorY.set(event.clientY);
        }}
        onPointerMove={(event) => {
          if (event.pointerType === 'touch') return;
          cursorX.set(event.clientX);
          cursorY.set(event.clientY);
        }}
        onPointerLeave={() => setGalleryCursorVisible(false)}
      >
        <Suspense fallback={(
          <div className="grid h-full w-full place-items-center" aria-label="Loading interactive project gallery">
            <div className="flex items-center gap-3 font-mono text-[9px] uppercase text-white/35">
              <span className="h-px w-12 origin-left animate-pulse bg-[#4D7CFF]" />
              Preparing selected work
            </div>
          </div>
        )}>
          <ProjectHelixGallery
            projects={PROJECTS}
            visibleProjectIds={visibleProjectIds}
            paused={Boolean(selectedProject)}
            onSelect={handleProjectSelect}
            onActiveChange={setActiveIndex}
            onCardHoverChange={handleCardHoverChange}
          />
        </Suspense>
      </div>

      <motion.div
        className="pointer-events-none fixed left-0 top-0 z-[60] hidden h-24 w-24 items-center justify-center rounded-full border border-white/75 bg-black/90 px-3 text-center font-mono text-[9px] uppercase leading-[1.25] text-white shadow-[0_16px_48px_rgba(0,0,0,0.6),0_0_28px_rgba(255,255,255,0.1)] backdrop-blur-md md:flex"
        style={{ x: smoothCursorX, y: smoothCursorY, translateX: '-50%', translateY: '-50%' }}
        animate={{
          opacity: galleryCursorVisible && !selectedProject ? [0, 1, 1] : 0,
          scale: galleryCursorVisible && !selectedProject ? [0.25, 1.22, 1] : 0.48,
          rotate: galleryCursorVisible && !selectedProject ? [-6, 2, 0] : 0,
        }}
        transition={{ duration: galleryCursorVisible && !selectedProject ? 0.52 : 0.18, times: [0, 0.68, 1], ease: [0.16, 1, 0.3, 1] }}
        aria-hidden="true"
      >
        <AnimatePresence>
          {galleryCursorVisible && !selectedProject && (
            <motion.span
              key="gallery-cursor-ripple"
              className="absolute inset-0 rounded-full border border-white/70"
              initial={{ opacity: 0, scale: 0.78 }}
              animate={{ opacity: [0.65, 0], scale: [0.82, 1.82] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.55, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
            />
          )}
        </AnimatePresence>
        {galleryCursorVisible && !selectedProject && (
          <motion.span
            className="absolute inset-0 rounded-full border border-white/35"
            initial={{ opacity: 0, scale: 0.78 }}
            animate={{ opacity: [0.5, 0], scale: [0.82, 1.82] }}
            transition={{ duration: 1.55, delay: 0.76, repeat: Infinity, ease: [0.16, 1, 0.3, 1] }}
          />
        )}
        <span className="relative z-10">View my work</span>
      </motion.div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-44 bg-gradient-to-t from-black via-black/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-b from-black/75 to-transparent" />

      <motion.aside
        key={currentProject?.id}
        initial={{ opacity: 0, x: -18, filter: 'blur(10px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-7 left-5 z-30 hidden max-w-[700px] sm:left-8 md:block lg:bottom-8 lg:left-10"
      >
        <div className="flex items-center gap-3 font-mono text-[9px] uppercase text-white/35">
          <span className="text-[#4D7CFF]">
            {String(activeIndex + 1).padStart(2, '0')}
          </span>
          <span className="h-px w-10 bg-white/15" />
          <span>{currentProject?.category}</span>
        </div>

        <h2 className="mt-3 font-heading text-[clamp(1.65rem,4.2vw,41.8rem)] font-medium leading-[0.86] text-white mb-7">
          {currentProject?.title}
        </h2>

        <p className="mt-3 font-mono text-[15px] uppercase text-white/35">
          {currentProject?.client} · {currentProject?.year}
        </p>
      </motion.aside>

      <div className="absolute bottom-[calc(env(safe-area-inset-bottom)+1rem)] right-4 z-40 w-[calc(100%-2rem)] sm:bottom-7 sm:right-8 sm:w-auto lg:bottom-8 lg:right-10">
        <p className="mb-2 text-right font-mono text-[8px] uppercase text-white/40">
          Scroll or drag · select a card to open
        </p>
        <nav data-cursor-passive aria-label="Filter projects" className="grid w-full grid-cols-5 overflow-hidden border border-white/20 bg-black/82 shadow-2xl backdrop-blur-xl sm:flex sm:w-auto sm:max-w-full sm:items-center">
          {CATEGORIES.map((category) => {
            const count = category === 'All' ? PROJECTS.length : PROJECTS.filter((project) => project.category === category).length;
            const active = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={active}
                className={`project-filter-button site-nav-text flex min-h-11 min-w-0 items-center justify-center overflow-hidden border-r border-white/10 px-1 py-2 text-center leading-none last:border-r-0 sm:shrink-0 sm:gap-2 sm:px-4 sm:py-3 sm:text-left sm:leading-[1.25] ${
                  active ? 'is-active bg-white text-black' : 'text-white/55 hover:text-white'
                }`}
              >
                <span className="project-filter-label relative z-10 sm:hidden">{MOBILE_CATEGORY_LABELS[category]}</span>
                <span className="project-filter-label relative z-10 hidden sm:inline">{category}</span>
                <span className={`project-filter-count relative z-10 hidden text-[10px] sm:inline ${active ? 'text-black/45' : 'text-white/25'}`}>{String(count).padStart(2, '0')}</span>
              </button>
            );
          })}
        </nav>
      </div>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <>
            <motion.div
              className="fixed inset-x-0 bottom-[76px] top-[68px] z-[140] bg-black/70 backdrop-blur-md sm:inset-0"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              aria-hidden="true"
            />

            <div className="fixed inset-x-0 bottom-[92px] top-[82px] z-[160] flex items-center justify-center px-3 sm:bottom-6 sm:top-24 sm:px-6 lg:bottom-8">

            <motion.div
              ref={dialogRef}
              initial={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.975, y: 42, clipPath: 'inset(100% 0 0 0)' }}
              animate={{ opacity: 1, scale: 1, y: 0, clipPath: 'inset(0% 0 0 0)' }}
              exit={reduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.985, y: -28, clipPath: 'inset(0 0 100% 0)' }}
              transition={{
                duration: reduceMotion ? 0.18 : 0.82,
                ease: [0.16, 1, 0.3, 1],
              }}
              className="
                relative z-10
                flex
                h-full
                w-full
                flex-col
                overflow-hidden
                border
                border-white/10
                bg-[#101111]
                text-white
                shadow-2xl

                sm:h-full
                sm:max-h-[900px]
                sm:w-[calc(100%-48px)]
                sm:border

                lg:h-[76vh]
                lg:max-h-[820px]
                lg:max-w-[1500px]
                lg:flex-row
              "
              role="dialog"
              aria-modal="true"
              aria-labelledby="project-dialog-title"
              onKeyDown={handleDialogKeyDown}
              onPointerDown={(event) => event.stopPropagation()}
              onPointerUp={(event) => event.stopPropagation()}
              onClick={(event) => event.stopPropagation()}
            >
              {!reduceMotion && (
                <motion.div
                  className="pointer-events-none absolute inset-x-0 bottom-0 z-[70] h-[22%] bg-[linear-gradient(0deg,transparent,rgba(255,255,255,0.44),rgba(255,255,255,0.16),transparent)] mix-blend-screen"
                  initial={{ y: '130%', opacity: 0 }}
                  animate={{ y: '-590%', opacity: [0, 0.95, 0] }}
                  transition={{ duration: 1.05, delay: 0.12, times: [0, 0.38, 1], ease: [0.16, 1, 0.3, 1] }}
                  aria-hidden="true"
                />
              )}
              {/* ================================= */}
              {/* GLOBAL CLOSE BUTTON */}
              {/* ================================= */}

              <button
                ref={closeButtonRef}
                type="button"
                onClick={() => setSelectedProject(null)}
                style={{ outline: 'none' }}
                className="
                  absolute
                  right-4
                  top-4
                  z-50
                  flex
                  h-10
                  w-10
                  items-center
                  justify-center
                  bg-black/70
                  text-xl
                  text-white
                  shadow-lg
                  backdrop-blur-md
                  transition
                  hover:bg-white
                  hover:text-black
                  focus-visible:outline-none
                  focus-visible:ring-1
                  focus-visible:ring-white/80
                  focus-visible:ring-offset-1
                  focus-visible:ring-offset-black

                  sm:right-5
                  sm:top-5

                  lg:bg-white/[0.07]
                "
                aria-label="Close case study"
              >
                ×
              </button>

              {/* ================================= */}
              {/* SHOWCASE */}
              {/* ================================= */}

              <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, scale: 1.1, y: 28, filter: 'blur(14px)' }}
                animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: reduceMotion ? 0.01 : 1.05, delay: reduceMotion ? 0 : 0.12, ease: [0.16, 1, 0.3, 1] }}
                className="
                  relative
                  h-[55%]
                  min-h-[190px]
                  w-full
                  shrink-0
                  overflow-hidden
                  bg-black

                  sm:h-[64vh]

                  lg:h-full
                  lg:min-w-0
                  lg:flex-[2.6]
                "
              >
                {/* VIDEO */}
                {selectedProject.media?.type === 'video' ? (
                  <div className="relative h-full w-full overflow-hidden bg-black">

                    {/* Blurred background */}
                    <video
                      src={selectedProject.media.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      aria-hidden="true"
                      className="absolute inset-0 h-full w-full scale-110 object-cover opacity-60 blur-2xl"
                    />

                    <div className="absolute inset-0 bg-black/20" />

                    {/* Main Video */}
                    <video
                      src={selectedProject.media.src}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="metadata"
                      controls
                      className="relative z-10 h-full w-full object-contain"
                    />
                  </div>

                ) : selectedProject.media?.type === 'iframe' ? (

                  /* IFRAME */
                  <div className="relative h-full w-full overflow-hidden bg-white">
                    <iframe
                      key={selectedProject.id}
                      src={selectedProject.media.src}
                      title={selectedProject.title}
                      className="h-full w-full border-0"
                      scrolling="yes"
                    />

                    {/* Scroll Hint */}
                    <div className="pointer-events-none absolute bottom-4 left-1/2 z-20 -translate-x-1/2 sm:bottom-5">
                      <div className="flex items-center gap-2 bg-black/80 px-3 py-2 font-mono text-[9px] uppercase text-white shadow-lg backdrop-blur-md sm:px-4 sm:text-[10px]">
                        <span>Scroll to preview</span>

                        <span
                          className="inline-block animate-bounce"
                          aria-hidden="true"
                        >
                          ↓
                        </span>
                      </div>
                    </div>
                  </div>

                ) : (

                  /* IMAGE */
                  <div className="relative h-full w-full overflow-y-auto overflow-x-hidden bg-black">

                    <img
                      src={
                        selectedProject.media?.type === 'image'
                          ? selectedProject.media.src
                          : selectedProject.hoverImage || selectedProject.image
                      }
                      alt={selectedProject.title}
                      className="block h-auto min-h-full w-full object-cover object-top"
                      referrerPolicy="no-referrer"
                      onError={(event) => {
                        event.currentTarget.onerror = null;
                        event.currentTarget.src =
                          fallbackFor(selectedProject);
                      }}
                    />

                    {/* Scroll Hint */}
                    <div className="pointer-events-none sticky bottom-4 z-20 flex justify-center sm:bottom-5">
                      <div className="flex items-center gap-2 bg-black/80 px-3 py-2 font-mono text-[9px] uppercase text-white shadow-lg backdrop-blur-md sm:px-4 sm:text-[10px]">
                        <span>Scroll to preview</span>

                        <span
                          className="inline-block animate-bounce"
                          aria-hidden="true"
                        >
                          ↓
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Category */}
                <div className="pointer-events-none absolute bottom-5 left-5 z-30 hidden bg-black/80 px-4 py-2 font-mono text-[10px] uppercase text-white shadow-lg backdrop-blur-md sm:block">
                  {selectedProject.category}
                </div>
              </motion.div>

              {/* ================================= */}
              {/* PROJECT INFO */}
              {/* ================================= */}

              <motion.div
                initial={reduceMotion ? undefined : { opacity: 0, y: 52, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                transition={{ duration: reduceMotion ? 0.01 : 0.82, delay: reduceMotion ? 0 : 0.34, ease: [0.16, 1, 0.3, 1] }}
                className="
                  relative
                  flex
                  min-h-0
                  flex-1
                  flex-col
                  overflow-y-auto
                  border-t
                  border-white/[0.08]
                  bg-[#101111]
                  p-4

                  sm:p-6

                  lg:h-full
                  lg:w-[360px]
                  lg:flex-none
                  lg:shrink-0
                  lg:border-l
                  lg:border-t-0
                  lg:p-8
                  xl:w-[380px]
                "
              >
                {/* Top info */}
                <div className="pr-12">
                  <span className="font-mono text-[9px] uppercase  text-[#4D7CFF] lg:text-[10px]">
                    {selectedProject.client || 'Client Project'}
                  </span>

                  <h2 id="project-dialog-title" className="mt-1.5 font-heading text-2xl leading-[1]  text-white sm:text-3xl lg:mt-3 lg:text-4xl ">
                    {selectedProject.title}
                  </h2>

                  {/* Subcategory + year */}
                  <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 lg:mt-3">
                    <p className="text-[10px] leading-4 text-white/40 sm:text-xs">
                      {selectedProject.subCategory}
                    </p>

                    <span className="text-[10px] text-white/20">
                      •
                    </span>

                    <span className="font-mono text-[9px] text-white/50 sm:text-[10px]">
                      {selectedProject.year}
                    </span>
                  </div>
                </div>

                {/* Description */}
                <p className="mt-3 max-w-xl text-[11px] leading-[1.55] text-white/55 sm:text-xs sm:leading-5 lg:mt-6 lg:text-[13px] lg:leading-6">
                  {selectedProject.description}
                </p>

                {/* Tags */}
                <div className="mt-3 flex flex-wrap gap-1.5 lg:mt-6">
                  {selectedProject.tags.map((tag) => (
                    <span
                      key={tag}
                      className="bg-white/[0.06] px-2 py-1 font-mono text-[9px] text-white/50 lg:px-2.5 lg:text-[10px]"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Live Project */}
                {selectedProject.liveUrl && (
                  <div className="mt-4 lg:mt-auto lg:pt-8">
                    <a
                      href={selectedProject.liveUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="
                        flex
                        w-full
                        items-center
                        justify-between
                        bg-white
                        px-4
                        py-3
                        font-mono
                        text-[9px]
                        uppercase
                        
                        text-black
                        transition
                        hover:bg-[#4D7CFF]
                        hover:text-white
                        focus-visible:outline-none
                        focus-visible:ring-2
                        focus-visible:ring-[#4D7CFF]
                        focus-visible:ring-offset-2
                        focus-visible:ring-offset-[#101111]

                        lg:px-5
                        lg:py-3.5
                        lg:text-[10px]
                      "
                    >
                      <span>View live project</span>
                      <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                )}
              </motion.div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
};
