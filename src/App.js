import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useInView } from 'framer-motion';
import {
  Github,
  Linkedin,
  Mail,
  Download,
  ChevronRight,
  ExternalLink,
  Menu,
  X,
  MapPin,
  GraduationCap,
  Briefcase,
  Award,
  ArrowUpRight,
} from 'lucide-react';
import './App.css';

// ─── Fade-in wrapper ────────────────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, className = '' }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-60px' });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Section heading ────────────────────────────────────────────────────────
const SectionHeading = ({ eyebrow, title, description }) => (
  <div className="mb-14 max-w-2xl">
    <FadeIn>
      <p className="text-violet-400 text-sm font-medium tracking-[0.18em] uppercase mb-3">
        {eyebrow}
      </p>
    </FadeIn>
    <FadeIn delay={0.05}>
      <h2 className="text-3xl sm:text-4xl font-semibold text-white font-display tracking-tight">
        {title}
      </h2>
    </FadeIn>
    {description && (
      <FadeIn delay={0.1}>
        <p className="mt-4 text-slate-400 leading-relaxed">{description}</p>
      </FadeIn>
    )}
  </div>
);

// ─── Data ───────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: 'About', id: 'about' },
  { label: 'Experience', id: 'experience' },
  { label: 'Projects', id: 'projects' },
  { label: 'Contact', id: 'contact' },
];

const HERO_STATS = [
  { value: '1M+', label: 'Users impacted' },
  { value: '2×', label: 'Hackathon wins' },
  { value: '4.10', label: 'GPA / 4.33' },
];

const SKILLS = [
  {
    group: 'Languages',
    items: ['Python', 'Java', 'TypeScript', 'JavaScript', 'C++', 'SQL'],
  },
  {
    group: 'Frameworks',
    items: ['React', 'Node.js', 'Express', 'Flask', 'JUnit', 'Mocha', 'Playwright'],
  },
  {
    group: 'Platforms & Tools',
    items: ['AWS (Bedrock, Lambda, Polly)', 'Docker', 'MongoDB', 'OracleDB', 'Git', 'GitLab', 'Jira'],
  },
];

const EXPERIENCES = [
  {
    role: 'Software Development Engineer Intern',
    company: 'Amazon',
    logo: '/images/amazon.png',
    location: 'Vancouver, BC',
    period: 'May 2026 — Aug 2026',
    blurb:
      'Joining the Applied Sciences team in Amazon Everyday Essentials, working on ML-powered recommendation and discovery experiences serving millions of customers.',
    bullets: [],
    tech: ['Applied ML', 'Recommendation Systems'],
    accent: 'incoming',
  },
  {
    role: 'Software Engineer Intern',
    company: 'D2L',
    logo: '/images/d2l.png',
    location: 'Vancouver, BC',
    period: 'Jan 2026 — Apr 2026',
    blurb:
      'Built full-stack GenAI features for Brightspace, the LMS used by 400+ institutions and powering 260K+ AI generations a year.',
    bullets: [
      'Shipped the AI Audio Overview feature end-to-end — a serverless pipeline using Claude (AWS Bedrock + Lambda) and Amazon Polly to generate natural narrated summaries of course content.',
      'Refined prompting strategies across GenAI features, reducing malformed outputs by ~30% and improving consistency across subject areas.',
      'Expanded Playwright E2E coverage by 28% and cut suite runtime by 32% with shared TestBench fixtures.',
    ],
    tech: ['TypeScript', 'AWS Bedrock', 'Lambda', 'Polly', 'Playwright'],
  },
  {
    role: 'Software Engineer Intern',
    company: 'Absolute Security',
    logo: '/images/absolute.png',
    location: 'Vancouver, BC',
    period: 'May 2024 — Dec 2024',
    blurb:
      'Built and shipped enterprise telemetry services protecting 1M+ Chromebook endpoints in production.',
    bullets: [
      'Developed Java backend services and a Manifest V3 Chrome extension powering continuous endpoint monitoring and threat detection.',
      'Engineered a Java microservice integrated with AWS Grafana for automated log exports, accelerating error detection by ~30%.',
      'Rebuilt the QA log interface, cutting export latency in half and making the tool usable for non-technical teams.',
      'Authored JUnit and Mocha test suites reaching 96.8% coverage on production services.',
    ],
    tech: ['Java', 'JavaScript', 'AWS', 'Chrome Extensions', 'JUnit'],
  },
];

