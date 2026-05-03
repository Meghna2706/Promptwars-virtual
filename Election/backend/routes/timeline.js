import express from 'express'

const router = express.Router()

// GET /api/timeline/events
router.get('/events', (req, res) => {
  res.json({
    success: true,
    events: [
      {
        id: 1,
        date: 'January 15, 2026',
        title: 'Registration Opens',
        description: 'Voter registration begins in most states. Check your state\'s specific dates.',
        icon: '📝'
      },
      {
        id: 2,
        date: 'February 28, 2026',
        title: 'Registration Deadline',
        description: 'Last day to register to vote. Don\'t miss this deadline!',
        icon: '⏰'
      },
      {
        id: 3,
        date: 'March 1 - March 31, 2026',
        title: 'Early Voting Period',
        description: 'Many states offer early voting. Check your local polling locations.',
        icon: '🗳️'
      },
      {
        id: 4,
        date: 'April 7, 2026',
        title: 'Election Day',
        description: 'The main election day. Polls open at 7 AM and close at 8 PM.',
        icon: '✓'
      },
      {
        id: 5,
        date: 'April 8 - April 15, 2026',
        title: 'Results & Certification',
        description: 'Election results are counted and certified by state officials.',
        icon: '📊'
      }
    ]
  })
})

// GET /api/timeline/deadlines
router.get('/deadlines', (req, res) => {
  res.json({
    success: true,
    deadlines: [
      { type: 'registration', date: '2026-02-28', description: 'Last day to register' },
      { type: 'early_voting_start', date: '2026-03-01', description: 'Early voting begins' },
      { type: 'early_voting_end', date: '2026-03-31', description: 'Early voting ends' },
      { type: 'election_day', date: '2026-04-07', description: 'Election Day' }
    ]
  })
})

export default router
