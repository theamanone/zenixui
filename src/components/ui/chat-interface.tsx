'use client';

import { motion } from 'framer-motion';
import { Bot, User } from 'lucide-react';
import { Typewriter } from './typewriter';

const messages = [
  {
    role: 'ai',
    content: 'Design beautiful interfaces with our AI-powered tools.',
  },
  {
    role: 'user',
    content: 'Show me some modern components.',
  },
  {
    role: 'ai',
    content: 'Here are some examples of our modern UI components...',
  },
];

export const ChatInterface = () => {
  return (
    <div className="w-full max-w-4xl mx-auto bg-black/20 backdrop-blur-xl rounded-xl border border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/10 flex items-center gap-2">
        <Bot className="w-5 h-5 text-blue-400" />
        <span className="font-medium">AI Assistant</span>
      </div>
      <div className="p-4 space-y-4">
        {messages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.2 }}
            className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}
          >
            <div
              className={`flex gap-3 max-w-[80%] ${
                message.role === 'user'
                  ? 'flex-row-reverse bg-blue-500/10 rounded-2xl p-4'
                  : 'bg-white/5 rounded-2xl p-4'
              }`}
            >
              <div className="flex-shrink-0">
                {message.role === 'user' ? (
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <User className="w-4 h-4 text-blue-400" />
                  </div>
                ) : (
                  <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-purple-400" />
                  </div>
                )}
              </div>
              <div className={`flex-1 ${message.role === 'user' ? 'text-right' : ''}`}>
                {index === messages.length - 1 ? (
                  <Typewriter text={message.content} className="text-sm text-gray-300" />
                ) : (
                  <span className="text-sm text-gray-300">{message.content}</span>
                )}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
