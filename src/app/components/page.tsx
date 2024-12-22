'use client'

import { useState } from 'react'
import { useTheme } from '@/components/theme-provider'
import { motion, AnimatePresence } from 'framer-motion'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { Search, Filter, Code, Copy, Check, Menu, X, Book, Package, Zap, Laptop, Eye } from 'lucide-react'
import { categories, Component, sections } from '@/config/components'
import { components } from '@/components/ui/previews'
import { ClipboardIcon } from 'lucide-react'

const sidebarSections = [
  {
    title: 'Getting Started',
    icon: Book,
    items: [
      { name: 'Introduction', href: '#introduction' },
      { name: 'Installation', href: '#installation' },
      { name: 'Quick Start', href: '#quick-start' }
    ]
  },
  {
    title: 'Components',
    icon: Package,
    items: categories.map(category => ({
      name: category,
      href: `#${category.toLowerCase()}`
    }))
  },
  {
    title: 'Admin',
    icon: Zap,
    items: [
      { name: 'Manage Components', href: '/admin/components' }
    ]
  },
  {
    title: 'Features',
    icon: Zap,
    items: [
      { name: 'Theming', href: '#theming' },
      { name: 'Animations', href: '#animations' },
      { name: 'Accessibility', href: '#accessibility' }
    ]
  },
  {
    title: 'Examples',
    icon: Laptop,
    items: [
      { name: 'Dashboard', href: '#dashboard' },
      { name: 'Landing Page', href: '#landing-page' },
      { name: 'Authentication', href: '#authentication' }
    ]
  }
]

interface ComponentPreviewProps {
  component: Component
  showCode: boolean
}

function ComponentPreview({ component, showCode }: ComponentPreviewProps) {
  const PreviewComponent = component.preview
  
  return (
    <div className="space-y-4">
      <div className="p-6 rounded-lg bg-white/5">
        {PreviewComponent && <PreviewComponent />}
      </div>
      {showCode && (
        <div className="relative">
          <pre className="p-4 rounded-lg bg-black/50 overflow-x-auto">
            <code className="text-sm">{component.code}</code>
          </pre>
          <button
            onClick={() => navigator.clipboard.writeText(component.code)}
            className="absolute top-2 right-2 p-2 rounded-lg bg-white/10 hover:bg-white/20"
          >
            <ClipboardIcon className="w-4 h-4" />
          </button>
        </div>
      )}
    </div>
  )
}

