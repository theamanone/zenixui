import { useState } from 'react'
import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

type AnimatedButtonVariant = 'primary' | 'secondary' | 'outline'
type AnimatedButtonSize = 'sm' | 'md' | 'lg'

interface AnimatedButtonProps extends Omit<HTMLMotionProps<'button'>, 'children' | 'size'> {
  children: React.ReactNode
  variant?: AnimatedButtonVariant
  size?: AnimatedButtonSize
  icon?: React.ReactNode
  loading?: boolean
  ripple?: boolean
}

const variants: Record<AnimatedButtonVariant, string> = {
  primary: 'bg-blue-500 hover:bg-blue-600 text-white',
  secondary: 'bg-purple-500 hover:bg-purple-600 text-white',
  outline: 'border border-white/20 hover:bg-white/10'
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
  loading = false,
  ripple = true,
  className = '',
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
}
