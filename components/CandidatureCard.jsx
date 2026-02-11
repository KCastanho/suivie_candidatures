'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

const CandidatureCard = ({ candidatures, onDelete }) => {
  const router = useRouter()
  const [deleting, setDeleting] = useState(null)

  const handleEdit = (id) => {
    router.push(`/edit/${id}`)
  }

  const handleDelete = async (id) => {
    if (!confirm('Êtes-vous sûr de vouloir supprimer cette candidature ?')) {
      return
    }

    try {
      setDeleting(id)
      const response = await fetch(`/api/candidatures/${id}`, {
        method: 'DELETE',
      })

      if (!response.ok) {
        throw new Error('Erreur lors de la suppression')
      }

      // Appeler la fonction de callback pour rafraîchir la liste
      if (onDelete) {
        onDelete(id)
      }
    } catch (error) {
      console.error('Erreur:', error)
      alert('Erreur lors de la suppression de la candidature')
    } finally {
      setDeleting(null)
    }
  }

  const getStatusColor = (statut) => {
    switch (statut) {
      case 'En attente':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300'
      case 'Acceptée':
        return 'bg-green-100 text-green-800 border-green-300'
      case 'Refusée':
        return 'bg-red-100 text-red-800 border-red-300'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300'
    }
  }

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    })
  }

  if (candidatures.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow-md">
        <p className="text-black-500 text-lg">Aucune candidature trouvée</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {candidatures.map((candidature) => (
        <div
          key={candidature._id}
          className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow p-6 border-t-4 border-blue-500"
        >
          <div className="mb-4">
            <h3 className="text-xl font-bold text-gray-800 mb-2">
              {candidature.entreprise}
            </h3>
            <p className="text-gray-600 font-medium">{candidature.poste}</p>
          </div>

          <div className="space-y-2 mb-4">
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium mr-2">Date d'envoi:</span>
              <span>{formatDate(candidature.dateEnvoi)}</span>
            </div>

            {candidature.dateRelance && (
              <div className="flex items-center text-sm text-gray-600">
                <span className="font-medium mr-2">Date de relance:</span>
                <span>{formatDate(candidature.dateRelance)}</span>
              </div>
            )}

            {candidature.lienOffre && (
              <a
                href={candidature.lienOffre}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-sm block"
              >
                Voir l'offre →
              </a>
            )}
          </div>

          <div className="flex items-center justify-between mb-4">
            <span
              className={`px-3 py-1 rounded-full text-sm font-semibold border ${getStatusColor(
                candidature.statut
              )}`}
            >
              {candidature.statut}
            </span>
          </div>
          
          <div className="flex gap-3">
            <button 
              onClick={() => handleEdit(candidature._id)}
              className="flex-1 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
            >
              Modifier
            </button>
            <button 
              onClick={() => handleDelete(candidature._id)}
              disabled={deleting === candidature._id}
              className="flex-1 bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {deleting === candidature._id ? 'Suppression...' : 'Supprimer'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CandidatureCard
