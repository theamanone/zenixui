'use client'

import { useTheme } from '@/components/theme-provider'
import { motion } from 'framer-motion'
import { ExternalLink } from 'lucide-react'

const showcaseItems = [
  {
    id: 1,
    title: 'Project Alpha',
    description: 'A modern dashboard with real-time analytics',
    image: '/showcase/project1.png',
    link: 'https://example.com/project1',
    tags: ['Dashboard', 'Analytics', 'Real-time']
  },
  {
    id: 2,
    title: 'Beta Commerce',
    description: 'E-commerce platform with advanced filtering',
    image: '/showcase/project2.png',
    link: 'https://example.com/project2',
    tags: ['E-commerce', 'Filters', 'Shopping']
  },
  // Add more showcase items here
]

export default function ShowcasePage() {
  const { theme } = useTheme()

  return (
    <div className={`min-h-screen pt-16 ${
      theme === 'dark' ? 'bg-[#0c0a3e]' : 'bg-gray-50'
    }`}>
      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className={`text-4xl font-bold mb-6 ${
            theme === 'dark' ? 'text-white' : 'text-gray-900'
          }`}>
            Showcase
          </h1>
          <p className={`text-lg ${
            theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
          }`}>
            Discover amazing projects built with our components
          </p>
        </div>

        {/* Showcase Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {showcaseItems.map((item) => (
            <motion.a
              key={item.id}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              whileHover={{ y: -4 }}
              className={`block overflow-hidden rounded-xl border group ${
                theme === 'dark'
                  ? 'bg-[#2d2b70]/50 border-[#6366f1]/20'
                  : 'bg-white border-gray-200'
              }`}
            >
              {/* Image */}
              <div className="aspect-[16/9] relative overflow-hidden">
                <div className={`absolute inset-0 ${
                  theme === 'dark' ? 'bg-black/50' : 'bg-gray-100'
                }`}>
                  {/* Add project preview image here */}
                </div>
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className={`text-lg font-semibold ${
                    theme === 'dark' ? 'text-white' : 'text-gray-900'
                  }`}>
                    {item.title}
                  </h3>
                  <ExternalLink className={`w-4 h-4 ${
                    theme === 'dark' ? 'text-gray-400' : 'text-gray-500'
                  }`} />
                </div>

                <p className={`text-sm mb-4 ${
                  theme === 'dark' ? 'text-gray-400' : 'text-gray-600'
                }`}>
                  {item.description}
                </p>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className={`text-xs px-2 py-1 rounded-full ${
                        theme === 'dark'
                          ? 'bg-[#6366f1]/10 text-[#6366f1]'
                          : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </div>
  )
}
