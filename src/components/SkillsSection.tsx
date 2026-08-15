import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';

interface MetricItem {
  title: string;
  subtitle: string;
  value: number;
}

interface CategoryData {
  id: string;
  tabName: string;
  headerTitle: string;
  metrics: MetricItem[];
}

const CATEGORIES: CategoryData[] = [
  {
    id: 'materials',
    tabName: 'Materials & Manufacturing',
    headerTitle: 'MATERIALS & MANUFACTURING',
    metrics: [
      {
        title: 'Nickel superalloy margin',
        subtitle: 'thermal headroom',
        value: 91,
      },
      {
        title: 'Additive chamber tooling',
        subtitle: 'lead-time reduction',
        value: 72,
      },
      {
        title: 'Sub-micron inspection yield',
        subtitle: 'accepted components',
        value: 95,
      },
      {
        title: 'Reusable test article cycles',
        subtitle: 'qualification depth',
        value: 84,
      },
    ],
  },
  {
    id: 'spatial',
    tabName: 'Spatial & Vision OS',
    headerTitle: 'SPATIAL & VISION COMPUTING',
    metrics: [
      {
        title: '3D Spatial interface ergonomics',
        subtitle: 'visionOS gesture latency',
        value: 96,
      },
      {
        title: 'Volumetric mesh rendering',
        subtitle: '60fps frame budget stability',
        value: 88,
      },
      {
        title: 'Multi-brand design system depth',
        subtitle: 'component tokenization',
        value: 94,
      },
      {
        title: 'Eye-tracking raycast precision',
        subtitle: 'foveated interaction model',
        value: 92,
      },
    ],
  },
  {
    id: 'graphics',
    tabName: 'WebGL & GPU Shaders',
    headerTitle: 'GRAPHICS & GPU PIPELINE',
    metrics: [
      {
        title: 'Custom GLSL fragment shaders',
        subtitle: 'liquid heightmap raymarching',
        value: 93,
      },
      {
        title: 'TypeScript / React 18 architecture',
        subtitle: 'type-safe state orchestration',
        value: 98,
      },
      {
        title: 'GPU particle compute engines',
        subtitle: 'stippled point-cloud simulations',
        value: 89,
      },
      {
        title: 'Tailwind & Motion transitions',
        subtitle: 'fluid physics micro-interactions',
        value: 95,
      },
    ],
  },
  {
    id: 'ai-systems',
    tabName: 'Generative AI & LLMs',
    headerTitle: 'INTELLIGENCE & BACKEND',
    metrics: [
      {
        title: 'Gemini API multi-modal pipelines',
        subtitle: 'contextual agent orchestration',
        value: 92,
      },
      {
        title: 'Real-time WebSocket synths',
        subtitle: 'low-latency bi-directional streams',
        value: 86,
      },
      {
        title: 'Full-stack Express API proxying',
        subtitle: 'secure server-side secret isolation',
        value: 90,
      },
      {
        title: 'Cloud Run container delivery',
        subtitle: 'scalable edge deployments',
        value: 87,
      },
    ],
  },
];

