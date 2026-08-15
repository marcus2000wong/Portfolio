import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { CategoryFilter, Project } from '../types';
import { ProjectHelixGallery } from './ProjectHelixGallery';

const CATEGORIES: CategoryFilter[] = ['All', 'UI/UX', 'Printing', 'Social Media', 'Video'];
const FALLBACK_IMAGES = [
  new URL('../assets/images/blue_nile_center_model_1786542360474.jpg', import.meta.url).href,
  new URL('../assets/images/editorial-hero-portrait-v1.png', import.meta.url).href,
  new URL('../assets/images/designer_hero_portrait_1786522414368.jpg', import.meta.url).href,
  new URL('../assets/images/monochrome-hero-valley-v1.png', import.meta.url).href,
];

const fallbackFor = (project: Project) =>
  FALLBACK_IMAGES[(Number.parseInt(project.id, 10) - 1) % FALLBACK_IMAGES.length];

export const PortfolioSection: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('All');
  const [activeIndex, setActiveIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  const filteredProjects = useMemo(
    () => PROJECTS.filter((project) => activeCategory === 'All' || project.category === activeCategory),
    [activeCategory],
  );

  useEffect(() => {
    setActiveIndex(0);
    setSelectedProject(null);
  }, [activeCategory]);

  const currentProject = filteredProjects[activeIndex] || filteredProjects[0] || PROJECTS[0];

  return (
    <section id="portfolio" className="relative z-20 h-screen min-h-[720px] w-full overflow-hidden bg-black/68 text-white backdrop-blur-[12px]">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_61%_46%,rgba(62,68,146,0.24),transparent_35%),radial-gradient(circle_at_38%_70%,rgba(39,31,88,0.18),transparent_42%)]" />

      <motion.div
        key={`${activeCategory}-${currentProject?.id}`}
        initial={{ opacity: 0, filter: 'blur(16px)', y: 18 }}
        animate={{ opacity: 1, filter: 'blur(0px)', y: 0 }}
        transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute inset-x-0 top-[10%] z-[1] overflow-hidden px-5 sm:px-8 lg:px-10"
        aria-hidden="true"
      >
        <p className="font-mono text-[9px] uppercase tracking-[0.24em] text-[#ff4d11]">■ Selected work</p>
        <p className="mt-4 whitespace-nowrap font-heading text-[clamp(5rem,15vw,15rem)] font-medium leading-[0.72] tracking-[-0.08em] text-white/[0.055]">
          {currentProject?.title}
        </p>
      </motion.div>

      <div className="absolute inset-0 z-10">
        <ProjectHelixGallery
          key={activeCategory}
          projects={filteredProjects}
          onSelect={setSelectedProject}
          onActiveChange={setActiveIndex}
        />
      </div>

      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-20 h-44 bg-gradient-to-t from-black via-black/80 to-transparent" />
      <div className="pointer-events-none absolute inset-x-0 top-0 z-20 h-32 bg-gradient-to-b from-black/75 to-transparent" />

      <motion.aside
        key={currentProject?.id}
        initial={{ opacity: 0, x: -18, filter: 'blur(10px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="pointer-events-none absolute bottom-7 left-5 z-30 hidden max-w-sm sm:left-8 md:block lg:bottom-8 lg:left-10"
      >
        <div className="flex items-center gap-3 font-mono text-[9px] uppercase tracking-[0.22em] text-white/35">
          <span className="text-[#ff4d11]">{String(activeIndex + 1).padStart(2, '0')}</span>
          <span className="h-px w-10 bg-white/15" />
          <span>{currentProject?.category}</span>
        </div>
        <h1 className="mt-3 font-heading text-4xl font-medium leading-none tracking-[-0.055em] text-white lg:text-5xl">
          {currentProject?.title}
        </h1>
        <p className="mt-3 font-mono text-[9px] uppercase tracking-[0.18em] text-white/35">
          {currentProject?.client} · {currentProject?.year}
        </p>
      </motion.aside>

      <div className="absolute bottom-5 right-5 z-40 w-[calc(100%-2.5rem)] sm:bottom-7 sm:right-8 sm:w-auto lg:bottom-8 lg:right-10">
        <p className="mb-2 text-right font-mono text-[8px] uppercase tracking-[0.2em] text-white/25">
          Scroll or drag to rotate · click to open
        </p>
        <nav aria-label="Filter projects" className="flex max-w-full items-center overflow-x-auto border border-white/12 bg-black/72 shadow-2xl backdrop-blur-xl">
          {CATEGORIES.map((category) => {
            const count = category === 'All' ? PROJECTS.length : PROJECTS.filter((project) => project.category === category).length;
            const active = category === activeCategory;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={active}
                className={`site-nav-text flex shrink-0 items-center gap-2 border-r border-white/10 px-3 py-2.5 transition last:border-r-0 sm:px-4 ${
                  active ? 'bg-white text-black' : 'text-white/55 hover:bg-white/10 hover:text-white'
                }`}
              >
                <span>{category}</span>
                <span className={`text-[10px] ${active ? 'text-black/45' : 'text-white/25'}`}>{String(count).padStart(2, '0')}</span>
              </button>
            );
          })}
        </nav>
      </div>

      <AnimatePresence>
        {selectedProject && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-4 backdrop-blur-xl sm:p-6">
            <button type="button" className="absolute inset-0 cursor-default" onClick={() => setSelectedProject(null)} aria-label="Close project" />
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              className="relative z-10 flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[28px] border border-white/10 bg-[#101111] text-white shadow-2xl"
            >
              <div className="relative h-64 overflow-hidden bg-black sm:h-80">
                <img
                  src={selectedProject.hoverImage || selectedProject.image}
                  alt={selectedProject.title}
                  className="h-full w-full object-cover"
                  referrerPolicy="no-referrer"
                  onError={(event) => {
                    event.currentTarget.onerror = null;
                    event.currentTarget.src = fallbackFor(selectedProject);
                  }}
                />
                <button type="button" onClick={() => setSelectedProject(null)} className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-black/75 text-white transition hover:bg-white hover:text-black" aria-label="Close case study">×</button>
                <div className="absolute bottom-4 left-4 rounded-full bg-black/80 px-3.5 py-1 font-mono text-xs text-white backdrop-blur-md">{selectedProject.category}</div>
              </div>
              <div className="space-y-5 overflow-y-auto p-6 sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <span className="font-mono text-xs uppercase tracking-wider text-[#ff4d11]">{selectedProject.client || 'Client Project'}</span>
                    <h2 className="mt-1 font-heading text-3xl tracking-[-0.04em] text-white sm:text-4xl">{selectedProject.title}</h2>
                    <p className="mt-1 text-sm text-white/45">{selectedProject.subCategory}</p>
                  </div>
                  <span className="rounded-full bg-white/[0.08] px-3 py-1 font-mono text-sm text-white/70">{selectedProject.year}</span>
                </div>
                <p className="text-sm leading-7 text-white/65 sm:text-base">{selectedProject.description}</p>
                <div className="flex flex-wrap gap-2">
                  {selectedProject.tags.map((tag) => <span key={tag} className="rounded-full bg-white/[0.07] px-3 py-1.5 font-mono text-xs text-white/65">{tag}</span>)}
                </div>
                {selectedProject.liveUrl && (
                  <a href={selectedProject.liveUrl} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 rounded-full bg-white px-5 py-3 font-mono text-xs uppercase tracking-[0.14em] text-black transition hover:bg-[#ff4d11] hover:text-white">View live project <span aria-hidden="true">↗</span></a>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
