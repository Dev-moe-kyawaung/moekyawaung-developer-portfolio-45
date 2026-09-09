import type { ReactNode } from 'react';
import {
  FiActivity, FiCloud, FiCpu, FiShield, FiCompass,
} from 'react-icons/fi';
import {
  FaGithub, FaLinkedin, FaYoutube, FaTumblr, FaRedditAlien,
  FaSlack, FaGlobeAsia,
} from 'react-icons/fa';

/* ═══════════════════════════════════════════════════════
   NEXUS OS — CENTRAL DATA REGISTRY
   ═══════════════════════════════════════════════════════ */

export interface AppNode {
  id: number; code: string; name: string; domain: string; icon: string; color: string;
  version: string; status: string; summary: string;
  layers: { presentation: string; domain: string; data: string };
  stack: string[]; metrics: string; url: string;
}

export const APPS: AppNode[] = [
  { id: 1, code: 'APP-01', name: 'Social Dashboard', domain: 'Analytics', icon: '📱', color: '#00e5ff', version: 'v3.2.0', status: 'LIVE',
    summary: 'Real-time social telemetry analyzer with multi-account live state streams and reactive engagement graphs.',
    layers: { presentation: 'Jetpack Compose — 120Hz StateFlow collectors, zero recomposition leaks.', domain: 'MVI intent reducer processing engagement deltas via Coroutine Flow.', data: 'Room DB single source of truth entangled with WebSocket remote stream.' },
    stack: ['Kotlin', 'Compose', 'MVI', 'Flow', 'WebSocket', 'Room'], metrics: '50,000+ MAU · 99.95% uptime', url: 'https://github.com/moekyawaung-tech/social-dashboard' },
  { id: 2, code: 'APP-02', name: 'PWA App', domain: 'Offline Web', icon: '🌐', color: '#2dffb3', version: 'v2.8.4', status: 'LIVE',
    summary: 'Progressive Web App with total offline caching, background sync and instant installability.',
    layers: { presentation: 'Installable app shell hydrated instantly from cache.', domain: 'Stale-while-revalidate reconciliation logic.', data: 'IndexedDB persistent vault + Service Worker cache matrix.' },
    stack: ['TypeScript', 'Service Workers', 'IndexedDB', 'Cache API', 'Vite'], metrics: '120,000+ installs · 0ms offline latency', url: 'https://github.com/moekyawaung-tech/pwa-app' },
  { id: 3, code: 'APP-03', name: 'Admin Dashboard', domain: 'Enterprise', icon: '📊', color: '#8b5cf6', version: 'v4.1.0', status: 'SECURE',
    summary: 'Mission-control administrative console with role-based ACL, audit streams and deep drill-down.',
    layers: { presentation: 'Multi-pane tactical dashboard with permission-aware widgets.', domain: 'RBAC policy engine resolving capability sets at runtime.', data: 'Multi-module federation across :core:auth, :core:network, :core:database.' },
    stack: ['Multi-Module', 'Hilt', 'Paging 3', 'REST', 'RBAC'], metrics: '35+ enterprise nodes · zero breaches', url: 'https://github.com/moekyawaung-tech/Advance-POS-Version' },
  { id: 4, code: 'APP-04', name: 'Stock Market', domain: 'Fintech', icon: '📈', color: '#ffce54', version: 'v2.5.1', status: 'LIVE',
    summary: 'High-frequency market tracker with candlestick visualizers, order-book depth and alerts.',
    layers: { presentation: 'Hardware-accelerated Canvas candlestick renderer at 60fps.', domain: 'Conflated channel buffer retaining only the newest tick.', data: 'Reconnecting WebSocket transport with exponential backoff.' },
    stack: ['StateFlow', 'WebSocket', 'Canvas', 'Coroutines'], metrics: '10K+ watchlists · 200ms latency', url: 'https://github.com/moekyawaung-tech/crypto' },
  { id: 5, code: 'APP-05', name: 'Game Collection', domain: 'Arcade', icon: '🎮', color: '#ff2d95', version: 'v1.9.0', status: 'LIVE',
    summary: 'Multi-game engine with Snake, Space Arcade and Canvas physics simulations plus synthesized audio.',
    layers: { presentation: 'Canvas 2D viewport with sprite batching and particle FX.', domain: 'Fixed time-step accumulator decoupling physics from render.', data: 'Web Audio oscillator rig + persistent high-score ledger.' },
    stack: ['Canvas 2D', 'Web Audio', 'Game Loop', 'LocalStorage'], metrics: '85K+ sessions · 60 FPS locked', url: 'https://github.com/moekyawaung-tech/game-collection' },
  { id: 6, code: 'APP-06', name: 'Music Player', domain: 'Audio DSP', icon: '🎵', color: '#00e5ff', version: 'v3.0.1', status: 'LIVE',
    summary: 'Spectral music player with FFT analyzer, playlist state machine and spatial audio DSP.',
    layers: { presentation: 'Real-time FFT spectrum bars driven by AnalyserNode.', domain: 'Audio node graph routing signal through parallel filters.', data: 'Chunked IndexedDB audio cache + MediaSession binding.' },
    stack: ['Web Audio API', 'AnalyserNode', 'MediaSession', 'ExoPlayer'], metrics: '40K+ streams · sub-10ms latency', url: 'https://github.com/moekyawaung-tech/video-player' },
  { id: 7, code: 'APP-07', name: 'Chat App', domain: 'P2P Comms', icon: '💬', color: '#2dffb3', version: 'v2.2.0', status: 'ENCRYPTED',
    summary: 'Real-time socket messenger with presence, typing indicators, E2E encryption and offline queue.',
    layers: { presentation: 'Compose chat stream with optimistic message insertion.', domain: 'Signal-style double-ratchet crypto core.', data: 'Socket.IO bidirectional link over Room-backed ledger.' },
    stack: ['Socket.IO', 'Room', 'AES-256 GCM', 'Coroutines'], metrics: '1M+ messages · E2EE enforced', url: 'https://github.com/moekyawaung-tech/pwa-app' },
  { id: 8, code: 'APP-08', name: 'World Cup', domain: 'Sports Hub', icon: '⚽', color: '#ffce54', version: 'v1.4.2', status: 'STREAMING',
    summary: 'Tournament orchestrator with live bracket computation, match telemetry and stadium geolocation.',
    layers: { presentation: 'Animated bracket graph recomputed on each score event.', domain: 'SSE stream demultiplexing concurrent match states.', data: 'Edge-cached CDN fixture delivery with push alerts.' },
    stack: ['SSE', 'Geolocation', 'Dynamic Theming', 'IndexedDB'], metrics: '60K+ trackers · sub-100ms notify', url: 'https://github.com/moekyawaung-tech/thailand-travel' },
  { id: 9, code: 'APP-09', name: 'E-Commerce', domain: 'Retail', icon: '🛒', color: '#ff2d95', version: 'v3.5.0', status: 'LIVE',
    summary: 'Full retail checkout with instant inventory deduction, cart sync and payment gateways.',
    layers: { presentation: 'Optimistic cart UI updating ahead of server confirmation.', domain: 'Event-sourced cart reducer replaying mutations deterministically.', data: 'Idempotency-keyed payment bridge with offline persistence.' },
    stack: ['Redux Pattern', 'Stripe SDK', 'Room', 'Retrofit'], metrics: '$2.4M GMV · 99.9% success', url: 'https://github.com/moekyawaung-tech/POS-Full-Version' },
  { id: 10, code: 'APP-10', name: 'Portfolio Hub', domain: 'Showcase', icon: '💼', color: '#8b5cf6', version: 'v3.0.0', status: 'LIVE',
    summary: 'This very NEXUS OS — cinematic 3D engine, app launcher, terminal and multi-persona AI.',
    layers: { presentation: 'Canvas 3D neon sphere, vortex particles, boot sequence.', domain: 'Window manager + persona routing + audio synthesizer.', data: 'React 19 + TypeScript + Vite single-file build pipeline.' },
    stack: ['React 19', 'TypeScript', 'Canvas 2D', 'Tailwind', 'Web Audio'], metrics: '100K+ views · Lighthouse 100', url: 'https://github.com/Dev-moe-kyawaung/' },
  { id: 11, code: 'APP-11', name: 'Money Tracker', domain: 'Fintech Vault', icon: '💰', color: '#ffce54', version: 'v2.1.0', status: 'SEALED',
    summary: 'Dual-currency ledger with budget thresholds, visual categorization and secure export.',
    layers: { presentation: 'Biometric gate before any state is observable.', domain: 'Multi-currency conversion holding MMK/THB in parallel.', data: 'SQLCipher AES-256 encrypted database at rest.' },
    stack: ['Room', 'SQLCipher', 'BiometricPrompt', 'Charts'], metrics: '25K+ ledgers · zero egress', url: 'https://github.com/moekyawaung-tech/Daily-planner-app' },
  { id: 12, code: 'APP-12', name: 'Weather Radar', domain: 'Atmosphere', icon: '🌤️', color: '#00e5ff', version: 'v2.0.4', status: 'SCANNING',
    summary: 'Atmospheric forecaster with live telemetry, animated particle rain and severe-weather alerts.',
    layers: { presentation: 'Canvas particle precipitation shader reacting to conditions.', domain: 'Forecast probability bands as confidence envelopes.', data: 'GPS fused-location + certificate-pinned REST ingest.' },
    stack: ['REST API', 'Canvas Shaders', 'FusedLocation', 'Retrofit'], metrics: '75K+ polls · live alerts', url: 'https://github.com/moekyawaung-tech/Weather-app' },
  { id: 13, code: 'APP-13', name: 'Crypto Vault', domain: 'Web3', icon: '💸', color: '#8b5cf6', version: 'v1.6.0', status: 'CONSENSUS',
    summary: 'Non-custodial wallet visualizer tracking gas fluctuations, multi-chain balances and audits.',
    layers: { presentation: 'Multi-chain portfolio surface with live gas gauges.', domain: 'Fallback RPC providers queried in parallel.', data: 'Hardware TEE keystore — keys never leave the enclave.' },
    stack: ['Ethers.js', 'FallbackProvider', 'Keystore TEE', 'Web3'], metrics: '15K+ wallets · zero compromises', url: 'https://github.com/moekyawaung-tech/crypto' },
  { id: 14, code: 'APP-14', name: 'JS Todo Master', domain: 'Productivity', icon: '📝', color: '#ff2d95', version: 'v3.0.0', status: 'LIVE',
    summary: 'Keyboard-driven task organizer with IndexedDB persistence and drag-drop hierarchy.',
    layers: { presentation: 'Zero-latency keyboard-first input grid.', domain: 'Drag ghost preview showing target ordering.', data: 'Raw IndexedDB transactions — zero dependencies.' },
    stack: ['Vanilla JS', 'IndexedDB', 'Drag & Drop', 'Web Audio'], metrics: '30K+ tasks · sub-5ms input', url: 'https://github.com/moekyawaung-tech/javascript-todo' },
  { id: 15, code: 'APP-15', name: 'Video Player Pro', domain: 'Media', icon: '🎯', color: '#00e5ff', version: 'v4.0.0', status: 'LIVE',
    summary: 'Hardware-accelerated gesture player with PiP, track selection and subtitle parsing.',
    layers: { presentation: 'Multi-touch gesture surface: brightness/volume/seek.', domain: 'Adaptive bitrate ladder from parallel renditions.', data: 'MediaCodec hardware decode with Widevine support.' },
    stack: ['ExoPlayer', 'Media3', 'MediaCodec', 'Compose Gestures'], metrics: '200K+ sessions · zero drops', url: 'https://github.com/moekyawaung-tech/video-player' },
  { id: 16, code: 'APP-16', name: 'PulseSync — LEGEND!', domain: 'Flagship Core', icon: '🔥', color: '#ffce54', version: 'v5.0.0', status: 'FLAGSHIP',
    summary: 'Flagship multi-module Android platform: Compose UI, Hilt DI, Firebase cluster and full CI/CD.',
    layers: { presentation: '100% Jetpack Compose unidirectional data flow + Material 3.', domain: '80+ Gradle modules compiling in parallel with feature flags.', data: 'Offline-first Room + Firebase realtime sync + GitHub Actions.' },
    stack: ['Kotlin 2.0', 'Compose', 'Hilt', 'Firebase', 'Room', 'GitHub Actions'], metrics: '1M+ downloads · 50K+ MAU · 4.8★', url: 'https://github.com/Dev-moe-kyawaung/pulsesync-android' },
];

