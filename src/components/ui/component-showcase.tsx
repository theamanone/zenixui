'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Zap, Palette, Globe } from 'lucide-react';
import { Button } from './button';
import { ThemeToggle } from './theme-toggle';
import { NotificationBell } from './notification-bell';
import { MobileMenu } from './mobile-menu';

const components = [
  {
    name: "Buttons",
    icon: <Zap className="w-5 h-5" />,
    demo: (
      <div className="flex gap-4">
        <Button variant="default">Default</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="ghost">Ghost</Button>
      </div>
    )
  },
  {
    name: "Cards",
    icon: <Palette className="w-5 h-5" />,
    demo: (
      <motion.div 
        className="p-6 rounded-xl border border-white/10 bg-black/40 backdrop-blur-xl"
        whileHover={{ scale: 1.02 }}
      >
        <h3 className="text-lg font-semibold mb-2">Interactive Card</h3>
        <p className="text-sm text-gray-400">Hover to see the animation</p>
      </motion.div>
    )
  },
  {
    name: "Navigation",
    icon: <Globe className="w-5 h-5" />,
    demo: (
      <div className="flex items-center gap-4 p-4 rounded-lg bg-black/40 backdrop-blur-xl">
        <ThemeToggle />
        <NotificationBell />
        <MobileMenu />
      </div>
    )
  }
];

export const ComponentShowcase = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % components.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <motion.div
        className="grid grid-cols-1 gap-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={activeIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center gap-8 p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl"
          >
            <div className="flex items-center gap-2">
              {components[activeIndex].icon}
              <h3 className="text-xl font-semibold">{components[activeIndex].name}</h3>
            </div>
            {components[activeIndex].demo}
          </motion.div>
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
