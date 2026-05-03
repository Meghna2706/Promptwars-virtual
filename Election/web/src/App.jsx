import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import ChatPage from './pages/ChatPage'
import EligibilityPage from './pages/EligibilityPage'
import TimelinePage from './pages/TimelinePage'
import GuidePage from './pages/GuidePage'

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/chat" element={<ChatPage />} />
        <Route path="/eligibility" element={<EligibilityPage />} />
        <Route path="/timeline" element={<TimelinePage />} />
        <Route path="/guide" element={<GuidePage />} />
      </Routes>
    </div>
  )
}
