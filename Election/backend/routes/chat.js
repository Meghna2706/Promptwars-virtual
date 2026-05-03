import express from 'express'

const router = express.Router()

// Mock AI responses for different topics
const aiResponses = {
  registration: 'Registration deadlines vary by state. Most states require registration 15-30 days before Election Day. You can register online at vote.org or at your local election office.',
  eligibility: 'To vote, you must be a U.S. citizen, at least 18 years old, and a resident of your state for at least 30 days.',
  voting: 'You can vote in person on Election Day, during early voting, or by mail. Check your state\'s website for specific dates and locations.',
  locations: 'To find your polling location, visit vote411.org or your state election office website. You can search by address.',
  id: 'Most states require a valid photo ID to vote. Acceptable IDs include driver\'s licenses, passports, and state ID cards.',
  default: 'That\'s a great question about voting! I\'m here to help. You can ask me about registration, eligibility, voting locations, or the voting process.'
}

// POST /api/chat/message
router.post('/message', (req, res) => {
  try {
    const { message } = req.body

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Invalid message' })
    }

    // Simple keyword matching for mock responses
    const lowerMessage = message.toLowerCase()
    let response = aiResponses.default

    if (lowerMessage.includes('register') || lowerMessage.includes('registration')) {
      response = aiResponses.registration
    } else if (lowerMessage.includes('eligible') || lowerMessage.includes('eligibility')) {
      response = aiResponses.eligibility
    } else if (lowerMessage.includes('vote') || lowerMessage.includes('voting')) {
      response = aiResponses.voting
    } else if (lowerMessage.includes('location') || lowerMessage.includes('polling')) {
      response = aiResponses.locations
    } else if (lowerMessage.includes('id') || lowerMessage.includes('identification')) {
      response = aiResponses.id
    }

    res.json({
      success: true,
      message: response,
      timestamp: new Date().toISOString()
    })
  } catch (error) {
    res.status(500).json({ error: 'Failed to process message', details: error.message })
  }
})

// GET /api/chat/history
router.get('/history', (req, res) => {
  res.json({
    success: true,
    messages: [
      { id: 1, text: 'Hi! I\'m your Election Assistant. How can I help you today?', role: 'assistant' },
      { id: 2, text: 'What are the registration deadlines?', role: 'user' },
      { id: 3, text: 'Registration deadlines vary by state. Most states require registration 15-30 days before Election Day.', role: 'assistant' }
    ]
  })
})

export default router
