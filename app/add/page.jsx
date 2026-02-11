'use client'

import { CandidatureForm } from "@/components/CandidatureForm"

export default function AddPage() {
  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Ajouter une candidature
          </h1>
          <p className="text-gray-600">
            Remplissez le formulaire ci-dessous pour ajouter une nouvelle candidature
          </p>
        </div>
        
        <CandidatureForm />
      </div>
    </div>
  )
}