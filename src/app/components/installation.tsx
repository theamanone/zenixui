'use client'

import { useTheme } from '@/components/theme-provider'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { vscDarkPlus, vs } from 'react-syntax-highlighter/dist/esm/styles/prism'

const installationSteps = {
  'install-nextjs': {
    title: 'Install Next.js',
    description: 'Create a new Next.js project with our starter template',
    code: `npx create-next-app@latest my-app --typescript --tailwind --eslint`,
    additionalInfo: 'This will create a new Next.js project with TypeScript, Tailwind CSS, and ESLint configured.'
  },
  'install-tailwind': {
    title: 'Install Tailwind CSS',
    description: 'Set up Tailwind CSS with Next.js',
    code: `npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p`,
    additionalInfo: 'This will install Tailwind CSS and create the necessary configuration files.'
  },
  'add-utilities': {
    title: 'Add Utilities',
    description: 'Install required dependencies for animations and utilities',
    code: `npm install framer-motion lucide-react @radix-ui/react-slot clsx tailwind-merge`,
    additionalInfo: 'These packages provide animation capabilities, icons, and utility functions.'
  },
  'cli': {
    title: 'CLI Tools',
    description: 'Install CLI tools for development',
    code: `npm install -D @types/node @types/react @types/react-dom typescript`,
    additionalInfo: 'These development dependencies provide TypeScript support and type definitions.'
  }
}

export function InstallationGuide({ selectedStep }: { selectedStep: string }) {
  const { theme } = useTheme()
  const step = installationSteps[selectedStep as keyof typeof installationSteps]

  if (!step) return null

  return (
    <div className="space-y-6">
      <div>
        <h2 className={`text-2xl font-bold mb-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          {step.title}
        </h2>
        <p className={theme === 'dark' ? 'text-[#8b5cf6]' : 'text-gray-600'}>
          {step.description}
        </p>
      </div>

      <div className={`rounded-lg overflow-hidden ${
        theme === 'dark' ? 'bg-[#1e1e3f]' : 'bg-gray-50'
      }`}>
        <SyntaxHighlighter
          language="bash"
          style={theme === 'dark' ? vscDarkPlus : vs}
          customStyle={{
            margin: 0,
            background: 'transparent',
            padding: '1.5rem'
          }}
        >
          {step.code}
        </SyntaxHighlighter>
      </div>

      <div className={`p-4 rounded-lg ${
        theme === 'dark' ? 'bg-[#2d2b70]/50' : 'bg-blue-50'
      }`}>
        <p className={theme === 'dark' ? 'text-[#8b5cf6]' : 'text-blue-600'}>
          {step.additionalInfo}
        </p>
      </div>
    </div>
  )
}
