import { useState, useRef, useEffect } from 'react'
import ChatMessage from '../components/features/ChatMessage'
import LoadingState from '../components/common/LoadingState'
import EmptyState from '../components/common/EmptyState'
import Input from '../components/common/Input'
import Button from '../components/common/Button'
import Container from '../components/layout/Container'
import api from '../services/api'

export default function ChatPage() {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hi! I\'m your Election Assistant. How can I help you today?', role: 'assistant' },
    { id: 2, text: 'What are the registration deadlines?', role: 'user' },
    { id: 3, text: 'Registration deadlines vary by state. Most states require registration 15-30 days before Election Day. Would you like me to check the deadline for your state?', role: 'assistant' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const messagesEndRef = useRef(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const handleSendMessage = async (e) => {
    e.preventDefault()
    if (input.trim() === '') return

    const userMessage = {
      id: messages.length + 1,
      text: input,
      role: 'user',
    }
    setMessages([...messages, userMessage])
    setInput('')
    setLoading(true)
    setError('')

    try {
      const response = await api.chat.sendMessage(input)
      const botResponse = {
        id: messages.length + 2,
        text: response.message,
        role: 'assistant',
      }
      setMessages((prev) => [...prev, botResponse])
    } catch (err) {
      setError('Failed to get response. Please try again.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white flex flex-col">
      {/* Header */}
      <div className="bg-gradient-primary text-white py-8 shadow-lg">
        <Container>
          <h1 className="text-4xl font-bold mb-2">Election Assistant Chat</h1>
          <p className="text-blue-100">Ask questions about voting and elections</p>
        </Container>
      </div>

      {/* Messages Container */}
      <div className="flex-1 overflow-y-auto py-8">
        <Container maxWidth="max-w-2xl">
          {messages.length === 0 ? (
            <EmptyState
              icon="💬"
              title="Start a conversation"
              message="Ask me anything about voting, elections, or registration deadlines."
            />
          ) : (
            <div className="space-y-4">
              {error && (
                <div className="p-4 bg-red-50 border-2 border-error rounded-lg">
                  <p className="text-error text-sm">{error}</p>
                </div>
              )}
              {messages.map((msg) => (
                <ChatMessage
                  key={msg.id}
                  message={msg.text}
                  role={msg.role}
                />
              ))}
              {loading && <LoadingState message="Generating response..." size="md" />}
              <div ref={messagesEndRef} />
            </div>
          )}
        </Container>
      </div>

      {/* Input Area */}
      <div className="bg-white border-t-2 border-gray-200 py-6 shadow-lg">
        <Container maxWidth="max-w-2xl">
          <form onSubmit={handleSendMessage} className="space-y-3">
            <div className="flex gap-3">
              <Input
                type="text"
                value={input}
                onChange={setInput}
                placeholder="Ask me anything about voting..."
                disabled={loading}
              />
              <Button
                type="submit"
                variant="primary"
                size="md"
                disabled={loading}
                loading={loading}
              >
                Send
              </Button>
            </div>
            <p className="text-gray-500 text-xs">
              💡 Tip: Ask about registration deadlines, voting locations, or eligibility requirements
            </p>
          </form>
        </Container>
      </div>
    </div>
  )
}
