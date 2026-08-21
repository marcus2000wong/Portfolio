import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { CircularTimeline } from './components/CircularTimeline';
import { AwardCursor } from './components/AwardCursor';
import { CinematicRouteTransition } from './components/CinematicRouteTransition';
import { ContactSection } from './components/ContactSection';
import { HeroSection } from './components/HeroSection';
import { PortfolioModal } from './components/PortfolioModal';
import { Toast } from './components/Toast';
import { VideoBackground } from './components/VideoBackground';
import { WhatIDoSection } from './components/WhatIDoSection';
import { WhiteNoiseCanvas } from './components/WhiteNoiseCanvas';
import type { ModalType } from './types';

const PortfolioSection = lazy(() => import('./components/PortfolioSection').then((module) => ({
  default: module.PortfolioSection,
})));

export default function App() {
  const [currentPath, setCurrentPath] = useState(window.location.pathname);
  const [activeModal, setActiveModal] = useState<ModalType>(null);
  const [, setProjectModalOpen] = useState(false);
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

  useEffect(() => {
    const handlePopState = () => setCurrentPath(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const handleRouteNavigate = useCallback((url: URL) => {
    setCurrentPath(url.pathname);
    window.requestAnimationFrame(() => {
      document.querySelectorAll('video').forEach((video) => {
        void video.play().catch(() => undefined);
      });
      if (url.hash) document.querySelector(url.hash)?.scrollIntoView();
      else window.scrollTo({ top: 0, behavior: 'auto' });
    });
  }, []);

  const isProjectsPage = currentPath === '/projects';

  return (
    <div className="relative min-h-screen w-full bg-black text-white selection:bg-white selection:text-black">
      <CinematicRouteTransition onNavigate={handleRouteNavigate} />
      <AwardCursor />
      {isProjectsPage ? (
        <>
        <WhiteNoiseCanvas />
        <VideoBackground
          src='/background/bg.mp4'
          overlayOpacity={0.32}
        />
        <div className="fixed inset-x-0 top-0 z-[70] h-28 bg-gradient-to-b from-black/95 via-black/70 to-transparent" />
        <div className="site-nav-text fixed left-5 top-7 z-[180] hidden text-white/55 sm:left-8 sm:top-9 lg:left-10 lg:block">Good morning!</div>
        <nav aria-label="Projects navigation" className="site-nav-text fixed inset-x-5 top-7 z-[180] flex items-center justify-between sm:inset-x-8 sm:top-9 lg:inset-x-10">
          <div className="flex items-center gap-5 sm:gap-8 lg:absolute lg:right-[29%]">
            <a href="/" className="text-white/55 transition hover:text-white">Home</a>
            <a href="/#what-i-do" className="text-white/55 transition hover:text-white">What I do</a>
            <a href="/projects" aria-current="page" className="text-white">Projects</a>
          </div>
          <a href="/designer_Resume_wong_marcus.pdf" download className="ml-auto border-b border-white/70 pb-1 text-white transition hover:border-[#4D7CFF] hover:text-[#4D7CFF]">Download CV</a>
        </nav>
        <Suspense fallback={<div className="h-screen min-h-[720px] bg-black" aria-label="Loading project gallery" />}>
          <PortfolioSection onModalChange={setProjectModalOpen} />
        </Suspense>
        <Toast message={toastMessage} onClose={() => setToastMessage(null)} />
        </>
      ) : (
        <>
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
        </>
      )}
    </div>
  );
}
