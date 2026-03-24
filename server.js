const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const votingController = require('./controllers/votingController');
const adminController = require('./controllers/adminController');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

const authMiddleware = (req, res, next) => {
  // In a real app, this would verify the OAuth token and find the user in DB
  req.user = { id: '60d5f1f2f1b2c86b2089f6e1', email: 'voter@college.edu', role: 'STUDENT' };
  next();
};

// Mock Admin Auth Middleware
const adminAuthMiddleware = (req, res, next) => {
  req.user = { id: '60d5f1f2f1b2c86b2089f6ea', email: 'admin@college.edu', role: 'ADMIN' };
  next();
};

// Mock Election for Disconnected Mode
const mockElection = {
  _id: "mock-id-123",
  title: "Student Body President 2026",
  description: "College-wide election for the post of President.",
  startDate: new Date(Date.now() - 1000000),
  endDate: new Date(Date.now() + 100000000),
  status: "ACTIVE",
  candidates: [
    { _id: "cand1", name: "John Doe", bio: "Computer Science Junior" },
    { _id: "cand2", name: "Jane Smith", bio: "Economics Senior" }
  ],
  votersParticipated: []
};

// Routes
app.get('/', (req, res) => {
  res.json({
    message: 'College Voting API is running',
    healthCheck: '/health',
    frontend: 'http://localhost:3000'
  });
});

app.post('/api/elections/:electionId/vote', authMiddleware, (req, res, next) => {
  if (!process.env.MONGODB_URI) {
    const studentId = req.user.id;
    if (mockElection.votersParticipated.includes(studentId)) {
      return res.status(403).json({ success: false, message: "Unable to cast vote. You may have already voted." });
    }
    mockElection.votersParticipated.push(studentId);
    return res.status(200).json({ success: true, message: "Your vote has been cast successfully! (Mock Mode)" });
  }
  next();
}, votingController.submitVote);

// Temporary Seeder route for testing
app.post('/api/seed-election', async (req, res) => {
  if (!process.env.MONGODB_URI) {
    return res.json({ success: true, election: mockElection });
  }
  try {
    const Election = require('./models/Election');
    const newElection = await Election.create({
      title: "Student Body President 2026",
      description: "College-wide election for the post of President.",
      startDate: new Date(Date.now() - 1000000), // Started
      endDate: new Date(Date.now() + 100000000), // Ongoing
      status: "ACTIVE",
      candidates: [
        { name: "John Doe", bio: "Computer Science Junior", voteCount: 5 },
        { name: "Jane Smith", bio: "Economics Senior", voteCount: 3 }
      ],
      votersParticipated: [new mongoose.Types.ObjectId(), new mongoose.Types.ObjectId()] // Simulated participation
    });
    res.json({ success: true, election: newElection });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Routes
app.get('/api/admin/elections', adminAuthMiddleware, adminController.getAllElections);
app.get('/api/admin/elections/:electionId/results', adminAuthMiddleware, adminController.getElectionResults);
app.post('/api/admin/elections/:electionId/reset', adminAuthMiddleware, adminController.resetVotes);

// Health Check
app.get('/health', (req, res) => res.send('College Voting API is running...'));

// Database Connection & Server Start
if (process.env.MONGODB_URI) {
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    })
    .catch(err => console.error('MongoDB connection error:', err));
} else {
  console.log('Skipping MongoDB connection - set MONGODB_URI in .env');
  app.listen(PORT, () => console.log(`Server running on port ${PORT} (Disconnected Mode)`));
}

module.exports = app; // Export for testing
