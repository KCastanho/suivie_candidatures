import React from 'react'

const Stats = ({ candidatures }) => {
  const total = candidatures.length
  const enAttente = candidatures.filter(c => c.statut === 'En attente').length
  const acceptees = candidatures.filter(c => c.statut === 'Acceptée').length
  const refusees = candidatures.filter(c => c.statut === 'Refusée').length

  const stats = [
    { label: 'Total', value: total, color: 'bg-blue-500' },
    { label: 'En attente', value: enAttente, color: 'bg-yellow-500' },
    { label: 'Acceptées', value: acceptees, color: 'bg-green-500' },
    { label: 'Refusées', value: refusees, color: 'bg-red-500' },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat, index) => (
        <div
          key={index}
          className="bg-white rounded-lg shadow-md p-6 border-l-4"
          style={{ borderLeftColor: stat.color.replace('bg-', '') }}
        >
          <h3 className="text-gray-600 text-sm font-medium mb-2">{stat.label}</h3>
          <p className="text-3xl font-bold text-gray-800">{stat.value}</p>
        </div>
      ))}
    </div>
  )
}

export default Stats
