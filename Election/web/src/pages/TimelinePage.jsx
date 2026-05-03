import { useState, useEffect } from 'react'
import TimelineEvent from '../components/features/TimelineEvent'
import Container from '../components/layout/Container'
import LoadingState from '../components/common/LoadingState'
import api from '../services/api'

export default function TimelinePage() {
  const [events, setEvents] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const data = await api.timeline.getEvents()
        setEvents(data)
      } catch (err) {
        setError('Failed to load timeline events. Please try again later.')
        console.error(err)
        // Fallback data if API fails
        setEvents([
          {
            date: 'January 15, 2026',
            title: 'Registration Opens',
            description: 'Voter registration begins in most states. Check your state\'s specific dates.',
            icon: '📝',
          },
          {
            date: 'February 28, 2026',
            title: 'Registration Deadline',
            description: 'Last day to register to vote. Don\'t miss this deadline!',
            icon: '⏰',
          },
          {
            date: 'March 1 - March 31, 2026',
            title: 'Early Voting Period',
            description: 'Many states offer early voting. Check your local polling locations.',
            icon: '🗳️',
          },
          {
            date: 'April 7, 2026',
            title: 'Election Day',
            description: 'The main election day. Polls open at 7 AM and close at 8 PM.',
            icon: '✓',
          },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-accent text-white py-8 shadow-lg">
        <Container>
          <h1 className="text-4xl font-bold mb-2">Election Timeline</h1>
          <p className="text-cyan-100">Important dates and deadlines</p>
        </Container>
      </div>

      {/* Timeline */}
      <div className="py-12">
        <Container maxWidth="max-w-2xl">
          {loading ? (
            <LoadingState message="Loading timeline..." />
          ) : error ? (
            <div className="p-4 bg-red-50 border-2 border-error rounded-lg mb-6">
              <p className="text-error">{error}</p>
            </div>
          ) : null}
          
          <div className="space-y-2">
            {events.map((event, idx) => (
              <TimelineEvent
                key={idx}
                date={event.date}
                title={event.title}
                description={event.description}
                icon={event.icon || '📅'}
                isLast={idx === events.length - 1}
              />
            ))}
          </div>
        </Container>
      </div>

      {/* Info Section */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <Container>
          <div className="bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-4">Important Notes</h2>
            <ul className="space-y-3 text-gray-600">
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Dates vary by state. Check your state election office for specific deadlines.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Early voting periods may differ. Some states offer mail-in voting options.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Make sure you're registered before the registration deadline.</span>
              </li>
              <li className="flex gap-3">
                <span className="text-primary font-bold">•</span>
                <span>Bring valid ID to your polling location on election day.</span>
              </li>
            </ul>
          </div>
        </Container>
      </section>
    </div>
  )
}
