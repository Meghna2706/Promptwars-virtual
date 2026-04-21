const express = require('express');
const router = express.Router();
const { stadiumState } = require('../data/simulator');

// Get initial stadium state
router.get('/stadium-state', (req, res) => {
  res.json(stadiumState);
});

// Get upcoming events
router.get('/events', (req, res) => {
  const events = [
    {
      id: 'evt-1',
      title: 'T20 Finals: Super Kings vs Titans',
      date: 'Today, 7:30 PM',
      venue: 'Global Arena Stadium',
      image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'Live',
      ticketsAvailable: false
    },
    {
      id: 'evt-2',
      title: 'Global Pop Icon Concert',
      date: 'Tomorrow, 8:00 PM',
      venue: 'Global Arena Stadium',
      image: 'https://images.unsplash.com/photo-1470229722913-7c090be5c560?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'Upcoming',
      ticketsAvailable: true
    },
    {
      id: 'evt-3',
      title: 'Football Championship Semi-Finals',
      date: 'Oct 25, 6:00 PM',
      venue: 'Global Arena Stadium',
      image: 'https://images.unsplash.com/photo-1518605368461-1ee125232671?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      status: 'Upcoming',
      ticketsAvailable: true
    }
  ];
  res.json(events);
});

// Mock endpoint for seat booking
router.post('/book-seat', (req, res) => {
  const { eventId, seats } = req.body;
  
  if (!eventId || !seats || seats.length === 0) {
    return res.status(400).json({ error: 'Invalid booking data' });
  }

  // In a real app, this would update the DB and handle concurrent bookings
  res.json({ success: true, message: `Successfully booked ${seats.length} seats.`, bookingId: `BK-${Date.now()}` });
});

module.exports = router;
