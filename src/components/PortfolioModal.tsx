import React, { useState } from 'react';
import {
  EXPERIENCES,
  MARCUS_PROFILE,
  PROJECTS,
  SKILL_GROUPS,
} from '../data/portfolioData';
import { ModalType } from '../types';

interface PortfolioModalProps {
  type: ModalType;
  onClose: () => void;
  onCopyEmail: (email: string) => void;
}

export const PortfolioModal: React.FC<PortfolioModalProps> = ({
  type,
  onClose,
  onCopyEmail,
}) => {
  const [activeTab, setActiveTab] = useState<
    'studio' | 'labs' | 'openings' | 'contact' | 'pitch'
  >(type || 'studio');

  const [pitchForm, setPitchForm] = useState({
    name: '',
    email: '',
    service: 'Web Architecture & Design',
    budget: '$10k - $25k',
    message: '',
  });

  const [submitted, setSubmitted] = useState(false);

  if (!type) return null;

  const handlePitchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2500);
  };

  return (
    <div className="fixed inset-0 z-[50] flex items-center justify-center p-3 sm:p-6 md:p-10 bg-black/80 backdrop-blur-xl animate-fadeIn">
      {/* Modal backdrop click */}
      <div
        className="absolute inset-0"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-4xl max-h-[90vh] bg-zinc-950/90 border border-zinc-800/80 rounded-2xl sm:rounded-3xl shadow-2xl flex flex-col overflow-hidden text-white">
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-zinc-800/80 bg-zinc-900/50">
          <div className="flex items-center gap-3">
            <span className="font-heading text-xl sm:text-2xl text-white">
              Mainframe®
            </span>
            <span className="text-zinc-500 text-sm hidden sm:inline">|</span>
            <span className="text-zinc-400 text-sm sm:text-base font-normal">
              Online Portfolio & Agency Hub
            </span>
          </div>

          <button
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-zinc-800/80 hover:bg-zinc-700 text-zinc-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Modal Navigation Tabs */}
        <div className="flex overflow-x-auto border-b border-zinc-800/80 bg-zinc-900/30 px-6 sm:px-8 py-2 gap-2 text-sm sm:text-base scrollbar-none">
          <button
            onClick={() => setActiveTab('studio')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'studio'
                ? 'bg-white text-black font-medium'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            Studio & Profile
          </button>
          <button
            onClick={() => setActiveTab('labs')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'labs'
                ? 'bg-white text-black font-medium'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            Labs & Works ({PROJECTS.length})
          </button>
          <button
            onClick={() => setActiveTab('openings')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'openings'
                ? 'bg-white text-black font-medium'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            Experience & Skills
          </button>
          <button
            onClick={() => setActiveTab('pitch')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'pitch'
                ? 'bg-white text-black font-medium'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            Pitch an Idea
          </button>
          <button
            onClick={() => setActiveTab('contact')}
            className={`px-4 py-2 rounded-full whitespace-nowrap transition-colors cursor-pointer ${
              activeTab === 'contact'
                ? 'bg-white text-black font-medium'
                : 'text-zinc-400 hover:text-white hover:bg-zinc-800/50'
            }`}
          >
            Contact & Shop
          </button>
        </div>

        {/* Modal Body Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 max-h-[calc(90vh-140px)]">
          {/* TAB 1: STUDIO & MARCUS WONG PROFILE */}
          {(activeTab === 'studio' || activeTab === 'contact') && (
            <div className="space-y-6">
              <div className="border-b border-zinc-800/80 pb-6">
                <div className="inline-block px-3 py-1 bg-zinc-800 text-zinc-300 rounded-full text-xs uppercase tracking-wider mb-3">
                  Lead Designer & Developer
                </div>
                <h2 className="text-2xl sm:text-3xl font-heading text-white">
                  {MARCUS_PROFILE.name} — {MARCUS_PROFILE.title}
                </h2>
                <p className="mt-3 text-zinc-300 text-base sm:text-lg leading-relaxed max-w-3xl">
                  {MARCUS_PROFILE.summary}
                </p>
              </div>

              {/* Contact Cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <div className="text-zinc-400 text-xs uppercase tracking-wider">
                    Direct Email
                  </div>
                  <button
                    onClick={() => onCopyEmail(MARCUS_PROFILE.email)}
                    className="mt-1 text-white font-medium hover:underline text-sm sm:text-base break-all cursor-pointer text-left"
                  >
                    {MARCUS_PROFILE.email}
                  </button>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <div className="text-zinc-400 text-xs uppercase tracking-wider">
                    Phone / WhatsApp
                  </div>
                  <a
                    href={`tel:${MARCUS_PROFILE.phone}`}
                    className="mt-1 text-white font-medium hover:underline text-sm sm:text-base block"
                  >
                    {MARCUS_PROFILE.phone}
                  </a>
                </div>

                <div className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80">
                  <div className="text-zinc-400 text-xs uppercase tracking-wider">
                    Behance Portfolio
                  </div>
                  <a
                    href={MARCUS_PROFILE.behance}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-1 text-white font-medium hover:underline text-sm sm:text-base block truncate"
                  >
                    behance.net/marcuswong14 ↗
                  </a>
                </div>
              </div>

              {/* Education */}
              <div className="pt-2">
                <h3 className="text-lg font-medium text-white mb-3">
                  Education & Background
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {MARCUS_PROFILE.education.map((edu, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60"
                    >
                      <div className="text-sm font-semibold text-white">
                        {edu.degree}
                      </div>
                      <div className="text-sm text-zinc-400">
                        {edu.institution}
                      </div>
                      <div className="text-xs text-zinc-500 mt-1">
                        {edu.period}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* TAB 2: LABS & WORKS */}
          {activeTab === 'labs' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-heading text-white">
                  Labs & Creative Works
                </h2>
                <p className="text-zinc-400 text-sm mt-1">
                  Selected projects across web design, motion graphics, 3D
                  interfaces, and AI creative workflows.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PROJECTS.map((project) => (
                  <div
                    key={project.id}
                    className="group rounded-2xl bg-zinc-900/60 border border-zinc-800/80 overflow-hidden hover:border-zinc-600 transition-all duration-300 flex flex-col"
                  >
                    <div className="relative h-48 overflow-hidden bg-zinc-950">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-90 group-hover:opacity-100"
                        referrerPolicy="no-referrer"
                      />
                      <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-zinc-200 text-xs px-2.5 py-1 rounded-full border border-white/10">
                        {project.category}
                      </div>
                      <div className="absolute bottom-3 right-3 bg-black/70 backdrop-blur-md text-zinc-400 text-xs px-2 py-0.5 rounded">
                        {project.year}
                      </div>
                    </div>

                    <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
                      <div>
                        <div className="text-xs text-zinc-500">
                          {project.client}
                        </div>
                        <h3 className="text-lg font-semibold text-white mt-0.5">
                          {project.title}
                        </h3>
                        <p className="text-xs sm:text-sm text-zinc-300 mt-2 leading-relaxed">
                          {project.description}
                        </p>
                      </div>

                      <div className="flex flex-wrap gap-1.5 pt-2">
                        {project.tags.map((tag, idx) => (
                          <span
                            key={idx}
                            className="text-[11px] bg-zinc-800/80 text-zinc-300 px-2.5 py-0.5 rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* TAB 3: OPENINGS, EXPERIENCE & SKILLS */}
          {activeTab === 'openings' && (
            <div className="space-y-8">
              {/* Work Experience */}
              <div>
                <h2 className="text-2xl font-heading text-white mb-4">
                  Professional Experience
                </h2>
                <div className="space-y-4">
                  {EXPERIENCES.map((exp, idx) => (
                    <div
                      key={idx}
                      className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 space-y-2"
                    >
                      <div className="flex flex-wrap justify-between items-start gap-2">
                        <div>
                          <h3 className="text-base sm:text-lg font-semibold text-white">
                            {exp.role}
                          </h3>
                          <div className="text-sm text-zinc-400">
                            {exp.company}
                          </div>
                        </div>
                        <span className="text-xs bg-zinc-800 text-zinc-300 px-3 py-1 rounded-full">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {exp.description}
                      </p>
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {exp.tags.map((tag, tIdx) => (
                          <span
                            key={tIdx}
                            className="text-[11px] bg-zinc-800/50 text-zinc-400 px-2 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Skills Matrix */}
              <div>
                <h2 className="text-xl font-heading text-white mb-4">
                  Technical & Creative Skills
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {SKILL_GROUPS.map((group, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 space-y-3"
                    >
                      <h3 className="text-sm font-medium text-zinc-300">
                        {group.category}
                      </h3>
                      <div className="space-y-2">
                        {group.skills.map((skill, sIdx) => (
                          <div key={sIdx}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-zinc-200">
                                {skill.name}
                              </span>
                              <span className="text-zinc-500">
                                {skill.level}%
                              </span>
                            </div>
                            <div className="w-full bg-zinc-800 h-1.5 rounded-full overflow-hidden">
                              <div
                                className="bg-white h-full rounded-full transition-all duration-500"
                                style={{ width: `${skill.level}%` }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Agency Openings */}
              <div className="pt-4 border-t border-zinc-800/80">
                <h3 className="text-lg font-heading text-white mb-2">
                  Mainframe Agency Openings
                </h3>
                <p className="text-xs text-zinc-400 mb-4">
                  We are always seeking exceptional creative talent to partner
                  on groundbreaking digital design.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium text-white">
                        Creative Technologist
                      </div>
                      <div className="text-xs text-zinc-500">
                        Remote / Hong Kong · Full-time
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        onCopyEmail('careers@mainframe.co')
                      }
                      className="text-xs bg-white text-black px-3 py-1.5 rounded-full hover:bg-zinc-200 cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>

                  <div className="p-4 rounded-xl bg-zinc-900/80 border border-zinc-800 flex justify-between items-center">
                    <div>
                      <div className="text-sm font-medium text-white">
                        Motion & 3D Designer
                      </div>
                      <div className="text-xs text-zinc-500">
                        Contract / Hybrid
                      </div>
                    </div>
                    <button
                      onClick={() =>
                        onCopyEmail('careers@mainframe.co')
                      }
                      className="text-xs bg-white text-black px-3 py-1.5 rounded-full hover:bg-zinc-200 cursor-pointer"
                    >
                      Apply
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: PITCH US AN IDEA */}
          {activeTab === 'pitch' && (
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-heading text-white">
                  Pitch Us an Idea
                </h2>
                <p className="text-zinc-400 text-sm mt-1">
                  Have a new venture, web experience, or brand project in mind?
                  Send your brief directly to our team.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 rounded-2xl bg-zinc-900 border border-zinc-700 text-center space-y-3">
                  <div className="w-12 h-12 bg-white text-black rounded-full flex items-center justify-center mx-auto text-xl">
                    ✓
                  </div>
                  <h3 className="text-xl font-semibold text-white">
                    Pitch Received!
                  </h3>
                  <p className="text-sm text-zinc-400">
                    Thank you. Mainframe’s team will review your brief and get
                    back to you shortly.
                  </p>
                </div>
              ) : (
                <form onSubmit={handlePitchSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={pitchForm.name}
                        onChange={(e) =>
                          setPitchForm({ ...pitchForm, name: e.target.value })
                        }
                        placeholder="Alex Morgan"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                      />
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={pitchForm.email}
                        onChange={(e) =>
                          setPitchForm({ ...pitchForm, email: e.target.value })
                        }
                        placeholder="alex@company.com"
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1">
                        Primary Service
                      </label>
                      <select
                        value={pitchForm.service}
                        onChange={(e) =>
                          setPitchForm({ ...pitchForm, service: e.target.value })
                        }
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                      >
                        <option>Web Architecture & Design</option>
                        <option>3D & Motion Graphics</option>
                        <option>AI Workflow & Agents</option>
                        <option>Brand Identity & Socials</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1">
                        Target Budget
                      </label>
                      <select
                        value={pitchForm.budget}
                        onChange={(e) =>
                          setPitchForm({ ...pitchForm, budget: e.target.value })
                        }
                        className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                      >
                        <option>&lt; $10k</option>
                        <option>$10k - $25k</option>
                        <option>$25k - $50k</option>
                        <option>$50k+</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs uppercase tracking-wider text-zinc-400 mb-1">
                      Project Details
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={pitchForm.message}
                      onChange={(e) =>
                        setPitchForm({ ...pitchForm, message: e.target.value })
                      }
                      placeholder="Tell us about your project goals, timelines, and vision..."
                      className="w-full bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-white"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full bg-white text-black font-medium py-3 rounded-xl hover:bg-zinc-200 transition-colors cursor-pointer text-sm"
                  >
                    Submit Pitch
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
