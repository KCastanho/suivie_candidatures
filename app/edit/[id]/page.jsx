'use client'

import { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { CandidatureForm } from '@/components/CandidatureForm'

export default function EditPage() {
  const params = useParams()
  const [candidature, setCandidature] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchCandidature = async () => {
      try {
        const response = await fetch(`/api/candidatures/${params.id}`)
        if (!response.ok) {
          throw new Error('Candidature non trouvée')
        }
        const data = await response.json()
        setCandidature(data)
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchCandidature()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-red-100 border border-red-400 text-red-700 px-6 py-4 rounded-lg">
          <p className="font-bold mb-2">Erreur</p>
          <p>{error}</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Modifier la candidature
          </h1>
          <p className="text-gray-600">
            Modifiez les informations de votre candidature
          </p>
        </div>
        
        {candidature && <CandidatureForm candidature={candidature} />}
      </div>
    </div>
  )
}
