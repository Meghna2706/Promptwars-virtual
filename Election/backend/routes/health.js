import express from 'express'

const router = express.Router()

// Health check endpoint
router.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'Election Assistant Backend is running',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

export default router
