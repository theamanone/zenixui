'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Check, Copy, Terminal } from 'lucide-react';
import Prism from 'prismjs';
import 'prismjs/themes/prism-tomorrow.css';
import 'prismjs/components/prism-typescript';
import 'prismjs/components/prism-jsx';
import 'prismjs/components/prism-tsx';

interface CodePreviewProps {
  code: string;
  language?: string;
  showLineNumbers?: boolean;
}

export function CodePreview({ 
  code, 
  language = 'tsx',
  showLineNumbers = true 
}: CodePreviewProps) {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const highlightedCode = Prism.highlight(
    code,
    Prism.languages[language] || Prism.languages.typescript,
    language
  );

  return (
    <motion.div 
      className="relative group rounded-lg overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
    >
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800/50 border-b border-gray-700">
        <div className="flex items-center space-x-2">
          <Terminal size={16} className="text-gray-400" />
          <span className="text-sm text-gray-400">{language.toUpperCase()}</span>
        </div>
        <button
          onClick={handleCopy}
          className="p-2 rounded-md hover:bg-gray-700/50 transition-colors"
        >
          <AnimatePresence mode="wait" initial={false}>
            {isCopied ? (
              <motion.div
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Check size={16} className="text-green-500" />
              </motion.div>
            ) : (
              <motion.div
                key="copy"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
              >
                <Copy size={16} className="text-gray-400" />
              </motion.div>
            )}
          </AnimatePresence>
        </button>
      </div>
      
      <div className="p-4 bg-gray-900 overflow-x-auto">
        <pre className={`relative ${showLineNumbers ? 'line-numbers' : ''}`}>
          <code 
            className={`language-${language}`}
            dangerouslySetInnerHTML={{ __html: highlightedCode }}
          />
        </pre>
      </div>

      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
    </motion.div>
  );
}
