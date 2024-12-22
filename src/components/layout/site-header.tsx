'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Sun, Moon } from 'lucide-react'
import { useTheme } from '@/components/theme-provider'
import { siteConfig } from '@/config/site'

export function SiteHeader() {
  const pathname = usePathname()
  const { theme, toggleTheme } = useTheme()

  const isActive = (path: string) => pathname === path

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 backdrop-blur-xl border-b ${
      theme === 'dark'
        ? 'bg-[#0c0a3e]/80 border-[#2d2b70]/30'
        : 'bg-white/80 border-gray-200/30'
    }`}>
      <div className='container mx-auto px-4'>
        <div className='flex items-center justify-between h-16'>
          <Link href='/' className={`text-xl font-bold ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            {siteConfig.name}
          </Link>
          <nav className='flex items-center gap-6'>
            <Link
              href='/docs'
              className={`text-sm transition-colors ${
                isActive('/docs')
                  ? theme === 'dark'
                    ? 'text-white'
                    : 'text-gray-900'
                  : theme === 'dark'
                    ? 'text-[#8b5cf6] hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Documentation
            </Link>
            <Link
              href='/components'
              className={`text-sm transition-colors ${
                isActive('/components')
                  ? theme === 'dark'
                    ? 'text-white'
                    : 'text-gray-900'
                  : theme === 'dark'
                    ? 'text-[#8b5cf6] hover:text-white'
                    : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              Components
            </Link>
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'bg-[#2d2b70] text-gray-400 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            >
              {theme === 'dark' ? (
                <Sun className="w-5 h-5" />
              ) : (
                <Moon className="w-5 h-5" />
              )}
            </button>
            <Link
              href='/ai-generator'
              className={`px-4 py-1.5 rounded-full text-sm transition-colors ${
                theme === 'dark'
                  ? 'bg-[#2d2b70] hover:bg-[#373860] text-white'
                  : 'bg-gray-900 hover:bg-gray-800 text-white'
              }`}
            >
              Try AI Generator
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}
