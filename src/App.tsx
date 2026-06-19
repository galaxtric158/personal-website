import { useCallback, useEffect, useRef, useState } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import { useSound } from './hooks/useSound';
import { StarryBackground } from './components/StarryBackground';
import { SettingsDropdown } from './components/SettingsDropdown';
import { StarDivider } from './components/StarDecorations';
import {
  Mail, Phone, Github, ChevronDown, Code2, Palette, MessageSquare,
  Trophy, GraduationCap, Briefcase, Sparkles, Menu, X,
  ExternalLink, Star, GitFork, Eye, Paintbrush, Instagram, Gamepad2,
  Wrench, Target, Wind, Download, Bot, Terminal, CloudSun, Cpu,
  Globe, BookOpen, Heart, Rocket, Home, Folder, Image,
} from 'lucide-react';

/* ─── Data ─── */

const activities = [
  {
    icon: MessageSquare, title: 'Junior Debate Club', period: 'Summer 2025 — Present',
    color: 'bg-bubble-50 text-bubble-600',
    points: ['Engaged and collaborated in weekly meetings with 15+ students','Coordinated and won the "JDC Championship" amongst other members','Selected as a representative for Tunas Muda School Olympics (sports day)'],
  },
  {
    icon: Code2, title: 'CS Club', period: 'Summer 2025 — Present',
    color: 'bg-sky-50 text-sky-600',
    points: ['Participated in bi-weekly technical workshops and coding challenges','Improved proficiency in Python and basic data structures','Built simple Scratch projects during hands-on sessions'],
  },
  {
    icon: Palette, title: 'Art Club', period: 'Summer 2025 — Present',
    color: 'bg-amber-50 text-amber-600',
    points: ['Attended bi-weekly technical art sessions with traditional mediums','Collaborated with 40 people to coordinate a school-wide art exhibition','Improved art skills through guided practice and peer feedback'],
  },
  {
    icon: Briefcase, title: 'Freelance Illustrator / 2D Artist', period: 'Ongoing',
    color: 'bg-rose-50 text-rose-600',
    points: ['Received financial profit through commissions for digital character designs','Served independent publishing clients globally','Designed 10+ custom illustrations using Paint Tool SAI'],
  },
];

const honors = [
  { icon: Trophy, title: 'International Chemistry Competition', badge: 'Top 3 / 60+',
    description: 'Selected to represent 7th graders in Tunas Muda School\'s MYP programme. Ranked top 3 out of ~60 students, qualifying to compete internationally in the ICQ.' },
  { icon: Sparkles, title: 'AI & Computer Vision Workshop', badge: 'Harvard-Led',
    description: 'Attended an intensive AI and Computer Vision workshop organized by HPAIR & Learn With Leaders, guided by a Harvard student.' },
];

const githubRepos = [
  { name: 'Jarvis', description: 'Jarvis from "Iron Man," in the palm of your hand.', url: 'https://github.com/galaxtric158/Jarvis', lang: 'Python', stars: 0, forks: 0, icon: Bot, accent: 'bubble' },
  { name: 'discord-weather-bot', description: 'A simple and elegant Discord bot that tracks the weather.', url: 'https://github.com/galaxtric158/discord-weather-bot', lang: 'Python', stars: 0, forks: 0, icon: CloudSun, accent: 'sky' },
  { name: 'YT2urPC', description: 'A program used to download YouTube videos.', url: 'https://github.com/galaxtric158/YT2urPC', lang: 'Python', stars: 0, forks: 0, icon: Download, accent: 'bubble' },
  { name: 'spinning-things', description: 'i made things spin on python haha funny haha cool', url: 'https://github.com/galaxtric158/spinning-things', lang: 'Python', stars: 0, forks: 0, icon: Wind, accent: 'sky' },
  { name: 'tests-and-stuff', description: 'Cool tests I created in Python to test certain things. (Typing speed, reaction speed, ect.)', url: 'https://github.com/galaxtric158/tests-and-stuff', lang: 'Python', stars: 0, forks: 0, icon: Target, accent: 'bubble' },
  { name: 'CoolCrosshairApp', description: 'just a cool crosshair app lolol', url: 'https://github.com/galaxtric158/CoolCrosshairApp', lang: 'Python', stars: 0, forks: 0, icon: Target, accent: 'ink' },
  { name: 'Kingly-Hub', description: 'a script hub for roblox', url: 'https://github.com/galaxtric158/Kingly-Hub', lang: 'Lua', stars: 1, forks: 0, icon: Gamepad2, accent: 'bubble' },
  { name: 'acollectionofmyfavoritescripts', description: 'A Collection Of My Favorite Scripts', url: 'https://github.com/galaxtric158/acollectionofmyfavoritescripts', lang: 'Lua', stars: 0, forks: 0, icon: Wrench, accent: 'sky' },
  { name: 'alilmultitool', description: 'just my little .bat file multitool i made', url: 'https://github.com/galaxtric158/alilmultitool', lang: 'Batch', stars: 0, forks: 0, icon: Terminal, accent: 'ink' },
  { name: 'SystemTool', description: 'SystemTool is a batch file script used to figure out information about your system.', url: 'https://github.com/galaxtric158/SystemTool', lang: 'Batch', stars: 0, forks: 0, icon: Cpu, accent: 'bubble' },
];