/* ── ARCHITECTURE PILLARS ── */
export interface Pillar { icon: string; title: string; tag: string; desc: string; color: string; }
export const PILLARS: Pillar[] = [
  { icon: '◫', title: 'MODULARIZATION', tag: 'ISOLATION', desc: 'Feature/domain/data separation with sealed contracts. Domain layer is pure Kotlin — zero Android imports.', color: '#00e5ff' },
  { icon: '⬡', title: 'MULTI-MODULE', tag: '80+ MODULES', desc: 'Version catalogs, build cache and dynamic features keep cold compile under 45 seconds at scale.', color: '#2dffb3' },
  { icon: '⚡', title: 'DEPENDENCY INJECTION', tag: 'HILT / DAGGER', desc: 'Compile-time verified object graph, scoped lifetimes and assisted factories for state restoration.', color: '#8b5cf6' },
  { icon: '⟲', title: 'CI/CD PIPELINE', tag: 'ZERO-TOUCH', desc: 'GitHub Actions + Fastlane: lint, 90% coverage gate, emulator screenshot diff, signed staged rollout.', color: '#ffce54' },
  { icon: '◎', title: 'TESTING STRATEGY', tag: '90%+ COVERAGE', desc: 'MockK + Turbine for Flows, in-memory Room integration tests, ComposeTestRule UI assertions.', color: '#ff2d95' },
  { icon: '⛨', title: 'SECURITY HARDENING', tag: 'AES-256 GCM', desc: 'Keystore-backed encryption, TLS 1.3 certificate pinning, biometric gates and root tamper detection.', color: '#00e5ff' },
];