export default function ComponentsPage() {
  const { theme } = useTheme()
  const [activeSection, setActiveSection] = useState('introduction')
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)
  const [showCode, setShowCode] = useState(false)

  const filteredComponents = components.filter(component => {
    if (activeSection !== 'all' && activeSection !== component.category.toLowerCase()) {
      return false
    }
    const matchesCategory = selectedCategory === 'All' || component.category === selectedCategory
    const matchesSearch = component.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      component.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const renderFileStructure = (component: Component) => {
    return (
      <div className="mb-4 p-4 rounded-lg bg-black/20">
        <p className="text-sm text-white/70 mb-2">Recommended file structure:</p>
        <pre className="text-xs text-blue-400">
          src/
          ├── components/
          │   └── ui/
          │       └── {component.category.toLowerCase()}/
          │           └── {component.id}.tsx
          └── lib/
              └── utils.ts  {/* For utility functions */}
        </pre>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      {/* Mobile Sidebar Toggle */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="fixed top-20 left-4 z-40 p-2 bg-white/10 backdrop-blur-lg rounded-lg border border-white/20 lg:hidden"
      >
        {isSidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <div className="flex">
        <AnimatePresence>
          {(isSidebarOpen || window.innerWidth >= 1024) && (
            <motion.aside
              initial={{ x: -300, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: -300, opacity: 0 }}
              className={`mt-16 overflow-y-auto w-72 bg-white/10 backdrop-blur-lg border-r border-white/20 p-6
                ${isSidebarOpen ? 'fixed inset-y-0 left-0 z-30' : 'hidden lg:block lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]'}`}
            >
              <div className="space-y-8">
                {sidebarSections.map(section => (
                  <div key={section.title}>
                    <div className="flex items-center gap-2 mb-4 text-white/90">
                      <section.icon className="w-5 h-5" />
                      <h3 className="font-medium">{section.title}</h3>
                    </div>
                    <div className="space-y-1">
                      {section.items.map(item => (
                        <button
                          key={item.name}
                          onClick={() => {
                            const section = item.href.replace('#', '')
                            setActiveSection(section)
                            setSelectedCategory(item.name)
                            if (window.innerWidth < 1024) {
                              setIsSidebarOpen(false)
                            }
                          }}
                          className={`w-full text-left px-4 py-2 rounded-lg transition-colors
                            ${(activeSection === item.href.replace('#', '') || selectedCategory === item.name)
                              ? 'bg-white/20 text-white'
                              : 'text-white/70 hover:text-white hover:bg-white/10'}`}
                        >
                          {item.name}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.aside>
          )}
        </AnimatePresence>

        {/* Main Content */}
        <main className={`flex-1 transition-all pt-16`}>
          <div className="container mx-auto px-4 py-8">
            {/* Component Details */}
            {activeSection !== 'introduction' && activeSection !== 'installation' && activeSection !== 'quick-start' && (
              <div className="max-w-5xl mx-auto">
                <div className="flex flex-col items-start gap-4 mb-8">
                  <h1 className="text-5xl font-bold">{selectedCategory === 'All' ? 'All Components' : `${selectedCategory}`}</h1>
                  <p className="text-xl text-white/70">
                    {selectedCategory === 'All' 
                      ? 'A collection of beautiful and reusable components'
                      : `Beautiful and reusable ${selectedCategory.toLowerCase()} components`}
                  </p>
                  <div className="flex gap-2">
                    <span className="px-3 py-1 rounded-full text-sm bg-white/10">UI</span>
                    <span className="px-3 py-1 rounded-full text-sm bg-white/10">{selectedCategory}</span>
                  </div>
                </div>

                {/* Preview/Code Toggle */}
                <div className="flex gap-4 mb-8">
                  <button
                    onClick={() => setShowCode(false)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      !showCode ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Eye className="w-4 h-4" /> Preview
                    </span>
                  </button>
                  <button
                    onClick={() => setShowCode(true)}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      showCode ? 'bg-white/20 text-white' : 'text-white/70 hover:text-white hover:bg-white/10'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Code className="w-4 h-4" /> Code
                    </span>
                  </button>
                </div>

                {/* Component Grid */}
                <div className="grid grid-cols-1 gap-8">
                  {filteredComponents.map(component => (
                    <motion.div
                      key={component.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="relative group"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 rounded-xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity" />
                      <div className="relative overflow-hidden border border-white/10 rounded-xl bg-white/5 backdrop-blur-sm">
                        <div className="p-6">
                          <div className="flex items-start justify-between mb-4">
                            <div>
                              <h3 className="text-2xl font-medium mb-2">{component.name}</h3>
                              <p className="text-white/70">{component.description}</p>
                            </div>
                          </div>
                          
                          {/* Preview/Code Section */}
                          <ComponentPreview component={component} showCode={showCode} />
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {/* Installation Guide */}
            {activeSection === 'installation' && (
              <div className="max-w-3xl mx-auto">
                <h1 className="text-5xl font-bold mb-8">Installation</h1>
                <div className="space-y-8">
                  <div className="rounded-xl overflow-hidden">
                    <div className="p-6 bg-white/5 border border-white/10">
                      <h2 className="text-2xl font-semibold mb-4">Create a new project</h2>
                      <div className="bg-black/20 rounded-lg p-4 font-mono">
                        <div className="flex items-center justify-between">
                          <code className="text-blue-400">npx create-next-app@latest my-app --typescript --tailwind</code>
                          <button
                            onClick={() => copyCode("npx create-next-app@latest my-app --typescript --tailwind")}
                            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="p-6 bg-white/5 border border-white/10 mt-6">
                      <h2 className="text-2xl font-semibold mb-4">Install dependencies</h2>
                      <div className="bg-black/20 rounded-lg p-4 font-mono">
                        <div className="flex items-center justify-between">
                          <code className="text-blue-400">npm install @enhancer/components framer-motion</code>
                          <button
                            onClick={() => copyCode("npm install @enhancer/components framer-motion")}
                            className="p-1.5 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <h2 className="text-2xl font-semibold mb-4">Configuration</h2>
                    <p className="text-white/70 mb-4">Add the following to your tailwind.config.js:</p>
                    <SyntaxHighlighter
                      language="javascript"
                      style={theme === 'dark' ? vscDarkPlus : vs}
                      customStyle={{
                        background: 'transparent',
                        padding: '1rem',
                        borderRadius: '0.5rem',
                        border: '1px solid rgba(255, 255, 255, 0.1)',
                      }}
                    >
                      {`module.exports = {
  content: [
    './node_modules/@enhancer/components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  // ... rest of your config
}`}
                    </SyntaxHighlighter>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  )
}
