import { useState } from 'react';
import { FiX, FiSend, FiTerminal, FiZap, FiCpu } from 'react-icons/fi';
import { FaRobot } from 'react-icons/fa';
import { playSFX } from './engine';

/* ═══════════════════════════════════════════════════════
   AI ASSISTANT SYSTEM — 3 PERSONAS
   (Terminal · Neon · Hologram)
   ═══════════════════════════════════════════════════════ */

type Persona = 'terminal' | 'neon' | 'hologram';

interface Msg { from: 'ai' | 'user'; text: string; chain?: string[]; }

const BRIEFS: Record<string, { text: string; chain: string[] }> = {
  arch: { text: 'ARCHITECTURE: Moe partitions every product into :app, :feature:* and :core:* modules. The domain layer carries zero Android dependencies so business logic runs on the pure JVM. Gradle parallelizes 80+ modules keeping cold builds under 45 seconds.', chain: ['UI LAYER · Jetpack Compose', 'DOMAIN · Pure Kotlin UseCases', 'DATA · Room + Retrofit', 'BUILD · <45s · 80+ modules'] },
  di: { text: 'DEPENDENCY INJECTION: Hilt/Dagger resolves the object graph at compile time — no runtime lookup failures. Scoping bounds dependency lifetimes and assisted factories restore state across process death.', chain: ['Hilt compile-time graph', '@Singleton / @ViewModelScoped', 'Assisted SavedState factory', 'Runtime DI failures: 0'] },
  offline: { text: 'OFFLINE-FIRST: Room DB is the single source of truth. Writes land locally and emit optimistically; WorkManager queues the sync under network constraints. In Myanmar\u2019s intermittent coverage this yields perceived-zero downtime.', chain: ['Write → Room DB first', 'Optimistic UI emit', 'WorkManager sync queue', 'LOS tolerance: 100%'] },
  cicd: { text: 'CI/CD: GitHub Actions runs detekt + ktlint, then a parallel unit matrix on MockK & Turbine gated at 90% Jacoco coverage, then headless emulator screenshot regression, then Fastlane signs and stages the AAB to Play.', chain: ['detekt + ktlint', 'Unit matrix (90% gate)', 'Emulator screenshot diff', 'Fastlane sign → Play'] },
  security: { text: 'SECURITY: Sensitive state lives in EncryptedSharedPreferences backed by Android Keystore (AES-256 GCM). Transport is TLS 1.3 with SHA-256 certificate pinning, and sessions gate behind BiometricPrompt.', chain: ['AES-256 GCM @ Keystore', 'TLS 1.3 + cert pinning', 'Biometric session gate', 'Root tamper detection'] },
  scale: { text: 'SCALABILITY: Memory budgeting for 2GB tier-3 devices, lazy Compose layouts, bitmap recycling and baseline profiles. Result — 1M+ downloads at a 99.99% crash-free rate.', chain: ['Target: 2GB RAM devices', 'Lazy Compose + baseline profile', 'StrictMode leak audit', 'Crash-free: 99.99%'] },
  founder: { text: 'FOUNDER TRACK: As a technical founder Moe shipped MoekyawTranslator (on-device AI), the POS ERP suite (dual MMK/THB offline reconciliation) and Job-Portal. Combined: 1M+ downloads and 50K+ monthly actives.', chain: ['MVP hypothesis', 'On-device AI → cost 0', 'Dual-currency offline POS', 'Result: 1M+ installs'] },
  monetize: { text: 'MONETIZATION: The NEXUS ecosystem runs multi-stream — template & kit sales, enterprise consulting, app-store revenue, AI SaaS tools and sponsorships. The Founder Blueprint Suite bundles everything at elite tier.', chain: ['Template & kit sales · 34%', 'Enterprise consulting · 28%', 'App store revenue · 20%', 'AI tools & SaaS · 12%'] },
  contact: { text: 'CHANNEL: Hotlines +95 9 889 000 889 / +959 666 000 050. Primary inbox moekyawaung@programmer.net. Status: open to senior mobile architect and technical co-founder roles.', chain: ['Hotline channel open', 'Inbox: programmer.net', 'Status: AVAILABLE'] },
};

