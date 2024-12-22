'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Code, ArrowRight, Sun, Moon } from 'lucide-react'
import { HeroText } from '@/components/ui/hero-text'
import { HeroBackground } from '@/components/ui/hero-background'
import { FeatureCard } from '@/components/ui/feature-card'
import { DemoChat } from '@/components/ui/demo-chat'
import { ComponentGrid } from '@/components/ui/component-grid'
import { ScrollAnimation } from '@/components/ui/scroll-animation'
import { AnimatedInput } from '@/components/ui/animated-input'
import { useTheme } from '@/components/theme-provider'
import { siteConfig } from '@/config/site'

const features = [
  {
    title: 'Modern Design System',
    description: 'Built with the latest design principles and trends in mind.',
    icon: Code
  },
  {
    title: 'Lightning Fast',
    description: 'Optimized for performance with zero-config deployments',
    icon: Code
  },
  {
    title: 'Beautiful Design',
    description: 'Modern, clean interfaces that users will love',
    icon: Code
  },
  {
    title: 'Responsive',
    description: 'Perfect on all devices, from mobile to desktop',
    icon: Code
  },
  {
    title: 'Components',
    description: 'Pre-built components for rapid development',
    icon: Code
  },
  {
    title: 'Animations',
    description: 'Smooth animations and transitions built-in',
    icon: Code
  },
  {
    title: 'AI Powered',
    description: 'Intelligent components that adapt to user needs',
    icon: Code
  }
];

export default function Home() {
  const { theme } = useTheme()

  return (
    <div className="relative w-full">
      <HeroBackground />
        {/* </div> */}

        {/* Hero Section */}
        <section className="relative min-h-screen pt-32 pb-20">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div className="text-center lg:text-left">
            <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${
                    theme === 'dark'
                      ? 'bg-[#2d2b70] text-[#8b5cf6]'
                      : 'bg-white text-gray-900'
                  } mb-8`}
                >
                  <Code className='w-4 h-4' />
                  <span>The Future of UI Development</span>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                  className={`text-7xl font-bold mb-8 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}
                >
                  <HeroText />
                </motion.div>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.4 }}
                  className={theme === 'dark' ? 'text-xl text-[#8b5cf6] mb-12' : 'text-xl text-gray-600 mb-12'}
                >
                  Create stunning web applications with our next-generation UI
                  components and AI-powered development tools.
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.6 }}
                  className='flex flex-wrap items-center gap-4 justify-center lg:justify-start'
                >
                  <Link
                    href='/docs'
                    className={`group px-8 py-4 rounded-xl font-medium transition-all duration-200 flex items-center gap-2 ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:opacity-90'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    Get Started
                    <ArrowRight className='w-4 h-4 group-hover:translate-x-1 transition-transform' />
                  </Link>

                  <Link
                    href='/components'
                    className={`px-8 py-4 rounded-xl font-medium transition-all duration-200 ${
                      theme === 'dark'
                        ? 'bg-[#2d2b70] hover:bg-[#373860] text-white border border-[#6366f1]/20'
                        : 'bg-white hover:bg-gray-50 text-gray-900 border border-gray-200'
                    }`}
                  >
                    Browse Components
                  </Link>
                </motion.div>
              </div>

              {/* Preview UI */}
              <div className='relative hidden lg:block'>
                <div className={`absolute inset-0 rounded-3xl blur-3xl ${
                  theme === 'dark'
                    ? 'bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/20'
                    : 'bg-gradient-to-r from-gray-200/50 to-gray-300/50'
                }`} />
                <motion.div
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 }}
                  className={`relative rounded-3xl border overflow-hidden ${
                    theme === 'dark'
                      ? 'bg-[#0c0a3e]/80 backdrop-blur-xl border-[#2d2b70]'
                      : 'bg-white/80 backdrop-blur-xl border-gray-200'
                  }`}
                >
                  <div className={`flex items-center gap-2 px-4 h-12 border-b ${
                    theme === 'dark' ? 'border-[#2d2b70]' : 'border-gray-200'
                  }`}>
                    <div className='flex gap-2'>
                      <div className='w-3 h-3 rounded-full bg-red-500/50' />
                      <div className='w-3 h-3 rounded-full bg-yellow-500/50' />
                      <div className='w-3 h-3 rounded-full bg-green-500/50' />
                    </div>
                  </div>
                  <div className='p-6'>
                    <DemoChat />
                  </div>
            </motion.div>
          </div>
        </div>

            {/* Component Grid */}
            <div className='mt-32'>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className='text-center mb-12'
              >
                <h2 className={`text-3xl font-bold mb-4 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}>
                  Explore Our Components
                </h2>
                <p className={theme === 'dark' ? 'text-[#8b5cf6]' : 'text-gray-600'}>
                  Beautiful, responsive, and customizable components for your
                  next project
                </p>
              </motion.div>

              <ComponentGrid />
            </div>
        </div>
      </section>

        {/* Features Section */}
        <section className='relative py-32'>
          <div className='container mx-auto px-4'>
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className='text-center mb-16'
            >
              <h2 className={`text-4xl font-bold mb-4 ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}>
                Everything You Need
                </h2>
              <p className={theme === 'dark' ? 'text-xl text-[#8b5cf6]' : 'text-xl text-gray-600'}>
                A complete toolkit for modern web development
                </p>
            </motion.div>

            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8'>
              {features.map((feature, index) => (
                <FeatureCard
                  key={feature.title}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  delay={index * 0.1}
                />
              ))}
            </div>
        </div>
      </section>

        {/* CTA Section */}
        <section className='relative py-32'>
          <div className='container mx-auto px-4'>
            <div className='relative'>
              <div className={`absolute inset-0 rounded-3xl blur-3xl ${
                theme === 'dark'
                  ? 'bg-gradient-to-r from-[#6366f1]/20 to-[#8b5cf6]/20'
                  : 'bg-gradient-to-r from-gray-200/50 to-gray-300/50'
              }`} />
          <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className={`relative rounded-3xl p-12 border ${
                  theme === 'dark'
                    ? 'bg-[#0c0a3e]/80 backdrop-blur-xl border-[#2d2b70]'
                    : 'bg-white/80 backdrop-blur-xl border-gray-200'
                }`}
              >
                <div className='max-w-3xl mx-auto text-center'>
                  <h2 className={`text-4xl font-bold mb-6 ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    Ready to Build?
                </h2>
                  <p className={theme === 'dark' ? 'text-xl text-[#8b5cf6] mb-8' : 'text-xl text-gray-600 mb-8'}>
                    Join thousands of developers creating amazing user
                    experiences with our tools.
                </p>
                  <Link
                    href='/docs'
                    className={`inline-flex items-center gap-2 px-8 py-4 rounded-xl font-medium transition-colors ${
                      theme === 'dark'
                        ? 'bg-gradient-to-r from-[#6366f1] to-[#8b5cf6] text-white hover:opacity-90'
                        : 'bg-gray-900 text-white hover:bg-gray-800'
                    }`}
                  >
                    Start Building
                    <ArrowRight className='w-4 h-4' />
                  </Link>
            </div>
          </motion.div>
            </div>
        </div>
      </section>
    </div>
  )
}
