import { motion, HTMLMotionProps } from 'framer-motion'
import { cn } from '@/lib/utils'

type GlassCardVariant = 'glass' | 'gradient' | 'spotlight'

interface GlassCardProps extends Omit<HTMLMotionProps<'div'>, 'whileHover'> {
  variant?: GlassCardVariant
  hover?: boolean
  spotlight?: boolean
  children: React.ReactNode
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
}
