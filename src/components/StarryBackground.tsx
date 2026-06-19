import { useEffect, useRef } from 'react';

interface Star {
  x: number;
  y: number;
  size: number;
  opacity: number;
  twinklePhase: number;
  twinkleSpeed: number;
  color: string;
  driftPhase: number;
}

export function StarryBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const rafRef = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }

    function initStars() {
      // Light mode only: subtle light blue twinkles
      const colors = ['#a8d0ff', '#7cc2fc', '#b9ddfd', '#d4e8ff', '#e0effe', '#a8d0ff', '#c0deff'];
      // Increased star density for more stars
      const count = Math.floor((canvas!.width * canvas!.height) / 5000);
      const stars: Star[] = [];
      for (let i = 0; i < count; i++) {
        stars.push({
          x: Math.random() * canvas!.width,
          y: Math.random() * canvas!.height,
          size: Math.random() * 2.2 + 0.4,
          opacity: Math.random() * 0.5 + 0.15,
          twinklePhase: Math.random() * Math.PI * 2,
          twinkleSpeed: Math.random() * 0.04 + 0.015, // faster twinkle
          color: colors[Math.floor(Math.random() * colors.length)],
          driftPhase: Math.random() * Math.PI * 2,
        });
      }
      starsRef.current = stars;
    }

    function animate() {
      if (!ctx || !canvas) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      starsRef.current.forEach((star) => {
        star.twinklePhase += star.twinkleSpeed;
        star.driftPhase += 0.0008;

        // Enhanced twinkle using sine with sharper peaks
        const twinkle = Math.sin(star.twinklePhase) * 0.5 + 0.5;
        const twinkleIntensity = Math.pow(twinkle, 0.7);
        const currentOpacity = star.opacity * (0.2 + twinkleIntensity * 0.8);

        const driftX = Math.sin(star.driftPhase) * 0.4;
        const driftY = Math.cos(star.driftPhase * 0.7) * 0.25;
        const drawX = star.x + driftX;
        const drawY = star.y + driftY;

        // Draw star as a soft glow dot
        ctx!.beginPath();
        ctx!.arc(drawX, drawY, star.size, 0, Math.PI * 2);
        ctx!.fillStyle = star.color;
        ctx!.globalAlpha = currentOpacity;
        ctx!.fill();

        // Soft glow halo - more prominent when twinkling bright
        if (star.size > 0.6) {
          const glowSize = star.size * (2.5 + twinkleIntensity * 3);
          ctx!.beginPath();
          ctx!.arc(drawX, drawY, glowSize, 0, Math.PI * 2);
          const gradient = ctx!.createRadialGradient(
            drawX, drawY, 0,
            drawX, drawY, glowSize
          );
          const glowAlpha = currentOpacity * 0.18 * twinkleIntensity;
          gradient.addColorStop(0, `rgba(168, 208, 255, ${glowAlpha})`);
          gradient.addColorStop(1, 'rgba(168, 208, 255, 0)');
          ctx!.fillStyle = gradient;
          ctx!.fill();
        }

        ctx!.globalAlpha = 1;
      });

      rafRef.current = requestAnimationFrame(animate);
    }

    resize();
    initStars();
    animate();

    const handleResize = () => {
      resize();
      initStars();
    };
    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.9 }}
    />
  );
}
