'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Menu, X } from 'lucide-react';

export const MobileMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <div className="relative">
      <motion.button
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className="p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
      >
        {isOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </motion.button>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute top-full mt-2 w-48 py-2 bg-gray-800 rounded-lg"
        >
          {['Home', 'About', 'Contact'].map((item) => (
            <button key={item} className="block w-full px-4 py-2 text-left hover:bg-gray-700 transition-colors">
              {item}
            </button>
          ))}
        </motion.div>
      )}
    </div>
  );
};
