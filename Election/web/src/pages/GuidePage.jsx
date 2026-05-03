import GuideStep from '../components/features/GuideStep'
import Container from '../components/layout/Container'

export default function GuidePage() {
  const steps = [
    {
      stepNumber: 1,
      title: 'Register to Vote',
      description: 'Check your registration status and register if needed. Most states allow online registration.',
      icon: '📝',
    },
    {
      stepNumber: 2,
      title: 'Verify Your Information',
      description: 'Make sure your voter registration information is correct and up to date.',
      icon: '✓',
    },
    {
      stepNumber: 3,
      title: 'Find Your Polling Location',
      description: 'Locate your assigned polling place. You can find this on your voter registration card or online.',
      icon: '📍',
    },
    {
      stepNumber: 4,
      title: 'Prepare Your ID',
      description: 'Bring a valid photo ID to your polling location. Requirements vary by state.',
      icon: '🆔',
    },
    {
      stepNumber: 5,
      title: 'Research Candidates',
      description: 'Learn about the candidates and issues on your ballot before election day.',
      icon: '📚',
    },
    {
      stepNumber: 6,
      title: 'Vote Early or on Election Day',
      description: 'Choose to vote early or on election day. Both options are available in most states.',
      icon: '🗳️',
    },
    {
      stepNumber: 7,
      title: 'Confirm Your Vote',
      description: 'Review your ballot before submitting. Make sure all your choices are correct.',
      icon: '👀',
    },
    {
      stepNumber: 8,
      title: 'Submit Your Ballot',
      description: 'Cast your vote and receive your "I Voted" sticker. Your vote counts!',
      icon: '✨',
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Header */}
      <div className="bg-gradient-secondary text-white py-8 shadow-lg">
        <Container>
          <h1 className="text-4xl font-bold mb-2">Voting Guide</h1>
          <p className="text-blue-100">Step-by-step instructions to prepare for voting</p>
        </Container>
      </div>

      {/* Steps */}
      <div className="py-12">
        <Container maxWidth="max-w-3xl">
          <div className="space-y-6">
            {steps.map((step) => (
              <GuideStep
                key={step.stepNumber}
                stepNumber={step.stepNumber}
                title={step.title}
                description={step.description}
                icon={step.icon}
              />
            ))}
          </div>
        </Container>
      </div>

      {/* FAQ Section */}
      <section className="py-12 bg-gray-50 border-t border-gray-200">
        <Container>
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Frequently Asked Questions</h2>

          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can I vote if I'm not registered?</h3>
              <p className="text-gray-600">No, you must be registered to vote. Registration deadlines vary by state, so register early.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What ID do I need?</h3>
              <p className="text-gray-600">Requirements vary by state. Most accept driver's licenses, passports, or state ID cards.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can I vote early?</h3>
              <p className="text-gray-600">Yes, most states offer early voting. Check your state's specific dates and locations.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Can I vote by mail?</h3>
              <p className="text-gray-600">Many states offer mail-in voting. Contact your local election office for details.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">What if I make a mistake on my ballot?</h3>
              <p className="text-gray-600">Ask a poll worker for a new ballot. You can correct mistakes before submitting.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-md p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-2">Is my vote private?</h3>
              <p className="text-gray-600">Yes, voting is private and confidential. Your choices are not shared with anyone.</p>
            </div>
          </div>
        </Container>
      </section>
    </div>
  )
}
