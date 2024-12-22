import { AnimatedButton } from '@/components/ui/buttons/animated-button'
import { GlassCard } from '@/components/ui/cards/glass-card'
import { Floating3DCard } from '@/components/ui/3d/floating-card'
import { BackgroundBeams } from '@/components/ui/backgrounds/background-beams'

export const AnimatedButtonPreview = () => (
  <div className="flex gap-4">
    <AnimatedButton variant="primary">
      Primary Button
    </AnimatedButton>
    <AnimatedButton variant="secondary">
      Secondary Button
    </AnimatedButton>
    <AnimatedButton variant="outline">
      Outline Button
    </AnimatedButton>
  </div>
)

export const GlassCardPreview = () => (
  <div className="p-4 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-xl">
    <GlassCard className="p-6">
      <h3 className="text-xl font-bold mb-2">Glass Card</h3>
      <p className="text-white/70">
        A beautiful frosted glass effect card component
      </p>
    </GlassCard>
  </div>
)

export const Floating3DCardPreview = () => (
  <div className="h-[300px] flex items-center justify-center">
    <Floating3DCard>
      <div className="p-8">
        <h3 className="text-xl font-bold mb-2">3D Card</h3>
        <p className="text-white/70">
          Interactive 3D floating card with realistic physics
        </p>
      </div>
    </Floating3DCard>
  </div>
)

export function BackgroundBeamsPreview() {
  return (
    <div className="w-full h-[400px] relative overflow-hidden rounded-lg">
      <BackgroundBeams className="absolute inset-0">
        <div className="relative h-full flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold text-white mb-4">What's cooler than Beams?</h1>
          <p className="text-xl text-white/70">Exploding linear beams</p>
        </div>
      </BackgroundBeams>
    </div>
  )
}
