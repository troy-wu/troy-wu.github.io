import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useInView, useTransform } from 'framer-motion';
import { Github, Linkedin, Mail, Download, ChevronRight, ChevronDown, ExternalLink, Menu, X, BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import './App.css';
import BLOG_POSTS from './blogData';

// ─── Fade-in animation wrapper ──────────────────────────────────────────────
const FadeIn = ({ children, delay = 0, direction = 'up', className = '' }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  const offsets = {
    up: { y: 40 },
    down: { y: -40 },
    left: { x: 40 },
    right: { x: -40 },
    none: {},
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, ...offsets[direction] }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : {}}
      transition={{ duration: 0.7, delay, ease: [0.25, 0.4, 0.25, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// ─── Section header component ───────────────────────────────────────────────
const SectionHeader = ({ title, highlight }) => (
  <FadeIn>
    <h2 className="text-4xl lg:text-5xl font-bold text-white mb-4 font-display">
      {title} <span className="gradient-text">{highlight}</span>
    </h2>
    <div className="w-20 h-1 bg-gradient-to-r from-violet-600 to-purple-500 rounded-full mb-12" />
  </FadeIn>
);

// ─── Data ───────────────────────────────────────────────────────────────────
const SHOW_BLOG = false; // Set to true (and add 'Blog' to NAV_LINKS) when ready to publish
const NAV_LINKS = ['Home', 'About', 'Experience', 'Projects', 'Contact'];

const SKILLS = {
  Languages: ['Python', 'Java', 'TypeScript', 'JavaScript', 'C++', 'SQL', 'React.js'],
  'Frameworks & Libraries': ['MongoDB', 'Chai', 'Mocha', 'Sinon', 'OpenCV', 'Flask', 'JUnit', 'OracleDB'],
  'Developer Tools': ['Git', 'GitLab', 'Jira', 'Docker', 'GitHub', 'VS Code', 'IntelliJ'],
};

const PROJECTS = [
  {
    title: 'BasketBot',
    subtitle: 'ProduHacks 2024 Winner',
    tech: ['Python', 'OpenCV', 'TensorFlow', 'PyAudio', 'VOSK'],
    award: '1st Place — $400',
    description:
      'Winner of ProduHacks (50 teams) for building an object-detection basketball scorekeeper with TensorFlow net recognition and OpenCV plus voice control via PyAudio/VOSK.',
    image: '/images/projects/basketbot.png',
    gradient: 'from-violet-600/80 to-indigo-600/80',
    github: 'https://github.com/04christopher/basketbot',
  },
  {
    title: 'Campus Explorer',
    subtitle: 'Full-Stack Web Application',
    tech: ['TypeScript', 'Node.js', 'Express.js', 'JavaScript', 'HTML/CSS', 'Google Maps API'],
    description:
      'Built a TypeScript/Express backend and interactive frontend to query and visualize 300+ campus rooms in real time with Google Maps integration.',
    image: '/images/projects/campusexplorer.png',
    gradient: 'from-blue-600/80 to-cyan-600/80',
    github: 'https://github.com/troy-wu/campusexplorer',
  },
  {
    title: 'BattleIQ',
    subtitle: 'Clash Royale Insights Dashboard',
    tech: ['Python', 'REST API', 'Data Analysis'],
    description:
      'Engineered a Python data pipeline that aggregates and analyzes Clash Royale battle history through a REST API for repeatable performance insights.',
    image: '/images/projects/battleiq.png',
    gradient: 'from-fuchsia-600/80 to-violet-600/80',
    github: 'https://github.com/troy-wu/clashroyale',
  },
  {
    title: 'Mindful Motion',
    subtitle: 'HelloHacks 2023 Winner',
    tech: ['Python', 'OpenCV', 'Pandas', 'Flask', 'HTML/CSS'],
    award: '1st Place — $500',
    description:
      'Built a Flask-based motion rep counter and pose-correction tool, achieving 91% motion-detection accuracy with OpenCV and Pandas-based event logging.',
    image: '/images/projects/mindfulmotion.png',
    gradient: 'from-emerald-600/80 to-teal-600/80',
    github: 'https://github.com/troy-wu/team1',
  },
];

const EXPERIENCES = [
  {
    role: 'Software Development Engineer Intern',
    company: 'Amazon',
    logo: '/images/amazon.png',
    location: 'Vancouver, BC',
    period: 'May 2026 — August 2026',
    description:
      'Working on the Applied Sciences team within Amazon Everyday Essentials, building applied machine learning solutions that power recommendation and discovery experiences for millions of customers.',
  },
  {
    role: 'Software Engineer Intern',
    company: 'D2L (Desire2Learn)',
    logo: '/images/d2l.png',
    location: 'Vancouver, BC',
    period: 'January 2026 — April 2026',
    description:
      'Built full-stack GenAI features for Brightspace, D2L\'s learning management system deployed across 400+ institutions handling 260K+ annual generations. Developed the AI Audio Overview feature end-to-end — a serverless pipeline using Claude Sonnet via AWS Bedrock/Lambda and Amazon Polly TTS to generate natural AI-narrated content summaries, supporting diverse learning styles. Refined prompt engineering strategies for generative AI features, reducing malformed outputs by 30% and improving content consistency across subjects. Also expanded Playwright E2E test coverage by 28% and cut test suite runtime by 32% through shared TestBench fixtures.',
  },
  {
    role: 'Software Engineer Intern',
    company: 'Absolute Security',
    logo: '/images/absolute.png',
    location: 'Vancouver, BC',
    period: 'May 2024 — December 2024',
    description:
      'Built and deployed full-stack telemetry security services for over 1 million enterprise Chromebook endpoint devices using Java and JavaScript Manifest V3 extensions, enabling continuous monitoring and threat detection. Engineered a scalable Java microservice integrated with AWS Grafana to automate log exports, boosting error detection speed by 30%. Rebuilt the QA log interface, reducing export latency by 50% and improving usability for non-technical teams. Developed robust JUnit/Mocha test suites achieving 96.8% coverage across production services.',
  },
];

// ─── Scroll-driven parallax background ──────────────────────────────────────
const ScrollBackground = () => {
  const { scrollYProgress } = useScroll();

  // Colour blobs — wide displacement for dramatic movement
  const y1 = useTransform(scrollYProgress, [0, 1], ['0%', '-80%']);
  const y2 = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const y3 = useTransform(scrollYProgress, [0, 1], ['0%', '-120%']);
  const y4 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);
  const y5 = useTransform(scrollYProgress, [0, 1], ['0%', '90%']);
  const y6 = useTransform(scrollYProgress, [0, 1], ['0%', '-100%']);
  const y7 = useTransform(scrollYProgress, [0, 1], ['0%', '70%']);
  const y8 = useTransform(scrollYProgress, [0, 1], ['0%', '-65%']);
  const x1 = useTransform(scrollYProgress, [0, 1], ['0%', '35%']);
  const x2 = useTransform(scrollYProgress, [0, 1], ['0%', '-30%']);
  const x3 = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const x4 = useTransform(scrollYProgress, [0, 1], ['0%', '-20%']);
  const scale1 = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [1, 1.4, 0.8, 1.1]);
  const scale2 = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1.3, 0.9]);
  const scale3 = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [1, 0.7, 1.2, 0.9]);
  const rotate1 = useTransform(scrollYProgress, [0, 1], [0, 180]);
  const rotate2 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const rotate3 = useTransform(scrollYProgress, [0, 1], [45, 225]);

  // Geometric shape parallax (slower than blobs)
  const shapeY1 = useTransform(scrollYProgress, [0, 1], ['0%', '-200%']);
  const shapeY2 = useTransform(scrollYProgress, [0, 1], ['0%', '-150%']);
  const shapeY3 = useTransform(scrollYProgress, [0, 1], ['0%', '-250%']);
  const shapeY4 = useTransform(scrollYProgress, [0, 1], ['0%', '-180%']);
  const shapeY5 = useTransform(scrollYProgress, [0, 1], ['0%', '-220%']);
  const shapeX1 = useTransform(scrollYProgress, [0, 1], ['0%', '60%']);
  const shapeX2 = useTransform(scrollYProgress, [0, 1], ['0%', '-50%']);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 0 }}>
      {/* ── Colour blobs ── */}
      <motion.div
        style={{ y: y1, x: x1, scale: scale1 }}
        className="absolute top-[5%] left-[-15%] w-[700px] h-[700px] bg-violet-600/[0.14] rounded-full blur-[120px]"
      />
      <motion.div
        style={{ y: y2, x: x2, scale: scale2 }}
        className="absolute top-[35%] right-[-20%] w-[650px] h-[650px] bg-indigo-500/[0.12] rounded-full blur-[110px]"
      />
      <motion.div
        style={{ y: y3, x: x3 }}
        className="absolute top-[80%] left-[10%] w-[550px] h-[550px] bg-fuchsia-500/[0.12] rounded-full blur-[120px]"
      />
      <motion.div
        style={{ y: y4, scale: scale3 }}
        className="absolute top-[55%] right-[0%] w-[450px] h-[450px] bg-cyan-500/[0.10] rounded-full blur-[100px]"
      />
      <motion.div
        style={{ y: y5, x: x4 }}
        className="absolute top-[120%] left-[30%] w-[600px] h-[600px] bg-purple-500/[0.11] rounded-full blur-[130px]"
      />
      <motion.div
        style={{ y: y6, x: x1 }}
        className="absolute top-[160%] right-[5%] w-[500px] h-[500px] bg-rose-500/[0.10] rounded-full blur-[110px]"
      />
      <motion.div
        style={{ y: y7, x: x2 }}
        className="absolute top-[20%] left-[50%] w-[400px] h-[400px] bg-amber-500/[0.06] rounded-full blur-[100px]"
      />
      <motion.div
        style={{ y: y8 }}
        className="absolute top-[100%] right-[30%] w-[350px] h-[350px] bg-emerald-500/[0.07] rounded-full blur-[90px]"
      />

      {/* ── Scroll-driven geometric shapes ── */}
      {/* Large ring */}
      <motion.div
        style={{ y: shapeY1, x: shapeX1, rotate: rotate1 }}
        className="absolute top-[30%] left-[5%] w-40 h-40 border-2 border-violet-500/[0.12] rounded-full"
      />
      {/* Diamond */}
      <motion.div
        style={{ y: shapeY2, x: shapeX2, rotate: rotate3 }}
        className="absolute top-[50%] right-[8%] w-16 h-16 border-2 border-fuchsia-400/[0.15] rotate-45"
      />
      {/* Small filled circle */}
      <motion.div
        style={{ y: shapeY3, x: shapeX1 }}
        className="absolute top-[70%] left-[25%] w-4 h-4 bg-cyan-400/[0.20] rounded-full"
      />
      {/* Medium ring */}
      <motion.div
        style={{ y: shapeY4, rotate: rotate2 }}
        className="absolute top-[90%] right-[20%] w-24 h-24 border border-indigo-400/[0.12] rounded-full"
      />
      {/* Thin horizontal line */}
      <motion.div
        style={{ y: shapeY2, x: shapeX1, rotate: rotate1 }}
        className="absolute top-[45%] left-[40%] w-32 h-[1px] bg-gradient-to-r from-transparent via-violet-400/[0.15] to-transparent"
      />
      {/* Small square */}
      <motion.div
        style={{ y: shapeY5, x: shapeX2, rotate: rotate3 }}
        className="absolute top-[110%] left-[15%] w-8 h-8 border border-purple-400/[0.12] rounded-sm"
      />
      {/* Dot cluster */}
      <motion.div
        style={{ y: shapeY3, x: shapeX2 }}
        className="absolute top-[60%] right-[35%] w-2 h-2 bg-violet-400/[0.25] rounded-full"
      />
      <motion.div
        style={{ y: shapeY1 }}
        className="absolute top-[65%] right-[33%] w-1.5 h-1.5 bg-fuchsia-400/[0.20] rounded-full"
      />
      {/* Large thin ring — deep */}
      <motion.div
        style={{ y: shapeY5, rotate: rotate2 }}
        className="absolute top-[140%] left-[50%] w-52 h-52 border border-rose-400/[0.08] rounded-full"
      />
      {/* Gradient line — diagonal */}
      <motion.div
        style={{ y: shapeY4, rotate: rotate1 }}
        className="absolute top-[130%] right-[15%] w-24 h-[1px] bg-gradient-to-r from-transparent via-cyan-400/[0.12] to-transparent"
      />
    </div>
  );
};

