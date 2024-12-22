'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { useTheme } from '@/components/theme-provider'
import { Sun, Moon } from 'lucide-react'
import { siteConfig } from '@/config/site'

export function Navbar () {
  const { theme, toggleTheme } = useTheme()

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 border-b ${
        theme === 'dark'
          ? 'bg-[#0c0a3e]/80 border-[#2d2b70]/30'
          : 'bg-white/80 border-gray-200'
      } backdrop-blur-xl`}
    >
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <Link
            href='/'
            className={`text-xl font-bold ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}
          >
            {siteConfig.name}
          </Link>

          <div className='flex items-center gap-6'>
            <Link
              href='/components'
              className={`text-sm hover:text-[#6366f1] transition-colors ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Components
            </Link>
            <Link
              href='/templates'
              className={`text-sm hover:text-[#6366f1] transition-colors ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Templates
              <span className='ml-1 px-1.5 py-0.5 text-xs rounded-full bg-emerald-500/10 text-emerald-500'>
                new
              </span>
            </Link>
            <Link
              href='/showcase'
              className={`text-sm hover:text-[#6366f1] transition-colors ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Showcase
            </Link>
            <Link
              href='/pricing'
              className={`text-sm hover:text-[#6366f1] transition-colors ${
                theme === 'dark' ? 'text-gray-300' : 'text-gray-600'
              }`}
            >
              Pricing
            </Link>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'bg-[#2d2b70] text-gray-300 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className='w-5 h-5' />
              ) : (
                <Moon className='w-5 h-5' />
              )}
            </button>

            <Link
              href='/docs'
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                theme === 'dark'
                  ? 'bg-[#2d2b70] text-white hover:bg-[#373860]'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              Documentation
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}
