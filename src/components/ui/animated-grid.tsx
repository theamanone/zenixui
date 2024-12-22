'use client';

import { useEffect, useRef } from 'react';

export const AnimatedGrid = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const gridSize = 30;
    const lines: { x: number; y: number; angle: number; speed: number; color: string }[] = [];

    // Create initial lines
    for (let x = 0; x < canvas.width; x += gridSize) {
      for (let y = 0; y < canvas.height; y += gridSize) {
        lines.push({
          x,
          y,
          angle: Math.random() * Math.PI * 2,
          speed: 0.2 + Math.random() * 0.3,
          color: `hsla(${Math.random() * 360}, 70%, 70%, 0.1)`
        });
      }
    }

    let frame = 0;
    const animate = () => {
      frame++;
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      lines.forEach((line, i) => {
        const length = gridSize * 0.8;
        const x2 = line.x + Math.cos(line.angle) * length;
        const y2 = line.y + Math.sin(line.angle) * length;

        ctx.beginPath();
        ctx.moveTo(line.x, line.y);
        ctx.lineTo(x2, y2);
        ctx.strokeStyle = line.color;
        ctx.lineWidth = 2;
        ctx.stroke();

        // Update line angle
        line.angle += line.speed * 0.02;

        // Add wave effect
        line.y += Math.sin(frame * 0.02 + i * 0.1) * 0.5;
      });

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 h-full w-full bg-black opacity-50"
    />
  );
};
