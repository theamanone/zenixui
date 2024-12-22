'use client'

import Link from 'next/link'
import { useTheme } from '@/components/theme-provider'

export function SiteFooter() {
  const { theme } = useTheme()
  
  return (
    <footer className={`relative z-10 border-t py-6 ${
      theme === 'dark'
        ? 'bg-[#0c0a3e]/80 border-[#2d2b70]/30'
        : 'bg-white/80 border-gray-200/30'
    }`}>
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className={`font-semibold mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Product
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/docs"
                  className={theme === 'dark' ? 'text-[#8b5cf6] hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                >
                  Documentation
                </Link>
              </li>
              <li>
                <Link
                  href="/components"
                  className={theme === 'dark' ? 'text-[#8b5cf6] hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                >
                  Components
                </Link>
              </li>
              <li>
                <Link
                  href="/templates"
                  className={theme === 'dark' ? 'text-[#8b5cf6] hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                >
                  Templates
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={`font-semibold mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Resources
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/blog"
                  className={theme === 'dark' ? 'text-[#8b5cf6] hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                >
                  Blog
                </Link>
              </li>
              <li>
                <Link
                  href="/showcase"
                  className={theme === 'dark' ? 'text-[#8b5cf6] hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                >
                  Showcase
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={`font-semibold mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/about"
                  className={theme === 'dark' ? 'text-[#8b5cf6] hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/pricing"
                  className={theme === 'dark' ? 'text-[#8b5cf6] hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                >
                  Pricing
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className={`font-semibold mb-3 ${
              theme === 'dark' ? 'text-white' : 'text-gray-900'
            }`}>
              Legal
            </h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/privacy"
                  className={theme === 'dark' ? 'text-[#8b5cf6] hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                >
                  Privacy
                </Link>
              </li>
              <li>
                <Link
                  href="/terms"
                  className={theme === 'dark' ? 'text-[#8b5cf6] hover:text-white' : 'text-gray-600 hover:text-gray-900'}
                >
                  Terms
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <div className={`mt-8 pt-6 border-t ${
          theme === 'dark' ? 'border-[#2d2b70]/30' : 'border-gray-200/30'
        }`}>
          <p className={theme === 'dark' ? 'text-[#8b5cf6]' : 'text-gray-600'}>
            © 2024 Enhancer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