const PROJECTS = [
  {
    title: 'BasketBot',
    subtitle: 'ProduHacks 2024 — 1st Place',
    description:
      'A computer-vision basketball scorekeeper that detects shots through a TensorFlow net-recognition model and accepts hands-free voice commands.',
    image: '/images/projects/basketbot.png',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'VOSK'],
    award: '1st Place',
    github: 'https://github.com/04christopher/basketbot',
  },
  {
    title: 'Mindful Motion',
    subtitle: 'HelloHacks 2023 — 1st Place',
    description:
      'A Flask-based exercise rep counter and pose-correction tool, hitting 91% motion-detection accuracy with OpenCV and Pandas-driven event logging.',
    image: '/images/projects/mindfulmotion.png',
    tech: ['Python', 'OpenCV', 'Flask', 'Pandas'],
    award: '1st Place',
    github: 'https://github.com/troy-wu/team1',
  },
  {
    title: 'Campus Explorer',
    subtitle: 'Full-stack web application',
    description:
      'TypeScript / Express backend and interactive frontend that queries 300+ campus rooms in real time and visualises results on Google Maps.',
    image: '/images/projects/campusexplorer.png',
    tech: ['TypeScript', 'Node.js', 'Express', 'Google Maps API'],
    github: 'https://github.com/troy-wu/campusexplorer',
  },
  {
    title: 'BattleIQ',
    subtitle: 'Clash Royale insights dashboard',
    description:
      'Python data pipeline that aggregates and analyzes Clash Royale battle history through a REST API, surfacing repeatable performance insights.',
    image: '/images/projects/battleiq.png',
    tech: ['Python', 'REST APIs', 'Data Analysis'],
    github: 'https://github.com/troy-wu/clashroyale',
  },
];

