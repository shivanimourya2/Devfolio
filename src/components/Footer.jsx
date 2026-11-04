import { useEffect, useLayoutEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import "./Footer.css";

gsap.registerPlugin(ScrollTrigger);

/* ✏️ EDIT THESE LINKS */
const SOCIALS = [
  { label: "GitHub", href: "https://github.com/shivanimourya2", path: "M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.78 0c2.2-1.49 3.17-1.18 3.17-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.69 5.39-5.25 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/YOUR-HANDLE", path: "M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.34V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" },
  { label: "X", href: "https://x.com/YOUR-HANDLE", path: "M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.58-6.63 7.58H.49l8.6-9.83L0 1.15h7.59l5.24 6.93 6.07-6.93Zm-1.29 19.5h2.04L6.48 3.24H4.3l13.31 17.41Z" },
  { label: "Email", href: "mailto:you@example.com", path: "M2 5.5A2.5 2.5 0 0 1 4.5 3h15A2.5 2.5 0 0 1 22 5.5v13a2.5 2.5 0 0 1-2.5 2.5h-15A2.5 2.5 0 0 1 2 18.5v-13Zm2.3-.2L12 11.4l7.7-6.1H4.3Zm15.7 1.9-7.38 5.85a1 1 0 0 1-1.24 0L4 7.2v11.3a.5.5 0 0 0 .5.5h15a.5.5 0 0 0 .5-.5V7.2Z" },
];

const STOPS = [[63, 208, 212], [139, 108, 240], [228, 91, 181]]; // teal → violet → pink
const colorAt = (u) => {
  const s = Math.min(Math.max(u, 0), 1) * 2;
  const i = Math.min(1, Math.floor(s));
  const f = s - i;
  const a = STOPS[i], b = STOPS[i + 1];
  return `rgb(${a[0] + (b[0] - a[0]) * f | 0},${a[1] + (b[1] - a[1]) * f | 0},${a[2] + (b[2] - a[2]) * f | 0})`;
};

export default function Footer() {
  const root = useRef(null);
  const canvasRef = useRef(null);
  const innerRef = useRef(null);
  const bandRef = useRef(null);

  /* ---------- full-footer particles + dotted name + wave ---------- */
  useEffect(() => {
    const canvas = canvasRef.current;
    const footer = root.current;
    const ctx = canvas.getContext("2d");
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const BUCKETS = 32, LINK = 120;
    let W = 0, H = 0, bandY = 0, bandH = 0;
    let buckets = [], colCache = [], motes = [], raf = 0, t = 0, visible = true;
    const mouse = { x: -999, y: -999 };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      W = footer.clientWidth; H = footer.clientHeight;
      canvas.width = W * dpr; canvas.height = H * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      bandY = innerRef.current.offsetTop + bandRef.current.offsetTop;
      bandH = bandRef.current.offsetHeight;

      colCache = Array.from({ length: BUCKETS }, (_, i) => colorAt(i / (BUCKETS - 1)));
      buckets = Array.from({ length: BUCKETS }, () => []);

      // dotted name, sampled inside the art band
      const off = document.createElement("canvas");
      off.width = W; off.height = bandH;
      const o = off.getContext("2d", { willReadFrequently: true });
      const font = (s) => `800 ${s}px Inter, "Segoe UI", system-ui, sans-serif`;
      o.font = font(100);
      const size = Math.min((100 * W * 0.93) / o.measureText("Shivani Mourya").width, bandH * 0.52);
      o.font = font(size);
      o.textAlign = "center";
      o.fillText("Shivani Mourya", W / 2, bandH * 0.78);
      const gap = W < 640 ? 4 : W < 1100 ? 5 : 6;
      const data = o.getImageData(0, 0, W, bandH).data;
      for (let y = 0; y < bandH; y += gap)
        for (let x = 0; x < W; x += gap)
          if (data[((y | 0) * W + (x | 0)) * 4 + 3] > 128) {
            const b = Math.min(BUCKETS - 1, (x / W * BUCKETS) | 0);
            buckets[b].push({ hx: x, hy: y + bandY, x, y: y + bandY, vx: 0, vy: 0 });
          }

      // ambient particles over the whole footer
      const n = Math.round(Math.min(90, Math.max(30, (W * H) / 14000)));
      motes = Array.from({ length: n }, () => ({
        x: Math.random() * W, y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.25, vy: -0.08 - Math.random() * 0.3,
        r: 1 + Math.random() * 1.8, ph: Math.random() * 6.28,
      }));
    };

    const drawMotes = () => {
      for (const p of motes) {
        p.x += p.vx; p.y += p.vy;
        const mx = p.x - mouse.x, my = p.y - mouse.y, d = Math.hypot(mx, my);
        if (d < 130 && d > 0.01) { p.x += (mx / d) * (130 - d) * 0.03; p.y += (my / d) * (130 - d) * 0.03; }
        if (p.y < -10) { p.y = H + 10; p.x = Math.random() * W; }
        if (p.x < -10) p.x = W + 10; else if (p.x > W + 10) p.x = -10;
      }
      ctx.lineWidth = 1;
      for (let i = 0; i < motes.length; i++) {
        const a = motes[i];
        for (let j = i + 1; j < motes.length; j++) {
          const b = motes[j], d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < LINK) {
            ctx.globalAlpha = (1 - d / LINK) * 0.28;
            ctx.strokeStyle = colCache[Math.min(BUCKETS - 1, Math.max(0, (((a.x + b.x) / 2 / W) * BUCKETS) | 0))];
            ctx.beginPath(); ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y); ctx.stroke();
          }
        }
      }
      for (const p of motes) {
        ctx.globalAlpha = 0.35 + 0.35 * Math.sin(t * 1.5 + p.ph);
        ctx.fillStyle = colCache[Math.min(BUCKETS - 1, Math.max(0, ((p.x / W) * BUCKETS) | 0))];
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2); ctx.fill();
      }
    };

    const drawWave = () => {
      const base = bandY + bandH * 0.42, amp = bandH * 0.1, rows = 34, step = 4;
      for (let x = 0; x <= W; x += step) {
        const u = x / W;
        const c = base + Math.sin(u * 5 + t * 0.8) * amp + Math.sin(u * 11 - t * 1.1) * amp * 0.35 - (u - 0.5) * bandH * 0.16;
        const th = (0.25 + 0.75 * Math.abs(Math.sin(u * 3.2 + t * 0.5))) * bandH * 0.26;
        ctx.globalAlpha = 0.6 * Math.min(1, u * 6, (1 - u) * 6);
        ctx.fillStyle = colCache[Math.min(BUCKETS - 1, (u * BUCKETS) | 0)];
        for (let r = 0; r < rows; r++) {
          const y = c + (r / (rows - 1) - 0.5) * th + Math.sin(r * 0.7 + u * 20 + t) * 1.2;
          ctx.fillRect(x, y, 1.5, 1.5);
        }
      }
    };

    const drawText = () => {
      const R = 90;
      for (let b = 0; b < BUCKETS; b++) {
        ctx.globalAlpha = 0.85 + 0.15 * Math.sin(t * 2 + b * 0.6);
        ctx.fillStyle = colCache[b];
        ctx.beginPath();
        for (const d of buckets[b]) {
          const mx = d.x - mouse.x, my = d.y - mouse.y, dist = Math.hypot(mx, my);
          if (dist < R && dist > 0.01) {
            const f = (R - dist) / R;
            d.vx += (mx / dist) * f * 3; d.vy += (my / dist) * f * 3;
          }
          d.vx += (d.hx - d.x) * 0.08; d.vy += (d.hy - d.y) * 0.08;
          d.vx *= 0.8; d.vy *= 0.8;
          d.x += d.vx; d.y += d.vy;
          ctx.moveTo(d.x + 1.9, d.y);
          ctx.arc(d.x, d.y, 1.9, 0, Math.PI * 2);
        }
        ctx.fill();
      }
    };

    const paint = () => {
      ctx.clearRect(0, 0, W, H);
      drawMotes();
      drawWave();
      drawText();
    };

    const frame = () => {
      if (visible) { paint(); t += 0.016; }
      raf = requestAnimationFrame(frame);
    };

    const start = () => {
      build();
      cancelAnimationFrame(raf);
      if (reduce) paint(); else frame();
    };

    (document.fonts?.ready ?? Promise.resolve()).then(start);

    const onMove = (e) => {
      const r = footer.getBoundingClientRect();
      mouse.x = e.clientX - r.left; mouse.y = e.clientY - r.top;
    };
    const onLeave = () => { mouse.x = mouse.y = -999; };
    footer.addEventListener("pointermove", onMove);
    footer.addEventListener("pointerleave", onLeave);

    const ro = new ResizeObserver(start);
    ro.observe(footer);
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting));
    io.observe(footer);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect(); io.disconnect();
      footer.removeEventListener("pointermove", onMove);
      footer.removeEventListener("pointerleave", onLeave);
    };
  }, []);

  /* ---------- scroll reveal (down = from below, up = from above) ---------- */
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray("[data-reveal]");
      gsap.set(items, { opacity: 0, y: 50 });
      const show = (dir) =>
        gsap.fromTo(items, { y: dir * 50, opacity: 0 },
          { y: 0, opacity: 1, duration: 0.9, ease: "power3.out", stagger: 0.1, overwrite: true });
      const hide = (dir) =>
        gsap.to(items, { y: -dir * 50, opacity: 0, duration: 0.4, ease: "power2.in", overwrite: true });

      ScrollTrigger.create({
        trigger: root.current,
        start: "top 85%",
        end: "bottom top",
        onEnter: () => show(1),
        onLeaveBack: () => hide(-1),
        onEnterBack: () => show(-1),
      });
    }, root);
    return () => ctx.revert();
  }, []);

  return (
    <footer className="site-footer" ref={root}>
      <div className="site-footer-glow" />
      <canvas className="site-footer-canvas" ref={canvasRef} aria-hidden="true" />
      <div className="site-footer-inner" ref={innerRef}>
        <div className="site-footer-top">
          <div className="site-footer-brand" data-reveal>
            <h3>Shivani Mourya</h3>
            <p className="site-footer-role">Full Stack Developer</p>
            <p className="site-footer-tag">Building • Learning • Creating • Contributing</p>
            <div className="site-footer-socials">
              {SOCIALS.map((s) => (
                <a key={s.label} href={s.href} target="_blank" rel="noreferrer" aria-label={s.label}>
                  <svg viewBox="0 0 24 24" fill="currentColor"><path d={s.path} /></svg>
                </a>
              ))}
            </div>
          </div>

          <div className="site-footer-cta" data-reveal>
            <h4>Let’s Build<br />Something Amazing</h4>
            <a className="site-footer-btn" href="#contact">
              Get In Touch <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <div className="site-footer-art" ref={bandRef} />

        <div className="site-footer-bar" data-reveal>
          <span>© {new Date().getFullYear()} Shivani Mourya. All rights reserved.</span>
          <button type="button" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
            <span aria-hidden="true">↑</span> Back to top
          </button>
        </div>
      </div>
    </footer>
  );
}
