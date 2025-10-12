import { useEffect, useRef } from 'react';

interface BackgroundAnimationProps {
  enabled: boolean;
}

export function BackgroundAnimation({ enabled }: BackgroundAnimationProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const numbers: Array<{
      x: number;
      y: number;
      speed: number;
      value: string;
      opacity: number;
    }> = [];

    // Create falling numbers
    for (let i = 0; i < 30; i++) {
      numbers.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        speed: 0.5 + Math.random() * 1.5,
        value: Math.random() > 0.5 ? '0' : '1',
        opacity: 0.1 + Math.random() * 0.2,
      });
    }

    let animationId: number;

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      numbers.forEach((num) => {
        ctx.fillStyle = `rgba(100, 116, 139, ${num.opacity})`;
        ctx.font = '14px monospace';
        ctx.fillText(num.value, num.x, num.y);

        num.y += num.speed;

        if (num.y > canvas.height) {
          num.y = -20;
          num.x = Math.random() * canvas.width;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    window.addEventListener('resize', handleResize);

    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener('resize', handleResize);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ opacity: 0.3 }}
    />
  );
}