const skills = {
  languages: [
    { name: 'English', level: 'Fluent' }, { name: 'Indonesian', level: 'Fluent' },
    { name: 'Japanese', level: 'Basic' }, { name: 'Mandarin', level: 'Entry Level' },
  ],
  coding: [
    { name: 'Python', level: 90 }, { name: 'Lua', level: 75 },
    { name: 'Arduino (INO)', level: 60 }, { name: 'Batch (.bat)', level: 50 },
  ],
};

/* ─── Shared Components ─── */

function AnimatedSection({ children, className = '', delay = 0 }: { children: React.ReactNode; className?: string; delay?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } }, { threshold: 0.06 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);
  return (
    <div ref={ref} className={`transition-all duration-500 ease-out ${className} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-5'}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Navbar({ sound }: { sound: ReturnType<typeof useSound> }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navItems = [
    { label: 'Home', href: '/', icon: Home },
    { label: 'Projects', href: '/projects', icon: Folder },
    { label: 'Art', href: '/art', icon: Image },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? 'bg-cream-50/80 backdrop-blur-xl border-b border-ink-200/40 shadow-soft' : 'bg-transparent'}`}>
      <div className="max-w-5xl mx-auto px-6 h-14 flex items-center justify-between">
        <div className="flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              to={item.href}
              onMouseEnter={() => sound.bloop()}
              onClick={() => sound.tick()}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium transition-all duration-150 flex items-center gap-1.5 ${
                isActive(item.href)
                  ? 'bg-bubble-50 text-bubble-700'
                  : 'text-ink-500 hover:text-bubble-600 hover:bg-bubble-50'
              }`}
            >
              <item.icon size={13} />
              {item.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://github.com/galaxtric158"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.bloop()}
            onClick={() => sound.tick()}
            className="p-2 rounded-xl transition-all duration-150 text-ink-400 hover:text-bubble-600 hover:bg-bubble-50"
            aria-label="GitHub"
          >
            <Github size={15} />
          </a>
          <a
            href="https://www.instagram.com/yapstardust/"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={() => sound.bloop()}
            onClick={() => sound.tick()}
            className="p-2 rounded-xl transition-all duration-150 text-ink-400 hover:text-pink-500 hover:bg-pink-50"
            aria-label="Instagram"
          >
            <Instagram size={15} />
          </a>
        </div>
      </div>
    </nav>
  );
}

function Footer({ sound }: { sound: ReturnType<typeof useSound> }) {
  return (
    <footer className="py-10 border-t border-ink-200/40">
      <div className="max-w-5xl mx-auto px-6">
        <div className="flex flex-col items-center gap-4">
          <div className="flex items-center gap-2">
            <Sparkles size={14} className="text-bubble-400 animate-pulse-soft" />
            <span className="font-display font-bold text-sm text-ink-800">Edmund Joel Kusnadi</span>
            <Sparkles size={14} className="text-bubble-400 animate-pulse-soft" style={{ animationDelay: '1s' }} />
          </div>
          <p className="text-[11px] font-mono text-ink-300">student · developer · artist</p>
          <div className="flex items-center gap-2 mt-1">
            {[
              { href: 'mailto:edmund.kusnadi@gmail.com', icon: Mail, label: 'Email' },
              { href: 'https://github.com/galaxtric158', icon: Github, label: 'GitHub' },
              { href: 'https://www.instagram.com/yapstardust/', icon: Instagram, label: 'Instagram' },
              { href: 'tel:+6281292912220', icon: Phone, label: 'Phone' },
            ].map((link) => (
              <a
                key={link.label}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                onMouseEnter={() => sound.bloop()}
                onClick={() => sound.tick()}
                className="p-2 rounded-xl border transition-all duration-150 bg-white border-ink-200 text-ink-400 hover:text-bubble-600 hover:border-bubble-300 hover:shadow-soft"
                aria-label={link.label}
              >
                <link.icon size={14} />
              </a>
            ))}
          </div>
          <p className="text-[10px] font-mono mt-2 text-ink-200">
            made with curiosity and way too much caffeine
          </p>
        </div>
      </div>
    </footer>
  );
}

/* ─── Pages ─── */

function HomePage({ sound }: { sound: ReturnType<typeof useSound> }) {
  const textMuted = 'text-ink-500';
  const textHeading = 'text-ink-900';
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const rect = heroRef.current.getBoundingClientRect();
      setMousePos({ x: ((e.clientX - rect.left) / rect.width - 0.5) * 20, y: ((e.clientY - rect.top) / rect.height - 0.5) * 20 });
    };
    const el = heroRef.current;
    if (el) el.addEventListener('mousemove', handleMove);
    return () => { if (el) el.removeEventListener('mousemove', handleMove); };
  }, []);

  return (
    <>
      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[92vh] flex items-center justify-center overflow-hidden pt-14">
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-[12%] left-[8%] w-48 h-48 bg-bubble-300/30 rounded-full blur-3xl animate-float transition-transform duration-700" style={{ transform: `translate(${mousePos.x}px, ${mousePos.y}px)` }} />
          <div className="absolute top-[30%] right-[10%] w-36 h-36 bg-sky-300/30 rounded-full blur-2xl animate-float-slow transition-transform duration-700" style={{ transform: `translate(${-mousePos.x * 0.7}px, ${-mousePos.y * 0.7}px)`, animationDelay: '1s' }} />
          <div className="absolute bottom-[18%] left-[18%] w-32 h-32 bg-bubble-200/40 rounded-full blur-2xl animate-float transition-transform duration-700" style={{ transform: `translate(${mousePos.x * 0.5}px, ${-mousePos.y * 0.5}px)`, animationDelay: '2s' }} />
        </div>

        <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
          <div className="animate-fade-in-up">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-mono font-bold mb-6 bg-bubble-50 border border-bubble-200/60 text-bubble-700">
              <Sparkles size={13} />
              student · developer · artist
            </span>
          </div>

          <h1 className="font-display text-5xl md:text-7xl font-bold mb-4 tracking-tight animate-fade-in-up text-ink-900" style={{ animationDelay: '80ms' }}>
            Edmund Joel <span className="gradient-text">Kusnadi</span>
          </h1>

          <p className="text-base md:text-lg max-w-xl mx-auto mb-8 leading-relaxed animate-fade-in-up text-ink-500" style={{ animationDelay: '160ms' }}>
            me. middle-school. ambitious.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 animate-fade-in-up" style={{ animationDelay: '240ms' }}>
            <Link to="/projects" onMouseEnter={() => sound.bloop()} onClick={() => sound.tick()} className="btn-primary">
              <Rocket size={15} /> My Stuff
            </Link>
            <Link to="/art" onMouseEnter={() => sound.bloop()} onClick={() => sound.tick()} className="btn-ghost">
              <Paintbrush size={15} /> My Art
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-5 text-xs font-mono animate-fade-in text-ink-400" style={{ animationDelay: '400ms' }}>
            <span className="flex items-center gap-1.5"><Mail size={12} className="text-bubble-500" />edmund.kusnadi@gmail.com</span>
            <span className="flex items-center gap-1.5"><Phone size={12} className="text-bubble-500" />(+62) 812-9291-2220</span>
          </div>
        </div>

        <a href="#about" onClick={() => sound.tick()} className="absolute bottom-8 left-1/2 -translate-x-1/2 transition-colors animate-bounce-soft text-ink-300 hover:text-bubble-500" aria-label="Scroll down">
          <ChevronDown size={22} />
        </a>
      </section>

      {/* About */}
      <section id="about" className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <div className="grid md:grid-cols-2 gap-10 items-center">
              <div>
                <span className="text-bubble-600 text-xs font-mono font-bold tracking-wider uppercase mb-3 block">About Me</span>
                <h2 className="font-display text-3xl md:text-4xl font-bold mb-5 text-ink-900">Bridging <span className="gradient-text">Art & Code</span></h2>
                <p className="text-sm leading-relaxed mb-3 text-ink-500">I am a student at Tunas Muda School Meruya who finds joy in creating — whether that means writing Python scripts, designing digital illustrations, or debating complex topics.</p>
                <p className="text-sm leading-relaxed text-ink-500">From building voice AI assistants to freelancing as a 2D artist, I believe the best work happens when creativity meets technical skill.</p>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {[
                  { icon: Code2, label: 'Developer', count: '5+ Projects' },
                  { icon: Palette, label: 'Artist', count: '10+ Commissions' },
                  { icon: MessageSquare, label: 'Debater', count: 'JDC Champion' },
                  { icon: Globe, label: 'Global Reach', count: 'International Clients' },
                ].map((item) => (
                  <div key={item.label} onMouseEnter={() => sound.bloop()} className="card-hover p-5 rounded-3xl cursor-default">
                    <item.icon size={20} className="text-bubble-500 mb-2" />
                    <div className="font-display font-semibold text-sm text-ink-900">{item.label}</div>
                    <div className="text-[11px] font-mono mt-0.5 text-ink-400">{item.count}</div>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <StarDivider />

      {/* Education */}
      <section id="education" className="py-20 md:py-28 bg-white/50">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <span className="text-bubble-600 text-xs font-mono font-bold tracking-wider uppercase mb-3 block">Education</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-10 text-ink-900">Where I Learn & <span className="gradient-text">Grow</span></h2>
          </AnimatedSection>
          <AnimatedSection delay={80}>
            <div onMouseEnter={() => sound.bloop()} className="card-hover p-6 md:p-8 rounded-3xl border-l-[6px] border-bubble-400">
              <div className="flex items-start gap-4">
                <div className="p-2.5 rounded-2xl bg-bubble-50 text-bubble-500 shrink-0"><GraduationCap size={24} /></div>
                <div>
                  <h3 className="font-display text-lg font-bold mb-0.5 text-ink-900">Tunas Muda School Meruya</h3>
                  <p className="text-xs font-mono mb-2 text-ink-400">Middle School — MYP Programme</p>
                  <p className="text-sm leading-relaxed text-ink-500">Currently pursuing the Middle Years Programme (MYP) at Tunas Muda School, actively participating in academic and extracurricular activities that foster critical thinking, creativity, and collaboration.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <StarDivider />

      {/* Activities */}
      <section id="activities" className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <span className="text-bubble-600 text-xs font-mono font-bold tracking-wider uppercase mb-3 block">Extracurriculars</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-ink-900">Beyond the <span className="gradient-text">Classroom</span></h2>
            <p className="text-sm max-w-lg mb-10 text-ink-500">Growth happens outside comfort zones. Here is how I spend my time when class ends.</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-4">
            {activities.map((a, i) => (
              <AnimatedSection key={a.title} delay={i * 80}>
                <div onMouseEnter={() => sound.bloop()} className="card-hover p-6 rounded-3xl h-full cursor-default">
                  <div className="flex items-start justify-between mb-3">
                    <div className={`p-2.5 rounded-2xl ${a.color}`}><a.icon size={20} /></div>
                    <span className="text-[11px] font-mono px-2 py-1 rounded-lg bg-ink-50 text-ink-400">{a.period}</span>
                  </div>
                  <h3 className="font-display text-base font-bold mb-2 text-ink-900">{a.title}</h3>
                  <ul className="space-y-1.5">
                    {a.points.map((p) => (
                      <li key={p} className="flex items-start gap-2 text-xs leading-relaxed text-ink-500">
                        <span className="w-1 h-1 rounded-full bg-bubble-400 mt-1.5 shrink-0" />{p}
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <StarDivider />

      {/* Honors */}
      <section id="honors" className="py-20 md:py-28 bg-white/50">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <span className="text-bubble-600 text-xs font-mono font-bold tracking-wider uppercase mb-3 block">Honors</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-3 text-ink-900">Recognition & <span className="gradient-text">Achievements</span></h2>
            <p className="text-sm max-w-lg mb-10 text-ink-500">Milestones that reflect dedication, curiosity, and the pursuit of excellence.</p>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-4">
            {honors.map((h, i) => (
              <AnimatedSection key={h.title} delay={i * 80}>
                <div onMouseEnter={() => sound.bloop()} className="card-hover p-6 rounded-3xl relative overflow-hidden h-full cursor-default">
                  <div className="absolute top-0 right-0 w-24 h-24 bg-bubble-100/40 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />
                  <div className="relative">
                    <div className="flex items-center gap-2.5 mb-3">
                      <div className="p-2 rounded-xl bg-amber-50 text-amber-500"><h.icon size={18} /></div>
                      <span className="text-[11px] font-mono font-bold text-amber-600 bg-amber-50 px-2 py-1 rounded-lg">{h.badge}</span>
                    </div>
                    <h3 className="font-display text-base font-bold mb-1.5 text-ink-900">{h.title}</h3>
                    <p className="text-xs leading-relaxed text-ink-500">{h.description}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <StarDivider />

      {/* Skills */}
      <section id="skills" className="py-20 md:py-28">
        <div className="max-w-5xl mx-auto px-6">
          <AnimatedSection>
            <span className="text-bubble-600 text-xs font-mono font-bold tracking-wider uppercase mb-3 block">Skills</span>
            <h2 className="font-display text-3xl md:text-4xl font-bold mb-10 text-ink-900">Tools & <span className="gradient-text">Languages</span></h2>
          </AnimatedSection>
          <div className="grid md:grid-cols-2 gap-6">
            <AnimatedSection delay={80}>
              <div onMouseEnter={() => sound.bloop()} className="card p-6 rounded-3xl">
                <div className="flex items-center gap-2.5 mb-5">
                  <Globe size={18} className="text-bubble-500" />
                  <h3 className="font-display text-sm font-bold text-ink-900">Languages</h3>
                </div>
                <div className="space-y-3">
                  {skills.languages.map((l) => (
                    <div key={l.name} className="flex items-center justify-between">
                      <span className="text-xs font-medium text-ink-600">{l.name}</span>
                      <span className={`text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg ${l.level === 'Fluent' ? 'bg-bubble-50 text-bubble-600' : l.level === 'Basic' ? 'bg-sky-50 text-sky-600' : 'bg-ink-50 text-ink-400'}`}>{l.level}</span>
                    </div>
                  ))}
                </div>
              </div>
            </AnimatedSection>
            <AnimatedSection delay={160}>
              <div onMouseEnter={() => sound.bloop()} className="card p-6 rounded-3xl">
                <div className="flex items-center gap-2.5 mb-5">
                  <Cpu size={18} className="text-sky-500" />
                  <h3 className="font-display text-sm font-bold text-ink-900">Coding</h3>
                </div>
                <div className="space-y-4">
                  {skills.coding.map((c) => (
                    <div key={c.name}>
                      <div className="flex items-center justify-between mb-1.5">
                        <span className="text-xs font-medium text-ink-600">{c.name}</span>
                        <span className="text-[11px] font-mono text-ink-400">{c.level}%</span>
                      </div>
                      <div className="h-2 rounded-full bg-ink-100 overflow-hidden">
                        <div className="h-full rounded-full bg-gradient-to-r from-bubble-400 to-sky-400 transition-all duration-1000 ease-out" style={{ width: `${c.level}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-5 pt-4 border-t border-ink-100">
                  <div className="flex items-center gap-2 text-xs text-ink-400">
                    <BookOpen size={14} className="text-bubble-500" />
                    <span>10+ repos on</span>
                    <a href="https://github.com/galaxtric158" target="_blank" rel="noopener noreferrer" onMouseEnter={() => sound.bloop()} onClick={() => sound.tick()} className="text-bubble-600 hover:underline inline-flex items-center gap-1 font-mono font-bold">GitHub <ExternalLink size={10} /></a>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </>
  );
}

