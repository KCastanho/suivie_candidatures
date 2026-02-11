'use client'

import React, { useState, useEffect } from 'react'
import CandidatureCard from '@/components/CandidatureCard'
import Stats from '@/components/Stats'
import Filters from '@/components/Filters'

const DashboardPage = () => {
  const [candidatures, setCandidatures] = useState([])
  const [filteredCandidatures, setFilteredCandidatures] = useState([])
  const [currentFilter, setCurrentFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Charger les candidatures depuis l'API
  useEffect(() => {
    const fetchCandidatures = async () => {
      try {
        setLoading(true)
        const response = await fetch('/api/candidatures')
        
        if (!response.ok) {
          throw new Error('Erreur lors du chargement des candidatures')
        }
        
        const data = await response.json()
        console.log('Candidatures chargées:', data)
        
        // Si aucune candidature, utiliser des données de test
        if (!data || data.length === 0) {
          console.log('Aucune candidature trouvée, utilisation de données de test')
          const testData = [
            {
              _id: '1',
              entreprise: 'Google',
              poste: 'Développeur Full Stack',
              lienOffre: 'https://google.com',
              dateEnvoi: new Date('2024-01-15'),
              statut: 'En attente',
              dateRelance: new Date('2024-02-01')
            },
            {
              _id: '2',
              entreprise: 'Microsoft',
              poste: 'Ingénieur Logiciel',
              lienOffre: 'https://microsoft.com',
              dateEnvoi: new Date('2024-01-20'),
              statut: 'Acceptée'
            },
            {
              _id: '3',
              entreprise: 'Amazon',
              poste: 'DevOps Engineer',
              dateEnvoi: new Date('2024-01-25'),
              statut: 'Refusée'
            }
          ]
          setCandidatures(testData)
          setFilteredCandidatures(testData)
        } else {
          setCandidatures(data)
          setFilteredCandidatures(data)
        }
      } catch (err) {
        setError(err.message)
        console.error('Erreur:', err)
      } finally {
        setLoading(false)
      }
    }

    fetchCandidatures()
  }, [])

  // Filtrer les candidatures selon le filtre sélectionné
  useEffect(() => {
    if (currentFilter === 'all') {
      setFilteredCandidatures(candidatures)
    } else {
      setFilteredCandidatures(
        candidatures.filter((c) => c.statut === currentFilter)
      )
    }
  }, [currentFilter, candidatures])

  const handleFilterChange = (filter) => {
    setCurrentFilter(filter)
  }

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Chargement des candidatures...</p>
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
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Tableau de bord
          </h1>
          <p className="text-gray-600">
            Gérez et suivez vos candidatures en un coup d'œil
          </p>
        </div>

        <Stats candidatures={candidatures} />
        
        <Filters 
          currentFilter={currentFilter} 
          onFilterChange={handleFilterChange} 
        />
        
        <CandidatureCard candidatures={filteredCandidatures} />
      </div>
    </div>
  )
}

export default DashboardPage