import { useState } from 'react';
import { CircularTimeline } from './components/CircularTimeline';
import { CinematicRouteTransition } from './components/CinematicRouteTransition';
import { ContactSection } from './components/ContactSection';
import { HeroSection } from './components/HeroSection';
import { PortfolioModal } from './components/PortfolioModal';
import { PortfolioSection } from './components/PortfolioSection';
import { Toast } from './components/Toast';
import { VideoBackground } from './components/VideoBackground';
import { WhatIDoSection } from './components/WhatIDoSection';
import { WhiteNoiseCanvas } from './components/WhiteNoiseCanvas';
import { ModalType } from './types';

export default function App() {
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(null);
    }, 3000);
  };

  const handleCopyEmail = (email: string = 'hello@mainframe.co') => {
    navigator.clipboard.writeText(email).then(() => {
      showToast(`Copied ${email} to clipboard!`);
    });
  };

  const isProjectsPage = window.location.pathname === '/projects';

  if (isProjectsPage) {
    return (
      <div className="relative min-h-screen w-full bg-black text-white selection:bg-white selection:text-black">
        
        <WhiteNoiseCanvas />
        <VideoBackground
          src="/background/bg.mp4"
          overlayOpacity={0.32}
        />
        <div className="fixed inset-x-0 top-0 z-[70] h-28 bg-gradient-to-b from-black/95 via-black/70 to-transparent" />
        <div className="site-nav-text fixed left-5 top-7 z-[80] hidden text-white/55 sm:left-8 sm:top-9 lg:left-10 lg:block">Good morning!</div>
        <nav aria-label="Projects navigation" className="site-nav-text fixed inset-x-5 top-7 z-[80] flex items-center justify-between sm:inset-x-8 sm:top-9 lg:inset-x-10">
          <div className="flex items-center gap-5 sm:gap-8 lg:absolute lg:right-[29%]">
            <a href="/" className="text-white/55 transition hover:text-white">Home</a>
            <a href="/#what-i-do" className="text-white/55 transition hover:text-white">What I do</a>
            <a href="/projects" className="text-white">Projects</a>
          </div>
          <a href="/designer_Resume_wong_marcus.pdf" download className="ml-auto border-b border-white/70 pb-1 text-white transition hover:border-[#4D7CFF] hover:text-[#4D7CFF]">Download CV</a>
        </nav>
        <PortfolioSection />
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
      </div>
    );
  }

  return (
    <div className="relative w-full min-h-screen bg-black text-white selection:bg-white selection:text-black">
      
      {/* Global White Animated Noise Canvas Layer */}
      <WhiteNoiseCanvas />

      {/* Global Mux live video background */}
      <VideoBackground
        src="/background/bg.mp4"
        overlayOpacity={0.25}
      />

      {/* HERO */}
      <div className="relative z-30">
        <HeroSection
          onOpenModal={(type) => setActiveModal(type)}
          onCopyEmail={() => handleCopyEmail('hello@mainframe.co')}
        />
      </div>

      {/* WHAT I DO */}
      <div className="relative z-20 ">
        <WhatIDoSection />
      </div>

      {/* Full-Screen Interactive Scroll Arc Career Timeline */}
      <CircularTimeline />

      <ContactSection />

      {/* Footer */}
      <footer className="relative z-10 -mt-px flex w-full flex-col items-center justify-between gap-4 bg-black/75 px-5 py-10 font-mono text-xs text-zinc-400 backdrop-blur-[12px] sm:flex-row sm:px-8 sm:text-sm">
        <div>
          © {new Date().getFullYear()} Mainframe® · Marcus Wong Portfolio
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => handleCopyEmail('marcus2000wong@yahoo.com')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            marcus2000wong@yahoo.com
          </button>
          <span>·</span>
          <a
            href="https://www.behance.net/marcuswong14"
            target="_blank"
            rel="noreferrer"
            className="hover:text-white transition-colors"
          >
            Behance ↗
          </a>
        </div>
      </footer>

      {/* Interactive dark-tone portfolio & agency modal */}
      <PortfolioModal
        type={activeModal}
        onClose={() => setActiveModal(null)}
        onCopyEmail={handleCopyEmail}
      />

      {/* Notification Toast */}
      <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
    </div>
  );
}
