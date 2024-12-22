'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Bot, User, Code, Copy, Download, Send } from 'lucide-react';
import { useAIChat } from '@/hooks/use-ai-chat';

export default function AIGenerator() {
  const [input, setInput] = useState('');
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const [currentResponse, setCurrentResponse] = useState('');

  const {
    messages,
    isGenerating,
    error,
    generateResponse,
    clearMessages,
  } = useAIChat({
    onChunkReceived: (chunk) => {
      setCurrentResponse(prev => prev + chunk);
    },
    onComplete: () => {
      setCurrentResponse('');
    },
    onError: (error) => {
      console.error('Error generating response:', error);
    },
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isGenerating) return;

    const userInput = input;
    setInput('');
    await generateResponse(userInput);
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages, currentResponse]);

  return (
    <div className="min-h-screen bg-black flex flex-col">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Bot className="w-6 h-6 text-blue-400" />
              <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-400 to-purple-400 text-transparent bg-clip-text">
                AI Code Generator
              </h1>
            </div>
            <button
              onClick={clearMessages}
              className="px-4 py-2 text-sm text-gray-400 hover:text-white transition-colors"
            >
              Clear Chat
            </button>
          </div>
        </div>
      </div>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto" ref={chatContainerRef}>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-4 ${message.role === 'user' ? 'justify-end' : ''}`}
                >
                  <div
                    className={`flex gap-4 max-w-[80%] ${
                      message.role === 'user'
                        ? 'flex-row-reverse bg-blue-500/10 rounded-2xl p-6'
                        : 'bg-white/5 rounded-2xl p-6'
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
                    <div className={message.role === 'user' ? 'text-right' : ''}>
                      <p className="text-gray-300 whitespace-pre-wrap">{message.content}</p>
                      {message.role === 'assistant' && message.content.includes('```') && (
                        <div className="mt-4 bg-black/40 rounded-lg p-4 border border-white/10">
                          <div className="flex items-center justify-between mb-2">
                            <div className="flex items-center gap-2">
                              <Code className="w-4 h-4 text-blue-400" />
                              <span className="text-sm text-gray-400">Generated Code</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <button 
                                onClick={() => navigator.clipboard.writeText(message.content)}
                                className="p-1 hover:bg-white/10 rounded"
                              >
                                <Copy className="w-4 h-4 text-gray-400" />
                              </button>
                              <button className="p-1 hover:bg-white/10 rounded">
                                <Download className="w-4 h-4 text-gray-400" />
                              </button>
                            </div>
                          </div>
                          <pre className="text-sm text-blue-400 overflow-x-auto">
                            <code>{message.content}</code>
                          </pre>
                        </div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
              {currentResponse && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-4"
                >
                  <div className="flex gap-4 max-w-[80%] bg-white/5 rounded-2xl p-6">
                    <div className="flex-shrink-0">
                      <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                        <Bot className="w-4 h-4 text-purple-400" />
                      </div>
                    </div>
                    <div className="text-gray-300 whitespace-pre-wrap">
                      {currentResponse}
                      <span className="inline-block w-2 h-4 bg-blue-400 ml-1 animate-pulse" />
                    </div>
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Input Form - Fixed at Bottom */}
      <div className="border-t border-white/10 bg-black/50 backdrop-blur-xl">
        <div className="container mx-auto px-4 py-4">
          <div className="max-w-4xl mx-auto">
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask me anything about UI development..."
                className="w-full bg-white/5 border border-white/10 rounded-xl pl-6 pr-12 py-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={isGenerating}
              />
              <button
                type="submit"
                className={`absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-lg transition-colors ${
                  isGenerating ? 'text-gray-500' : 'text-blue-400 hover:bg-white/10'
                }`}
                disabled={isGenerating}
              >
                <Send className="w-5 h-5" />
              </button>
            </form>
            {error && (
              <p className="mt-2 text-sm text-red-400">
                Error: {error}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
