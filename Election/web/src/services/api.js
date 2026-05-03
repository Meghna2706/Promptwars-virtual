const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api'

export const api = {
  // Chat endpoints
  chat: {
    sendMessage: async (message) => {
      const response = await fetch(`${API_BASE_URL}/chat/message`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message })
      })
      if (!response.ok) throw new Error('Failed to send message')
      return response.json()
    },
    getHistory: async () => {
      const response = await fetch(`${API_BASE_URL}/chat/history`)
      if (!response.ok) throw new Error('Failed to get chat history')
      return response.json()
    }
  },

  // Eligibility endpoints
  eligibility: {
    check: async (formData) => {
      const response = await fetch(`${API_BASE_URL}/eligibility/check`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      })
      if (!response.ok) throw new Error('Failed to check eligibility')
      return response.json()
    },
    getRequirements: async () => {
      const response = await fetch(`${API_BASE_URL}/eligibility/requirements`)
      if (!response.ok) throw new Error('Failed to get requirements')
      return response.json()
    }
  },

  // Timeline endpoints
  timeline: {
    getEvents: async () => {
      const response = await fetch(`${API_BASE_URL}/timeline/events`)
      if (!response.ok) throw new Error('Failed to get timeline events')
      return response.json()
    },
    getDeadlines: async () => {
      const response = await fetch(`${API_BASE_URL}/timeline/deadlines`)
      if (!response.ok) throw new Error('Failed to get deadlines')
      return response.json()
    }
  },

  // Guide endpoints
  guide: {
    getSteps: async () => {
      const response = await fetch(`${API_BASE_URL}/guide/steps`)
      if (!response.ok) throw new Error('Failed to get guide steps')
      return response.json()
    },
    getFAQ: async () => {
      const response = await fetch(`${API_BASE_URL}/guide/faq`)
      if (!response.ok) throw new Error('Failed to get FAQ')
      return response.json()
    }
  }
}

export default api
