import React from 'react';
import { MARCUS_PROFILE } from '../data/portfolioData';

export const ContactSection: React.FC = () => (
  <section
    id="contact"
    className="relative z-20 -mt-px bg-black/70 px-4 py-10 text-white backdrop-blur-[12px] sm:px-7 sm:py-14 lg:px-10 lg:py-16"
  >
    <div className="relative isolate mx-auto flex min-h-[650px] max-w-[1500px] overflow-hidden rounded-[38px] border border-white/10 bg-[linear-gradient(180deg,rgba(20,20,20,0.8)_0%,rgba(4,4,7,0.88)_58%,rgba(16,18,35,0.82)_100%)] px-5 py-20 shadow-[inset_0_2px_16px_rgba(255,255,255,0.12),inset_0_-38px_70px_rgba(101,111,255,0.18),0_24px_70px_rgba(0,0,0,0.36)] backdrop-blur-[12px] sm:min-h-[720px] sm:rounded-[54px] sm:px-8 sm:py-24 lg:px-10">
      <div className="pointer-events-none absolute inset-x-[4%] bottom-[-8%] z-[1] h-52 rounded-[50%] bg-[#6370ff]/22 blur-[76px]" />
      <div className="pointer-events-none absolute right-[10%] top-[12%] z-[1] h-40 w-40 rounded-full bg-[#4f59ff]/10 blur-[72px]" />
      <div className="relative z-10 mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center text-center">
        <p className="font-mono text-[10px] uppercase tracking-[0.24em] text-[#ff572a]">■ &nbsp; Let’s work together</p>
        <h2 className="mt-7 font-heading text-[clamp(4.5rem,12vw,11rem)] font-medium leading-[0.82] tracking-[-0.075em]">
          Say Hello.
        </h2>
        <p className="mt-10 max-w-2xl text-base leading-7 text-white/60 sm:text-xl sm:leading-8">
          I’m always interested in hearing about new projects and opportunities.
        </p>
        <div className="mt-12 flex flex-col items-center justify-center gap-5 rounded-full border border-white/10 bg-black/25 px-7 py-5 backdrop-blur-md sm:flex-row sm:gap-8 sm:px-10">
          <a
            href={`mailto:${MARCUS_PROFILE.email}`}
            className="font-heading text-lg tracking-[-0.025em] text-white transition-opacity hover:opacity-55 sm:text-2xl"
          >
            {MARCUS_PROFILE.email}
          </a>
          <span className="hidden h-5 w-px bg-white/25 sm:block" aria-hidden="true" />
          <a
            href={`mailto:${MARCUS_PROFILE.email}?subject=Portfolio%20enquiry`}
            className="inline-flex items-center gap-3 font-heading text-lg text-white underline decoration-white/30 underline-offset-8 transition-opacity hover:opacity-55 sm:text-2xl"
          >
            Leave a message <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </div>
  </section>
);
