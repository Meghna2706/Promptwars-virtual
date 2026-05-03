import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import bodyParser from 'body-parser'
import chatRoutes from './routes/chat.js'
import eligibilityRoutes from './routes/eligibility.js'
import timelineRoutes from './routes/timeline.js'
import guideRoutes from './routes/guide.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173',
  credentials: true
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Election Assistant Backend is running' })
})

// API Routes
app.use('/api/chat', chatRoutes)
app.use('/api/eligibility', eligibilityRoutes)
app.use('/api/timeline', timelineRoutes)
app.use('/api/guide', guideRoutes)

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack)
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong'
  })
})

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: 'Not Found', message: 'Endpoint not found' })
})

app.listen(PORT, () => {
  console.log(`Election Assistant Backend running on port ${PORT}`)
  console.log(`Environment: ${process.env.NODE_ENV}`)
})