// ─── Main Component ─────────────────────────────────────────────────────────
export default function Portfolio() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);

      const sections = ['home', 'about', 'experience', 'projects', 'contact'];
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollPosition >= el.offsetTop && scrollPosition < el.offsetTop + el.offsetHeight) {
          setActiveSection(section);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <div className="bg-slate-950 text-white font-sans" style={{ position: 'relative', zIndex: 1 }}>
      {/* ═══ Parallax scroll background ═══ */}
      <ScrollBackground />
      {/* ═══ Progress Bar ═══ */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-violet-600 via-fuchsia-500 to-cyan-500 z-[60] origin-left"
        style={{ scaleX: scrollYProgress }}
      />

      {/* ═══ Navbar ═══ */}
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? 'bg-slate-950/80 backdrop-blur-xl border-b border-white/10 shadow-lg shadow-black/20'
            : ''
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <button onClick={() => scrollTo('home')} className="text-xl font-display font-bold gradient-text">
            TW
          </button>

          <div className="hidden md:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <button
                key={link}
                onClick={() => scrollTo(link.toLowerCase())}
                className={`text-sm transition-colors duration-300 ${
                  activeSection === link.toLowerCase() ? 'text-violet-400' : 'text-slate-400 hover:text-white'
                }`}
              >
                {link}
              </button>
            ))}
          </div>

          <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      {/* ═══ Mobile Menu ═══ */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 bg-slate-950/95 backdrop-blur-xl flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link}
                  onClick={() => scrollTo(link.toLowerCase())}
                  className="text-2xl font-display text-white hover:text-violet-400 transition-colors"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                >
                  {link}
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ═══════════════════════════════════════════════════════════════════════
          HERO
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="home" className="relative min-h-screen flex items-center overflow-hidden grid-pattern" style={{ zIndex: 1 }}>
        {/* Geometric shapes */}
        <div className="absolute top-24 left-[10%] w-20 h-20 border-2 border-violet-500/20 rounded-full animate-drift pointer-events-none" />
        <div className="absolute top-32 right-[15%] w-10 h-10 border-2 border-indigo-500/20 rotate-45 animate-drift-slow pointer-events-none" />
        <div className="absolute top-[60%] left-[5%] w-3 h-3 bg-violet-400/40 rounded-full animate-pulse-glow pointer-events-none" />
        <div className="absolute bottom-20 right-[10%] w-28 h-28 border border-violet-500/10 rounded-full animate-spin-slow pointer-events-none" />
        <div className="absolute bottom-32 left-[20%] w-5 h-5 border-2 border-fuchsia-400/25 rotate-45 animate-drift pointer-events-none" />
        <div className="absolute top-[40%] right-[30%] w-2 h-2 bg-cyan-400/40 rounded-full animate-pulse-glow-slow pointer-events-none" />
        <div className="absolute top-[20%] left-[45%] w-6 h-6 border border-violet-500/15 rounded-lg rotate-12 animate-drift-slow pointer-events-none" />
        <div className="absolute top-[70%] right-[25%] w-4 h-4 border border-indigo-400/25 rotate-45 animate-float pointer-events-none" />
        <div className="absolute top-[15%] right-[35%] w-2 h-2 bg-fuchsia-400/35 rounded-full animate-pulse-glow pointer-events-none" />
        <div className="absolute top-[85%] left-[38%] w-8 h-8 border border-cyan-500/15 rounded-full animate-drift pointer-events-none" />
        <div className="absolute top-[50%] left-[60%] w-12 h-12 border border-violet-400/10 rounded-full animate-float-slow pointer-events-none" />
        <div className="absolute top-[30%] left-[75%] w-16 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/20 to-transparent animate-drift-slow pointer-events-none" />
        <div className="absolute bottom-[15%] right-[40%] w-1.5 h-1.5 bg-amber-400/25 rounded-full animate-pulse-glow-slow pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6 pt-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left — Text */}
          <div>
            <FadeIn>
              <p className="text-violet-400 font-medium mb-4 font-display tracking-wide">Hi, I'm</p>
            </FadeIn>
            <FadeIn delay={0.1}>
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 font-display leading-tight">
                Troy <span className="gradient-text">Wu</span>
              </h1>
            </FadeIn>
            <FadeIn delay={0.2}>
              <h2 className="text-xl sm:text-2xl text-slate-400 mb-6">Software Engineer</h2>
            </FadeIn>
            <FadeIn delay={0.3}>
              <p className="text-lg text-slate-400 mb-8 leading-relaxed max-w-lg">
                Computer Science &amp; Business student at UBC. Incoming SDE Intern at Amazon,
                previously at D2L and Absolute Security. Two-time hackathon winner.
              </p>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="flex flex-wrap gap-4">
                <button
                  onClick={() => scrollTo('projects')}
                  className="group px-6 py-3 bg-gradient-to-r from-violet-600 to-purple-500 text-white rounded-lg hover:shadow-lg hover:shadow-violet-500/25 transition-all duration-300 flex items-center gap-2 font-medium"
                >
                  View Projects{' '}
                  <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                </button>
                <a
                  href="/resume.pdf"
                  download
                  className="px-6 py-3 border border-violet-500/40 text-violet-300 rounded-lg hover:bg-violet-500/10 hover:border-violet-500/60 transition-all duration-300 flex items-center gap-2"
                >
                  <Download size={18} /> Resume
                </a>
              </div>
            </FadeIn>
            <FadeIn delay={0.5}>
              <div className="flex gap-5 mt-8">
                <a
                  href="https://github.com/troy-wu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-violet-400 transition-colors duration-300"
                >
                  <Github size={22} />
                </a>
                <a
                  href="https://linkedin.com/in/troy-wu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-slate-500 hover:text-violet-400 transition-colors duration-300"
                >
                  <Linkedin size={22} />
                </a>
                <a
                  href="mailto:troywu5@gmail.com"
                  className="text-slate-500 hover:text-violet-400 transition-colors duration-300"
                >
                  <Mail size={22} />
                </a>
              </div>
            </FadeIn>
          </div>

          {/* Right — Photo */}
          <FadeIn delay={0.3} direction="left" className="flex justify-center lg:justify-end">
            <div className="relative">
              {/* Decorative frame layers */}
              <div className="absolute -inset-6 bg-gradient-to-br from-violet-600/20 to-purple-500/10 rounded-2xl rotate-6 blur-sm" />
              <div className="absolute -inset-4 border-2 border-violet-500/20 rounded-2xl -rotate-3" />

              {/* Headshot */}
              <img
                src="/images/headshot.JPG"
                alt="Troy Wu"
                className="relative w-72 h-72 sm:w-80 sm:h-80 object-cover rounded-2xl shadow-2xl shadow-violet-500/10"
              />

              {/* Floating decorations around photo */}
              <div className="absolute -top-6 -right-6 w-14 h-14 border-2 border-violet-400/30 rounded-full animate-float pointer-events-none" />
              <div className="absolute -bottom-4 -left-4 w-10 h-10 bg-gradient-to-br from-violet-500/60 to-purple-500/60 rounded-lg rotate-45 animate-float-slow pointer-events-none" />
              <div className="absolute top-1/2 -right-8 w-3 h-3 bg-violet-400/50 rounded-full animate-float-slower pointer-events-none" />
            </div>
          </FadeIn>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-500"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <span className="text-xs tracking-widest uppercase">Scroll</span>
          <ChevronDown size={16} />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          ABOUT
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="about" className="relative py-24 lg:py-32 overflow-hidden" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/40 to-slate-950/80" />

        {/* Geometric shapes */}
        <div className="absolute top-20 right-[8%] w-16 h-16 border border-violet-500/15 rounded-full animate-drift pointer-events-none" />
        <div className="absolute bottom-40 left-[5%] w-8 h-8 border-2 border-indigo-500/15 rotate-45 animate-drift-slow pointer-events-none" />
        <div className="absolute top-[40%] left-[12%] w-2 h-2 bg-violet-400/35 rounded-full animate-pulse-glow pointer-events-none" />
        <div className="absolute top-[25%] right-[25%] w-4 h-4 border border-fuchsia-500/15 rounded animate-drift pointer-events-none" />
        <div className="absolute bottom-20 right-[18%] w-2.5 h-2.5 bg-cyan-400/30 rounded-full animate-pulse-glow-slow pointer-events-none" />
        <div className="absolute top-[65%] right-[5%] w-12 h-12 border border-purple-500/10 rounded-full animate-spin-slow pointer-events-none" />
        <div className="absolute bottom-[30%] left-[30%] w-1.5 h-1.5 bg-indigo-400/40 rounded-full animate-pulse-glow pointer-events-none" />
        <div className="absolute top-[15%] left-[50%] w-20 h-[1px] bg-gradient-to-r from-transparent via-violet-400/15 to-transparent animate-drift-slow pointer-events-none" />
        <div className="absolute bottom-[15%] right-[30%] w-10 h-10 border border-emerald-500/10 rounded-full animate-drift pointer-events-none" />
        <div className="absolute top-[55%] left-[55%] w-3 h-3 border border-amber-400/15 rotate-45 animate-float pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <SectionHeader title="About" highlight="Me" />

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Left — Bio */}
            <div className="space-y-6">
              <FadeIn>
                <p className="text-slate-300 leading-relaxed">
                  I'm a Computer Science and Business student at the University of British Columbia,
                  ranked 6th out of 791 students in UBC Sauder with a GPA of 4.10/4.33. I'm passionate
                  about software engineering and building products that solve real-world problems at
                  scale.
                </p>
              </FadeIn>
              <FadeIn delay={0.1}>
                <p className="text-slate-300 leading-relaxed">
                  This summer I'm joining Amazon as an SDE Intern on the Applied Sciences team
                  in Everyday Essentials, working on applied machine learning. Previously, I built
                  full-stack GenAI features at D2L serving 400+ institutions and developed enterprise
                  security services at Absolute Security for over 1 million devices. I also spent a
                  semester on exchange at Tsinghua University.
                </p>
              </FadeIn>
              <FadeIn delay={0.2}>
                <p className="text-slate-300 leading-relaxed">
                  I'm a two-time hackathon winner, having won ProduHacks 2024 and HelloHacks 2023. I'm
                  always excited to take on new challenges and collaborate on meaningful projects.
                </p>
              </FadeIn>

              {/* Photo gallery placeholders */}
              <FadeIn delay={0.3}>
                <div className="mt-8 grid grid-cols-3 gap-3">
                  {['photo1', 'photo2', 'photo3'].map((name, i) => (
                    <div
                      key={i}
                      className="aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-violet-500/5 to-purple-500/5 border border-white/5 hover:border-violet-500/20 transition-colors duration-300"
                    >
                      <img
                        src={`/images/about/${name}.jpg`}
                        alt=""
                        className="w-full h-full object-cover"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                    </div>
                  ))}
                </div>
                <p className="text-slate-600 text-xs mt-2 italic">
                  {/* Add photos to public/images/about/ */}
                </p>
              </FadeIn>
            </div>

            {/* Right — Education & Skills */}
            <div className="space-y-8">
              {/* Education */}
              <FadeIn delay={0.1}>
                <h3 className="text-xl font-semibold text-white mb-4 font-display">Education</h3>
                <div className="space-y-4">
                  <div className="p-5 rounded-xl bg-slate-800/30 border border-white/5 hover:border-violet-500/20 transition-colors duration-300">
                    <h4 className="font-semibold text-white">University of British Columbia</h4>
                    <p className="text-violet-400 text-sm font-medium mt-1">
                      B.Sc. Computer Science &amp; Business Co-op
                    </p>
                    <div className="flex flex-wrap items-center gap-3 mt-2 text-xs text-slate-400">
                      <span>GPA: 4.10/4.33</span>
                      <span className="text-slate-600">•</span>
                      <span>Expected May 2027</span>
                    </div>
                    <div className="mt-3 text-sm text-slate-400 space-y-1">
                      <p>Dean's Honour Roll, Trek Excellence Scholarship (Top 5%)</p>
                      <p>Ranked 6/791 in UBC Sauder</p>
                    </div>
                  </div>

                  <div className="p-5 rounded-xl bg-slate-800/30 border border-white/5 hover:border-violet-500/20 transition-colors duration-300">
                    <h4 className="font-semibold text-white">Tsinghua University</h4>
                    <p className="text-violet-400 text-sm font-medium mt-1">
                      School of Economics &amp; Management — Exchange
                    </p>
                    <p className="text-xs text-slate-400 mt-2">February 2025 — June 2025</p>
                  </div>
                </div>
              </FadeIn>

              {/* Skills */}
              <FadeIn delay={0.2}>
                <h3 className="text-xl font-semibold text-white mb-4 font-display">Technical Skills</h3>
                <div className="space-y-4">
                  {Object.entries(SKILLS).map(([category, items]) => (
                    <div key={category}>
                      <p className="text-sm text-slate-500 mb-2">{category}</p>
                      <div className="flex flex-wrap gap-2">
                        {items.map((skill) => (
                          <span
                            key={skill}
                            className="px-3 py-1 text-xs bg-violet-500/10 border border-violet-500/20 text-violet-300 rounded-full hover:bg-violet-500/20 transition-colors"
                          >
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          EXPERIENCE
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="experience" className="relative py-24 lg:py-32 overflow-hidden" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/30 to-slate-950/60" />
        {/* Geometric shapes */}
        <div className="absolute top-32 right-[12%] w-12 h-12 border border-indigo-500/15 rotate-45 animate-drift pointer-events-none" />
        <div className="absolute bottom-24 left-[8%] w-20 h-20 border border-violet-500/10 rounded-full animate-drift-slow pointer-events-none" />
        <div className="absolute top-[50%] right-[5%] w-3 h-3 border border-fuchsia-400/20 rotate-45 animate-float pointer-events-none" />
        <div className="absolute top-[20%] left-[20%] w-2 h-2 bg-cyan-400/30 rounded-full animate-pulse-glow pointer-events-none" />
        <div className="absolute bottom-[40%] right-[28%] w-6 h-6 border border-violet-400/10 rounded-full animate-drift pointer-events-none" />
        <div className="absolute top-[75%] left-[40%] w-2 h-2 bg-indigo-400/30 rounded-full animate-pulse-glow-slow pointer-events-none" />
        <div className="absolute top-[10%] left-[60%] w-24 h-[1px] bg-gradient-to-r from-transparent via-fuchsia-400/15 to-transparent animate-drift-slow pointer-events-none" />
        <div className="absolute top-[85%] right-[15%] w-1.5 h-1.5 bg-amber-400/25 rounded-full animate-pulse-glow pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <SectionHeader title="Work" highlight="Experience" />

          <div className="space-y-8">
            {EXPERIENCES.map((exp, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="relative p-6 sm:p-8 rounded-2xl bg-slate-800/30 border border-white/5 hover:border-violet-500/20 transition-all duration-500">
                  <div className="flex items-start gap-5">
                    <div className="hidden sm:flex w-14 h-14 rounded-xl bg-white/95 border border-white/10 items-center justify-center flex-shrink-0 p-2 shadow-lg shadow-black/10 overflow-hidden">
                      <img
                        src={exp.logo}
                        alt={`${exp.company} logo`}
                        className="max-w-full max-h-full object-contain"
                      />
                    </div>

                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-1">{exp.role}</h3>
                      <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm">
                        <span className="text-violet-400 font-medium">{exp.company}</span>
                        <span className="text-slate-600 hidden sm:inline">•</span>
                        <span className="text-slate-400">{exp.location}</span>
                        <span className="text-slate-600 hidden sm:inline">•</span>
                        <span className="text-slate-400">{exp.period}</span>
                      </div>

                      <p className="mt-5 text-slate-300 leading-relaxed text-sm sm:text-base">
                        {exp.description}
                      </p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          PROJECTS
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="projects" className="relative py-24 lg:py-32 overflow-hidden" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/40 to-slate-950/80" />

        {/* Geometric shapes */}
        <div className="absolute top-16 left-[6%] w-10 h-10 border-2 border-violet-500/15 rounded-full animate-drift pointer-events-none" />
        <div className="absolute bottom-20 right-[10%] w-6 h-6 border border-indigo-500/20 rotate-45 animate-drift-slow pointer-events-none" />
        <div className="absolute top-[50%] right-[5%] w-2.5 h-2.5 bg-fuchsia-400/30 rounded-full animate-pulse-glow pointer-events-none" />
        <div className="absolute top-[30%] left-[45%] w-4 h-4 border border-cyan-500/15 rounded animate-float pointer-events-none" />
        <div className="absolute bottom-[35%] left-[15%] w-2 h-2 bg-violet-400/30 rounded-full animate-pulse-glow-slow pointer-events-none" />
        <div className="absolute top-[80%] right-[22%] w-8 h-8 border border-purple-500/10 rounded-full animate-spin-slow pointer-events-none" />
        <div className="absolute top-[15%] right-[30%] w-16 h-[1px] bg-gradient-to-r from-transparent via-indigo-400/15 to-transparent animate-drift-slow pointer-events-none" />
        <div className="absolute bottom-[20%] left-[60%] w-3 h-3 border border-emerald-400/15 rotate-45 animate-drift pointer-events-none" />
        <div className="absolute top-[65%] left-[40%] w-1.5 h-1.5 bg-cyan-400/25 rounded-full animate-pulse-glow pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <SectionHeader title="Featured" highlight="Projects" />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {PROJECTS.map((project, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="group relative overflow-hidden rounded-xl bg-slate-900 border border-white/5 hover:border-violet-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-violet-500/10 h-full flex flex-col">
                  {/* Image container */}
                  <div className="relative h-52 overflow-hidden">
                    {/* Gradient fallback */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`} />

                    {/* Project image */}
                    <img
                      src={project.image}
                      alt={project.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                      onError={(e) => {
                        e.target.style.display = 'none';
                      }}
                    />

                    {/* Softer bottom overlay to keep images more visible */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/45 via-slate-900/15 to-transparent" />

                    {/* Award badge */}
                    {project.award && (
                      <div className="absolute top-4 right-4 px-3 py-1 bg-violet-500/90 backdrop-blur-sm text-white text-xs font-medium rounded-full">
                        {project.award}
                      </div>
                    )}

                    {/* GitHub link */}
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="absolute top-4 left-4 w-9 h-9 rounded-full bg-black/30 backdrop-blur-sm flex items-center justify-center text-white/70 hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-violet-500/60"
                    >
                      <ExternalLink size={16} />
                    </a>
                  </div>

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <p className="text-violet-400 text-sm font-medium mb-1">{project.subtitle}</p>
                    <h3 className="text-xl font-semibold text-white mb-2 font-display">{project.title}</h3>
                    <p className="text-slate-400 text-sm mb-4 leading-relaxed flex-1">
                      {project.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          className="px-2.5 py-1 text-xs bg-violet-500/10 border border-violet-500/20 text-violet-300 rounded-md"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          <FadeIn delay={0.4} className="text-center mt-8">
            {/* <p className="text-slate-600 text-sm italic">
              Add project screenshots to public/images/projects/
            </p> */}
          </FadeIn>
        </div>
      </section>

      {SHOW_BLOG && (
      <section id="blog" className="relative py-24 lg:py-32 overflow-hidden" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/80 via-slate-900/40 to-slate-950/80" />

        {/* Geometric shapes */}
        <div className="absolute top-16 right-[8%] w-14 h-14 border border-rose-500/15 rounded-full animate-drift pointer-events-none" />
        <div className="absolute bottom-24 left-[6%] w-8 h-8 border-2 border-orange-500/18 rotate-45 animate-drift-slow pointer-events-none" />
        <div className="absolute top-[55%] right-[20%] w-2.5 h-2.5 bg-rose-400/30 rounded-full animate-pulse-glow pointer-events-none" />
        <div className="absolute top-[30%] left-[40%] w-2 h-2 bg-amber-400/25 rounded-full animate-pulse-glow-slow pointer-events-none" />
        <div className="absolute bottom-[35%] right-[40%] w-6 h-6 border border-rose-500/10 rounded-full animate-spin-slow pointer-events-none" />
        <div className="absolute top-[20%] left-[15%] w-20 h-[1px] bg-gradient-to-r from-transparent via-rose-400/15 to-transparent animate-drift-slow pointer-events-none" />
        <div className="absolute bottom-[15%] left-[55%] w-10 h-10 border border-orange-400/10 rounded-full animate-drift pointer-events-none" />
        <div className="absolute top-[70%] left-[10%] w-3 h-3 border border-amber-400/15 rotate-45 animate-float pointer-events-none" />

        <div className="relative max-w-7xl mx-auto px-6">
          <SectionHeader title="My" highlight="Blog" />

          <p className="text-slate-400 -mt-6 mb-12 max-w-xl">
            A space for the things that don't fit on a résumé — travel, reflection, and whatever else is worth writing down.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {BLOG_POSTS.map((post) => (
              <FadeIn key={post.id}>
                <div className="group relative overflow-hidden rounded-2xl bg-slate-900 border border-white/5 hover:border-rose-500/20 transition-all duration-500 hover:shadow-xl hover:shadow-rose-500/10 flex flex-col">
                  {/* Cover image */}
                  <div className="relative h-56 overflow-hidden">
                    <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient}`} />
                    <img
                      src={post.image}
                      alt={post.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => { e.target.style.display = 'none'; }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/20 to-transparent" />
                    <div className={`absolute top-4 left-4 px-3 py-1 text-xs font-semibold text-white rounded-full bg-gradient-to-r ${post.tagColor}`}>
                      {post.tag}
                    </div>
                  </div>

                  {/* Card content */}
                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center gap-4 text-xs text-slate-500 mb-3">
                      <span className="flex items-center gap-1.5"><Calendar size={12} />{post.date}</span>
                      <span className="flex items-center gap-1.5"><Clock size={12} />{post.readTime}</span>
                    </div>
                    <h3 className="text-xl font-semibold text-white mb-2 font-display leading-snug">
                      {post.title}
                    </h3>
                    <p className="text-slate-400 text-sm leading-relaxed mb-4 flex-1">{post.excerpt}</p>

                    <a
                      href={`#/blog/${post.slug}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-rose-400 hover:text-rose-300 transition-colors font-medium"
                    >
                      <BookOpen size={15} />
                      Read More
                      <ArrowRight size={14} />
                    </a>
                  </div>
                </div>
              </FadeIn>
            ))}

            {/* Placeholder "coming soon" card */}
            <FadeIn delay={0.1}>
              <div className="h-full min-h-[300px] rounded-2xl border border-dashed border-white/10 flex flex-col items-center justify-center gap-3 text-slate-600 hover:border-rose-500/20 hover:text-slate-500 transition-all duration-300 p-8">
                <BookOpen size={32} />
                <p className="text-sm font-medium text-center">More posts coming soon</p>
                <p className="text-xs text-center">Add entries to BLOG_POSTS in blogData.js</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          CONTACT
      ═══════════════════════════════════════════════════════════════════════ */}
      <section id="contact" className="relative py-24 lg:py-32 overflow-hidden" style={{ zIndex: 1 }}>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-950/60 via-slate-900/30 to-slate-950/60" />
        {/* Geometric shapes */}
        <div className="absolute top-20 left-[15%] w-14 h-14 border border-violet-500/15 rounded-full animate-drift pointer-events-none" />
        <div className="absolute bottom-32 right-[12%] w-8 h-8 border-2 border-indigo-500/15 rotate-45 animate-drift-slow pointer-events-none" />
        <div className="absolute top-[45%] right-[30%] w-2.5 h-2.5 bg-fuchsia-400/30 rounded-full animate-pulse-glow pointer-events-none" />
        <div className="absolute bottom-[20%] left-[35%] w-5 h-5 border border-cyan-500/12 rounded animate-drift pointer-events-none" />
        <div className="absolute top-[25%] left-[50%] w-18 h-[1px] bg-gradient-to-r from-transparent via-violet-400/12 to-transparent animate-drift-slow pointer-events-none" />
        <div className="absolute bottom-[10%] right-[35%] w-2 h-2 bg-emerald-400/20 rounded-full animate-pulse-glow-slow pointer-events-none" />

        <div className="relative max-w-4xl mx-auto px-6 text-center">
          <FadeIn>
            <p className="text-violet-400 font-medium font-display mb-4 tracking-wide">What's Next?</p>
            <h2 className="text-4xl lg:text-5xl font-bold text-white mb-6 font-display">
              Get In <span className="gradient-text">Touch</span>
            </h2>
            <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
              I'm currently seeking Software Engineering opportunities. Feel free to reach out if
              you'd like to connect or discuss potential opportunities!
            </p>
          </FadeIn>

          <FadeIn delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <a
                href="mailto:troywu5@gmail.com"
                className="group p-6 rounded-xl bg-slate-800/30 border border-white/5 hover:border-violet-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5"
              >
                <Mail className="mx-auto text-violet-400 mb-3 group-hover:scale-110 transition-transform" size={28} />
                <h3 className="font-semibold text-white mb-1">Email</h3>
                <p className="text-sm text-slate-400">troywu5@gmail.com</p>
              </a>

              <a
                href="https://linkedin.com/in/troy-wu"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-xl bg-slate-800/30 border border-white/5 hover:border-violet-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5"
              >
                <Linkedin
                  className="mx-auto text-violet-400 mb-3 group-hover:scale-110 transition-transform"
                  size={28}
                />
                <h3 className="font-semibold text-white mb-1">LinkedIn</h3>
                <p className="text-sm text-slate-400">troy-wu</p>
              </a>

              <a
                href="https://github.com/troy-wu"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 rounded-xl bg-slate-800/30 border border-white/5 hover:border-violet-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-violet-500/5"
              >
                <Github
                  className="mx-auto text-violet-400 mb-3 group-hover:scale-110 transition-transform"
                  size={28}
                />
                <h3 className="font-semibold text-white mb-1">GitHub</h3>
                <p className="text-sm text-slate-400">troy-wu</p>
              </a>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ═══ Footer ═══ */}
      <footer className="py-8 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-sm text-slate-500">
            &copy; {new Date().getFullYear()} Troy Wu. All rights reserved.
          </p>
          <div className="flex gap-5">
            <a
              href="https://github.com/troy-wu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-violet-400 transition-colors"
            >
              <Github size={18} />
            </a>
            <a
              href="https://linkedin.com/in/troy-wu"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500 hover:text-violet-400 transition-colors"
            >
              <Linkedin size={18} />
            </a>
            <a href="mailto:troywu5@gmail.com" className="text-slate-500 hover:text-violet-400 transition-colors">
              <Mail size={18} />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}