import React, { useState } from 'react';
import { ModalType } from '../types';

interface NavbarProps {
  onOpenModal: (type: ModalType) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ onOpenModal }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
    setMobileMenuOpen(false);
  };

  const handleNavClick = (type: ModalType) => {
    onOpenModal(type);
    setMobileMenuOpen(false);
  };

  return (
    <>
      {/* FLOATING FUTURISTIC GLASS NAVBAR CONTAINER */}
      <header className="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-50 w-[94%] max-w-6xl transition-all duration-500">
        <div className="relative w-full px-5 sm:px-7 py-3 sm:py-3.5 rounded-2xl sm:rounded-full bg-black/65 backdrop-blur-2xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.85),inset_0_1px_1px_rgba(255,255,255,0.25)] hover:border-white/30 transition-all duration-500 flex justify-between items-center group/nav">
          
          {/* Subtle Ambient Top Border Highlight */}
          <div className="absolute inset-x-6 top-0 h-[1px] bg-gradient-to-r from-transparent via-white/40 to-transparent pointer-events-none" />

          {/* Logo (left) */}
          <button
            onClick={() => {
              window.scrollTo({ top: 0, behavior: 'smooth' });
              setMobileMenuOpen(false);
            }}
            className="flex items-center gap-2.5 text-left group/logo cursor-pointer focus:outline-none"
            aria-label="Mainframe Home"
          >
            {/* Live Glowing Cyber Status Light */}
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400 shadow-[0_0_10px_#34d399]" />
            </span>

            <span
              className="font-heading text-[18px] sm:text-[22px] text-white select-none transition-all duration-300 group-hover/logo:text-emerald-300 group-hover/logo:drop-shadow-[0_0_12px_rgba(52,211,153,0.8)]"
              style={{ fontFamily: 'var(--font-heading)' }}
            >
              Mainframe®
            </span>
            <span className="text-[18px] sm:text-[20px] text-white/70 select-none transition-transform duration-700 group-hover/logo:rotate-180 group-hover/logo:text-emerald-300">
              ✳︎
            </span>
          </button>

          {/* Desktop nav links (center, hidden below md) */}
          <nav
            className="hidden md:flex items-center gap-1 sm:gap-2 text-sm lg:text-base text-zinc-300 font-medium"
            style={{ fontFamily: 'var(--font-body)' }}
          >
            {[
              { label: 'About Me', action: () => scrollToSection('about') },
              { label: 'Timeline', action: () => scrollToSection('timeline') },
              { label: 'Portfolio', action: () => scrollToSection('portfolio') },
              { label: 'Labs', action: () => handleNavClick('labs') },
              { label: 'Openings', action: () => handleNavClick('openings') },
            ].map((item, idx) => (
              <button
                key={idx}
                onClick={item.action}
                className="relative px-3.5 py-1.5 rounded-full text-zinc-300 hover:text-white transition-all duration-300 hover:bg-white/10 hover:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:border hover:border-white/20 border border-transparent cursor-pointer focus:outline-none text-xs lg:text-sm uppercase font-mono"
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Desktop CTA (right, hidden below md) */}
          <button
            onClick={() => handleNavClick('pitch')}
            className="hidden md:flex items-center gap-2 relative overflow-hidden text-xs lg:text-sm font-mono font-bold text-black bg-white hover:bg-emerald-300 px-5 py-2.5 rounded-full transition-all duration-300 shadow-[0_0_15px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(52,211,153,0.8)] hover:scale-[1.03] cursor-pointer focus:outline-none"
          >
            <span>GET IN TOUCH</span>
            <span className="text-sm transition-transform duration-300 group-hover:translate-x-0.5">↗</span>
          </button>

          {/* Mobile hamburger (visible below md) */}
          <button
            onClick={toggleMobileMenu}
            className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-[5px] z-[51] focus:outline-none cursor-pointer rounded-full bg-white/10 hover:bg-white/20 border border-white/20 transition-all duration-300 hover:shadow-[0_0_15px_rgba(255,255,255,0.4)]"
            aria-label="Toggle Navigation Menu"
          >
            <span
              className={`w-5 h-[2px] bg-white transition-all duration-300 transform origin-center ${
                mobileMenuOpen ? 'translate-y-[7px] rotate-45 bg-emerald-300 shadow-[0_0_8px_#34d399]' : ''
              }`}
            />
            <span
              className={`w-5 h-[2px] bg-white transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : 'opacity-100'
              }`}
            />
            <span
              className={`w-5 h-[2px] bg-white transition-all duration-300 transform origin-center ${
                mobileMenuOpen ? '-translate-y-[7px] -rotate-45 bg-emerald-300 shadow-[0_0_8px_#34d399]' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* MOBILE FUTURISTIC GLASS MENU OVERLAY */}
      <div
        className={`fixed inset-x-4 top-20 z-40 p-6 rounded-3xl bg-black/90 backdrop-blur-2xl border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9),0_0_30px_rgba(52,211,153,0.15)] flex flex-col gap-4 transition-all duration-300 md:hidden ${
          mobileMenuOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 -translate-y-4 pointer-events-none'
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-3 font-mono text-xs text-emerald-400">
          <span>// NAVIGATION MENU</span>
          <span>SYSTEM ONLINE</span>
        </div>

        {[
          { label: 'About Me', action: () => scrollToSection('about') },
          { label: 'Timeline', action: () => scrollToSection('timeline') },
          { label: 'Portfolio & Works', action: () => scrollToSection('portfolio') },
          { label: 'Labs', action: () => handleNavClick('labs') },
          { label: 'Openings', action: () => handleNavClick('openings') },
        ].map((item, idx) => (
          <button
            key={idx}
            onClick={item.action}
            className="text-left text-xl font-mono font-medium text-zinc-200 hover:text-emerald-300 hover:translate-x-2 transition-all duration-300 py-1.5 hover:drop-shadow-[0_0_10px_rgba(52,211,153,0.6)] cursor-pointer"
          >
            {item.label}
          </button>
        ))}

        <button
          onClick={() => handleNavClick('pitch')}
          className="mt-2 w-full py-3 rounded-2xl bg-white text-black font-mono font-bold text-center hover:bg-emerald-300 transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.4)] hover:shadow-[0_0_30px_rgba(52,211,153,0.8)] cursor-pointer"
        >
          GET IN TOUCH ↗
        </button>
      </div>
    </>
  );
};

