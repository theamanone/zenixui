'use client';

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

interface VectorFieldProps {
  density?: number;
  speed?: number;
  className?: string;
}

export function VectorField({ 
  density = 30,
  speed = 0.5,
  className = ''
}: VectorFieldProps): JSX.Element {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const vectorsRef = useRef<Array<{
    x: number;
    y: number;
    angle: number;
    speed: number;
    color: string;
  }>>([]);
  const animationRef = useRef<number>();
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const { innerWidth, innerHeight } = window;
      canvas.width = innerWidth;
      canvas.height = innerHeight;
    };

    const initVectors = () => {
      vectorsRef.current = [];
      const cols = Math.floor(canvas.width / density);
      const rows = Math.floor(canvas.height / density);

      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          vectorsRef.current.push({
            x: i * density + density / 2,
            y: j * density + density / 2,
            angle: Math.random() * Math.PI * 2,
            speed: Math.random() * speed + 0.1,
            color: `hsl(${Math.random() * 360}, 70%, 70%)`,
          });
        }
      }
    };

    const drawVector = (vector: {
      x: number;
      y: number;
      angle: number;
      speed: number;
      color: string;
    }) => {
      if (!ctx) return;

      const length = density * 0.3;
      const endX = vector.x + Math.cos(vector.angle) * length;
      const endY = vector.y + Math.sin(vector.angle) * length;

      // Add glow effect
      ctx.shadowBlur = 15;
      ctx.shadowColor = vector.color;
      
      ctx.beginPath();
      ctx.moveTo(vector.x, vector.y);
      ctx.lineTo(endX, endY);
      ctx.strokeStyle = vector.color;
      ctx.lineWidth = 1.5;
      ctx.stroke();

      // Reset shadow for arrowhead
      ctx.shadowBlur = 0;

      // Draw arrowhead with fade effect
      const headLength = length * 0.25;
      const angle = Math.atan2(endY - vector.y, endX - vector.x);
      
      ctx.beginPath();
      ctx.moveTo(endX, endY);
      ctx.lineTo(
        endX - headLength * Math.cos(angle - Math.PI / 6),
        endY - headLength * Math.sin(angle - Math.PI / 6)
      );
      ctx.lineTo(
        endX - headLength * Math.cos(angle + Math.PI / 6),
        endY - headLength * Math.sin(angle + Math.PI / 6)
      );
      
      // Convert HSL to RGBA for proper gradient
      const colorMatch = vector.color.match(/hsl\((\d+),\s*(\d+)%,\s*(\d+)%\)/);
      if (colorMatch) {
        const [_, h, s, l] = colorMatch.map(Number);
        ctx.fillStyle = vector.color;
      } else {
        // Fallback gradient
        const gradient = ctx.createLinearGradient(vector.x, vector.y, endX, endY);
        gradient.addColorStop(0, 'rgba(100, 100, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(100, 100, 255, 0.8)');
        ctx.fillStyle = gradient;
      }
      
      ctx.fill();
    };

    const animate = () => {
      if (!ctx || !canvas) return;

      timeRef.current += 0.01;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      vectorsRef.current.forEach((vector) => {
        vector.angle += Math.sin(timeRef.current + vector.x * 0.01) * 0.02;
        vector.color = `hsl(${(timeRef.current * 50 + vector.x * 0.1) % 360}, 70%, 70%)`;
        drawVector(vector);
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    const handleResize = () => {
      resizeCanvas();
      initVectors();
    };

    handleResize();
    animate();

    window.addEventListener('resize', handleResize);

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [density, speed]);

  return (
    <motion.canvas
      ref={canvasRef}
      className={`fixed inset-0 pointer-events-none ${className}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 0.15 }}
      transition={{ duration: 1 }}
    />
  );
}