/* ── CERTIFICATES ── */
export interface Cert { n: string; c: string; id: string; d: string; }
export const CERTS: Cert[] = [
  { n: 'C Programming Core', c: 'Programming', id: '1720080366600', d: 'Jul 4, 2024' },
  { n: 'C++ Systems Architecture', c: 'Programming', id: '1720080489120', d: 'Jul 5, 2024' },
  { n: 'Java Enterprise Systems', c: 'Programming', id: '1720080512300', d: 'Jul 6, 2024' },
  { n: 'Python Automation', c: 'Programming', id: '1720080598100', d: 'Jul 7, 2024' },
  { n: 'Kotlin Development', c: 'Mobile', id: '1720080612400', d: 'Jul 8, 2024' },
  { n: 'Android Architecture Components', c: 'Mobile', id: '1720080645100', d: 'Jul 9, 2024' },
  { n: 'Jetpack Compose UI', c: 'Mobile', id: '1720080698200', d: 'Jul 10, 2024' },
  { n: 'Flutter & Dart', c: 'Mobile', id: '1720080723100', d: 'Jul 11, 2024' },
  { n: 'React Native Cross-Platform', c: 'Mobile', id: '1720080789400', d: 'Jul 12, 2024' },
  { n: 'React.js Engineering', c: 'Web', id: '1720080812300', d: 'Jul 13, 2024' },
  { n: 'Vue.js Framework', c: 'Web', id: '1720080845600', d: 'Jul 14, 2024' },
  { n: 'Angular Enterprise', c: 'Web', id: '1720080891200', d: 'Jul 15, 2024' },
  { n: 'Node.js REST APIs', c: 'Web', id: '1720080923400', d: 'Jul 16, 2024' },
  { n: 'HTML5 & CSS3 Master', c: 'Web', id: '1720080967800', d: 'Jul 17, 2024' },
  { n: 'Tailwind CSS Specialist', c: 'Web', id: '1720080998100', d: 'Jul 18, 2024' },
  { n: 'TypeScript Systems', c: 'Web', id: '1720081034500', d: 'Jul 19, 2024' },
  { n: 'Firebase Backend Suite', c: 'Databases', id: '1720081078900', d: 'Jul 20, 2024' },
  { n: 'PostgreSQL Design', c: 'Databases', id: '1720081112300', d: 'Jul 21, 2024' },
  { n: 'MongoDB NoSQL', c: 'Databases', id: '1720081145600', d: 'Jul 22, 2024' },
  { n: 'Redis In-Memory Cache', c: 'Databases', id: '1720081198200', d: 'Jul 23, 2024' },
  { n: 'SQL Query Optimization', c: 'Databases', id: '1720081234500', d: 'Jul 24, 2024' },
  { n: 'Room DB for Android', c: 'Databases', id: '1720081278900', d: 'Jul 25, 2024' },
  { n: 'Machine Learning Core', c: 'AI / ML', id: '1720081312300', d: 'Jul 26, 2024' },
  { n: 'TensorFlow Lite On-Device', c: 'AI / ML', id: '1720081345600', d: 'Jul 27, 2024' },
  { n: 'Deep Learning Networks', c: 'AI / ML', id: '1720081398200', d: 'Jul 28, 2024' },
  { n: 'Natural Language Processing', c: 'AI / ML', id: '1720081434500', d: 'Jul 29, 2024' },
  { n: 'Computer Vision', c: 'AI / ML', id: '1720081478900', d: 'Jul 30, 2024' },
  { n: 'Claude API / LLM Integration', c: 'AI / ML', id: '1720081512300', d: 'Jul 31, 2024' },
  { n: 'Ethical Hacking & Pen Testing', c: 'Security', id: '1720081545600', d: 'Aug 1, 2024' },
  { n: 'Cybersecurity & Kali Linux', c: 'Security', id: '1720081598200', d: 'Aug 2, 2024' },
  { n: 'GitHub Actions CI/CD', c: 'Security', id: '1720081634500', d: 'Aug 3, 2024' },
  { n: 'Docker Containerization', c: 'Security', id: '1720081678900', d: 'Aug 4, 2024' },
  { n: 'Azure DevOps Pipeline', c: 'Security', id: '1720081712300', d: 'Aug 5, 2024' },
  { n: 'Network Protocol Defense', c: 'Security', id: '1720081745600', d: 'Aug 6, 2024' },
  { n: 'Blockchain Architecture', c: 'Engineering', id: '1720081798200', d: 'Aug 7, 2024' },
  { n: 'Smart Contract Development', c: 'Engineering', id: '1720081834500', d: 'Aug 8, 2024' },
  { n: 'Clean Architecture Pattern', c: 'Engineering', id: '1720081878900', d: 'Aug 9, 2024' },
  { n: 'SOLID Principles in OOP', c: 'Engineering', id: '1720081912300', d: 'Aug 10, 2024' },
  { n: 'Design Patterns (GoF)', c: 'Engineering', id: '1720081945600', d: 'Aug 11, 2024' },
  { n: 'Data Structures & Algorithms', c: 'Engineering', id: '1720081998200', d: 'Aug 12, 2024' },
  { n: 'Startup MVP Development', c: 'Business', id: '1720082034500', d: 'Aug 13, 2024' },
  { n: 'Agile Scrum Leadership', c: 'Business', id: '1720082078900', d: 'Aug 14, 2024' },
];
export const CERT_CATS = ['ALL', 'Mobile', 'Programming', 'Web', 'Databases', 'AI / ML', 'Security', 'Engineering', 'Business'];

