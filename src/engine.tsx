import { useEffect, useRef } from 'react';

/* ═══════════════════════════════════════════════════════
   NEXUS OS — SOUND IDENTITY (WEB AUDIO SYNTHESIZER)
   ═══════════════════════════════════════════════════════ */
export type SFX = 'hover' | 'select' | 'boot' | 'teleport' | 'ai' | 'success' | 'whoosh';

export const playSFX = (type: SFX) => {
  try {
    const C = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!C) return;
    const ctx = new C();
    const now = ctx.currentTime;

    const tone = (freq: number, freq2: number, dur: number, kind: OscillatorType, vol = 0.05) => {
      const osc = ctx.createOscillator();
      const g = ctx.createGain();
      osc.type = kind;
      osc.frequency.setValueAtTime(freq, now);
      if (freq2 !== freq) osc.frequency.exponentialRampToValueAtTime(freq2, now + dur);
      g.gain.setValueAtTime(vol, now);
      g.gain.exponentialRampToValueAtTime(0.001, now + dur);
      osc.connect(g); g.connect(ctx.destination);
      osc.start(now); osc.stop(now + dur);
    };

    if (type === 'hover') tone(1600, 1600, 0.04, 'sine', 0.02);
    else if (type === 'select') tone(520, 1040, 0.14, 'triangle', 0.05);
    else if (type === 'boot') { tone(180, 900, 0.5, 'sawtooth', 0.05); }
    else if (type === 'teleport') tone(300, 1900, 0.35, 'sine', 0.05);
    else if (type === 'ai') { tone(880, 1320, 0.12, 'sine', 0.035); }
    else if (type === 'success') { tone(523, 784, 0.3, 'sine', 0.05); }
    else if (type === 'whoosh') {
      const size = ctx.sampleRate * 0.3;
      const buf = ctx.createBuffer(1, size, ctx.sampleRate);
      const d = buf.getChannelData(0);
      for (let i = 0; i < size; i++) d[i] = (Math.random() * 2 - 1) * (1 - i / size);
      const src = ctx.createBufferSource(); src.buffer = buf;
      const f = ctx.createBiquadFilter(); f.type = 'bandpass';
      f.frequency.setValueAtTime(400, now); f.frequency.exponentialRampToValueAtTime(2400, now + 0.3);
      const g = ctx.createGain(); g.gain.setValueAtTime(0.04, now); g.gain.exponentialRampToValueAtTime(0.001, now + 0.3);
      src.connect(f); f.connect(g); g.connect(ctx.destination);
      src.start(now); src.stop(now + 0.3);
    }
  } catch { /* pre-gesture */ }
};

/* ═══════════════════════════════════════════════════════
   NEON 3D ENGINE — SPHERE + RINGS + VORTEX (canvas)
   ═══════════════════════════════════════════════════════ */
export const NeonEngine = ({ size = 460, intense = false }: { size?: number; intense?: boolean }) => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d'); if (!ctx) return;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    cv.width = size * dpr; cv.height = size * dpr; ctx.scale(dpr, dpr);
    let raf = 0, t = 0;

    // Fibonacci sphere points
    const N = 300;
    const pts: { x: number; y: number; z: number }[] = [];
    for (let i = 0; i < N; i++) {
      const y = 1 - (i / (N - 1)) * 2;
      const r = Math.sqrt(1 - y * y);
      const th = i * 2.399963;
      pts.push({ x: Math.cos(th) * r, y, z: Math.sin(th) * r });
    }

    // Vortex particles
    const vortex = Array.from({ length: 90 }, () => ({
      ang: Math.random() * Math.PI * 2,
      rad: 0.2 + Math.random() * 0.9,
      z: (Math.random() - 0.5) * 2,
      sp: 0.005 + Math.random() * 0.02,
      hue: [190, 265, 320, 160][Math.floor(Math.random() * 4)],
    }));

    const draw = () => {
      t += 0.006;
      const c = size / 2;
      const R = size * 0.32;
      ctx.clearRect(0, 0, size, size);

      // ambient glow
      const g = ctx.createRadialGradient(c, c, 0, c, c, R * 1.7);
      g.addColorStop(0, 'rgba(0,229,255,0.10)');
      g.addColorStop(0.5, 'rgba(139,92,246,0.04)');
      g.addColorStop(1, 'transparent');
      ctx.fillStyle = g; ctx.fillRect(0, 0, size, size);

      const rotY = t * 0.5, rotX = Math.sin(t * 0.3) * 0.4;
      const rot = (p: { x: number; y: number; z: number }) => {
        let { x, y, z } = p;
        const cy = Math.cos(rotY), sy = Math.sin(rotY);
        [x, z] = [x * cy - z * sy, x * sy + z * cy];
        const cx = Math.cos(rotX), sx = Math.sin(rotX);
        [y, z] = [y * cx - z * sx, y * sx + z * cx];
        return { x, y, z };
      };

      // orbital rings (3, tilted)
      for (let ri = 0; ri < 3; ri++) {
        ctx.beginPath();
        const steps = 60;
        for (let s = 0; s <= steps; s++) {
          const a = (s / steps) * Math.PI * 2;
          const rr = R * (1.15 + ri * 0.18);
          const p = rot({ x: Math.cos(a) * rr / R, y: Math.sin(a) * (0.3 - ri * 0.08), z: Math.sin(a) * rr / R });
          const scale = 300 / (300 + p.z * R);
          const px = c + p.x * R * scale, py = c + p.y * R * scale;
          s === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
        }
        ctx.strokeStyle = ['rgba(0,229,255,0.3)', 'rgba(139,92,246,0.24)', 'rgba(255,45,149,0.2)'][ri];
        ctx.lineWidth = 1; ctx.stroke();
      }

      // sphere points
      pts.forEach(p0 => {
        const p = rot(p0);
        const scale = 300 / (300 + p.z * R);
        const px = c + p.x * R * scale, py = c + p.y * R * scale;
        const alpha = (p.z + 1) / 2;
        ctx.beginPath();
        ctx.arc(px, py, (intense ? 1.6 : 1.2) * scale, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(0,229,255,${alpha * 0.7})`;
        ctx.fill();
      });

      // vortex
      vortex.forEach(v => {
        v.ang += v.sp;
        const p = rot({ x: Math.cos(v.ang) * v.rad, y: v.z * 0.5, z: Math.sin(v.ang) * v.rad });
        const scale = 300 / (300 + p.z * R);
        const px = c + p.x * R * 1.3 * scale, py = c + p.y * R * 1.3 * scale;
        const a = (p.z + 1) / 2;
        ctx.beginPath();
        ctx.arc(px, py, 1.6 * scale, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${v.hue},100%,65%,${a * 0.8})`;
        ctx.shadowColor = `hsl(${v.hue},100%,60%)`; ctx.shadowBlur = 6 * a;
        ctx.fill(); ctx.shadowBlur = 0;
      });

      // core singularity
      ctx.beginPath();
      ctx.arc(c, c, 5 + Math.sin(t * 3) * 1.6, 0, Math.PI * 2);
      ctx.fillStyle = '#c9f7ff';
      ctx.shadowColor = '#00e5ff'; ctx.shadowBlur = 24; ctx.fill(); ctx.shadowBlur = 0;

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => cancelAnimationFrame(raf);
  }, [size, intense]);

  return <canvas ref={ref} style={{ width: size, height: size }} className="pointer-events-none" />;
};

