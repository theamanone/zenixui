'use client';

import { useEffect, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';

export const ScrollAnimation = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll();

  const springConfig = { stiffness: 70, damping: 20, restDelta: 0.001 };
  const smoothProgress = useSpring(scrollYProgress, springConfig);

  return (
    <div ref={containerRef} className="fixed inset-0 pointer-events-none z-0">
      <div className="absolute inset-0 bg-gradient-to-b from-[#0a0826]/20 via-[#1a1744]/10 to-[#0a0826]/20" />
      
      {/* Left side line container */}
      <div className="absolute left-8 inset-y-0 w-[2px]">
        {/* Background line */}
        <div className="absolute inset-0 w-full bg-gradient-to-b from-transparent via-[#1a1744]/30 to-transparent" />
        
        {/* Animated progress line */}
        <motion.div
          className="absolute inset-0 w-full"
          style={{
            background: 'linear-gradient(to bottom, #4338ca, #6366f1)',
            scaleY: smoothProgress,
            transformOrigin: 'top',
            filter: 'brightness(1.2)',
          }}
        />

        {/* Lightning effect on scroll */}
        <motion.div
          className="absolute inset-0 w-full"
          style={{
            background: 'linear-gradient(to bottom, #4338ca, #6366f1)',
            scaleY: smoothProgress,
            transformOrigin: 'top',
            filter: 'blur(4px) brightness(1.5)',
            opacity: useTransform(smoothProgress, [0, 0.2, 0.8, 1], [0, 0.7, 0.7, 0]),
          }}
        />

        {/* Glowing orb */}
        <motion.div
          className="absolute left-0 w-4 h-4 -ml-[6px]"
          style={{
            top: useTransform(smoothProgress, [0, 1], ['0%', '100%']),
            background: 'linear-gradient(to right, #4338ca, #6366f1)',
            borderRadius: '50%',
            filter: 'blur(6px)',
            opacity: useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]),
          }}
        />

        {/* Sharp center of the orb */}
        <motion.div
          className="absolute left-0 w-2 h-2 -ml-[4px]"
          style={{
            top: useTransform(smoothProgress, [0, 1], ['0%', '100%']),
            background: '#fff',
            borderRadius: '50%',
            opacity: useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 0.8, 0.8, 0]),
          }}
        />

        {/* Pulsing effect around the orb */}
        <motion.div
          className="absolute left-0 w-8 h-8 -ml-[14px]"
          style={{
            top: useTransform(smoothProgress, [0, 1], ['0%', '100%']),
            background: 'radial-gradient(circle, rgba(99,102,241,0.3) 0%, transparent 70%)',
            borderRadius: '50%',
            opacity: useTransform(smoothProgress, [0, 0.1, 0.9, 1], [0, 0.5, 0.5, 0]),
            scale: useTransform(smoothProgress, value => 1 + Math.sin(value * Math.PI * 2) * 0.2),
          }}
        />
      </div>
    </div>
  );
};
