import { ChevronRight, Search } from 'lucide-react'
import { Component } from '@/config/components'

export const components: Component[] = [
  {
    id: 'button',
    name: 'Button',
    description: 'Modern, customizable button components with various styles and animations.',
    category: 'Buttons',
    preview: () => (
      <div className="flex flex-wrap gap-4">
        <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors">
          Primary
        </button>
        <button className="px-4 py-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:opacity-90 transition-opacity">
          Gradient
        </button>
        <button className="px-4 py-2 border border-white/20 bg-white/5 backdrop-blur-sm text-white rounded-lg hover:bg-white/10 transition-colors">
          Secondary
        </button>
      </div>
    ),
    code: `export const Button = ({ variant = 'primary', children }) => {
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600',
    gradient: 'bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90',
    secondary: 'border border-white/20 bg-white/5 hover:bg-white/10'
  }

  return (
    <button
      className={\`px-4 py-2 rounded-lg transition-all \${variants[variant]}\`}
    >
      {children}
    </button>
  )
}`
  },
  {
    id: 'card',
    name: 'Card',
    description: 'Versatile card components with glass morphism and hover effects.',
    category: 'Cards',
    preview: () => (
      <div className="grid grid-cols-2 gap-4">
        <div className="p-6 rounded-xl border border-white/10 bg-white/5 backdrop-blur-lg hover:bg-white/10 transition-colors">
          <h3 className="text-lg font-medium mb-2">Glass Card</h3>
          <p className="text-sm text-white/70">Beautiful glass morphism effect</p>
        </div>
        <div className="p-6 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 border border-purple-500/20 hover:border-purple-500/40 transition-colors">
          <h3 className="text-lg font-medium mb-2">Gradient Card</h3>
          <p className="text-sm text-white/70">Subtle gradient background</p>
        </div>
      </div>
    ),
    code: `export const Card = ({ variant = 'glass', children }) => {
  const variants = {
    glass: 'border border-white/10 bg-white/5 backdrop-blur-lg hover:bg-white/10',
    gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20 border-purple-500/20 hover:border-purple-500/40'
  }

  return (
    <div className={\`p-6 rounded-xl transition-all \${variants[variant]}\`}>
      {children}
    </div>
  )
}`
  },
  {
    id: 'input',
    name: 'Input',
    description: 'Modern form inputs with floating labels and validation states.',
    category: 'Forms',
    preview: () => (
      <div className="space-y-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Enter your email"
            className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all placeholder-white/30"
          />
        </div>
        <div className="relative">
          <input
            type="text"
            placeholder="Search..."
            className="w-full px-4 py-2 pl-10 bg-white/5 border border-white/10 rounded-lg focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-all placeholder-white/30"
          />
          <Search className="absolute left-3 top-2.5 w-4 h-4 text-white/50" />
        </div>
      </div>
    ),
    code: `export const Input = ({ icon, ...props }) => {
  return (
    <div className="relative">
      <input
        className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg
          focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all
          placeholder-white/30"
        {...props}
      />
      {icon && (
        <div className="absolute left-3 top-2.5 text-white/50">
          {icon}
        </div>
      )}
    </div>
  )
}`
  },
  {
    id: 'modal',
    name: 'Modal',
    description: 'Customizable modal dialogs with animations and backdrop blur.',
    category: 'Overlays',
    preview: () => (
      <div className="relative">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" />
        <div className="relative w-full max-w-md mx-auto p-6 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20">
          <h3 className="text-lg font-medium mb-2">Modal Title</h3>
          <p className="text-sm text-white/70 mb-4">This is a modal dialog with a beautiful backdrop blur effect.</p>
          <div className="flex justify-end gap-2">
            <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">Cancel</button>
            <button className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition-colors">Confirm</button>
          </div>
        </div>
      </div>
    ),
    code: `export const Modal = ({ isOpen, onClose, children }) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="fixed inset-0 flex items-center justify-center p-4"
          >
            <div className="w-full max-w-md p-6 rounded-xl bg-white/10 backdrop-blur-lg border border-white/20">
              {children}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}`
  },
  {
    id: 'dropdown',
    name: 'Dropdown',
    description: 'Elegant dropdown menus with animations and hover effects.',
    category: 'Navigation',
    preview: () => (
      <div className="relative">
        <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors flex items-center gap-2">
          Options <ChevronRight className="w-4 h-4" />
        </button>
        <div className="absolute top-full mt-2 w-48 p-1 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20">
          <button className="w-full px-4 py-2 text-left rounded-lg hover:bg-white/10 transition-colors">Profile</button>
          <button className="w-full px-4 py-2 text-left rounded-lg hover:bg-white/10 transition-colors">Settings</button>
          <button className="w-full px-4 py-2 text-left rounded-lg hover:bg-white/10 transition-colors">Logout</button>
        </div>
      </div>
    ),
    code: `export const Dropdown = ({ trigger, items }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
      >
        {trigger}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute top-full mt-2 w-48 p-1 rounded-lg bg-white/10 backdrop-blur-lg border border-white/20"
          >
            {items.map(item => (
              <button
                key={item.label}
                onClick={item.onClick}
                className="w-full px-4 py-2 text-left rounded-lg hover:bg-white/10 transition-colors"
              >
                {item.label}
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}`
  }
]
