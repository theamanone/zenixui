import { ComponentType } from 'react'
import {
  AnimatedButtonPreview,
  GlassCardPreview,
  Floating3DCardPreview,
  BackgroundBeamsPreview
} from '@/components/ui/previews/component-previews'

// Core Types
export interface Component {
  id: string
  name: string
  description: string
  category: string
  preview: ComponentType
  code: string
}

export interface Section {
  title: string
  content: {
    title: string
    description?: string
    features?: string[]
    code?: string
  }
}

export interface Documentation {
  gettingStarted: {
    introduction: Section
    installation: Section
    quickStart: Section
  }
}

// Categories
export const categories = [
  'All',
  'Buttons',
  'Cards',
  '3D',
  'Forms',
  'Navigation',
  'Layout',
  'Typography',
  'Overlays',
  'Advanced',
  'Background'
]

// Components Data
export const components: Component[] = [
  {
    id: 'background-beams',
    name: 'Background Beams',
    description: 'Interactive background with exploding beams that follow cursor movement',
    category: 'Background',
    preview: BackgroundBeamsPreview,
    code: `export function BackgroundBeams({ children, className = '' }) {
  const beamRef = useRef(null)
  
  useEffect(() => {
    if (!beamRef.current) return

    const handleMouseMove = (e) => {
      const { clientX, clientY } = e
      const { left, top, width, height } = beamRef.current.getBoundingClientRect()
      
      const x = (clientX - left) / width
      const y = (clientY - top) / height

      beamRef.current.style.setProperty('--beam-x', \`\${x * 100}%\`)
      beamRef.current.style.setProperty('--beam-y', \`\${y * 100}%\`)
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div
      ref={beamRef}
      className={\`relative overflow-hidden bg-black \${className}\`}
      style={{
        '--beam-x': '50%',
        '--beam-y': '50%',
      }}
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
}`
  },
  {
    id: 'animated-button',
    name: 'Animated Button',
    description: 'A beautiful animated button with hover effects, loading state, and ripple animation',
    category: 'Buttons',
    preview: AnimatedButtonPreview,
    code: `import { useState } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

type AnimatedButtonVariant = 'primary' | 'secondary' | 'gradient'
type AnimatedButtonSize = 'sm' | 'md' | 'lg'

interface AnimatedButtonProps extends Omit<HTMLMotionProps<'button'>, 'size'> {
  variant?: AnimatedButtonVariant
  size?: AnimatedButtonSize
  icon?: React.ReactNode
  loading?: boolean
  ripple?: boolean
}

const variants: Record<AnimatedButtonVariant, string> = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white',
  secondary: 'border border-white/20 bg-white/5 hover:bg-white/10 text-white',
  gradient: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white'
}

const sizes: Record<AnimatedButtonSize, string> = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-4 py-2',
  lg: 'px-6 py-3 text-lg'
}

export function AnimatedButton({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  loading,
  ripple = true,
  className,
  onClick,
  ...props
}: AnimatedButtonProps) {
  const [rippleEffect, setRippleEffect] = useState({ x: 0, y: 0, show: false })

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (ripple) {
      const rect = e.currentTarget.getBoundingClientRect()
      setRippleEffect({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        show: true
      })
      setTimeout(() => setRippleEffect(prev => ({ ...prev, show: false })), 500)
    }
    onClick?.(e)
  }

  return (
    <motion.button
      whileTap={{ scale: 0.98 }}
      whileHover={{ scale: 1.02 }}
      className={cn(
        'relative overflow-hidden rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500/50',
        variants[variant],
        sizes[size],
        loading && 'opacity-70 cursor-not-allowed',
        className
      )}
      disabled={loading}
      onClick={handleClick}
      {...props}
    >
      <div className="flex items-center justify-center gap-2">
        {loading ? (
          <div className="animate-spin w-4 h-4 border-2 border-white/20 border-t-white rounded-full" />
        ) : (
          icon && <span className="text-lg">{icon}</span>
        )}
        {children}
      </div>
      {ripple && rippleEffect.show && (
        <motion.span
          initial={{ scale: 0, opacity: 0.5 }}
          animate={{ scale: 4, opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute bg-white/30 rounded-full w-4 h-4 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
          style={{ left: rippleEffect.x, top: rippleEffect.y }}
        />
      )}
    </motion.button>
  )
}`
  },
  {
    id: 'glass-card',
    name: 'Glass Card',
    description: 'A modern glass morphism card with hover effects and gradient backgrounds',
    category: 'Cards',
    preview: GlassCardPreview,
    code: `import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

type GlassCardVariant = 'glass' | 'gradient' | 'spotlight'

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'whileHover'> {
  variant?: GlassCardVariant
  hover?: boolean
  spotlight?: boolean
}

const variants: Record<GlassCardVariant, string> = {
  glass: 'border border-white/10 bg-white/5 backdrop-blur-lg hover:bg-white/10',
  gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/20 hover:border-purple-500/40',
  spotlight: 'bg-black/5 backdrop-blur-sm border border-white/10'
}

export function GlassCard({
  variant = 'glass',
  children,
  hover = true,
  spotlight = false,
  className,
  ...props
}: GlassCardProps) {
  return (
    <motion.div
      {...(hover && { whileHover: { y: -5, scale: 1.01 } })}
      className={cn(
        'relative p-6 rounded-xl transition-all duration-200',
        variants[variant],
        className
      )}
      {...props}
    >
      {spotlight && (
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl blur-xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl" />
        </div>
      )}
      {children}
    </motion.div>
  )
}`
  },
  {
    id: 'floating-3d-card',
    name: '3D Floating Card',
    description: 'An interactive 3D card that responds to mouse movement with realistic perspective',
    category: '3D',
    preview: Floating3DCardPreview,
    code: `import { motion, useMotionValue, useSpring, useTransform, HTMLMotionProps } from 'framer-motion'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Floating3DCardProps extends Omit<HTMLMotionProps<'div'>, 'style'> {
  backgroundImage?: string
  backgroundColor?: string
  direction?: 'left' | 'right'
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

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
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
}`
  }
]

