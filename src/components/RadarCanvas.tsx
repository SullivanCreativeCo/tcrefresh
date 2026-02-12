import { useEffect, useRef } from "react";

interface Blip {
  angle: number;
  radius: number;
  speed: number;
  risk: number;
  phase: number;
}

const RadarCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let angle = 0;
    let frameId: number;
    const dpr = window.devicePixelRatio || 1;

    const blips: Blip[] = Array.from({ length: 14 }, () => ({
      angle: Math.random() * Math.PI * 2,
      radius: 0.2 + Math.random() * 0.35,
      speed: 0.001 + Math.random() * 0.003,
      risk: Math.random(),
      phase: Math.random() * Math.PI * 2,
    }));

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      if (!rect) return;
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener("resize", resize);

    const draw = () => {
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      const cx = w / 2;
      const cy = h / 2;
      const maxR = Math.min(cx, cy) * 0.85;

      ctx.clearRect(0, 0, w, h);

      // Concentric rings
      for (let i = 1; i <= 4; i++) {
        ctx.beginPath();
        ctx.arc(cx, cy, maxR * (i / 4), 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(34, 211, 238, ${0.05 + i * 0.02})`;
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Radial lines
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(cx + Math.cos(a) * maxR, cy + Math.sin(a) * maxR);
        ctx.strokeStyle = "rgba(34, 211, 238, 0.05)";
        ctx.lineWidth = 1;
        ctx.stroke();
      }

      // Sweep gradient
      const grad = ctx.createConicGradient(angle, cx, cy);
      grad.addColorStop(0, "rgba(34, 211, 238, 0.12)");
      grad.addColorStop(0.07, "rgba(34, 211, 238, 0.03)");
      grad.addColorStop(0.12, "rgba(34, 211, 238, 0)");
      grad.addColorStop(1, "rgba(34, 211, 238, 0)");
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, maxR, angle, angle + Math.PI * 2);
      ctx.fillStyle = grad;
      ctx.fill();

      // Sweep line
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.lineTo(cx + Math.cos(angle) * maxR, cy + Math.sin(angle) * maxR);
      ctx.strokeStyle = "rgba(34, 211, 238, 0.35)";
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Blips
      const time = Date.now() / 1000;
      blips.forEach((b) => {
        b.angle += b.speed;
        const pulse = 1 + Math.sin(time * 2 + b.phase) * 0.3;
        const bx = cx + Math.cos(b.angle) * b.radius * maxR;
        const by = cy + Math.sin(b.angle) * b.radius * maxR;
        const [r, g, bl] =
          b.risk > 0.7
            ? [248, 113, 113]
            : b.risk > 0.4
            ? [251, 191, 36]
            : [34, 211, 238];

        // Glow
        ctx.beginPath();
        ctx.arc(bx, by, 4 * pulse * 4, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${bl}, 0.07)`;
        ctx.fill();

        // Dot
        ctx.beginPath();
        ctx.arc(bx, by, 3 * pulse, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${bl}, 0.8)`;
        ctx.fill();
      });

      // Center dot
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(34, 211, 238, 0.5)";
      ctx.fill();

      angle += 0.01;
      frameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <div className="relative w-full aspect-square max-w-lg mx-auto">
      <div className="absolute inset-0 bg-cyan-500/[0.04] blur-2xl rounded-full" />
      <canvas ref={canvasRef} className="relative w-full h-full" />
    </div>
  );
};

export default RadarCanvas;
