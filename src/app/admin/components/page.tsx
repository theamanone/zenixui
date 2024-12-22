'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import { Component, ComponentUpdate, components } from '@/config/components'
import { Plus, Edit2, Trash2, Save, X } from 'lucide-react'

const categories = Array.from(new Set(components.map(comp => comp.category))).sort()

export default function AdminPage() {
  const [componentList, setComponentList] = useState(components)
  const [editingComponent, setEditingComponent] = useState<string | null>(null)
  const [newComponent, setNewComponent] = useState<Partial<Component> | null>(null)
  const [selectedCategory, setSelectedCategory] = useState('All')
  const [searchQuery, setSearchQuery] = useState('')

  const filteredComponents = componentList.filter(comp => {
    const matchesCategory = selectedCategory === 'All' || comp.category === selectedCategory
    const matchesSearch = comp.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         comp.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const handleAddComponent = (component: Component) => {
    setComponentList([...componentList, component])
    setNewComponent(null)
  }

  const handleUpdateComponent = (update: ComponentUpdate) => {
    setComponentList(componentList.map(comp => 
      comp.id === update.id ? { ...comp, ...update.updates } : comp
    ))
    setEditingComponent(null)
  }

  const handleRemoveComponent = (id: string) => {
    setComponentList(componentList.filter(comp => comp.id !== id))
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] pt-20">
      {/* Sidebar */}
      <div className="w-64 border-r border-white/10 bg-black/20 p-4 overflow-y-auto">
        <div className="mb-6">
          <input
            type="text"
            placeholder="Search components..."
            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="mb-6">
          <h3 className="text-sm font-semibold text-white/60 mb-2">Categories</h3>
          <div className="space-y-1">
            {categories.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`w-full text-left px-3 py-2 rounded-lg transition-colors ${
                  selectedCategory === category 
                    ? 'bg-blue-500/20 text-blue-400'
                    : 'hover:bg-white/5'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-y-auto p-8">
        <div className="max-w-6xl mx-auto">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold">Component Library</h1>
            <button
              onClick={() => setNewComponent({})}
              className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
            >
              <Plus className="w-4 h-4" /> Add Component
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredComponents.map(component => (
              <motion.div
                key={component.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="group relative p-4 bg-white/5 rounded-xl border border-white/10 hover:border-white/20 transition-colors"
              >
                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={() => setEditingComponent(component.id)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                  >
                    <Edit2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => handleRemoveComponent(component.id)}
                    className="p-2 rounded-lg bg-white/5 hover:bg-red-500/20 hover:text-red-400 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                <h3 className="text-lg font-semibold mb-2">{component.name}</h3>
                <p className="text-sm text-white/60 mb-4">{component.description}</p>
                <div className="text-xs font-medium px-2 py-1 bg-white/10 rounded-full w-fit">
                  {component.category}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(newComponent || editingComponent) && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="w-full max-w-lg bg-background rounded-xl p-6"
          >
            <ComponentForm
              initialData={editingComponent ? componentList.find(c => c.id === editingComponent) : newComponent}
              onSubmit={editingComponent ? handleUpdateComponent : handleAddComponent}
              onCancel={() => {
                setNewComponent(null)
                setEditingComponent(null)
              }}
            />
          </motion.div>
        </div>
      )}
    </div>
  )
}

function ComponentForm({
  initialData,
  onSubmit,
  onCancel
}: {
  initialData?: Partial<Component>
  onSubmit: (data: any) => void
  onCancel: () => void
}) {
  const [formData, setFormData] = useState(initialData || {
    id: '',
    name: '',
    description: '',
    category: '',
    code: ''
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">ID</label>
        <input
          type="text"
          value={formData.id || ''}
          onChange={e => setFormData({ ...formData, id: e.target.value })}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Name</label>
        <input
          type="text"
          value={formData.name || ''}
          onChange={e => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={formData.description || ''}
          onChange={e => setFormData({ ...formData, description: e.target.value })}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Category</label>
        <input
          type="text"
          value={formData.category || ''}
          onChange={e => setFormData({ ...formData, category: e.target.value })}
          className="w-full px-4 py-2 bg-white/5 border border-white/10 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Code</label>
        <textarea
          value={formData.code || ''}
          onChange={e => setFormData({ ...formData, code: e.target.value })}
          className="w-full px-4 py-2 h-32 font-mono bg-white/5 border border-white/10 rounded-lg focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
          required
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 text-white/70 hover:text-white transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Save
        </button>
      </div>
    </form>
  )
}
