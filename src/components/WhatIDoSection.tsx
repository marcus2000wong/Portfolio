import React, { useRef, useState } from 'react';
import { AnimatePresence, motion, MotionValue, useScroll, useTransform } from 'motion/react';

interface ServiceItem {
  id: string;
  code: string;
  title: string;
  description: string;
  capabilities: string[];
}

const SERVICES: ServiceItem[] = [
  {
    id: '01',
    code: 'WD-01',
    title: 'UI/UX, Web Design',
    description:
      'Creating responsive and visually refined websites with a focus on usability and interaction. Combining thoughtful design with seamless digital experiences across devices.',
    capabilities: ['UX strategy', 'Wireframing', 'UI design', 'Responsive websites', 'Design systems'],
  },
  {
    id: '02',
    code: 'BR-02',
    title: 'Motion & Video',
    description:
      'Creating motion graphics and video content that bring ideas and stories to life. Using movement, rhythm, and visual storytelling to create engaging experiences.',
    capabilities: ['Art direction', 'Visual identity', 'Motion Graphic', 'Typography'],
  },
  {
    id: '03',
    code: 'MO-03',
    title: 'Printing & E-commerical and Packaging',
    description:
      'Designing print materials with a strong focus on typography, layout, and visual identity.Creating consistent and impactful designs across both editorial and promotional work.',
    capabilities: ['Printing & E-commerical ', 'Typography', 'Layout', 'Alignment'],
  },
  {
    id: '04',
    code: 'AI-04',
    title: 'Social & AI Workflows',
    description:
      'Creating engaging social content supported by efficient AI-powered creative workflows. Combining design, technology, and automation to improve quality and production efficiency.',
    capabilities: ['Social strategy', 'Creative automation', 'AI production', 'Content systems', 'Campaign assets'],
  },
];

const INTRO_COPY =
  'Strategy, design and production connected as one flexible creative practice—from the first sketch to the final moving image.';

const HighlightWord: React.FC<{
  index: number;
  total: number;
  progress: MotionValue<number>;
  children: string;
}> = ({ index, total, progress, children }) => {
  const start = (index / total) * 0.82;
  const end = Math.min(start + 0.18, 1);
  const opacity = useTransform(progress, [start, end], [0.18, 1]);
  const filter = useTransform(progress, [start, end], ['blur(2.5px)', 'blur(0px)']);

  return (
    <motion.span style={{ opacity, filter }} className="inline-block">
      {children}&nbsp;
    </motion.span>
  );
};

const ScrollTriggeredServiceTitle: React.FC<{ children: string }> = ({ children }) => {
  const titleRef = useRef<HTMLSpanElement>(null);
  const { scrollYProgress } = useScroll({
    target: titleRef,
    offset: ['start 100%', 'start 80%'],
  });
  const y = useTransform(scrollYProgress, [0, 1], [72, 0]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.08, 1]);
  const filter = useTransform(scrollYProgress, [0, 1], ['blur(12px)', 'blur(0px)']);

  return (
    <span
      ref={titleRef}
      className="block overflow-hidden py-[0.18em] -my-[0.18em] font-heading text-[clamp(1.65rem,4.2vw,4.8rem)] leading-[1.05] tracking-[-0.055em] text-white"
    >
      <motion.span style={{ y, opacity, filter }} className="block will-change-transform">
        {children}
      </motion.span>
    </span>
  );
};

export const WhatIDoSection: React.FC = () => {
  const [activeId, setActiveId] = useState<string>('');
  const introRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: introProgress } = useScroll({
    target: introRef,
    offset: ['start 88%', 'end 42%'],
  });
  const introWords = INTRO_COPY.split(' ');

  return (
    <section
      id="what-i-do"
      className="relative z-10 -mt-px w-full overflow-hidden bg-black/70 px-5 pb-8 pt-20 text-white backdrop-blur-[12px] sm:px-8 sm:pb-10 sm:pt-28 lg:px-10 lg:pb-12"
    >
      <div className="mx-auto ">
        <div ref={introRef} className="mb-14 grid gap-8 lg:mb-20 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-8">
            <p className="mb-5 text-[15px] uppercase tracking-[0.22em] text-[#4D7CFF]">■ What I do</p>
            <h2 className="font-heading text-[clamp(3.3rem,8vw,8.5rem)] font-medium leading-[0.86] tracking-[-0.065em] text-white">
              <span className="block">
                {['Design', 'Idea','Move' ].map((word, index) => (
                  <HighlightWord key={word} index={index} total={5} progress={introProgress}>
                    {word}
                  </HighlightWord>
                ))}
              </span>
              <span className="block text-[#4D7CFF]">
                {['Forward.'].map((word, index) => (
                  <HighlightWord key={word} index={index + 3} total={5} progress={introProgress}>
                    {word}
                  </HighlightWord>
                ))}
              </span>
            </h2>
          </div>
          <p className="max-w-md text-sm leading-6 text-white lg:col-span-4 lg:justify-self-end lg:text-base lg:leading-7">
            {introWords.map((word, index) => (
              <HighlightWord key={`${word}-${index}`} index={index} total={introWords.length} progress={introProgress}>
                {word}
              </HighlightWord>
            ))}
          </p>
        </div>

        <div className="border-t border-white/15">
          {SERVICES.map((service) => {
            const isOpen = activeId === service.id;

            return (
              <article
                key={service.id}
                onMouseEnter={() => setActiveId(service.id)}
                onMouseLeave={() => setActiveId('')}
                className="relative border-b border-white/15 before:pointer-events-none before:absolute before:inset-y-0 before:left-1/2 before:w-screen before:-translate-x-1/2 before:bg-white before:opacity-0 before:transition-opacity before:duration-500 before:ease-out hover:before:opacity-10"
              >
                <button
                  type="button"
                  onClick={() => setActiveId(isOpen ? '' : service.id)}
                  onFocus={() => setActiveId(service.id)}
                  aria-expanded={isOpen}
                  className="group relative z-10 grid w-full grid-cols-[2.5rem_1fr_auto] items-center gap-3 py-6 text-left sm:grid-cols-[4rem_1fr_auto_auto] sm:gap-6 sm:py-8 lg:py-10"
                >
                  <span className="font-mono text-[15px] text-[#4D7CFF] ">{service.id}</span>
                  <ScrollTriggeredServiceTitle>{service.title}</ScrollTriggeredServiceTitle>
                  <span className="hidden font-mono text-[15px] tracking-[0.16em] text-white/25 sm:block">{service.code}</span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    className="text-2xl font-light text-white/55 sm:text-3xl"
                    aria-hidden="true"
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                      className="relative z-10 overflow-hidden"
                    >
                      <div className="grid gap-7 pb-9 pl-10 sm:pb-12 sm:pl-[5.5rem] lg:grid-cols-12 lg:gap-10">
                        <p className="max-w-2xl text-base  leading-7 text-white/60 lg:col-span-6 lg:text-lg lg:leading-8">
                          {service.description}
                        </p>
                        <div className="flex flex-wrap content-start gap-2 lg:col-span-6 lg:justify-end">
                          {service.capabilities.map((capability) => (
                            <span
                              key={capability}
                              className="bg-white/[0.06] px-3 py-2 text-[10px] uppercase tracking-[0.12em] text-white/50 sm:text-xs"
                            >
                              {capability}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
