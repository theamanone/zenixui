'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { ChevronRight, Copy, Search } from 'lucide-react';

const sections = [
  {
    title: 'Getting Started',
    items: ['Introduction', 'Installation', 'Quick Start']
  },
  {
    title: 'Components',
    items: ['Buttons', 'Cards', 'Forms', 'Navigation', 'Modals']
  },
  {
    title: 'Hooks',
    items: ['useAnimation', 'useTheme', 'useMediaQuery']
  },
  {
    title: 'Animations',
    items: ['Transitions', 'Gestures', 'Variants']
  }
];

export default function DocsPage() {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-black">
      {/* Header */}
      <div className="border-b border-white/10 bg-black/50 backdrop-blur-xl sticky top-0 z-50">
        <div className="container mx-auto px-4">
          <div className="h-16 flex items-center justify-between">
            <div className="flex items-center gap-8">
              <Link href="/" className="text-xl font-bold">
                Enhancer
              </Link>
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search documentation..."
                  className="w-64 bg-white/5 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            <nav className="flex items-center gap-6">
              <Link href="/components" className="text-sm text-gray-300 hover:text-white transition-colors">
                Components
              </Link>
              <Link href="/docs" className="text-sm text-gray-300 hover:text-white transition-colors">
                Documentation
              </Link>
              <Link href="/ai-generator" className="text-sm px-4 py-1.5 rounded-full bg-white/10 hover:bg-white/20 transition-colors">
                Try AI Generator
              </Link>
            </nav>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-12 gap-8">
          {/* Sidebar */}
          <div className="col-span-3">
            <div className="sticky top-24 space-y-8">
              {sections.map((section) => (
                <div key={section.title}>
                  <h3 className="text-sm font-semibold text-gray-400 mb-2">{section.title}</h3>
                  <ul className="space-y-1">
                    {section.items.map((item) => (
                      <li key={item}>
                        <Link
                          href={`/docs/${section.title.toLowerCase()}/${item.toLowerCase()}`}
                          className="text-sm text-gray-300 hover:text-white flex items-center gap-2 py-1 px-2 rounded hover:bg-white/5 transition-colors"
                        >
                          <ChevronRight className="w-3 h-3" />
                          {item}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div className="col-span-9">
            <div className="prose prose-invert max-w-none">
              <h1>Getting Started with Enhancer</h1>
              
              <div className="my-8 p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Installation</span>
                  <button className="text-sm text-gray-400 hover:text-white flex items-center gap-1">
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                </div>
                <code className="text-blue-400">npm install @enhancer/ui framer-motion</code>
              </div>

              <p className="text-gray-300">
                Enhancer is a modern UI library built with React and Framer Motion. It provides a set of beautiful, 
                customizable components that help you build stunning web applications faster.
              </p>

              <h2>Quick Start</h2>
              <p className="text-gray-300">
                Import the components you need and start building your application:
              </p>

              <div className="my-8 p-4 bg-white/5 rounded-lg border border-white/10">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-400">Example</span>
                  <button className="text-sm text-gray-400 hover:text-white flex items-center gap-1">
                    <Copy className="w-4 h-4" />
                    Copy
                  </button>
                </div>
                <pre className="text-sm">
                  <code className="text-blue-400">{`import { Button, Card } from '@enhancer/ui';

export default function App() {
  return (
    <Card>
      <h1>Welcome to Enhancer</h1>
      <Button>Get Started</Button>
    </Card>
  );
}`}</code>
                </pre>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
