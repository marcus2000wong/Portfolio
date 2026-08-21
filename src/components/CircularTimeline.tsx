import React, { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { TIMELINE_ITEMS } from '../data/portfolioData';
import { TimelineItem } from '../types';

interface CareerItem extends TimelineItem {
  employmentType: string;
  fromDate: string;
  toDate: string;
  startYear: number;
}

const formatCareerItem = (item: TimelineItem): CareerItem => {
  const [start = '', end = 'Present'] = item.period.split('–').map((value) => value.trim());
  const dateLabel = (value: string) => {
    if (!value.includes('/')) return value === 'Present' ? 'Present' : `Sep, ${value}`;
    const [year, month] = value.split('/');
    const months: Record<string, string> = { '01': 'Jan', '07': 'Jul', '08': 'Aug' };
    return `${months[month] ?? month}, ${year}`;
  };

  return {
    ...item,
    employmentType: item.type === 'experience' ? 'Full-time' : 'Education',
    fromDate: dateLabel(start),
    toDate: dateLabel(end),
    startYear: Number(start.slice(0, 4)) || 0,
  };
};

export const CircularTimeline: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const careerItems = TIMELINE_ITEMS.map(formatCareerItem).sort((a, b) => b.startYear - a.startYear);
  const [activeIndex, setActiveIndex] = useState(0);
  const [viewport, setViewport] = useState({ width: 1440, height: 900 });
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end start'] });
  const progress = scrollYProgress;
  // `scrollYProgress` runs across the complete timeline element (viewport +
  // pinned travel), so map the first 550px of the 600px pinned range here.
  // The remaining 50px holds Shebbear on the left before Projects begins.
  const movementEnd = 1100 / (viewport.height + 1200);
  const cardWidth = viewport.width >= 1024 ? viewport.width * 0.29 : viewport.width >= 640 ? viewport.width * 0.48 : viewport.width * 0.74;
  // Move all the way through the final item. The old ref measurement could retain
  // its fallback value, ending the sequence on the third (As One) card instead.
  const finalTravel = -(careerItems.length - 1) * cardWidth;
  const x = useTransform(progress, [0, movementEnd, 1], [0, finalTravel, finalTravel]);

  useEffect(() => {
    const updateViewport = () => setViewport({ width: window.innerWidth, height: window.innerHeight });
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  useEffect(() => {
    const unsubscribe = progress.on('change', (value) => {
      const movement = Math.min(Math.max(value / movementEnd, 0), 1);
      setActiveIndex(Math.min(careerItems.length - 1, Math.round(movement * (careerItems.length - 1))));
    });
    return unsubscribe;
  }, [careerItems.length, movementEnd, progress]);

  return (
    <section
      ref={sectionRef}
      id="timeline"
      data-cursor-label="Scroll down"
      onPointerEnter={() => window.dispatchEvent(new CustomEvent('portfolio:cursor-zone', { detail: { active: true, label: 'Scroll down' } }))}
      onPointerLeave={() => window.dispatchEvent(new CustomEvent('portfolio:cursor-zone', { detail: { active: false } }))}
      className="relative z-10 -mt-px h-[calc(100svh_+_1200px)] w-screen bg-black/30 text-white"
    >
      <div className="sticky top-0 h-screen w-screen overflow-hidden bg-black/70 backdrop-blur-[12px]">
        <div className="absolute inset-x-0 top-[4svh] h-[92svh] overflow-hidden border-y border-white/10">
        <p className="absolute left-5 top-6 z-10 text-[15px] uppercase tracking-[0.22em] text-[#4D7CFF] sm:left-10 sm:top-9">■ Career &amp; education</p>
        <motion.div
          style={{ x }}
          className="flex h-[calc(100%_-_72px)] min-w-max pt-20 sm:pt-24"
        >
          {careerItems.map((item, index) => (
            <article
              key={item.id}
              className={`flex h-full w-[74vw] shrink-0 flex-col border-r border-white/[0.07] px-7 pb-24 pt-6 transition-[opacity,background-color,box-shadow] duration-500 sm:w-[48vw] sm:px-10 sm:pt-8 lg:w-[29vw] lg:px-12 lg:pt-10 ${
                index === activeIndex
                  ? 'bg-white/[0.035] text-white/85 shadow-[inset_0_0_80px_rgba(255,255,255,0.035)]'
                  : 'text-white/45 opacity-45'
              }`}
            >
              <div>
                <h3
                  className={`max-w-[13rem] font-heading text-2xl font-medium leading-[1.12] tracking-[-0.045em] transition-colors duration-500 sm:text-3xl ${
                    index === activeIndex
                      ? 'text-[#4D7CFF]'
                      : 'text-white/75'
                  }`}
                >
                  {item.title}
                </h3>

                <p className="mt-4 text-base text-white/30">
                  {item.employmentType}
                </p>
              </div>

              <div className="mt-auto pb-20">
                <p
                  className={`font-heading text-lg font-medium tracking-[-0.03em] transition-colors duration-300 ${
                    index === activeIndex
                      ? 'text-white/65'
                      : 'text-white/65'
                  }`}
                >
                  {item.organization}
                </p>

                <p className="mt-1 text-base text-white/35">
                  {item.location}
                </p>
              </div>

              <div className="space-y-6 text-base text-white/30">
                <div>
                  <p>From</p>

                  <p
                    className={`mt-1 text-xl font-medium tracking-[-0.035em] transition-colors duration-500 ${
                      index === activeIndex
                        ? 'text-white/65'
                        : 'text-white/65'
                    }`}
                  >
                    {item.fromDate}
                  </p>
                </div>

                <div>
                  <p>To</p>

                  <p
                    className={`mt-1 text-xl font-medium tracking-[-0.035em] transition-colors duration-500 ${
                      index === activeIndex
                        ? 'text-white/65'
                        : 'text-white/65'
                    }`}
                  >
                    {item.toDate}
                  </p>
                </div>
              </div>
            </article>
          ))}

          <div
            aria-hidden="true"
            className="h-full w-[74vw] shrink-0 border-r border-white/[0.07] sm:w-[48vw] lg:w-[29vw]"
          />
        </motion.div>

        <div className="absolute inset-x-0 bottom-0 h-[72px] border-t border-white/[0.08] bg-black/15">
          <div className="absolute inset-x-0 bottom-0 flex h-5 items-end justify-between px-5 opacity-60 sm:px-10">
            {Array.from({ length: 46 }).map((_, index) => (
              <span key={index} className={`w-px bg-white/25 ${index % 12 === 0 ? 'h-16' : index % 4 === 0 ? 'h-7' : 'h-4'}`} />
            ))}
          </div>
        </div>
      </div>
      </div>
    </section>
  );
};
