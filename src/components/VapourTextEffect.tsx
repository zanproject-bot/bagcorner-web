import { useEffect, useRef } from "react";

interface VapourTextEffectProps {
  text: string;
  className?: string;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  decay: number;
  originalX: number;
  originalY: number;
  drift: number;
  life: number;
  maxLife: number;
}

export function VapourTextEffect({ text, className = "" }: VapourTextEffectProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationId: number;
    let particles: Particle[] = [];
    let textImageData: ImageData | null = null;
    let width = 0;
    let height = 0;
    let time = 0;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio, 2);
      width = Math.max(1, rect.width);
      height = Math.max(1, rect.height);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      textImageData = null;
      particles = [];
    };

    const captureTextPixels = () => {
      ctx.clearRect(0, 0, width, height);

      // Draw the text
      const fontSize = Math.min(width * 0.18, 120);
      const lineHeight = fontSize * 1.1;
      const lines = text.split("\n");
      const totalHeight = lines.length * lineHeight;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `600 ${fontSize}px "Space Grotesk", ui-sans-serif, system-ui, sans-serif`;

      // Draw gradient text
      const grad = ctx.createLinearGradient(0, 0, width, 0);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(0.25, "#fde6d4");
      grad.addColorStop(0.5, "#e07a3c");
      grad.addColorStop(0.7, "#f5b88a");
      grad.addColorStop(1, "#ffffff");
      ctx.fillStyle = grad;

      const startY = height / 2 - totalHeight / 2 + lineHeight / 2;
      lines.forEach((line, i) => {
        ctx.fillText(line, width / 2, startY + i * lineHeight);
      });

      // Capture pixel data
      const imageData = ctx.getImageData(0, 0, width, height);
      textImageData = imageData;

      // Create particles from text pixels
      particles = [];
      const pixelStep = 3;
      const data = imageData.data;

      for (let y = 0; y < height; y += pixelStep) {
        for (let x = 0; x < width; x += pixelStep) {
          const idx = (y * width + x) * 4;
          const alpha = data[idx + 3];
          if (alpha > 128) {
            particles.push({
              x,
              y,
              vx: 0,
              vy: 0,
              size: 1.5 + Math.random() * 2.5,
              alpha: 0.9 + Math.random() * 0.1,
              decay: 0.003 + Math.random() * 0.008,
              originalX: x,
              originalY: y,
              drift: (Math.random() - 0.5) * 0.5,
              life: Math.random(),
              maxLife: 0.5 + Math.random() * 0.5,
            });
          }
        }
      }
    };

    const animate = () => {
      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      if (!textImageData || particles.length === 0) {
        if (!textImageData) {
          captureTextPixels();
        }
        animationId = requestAnimationFrame(animate);
        return;
      }

      // Breathing glow
      const breathe = Math.sin(time * 0.5) * 0.3 + 0.7;

      // Update and draw vapour particles
      for (const p of particles) {
        p.life += 0.005;

        // Gentle upward drift with horizontal sway
        p.vy -= 0.02;
        p.vx += p.drift * 0.03;
        p.vx *= 0.98;
        p.x += p.vx;
        p.y += p.vy;

        // Fade based on life and vertical distance
        const distanceRatio = Math.abs(p.y - p.originalY) / (height * 0.4);
        const lifeRatio = Math.max(0, 1 - p.life / p.maxLife);
        const heightFade = Math.max(0, 1 - distanceRatio);
        const fadeAlpha = Math.pow(lifeRatio * heightFade, 0.8);

        p.alpha = Math.max(0, fadeAlpha * (breathe * 0.3 + 0.7));

        if (p.alpha > 0.01) {
          ctx.globalAlpha = p.alpha;
          ctx.fillStyle = "rgb(224, 122, 60)";
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size * fadeAlpha, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Draw subtle glowing base text
      const fontSize = Math.min(width * 0.18, 120);
      const lineHeight = fontSize * 1.1;
      const lines = text.split("\n");
      const totalHeight = lines.length * lineHeight;

      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `600 ${fontSize}px "Space Grotesk", ui-sans-serif, system-ui, sans-serif`;
      ctx.shadowColor = "rgba(224, 122, 60, 0.15)";
      ctx.shadowBlur = 30;

      const startY = height / 2 - totalHeight / 2 + lineHeight / 2;
      lines.forEach((line, i) => {
        ctx.globalAlpha = 0.15 + breathe * 0.2;
        const grad = ctx.createLinearGradient(0, 0, width, 0);
        grad.addColorStop(0, "#ffffff");
        grad.addColorStop(0.25, "#fde6d4");
        grad.addColorStop(0.5, "#e07a3c");
        grad.addColorStop(0.7, "#f5b88a");
        grad.addColorStop(1, "#ffffff");
        ctx.fillStyle = grad;
        ctx.fillText(line, width / 2, startY + i * lineHeight);
      });

      ctx.shadowBlur = 0;
      ctx.globalAlpha = 1;

      animationId = requestAnimationFrame(animate);
    };

    resize();
    animate();

    const ro = new ResizeObserver(resize);
    ro.observe(container);

    return () => {
      cancelAnimationFrame(animationId);
      ro.disconnect();
    };
  }, [text]);

  return (
    <div
      ref={containerRef}
      className={`relative inline-block ${className}`}
      style={{ minWidth: "30px", minHeight: "20px" }}
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ pointerEvents: "none", minWidth: "30px", minHeight: "20px" }}
      />
      <h1 className="sr-only">{text}</h1>
    </div>
  );
}
