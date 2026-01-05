'use client'

import { useState } from 'react'

interface MenuSectionConfiguratorProps {
  onSave: (config: any) => void
  onSkip: () => void
  initialConfig?: any
}

interface MenuItem {
  name: string
  description: string
  price: number
  photo?: string
  tags: string[]
}

interface MenuCategory {
  name: string
  items: MenuItem[]
}

export function MenuSectionConfigurator({ onSave, onSkip, initialConfig }: MenuSectionConfiguratorProps) {
  const [mode, setMode] = useState<'manual' | 'ai-generated'>(initialConfig?.mode || 'ai-generated')
  const [categories, setCategories] = useState<MenuCategory[]>(
    initialConfig?.manual?.categories || [
      { name: 'Appetizers', items: [{ name: '', description: '', price: 0, tags: [] }] },
      { name: 'Main Course', items: [{ name: '', description: '', price: 0, tags: [] }] },
    ]
  )
  const [aiContext, setAiContext] = useState({
    cuisineType: initialConfig?.aiContext?.cuisineType || '',
    numberOfItems: initialConfig?.aiContext?.numberOfItems || 25,
  })

  const addCategory = () => {
    setCategories(prev => [...prev, { name: '', items: [{ name: '', description: '', price: 0, tags: [] }] }])
  }

  const removeCategory = (index: number) => {
    setCategories(prev => prev.filter((_, i) => i !== index))
  }

  const updateCategory = (index: number, updates: Partial<MenuCategory>) => {
    setCategories(prev => prev.map((cat, i) => i === index ? { ...cat, ...updates } : cat))
  }

  const addItem = (categoryIndex: number) => {
    setCategories(prev => prev.map((cat, i) => 
      i === categoryIndex ? { ...cat, items: [...cat.items, { name: '', description: '', price: 0, tags: [] }] } : cat
    ))
  }

  const removeItem = (categoryIndex: number, itemIndex: number) => {
    setCategories(prev => prev.map((cat, i) => 
      i === categoryIndex ? {
        ...cat,
        items: cat.items.filter((_, ii) => ii !== itemIndex)
      } : cat
    ))
  }

  const updateItem = (categoryIndex: number, itemIndex: number, updates: Partial<MenuItem>) => {
    setCategories(prev => prev.map((cat, i) => 
      i === categoryIndex ? {
        ...cat,
        items: cat.items.map((item, ii) => ii === itemIndex ? { ...item, ...updates } : item)
      } : cat
    ))
  }

  const toggleTag = (categoryIndex: number, itemIndex: number, tag: string) => {
    setCategories(prev => prev.map((cat, i) => 
      i === categoryIndex ? {
        ...cat,
        items: cat.items.map((item, ii) => {
          if (ii === itemIndex) {
            const tags = item.tags.includes(tag)
              ? item.tags.filter(t => t !== tag)
              : [...item.tags, tag]
            return { ...item, tags }
          }
          return item
        })
      } : cat
    ))
  }

  const handleSave = () => {
    if (mode === 'manual') {
      // Validate manual menu
      const validCategories = categories.filter(cat => 
        cat.name.trim() && cat.items.some(item => item.name.trim() && item.price > 0)
      )
      if (validCategories.length === 0) {
        alert('Please add at least one category with items')
        return
      }
      onSave({
        mode: 'manual',
        manual: { categories: validCategories },
      })
    } else {
      // Validate AI context
      if (!aiContext.cuisineType.trim()) {
        alert('Please provide cuisine type for AI generation')
        return
      }
      onSave({
        mode: 'ai-generated',
        aiContext,
      })
    }
  }

  const availableTags = ['Vegetarian', 'Vegan', 'Spicy', 'Halal', 'Gluten-Free', 'Dairy-Free']

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2 text-white">Configure Menu Section</h2>
        <p className="text-gray-400 text-sm">
          Add menu items manually or let AI generate a complete menu
        </p>
      </div>

      {/* Mode Selection */}
      <div>
        <label className="block text-sm font-medium text-gray-300 mb-3">
          How would you like to add menu items?
        </label>
        <div className="space-y-3">
          <label className="flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-purple-500/50 cursor-pointer transition">
            <input
              type="radio"
              name="menuMode"
              value="ai-generated"
              checked={mode === 'ai-generated'}
              onChange={() => setMode('ai-generated')}
              className="w-4 h-4"
            />
            <div>
              <div className="text-white font-medium">Let AI Generate</div>
              <div className="text-xs text-gray-400">AI will create a complete menu based on cuisine type</div>
            </div>
          </label>

          <label className="flex items-center gap-3 p-4 rounded-xl border border-white/10 hover:border-purple-500/50 cursor-pointer transition">
            <input
              type="radio"
              name="menuMode"
              value="manual"
              checked={mode === 'manual'}
              onChange={() => setMode('manual')}
              className="w-4 h-4"
            />
            <div>
              <div className="text-white font-medium">Add Manually</div>
              <div className="text-xs text-gray-400">Enter menu items yourself</div>
            </div>
          </label>
        </div>
      </div>

      {/* AI Generation Mode */}
      {mode === 'ai-generated' && (
        <div className="space-y-4 p-6 rounded-xl border border-white/10 bg-white/5">
          <h3 className="text-lg font-semibold text-white">AI Generation Settings</h3>
          
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Cuisine Type <span className="text-red-400">*</span>
            </label>
            <input
              type="text"
              value={aiContext.cuisineType}
              onChange={(e) => setAiContext({ ...aiContext, cuisineType: e.target.value })}
              placeholder="e.g., Italian, Kenyan, Chinese, Fast Food"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Number of Items
            </label>
            <input
              type="number"
              value={aiContext.numberOfItems}
              onChange={(e) => setAiContext({ ...aiContext, numberOfItems: parseInt(e.target.value) || 25 })}
              min="10"
              max="50"
              className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
            />
            <p className="text-xs text-gray-500 mt-1">Between 10-50 items</p>
          </div>
        </div>
      )}

      {/* Manual Entry Mode */}
      {mode === 'manual' && (
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">Menu Categories</h3>
            <button
              onClick={addCategory}
              className="px-4 py-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 rounded-xl transition text-sm"
            >
              + Add Category
            </button>
          </div>

          {categories.map((category, catIndex) => (
            <div key={catIndex} className="p-6 rounded-xl border border-white/10 bg-white/5">
              <div className="flex items-center justify-between mb-4">
                <input
                  type="text"
                  value={category.name}
                  onChange={(e) => updateCategory(catIndex, { name: e.target.value })}
                  placeholder="Category Name (e.g., Appetizers)"
                  className="flex-1 px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 font-semibold"
                />
                {categories.length > 1 && (
                  <button
                    onClick={() => removeCategory(catIndex)}
                    className="ml-3 px-3 py-2 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-xl transition text-sm"
                  >
                    Remove Category
                  </button>
                )}
              </div>

              <div className="space-y-4">
                {category.items.map((item, itemIndex) => (
                  <div key={itemIndex} className="p-4 rounded-lg border border-white/5 bg-black/20">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-white font-medium">Item {itemIndex + 1}</h4>
                      {category.items.length > 1 && (
                        <button
                          onClick={() => removeItem(catIndex, itemIndex)}
                          className="px-2 py-1 bg-red-500/20 hover:bg-red-500/30 text-red-400 rounded-lg transition text-xs"
                        >
                          Remove
                        </button>
                      )}
                    </div>

                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-xs font-medium text-gray-300 mb-1">
                            Item Name <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="text"
                            value={item.name}
                            onChange={(e) => updateItem(catIndex, itemIndex, { name: e.target.value })}
                            placeholder="e.g., Nyama Choma"
                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-medium text-gray-300 mb-1">
                            Price (KES) <span className="text-red-400">*</span>
                          </label>
                          <input
                            type="number"
                            value={item.price || ''}
                            onChange={(e) => updateItem(catIndex, itemIndex, { price: parseFloat(e.target.value) || 0 })}
                            placeholder="500"
                            min="0"
                            className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-1">
                          Description
                        </label>
                        <textarea
                          value={item.description}
                          onChange={(e) => updateItem(catIndex, itemIndex, { description: e.target.value })}
                          placeholder="Brief description of the item"
                          rows={2}
                          className="w-full px-3 py-2 bg-white/5 border border-white/10 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:border-purple-500 text-sm"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-medium text-gray-300 mb-2">
                          Dietary Tags
                        </label>
                        <div className="flex flex-wrap gap-2">
                          {availableTags.map(tag => (
                            <button
                              key={tag}
                              onClick={() => toggleTag(catIndex, itemIndex, tag)}
                              className={`px-3 py-1 rounded-lg text-xs transition ${
                                item.tags.includes(tag)
                                  ? 'bg-purple-500/30 border border-purple-500/50 text-purple-300'
                                  : 'bg-white/5 border border-white/10 text-gray-400 hover:border-white/20'
                              }`}
                            >
                              {tag}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}

                <button
                  onClick={() => addItem(catIndex)}
                  className="text-sm text-purple-400 hover:text-purple-300 transition"
                >
                  + Add Item to {category.name || 'Category'}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Action Buttons */}
      <div className="flex justify-between pt-6 border-t border-white/10">
        <button
          onClick={onSkip}
          className="px-6 py-3 text-gray-400 hover:text-white transition"
        >
          Skip This Section
        </button>

        <button
          onClick={handleSave}
          className="px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-xl font-semibold text-white hover:shadow-lg hover:shadow-purple-500/50 transition"
        >
          Save & Continue →
        </button>
      </div>
    </div>
  )
}

