import React from 'react';
import { motion, useMotionTemplate, useMotionValue, useReducedMotion, useSpring } from 'motion/react';
import { MARCUS_PROFILE } from '../data/portfolioData';

export const ContactSection: React.FC = () => {
  const reduceMotion = useReducedMotion();
  const pointerX = useMotionValue(520);
  const pointerY = useMotionValue(340);
  const smoothPointerX = useSpring(pointerX, { stiffness: 180, damping: 28, mass: 0.35 });
  const smoothPointerY = useSpring(pointerY, { stiffness: 180, damping: 28, mass: 0.35 });
  const spotlight = useMotionTemplate`radial-gradient(420px circle at ${smoothPointerX}px ${smoothPointerY}px, rgba(77,124,255,0.16), rgba(77,124,255,0.05) 38%, transparent 72%)`;

  return (
    <section
      id="contact"
      className="relative z-20 -mt-px bg-black/70 px-4 py-10 text-white backdrop-blur-[12px] sm:px-7 sm:py-14 lg:px-10 lg:py-16"
    >
      <motion.div
        initial={reduceMotion ? undefined : { opacity: 0, y: 56, scale: 0.985 }}
        whileInView={{ opacity: 1, y: 0, scale: 1 }}
        viewport={{ once: true, amount: 0.18 }}
        transition={{ duration: reduceMotion ? 0.01 : 0.95, ease: [0.16, 1, 0.3, 1] }}
        onPointerLeave={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          pointerX.set(bounds.width * 0.5);
          pointerY.set(bounds.height * 0.5);
        }}
        onPointerMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect();
          pointerX.set(event.clientX - bounds.left);
          pointerY.set(event.clientY - bounds.top);
        }}
        className="relative isolate mx-auto flex min-h-[650px] max-w-[1500px] overflow-hidden rounded-[38px] border border-white/10 bg-[linear-gradient(180deg,rgba(20,20,20,0.8)_0%,rgba(4,4,7,0.88)_58%,rgba(16,18,35,0.82)_100%)] px-5 py-20 shadow-[inset_0_2px_16px_rgba(255,255,255,0.12),inset_0_-38px_70px_rgba(101,111,255,0.18),0_24px_70px_rgba(0,0,0,0.36)] backdrop-blur-[12px] sm:min-h-[720px] sm:rounded-[54px] sm:px-8 sm:py-24 lg:px-10"
      >
        <motion.div className="pointer-events-none absolute inset-0 z-[3]" style={{ background: spotlight }} />
        <motion.div
          className="pointer-events-none absolute inset-x-[8%] bottom-[-16%] z-[1] h-56 rounded-[50%] bg-[#4D7CFF]/12 blur-[78px] will-change-transform"
          animate={reduceMotion ? undefined : {
            x: ['-7%', '6%', '-3%', '-7%'],
            y: [8, -14, 4, 8],
            scaleX: [0.9, 1.14, 0.98, 0.9],
            opacity: [0.5, 0.9, 0.65, 0.5],
          }}
          transition={{ duration: 9, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
        />
        <motion.div
          className="pointer-events-none absolute right-[7%] top-[8%] z-[1] h-48 w-48 rounded-full bg-[#4D7CFF]/12 blur-[72px] will-change-transform"
          animate={reduceMotion ? undefined : {
            x: [0, -70, 25, 0],
            y: [0, 42, 88, 0],
            scale: [0.8, 1.2, 0.95, 0.8],
            opacity: [0.28, 0.58, 0.34, 0.28],
          }}
          transition={{ duration: 11, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
        />
        <motion.div
          className="pointer-events-none absolute -left-[35%] top-0 z-[2] h-full w-[24%] -skew-x-12 bg-gradient-to-r from-transparent via-white/[0.055] to-transparent"
          animate={reduceMotion ? undefined : { x: ['0%', '650%'] }}
          transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 3.8, ease: [0.76, 0, 0.24, 1] }}
        />

        <div className="pointer-events-none absolute bottom-8 right-8 z-[6] hidden items-center gap-3 font-mono text-[8px] uppercase text-white/25 sm:flex">
          Hong Kong · Worldwide
          <motion.span
            className="h-1.5 w-1.5 rounded-full bg-[#4D7CFF] shadow-[0_0_10px_rgba(77,124,255,0.9)]"
            animate={reduceMotion ? undefined : { opacity: [0.25, 1, 0.25], scale: [0.8, 1.2, 0.8] }}
            transition={{ duration: 2.2, repeat: Infinity, ease: [0.45, 0, 0.55, 1] }}
          />
        </div>

        <div className="relative z-10 mx-auto flex max-w-5xl flex-1 flex-col items-center justify-center text-center">
          <motion.p
            initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.55, delay: reduceMotion ? 0 : 0.18, ease: [0.16, 1, 0.3, 1] }}
            className="font-mono text-[15px] uppercase text-[#4D7CFF]"
          >
            ■ Let’s work together
          </motion.p>
          <div className="mt-7 overflow-hidden py-2">
            <motion.h2
              initial={false}
              animate={{ y: '0%', rotateX: 0 }}
              transition={{ duration: 0.9, delay: reduceMotion ? 0 : 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ transformPerspective: 900 }}
              className="font-heading text-[clamp(4.5rem,12vw,11rem)] font-medium leading-[0.82]"
            >
              Say Hello.
            </motion.h2>
          </div>
          <motion.p
            initial={reduceMotion ? undefined : { opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: reduceMotion ? 0 : 0.38, ease: [0.16, 1, 0.3, 1] }}
            className="mt-8 max-w-2xl text-base leading-7 text-white/60 sm:text-xl sm:leading-8"
          >
            I’m always interested in hearing about new projects and opportunities.
          </motion.p>
          <motion.div
            initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.65, delay: reduceMotion ? 0 : 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 grid w-full max-w-3xl overflow-hidden rounded-[24px] border border-white/10 bg-black/20 text-left backdrop-blur-md sm:grid-cols-2"
          >
            <a
              href={`mailto:${MARCUS_PROFILE.email}`}
              className="group relative flex min-h-32 flex-col justify-between overflow-hidden border-b border-white/10 p-5 sm:min-h-40 sm:border-b-0 sm:border-r sm:p-7"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-[#4D7CFF] transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
              <span className="relative z-10 flex items-center justify-between font-mono text-[9px] uppercase text-white/35 transition-colors group-hover:text-white/75">
                Direct email
                <span>01</span>
              </span>
              <span className="relative z-10 mt-8 break-all font-heading text-lg text-white sm:text-[1.35rem]">
                {MARCUS_PROFILE.email}
              </span>
            </a>
            <a
              href={`mailto:${MARCUS_PROFILE.email}?subject=Portfolio%20enquiry`}
              className="group relative flex min-h-32 flex-col justify-between overflow-hidden p-5 sm:min-h-40 sm:p-7"
            >
              <span className="absolute inset-0 origin-bottom scale-y-0 bg-white transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-y-100" />
              <span className="relative z-10 flex items-center justify-between font-mono text-[9px] uppercase text-white/35 transition-colors group-hover:text-black/55">
                Start a conversation
                <span>02</span>
              </span>
              <span className="relative z-10 mt-8 flex items-end justify-between font-heading text-2xl text-white transition-colors group-hover:text-black sm:text-3xl">
                Leave a message
                <motion.span
                  aria-hidden="true"
                  className="text-lg"
                  animate={reduceMotion ? undefined : { x: [0, 4, 0], y: [0, -4, 0] }}
                  transition={{ duration: 1.8, repeat: Infinity, repeatDelay: 1.2, ease: [0.16, 1, 0.3, 1] }}
                >
                  ↗
                </motion.span>
              </span>
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};