const PERSONAS: Record<Persona, { name: string; tag: string; accent: string; icon: React.ReactNode; greet: string }> = {
  terminal: { name: 'NEXUS-SH', tag: 'Terminal Core', accent: '#2dffb3', icon: <FiTerminal />, greet: 'nexus-sh v3.0 ready. Query the architecture, monetization or founder track. Type "help".' },
  neon: { name: 'AURA', tag: 'Neon Guide', accent: '#00e5ff', icon: <FiZap />, greet: '⚡ AURA online. I visualize architecture decisions in real time. Ask me anything about the build.' },
  hologram: { name: 'ORACLE', tag: 'Hologram Entity', accent: '#8b5cf6', icon: <FiCpu />, greet: '✦ ORACLE projection stable. I hold the full NEXUS knowledge lattice. Probe a decision vector.' },
};

const resolve = (q: string) => {
  const l = q.toLowerCase();
  if (l.includes('inject') || l.includes('hilt') || l.includes('dagger')) return BRIEFS.di;
  if (l.includes('offline') || l.includes('sync') || l.includes('room')) return BRIEFS.offline;
  if (l.includes('ci') || l.includes('pipeline') || l.includes('deploy') || l.includes('test')) return BRIEFS.cicd;
  if (l.includes('secur') || l.includes('encrypt') || l.includes('auth')) return BRIEFS.security;
  if (l.includes('scale') || l.includes('perform') || l.includes('memory')) return BRIEFS.scale;
  if (l.includes('founder') || l.includes('startup') || l.includes('growth')) return BRIEFS.founder;
  if (l.includes('money') || l.includes('monet') || l.includes('revenue') || l.includes('sell') || l.includes('price')) return BRIEFS.monetize;
  if (l.includes('contact') || l.includes('hire') || l.includes('email') || l.includes('phone')) return BRIEFS.contact;
  return BRIEFS.arch;
};

