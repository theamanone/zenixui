'use client'

import Link from 'next/link'
import { useTheme } from '@/components/theme-provider'
import { Github, Twitter } from 'lucide-react'
import { siteConfig } from '@/config/site'

const footerLinks = {
  Product: [
    { name: 'Components', href: '/components' },
    { name: 'Templates', href: '/templates' },
    { name: 'Documentation', href: '/docs' },
    { name: 'Pricing', href: '/pricing' }
  ],
  Resources: [
    { name: 'Getting Started', href: '/docs/getting-started' },
    { name: 'API Reference', href: '/docs/api' },
    { name: 'Examples', href: '/docs/examples' },
    { name: 'Showcase', href: '/showcase' }
  ],
  Company: [
    { name: 'About', href: '/about' },
    { name: 'Blog', href: '/blog' },
    { name: 'Careers', href: '/careers' },
    { name: 'Contact', href: '/contact' }
  ],
  Legal: [
    { name: 'Privacy', href: '/privacy' },
    { name: 'Terms', href: '/terms' },
    { name: 'License', href: '/license' }
  ]
}

export function Footer () {
  const { theme } = useTheme()

  return (
    <footer
      className={`border-t ${
        theme === 'dark'
          ? 'bg-[#0c0a3e] border-[#2d2b70]'
          : 'bg-white border-gray-200'
      }`}
    >
      <div className='container mx-auto py-12 px-4'>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-8'>
          {Object.entries(footerLinks).map(([category, links]) => (
            <div key={category}>
              <h3
                className={`text-sm font-semibold mb-3 ${
                  theme === 'dark' ? 'text-white' : 'text-gray-900'
                }`}
              >
                {category}
              </h3>
              <ul className='space-y-2'>
                {links.map(link => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className={`text-sm transition-colors ${
                        theme === 'dark'
                          ? 'text-gray-400 hover:text-white'
                          : 'text-gray-600 hover:text-gray-900'
                      }`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="mt-12 pt-8 border-t flex items-center justify-between flex-wrap gap-4 ${
          theme === 'dark' ? 'border-[#2d2b70]' : 'border-gray-200'
        }"
        >
          <p
            className={`text-sm ${
              theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
            }`}
          >
            © {new Date().getFullYear()} {siteConfig.name}. All rights reserved.
          </p>

          <div className='flex items-center gap-4'>
            <a
              href='https://github.com'
              target='_blank'
              rel='noopener noreferrer'
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Github className='w-5 h-5' />
            </a>
            <a
              href='https://twitter.com'
              target='_blank'
              rel='noopener noreferrer'
              className={`p-2 rounded-lg transition-colors ${
                theme === 'dark'
                  ? 'text-gray-400 hover:text-white'
                  : 'text-gray-600 hover:text-gray-900'
              }`}
            >
              <Twitter className='w-5 h-5' />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