/* ── MONETIZATION / PRODUCTS ── */
export interface Product { name: string; tier: string; price: string; desc: string; features: string[]; color: string; featured?: boolean; }
export const PRODUCTS: Product[] = [
  { name: 'NEXUS Template Kit', tier: 'STARTER', price: '$49', color: '#00e5ff',
    desc: 'Cyber-cinematic React portfolio template with 3D engine, boot sequence and multi-persona AI.',
    features: ['Full React + TypeScript source', 'Canvas 3D neon engine', 'App launcher OS shell', 'Lifetime updates'] },
  { name: 'Android Neon OS Kit', tier: 'PRO', price: '$149', color: '#ff2d95', featured: true,
    desc: 'Production Jetpack Compose launcher: MVVM, navigation, neon theming and modular architecture.',
    features: ['Compose + MVVM boilerplate', '80+ module blueprint', 'Hilt DI setup', 'CI/CD pipeline templates', 'Priority support'] },
  { name: 'Founder Blueprint Suite', tier: 'ELITE', price: '$399', color: '#8b5cf6',
    desc: 'Everything — template kits, brand book, sound identity, marketing copy and 1:1 architecture review.',
    features: ['All templates & kits', 'Premium brand book (PDF)', 'Sound identity pack', 'Marketing copy library', '1:1 architecture consult'] },
];

