import { useState } from 'react'
import api from '../services/api'

export default function useEligibilityChecker() {
  const [formData, setFormData] = useState({
    age: '',
    isCitizen: false,
    residencyMonths: '',
    mentallyCompetent: false,
    hasActiveFelony: false,
  })
  const [result, setResult] = useState(null)
  const [hasSubmitted, setHasSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setHasSubmitted(true)

    // Validate required fields
    if (!formData.age || formData.residencyMonths === '') {
      setResult(null)
      return
    }

    setLoading(true)
    setError(null)
    try {
      const eligibilityResult = await api.eligibility.check(formData)
      setResult(eligibilityResult)
    } catch (err) {
      setError('Failed to check eligibility. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = () => {
    setFormData({
      age: '',
      isCitizen: false,
      residencyMonths: '',
      mentallyCompetent: false,
      hasActiveFelony: false,
    })
    setResult(null)
    setHasSubmitted(false)
    setError(null)
  }

  return {
    formData,
    result,
    hasSubmitted,
    loading,
    error,
    handleInputChange,
    handleSubmit,
    handleReset,
  }
}
