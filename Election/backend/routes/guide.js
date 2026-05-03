import express from 'express'

const router = express.Router()

// GET /api/guide/steps
router.get('/steps', (req, res) => {
  res.json({
    success: true,
    steps: [
      {
        stepNumber: 1,
        title: 'Register to Vote',
        description: 'Check your registration status and register if needed. Most states allow online registration.',
        icon: '📝'
      },
      {
        stepNumber: 2,
        title: 'Verify Your Information',
        description: 'Make sure your voter registration information is correct and up to date.',
        icon: '✓'
      },
      {
        stepNumber: 3,
        title: 'Find Your Polling Location',
        description: 'Locate your assigned polling place. You can find this on your voter registration card or online.',
        icon: '📍'
      },
      {
        stepNumber: 4,
        title: 'Prepare Your ID',
        description: 'Bring a valid photo ID to your polling location. Requirements vary by state.',
        icon: '🆔'
      },
      {
        stepNumber: 5,
        title: 'Research Candidates',
        description: 'Learn about the candidates and issues on your ballot before election day.',
        icon: '📚'
      },
      {
        stepNumber: 6,
        title: 'Vote Early or on Election Day',
        description: 'Choose to vote early or on election day. Both options are available in most states.',
        icon: '🗳️'
      },
      {
        stepNumber: 7,
        title: 'Confirm Your Vote',
        description: 'Review your ballot before submitting. Make sure all your choices are correct.',
        icon: '👀'
      },
      {
        stepNumber: 8,
        title: 'Submit Your Ballot',
        description: 'Cast your vote and receive your "I Voted" sticker. Your vote counts!',
        icon: '✨'
      }
    ]
  })
})

// GET /api/guide/faq
router.get('/faq', (req, res) => {
  res.json({
    success: true,
    faqs: [
      {
        id: 1,
        question: 'Can I vote if I\'m not registered?',
        answer: 'No, you must be registered to vote. Registration deadlines vary by state, so register early.'
      },
      {
        id: 2,
        question: 'What ID do I need?',
        answer: 'Requirements vary by state. Most accept driver\'s licenses, passports, or state ID cards.'
      },
      {
        id: 3,
        question: 'Can I vote early?',
        answer: 'Yes, most states offer early voting. Check your state\'s specific dates and locations.'
      },
      {
        id: 4,
        question: 'Can I vote by mail?',
        answer: 'Many states offer mail-in voting. Contact your local election office for details.'
      },
      {
        id: 5,
        question: 'What if I make a mistake on my ballot?',
        answer: 'Ask a poll worker for a new ballot. You can correct mistakes before submitting.'
      },
      {
        id: 6,
        question: 'Is my vote private?',
        answer: 'Yes, voting is private and confidential. Your choices are not shared with anyone.'
      }
    ]
  })
})

export default router
