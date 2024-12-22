'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';

const words = ['Modern', 'Beautiful', 'Fast'];

export const HeroText = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-5xl sm:text-6xl font-bold flex flex-col gap-2">
        <span>Build</span>
        <div className="h-[60px] sm:h-[72px] relative overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={words[index]}
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -50, opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 text-transparent bg-clip-text"
            >
              {words[index]}
            </motion.span>
          </AnimatePresence>
        </div>
        <span>Web Apps</span>
      </h1>
      {/* <p className="text-gray-400 max-w-lg">
        Create stunning web applications with our next-generation UI components and AI-powered development tools.
      </p> */}
    </div>
  );
};
