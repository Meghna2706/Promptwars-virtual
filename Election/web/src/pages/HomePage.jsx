import { useNavigate } from 'react-router-dom'
import Button from '../components/common/Button'
import Card from '../components/common/Card'
import FeatureCard from '../components/features/FeatureCard'
import HeroSection from '../components/features/HeroSection'
import PollingMap from '../components/features/PollingMap'
import Container from '../components/layout/Container'

export default function HomePage() {
  const navigate = useNavigate()

  const features = [
    {
      icon: '💬',
      title: 'AI Chat',
      description: 'Ask questions about voting and elections. Get instant answers.',
    },
    {
      icon: '📅',
      title: 'Timeline',
      description: 'Important dates, deadlines, and key milestones.',
    },
    {
      icon: '✓',
      title: 'Eligibility',
      description: 'Check if you\'re eligible to vote in your area.',
    },
    {
      icon: '👣',
      title: 'Voting Guide',
      description: 'Step-by-step instructions on how to vote.',
    },
  ]

  const benefits = [
    {
      icon: '🔒',
      title: 'Secure & Private',
      description: 'Your information is kept private. We don\'t store personal data.',
    },
    {
      icon: '🌐',
      title: 'Easy to Use',
      description: 'Simple, intuitive interface accessible from any device.',
    },
    {
      icon: '⚡',
      title: 'Fast & Reliable',
      description: 'Get instant answers to all your election questions.',
    },
  ]

  return (
    <div className="bg-white">
      {/* Hero Section */}
      <HeroSection
        title="Your Guide to Voting"
        subtitle="Get informed about the upcoming election with AI-powered assistance."
        description="Find registration deadlines, verify your eligibility, and learn how to vote."
        icon="🗳️"
        backgroundGradient="bg-gradient-primary"
        buttons={[
          { label: 'Start Chat →', onClick: () => navigate('/chat'), variant: 'secondary' },
          { label: 'Learn More', onClick: () => window.scrollTo(0, 500), variant: 'outline' },
        ]}
      />

      {/* Stats Section */}
      <section className="py-12 bg-gray-50 border-b border-gray-200">
        <Container>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Card className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">45</div>
              <p className="text-gray-600">Days to Election</p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl font-bold text-success mb-2">✓</div>
              <p className="text-gray-600">Check Your Status</p>
            </Card>
            <Card className="text-center">
              <div className="text-4xl font-bold text-warning mb-2">📅</div>
              <p className="text-gray-600">Key Dates</p>
            </Card>
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-16">
        <Container>
          <div className="mb-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Features</h2>
            <p className="text-gray-600 text-lg">Everything you need to prepare for the election</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <FeatureCard
                key={idx}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </Container>
      </section>

      {/* Benefits Section */}
      <section className="py-16 bg-gray-50 border-y border-gray-200">
        <Container>
          <h2 className="text-4xl font-bold text-gray-900 mb-12">Why Use Election Assistant?</h2>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((benefit, idx) => (
              <Card key={idx}>
                <div className="text-5xl mb-4">{benefit.icon}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* Map Section */}
      <section className="py-16">
        <Container>
          <PollingMap />
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-16">
        <Container>
          <div className="bg-gradient-primary text-white rounded-2xl p-12 text-center">
            <h2 className="text-4xl font-bold mb-4">Ready to prepare for the election?</h2>
            <p className="text-xl mb-8 opacity-90">Get started with our AI-powered election guide.</p>
            <Button
              variant="secondary"
              size="lg"
              onClick={() => navigate('/chat')}
            >
              Start Now →
            </Button>
          </div>
        </Container>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white border-t border-gray-800">
        <Container className="py-12">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">Election Assistant</h3>
              <p className="text-gray-400">Your guide to voting and elections.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Features</h4>
              <ul className="text-gray-400 space-y-2">
                <li><a href="#" className="hover:text-white transition-smooth">Chat</a></li>
                <li><a href="#" className="hover:text-white transition-smooth">Timeline</a></li>
                <li><a href="#" className="hover:text-white transition-smooth">Eligibility</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Info</h4>
              <ul className="text-gray-400 space-y-2">
                <li><a href="#" className="hover:text-white transition-smooth">Privacy</a></li>
                <li><a href="#" className="hover:text-white transition-smooth">Terms</a></li>
                <li><a href="#" className="hover:text-white transition-smooth">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Election Assistant. All rights reserved.</p>
          </div>
        </Container>
      </footer>
    </div>
  )
}
