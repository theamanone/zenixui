'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';

export const CommandMenu = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      className="fixed top-5 left-1/2 -translate-x-1/2 w-full max-w-lg z-50"
      initial={false}
    >
      <motion.div
        className="mx-4 rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl shadow-2xl"
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
      >
        <div className="p-4">
          <div className="flex items-center gap-2 text-sm text-gray-400">
            <kbd className="px-2 py-1 rounded bg-white/10">⌘</kbd>
            <span>+</span>
            <kbd className="px-2 py-1 rounded bg-white/10">K</kbd>
            <span className="ml-2">to open command menu</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};
