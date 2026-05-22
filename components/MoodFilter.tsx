'use client'

import { useState } from 'react'

const moods = [
  { id: 'burned-out', label: 'Burned out', emoji: '😮‍💨' },
  { id: 'team-bonding', label: 'Team bonding', emoji: '🧩' },
  { id: 'kids-parents', label: 'Kids + parents', emoji: '🧒' },
  { id: 'introvert', label: 'Introvert-friendly', emoji: '🪴' },
  { id: 'educational', label: 'Learn something', emoji: '📚' },
  { id: 'creative', label: 'Get creative', emoji: '🎨' },
  { id: 'active', label: 'Active', emoji: '🏃' },
]

type Props = {
  onFilterChange: (activeFilters: string[]) => void
}

export default function MoodFilter({ onFilterChange }: Props) {
  const [active, setActive] = useState<string[]>([])

  function toggle(id: string) {
    const updated = active.includes(id)
      ? active.filter((f) => f !== id)
      : [...active, id]
    setActive(updated)
    onFilterChange(updated)
  }

  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {moods.map((mood) => {
        const isActive = active.includes(mood.id)
        return (
          <button
            key={mood.id}
            onClick={() => toggle(mood.id)}
            className={`text-sm px-4 py-2 rounded-full border transition-all cursor-pointer ${
              isActive
                ? 'bg-emerald-50 border-emerald-400 text-emerald-700 font-medium'
                : 'bg-white border-gray-200 text-gray-500 hover:border-gray-300 hover:text-gray-700'
            }`}
          >
            {mood.emoji} {mood.label}
          </button>
        )
      })}
    </div>
  )
}
