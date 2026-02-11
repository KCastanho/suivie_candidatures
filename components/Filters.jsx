import React from 'react'

const Filters = ({ currentFilter, onFilterChange }) => {
  const filters = [
    { label: 'Toutes', value: 'all' },
    { label: 'En attente', value: 'En attente' },
    { label: 'Acceptées', value: 'Acceptée' },
    { label: 'Refusées', value: 'Refusée' },
  ]

  return (
    <div className="mb-6 flex flex-wrap gap-3">
      {filters.map((filter) => (
        <button
          key={filter.value}
          onClick={() => onFilterChange(filter.value)}
          className={`px-6 py-2 rounded-lg font-medium transition-all ${
            currentFilter === filter.value
              ? 'bg-blue-600 text-white shadow-lg'
              : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
          }`}
        >
          {filter.label}
        </button>
      ))}
    </div>
  )
}

export default Filters