// Documentation Structure
export const documentation: Documentation = {
  gettingStarted: {
    introduction: {
      title: 'Introduction',
      content: {
        title: 'Features',
        features: [
          'Modern and beautiful UI components',
          'Fully typed with TypeScript',
          'Accessible and keyboard navigable',
          'Customizable with Tailwind CSS',
          'Animations with Framer Motion',
          'Dark mode support',
          'Mobile responsive'
        ]
      }
    },
    installation: {
      title: 'Installation',
      content: {
        title: 'Getting Started',
        code: 'npm install @enhancer/ui framer-motion tailwindcss'
      }
    },
    quickStart: {
      title: 'Quick Start',
      content: {
        title: 'Using Components',
        description: 'Import and use components in your React application:',
        code: `import { AnimatedButton, GlassCard } from '@enhancer/ui'

export default function App() {
  return (
    <div>
      <AnimatedButton variant="gradient">
        Click me!
      </AnimatedButton>
      
      <GlassCard className="mt-4">
        <h2>Beautiful Card</h2>
        <p>With glass morphism effect</p>
      </GlassCard>
    </div>
  )
}`
      }
    }
  }
}

// Documentation Sections
export const sections: Documentation = {
  gettingStarted: {
    introduction: {
      title: 'Introduction',
      content: {
        title: 'Why Use Our Components?',
        features: [
          'Modern design with glass morphism effects',
          'Fully responsive and mobile-friendly',
          'Built with accessibility in mind',
          'Easy to customize and extend',
          'Dynamic component updates through admin interface'
        ]
      }
    },
    installation: {
      title: 'Installation',
      content: {
        title: 'Quick Start',
        description: 'Install the package using your preferred package manager:',
        code: 'npm install @enhancer/components'
      }
    },
    quickStart: {
      title: 'Quick Start',
      content: {
        title: 'Basic Usage',
        description: "Here's how to get started with our components:",
        code: `import { Button } from '@enhancer/components'

function App() {
  return (
    <Button variant="primary">
      Click me
    </Button>
  )
}`
      }
    }
  }
}

// Admin Interface Types
export interface ComponentUpdate {
  id: string
  updates: Partial<Omit<Component, 'id'>>
}

export interface AdminActions {
  addComponent: (component: Component) => void
  updateComponent: (update: ComponentUpdate) => void
  removeComponent: (id: string) => void
}