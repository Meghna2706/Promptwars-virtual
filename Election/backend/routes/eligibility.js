import express from 'express'

const router = express.Router()

// POST /api/eligibility/check
router.post('/check', (req, res) => {
  try {
    const { age, isCitizen, residencyMonths, mentallyCompetent, hasActiveFelony } = req.body

    // Validation
    if (age === undefined || isCitizen === undefined || residencyMonths === undefined) {
      return res.status(400).json({ error: 'Missing required fields' })
    }

    // Check eligibility
    const requirements = []
    const issues = []

    // Age check
    if (age >= 18) {
      requirements.push('✓ You are at least 18 years old')
    } else {
      issues.push('You must be at least 18 years old to vote')
    }

    // Citizenship check
    if (isCitizen) {
      requirements.push('✓ You are a U.S. citizen')
    } else {
      issues.push('You must be a U.S. citizen to vote')
    }

    // Residency check
    if (residencyMonths >= 30) {
      requirements.push(`✓ You have lived in your state for ${residencyMonths} days`)
    } else {
      issues.push(`You must have lived in your state for at least 30 days (currently ${residencyMonths} days)`)
    }

    // Mental competency check
    if (mentallyCompetent) {
      requirements.push('✓ You are mentally competent')
    } else {
      issues.push('You must be mentally competent to vote')
    }

    // Felony check
    if (!hasActiveFelony) {
      requirements.push('✓ You do not have an active felony conviction')
    } else {
      issues.push('You cannot vote if you have an active felony conviction')
    }

    // Determine eligibility
    const isEligible = issues.length === 0

    res.json({
      success: true,
      isEligible,
      message: isEligible ? 'You are eligible to vote!' : 'You are not eligible to vote at this time',
      requirements,
      issues,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to check eligibility', details: error.message })
  }
})

// GET /api/eligibility/requirements
router.get('/requirements', (req, res) => {
  res.json({
    success: true,
    requirements: [
      { id: 1, title: 'Age', description: 'You must be at least 18 years old' },
      { id: 2, title: 'Citizenship', description: 'You must be a U.S. citizen' },
      { id: 3, title: 'Residency', description: 'You must have lived in your state for at least 30 days' },
      { id: 4, title: 'Mental Competency', description: 'You must be mentally competent' },
      { id: 5, title: 'Felony Status', description: 'You cannot have an active felony conviction' }
    ]
  })
})

export default router
