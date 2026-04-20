const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');
const path = require('path');
const apiRoutes = require('./routes/api');
const { simulateData } = require('./data/simulator');

const app = express();
const server = http.createServer(app);

// Configure CORS for Express and Socket.io
app.use(cors());
app.use(express.json());

const io = new Server(server, {
  cors: {
    origin: '*', // Allow all for development
    methods: ['GET', 'POST']
  }
});

// API Routes
app.use('/api', apiRoutes);

// Socket.io connection handling
io.on('connection', (socket) => {
  console.log(`Client connected: ${socket.id}`);

  socket.on('disconnect', () => {
    console.log(`Client disconnected: ${socket.id}`);
  });
});

// Start the data simulation loop
simulateData(io);

// Serve frontend in production (Docker setup)
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/dist')));
  app.use((req, res, next) => {
    if (req.path.startsWith('/api')) return next();
    res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
