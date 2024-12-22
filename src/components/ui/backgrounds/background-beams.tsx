'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

export interface BackgroundBeamsProps {
  children?: React.ReactNode
  className?: string
}

export function BackgroundBeams({ children, className = '' }: BackgroundBeamsProps) {
  const beamRef = useRef<HTMLDivElement>(null)
  
  useEffect(() => {
    if (!beamRef.current) return

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e
      const { left, top, width, height } = beamRef.current!.getBoundingClientRect()
      
      const x = (clientX - left) / width
      const y = (clientY - top) / height

      beamRef.current!.style.setProperty('--beam-x', `${x * 100}%`)
      beamRef.current!.style.setProperty('--beam-y', `${y * 100}%`)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={beamRef}
      className={`relative min-h-screen overflow-hidden bg-black ${className}`}
      style={{
        '--beam-x': '50%',
        '--beam-y': '50%',
      } as React.CSSProperties}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="absolute inset-0"
      >
        <div
          className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 opacity-20"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
            transform: 'translate(var(--beam-x), var(--beam-y)) scale(2)',
            filter: 'blur(50px)',
          }}
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-pink-500 to-purple-500 opacity-20"
          style={{
            clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0% 100%)',
            transform: 'translate(calc(var(--beam-x) * -1), calc(var(--beam-y) * -1)) scale(2)',
            filter: 'blur(50px)',
          }}
        />
      </motion.div>
      {children}
    </div>
  )
}
