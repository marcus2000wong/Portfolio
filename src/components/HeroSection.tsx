import React from 'react';
import { motion } from 'motion/react';
import { BRANDS } from '../data/portfolioData';
import { ModalType } from '../types';

interface HeroSectionProps {
  onOpenModal: (type: ModalType) => void;
  onCopyEmail: () => void;
}

const BRAND_MARKS: Record<string, string> = {
  b1: 'AP',
  b2: 'GL',
  b3: 'A1',
  b4: 'CU',
  b5: 'M®',
  b6: 'F&B',
  b7: 'B+',
  b8: 'SC',
};

export const HeroSection: React.FC<HeroSectionProps> = ({ onOpenModal }) => (
  <section id="home" className="relative min-h-[100svh] overflow-hidden bg-transparent text-white select-none">
    <div className="pointer-events-none absolute inset-0 bg-[#070808]/60 backdrop-blur-[3px]" />

    <div className="relative min-h-[100svh] px-5 py-7 sm:px-8 sm:py-9 lg:px-10">
      <div className="fixed inset-x-0 top-0 z-50 h-28 bg-gradient-to-b from-black/95 via-black/65 to-transparent pointer-events-none" />
      <div className="absolute inset-y-0 left-[73.5%] hidden border-l border-white/[0.09] lg:block" />
      <div className="site-nav-text fixed left-5 top-7 z-[60] hidden text-white/55 sm:left-8 sm:top-9 lg:left-10 lg:block">Good morning!</div>
      <nav aria-label="Primary navigation" className="site-nav-text fixed inset-x-5 top-7 z-[60] flex items-center justify-between sm:inset-x-8 sm:top-9 lg:inset-x-10">
        <div className="flex items-center gap-5 sm:gap-8 lg:absolute lg:right-[29%]">
          <a href="#home" className="text-white transition hover:text-[#ff4d11]">Home</a>
          <a href="#what-i-do" className="text-white/55 transition hover:text-white">What I do</a>
          <a
            href="/projects"
            className="text-white/55 transition hover:text-white"
          >
            Projects
          </a>
        </div>
        <a
          href="/Marcus-Wong-CV.pdf"
          download
          className="ml-auto border-b border-white/70 pb-1 text-white transition hover:border-[#ff4d11] hover:text-[#ff4d11]"
        >
          Download CV
        </a>
      </nav>

      <motion.div
        className="absolute left-5 top-[33%] z-20 sm:left-8 lg:left-10"
        initial={{ opacity: 0, y: 24, filter: 'blur(10px)' }}
        animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
        transition={{ duration: 0.85, delay: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
          <p className="mb-2 text-sm text-white/55 sm:text-base">Hi there! this is</p>
          <p className="text-2xl font-semibold tracking-tight sm:text-4xl">Marcus <span className="text-white/35">Wong</span></p>
      </motion.div>

      <motion.div
        className="absolute bottom-[11%] left-5 z-20 w-[73%] pointer-events-none sm:left-8 lg:left-10"
        initial="hidden"
        animate="visible"
        variants={{
          hidden: {},
          visible: { transition: { staggerChildren: 0.13, delayChildren: 0.58 } },
        }}
      >
        <h1 className="hero-reference-title font-black uppercase leading-[0.79] tracking-[-0.065em]">
          {[
            ['Design', 'text-white'],
            ['for digital', 'text-white'],
            ['impact', 'text-[#ff4d11]'],
          ].map(([line, color]) => (
            <span key={line} className="block overflow-hidden">
              <motion.span
                className={`block ${color}`}
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
        className="absolute bottom-[52px] left-[75%] right-10 top-[106px] z-20 hidden overflow-y-auto pr-1 lg:flex lg:flex-col [@media(min-height:850px)]:justify-end [@media(min-height:850px)]:overflow-visible"
        initial={{ opacity: 0, x: 42, filter: 'blur(12px)' }}
        animate={{ opacity: 1, x: 0, filter: 'blur(0px)' }}
        transition={{ duration: 1, delay: 0.9, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="mb-7 flex flex-col items-start gap-3 text-sm">
          <a
            href="/projects"
            className="border-b border-white/70 pb-1 text-white transition-colors hover:border-[#ff4d11] hover:text-[#ff4d11]"
          >
            Visit my online portfolio
          </a>
          <button
            onClick={() => onOpenModal('contact')}
            className="border-b border-white/70 pb-1 text-white transition-colors hover:border-[#ff4d11] hover:text-[#ff4d11]"
          >
            Contact me
          </button>
        </div>
        <div className="border-y border-white/10 py-5 text-sm leading-7 text-white/55">
          <p>Website Design</p><p>Branding &amp; Strategy</p><p>Product Design</p>
        </div>
        <h2 className="mt-8 font-heading text-base leading-tight tracking-[-0.025em] text-white">
          Creative Technologist &amp; Multimedia Designer
        </h2>
        <p className="mt-3 pb-5 text-sm leading-6 text-white/55">As a multimedia designer, I specialize in crafting visually engaging digital experiences—spanning web design, social media content, video production, and AI-driven creative workflows. With a keen eye for aesthetics and user-centric principles, I develop responsive websites, intuitive interfaces, dynamic videos, and social media campaigns that align with brand identities and drive audience engagement.</p>
        <div
          className="min-h-[88px] shrink-0 bg-white/10 py-3"
          style={{
            marginLeft: 'calc(-1.5vw - 1px)',
            width: 'calc(100% + 1.5vw + 2.75rem + 1px)',
          }}
        >
          <div className="grid min-h-[64px] grid-cols-3 items-center pl-[1.5vw] pr-11">
            {[
              ['3+', 'Years Exp.'],
              ['20+', 'Projects'],
              ['100%', 'Dedication'],
            ].map(([value, label], index) => (
              <div
                key={label}
                className={`${index === 0 ? 'justify-self-start' : index === 2 ? 'justify-self-end' : 'justify-self-center'} text-center`}
              >
                <p className="font-heading text-3xl leading-none tracking-[-0.05em] text-white">{value}</p>
                <p className="mt-2 text-[10px] uppercase tracking-[0.1em] text-white">{label}</p>
              </div>
            ))}
          </div>
        </div>
      </motion.aside>

      <p className="absolute bottom-5 left-5 z-20 text-xs text-white/45 sm:left-8 sm:text-sm lg:left-10">(Scroll down)</p>

      <motion.div
        className="absolute inset-x-0 bottom-0 z-30 overflow-hidden bg-black/45 py-3 backdrop-blur-sm sm:py-4"
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: '0%', opacity: 1 }}
        transition={{ duration: 0.8, delay: 1.15, ease: [0.16, 1, 0.3, 1] }}
      >
        <div className="animate-marquee flex w-max items-center gap-0 whitespace-nowrap">
          {[...BRANDS, ...BRANDS].map((brand, index) => (
            <div key={`${brand.id}-${index}`} className="flex items-center gap-3 px-7 sm:gap-4 sm:px-11">
              <span className="flex h-8 min-w-8 items-center justify-center rounded-full border border-white/20 px-2 font-mono text-[9px] font-semibold tracking-[-0.04em] text-white/80 sm:h-9 sm:min-w-9 sm:text-[10px]">
                {BRAND_MARKS[brand.id]}
              </span>
              <span className="text-xs font-semibold uppercase tracking-[0.12em] text-white/65 sm:text-sm">{brand.name}</span>
              <span className="h-1 w-1 rounded-full bg-[#ff4d11]" aria-hidden="true" />
            </div>
          ))}
        </div>
      </motion.div>
      </div>
  </section>
);
