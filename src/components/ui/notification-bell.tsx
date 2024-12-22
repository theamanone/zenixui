'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { Bell } from 'lucide-react';

export const NotificationBell = () => {
  const [isActive, setIsActive] = useState(false);
  
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={() => setIsActive(!isActive)}
      className="relative p-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors"
    >
      <Bell className="w-5 h-5" />
      {isActive && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
        />
      )}
    </motion.button>
  );
};
