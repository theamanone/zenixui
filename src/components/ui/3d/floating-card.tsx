import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Floating3DCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  backgroundImage?: string
  backgroundColor?: string
  direction?: 'left' | 'right'
  className?: string
}

export function Floating3DCard({
  children,
  backgroundImage,
  backgroundColor = 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
  direction = 'right',
  className,
  ...props
}: Floating3DCardProps) {
  const [hovering, setHovering] = useState(false)
  
  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseXSpring = useSpring(x)
  const mouseYSpring = useSpring(y)

  const rotateX = useTransform(
    mouseYSpring,
    [-0.5, 0.5],
    ['17.5deg', '-17.5deg']
  )
  const rotateY = useTransform(
    mouseXSpring,
    [-0.5, 0.5],
    ['-17.5deg', '17.5deg']
  )

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const width = rect.width
    const height = rect.height
    const mouseX = e.clientX - rect.left
    const mouseY = e.clientY - rect.top
    const xPct = mouseX / width - 0.5
    const yPct = mouseY / height - 0.5
    x.set(xPct)
    y.set(yPct)
  }

  return (
    <motion.div
      onMouseMove={handleMouseMove}
      onHoverStart={() => setHovering(true)}
      onHoverEnd={() => {
        setHovering(false)
        x.set(0)
        y.set(0)
      }}
      style={{
        rotateY: direction === 'left' ? rotateY : rotateX,
        rotateX: direction === 'left' ? rotateX : rotateY,
        transformStyle: 'preserve-3d',
      }}
      className={cn(
        'relative rounded-xl transition-all duration-200 ease-linear',
        className
      )}
      {...props}
    >
      <div
        style={{
          transform: 'translateZ(75px)',
          transformStyle: 'preserve-3d',
        }}
        className={cn(
          'relative h-96 w-72 rounded-xl p-8 shadow-lg',
          backgroundImage ? 'bg-cover bg-center' : backgroundColor,
          { 'shadow-2xl': hovering }
        )}
      >
        {backgroundImage && (
          <img
            src={backgroundImage}
            alt="Card background"
            className="absolute inset-0 h-full w-full rounded-xl object-cover"
          />
        )}
        <div className="relative" style={{ transform: 'translateZ(75px)' }}>
          {children}
        </div>
      </div>
    </motion.div>
  )
}
