'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'framer-motion'
import { useTheme } from '@/components/theme-provider'
import { Sun, Moon, Github } from 'lucide-react'
import { siteConfig } from '@/config/site'

const navigation = [
  { name: 'Components', href: '/components' },
  { name: 'Templates', href: '/templates', badge: 'new' },
  { name: 'Showcase', href: '/showcase' },
  { name: 'Pricing', href: '/pricing' },
  { name: 'Documentation', href: '/docs' },
]

export function Header() {
  const { theme, toggleTheme } = useTheme()
  const pathname = usePathname()

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 border-b transition-colors ${
      theme === 'dark'
        ? 'bg-[#0c0a3e]/80 border-[#2d2b70]'
        : 'bg-white/80 border-gray-200'
    } backdrop-blur-xl`}>
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link
              href="/"
              className={`text-xl font-bold ${
                theme === 'dark' ? 'text-white' : 'text-gray-900'
              }`}
            >
              {siteConfig.name}
            </Link>

            <nav className="hidden md:flex items-center gap-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`relative px-3 py-2 text-sm transition-colors rounded-lg ${
                    pathname === item.href
                      ? theme === 'dark'
                        ? 'text-white'
                        : 'text-gray-900'
                      : theme === 'dark'
                      ? 'text-gray-400 hover:text-white'
                      : 'text-gray-600 hover:text-gray-900'
                  }`}
                >
                  {pathname === item.href && (
                    <motion.div
                      layoutId="navbar-indicator"
                      className={`absolute inset-0 rounded-lg ${
                        theme === 'dark' ? 'bg-white/10' : 'bg-gray-100'
                      }`}
                      transition={{ type: 'spring', bounce: 0.25, duration: 0.5 }}
                    />
                  )}
                  <span className="relative">
                    {item.name}
                    {item.badge && (
                      <span className="ml-1 px-1.5 py-0.5 text-xs rounded-full bg-emerald-500/10 text-emerald-500">
                        {item.badge}
                      </span>
                    )}
                  </span>
                </Link>
              ))}
            </nav>
          </div>

          <div className="flex items-center gap-4">
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

            <a
              href="https://github.com/theamanone"
              target="_blank"
              rel="noopener noreferrer"
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'bg-[#2d2b70] text-gray-400 hover:text-white'
                  : 'bg-gray-100 text-gray-600 hover:text-gray-900'
              }`}
            >
              <Github className="w-5 h-5" />
            </a>

            <Link
              href="/docs"
              className={`hidden sm:inline-flex px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'bg-white text-gray-900 hover:bg-gray-100'
                  : 'bg-gray-900 text-white hover:bg-gray-800'
              }`}
            >
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}