/* ═══════════════════════════════════════════════════════
   BACKGROUND STARFIELD + PARALLAX NEBULA
   ═══════════════════════════════════════════════════════ */
export const CinematicBG = () => {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = ref.current; if (!cv) return;
    const ctx = cv.getContext('2d'); if (!ctx) return;
    let raf = 0, t = 0;
    let mx = -9999, my = -9999;

    const fit = () => { cv.width = window.innerWidth; cv.height = window.innerHeight; };
    fit();
    const onResize = () => fit();
    const onMove = (e: MouseEvent) => { mx = e.clientX; my = e.clientY; };
    window.addEventListener('resize', onResize);
    window.addEventListener('mousemove', onMove);

    const stars = Array.from({ length: 140 }, () => ({
      x: Math.random(), y: Math.random(), z: Math.random(), sp: 0.02 + Math.random() * 0.05,
      hue: [190, 265, 320][Math.floor(Math.random() * 3)],
    }));

    const draw = () => {
      t += 0.005;
      const w = cv.width, h = cv.height;
      ctx.fillStyle = 'rgba(4,6,15,0.35)';
      ctx.fillRect(0, 0, w, h);

      // nebula orbs
      [
        { x: 0.25, y: 0.35, hue: 265 }, { x: 0.75, y: 0.55, hue: 190 }, { x: 0.5, y: 0.85, hue: 320 },
      ].forEach((o, i) => {
        const ox = o.x * w + Math.sin(t * 0.4 + i) * 40;
        const oy = o.y * h + Math.cos(t * 0.3 + i) * 40;
        const g = ctx.createRadialGradient(ox, oy, 0, ox, oy, w * 0.28);
        g.addColorStop(0, `hsla(${o.hue},90%,55%,0.05)`);
        g.addColorStop(1, 'transparent');
        ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
      });

      // parallax drift toward mouse
      const px = mx < 0 ? 0 : (mx - w / 2) / w * 22;
      const py = my < 0 ? 0 : (my - h / 2) / h * 22;

      stars.forEach(s => {
        s.y += s.sp * 0.002;
        if (s.y > 1) s.y = 0;
        const depth = s.z * 2 + 0.4;
        const x = s.x * w + px * depth;
        const y = s.y * h + py * depth;
        const size = s.z * 1.8 + 0.4;
        const tw = 0.4 + Math.abs(Math.sin(t * 2 + s.x * 30)) * 0.5;
        ctx.beginPath(); ctx.arc(x, y, size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${s.hue},100%,75%,${tw * s.z})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(draw);
    };
    draw();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('mousemove', onMove);
    };
  }, []);

  return <canvas ref={ref} className="fixed inset-0 z-0 pointer-events-none" />;
};

/* ═══════════════════════════════════════════════════════
   INTERSECTION REVEAL HOOK
   ═══════════════════════════════════════════════════════ */
export const useReveal = () => {
  const ref = useRef<HTMLElement | null>(null);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('fade-up'); io.unobserve(e.target); } });
    }, { threshold: 0.08 });
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
};