function ProjectsPage({ sound }: { sound: ReturnType<typeof useSound> }) {
  const textMuted = 'text-ink-500';
  const textHeading = 'text-ink-900';

  const accentMap: Record<string, string> = {
    bubble: 'border-bubble-200/60 text-bubble-700 bg-bubble-50',
    sky: 'border-sky-200/60 text-sky-700 bg-sky-50',
    ink: 'border-ink-200/60 text-ink-600 bg-ink-50',
  };

  const iconMap: Record<string, string> = {
    bubble: 'text-bubble-500',
    sky: 'text-sky-500',
    ink: 'text-ink-500',
  };

  return (
    <div className="pt-20 pb-10">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles size={16} className="text-bubble-400 animate-pulse-soft" />
              <span className="text-bubble-600 text-xs font-mono font-bold tracking-wider uppercase">Projects</span>
              <Sparkles size={16} className="text-bubble-400 animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 text-ink-900">My GitHub <span className="gradient-text">Stuff</span></h1>
            <p className="text-sm max-w-lg mx-auto text-ink-500">Real repos I have built. Some serious, some just for fun. All me.</p>
          </div>
        </AnimatedSection>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {githubRepos.map((p, i) => (
            <AnimatedSection key={p.name} delay={i * 60}>
              <a href={p.url} target="_blank" rel="noopener noreferrer" onMouseEnter={() => sound.bloop()} onClick={() => sound.tick()} className="card-hover p-5 rounded-3xl h-full flex flex-col cursor-pointer block">
                <div className="flex items-start justify-between mb-3">
                  <div className={`p-2 rounded-xl bg-white border border-ink-100 shadow-inner-soft ${iconMap[p.accent]}`}><p.icon size={18} /></div>
                  <div className="flex items-center gap-2 text-[11px] text-ink-400 font-mono">
                    {p.stars > 0 && <span className="flex items-center gap-0.5"><Star size={11} className="text-amber-400" /> {p.stars}</span>}
                    {p.forks > 0 && <span className="flex items-center gap-0.5"><GitFork size={11} /> {p.forks}</span>}
                  </div>
                </div>
                <h3 className="font-display text-sm font-bold mb-1 text-ink-900">{p.name}</h3>
                <span className={`tag ${accentMap[p.accent]} mb-2 w-fit`}>{p.lang}</span>
                <p className="text-xs leading-relaxed flex-1 text-ink-500">{p.description}</p>
                <div className="mt-3 flex items-center gap-1 text-[11px] text-bubble-600 font-mono font-bold opacity-0 group-hover:opacity-100 transition-opacity">
                  <ExternalLink size={10} /> Open on GitHub
                </div>
              </a>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection delay={200}>
          <div className="mt-12 text-center">
            <a href="https://github.com/galaxtric158" target="_blank" rel="noopener noreferrer" onMouseEnter={() => sound.bloop()} onClick={() => sound.tick()} className="inline-flex items-center gap-2 text-xs transition-colors font-mono text-ink-400 hover:text-bubble-600">
              <Github size={14} /> github.com/galaxtric158 <ExternalLink size={12} />
            </a>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

function ArtPage({ sound }: { sound: ReturnType<typeof useSound> }) {
  const [showEmbed, setShowEmbed] = useState(false);
  const textMuted = 'text-ink-500';
  const textHeading = 'text-ink-900';

  return (
    <div className="pt-20 pb-10">
      <div className="max-w-5xl mx-auto px-6">
        <AnimatedSection>
          <div className="text-center mb-12">
            <div className="flex items-center justify-center gap-2 mb-3">
              <Sparkles size={16} className="text-bubble-400 animate-pulse-soft" />
              <span className="text-bubble-600 text-xs font-mono font-bold tracking-wider uppercase">Art Portfolio</span>
              <Sparkles size={16} className="text-bubble-400 animate-pulse-soft" style={{ animationDelay: '0.5s' }} />
            </div>
            <h1 className="font-display text-4xl md:text-5xl font-bold mb-3 text-ink-900">My <span className="gradient-text">Art</span></h1>
            <p className="text-sm max-w-lg mx-auto text-ink-500">I draw characters, designs, and whatever comes to mind. Check out my work on Instagram!</p>
          </div>
        </AnimatedSection>

        <AnimatedSection delay={80}>
          <div className="grid md:grid-cols-2 gap-6">
            <div onMouseEnter={() => sound.bloop()} className="card p-6 rounded-3xl">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2.5 rounded-2xl bg-gradient-to-br from-purple-400 to-pink-400 text-white"><Instagram size={20} /></div>
                <div>
                  <h3 className="font-display text-sm font-bold text-ink-900">@yapstardust</h3>
                  <p className="text-[11px] font-mono text-ink-400">Digital Illustrations & Commissions</p>
                </div>
              </div>

              {!showEmbed ? (
                <button onClick={() => { setShowEmbed(true); sound.tick(); }} onMouseEnter={() => sound.bloop()} className="w-full btn-primary justify-center">
                  <Eye size={15} /> View Instagram Profile
                </button>
              ) : (
                <div className="rounded-2xl overflow-hidden border border-ink-200/60">
                  <iframe src="https://www.instagram.com/yapstardust/embed" className="w-full h-[500px]" frameBorder="0" scrolling="no" allowTransparency title="Instagram Profile" />
                </div>
              )}

              <a href="https://www.instagram.com/yapstardust/" target="_blank" rel="noopener noreferrer" onMouseEnter={() => sound.bloop()} onClick={() => sound.tick()} className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-mono transition-colors text-ink-400 hover:text-pink-500">
                <ExternalLink size={10} /> Open on Instagram
              </a>
            </div>

            <div className="space-y-4">
              <div onMouseEnter={() => sound.bloop()} className="card-hover p-5 rounded-3xl cursor-default">
                <div className="flex items-center gap-3 mb-3">
                  <Paintbrush size={20} className="text-bubble-500" />
                  <h3 className="font-display text-sm font-bold text-ink-900">Tools I Use</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {['Paint Tool SAI', 'Digital Art', 'Traditional Mediums', 'Character Design', 'Illustration'].map((t) => (
                    <span key={t} className="tag bg-bubble-50 text-bubble-700 border-bubble-200/60">{t}</span>
                  ))}
                </div>
              </div>

              <div onMouseEnter={() => sound.bloop()} className="card-hover p-5 rounded-3xl cursor-default">
                <div className="flex items-center gap-3 mb-3">
                  <Heart size={20} className="text-rose-500" />
                  <h3 className="font-display text-sm font-bold text-ink-900">Commission Info</h3>
                </div>
                <p className="text-xs leading-relaxed text-ink-500">I take commissions for custom digital character designs! I have worked with independent publishing clients globally and designed 10+ custom illustrations. DM me on Instagram if you are interested.</p>
              </div>

              <div onMouseEnter={() => sound.bloop()} className="card-hover p-5 rounded-3xl cursor-default">
                <div className="flex items-center gap-3 mb-3">
                  <Sparkles size={20} className="text-amber-500" />
                  <h3 className="font-display text-sm font-bold text-ink-900">Art Club Highlights</h3>
                </div>
                <p className="text-xs leading-relaxed text-ink-500">Collaborated with 40 people to coordinate a school-wide art exhibition at Tunas Muda School. Attended bi-weekly technical art sessions using traditional mediums.</p>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

/* ─── App Shell ─── */

function AppShell() {
  const sound = useSound();
  const [musicPlaying, setMusicPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3?filename=lofi-study-112778.mp3');
    audioRef.current.loop = true;
    audioRef.current.volume = 0.25;
    return () => { audioRef.current?.pause(); };
  }, []);

  const toggleMusic = useCallback(() => {
    if (!audioRef.current) return;
    if (musicPlaying) { audioRef.current.pause(); setMusicPlaying(false); }
    else { audioRef.current.play().catch(() => {}); setMusicPlaying(true); }
  }, [musicPlaying]);

  return (
    <div className="min-h-screen relative bg-cream-50">
      <StarryBackground />
      <div className="relative z-10">
        <Navbar sound={sound} />
        <Routes>
          <Route path="/" element={<HomePage sound={sound} />} />
          <Route path="/projects" element={<ProjectsPage sound={sound} />} />
          <Route path="/art" element={<ArtPage sound={sound} />} />
        </Routes>
        <Footer sound={sound} />
      </div>
      <SettingsDropdown sound={sound} musicPlaying={musicPlaying} onToggleMusic={toggleMusic} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AppShell />
    </BrowserRouter>
  );
}