export const AICore = ({ muted }: { muted: boolean }) => {
  const [open, setOpen] = useState(false);
  const [persona, setPersona] = useState<Persona>('neon');
  const [input, setInput] = useState('');
  const [log, setLog] = useState<Msg[]>([{ from: 'ai', text: PERSONAS.neon.greet, chain: ['CORE ONLINE', '16 APPS INDEXED', 'LATTICE COHERENT'] }]);

  const p = PERSONAS[persona];

  const send = (preset?: string) => {
    const q = (preset ?? input).trim();
    if (!q) return;
    if (!muted) playSFX('ai');
    setLog(m => [...m, { from: 'user', text: q }]);
    setInput('');
    const b = resolve(q);
    setTimeout(() => { if (!muted) playSFX('ai'); setLog(m => [...m, { from: 'ai', text: b.text, chain: b.chain }]); }, 420);
  };

  const switchPersona = (np: Persona) => {
    if (!muted) playSFX('select');
    setPersona(np);
    setLog([{ from: 'ai', text: PERSONAS[np].greet, chain: ['PERSONA SWITCHED', `MODE: ${PERSONAS[np].tag.toUpperCase()}`] }]);
  };

  return (
    <div className="fixed bottom-6 right-6 z-[70]">
      {!open ? (
        <button onClick={() => { if (!muted) playSFX('teleport'); setOpen(true); }} className="relative group">
          <span className="absolute inset-0 rounded-2xl border-2 pulse-ring" style={{ borderColor: p.accent }} />
          <span className="relative flex items-center gap-3 px-4 py-2.5 rounded-2xl bg-[#0a1024]/95 border-2 shadow-[0_0_30px_rgba(0,229,255,0.4)] transition"
            style={{ borderColor: p.accent }}>
            <span className="w-9 h-9 rounded-full flex items-center justify-center text-[#04060f] float-y"
              style={{ background: `linear-gradient(135deg, ${p.accent}, #8b5cf6)` }}>
              <FaRobot className="text-lg" />
            </span>
            <span className="text-left font-plex">
              <span className="block text-[9px] text-white/50">AI ASSISTANT</span>
              <span className="block text-xs font-bold font-orbitron" style={{ color: p.accent }}>{p.name}</span>
            </span>
          </span>
        </button>
      ) : (
        <div className="w-[94vw] sm:w-[440px] max-h-[640px] nx-panel rounded-2xl flex flex-col overflow-hidden"
          style={{ borderColor: `${p.accent}aa`, boxShadow: `0 0 46px ${p.accent}44` }}>
          <span className="nx-corner nx-tl" /><span className="nx-corner nx-br" />
          {/* header */}
          <div className="p-3 border-b flex items-center justify-between" style={{ borderColor: `${p.accent}33`, background: 'rgba(6,10,24,0.9)' }}>
            <span className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full beacon" style={{ background: p.accent }} />
              <span className="font-orbitron font-bold text-xs text-white flex items-center gap-1.5" style={{ color: p.accent }}>
                {p.icon} {p.name}
              </span>
              <span className="text-[9px] font-plex text-white/40">· {p.tag}</span>
            </span>
            <button onClick={() => setOpen(false)} className="text-white/50 hover:text-white"><FiX /></button>
          </div>

          {/* persona switcher */}
          <div className="flex border-b border-white/10 bg-[#04060f]">
            {(Object.keys(PERSONAS) as Persona[]).map(k => (
              <button key={k} onClick={() => switchPersona(k)}
                className={`flex-1 py-2 text-[10px] font-plex tracking-wider transition ${persona === k ? 'text-[#04060f] font-bold' : 'text-white/50 hover:text-white'}`}
                style={{ background: persona === k ? PERSONAS[k].accent : 'transparent' }}>
                {PERSONAS[k].icon} {PERSONAS[k].name}
              </button>
            ))}
          </div>

          {/* log */}
          <div className={`p-3 flex-1 overflow-y-auto space-y-3 max-h-[320px] ${persona === 'terminal' ? 'bg-[#02040a] font-plex' : 'bg-[#04060f]'}`}>
            {log.map((m, i) => (
              <div key={i} className={`flex ${m.from === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className="max-w-[88%] p-3 rounded-lg text-xs leading-relaxed border"
                  style={m.from === 'user'
                    ? { background: `${p.accent}18`, borderColor: `${p.accent}66`, color: '#e6edf7' }
                    : { background: 'rgba(10,16,36,0.6)', borderColor: `${p.accent}33`, color: '#cdd8ea' }}>
                  {m.from === 'ai' && <span className="block text-[9px] font-bold mb-1 font-plex" style={{ color: p.accent }}>[{p.name}]</span>}
                  <p>{persona === 'terminal' && m.from === 'ai' ? `> ${m.text}` : m.text}</p>
                  {m.chain && (
                    <div className="mt-3 space-y-1 font-plex text-[10px]">
                      {m.chain.map((c, ci) => (
                        <div key={ci} className="flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ background: p.accent }} />
                          <span className="text-white/60">{c}</span>
                          {ci < m.chain!.length - 1 && <span className="text-white/25 ml-auto">↓</span>}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* quick chips */}
          <div className="p-2 border-t border-white/10 flex flex-wrap gap-1 bg-[#0a1024]">
            {['Architecture', 'Dependency Injection', 'Offline-First', 'CI/CD', 'Security', 'Scale', 'Founder', 'Monetization', 'Contact'].map(c => (
              <button key={c} onClick={() => send(c)}
                className="px-2 py-0.5 rounded text-[10px] font-plex border transition text-white/60 hover:text-white"
                style={{ borderColor: `${p.accent}33` }}>
                +{c}
              </button>
            ))}
          </div>

          {/* input */}
          <div className="p-2.5 border-t border-white/10 flex items-center gap-2 bg-[#04060f]">
            <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === 'Enter' && send()}
              placeholder={persona === 'terminal' ? 'nexus-sh $ query...' : 'Ask the assistant...'}
              className="nx-input flex-1 px-3 py-1.5 rounded text-xs font-plex text-white" />
            <button onClick={() => send()} className="nx-btn px-3 py-1.5 text-[11px] flex items-center gap-1.5"><FiSend /> SEND</button>
          </div>
        </div>
      )}
    </div>
  );
};