/* ── REVENUE STREAMS ── */
export const REVENUE = [
  { label: 'Template & Kit Sales', pct: 34, color: '#00e5ff' },
  { label: 'Enterprise Consulting', pct: 28, color: '#ff2d95' },
  { label: 'App Store Revenue', pct: 20, color: '#8b5cf6' },
  { label: 'AI Tools & SaaS', pct: 12, color: '#2dffb3' },
  { label: 'Sponsorship & Ads', pct: 6, color: '#ffce54' },
];

/* ── NETWORK NODES ── */
export const GITHUB_NODES = [
  'Dev-moe-kyawaung', 'moekyawaung-tech', 'moekyawaung-china', 'moekyawaung-developer',
  'moekyawaungvivov30pro-design', 'moekyaw-aung-mm', 'moekyawaung-mk', 'moekyawaung-microsoft',
  'moekyawaung-cyber', 'moekyawaung-bangkok', 'moekyawaung-micro', 'moekyawaungmka2032-boop',
  'moekyawaung-dev-mm', 'moekyaw-developer', 'moekyawaung.github.io', 'Moekyawaung-mm',
  'moekyawaung-hack', 'moekyawaung-graduate', 'Moekyawaung-Linux', 'Moekyawaung-coder',
  'moekyawaung-designer', 'Moekyawaung2026', 'moekyawaungmka2034-coder', 'Moekyawaung-mk',
  'moekyawaung-web', 'MoeKyawAung-code', 'moekyawaung-creator', 'moekyawaung-webdeveloper',
  'Moekyawaung-co', 'moekyawaung-edu', 'moekyawaung-senior', 'Moekyawaung-Development',
  'moekyawaung-google', 'Moe-KyawAung', 'Moekyawaung-dev', 'Moekyawaung-cyber',
  'moekyawaung-free', 'moekyawaung-myanmar', 'moekyawaungmka', 'moekyaw-url',
  'happy-cv-creator', 'moekyaw-mk', 'mmoekyaw',
];