// ═══════════════════════════════════════════════════════════════════════════
// Main component
// ═══════════════════════════════════════════════════════════════════════════
export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 24);
      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const y = window.scrollY + 180;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Subtle ambient background */}
      <div
        className="pointer-events-none fixed inset-0 z-0"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(900px 500px at 80% -10%, rgba(139,92,246,0.10), transparent 60%), radial-gradient(700px 400px at -10% 30%, rgba(99,102,241,0.06), transparent 55%)',
        }}
      />

      {/* ─── Nav ──────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-slate-950/80 backdrop-blur-md border-b border-white/[0.06]'
            : 'bg-transparent'
        }`}
      >
        <nav className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <button
            onClick={() => scrollTo('home')}
            className="text-sm font-semibold tracking-[0.15em] text-white"
          >
            TROY&nbsp;WU
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link.id}
                onClick={() => scrollTo(link.id)}
                className={`text-sm transition-colors ${
                  activeSection === link.id
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                {link.label}
              </button>
            ))}
            <a
              href="/resume.pdf"
              download
              className="text-sm px-4 py-1.5 rounded-full border border-violet-400/40 text-violet-300 hover:bg-violet-500/10 transition-colors"
            >
              Resume
            </a>
          </div>

          <button
            className="md:hidden text-white"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {menuOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </nav>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center gap-7">
              {NAV_LINKS.map((link) => (
                <button
                  key={link.id}
                  onClick={() => scrollTo(link.id)}
                  className="text-2xl font-display text-white hover:text-violet-300"
                >
                  {link.label}
                </button>
              ))}
              <a
                href="/resume.pdf"
                download
                className="mt-4 px-5 py-2 rounded-full border border-violet-400/40 text-violet-300"
              >
                Resume
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ─── Hero ─────────────────────────────────────────────────────────── */}
      <section
        id="home"
        className="relative z-10 min-h-screen flex items-center pt-28 pb-20"
      >
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-[1.3fr_1fr] gap-14 lg:gap-20 items-center w-full">
          <div>
            <FadeIn>
              <p className="text-violet-400 text-sm font-medium tracking-[0.18em] uppercase mb-5">
                Software Engineer
              </p>
            </FadeIn>
            <FadeIn delay={0.05}>
              <h1 className="font-display font-semibold tracking-tight text-white text-5xl sm:text-6xl lg:text-7xl leading-[1.05]">
                Troy Wu
              </h1>
            </FadeIn>
            <FadeIn delay={0.1}>
              <p className="mt-6 text-lg text-slate-300 leading-relaxed max-w-xl">
                CS &amp; Business student at UBC building software that ships to
                real users — from GenAI features in an LMS used by{' '}
                <span className="text-white">400+ institutions</span> to
                endpoint security across{' '}
                <span className="text-white">1M+ devices</span>. Incoming SDE
                Intern at Amazon.
              </p>
            </FadeIn>

            <FadeIn delay={0.15}>
              <div className="mt-9 flex flex-wrap items-center gap-3">
                <button
                  onClick={() => scrollTo('projects')}
                  className="group inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-500 hover:bg-violet-400 text-white text-sm font-medium transition-colors"
                >
                  See my work
                  <ChevronRight
                    size={16}
                    className="group-hover:translate-x-0.5 transition-transform"
                  />
                </button>
                <button
                  onClick={() => scrollTo('contact')}
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 hover:border-white/30 text-slate-200 text-sm transition-colors"
                >
                  Get in touch
                </button>
                <a
                  href="/resume.pdf"
                  download
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border border-white/15 hover:border-white/30 text-slate-200 text-sm transition-colors"
                >
                  <Download size={15} /> Resume
                </a>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="mt-10 flex items-center gap-5 text-slate-500">
                <a
                  href="https://github.com/troy-wu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-violet-300 transition-colors"
                  aria-label="GitHub"
                >
                  <Github size={20} />
                </a>
                <a
                  href="https://linkedin.com/in/troy-wu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-violet-300 transition-colors"
                  aria-label="LinkedIn"
                >
                  <Linkedin size={20} />
                </a>
                <a
                  href="mailto:troywu5@gmail.com"
                  className="hover:text-violet-300 transition-colors"
                  aria-label="Email"
                >
                  <Mail size={20} />
                </a>
              </div>
            </FadeIn>

            {/* Stats */}
            <FadeIn delay={0.25}>
              <dl className="mt-12 grid grid-cols-3 gap-6 max-w-md border-t border-white/[0.06] pt-6">
                {HERO_STATS.map((stat) => (
                  <div key={stat.label}>
                    <dt className="text-xs text-slate-500 tracking-wide uppercase">
                      {stat.label}
                    </dt>
                    <dd className="mt-1 text-2xl font-display font-semibold text-white">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </FadeIn>
          </div>

          {/* Headshot */}
          <FadeIn delay={0.15} className="flex justify-center lg:justify-end">
            <div className="relative">
              <div
                className="absolute -inset-1 rounded-2xl bg-gradient-to-br from-violet-500/30 to-indigo-500/10 blur-xl"
                aria-hidden="true"
              />
              <img
                src="/images/headshot.JPG"
                alt="Portrait of Troy Wu"
                className="relative w-64 h-64 sm:w-72 sm:h-72 lg:w-80 lg:h-80 object-cover rounded-2xl border border-white/10"
              />
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── About ────────────────────────────────────────────────────────── */}
      <section id="about" className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading eyebrow="About" title="A quick introduction" />

          <div className="grid grid-cols-1 lg:grid-cols-[1.2fr_1fr] gap-12 lg:gap-16">
            <div className="space-y-5 text-slate-300 leading-relaxed">
              <FadeIn>
                <p>
                  I'm a Computer Science &amp; Business student at the
                  University of British Columbia, currently focused on full-stack
                  development and applied machine learning. I like working at
                  the seam between great engineering and a product people
                  actually want to use.
                </p>
              </FadeIn>
              <FadeIn delay={0.05}>
                <p>
                  Across three internships I've shipped GenAI features to a
                  global LMS, built endpoint-security telemetry for 1M+ devices,
                  and led test-infrastructure work that measurably sped up team
                  delivery. This summer I'm joining{' '}
                  <span className="text-white">Amazon's Applied Sciences</span>{' '}
                  team to work on ML-driven recommendations.
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p>
                  Outside of work I've competed in (and won) a couple of
                  hackathons, spent a semester on exchange at Tsinghua
                  University in Beijing, and play a lot of basketball.
                </p>
              </FadeIn>
            </div>

            {/* Education + Skills */}
            <div className="space-y-10">
              <FadeIn delay={0.05}>
                <h3 className="flex items-center gap-2 text-sm font-medium text-slate-400 tracking-[0.15em] uppercase mb-4">
                  <GraduationCap size={15} /> Education
                </h3>
                <div className="space-y-3">
                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                    <h4 className="font-medium text-white">
                      University of British Columbia
                    </h4>
                    <p className="text-violet-300 text-sm mt-0.5">
                      B.Sc. Computer Science &amp; Business, Co-op
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      Expected May 2027 · GPA 4.10 / 4.33 · Dean's Honour Roll ·
                      Trek Excellence Scholarship (Top 5%)
                    </p>
                  </div>
                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.07]">
                    <h4 className="font-medium text-white">
                      Tsinghua University
                    </h4>
                    <p className="text-violet-300 text-sm mt-0.5">
                      Exchange — School of Economics &amp; Management
                    </p>
                    <p className="text-xs text-slate-500 mt-2">
                      Feb 2025 — Jun 2025 · Beijing, China
                    </p>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>

          {/* Skills */}
          <div className="mt-16">
            <FadeIn>
              <h3 className="text-sm font-medium text-slate-400 tracking-[0.15em] uppercase mb-5">
                Tech I work with
              </h3>
            </FadeIn>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
              {SKILLS.map((s, i) => (
                <FadeIn key={s.group} delay={i * 0.05}>
                  <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.07] h-full">
                    <p className="text-xs text-slate-500 tracking-wider uppercase mb-3">
                      {s.group}
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {s.items.map((item) => (
                        <span
                          key={item}
                          className="px-2.5 py-1 text-xs text-slate-300 bg-white/[0.04] border border-white/[0.06] rounded-md"
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── Experience ───────────────────────────────────────────────────── */}
      <section id="experience" className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            eyebrow="Experience"
            title="Where I've worked"
            description="Three internships across enterprise security, EdTech, and (next) e-commerce ML."
          />

          <ol className="relative border-l border-white/[0.07] pl-8 sm:pl-10 space-y-10">
            {EXPERIENCES.map((exp, i) => (
              <FadeIn key={i} delay={i * 0.05}>
                <li className="relative">
                  {/* Timeline dot */}
                  <span
                    className={`absolute -left-[42px] sm:-left-[50px] top-2 w-3 h-3 rounded-full border-2 ${
                      exp.accent === 'incoming'
                        ? 'bg-violet-400 border-violet-300 shadow-[0_0_0_4px_rgba(139,92,246,0.18)]'
                        : 'bg-slate-950 border-violet-500/60'
                    }`}
                  />
                  <article className="p-6 sm:p-7 rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-violet-400/30 transition-colors">
                    <header className="flex items-start gap-4 flex-wrap">
                      <div className="w-12 h-12 rounded-xl bg-white flex items-center justify-center p-2 flex-shrink-0">
                        <img
                          src={exp.logo}
                          alt={`${exp.company} logo`}
                          className="max-w-full max-h-full object-contain"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-baseline gap-x-3">
                          <h3 className="text-lg font-medium text-white">
                            {exp.role}
                          </h3>
                          {exp.accent === 'incoming' && (
                            <span className="text-[11px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-violet-500/15 text-violet-300 border border-violet-500/30">
                              Incoming
                            </span>
                          )}
                        </div>
                        <p className="text-violet-300 text-sm mt-0.5 font-medium">
                          {exp.company}
                        </p>
                        <p className="mt-1.5 text-xs text-slate-500 flex flex-wrap items-center gap-x-3 gap-y-1">
                          <span className="inline-flex items-center gap-1">
                            <Briefcase size={12} /> {exp.period}
                          </span>
                          <span className="inline-flex items-center gap-1">
                            <MapPin size={12} /> {exp.location}
                          </span>
                        </p>
                      </div>
                    </header>

                    <p className="mt-5 text-slate-300 leading-relaxed">
                      {exp.blurb}
                    </p>

                    {exp.bullets.length > 0 && (
                      <ul className="mt-4 space-y-2.5">
                        {exp.bullets.map((b, j) => (
                          <li
                            key={j}
                            className="flex gap-3 text-sm text-slate-400 leading-relaxed"
                          >
                            <span className="mt-2 w-1 h-1 rounded-full bg-violet-400 flex-shrink-0" />
                            <span>{b}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {exp.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-xs text-slate-300 bg-white/[0.04] border border-white/[0.06] rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </article>
                </li>
              </FadeIn>
            ))}
          </ol>
        </div>
      </section>

      {/* ─── Projects ─────────────────────────────────────────────────────── */}
      <section id="projects" className="relative z-10 py-24">
        <div className="max-w-6xl mx-auto px-6">
          <SectionHeading
            eyebrow="Projects"
            title="Things I've built"
            description="A selection of side projects and hackathon work — full source on GitHub."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {PROJECTS.map((p, i) => (
              <FadeIn key={p.title} delay={(i % 2) * 0.05}>
                <a
                  href={p.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block h-full rounded-2xl bg-white/[0.03] border border-white/[0.07] hover:border-violet-400/30 transition-colors overflow-hidden"
                >
                  <div className="relative h-44 overflow-hidden bg-slate-900">
                    <img
                      src={p.image}
                      alt={p.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      onError={(e) => {
                        e.currentTarget.style.display = 'none';
                      }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />
                    {p.award && (
                      <div className="absolute top-3 left-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-violet-500/90 text-white text-[11px] font-medium">
                        <Award size={12} /> {p.award}
                      </div>
                    )}
                    <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/40 backdrop-blur-sm flex items-center justify-center text-white/80 opacity-0 group-hover:opacity-100 transition-opacity">
                      <ArrowUpRight size={15} />
                    </div>
                  </div>

                  <div className="p-6">
                    <p className="text-xs text-violet-300 font-medium tracking-wide">
                      {p.subtitle}
                    </p>
                    <h3 className="mt-1 text-lg font-medium text-white font-display flex items-center gap-1.5">
                      {p.title}
                      <ExternalLink
                        size={14}
                        className="text-slate-500 group-hover:text-violet-300 transition-colors"
                      />
                    </h3>
                    <p className="mt-2.5 text-sm text-slate-400 leading-relaxed">
                      {p.description}
                    </p>
                    <div className="mt-4 flex flex-wrap gap-1.5">
                      {p.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2 py-0.5 text-[11px] text-slate-300 bg-white/[0.04] border border-white/[0.06] rounded"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </a>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Contact ──────────────────────────────────────────────────────── */}
      <section id="contact" className="relative z-10 py-28">
        <div className="max-w-3xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-violet-400 text-sm font-medium tracking-[0.18em] uppercase mb-4">
              Contact
            </p>
          </FadeIn>
          <FadeIn delay={0.05}>
            <h2 className="text-3xl sm:text-4xl font-semibold text-white font-display tracking-tight">
              Let's get in touch.
            </h2>
          </FadeIn>
          <FadeIn delay={0.1}>
            <p className="mt-5 text-slate-400 leading-relaxed">
              I'm always happy to chat about new-grad roles, internships, or
              interesting projects. The fastest way to reach me is email.
            </p>
          </FadeIn>

          <FadeIn delay={0.15}>
            <a
              href="mailto:troywu5@gmail.com"
              className="inline-flex items-center gap-2 mt-8 px-6 py-3 rounded-full bg-violet-500 hover:bg-violet-400 text-white text-sm font-medium transition-colors"
            >
              <Mail size={16} /> troywu5@gmail.com
            </a>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="mt-10 flex items-center justify-center gap-5 text-slate-500">
              <a
                href="https://github.com/troy-wu"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-violet-300 transition-colors"
                aria-label="GitHub"
              >
                <Github size={20} />
              </a>
              <a
                href="https://linkedin.com/in/troy-wu"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-violet-300 transition-colors"
                aria-label="LinkedIn"
              >
                <Linkedin size={20} />
              </a>
              <a
                href="mailto:troywu5@gmail.com"
                className="hover:text-violet-300 transition-colors"
                aria-label="Email"
              >
                <Mail size={20} />
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ─── Footer ───────────────────────────────────────────────────────── */}
      <footer className="relative z-10 py-8 border-t border-white/[0.06]">
        <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <p>© {new Date().getFullYear()} Troy Wu. Built with React &amp; Tailwind.</p>
          <p>Vancouver, BC</p>
        </div>
      </footer>
    </div>
  );
}