export const SkillsSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('materials');

  const currentData =
    CATEGORIES.find((c) => c.id === activeTab) || CATEGORIES[0];

  const gridSteps = [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100];

  return (
    <section
      id="skills"
      className="relative z-10 -mt-px w-full overflow-hidden bg-black/70 px-4 py-20 font-sans text-white backdrop-blur-[12px] sm:px-8 sm:py-28"
    >
      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* 1. TOP HEADER SECTION */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-start mb-10 sm:mb-14">
          <div className="md:col-span-7 lg:col-span-8">
            <h2 className="text-2xl sm:text-4xl lg:text-[42px] font-normal tracking-tight text-white/95 leading-[1.18]">
              Unmatched propulsion data across every flight-critical layer.
            </h2>
          </div>
          <div className="md:col-span-5 lg:col-span-4">
            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed font-normal">
              Mainframe® combines high-temperature alloys, additive tooling, and inspection data to compress the path from design lock to certified hardware.
            </p>
          </div>
        </div>

        {/* 2. HORIZONTAL TAB NAVIGATION */}
        <div className="w-full border-b border-zinc-800/90 mb-8 sm:mb-10 overflow-x-auto no-scrollbar">
          <div className="flex items-center gap-8 sm:gap-12 min-w-max pb-3">
            {CATEGORIES.map((cat) => {
              const isActive = cat.id === activeTab;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`relative text-xs sm:text-sm font-medium transition-colors duration-300 pb-3 cursor-pointer focus:outline-none ${
                    isActive ? 'text-white' : 'text-zinc-500 hover:text-zinc-300'
                  }`}
                >
                  {cat.tabName}

                  {/* Active Glowing Tab Indicator Bar */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTabUnderline"
                      className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-gradient-to-r from-blue-400 via-indigo-300 to-sky-200 shadow-[0_0_12px_rgba(147,197,253,0.9)]"
                      transition={{ type: 'spring', stiffness: 400, damping: 32 }}
                    />
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* 3. TECHNICAL METRICS CONSOLE CARD */}
        <div className="w-full rounded-2xl bg-[#0c0d12] border border-white/10 p-5 sm:p-8 shadow-[0_25px_60px_rgba(0,0,0,0.95)] relative overflow-hidden">
          
          {/* Card Top Title Row */}
          <div className="flex items-center justify-between border-b border-zinc-800/80 pb-4 mb-8 font-mono text-[10px] sm:text-xs tracking-widest text-zinc-400 uppercase">
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              {currentData.headerTitle}
            </span>
            <span className="text-zinc-500">OPERATING ENVELOPE</span>
          </div>

          {/* Grid Chart Body */}
          <div className="relative w-full">
            
            {/* BACKGROUND VERTICAL GRID LINES (0% to 100%) */}
            <div className="absolute inset-y-0 left-0 md:left-[35%] lg:left-[30%] right-0 pointer-events-none flex justify-between">
              {gridSteps.map((step) => (
                <div
                  key={step}
                  className="w-[1px] h-full bg-zinc-800/40 border-r border-dashed border-zinc-800/30"
                />
              ))}
            </div>

            {/* Metrics Rows */}
            <AnimatePresence mode="wait">
              <motion.div
                key={currentData.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.22 }}
                className="space-y-6 sm:space-y-7 relative z-10"
              >
                {currentData.metrics.map((item, idx) => (
                  <div
                    key={idx}
                    className="grid grid-cols-1 md:grid-cols-12 gap-3 md:gap-6 items-center group/row"
                  >
                    {/* Left Column: Skill Label */}
                    <div className="md:col-span-4 lg:col-span-3">
                      <h3 className="text-white text-xs sm:text-sm font-semibold tracking-tight group-hover/row:text-blue-200 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-zinc-500 text-[11px] font-mono mt-0.5">
                        {item.subtitle}
                      </p>
                    </div>

                    {/* Right Column: Metallic Bar Chart & Percentage */}
                    <div className="md:col-span-8 lg:col-span-9 flex items-center gap-4">
                      
                      {/* Bar Track Area */}
                      <div className="flex-1 h-9 sm:h-10 rounded-md bg-zinc-950/60 border border-zinc-800/50 relative overflow-hidden flex items-center p-0.5">
                        
                        {/* Metallic Gradient Bar */}
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: `${item.value}%` }}
                          transition={{ duration: 0.75, delay: idx * 0.08, ease: 'easeOut' }}
                          className="h-full rounded-[4px] bg-gradient-to-r from-[#4b6d9a] via-[#8bb0e0] to-[#d8e8ff] shadow-[0_0_18px_rgba(147,197,253,0.3)] relative overflow-hidden flex items-center justify-end pr-2"
                        >
                          {/* Inner Shimmer Effect */}
                          <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.4),transparent)] animate-[shimmer_3s_infinite]" />

                          {/* Specular Starlight Sparkles inside bar */}
                          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 text-white/70 text-[9px]">✦</div>
                          <div className="absolute top-1/3 left-2/3 -translate-y-1/2 text-white/80 text-[10px]">✦</div>
                          <div className="relative z-10 w-1.5 h-1.5 rounded-full bg-white shadow-[0_0_6px_#ffffff]" />
                        </motion.div>
                      </div>

                      {/* Percentage Number Badge */}
                      <div className="w-12 sm:w-14 h-9 sm:h-10 rounded-md bg-[#12141c] border border-white/10 flex items-center justify-center font-mono text-xs sm:text-sm font-bold text-white shadow-inner shrink-0">
                        {item.value}%
                      </div>
                    </div>
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Bottom Calibration Axis Numbers (0, 10, 20... 100) */}
            <div className="mt-8 pt-4 border-t border-zinc-800/70 grid grid-cols-1 md:grid-cols-12 gap-0 items-center font-mono text-[9px] sm:text-[10px] text-zinc-500">
              <div className="hidden md:block md:col-span-4 lg:col-span-3" />
              <div className="col-span-12 md:col-span-8 lg:col-span-9 flex justify-between px-0.5">
                {gridSteps.map((step) => (
                  <span key={step} className="text-center w-4">{step}</span>
                ))}
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
};