export const LOVABLE = [
  { n: 'Happy CV Creator', u: 'https://happy-cv-creator.lovable.app' },
  { n: 'MKA Bio Hub', u: 'https://moekyawaungmybio.lovable.app/' },
  { n: 'The CV Palette', u: 'https://the-cv-palette.lovable.app' },
  { n: 'URL Shortener', u: 'https://moekyaw-url.lovable.app' },
  { n: 'Dev Profile 2026', u: 'https://moekyawaung-dev.lovable.app' },
  { n: 'Main Portfolio', u: 'https://moe-kyaw-aung.lovable.app' },
  { n: 'CV Beacon System', u: 'https://cv-beacon.lovable.app/' },
  { n: 'Persuasion Hub', u: 'https://profile-persuasion-hub.lovable.app' },
  { n: 'App Skill Gallery', u: 'https://app-skill-gallery.lovable.app' },
  { n: 'Joy Codify Life', u: 'https://joy-codify-life.lovable.app/' },
  { n: 'Spark Coach AI', u: 'https://spark-coach-create.lovable.app' },
  { n: 'Color Code Chronicles', u: 'https://color-code-chronicles.lovable.app' },
  { n: 'Friendly Haven IO', u: 'https://friendly-haven-io.lovable.app' },
  { n: 'Pixel Perfect Snap', u: 'https://pixel-perfect-snap-39.lovable.app' },
  { n: 'Dev MoeKyaw', u: 'https://devmoekyaw.lovable.app' },
  { n: 'Myanmar Hub', u: 'https://moekyawaung-myanmar.lovable.app' },
];

