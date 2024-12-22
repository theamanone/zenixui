'use client'

import { useTheme } from '@/components/theme-provider'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const categories = [
  {
    name: 'Getting Started',
    items: ['Introduction', 'Installation', 'Usage']
  },
  {
    name: 'Components',
    items: [
      'Buttons',
      'Cards',
      'Forms',
      'Navigation',
      'Modals',
      'Tables',
      'Typography'
    ]
  },
  {
    name: 'Layout',
    items: ['Container', 'Grid', 'Stack', 'Divider']
  },
  {
    name: 'Data Display',
    items: ['Avatar', 'Badge', 'List', 'Tag']
  },
  {
    name: 'Feedback',
    items: ['Alert', 'Progress', 'Skeleton', 'Toast']
  },
  {
    name: 'Overlay',
    items: ['Drawer', 'Popover', 'Tooltip']
  }
]

export function ComponentsSidebar() {
  const { theme } = useTheme()
  const [expandedCategories, setExpandedCategories] = useState<string[]>(['Components'])

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    )
  }

  return (
    <div className={`w-64 border-r h-[calc(100vh-4rem)] sticky top-16 overflow-y-auto ${
      theme === 'dark' ? 'border-[#2d2b70]' : 'border-gray-200'
    }`}>
      <nav className="p-4">
        {categories.map((category) => (
          <div key={category.name} className="mb-4">
            <button
              onClick={() => toggleCategory(category.name)}
              className={`flex items-center justify-between w-full px-2 py-1.5 text-sm font-medium rounded-lg ${
                theme === 'dark'
                  ? 'text-white hover:bg-white/5'
                  : 'text-gray-900 hover:bg-gray-100'
              }`}
            >
              {category.name}
              <ChevronDown
                className={`w-4 h-4 transition-transform ${
                  expandedCategories.includes(category.name) ? 'rotate-180' : ''
                }`}
              />
            </button>
            <AnimatePresence>
              {expandedCategories.includes(category.name) && (
                <motion.ul
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="mt-1 ml-2 space-y-1 overflow-hidden"
                >
                  {category.items.map((item) => (
                    <li key={item}>
                      <a
                        href={`#${item.toLowerCase()}`}
                        className={`block px-2 py-1.5 text-sm rounded-lg transition-colors ${
                          theme === 'dark'
                            ? 'text-gray-400 hover:text-white hover:bg-white/5'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                        }`}
                      >
                        {item}
                      </a>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>
        ))}
      </nav>
    </div>
  )
}
