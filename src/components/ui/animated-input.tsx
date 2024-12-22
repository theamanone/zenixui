'use client';

import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const placeholderTexts = [
  'Create a landing page with a hero section...',
  'Build a responsive navigation menu...',
  'Design an animated button component...',
  'Implement a dark mode toggle...',
];

export function AnimatedInput() {
  const [currentText, setCurrentText] = useState('');
  const [currentPlaceholder, setCurrentPlaceholder] = useState(0);
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    let timeout: NodeJS.Timeout;
    let currentIndex = 0;
    let isDeleting = false;
    let typingSpeed = 100;

    const typeText = () => {
      const targetText = placeholderTexts[currentPlaceholder];

      if (!isDeleting) {
        if (currentIndex < targetText.length) {
          setCurrentText(prev => prev + targetText[currentIndex]);
          currentIndex++;
          typingSpeed = 100;
        } else {
          isDeleting = true;
          typingSpeed = 2000; // Pause before deleting
        }
      } else {
        if (currentIndex > 0) {
          setCurrentText(prev => prev.slice(0, -1));
          currentIndex--;
          typingSpeed = 50;
        } else {
          isDeleting = false;
          setCurrentPlaceholder((prev) => (prev + 1) % placeholderTexts.length);
          currentIndex = 0;
          typingSpeed = 500; // Pause before next text
        }
      }

      timeout = setTimeout(typeText, typingSpeed);
    };

    timeout = setTimeout(typeText, typingSpeed);
    return () => clearTimeout(timeout);
  }, [currentPlaceholder]);

  return (
    <div className="relative w-full">
      <div className="relative rounded-lg bg-white/5 backdrop-blur-sm border border-white/10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-blue-500/10 animate-gradient" />
        <div className="relative px-4 py-3">
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="inline-block text-gray-400"
          >
            {currentText}
            <motion.span
              animate={{ opacity: [1, 0] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatType: 'reverse' }}
              className="inline-block w-0.5 h-5 bg-blue-400 ml-1 align-middle"
            />
          </motion.span>
        </div>
      </div>
    </div>
  );
}