export const EMAILS = [
  'moekyawaung@programmer.net', 'moekyawaung@technologist.com', 'moekyawaung@engineer.com',
  'moekyawaung@techie.com', 'moekyawaung@collector.org', 'moekyawaung@graphic-designer.com',
  'moekyawaung@cybergal.com', 'moekyawaung@webname.com', 'moekyawaung@hackermail.com',
  'moekyawaung@graduate.org', 'moekyawaung@asia.com', 'moekyawaung@contractor.net',
  'moekyawaung@linuxmail.org', 'moekyawaung@usa.com', 'moekyawaung@europe.com',
  'moekyawaung@mail.com', 'moekyawaung@iname.com', 'moekyawaung@socialogist.com',
  'moekyawaung@secretary.net', 'moekyawaung@publicist.com',
];

export interface Social { n: string; i: ReactNode; u: string; t: string; }
export const SOCIALS: Social[] = [
  { n: 'GitHub', i: <FaGithub />, u: 'https://github.com/Dev-moe-kyawaung/', t: '@Dev-moe-kyawaung' },
  { n: 'LinkedIn', i: <FaLinkedin />, u: 'https://www.linkedin.com/in/moe-kyaw-aung-2653093a1', t: 'Moe Kyaw Aung' },
  { n: 'YouTube', i: <FaYoutube />, u: 'https://www.youtube.com/channel/UCuTXUguZb4xjeL2nX8WJG', t: 'Dev Channel' },
  { n: 'Bluesky', i: <FiActivity />, u: 'https://bsky.app/profile/moekyawaung96.bsky.social', t: '@moekyawaung96' },
  { n: 'Tumblr', i: <FaTumblr />, u: 'https://www.tumblr.com/moekyawaung', t: 'Tech Log' },
  { n: 'Flickr', i: <FiCompass />, u: 'https://www.flickr.com/people/204037451@N06', t: 'Visual Archive' },
  { n: 'Vimeo', i: <FiActivity />, u: 'https://vimeo.com/user252414232', t: 'Video Reel' },
  { n: 'Gravatar', i: <FaGlobeAsia />, u: 'https://gravatar.com/moekyawaung13721', t: 'Verified ID' },
  { n: 'Slack', i: <FaSlack />, u: 'https://moekyawaung.slack.com/', t: 'Workspace' },
  { n: 'Reddit', i: <FaRedditAlien />, u: 'https://bsky.app/profile/moekyawaung96.bsky.social', t: 'Threads' },
  { n: 'Strikingly', i: <FiCompass />, u: 'http://moekyawaung2026.strikingly.com', t: 'Web Portal' },
];

export const GALLERY = [
  'https://res.cloudinary.com/dye5qpwii/image/upload/v1778763531/MKA_12_iv8kpm.webp',
  'https://res.cloudinary.com/dye5qpwii/image/upload/v1778747388/image-1_1_khsx9s.png',
  'https://res.cloudinary.com/dye5qpwii/image/upload/v1778763531/MKA_3_zqrhhr.webp',
  'https://res.cloudinary.com/dye5qpwii/image/upload/v1778763532/MKA_11_jbijtv.webp',
  'https://res.cloudinary.com/dye5qpwii/image/upload/v1778795799/2024119_20_b94fen.jpg',
  'https://res.cloudinary.com/dye5qpwii/image/upload/v1778795800/2024119_18_syk2ou.jpg',
  'https://res.cloudinary.com/dye5qpwii/image/upload/v1778795801/MKA_22_felevo.webp',
  'https://res.cloudinary.com/dye5qpwii/image/upload/v1778763536/preview_ls5ptn.webp',
];

export const PROFILE_IMG = 'https://res.cloudinary.com/dye5qpwii/image/upload/v1778763535/MKA_25_lbx6fb.webp';

/* ── ICON SUPPLIERS (re-exported for convenience) ── */
export const ICONS = { FiCloud, FiCpu, FiShield, FiActivity };

/* ── PILLAR TAB ICON MAP ── */
export const focusIcons: Record<string, ReactNode> = {
  Mobile: <span className="text-cyan-300">📱</span>,
  Backend: <FiCloud className="text-emerald-300" />,
  Security: <FiShield className="text-magenta-300" />,
  AI: <FiCpu className="text-violet-300" />,
};
