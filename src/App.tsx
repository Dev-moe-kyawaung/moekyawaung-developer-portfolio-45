import { useState, useEffect, useMemo, useCallback } from 'react';
import { TypeAnimation } from 'react-type-animation';
import {
  FiExternalLink, FiVolume2, FiVolumeX, FiCopy, FiCheck, FiMapPin,
  FiSearch, FiPhone, FiMail, FiShare2, FiX, FiChevronRight,
  FiCloud, FiCpu, FiShield, FiCompass, FiLayers,
  FiPlay, FiZap, FiGrid, FiBox, FiTrendingUp,
} from 'react-icons/fi';
import { FaGithub, FaAndroid, FaCertificate, FaRocket, FaCrown } from 'react-icons/fa';
import {
  APPS, PILLARS, CERTS, CERT_CATS, PRODUCTS, REVENUE,
  GITHUB_NODES, LOVABLE, EMAILS, SOCIALS, GALLERY, PROFILE_IMG,
  type AppNode,
} from './data';
import { playSFX, type SFX, NeonEngine, CinematicBG } from './engine';
import { AICore } from './AICore';

export default function App() {
  const [muted, setMuted] = useState(false);
  const [booting, setBooting] = useState(true);
  const [bootLine, setBootLine] = useState(0);
  const [selected, setSelected] = useState<AppNode | null>(null);
  const [copied, setCopied] = useState<string | null>(null);
  const [cq, setCq] = useState('');
  const [cc, setCc] = useState('ALL');

  const snd = useCallback((t: SFX) => { if (!muted) playSFX(t); }, [muted]);

  /* ── BOOT SEQUENCE ── */
  const bootLines = useMemo(() => [
    '> NEXUS OS v3.0 — CYBER-CINEMATIC MASTER PACKAGE',
    '> initializing neon 3D engine ............ OK',
    '> mounting 16 application modules ........ OK',
    '> loading multi-persona AI core .......... OK',
    '> calibrating sound identity ............. OK',
    '> establishing brand ecosystem ........... OK',
    '> OPERATOR: MOE KYAW AUNG // မိုးကျော်အောင်',
    '> ROLE: SENIOR MOBILE ARCHITECT · FOUNDER',
    '> STATUS: ALL SYSTEMS NOMINAL — WELCOME',
  ], []);

  useEffect(() => {
    if (!booting) return;
    if (bootLine < bootLines.length) {
      const to = setTimeout(() => { setBootLine(l => l + 1); }, bootLine === 0 ? 400 : 260);
      return () => clearTimeout(to);
    }
    const done = setTimeout(() => setBooting(false), 700);
    return () => clearTimeout(done);
  }, [bootLine, booting, bootLines.length]);

  const skipBoot = () => { playSFX('whoosh'); setBooting(false); };

  /* ── LIVE CLOCK ── */
  const [clock, setClock] = useState('');
  useEffect(() => {
    const t = () => setClock(new Date().toLocaleTimeString('en-US', { hour12: false }));
    t(); const i = setInterval(t, 1000); return () => clearInterval(i);
  }, []);

  const copy = (t: string) => { navigator.clipboard.writeText(t); snd('success'); setCopied(t); setTimeout(() => setCopied(null), 2000); };
  const go = (id: string) => { snd('select'); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }); };
  const openApp = (a: AppNode) => { snd('teleport'); setSelected(a); };

  const shownCerts = useMemo(() => CERTS.filter(c =>
    (cc === 'ALL' || c.c === cc) &&
    (c.n.toLowerCase().includes(cq.toLowerCase()) || c.id.includes(cq) || c.c.toLowerCase().includes(cq.toLowerCase()))
  ), [cq, cc]);

  const ticker = [
    'NEXUS OS v3.0 — MASTER PACKAGE', 'MOE KYAW AUNG · SENIOR MOBILE ARCHITECT',
    '1,000,000+ DOWNLOADS', '50,000+ MONTHLY ACTIVE USERS', '16 PRODUCTION APPS',
    '82+ CERTIFICATIONS', '43 GITHUB NODES · 38 WEB APPS', 'FLAGSHIP: PULSESYNC',
    'KOTLIN · COMPOSE · CLEAN ARCHITECTURE', 'OPEN TO CO-FOUNDER ROLES',
    'TACHILEIK 🇲🇲 ↔ BANGKOK 🇹🇭',
  ];

  /* ═══════════ BOOT SCREEN ═══════════ */
  if (booting) {
    return (
      <div className="fixed inset-0 bg-[#04060f] z-[100] flex flex-col items-center justify-center px-6 font-plex text-sm">
        <CinematicBG />
        <div className="relative z-10 w-full max-w-lg">
          <div className="flex justify-center mb-8">
            <NeonEngine size={200} />
          </div>
          <div className="nx-panel rounded-xl p-6 min-h-[240px]">
            <span className="nx-corner nx-tl" /><span className="nx-corner nx-tr" />
            <span className="nx-corner nx-bl" /><span className="nx-corner nx-br" />
            {bootLines.slice(0, bootLine).map((l, i) => (
              <p key={i} className={`leading-relaxed ${i === 6 ? 'text-cyan-300 font-bold mt-2' : i >= 7 ? 'text-emerald-300' : 'text-white/70'}`}>
                {l}
              </p>
            ))}
            {bootLine < bootLines.length && <span className="inline-block w-2 h-4 bg-cyan-400 animate-pulse align-middle" />}
          </div>
          <button onClick={skipBoot} className="mt-6 mx-auto block nx-btn px-6 py-2 text-xs">SKIP INTRO ▸</button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#04060f] text-[#e6edf7] relative overflow-x-hidden nx-grid">
      <CinematicBG />
      <div className="fixed inset-0 nx-vignette pointer-events-none z-[1]" />
      <div className="fixed inset-0 nx-noise pointer-events-none z-[1]" />

      <AICore muted={muted} />

      {/* ═══════════ TOP BAR ═══════════ */}
      <header className="fixed top-0 inset-x-0 z-40 bg-[#070b1a]/92 backdrop-blur-xl border-b border-cyan-400/25">
        <div className="max-w-7xl mx-auto px-4 py-2 flex items-center justify-between gap-3">
          <button onClick={() => go('home')} className="flex items-center gap-3 shrink-0">
            <span className="w-9 h-9 rounded-lg bg-[#0a1024] border border-cyan-400/60 flex items-center justify-center text-cyan-400 shadow-[0_0_14px_rgba(0,229,255,0.4)]">
              <span className="spin-slow text-lg">◈</span>
            </span>
            <span className="text-left">
              <span className="block font-orbitron font-extrabold text-[11px] tracking-widest text-white">NEXUS OS <span className="text-cyan-400">v3.0</span></span>
              <span className="block text-[10px] font-plex text-cyan-400/70">MOE KYAW AUNG · MASTER PACKAGE</span>
            </span>
          </button>

          <nav className="hidden lg:flex items-center gap-1 font-orbitron text-[11px] font-bold">
            {[
              { id: 'home', l: 'HOME' },
              { id: 'launcher', l: 'APPS' },
              { id: 'architecture', l: 'ENGINE' },
              { id: 'founder', l: 'FOUNDER' },
              { id: 'store', l: 'STORE' },
              { id: 'brand', l: 'BRAND' },
              { id: 'contact', l: 'CONTACT' },
            ].map(x => (
              <button key={x.id} onClick={() => go(x.id)} className="px-3 py-1.5 rounded text-white/60 hover:text-cyan-300 hover:bg-white/5 transition">{x.l}</button>
            ))}
          </nav>

          <div className="flex items-center gap-2 shrink-0">
            <span className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded bg-[#0a1024] border border-cyan-400/30 text-[10px] font-plex text-cyan-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 beacon" /> {clock}
            </span>
            <button onClick={() => { setMuted(!muted); if (muted) playSFX('select'); }}
              className={`p-2 rounded border transition ${!muted ? 'border-cyan-400/60 text-cyan-300 bg-cyan-400/10' : 'border-white/15 text-white/40'}`}>
              {!muted ? <FiVolume2 /> : <FiVolumeX />}
            </button>
          </div>
        </div>
        <div className="bg-[#0a1024] overflow-hidden border-t border-cyan-400/15">
          <div className="flex whitespace-nowrap py-1 ticker font-plex text-[10px] text-cyan-400/70">
            {[...ticker, ...ticker].map((s, i) => (
              <span key={i} className="px-6 flex items-center gap-2 shrink-0"><span className="w-1 h-1 rounded-full bg-cyan-400" /> {s}</span>
            ))}
          </div>
        </div>
      </header>

      {/* ═══════════ HERO ═══════════ */}
      <section id="home" className="relative z-10 min-h-screen flex items-center px-4 pt-32 pb-20">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-80">
          <NeonEngine size={640} intense />
        </div>
        <div className="relative z-10 max-w-5xl mx-auto text-center">
          <div className="inline-flex flex-wrap items-center justify-center gap-3 px-4 py-1.5 rounded-full bg-[#0a1024]/85 border border-cyan-400/40 mb-6 text-[11px] font-plex backdrop-blur">
            <span className="text-cyan-300 flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-emerald-400 beacon" /> MASTER PACKAGE v3.0 · PREMIUM EDITION</span>
            <span className="text-white/30">|</span>
            <span className="text-magenta-300" style={{ color: '#ff2d95' }}>20 SYSTEMS UNIFIED</span>
          </div>

          <div className="relative inline-block mb-6">
            <span className="absolute inset-0 rounded-full pulse-ring border-2 border-cyan-400" />
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full p-[3px] bg-gradient-to-br from-cyan-400 via-violet-500 to-magenta-500 shadow-[0_0_40px_rgba(0,229,255,0.4)]"
              style={{ background: 'linear-gradient(135deg, #00e5ff, #8b5cf6, #ff2d95)' }}>
              <img src={PROFILE_IMG} alt="Moe Kyaw Aung" className="w-full h-full object-cover rounded-full" />
            </div>
            <span className="absolute -bottom-1 -right-1 w-9 h-9 rounded-full bg-[#0a1024] border border-cyan-400 flex items-center justify-center text-cyan-400"><FaCrown /></span>
          </div>

          <p className="text-cyan-300 font-plex tracking-[0.25em] text-xs mb-2">မိုးကျော်အောင် // MOE KYAW AUNG</p>
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-orbitron font-black leading-none mb-4">
            <span className="grad-hero">CYBER-CINEMATIC</span><br />
            <span className="text-white glow-cyan">DEVELOPER OS</span>
          </h1>

          <div className="h-10 text-base sm:text-xl font-chakra font-bold text-cyan-300 mb-6 flex items-center justify-center gap-2">
            <span className="text-magenta-400" style={{ color: '#ff2d95' }}>◈</span>
            <TypeAnimation
              sequence={[
                '"THIS ENGINEER BUILDS APPS USED BY MILLIONS."', 2400,
                'PORTFOLIO · OS · BRAND · BUSINESS · IDENTITY', 2400,
                'KOTLIN · COMPOSE · CLEAN ARCHITECTURE · 80+ MODULES', 2400,
                'ONE COMPLETE PRODUCTION-READY ECOSYSTEM', 2400,
              ]}
              speed={55} repeat={Infinity} wrapper="span"
            />
          </div>

          <div className="flex flex-wrap items-center justify-center gap-3 text-[11px] font-plex mb-8">
            <span className="px-3.5 py-1.5 rounded bg-[#0a1024]/85 border border-cyan-400/30 text-cyan-200 flex items-center gap-1.5 backdrop-blur">
              <FiMapPin className="text-cyan-400" /> Tachileik, Myanmar 🇲🇲 ↔ Bangkok, Thailand 🇹🇭
            </span>
            <span className="px-3.5 py-1.5 rounded bg-[#0a1024]/85 border border-violet-400/30 text-violet-200 backdrop-blur">
              Burmese 🇲🇲 · English 🌐 · Kotlin ☕
            </span>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-3xl mx-auto mb-9">
            {[
              { t: 'MOBILE CORE', s: 'Kotlin · Compose · MVVM', i: <FaAndroid />, c: '#00e5ff' },
              { t: 'CLOUD LAYER', s: 'Firebase · REST · Python', i: <FiCloud />, c: '#2dffb3' },
              { t: 'SECURITY', s: 'Ethical Hacking · AES-256', i: <FiShield />, c: '#ff2d95' },
              { t: 'ON-DEVICE AI', s: 'Claude API · TFLite', i: <FiCpu />, c: '#8b5cf6' },
            ].map((p, i) => (
              <div key={i} className="nx-panel rounded-xl p-4 text-left">
                <span className="nx-corner nx-tl" /><span className="nx-corner nx-br" />
                <div className="text-xl mb-1.5" style={{ color: p.c }}>{p.i}</div>
                <h3 className="font-orbitron font-bold text-[10px] text-white">{p.t}</h3>
                <p className="text-[10px] text-white/50 font-plex mt-0.5">{p.s}</p>
              </div>
            ))}
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4">
            <button onClick={() => go('launcher')} className="nx-btn px-7 py-3 text-xs flex items-center gap-2"><FiGrid /> ENTER APP LAUNCHER</button>
            <button onClick={() => go('store')} className="nx-btn-magenta px-6 py-3 text-xs flex items-center gap-2"><FiBox /> PREMIUM STORE</button>
            <a href="https://github.com/Dev-moe-kyawaung/pulsesync-android" target="_blank" rel="noopener noreferrer" onClick={() => snd('select')}
              className="px-6 py-3 rounded bg-[#0a1024] border border-emerald-400/50 hover:bg-emerald-400/15 text-emerald-300 font-orbitron font-bold text-xs flex items-center gap-2 transition">
              <FiZap /> FLAGSHIP: PULSESYNC
            </a>
          </div>
        </div>
        <button onClick={() => go('launcher')} className="absolute bottom-6 left-1/2 -translate-x-1/2 text-cyan-400/50 hover:text-cyan-400 transition text-2xl float-y">⌄</button>
      </section>

      {/* ═══════════ APP LAUNCHER OS ═══════════ */}
      <section id="launcher" className="relative z-10 py-24 px-4 border-t border-cyan-400/15">
        <div className="max-w-7xl mx-auto">
          <SectionHead tag="APP LAUNCHER OS" title={<><span className="grad-hero">16 PRODUCTION</span> APPLICATIONS</>}
            sub="A live desktop of deployed products. Click any node to teleport into its full case study." />

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-5">
            {APPS.map(a => (
              <button key={a.id} onClick={() => openApp(a)} onMouseEnter={() => snd('hover')}
                className="nx-panel launcher-icon rounded-2xl p-5 text-left group">
                <span className="nx-corner nx-tl" /><span className="nx-corner nx-br" />
                <div className="flex items-center justify-between mb-3">
                  <span className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: `${a.color}1e`, border: `1px solid ${a.color}55`, boxShadow: `0 0 18px ${a.color}33` }}>
                    {a.icon}
                  </span>
                  <span className="text-[9px] font-plex px-1.5 py-px rounded border" style={{ color: a.color, borderColor: `${a.color}44` }}>{a.status}</span>
                </div>
                <h3 className="font-orbitron font-bold text-sm text-white group-hover:text-cyan-300 transition">{a.name}</h3>
                <p className="text-[11px] font-plex mt-0.5" style={{ color: a.color }}>{a.domain} · {a.version}</p>
                <p className="text-[11px] text-white/45 mt-2 line-clamp-2">{a.summary}</p>
                <div className="mt-3 flex items-center gap-1 text-[10px] font-plex text-cyan-400 opacity-0 group-hover:opacity-100 transition">
                  LAUNCH <FiChevronRight />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ NEON 3D ENGINE / ARCHITECTURE ═══════════ */}
      <section id="architecture" className="relative z-10 py-24 px-4 border-t border-violet-400/15 bg-[#070b1a]/60">
        <div className="max-w-6xl mx-auto">
          <SectionHead tag="NEON 3D ENGINE // ARCHITECTURE" title={<>SYSTEM <span className="grad-emerald">ARCHITECTURE</span></>}
            sub="Six engineering pillars power every product in the ecosystem." />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mb-10">
            {PILLARS.map((p, i) => (
              <RevealCard key={i}>
                <div className="nx-panel rounded-xl p-6 group relative overflow-hidden h-full">
                  <span className="nx-corner nx-tl" /><span className="nx-corner nx-tr" />
                  <span className="nx-corner nx-bl" /><span className="nx-corner nx-br" />
                  <span className="scan-line" style={{ animationDelay: `${i * 0.6}s` }} />
                  <div className="flex items-center justify-between mb-4">
                    <span className="w-11 h-11 rounded-lg flex items-center justify-center text-xl font-orbitron"
                      style={{ background: `${p.color}18`, border: `1px solid ${p.color}44`, color: p.color }}>{p.icon}</span>
                    <span className="px-2 py-0.5 rounded text-[9px] font-plex" style={{ background: `${p.color}18`, color: p.color }}>{p.tag}</span>
                  </div>
                  <h3 className="font-orbitron font-bold text-sm text-white mb-2">{p.title}</h3>
                  <p className="text-xs text-white/55 leading-relaxed">{p.desc}</p>
                </div>
              </RevealCard>
            ))}
          </div>

          {/* Flagship */}
          <div className="nx-panel nx-panel-magenta rounded-2xl p-8">
            <span className="nx-corner nx-tl" /><span className="nx-corner nx-br" />
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="max-w-2xl">
                <p className="text-[10px] font-plex text-emerald-300 mb-2 flex items-center gap-2"><span className="w-2 h-2 rounded-full bg-emerald-400 beacon" /> FLAGSHIP CORE · APP-16</p>
                <h3 className="text-2xl sm:text-3xl font-orbitron font-black text-white mb-2">PULSESYNC — REAL-TIME ANDROID PLATFORM</h3>
                <p className="text-sm text-white/70 leading-relaxed mb-4">Advanced multi-module Android application demonstrating senior architecture, Firebase suite backend (Auth, Firestore, Cloud Messaging, Crashlytics), offline-first Room synchronization and a full GitHub Actions CI/CD pipeline.</p>
                <div className="flex flex-wrap gap-2 font-plex text-[11px]">
                  {['Kotlin 2.0', 'Jetpack Compose', 'Clean Architecture', 'Hilt DI', 'Room DB', 'Firebase', 'GitHub Actions'].map(t => (
                    <span key={t} className="px-2.5 py-1 rounded bg-[#04060f] border border-emerald-400/35 text-emerald-200">{t}</span>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-3 w-full lg:w-auto">
                <a href="https://github.com/Dev-moe-kyawaung/pulsesync-android" target="_blank" rel="noopener noreferrer" onClick={() => snd('select')} className="nx-btn px-6 py-3 text-xs text-center flex items-center justify-center gap-2"><FaGithub /> OPEN REPOSITORY</a>
                <button onClick={() => go('store')} className="nx-btn-magenta px-6 py-3 text-xs flex items-center justify-center gap-2"><FiBox /> GET THE KIT</button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ FOUNDER ═══════════ */}
      <section id="founder" className="relative z-10 py-24 px-4 border-t border-emerald-400/15">
        <div className="max-w-6xl mx-auto">
          <SectionHead tag="FOUNDER SYSTEM // GROWTH" title={<>TECHNICAL <span className="grad-emerald">FOUNDER</span></>}
            sub="From MVP to million-user scale — measurable business impact." />

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
            {[
              { l: 'TOTAL DOWNLOADS', v: '1M+', c: '#00e5ff' },
              { l: 'MONTHLY ACTIVE', v: '50K+', c: '#2dffb3' },
              { l: 'AVG RATING', v: '4.5★', c: '#ffce54' },
              { l: 'CRASH-FREE', v: '99.9%', c: '#ff2d95' },
            ].map((s, i) => (
              <RevealCard key={i}>
                <div className="nx-panel rounded-xl p-5 text-center">
                  <span className="nx-corner nx-tl" /><span className="nx-corner nx-br" />
                  <p className="text-[9px] font-plex text-white/50 mb-1">{s.l}</p>
                  <p className="font-orbitron font-black text-3xl sm:text-4xl" style={{ color: s.c }}>{s.v}</p>
                </div>
              </RevealCard>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6">
            <div className="nx-panel rounded-xl p-6">
              <span className="nx-corner nx-tl" /><span className="nx-corner nx-br" />
              <h3 className="font-orbitron font-bold text-sm text-cyan-300 mb-4 flex items-center gap-2"><FaRocket /> PRODUCTS LAUNCHED</h3>
              <div className="space-y-3">
                {[
                  { n: 'MoekyawTranslator AI', d: 'On-device neural translation via Claude API + TensorFlow Lite, offline fallback for rural Myanmar.' },
                  { n: 'POS ERP Suite', d: 'Retail management across Tachileik & Bangkok with dual MMK/THB offline reconciliation.' },
                  { n: 'Job-Portal Platform', d: 'Talent bridge for regional engineers into remote Southeast Asian roles.' },
                  { n: 'Social Dashboard', d: 'Unified multi-account telemetry with reactive engagement analytics.' },
                ].map((p, i) => (
                  <div key={i} className="p-3.5 rounded bg-[#04060f] border border-white/10">
                    <h4 className="font-orbitron font-bold text-xs text-white">{p.n}</h4>
                    <p className="text-xs text-white/55 mt-1">{p.d}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="nx-panel nx-panel-violet rounded-xl p-6 flex flex-col justify-between">
              <span className="nx-corner nx-tl" /><span className="nx-corner nx-br" />
              <div>
                <h3 className="font-orbitron font-bold text-sm text-violet-300 mb-4 flex items-center gap-2"><FiTrendingUp /> PRODUCT DECISIONS</h3>
                <div className="space-y-3 font-plex text-xs">
                  {[
                    ['OFFLINE-FIRST PRIMACY', 'Room DB single source of truth — survives total signal loss.'],
                    ['ON-DEVICE AI INFERENCE', 'TFLite quantized models cut cloud spend to near zero.'],
                    ['2GB RAM DISCIPLINE', 'Compose budgets prevent OOM on tier-3 handsets.'],
                    ['TRI-LINGUAL LOCALIZATION', 'Burmese/Thai/English switch without restart.'],
                  ].map(([t, d], i) => (
                    <div key={i} className="p-3 rounded bg-[#04060f] border border-white/10">
                      <p className="text-cyan-300 font-bold mb-0.5">{i + 1}. {t}</p><p className="text-white/55">{d}</p>
                    </div>
                  ))}
                </div>
              </div>
              <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-plex text-white/50">
                <span>"CODE WITH CULTURE. BUILD WITH PURPOSE."</span><span className="text-emerald-400 font-bold">OPEN TO CO-FOUNDER</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ PREMIUM STORE / MONETIZATION ═══════════ */}
      <section id="store" className="relative z-10 py-24 px-4 border-t border-magenta-400/15 bg-[#070b1a]/60" style={{ borderColor: 'rgba(255,45,149,0.15)' }}>
        <div className="max-w-6xl mx-auto">
          <SectionHead tag="MONETIZATION SYSTEM // PREMIUM STORE" title={<>PREMIUM <span className="grad-hero">PRODUCTS</span></>}
            sub="The NEXUS ecosystem ships as sellable products — templates, kits and full blueprints." />

          <div className="grid md:grid-cols-3 gap-5 mb-14">
            {PRODUCTS.map((p, i) => (
              <RevealCard key={i}>
                <div className={`nx-panel rounded-2xl p-6 h-full flex flex-col ${p.featured ? 'ring-1 ring-magenta-400/50' : ''}`}
                  style={p.featured ? { boxShadow: `0 0 34px ${p.color}33`, borderColor: `${p.color}88` } : {}}>
                  <span className="nx-corner nx-tl" /><span className="nx-corner nx-br" />
                  {p.featured && <span className="self-start mb-3 px-2 py-0.5 rounded-full text-[9px] font-plex font-bold" style={{ background: p.color, color: '#04060f' }}>★ MOST POPULAR</span>}
                  <span className="text-[10px] font-plex tracking-widest" style={{ color: p.color }}>{p.tier}</span>
                  <h3 className="font-orbitron font-black text-lg text-white mt-1">{p.name}</h3>
                  <p className="text-3xl font-orbitron font-black my-3" style={{ color: p.color }}>{p.price}</p>
                  <p className="text-xs text-white/55 leading-relaxed mb-4">{p.desc}</p>
                  <ul className="space-y-2 mb-5 flex-1">
                    {p.features.map(f => (
                      <li key={f} className="flex items-start gap-2 text-xs text-white/70"><FiCheck style={{ color: p.color }} className="mt-0.5 shrink-0" /> {f}</li>
                    ))}
                  </ul>
                  <button onClick={() => { snd('success'); go('contact'); }}
                    className="w-full py-2.5 rounded font-orbitron font-bold text-xs transition"
                    style={{ background: p.color, color: '#04060f' }}>ACQUIRE {p.tier}</button>
                </div>
              </RevealCard>
            ))}
          </div>

          {/* Revenue model */}
          <div className="nx-panel rounded-2xl p-8">
            <span className="nx-corner nx-tl" /><span className="nx-corner nx-br" />
            <h3 className="font-orbitron font-bold text-sm text-white mb-6 flex items-center gap-2"><FiTrendingUp className="text-cyan-400" /> MULTI-STREAM REVENUE MODEL</h3>
            <div className="space-y-3">
              {REVENUE.map((r, i) => (
                <div key={i} className="flex items-center gap-3">
                  <span className="w-40 text-xs font-plex text-white/60 shrink-0">{r.label}</span>
                  <div className="flex-1 h-3 rounded-full bg-[#04060f] overflow-hidden border border-white/10">
                    <div className="h-full rounded-full" style={{ width: `${r.pct}%`, background: `linear-gradient(90deg, ${r.color}, ${r.color}88)`, boxShadow: `0 0 10px ${r.color}66` }} />
                  </div>
                  <span className="w-10 text-right text-xs font-orbitron font-bold" style={{ color: r.color }}>{r.pct}%</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ BRAND / MASTER PACKAGE ═══════════ */}
      <section id="brand" className="relative z-10 py-24 px-4 border-t border-cyan-400/15">
        <div className="max-w-6xl mx-auto">
          <SectionHead tag="MASTER PACKAGE v3.0 // 20 SYSTEMS" title={<>THE COMPLETE <span className="grad-hero">ECOSYSTEM</span></>}
            sub="Twenty premium systems unified into one production-ready blueprint." />

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3 mb-14">
            {[
              'Cyber-Cinematic Web OS', 'Neon 3D Engine', '3D Navigation OS', 'Android Neon OS',
              'AI Assistant System', 'Premium Branding', 'Sound Identity', 'Marketing Copy',
              'Monetization System', 'Launch Automation', 'Universe Expansion', 'Cinematic Trailer',
              '3D OS Animations', 'Neon Launcher', 'Brand Book', 'Social Kit',
              'Revenue Model', 'Interaction Philosophy', 'World Bible', 'Developer Blueprint',
            ].map((s, i) => (
              <RevealCard key={i}>
                <div className="nx-panel rounded-lg p-3.5 h-full flex items-center gap-2.5">
                  <span className="w-7 h-7 rounded flex items-center justify-center text-[10px] font-orbitron font-bold shrink-0"
                    style={{ background: `${['#00e5ff', '#ff2d95', '#8b5cf6', '#2dffb3', '#ffce54'][i % 5]}1e`, color: ['#00e5ff', '#ff2d95', '#8b5cf6', '#2dffb3', '#ffce54'][i % 5] }}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <span className="text-[11px] font-plex text-white/70 leading-tight">{s}</span>
                </div>
              </RevealCard>
            ))}
          </div>

          {/* Brand system tokens */}
          <div className="grid md:grid-cols-2 gap-6 mb-14">
            <div className="nx-panel rounded-xl p-6">
              <span className="nx-corner nx-tl" /><span className="nx-corner nx-br" />
              <h3 className="font-orbitron font-bold text-sm text-white mb-4 flex items-center gap-2"><FiLayers className="text-cyan-400" /> BRAND COLOR SYSTEM</h3>
              <div className="flex flex-wrap gap-3">
                {[
                  ['Cyan', '#00e5ff'], ['Magenta', '#ff2d95'], ['Violet', '#8b5cf6'], ['Emerald', '#2dffb3'], ['Gold', '#ffce54'], ['Void', '#04060f'],
                ].map(([n, c]) => (
                  <div key={n} className="text-center">
                    <div className="w-14 h-14 rounded-lg border border-white/10" style={{ background: c as string, boxShadow: `0 0 14px ${c}55` }} />
                    <p className="text-[9px] font-plex text-white/60 mt-1">{n}</p>
                    <p className="text-[8px] font-plex text-white/40">{c}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="nx-panel rounded-xl p-6">
              <span className="nx-corner nx-tl" /><span className="nx-corner nx-br" />
              <h3 className="font-orbitron font-bold text-sm text-white mb-4 flex items-center gap-2"><FiPlay className="text-magenta-400" style={{ color: '#ff2d95' }} /> BRAND VOICE & MOTION</h3>
              <div className="space-y-2.5 text-xs">
                {[
                  ['DISPLAY', 'Orbitron — bold, technical, futuristic'],
                  ['BODY', 'Sora — clean, modern, readable'],
                  ['MONO', 'IBM Plex Mono — code & telemetry'],
                  ['VOICE', 'Confident · precise · human · purpose-driven'],
                  ['MOTION', 'Cinematic easing · neon glow · particle bursts'],
                ].map(([k, v]) => (
                  <div key={k} className="flex items-start gap-3 p-2.5 rounded bg-[#04060f] border border-white/10">
                    <span className="text-[10px] font-plex text-cyan-400 w-14 shrink-0">{k}</span>
                    <span className="text-white/60 font-plex text-[11px]">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* World bible statement */}
          <RevealCard>
            <div className="nx-panel rounded-2xl p-8 text-center">
              <span className="nx-corner nx-tl" /><span className="nx-corner nx-tr" />
              <span className="nx-corner nx-bl" /><span className="nx-corner nx-br" />
              <p className="text-[10px] font-plex text-cyan-400 tracking-widest mb-3">WORLD BIBLE // LORE & VISION</p>
              <p className="text-lg sm:text-2xl font-chakra text-white/90 leading-relaxed max-w-3xl mx-auto">
                "This is not just a portfolio. It is a developer OS, a brand, an ecosystem, a business, and an identity —
                unified into one complete, premium, production-ready blueprint you can build, deploy, sell, scale and evolve."
              </p>
              <p className="text-sm font-plex text-white/40 mt-4">— MOE KYAW AUNG · NEXUS OS v3.0</p>
            </div>
          </RevealCard>
        </div>
      </section>

      {/* ═══════════ CERTIFICATES ═══════════ */}
      <section className="relative z-10 py-24 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <SectionHead tag="CREDENTIALS // 82+ VERIFIED" title={<>CERTIFICATION <span className="grad-emerald">LATTICE</span></>}
            sub="Programming Hub credentials across 9 technical domains." />
          <div className="mb-8 space-y-4">
            <div className="relative max-w-md mx-auto">
              <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 text-cyan-400" />
              <input value={cq} onChange={e => setCq(e.target.value)} placeholder="SEARCH BY NAME OR ID..."
                className="nx-input w-full pl-10 pr-4 py-2.5 rounded text-xs font-plex text-cyan-200" />
            </div>
            <div className="flex flex-wrap items-center justify-center gap-2">
              {CERT_CATS.map(c => (
                <button key={c} onClick={() => { snd('hover'); setCc(c); }}
                  className={`px-3 py-1.5 rounded text-[11px] font-plex transition ${cc === c ? 'bg-cyan-400 text-[#04060f] font-bold' : 'bg-[#0a1024] text-white/50 border border-white/10 hover:border-cyan-400/50'}`}>{c}</button>
              ))}
            </div>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {shownCerts.map((c, i) => (
              <div key={i} className="nx-panel rounded-xl p-4 flex flex-col justify-between group">
                <span className="nx-corner nx-tl" /><span className="nx-corner nx-br" />
                <div>
                  <div className="flex items-center justify-between text-[10px] font-plex mb-2">
                    <span className="text-gold-300 font-bold" style={{ color: '#ffce54' }}>{c.d}</span>
                    <span className="px-1.5 py-px rounded bg-[#04060f] border border-white/10 text-cyan-300">#{c.id.slice(-6)}</span>
                  </div>
                  <h4 className="font-orbitron font-bold text-xs text-white group-hover:text-cyan-300 transition mb-1">{c.n}</h4>
                  <p className="text-[11px] text-violet-300/80 font-plex">{c.c}</p>
                </div>
                <div className="mt-3 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-plex">
                  <span className="text-white/50 flex items-center gap-1"><FiCheck className="text-emerald-400" /> VERIFIED</span>
                  <a href={`https://www.programminghub.io/certificate?id=${c.id}`} target="_blank" rel="noopener noreferrer" className="text-cyan-400 hover:text-white font-bold flex items-center gap-1"><FaCertificate /> VERIFY ↗</a>
                </div>
              </div>
            ))}
          </div>
          {shownCerts.length === 0 && <p className="text-center py-12 text-white/40 font-plex text-sm">NO RECORD MATCHES "{cq}".</p>}
        </div>
      </section>

      {/* ═══════════ NETWORK ═══════════ */}
      <section className="relative z-10 py-24 px-4 border-t border-white/10 bg-[#070b1a]/60">
        <div className="max-w-6xl mx-auto">
          <SectionHead tag="UNIVERSE EXPANSION // NETWORK" title={<>43 GITHUB · <span className="grad-hero">38 WEB APPS</span></>}
            sub="A distributed ecosystem spanning mobile, security, AI and web." />
          <h3 className="font-orbitron font-bold text-xs text-cyan-300 mb-4 flex items-center gap-2"><FaGithub /> 43 GITHUB NODES</h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2.5 mb-12 font-plex text-[11px]">
            {GITHUB_NODES.map((g, i) => (
              <a key={i} href={`https://github.com/${g}`} target="_blank" rel="noopener noreferrer" onClick={() => snd('hover')}
                className="p-2.5 rounded bg-[#04060f] border border-white/10 hover:border-cyan-400/60 hover:bg-cyan-400/5 transition flex items-center justify-between group">
                <span className="text-white/60 group-hover:text-white truncate">{g}</span>
                <FiExternalLink className="text-white/30 group-hover:text-cyan-400 shrink-0 ml-1" />
              </a>
            ))}
          </div>
          <h3 className="font-orbitron font-bold text-xs text-magenta-300 mb-4 flex items-center gap-2" style={{ color: '#ff2d95' }}><FiCompass /> 38 LOVABLE WEB APPS</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-3 font-plex text-[11px]">
            {LOVABLE.map((l, i) => (
              <a key={i} href={l.u} target="_blank" rel="noopener noreferrer" onClick={() => snd('hover')}
                className="p-3 rounded bg-[#04060f] border border-white/10 hover:border-magenta-400/60 transition flex items-center justify-between group" style={{ borderColor: undefined }}>
                <span className="flex items-center gap-2 truncate">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ background: '#ff2d95' }} />
                  <span className="text-white/60 group-hover:text-white truncate font-bold">{l.n}</span>
                </span>
                <FiExternalLink className="text-white/30 group-hover:text-white shrink-0 ml-2" />
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ GALLERY ═══════════ */}
      <section className="relative z-10 py-24 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto">
          <SectionHead tag="CINEMATIC REEL // VISUAL ARCHIVE" title={<>ENGINEERING <span className="grad-emerald">GALLERY</span></>} sub="" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {GALLERY.map((src, i) => (
              <a key={i} href={src} target="_blank" rel="noopener noreferrer" className="nx-panel rounded-xl overflow-hidden aspect-video block group relative">
                <img src={src} alt={`Frame ${i + 1}`} loading="lazy" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <span className="absolute top-2 left-2 px-1.5 py-0.5 bg-[#04060f]/80 border border-cyan-400/40 text-cyan-300 font-plex text-[9px]">FR-{String(i + 1).padStart(2, '0')}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ CONTACT ═══════════ */}
      <section id="contact" className="relative z-10 py-24 px-4 border-t border-white/10 bg-[#070b1a]/60">
        <div className="max-w-6xl mx-auto">
          <SectionHead tag="COMMS // OPEN CHANNELS" title={<>ESTABLISH <span className="grad-hero">CONTACT</span></>}
            sub="Open to senior mobile architect roles, technical co-founder ventures and enterprise consulting." />

          <div className="grid md:grid-cols-2 gap-4 mb-10">
            {[
              { l: 'PRIMARY LINE', v: '+95 9 889 000 889', h: 'tel:+959889000889', c: '#00e5ff' },
              { l: 'SECONDARY LINE', v: '+95 9 666 000 050', h: 'tel:+959666000050', c: '#ff2d95' },
            ].map((p, i) => (
              <div key={i} className="nx-panel rounded-xl p-5 flex items-center justify-between">
                <span className="nx-corner nx-tl" /><span className="nx-corner nx-br" />
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-lg flex items-center justify-center text-xl" style={{ background: `${p.c}1e`, border: `1px solid ${p.c}66`, color: p.c }}><FiPhone /></div>
                  <div><p className="text-[10px] font-plex text-white/50">{p.l}</p><p className="text-lg font-orbitron font-bold text-white">{p.v}</p></div>
                </div>
                <a href={p.h} onClick={() => snd('select')} className="nx-btn px-4 py-2 text-[11px]">CALL</a>
              </div>
            ))}
          </div>

          <div className="nx-panel rounded-xl p-6 mb-10">
            <span className="nx-corner nx-tl" /><span className="nx-corner nx-br" />
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <h3 className="font-orbitron font-bold text-sm text-cyan-300 flex items-center gap-2"><FiMail /> 20+ INBOX CHANNELS — CLICK TO COPY</h3>
              {copied && <span className="px-3 py-1 bg-cyan-400 text-[#04060f] font-plex text-[11px] rounded font-bold">COPIED: {copied}</span>}
            </div>
            <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2.5 font-plex text-[11px]">
              {EMAILS.map((e, i) => (
                <button key={i} onClick={() => copy(e)} className="p-2.5 rounded bg-[#04060f] border border-white/10 hover:border-cyan-400/60 text-left flex items-center justify-between group transition">
                  <span className="text-white/60 group-hover:text-cyan-300 truncate">{e}</span>
                  <FiCopy className="text-white/30 group-hover:text-cyan-400 shrink-0 ml-1" />
                </button>
              ))}
            </div>
          </div>

          <div className="nx-panel nx-panel-violet rounded-xl p-6">
            <span className="nx-corner nx-tl" /><span className="nx-corner nx-br" />
            <h3 className="font-orbitron font-bold text-sm text-violet-300 mb-5 flex items-center gap-2"><FiShare2 /> SOCIAL KIT — ALL 16 PLATFORMS</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3 font-plex text-[11px]">
              {SOCIALS.map((s, i) => (
                <a key={i} href={s.u} target="_blank" rel="noopener noreferrer" onClick={() => snd('hover')}
                  className="p-3.5 rounded bg-[#04060f] border border-white/10 hover:border-violet-400/60 transition flex flex-col items-center text-center group">
                  <span className="text-2xl text-violet-300 group-hover:scale-110 transition-transform mb-2">{s.i}</span>
                  <span className="font-orbitron font-bold text-[11px] text-white group-hover:text-violet-300">{s.n}</span>
                  <span className="text-[10px] text-white/40 truncate w-full mt-0.5">{s.t}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════ MODAL ═══════════ */}
      {selected && (
        <div className="fixed inset-0 z-[80] flex items-center justify-center p-4 bg-[#04060f]/90 backdrop-blur-md">
          <div className="nx-panel rounded-2xl w-[96vw] sm:w-[740px] max-h-[88vh] overflow-hidden flex flex-col" style={{ borderColor: `${selected.color}aa`, boxShadow: `0 0 50px ${selected.color}44` }}>
            <span className="nx-corner nx-tl" /><span className="nx-corner nx-tr" />
            <span className="nx-corner nx-bl" /><span className="nx-corner nx-br" />
            <div className="p-5 border-b border-white/10 flex items-center justify-between" style={{ background: 'rgba(10,16,36,0.6)' }}>
              <div className="flex items-center gap-3">
                <span className="text-3xl" style={{ filter: `drop-shadow(0 0 10px ${selected.color})` }}>{selected.icon}</span>
                <div>
                  <h3 className="font-orbitron font-extrabold text-base text-white">{selected.name}</h3>
                  <p className="text-[11px] font-plex" style={{ color: selected.color }}>{selected.code} · {selected.domain} · {selected.version}</p>
                </div>
              </div>
              <button onClick={() => { snd('select'); setSelected(null); }} className="w-8 h-8 rounded bg-[#04060f] border border-white/10 text-white/50 hover:text-white flex items-center justify-center transition"><FiX /></button>
            </div>
            <div className="p-6 overflow-y-auto space-y-5 text-sm">
              <div className="p-4 rounded-lg bg-[#04060f] border" style={{ borderColor: `${selected.color}33` }}>
                <p className="text-[10px] font-plex font-bold mb-1" style={{ color: selected.color }}>◈ OVERVIEW</p>
                <p className="text-white/75 leading-relaxed text-xs">{selected.summary}</p>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] font-plex text-cyan-400 font-bold">◫ THREE-LAYER ARCHITECTURE</p>
                {[
                  { t: 'PRESENTATION LAYER', d: selected.layers.presentation, c: '#00e5ff' },
                  { t: 'DOMAIN LAYER', d: selected.layers.domain, c: '#8b5cf6' },
                  { t: 'DATA LAYER', d: selected.layers.data, c: '#2dffb3' },
                ].map((l, i) => (
                  <div key={i} className="p-3.5 rounded border-l-4 bg-[#070b1a]" style={{ borderColor: l.c }}>
                    <p className="text-[10px] font-plex font-bold text-white mb-1">{l.t}</p>
                    <p className="text-xs text-white/60">{l.d}</p>
                  </div>
                ))}
              </div>
              <div className="p-3.5 rounded bg-[#04060f] border border-emerald-400/30">
                <p className="text-[10px] font-plex text-emerald-400 font-bold mb-0.5">◎ METRICS</p>
                <p className="text-xs text-emerald-200 font-bold">{selected.metrics}</p>
              </div>
              <div>
                <p className="text-[10px] font-plex text-white/50 mb-2">STACK</p>
                <div className="flex flex-wrap gap-2">
                  {selected.stack.map(s => <span key={s} className="px-2.5 py-1 rounded text-[11px] font-plex" style={{ background: `${selected.color}18`, border: `1px solid ${selected.color}44`, color: selected.color }}>{s}</span>)}
                </div>
              </div>
              <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                <button onClick={() => setSelected(null)} className="px-4 py-2 bg-[#0a1024] hover:bg-white/10 text-white/60 rounded font-orbitron text-xs font-bold transition">CLOSE</button>
                <a href={selected.url} target="_blank" rel="noopener noreferrer" className="nx-btn px-5 py-2 text-[11px] flex items-center gap-2">OPEN REPOSITORY <FiExternalLink /></a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════ FOOTER ═══════════ */}
      <footer className="relative z-10 py-14 px-4 bg-[#02040a] border-t border-cyan-400/25 font-plex text-xs">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-left">
            <p className="flex items-center justify-center md:justify-start gap-2 mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 beacon" />
              <span className="font-orbitron font-bold text-sm text-white">NEXUS OS v3.0 // MOE KYAW AUNG</span>
            </p>
            <p className="text-white/40 text-[11px]">Senior Mobile Architect · Technical Founder · Tachileik 🇲🇲 ↔ Bangkok 🇹🇭</p>
          </div>
          <div className="text-center md:text-right text-white/40 text-[11px] space-y-1">
            <p className="text-cyan-400">CYBER-CINEMATIC MASTER PACKAGE · PREMIUM EDITION · 20 SYSTEMS UNIFIED</p>
            <p>© 2026 MOE KYAW AUNG. ALL SYSTEMS PRODUCTION-READY.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════
   HELPERS
   ═══════════════════════════════════════════════════════ */
function SectionHead({ tag, title, sub }: { tag: string; title: React.ReactNode; sub: string }) {
  return (
    <div className="text-center mb-12">
      <span className="inline-block px-3 py-1 rounded bg-cyan-400/10 border border-cyan-400/50 text-cyan-300 font-plex text-[10px] mb-3">{tag}</span>
      <h2 className="text-3xl sm:text-5xl font-orbitron font-black text-white">{title}</h2>
      {sub && <p className="text-white/50 font-plex text-sm mt-3 max-w-2xl mx-auto">{sub}</p>}
    </div>
  );
}

function RevealCard({ children }: { children: React.ReactNode }) {
  return <div className="opacity-0 fade-up" style={{ animationFillMode: 'both' }}>{children}</div>;
}
