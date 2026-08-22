import React from 'react';
import { motion } from 'motion/react';
import { MARCUS_PROFILE, SKILL_GROUPS } from '../data/portfolioData';
import { CircularTimeline } from './CircularTimeline';

interface AboutSectionProps {
  onCopyEmail: (email: string) => void;
}

export const AboutSection: React.FC<AboutSectionProps> = ({ onCopyEmail }) => {
  return (
    <section id="about" className="relative z-10 -mt-px w-full bg-black/70 px-5 py-20 text-white backdrop-blur-[12px] sm:px-8 md:px-12">
      <div className="max-w-6xl mx-auto space-y-20">
        
        {/* SECTION HEADER & BIO */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-zinc-900 border border-zinc-800 rounded-full text-xs uppercase text-zinc-400 font-mono">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              About Me
            </div>

            <h2 className="text-3xl sm:text-4xl md:text-5xl font-heading text-white leading-tight">
              Marcus Wong
            </h2>

            <p className="text-lg font-medium text-zinc-300">
              {MARCUS_PROFILE.title} · <span className="text-zinc-500">{MARCUS_PROFILE.location}</span>
            </p>

            <div className="rounded-2xl border border-zinc-800/80 bg-zinc-900/80 p-6 shadow-xl">
              <div className="flex flex-wrap gap-3">
                <button
                  onClick={() => onCopyEmail(MARCUS_PROFILE.email)}
                  className="px-4 py-2 bg-white text-black hover:bg-zinc-200 text-xs sm:text-sm font-medium rounded-full transition-colors cursor-pointer"
                >
                  Copy Email
                </button>
                <a
                  href={MARCUS_PROFILE.behance}
                  target="_blank"
                  rel="noreferrer"
                  className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white text-xs sm:text-sm font-medium rounded-full transition-colors inline-flex items-center gap-1.5"
                >
                  Behance Portfolio ↗
                </a>
              </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-3 gap-3 pt-2">
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/60 text-center">
                <div className="text-2xl font-heading text-white">3+</div>
                <div className="text-[11px] text-zinc-400 font-mono mt-0.5">Years Exp.</div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/60 text-center">
                <div className="text-2xl font-heading text-white">20+</div>
                <div className="text-[11px] text-zinc-400 font-mono mt-0.5">Projects</div>
              </div>
              <div className="p-4 rounded-xl bg-zinc-900/50 border border-zinc-800/60 text-center">
                <div className="text-2xl font-heading text-white">100%</div>
                <div className="text-[11px] text-zinc-400 font-mono mt-0.5">Dedication</div>
              </div>
            </div>
          </div>

          {/* SKILLS MATRIX */}
          <div className="lg:col-span-7 space-y-6">
            <h3 className="text-xl sm:text-2xl font-heading text-white">
              Technical & Creative Proficiency
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {SKILL_GROUPS.map((group, groupIdx) => (
                <motion.div
                  key={groupIdx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: groupIdx * 0.1 }}
                  viewport={{ once: true }}
                  className="p-5 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3"
                >
                  <div className="text-xs font-mono uppercase text-zinc-400 border-b border-zinc-800 pb-2">
                    {group.category}
                  </div>
                  <div className="space-y-3 pt-1">
                    {group.skills.map((skill, sIdx) => (
                      <div key={sIdx}>
                        <div className="flex justify-between text-xs mb-1">
                          <span className="text-zinc-200 font-medium">{skill.name}</span>
                          <span className="text-zinc-500 font-mono">{skill.level}%</span>
                        </div>
                        <div className="w-full bg-zinc-800/80 h-1.5 rounded-full overflow-hidden">
                          <motion.div
                            initial={{ width: 0 }}
                            whileInView={{ width: `${skill.level}%` }}
                            transition={{ duration: 0.8, delay: sIdx * 0.05 }}
                            viewport={{ once: true }}
                            className="bg-gradient-to-r from-zinc-300 to-white h-full rounded-full"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};
