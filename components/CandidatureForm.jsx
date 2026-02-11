'use client'

import React, { useState } from 'react'
import { useRouter } from 'next/navigation'

export const CandidatureForm = ({ candidature = null }) => {
  const router = useRouter()
  const isEditing = !!candidature

  const [formData, setFormData] = useState({
    entreprise: candidature?.entreprise || '',
    poste: candidature?.poste || '',
    lienOffre: candidature?.lienOffre || '',
    dateEnvoi: candidature?.dateEnvoi 
      ? new Date(candidature.dateEnvoi).toISOString().split('T')[0] 
      : new Date().toISOString().split('T')[0],
    statut: candidature?.statut || 'En attente',
    dateRelance: candidature?.dateRelance 
      ? new Date(candidature.dateRelance).toISOString().split('T')[0] 
      : '',
  })

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const url = isEditing 
        ? `/api/candidatures/${candidature._id}` 
        : '/api/candidatures'
      
      const method = isEditing ? 'PUT' : 'POST'

      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Erreur lors de l\'enregistrement')
      }

      // Rediriger vers l'accueil après succès
      router.push('/accueil')
      router.refresh()
    } catch (err) {
      setError(err.message)
      console.error('Erreur:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold text-gray-900 mb-6">
        {isEditing ? 'Modifier la candidature' : 'Ajouter une candidature'}
      </h2>

      {error && (
        <div className="mb-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      )}

      <div className="space-y-6">
        {/* Entreprise */}
        <div>
          <label htmlFor="entreprise" className="block text-sm font-medium text-gray-700 mb-2">
            Entreprise <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="entreprise"
            name="entreprise"
            value={formData.entreprise}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="Ex: Google"
          />
        </div>

        {/* Poste */}
        <div>
          <label htmlFor="poste" className="block text-sm font-medium text-gray-700 mb-2">
            Poste <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            id="poste"
            name="poste"
            value={formData.poste}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="Ex: Développeur Full Stack"
          />
        </div>

        {/* Lien de l'offre */}
        <div>
          <label htmlFor="lienOffre" className="block text-sm font-medium text-gray-700 mb-2">
            Lien de l'offre
          </label>
          <input
            type="url"
            id="lienOffre"
            name="lienOffre"
            value={formData.lienOffre}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
            placeholder="https://exemple.com/offre"
          />
        </div>

        {/* Date d'envoi */}
        <div>
          <label htmlFor="dateEnvoi" className="block text-sm font-medium text-gray-700 mb-2">
            Date d'envoi <span className="text-red-500">*</span>
          </label>
          <input
            type="date"
            id="dateEnvoi"
            name="dateEnvoi"
            value={formData.dateEnvoi}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </div>

        {/* Statut */}
        <div>
          <label htmlFor="statut" className="block text-sm font-medium text-gray-700 mb-2">
            Statut <span className="text-red-500">*</span>
          </label>
          <select
            id="statut"
            name="statut"
            value={formData.statut}
            onChange={handleChange}
            required
            className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          >
            <option value="En attente">En attente</option>
            <option value="Acceptée">Acceptée</option>
            <option value="Refusée">Refusée</option>
          </select>
        </div>

        {/* Date de relance */}
        <div>
          <label htmlFor="dateRelance" className="block text-sm font-medium text-gray-700 mb-2">
            Date de relance (optionnelle)
          </label>
          <input
            type="date"
            id="dateRelance"
            name="dateRelance"
            value={formData.dateRelance}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-500 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
          />
        </div>
      </div>

      {/* Boutons */}
      <div className="flex gap-4 mt-8">
        <button
          type="submit"
          disabled={loading}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Enregistrement...' : (isEditing ? 'Modifier' : 'Ajouter')}
        </button>
        <button
          type="button"
          onClick={() => router.push('/accueil')}
          className="flex-1 bg-gray-200 text-gray-700 py-3 px-6 rounded-lg font-medium hover:bg-gray-300 transition-colors"
        >
          Annuler
        </button>
      </div>
    </form>
  )
}

export default CandidatureForm
