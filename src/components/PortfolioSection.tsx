import React, { useEffect, useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import { PROJECTS } from '../data/portfolioData';
import { CategoryFilter, Project } from '../types';
import { ProjectHelixGallery } from './ProjectHelixGallery';

const CATEGORIES: CategoryFilter[] = ['All', 'UI/UX', 'Printing & E-commerical', 'Social Media', 'Video'];
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
        <p className="font-mono text-[15px] uppercase tracking-[0.24em] text-[#4D7CFF]">■ Selected work</p>
        <p className="mt-4 whitespace-nowrap font-heading text-[clamp(5rem,15vw,15rem)] font-medium leading-[0.72] py-2 text-white/[0.055]">
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

      <div className="absolute bottom-5 right-5 z-40 w-[calc(100%-2.5rem)] sm:bottom-7 sm:right-8 sm:w-auto lg:bottom-8 lg:right-10">
        <p className="mb-2 text-right font-mono text-[8px] uppercase  text-white/25">
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
          <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 p-0 backdrop-blur-xl sm:p-6">

            {/* Background click to close */}
            <button
              type="button"
              className="absolute inset-0 cursor-default"
              onClick={() => setSelectedProject(null)}
              aria-label="Close project"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 20 }}
              transition={{
                duration: 0.35,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="
                relative z-10
                flex
                h-[100svh]
                w-full
                flex-col
                overflow-hidden
                border-white/10
                bg-[#101111]
                text-white
                shadow-2xl

                sm:h-[90vh]
                sm:max-h-[900px]
                sm:w-[calc(100%-48px)]
                sm:border

                lg:h-[76vh]
                lg:max-h-[820px]
                lg:max-w-[1500px]
                lg:flex-row
              "
            >

              {/* ================================= */}
              {/* GLOBAL CLOSE BUTTON */}
              {/* ================================= */}

              <button
                type="button"
                onClick={() => setSelectedProject(null)}
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

              <div
                className="
                  relative
                  h-[72svh]
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
              </div>

              {/* ================================= */}
              {/* PROJECT INFO */}
              {/* ================================= */}

              <div
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

                  <h2 className="mt-1.5 font-heading text-2xl leading-[1]  text-white sm:text-3xl lg:mt-3 lg:text-4xl ">
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
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
};
