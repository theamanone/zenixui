'use client';

import { motion } from 'framer-motion';
import { AnimatedText } from '@/components/ui/animated-text';

export default function TemplatesPage() {
  return (
    <div className="relative min-h-screen bg-black">
      <div className="container mx-auto px-4 py-24">
        <AnimatedText 
          text="Ready-to-use Templates" 
          className="text-5xl font-bold text-white mb-8"
        />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {/* Add your template cards here */}
        </motion.div>
      </div>
    </div>
  );
}
