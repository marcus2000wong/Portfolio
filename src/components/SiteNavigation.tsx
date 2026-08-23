import React from 'react';

type NavSection = 'home' | 'what-i-do' | 'projects';

interface SiteNavigationProps {
  activeSection: NavSection;
  context: 'home' | 'projects';
  ariaLabel: string;
  className?: string;
  onSectionSelect?: (section: 'home' | 'what-i-do') => void;
}

export const SiteNavigation: React.FC<SiteNavigationProps> = ({
  activeSection,
  context,
  ariaLabel,
  className = '',
  onSectionSelect,
}) => {
  const links: Array<{ section: NavSection; label: string; href: string }> = [
    { section: 'home', label: 'Home', href: context === 'projects' ? '/' : '#home' },
    { section: 'what-i-do', label: 'What I do', href: context === 'projects' ? '/#what-i-do' : '#what-i-do' },
    { section: 'projects', label: 'Projects', href: '/projects' },
  ];

  return (
    <nav
      data-cursor-passive
      aria-label={ariaLabel}
      className={`site-nav-text fixed inset-x-5 top-7 flex items-center justify-between sm:inset-x-8 sm:top-9 lg:inset-x-10 ${className}`}
    >
      <div className="flex items-center gap-5 sm:gap-8 lg:absolute lg:right-[29%]">
        {links.map(({ section, label, href }) => {
          const isActive = activeSection === section;
          return (
            <a
              key={section}
              href={href}
              aria-label={label}
              aria-current={isActive ? 'page' : undefined}
              data-label={label}
              onClick={section !== 'projects' ? () => onSectionSelect?.(section) : undefined}
              className={`award-nav-link ${isActive ? 'is-active text-white' : 'text-white/55'}`}
            >
              <span>{label}</span>
            </a>
          );
        })}
      </div>
      <a
        href="/designer_Resume_wong_marcus.pdf"
        aria-label="Download CV"
        download
        data-label="Download CV"
        className="award-nav-link award-nav-link--download ml-auto text-white"
      >
        <span>Download CV</span>
      </a>
    </nav>
  );
};
