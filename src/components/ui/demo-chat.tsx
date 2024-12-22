'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Bot, User, Code } from 'lucide-react'

const demoMessages = [
  {
    role: 'user',
    content: 'Show me a modern button with hover effects'
  },
  {
    role: 'ai',
    content: "Here's a beautiful animated button component:",
    code: `const Button = ({ children }) => (
  <button className="relative group px-6 py-3">
    <div className="absolute inset-0 bg-gradient-to-r 
      from-blue-500 to-purple-500 rounded-lg 
      opacity-75 blur transition-all 
      group-hover:blur-xl" />
    <span className="relative text-white">
      {children}
    </span>
  </button>
);`
  },
  {
    role: 'user',
    content: "That's great! Now I'm curious about design principles. What makes a good user interface?"
  },
  {
    role: 'ai',
    content: "Good user interfaces follow key principles like clarity, consistency, and feedback. They should be intuitive and guide users naturally. Always ensure there's enough contrast, use whitespace effectively, and keep your design responsive. The most important thing is to put your users' needs first and make their interactions feel effortless."
  }
]

const TypewriterText = ({
  text,
  onComplete
}: {
  text: string
  onComplete?: () => void
}) => {
  const [displayedText, setDisplayedText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText(text.slice(0, currentIndex + 1))
        setCurrentIndex(prev => prev + 1)
      }, 30)
      return () => clearTimeout(timer)
    } else {
      onComplete?.()
    }
  }, [currentIndex, text, onComplete])

  return (
    <span>
      {displayedText}
      {currentIndex < text.length && (
        <span className='inline-block w-1 h-4 ml-1 bg-blue-400 animate-pulse' />
      )}
    </span>
  )
}

export const DemoChat = () => {
  const [visibleMessages, setVisibleMessages] = useState<typeof demoMessages>(
    []
  )
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTyping, setIsTyping] = useState(false)
  const chatContainerRef = useRef<HTMLDivElement>(null)

  // Auto-scroll effect
  useEffect(() => {
    if (chatContainerRef.current) {
      const scrollOptions: ScrollToOptions = {
        top: chatContainerRef.current.scrollHeight,
        behavior: 'smooth'
      }
      chatContainerRef.current.scrollTo(scrollOptions)
    }
  }, [visibleMessages, isTyping])

  useEffect(() => {
    if (currentIndex < demoMessages.length && !isTyping) {
      const timer = setTimeout(() => {
        setIsTyping(true)
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [currentIndex, isTyping])

  const handleTypingComplete = () => {
    setIsTyping(false)
    if (currentIndex < demoMessages.length) {
      setVisibleMessages(prev => [...prev, demoMessages[currentIndex]])
      setCurrentIndex(prev => prev + 1)
    } else {
      setTimeout(() => {
        setCurrentIndex(0)
        setVisibleMessages([])
        setIsTyping(false)
      }, 3000)
    }
  }

  return (
    <div
      ref={chatContainerRef}
      className='max-h-[600px] overflow-y-auto overflow-x-hidden scroll-smooth'
    >
      <AnimatePresence mode='popLayout'>
        {visibleMessages.map((message, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className={`flex gap-4 mb-6 ${
              message.role === 'user' ? 'justify-end' : ''
            }`}
          >
            <div
              className={`flex gap-4 max-w-[80%] ${
                message.role === 'user'
                  ? 'flex-row-reverse bg-blue-500/10 rounded-2xl p-4'
                  : 'bg-white/5 rounded-2xl p-4'
              }`}
            >
              <div className='flex-shrink-0'>
                {message.role === 'user' ? (
                  <div className='w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center'>
                    <User className='w-4 h-4 text-blue-400' />
                  </div>
                ) : (
                  <div className='w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center'>
                    <Bot className='w-4 h-4 text-purple-400' />
                  </div>
                )}
              </div>
              <div className={message.role === 'user' ? 'text-right' : ''}>
                <p className='text-sm text-gray-300'>{message.content}</p>
                {message.code && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.5 }}
                    className='mt-4 bg-black/40 rounded-lg p-4 border border-white/10'
                  >
                    <div className='flex items-center justify-between mb-2'>
                      <div className='flex items-center gap-2'>
                        <Code className='w-4 h-4 text-blue-400' />
                        <span className='text-xs text-gray-400'>
                          Code Example
                        </span>
                      </div>
                    </div>
                    <pre className='text-xs overflow-x-auto'>
                      <code className='text-blue-400'>{message.code}</code>
                    </pre>
                  </motion.div>
                )}
              </div>
            </div>
          </motion.div>
        ))}
        {isTyping && currentIndex < demoMessages.length && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className={`flex gap-4 mb-6 ${
              demoMessages[currentIndex].role === 'user' ? 'justify-end' : ''
            }`}
          >
            <div
              className={`flex gap-4 max-w-[80%] ${
                demoMessages[currentIndex].role === 'user'
                  ? 'flex-row-reverse bg-blue-500/10 rounded-2xl p-4'
                  : 'bg-white/5 rounded-2xl p-4'
              }`}
            >
              <div className='flex-shrink-0'>
                {demoMessages[currentIndex].role === 'user' ? (
                  <div className='w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center'>
                    <User className='w-4 h-4 text-blue-400' />
                  </div>
                ) : (
                  <div className='w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center'>
                    <Bot className='w-4 h-4 text-purple-400' />
                  </div>
                )}
              </div>
              <div
                className={
                  demoMessages[currentIndex].role === 'user' ? 'text-right' : ''
                }
              >
                <p className='text-sm text-gray-300'>
                  <TypewriterText
                    text={demoMessages[currentIndex].content}
                    onComplete={handleTypingComplete}
                  />
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  )
}
