import React from 'react';
import { motion } from 'motion/react';
import { BRANDS } from '../data/portfolioData';
import { ModalType } from '../types';
export interface Brand {
  id: string;
  name: string;
  category: string;
  logo: string;
}
interface HeroSectionProps {
  onOpenModal: (type: ModalType) => void;
  onCopyEmail: () => void;
}


export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => (
  <section id="home" className="relative min-h-[100svh] overflow-hidden bg-transparent text-white select-none">
    <div className="pointer-events-none absolute inset-0 bg-[#070808]/60 backdrop-blur-[3px]" />

    <div className="relative min-h-[100svh] px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
      <div className="fixed inset-x-0 top-0 z-50 h-28 bg-gradient-to-b from-black/95 via-black/65 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 left-[73.5%] hidden border-l border-white/[0.09] lg:block" />
      <div className="site-nav-text fixed left-5 top-7 z-[60] hidden text-white/55 sm:left-8 sm:top-9 lg:left-10 lg:block">Good morning!</div>
      <nav aria-label="Primary navigation" className="site-nav-text fixed inset-x-5 top-7 z-[60] flex items-center justify-between sm:inset-x-8 sm:top-9 lg:inset-x-10">
        <div className="flex items-center gap-5 sm:gap-8 lg:absolute lg:right-[29%]">
          <a href="#home" className="text-white transition hover:text-[#4D7CFF]">Home</a>
          <a href="#what-i-do" className="text-white/55 transition hover:text-[#4D7CFF]">What I do</a>
          <a
            href="/projects"
            className="text-white/55 transition hover:text-[#4D7CFF]"
          >
            Projects
          </a>
        </div>
        <a
          href="/designer_Resume_wong_marcus.pdf"
          download
          className="ml-auto border-b border-white/70 pb-1 text-white transition hover:border-[#4D7CFF] hover:text-[#4D7CFF]"
        >
          Download CV
        </a>
      </nav>

      <motion.div
        className="absolute left-5 top-[20%] z-20 sm:left-8 lg:left-10"
        initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.85, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <p className="mb-2 text-sm text-white/55 sm:text-base">Hi there! this is</p>
        <p className="text-2xl font-semibold sm:text-4xl ">Marcus <span className="text-white/35">Wong</span></p>
      </motion.div>

      <motion.div
        className="pointer-events-none absolute bottom-[116px] left-5 z-20 w-[calc(100%-2.5rem)] sm:left-8 sm:w-[73%] lg:left-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.13, delayChildren: 0.58 } },
        }}
      >
        <h1 className="hero-reference-title -ml-[0.01em] font-black uppercase leading-[0.9] sm:leading-[0.86] lg:leading-[0.82] xl:leading-[0.8]">
          {[
            ['Design', 'text-white'],
            ['for digital', 'text-white'],
            ['impact', 'text-[#4D7CFF]'],
          ].map(([line, color]) => (
            <span key={line} className="block overflow-clip [overflow-clip-margin:0.12em]">
              <motion.span
                className={`block whitespace-nowrap ${color}`}
                variants={{
                  hidden: { y: '115%', opacity: 0, rotate: 2 },
                  visible: { y: '0%', opacity: 1, rotate: 0 },
                }}
                transition={{ duration: 0.95, ease: [0.16, 1, 0.3, 1] }}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
      </motion.div>

      <motion.aside
        className="absolute bottom-[92px] left-[73.5%] right-0 top-[106px] z-20 hidden overflow-hidden lg:flex lg:flex-col"
        initial={{ opacity: 0, x: 42, filter: 'blur(12px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="min-h-0 flex-1 overflow-y-auto">
        <div className="ml-[1.5vw] mr-10 flex min-h-full flex-col justify-end">
        <div className="mb-7 flex flex-col items-start gap-3 text-sm">
          <a
            href="/projects"
            className="border-b border-white/70 pb-1 text-white transition-colors hover:border-[#4D7CFF] hover:text-[#4D7CFF]"
          >
            Visit my online portfolio
          </a>
          <a
            href="#contact"
            className="border-b border-white/70 pb-1 text-white transition-colors hover:border-[#4D7CFF] hover:text-[#4D7CFF]"
          >
            Contact me
          </a>
        </div>
        <div className="border-y border-white/10 py-5 text-sm leading-7 text-white/55">
          <p>Website Design</p><p>Branding &amp; Strategy</p><p>Product Design</p>
        </div>
        <h2 className="mt-8 font-heading text-base leading-tight text-white">
          Creative Technologist &amp; Multimedia Designer
        </h2>
        <p className="mt-3 pb-5 text-sm leading-6 text-white/55">As a multimedia designer, I specialize in crafting visually engaging digital experiences—spanning web design, social media content, video production, and AI-driven creative workflows. With a keen eye for aesthetics and user-centric principles, I develop responsive websites, intuitive interfaces, dynamic videos, and social media campaigns that align with brand identities and drive audience engagement.</p>
        </div>
        </div>
        <div className="min-h-[88px] w-full shrink-0 bg-white/5 py-4">
          <div className="grid min-h-[64px] w-full grid-cols-3 items-center pl-[1.5vw] pr-10">
            {[
              ['3+ ', 'Years Exp.'],
              ['20+', 'Projects'],
              ['100%', 'Dedication'],
            ].map(([value, label], index) => (
              <div
                key={label}
                className={`${index === 0 ? 'justify-self-start' : index === 2 ? 'justify-self-end' : 'justify-self-center'} text-center`}
              >
                <p className="font-heading text-3xl leading-none text-[#4D7CFF] drop-shadow-[0_0_12px_rgb(black)]">{value}</p>
                <p className="mt-2 text-[10px] uppercase text-white">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.aside>

      <p className="absolute bottom-5 left-5 z-20 text-xs text-white/45 sm:left-8 sm:text-sm lg:left-10">(Scroll down)</p>

      <motion.div
        className="absolute inset-x-0 bottom-0 z-30 h-[92px] overflow-hidden border-y border-white/15 bg-black/45 py-3 backdrop-blur-sm"
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{
          duration: 0.8,
          delay: 1.15,
          ease: [0.16, 1, 0.3, 1],
        }}
      >
        <div className="animate-marquee flex w-max items-center whitespace-nowrap py-3">
          {[...BRANDS, ...BRANDS].map((brand, index) => (
            <div
              key={`${brand.id}-${index}`}
              className="flex items-center gap-3 px-3 sm:gap-5 sm:px-5"
            >
              <img
                src={brand.logo}
                alt={`${brand.name} logo`}
                className="h-9 w-auto max-w-[180px] object-contain sm:h-11 sm:max-w-[220px]"
              />

              <span
                className="h-1 w-1 shrink-0 rounded-full bg-white"
                aria-hidden="true"
              />
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  </section>
);
