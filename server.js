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
  title: "Main Council Elections 2026",
  description: "Official election for Student Council positions: Chairman, Vice Chairman, and Secretary. Cast your vote for each category.",
  startDate: new Date(Date.now() - 1000000),
  endDate: new Date(Date.now() + 100000000),
  status: "ACTIVE",
  candidates: [
    { _id: "cand1", name: "Dr. Arvind Subramanian", position: "Chairman", bio: "Current HOD of Computer Science with 15+ years of academic excellence." },
    { _id: "cand2", name: "Prof. Meera Deshmukh", position: "Chairman", bio: "Lead of Student Welfare Committee. Committed to enhancing extracurricular funding." },
    { _id: "cand3", name: "Col. (Retd.) Rajesh Khanna", position: "Chairman", bio: "Ex-Army officer focusing on campus discipline, security, and efficiency." },
    { _id: "cand4", name: "Ananya Iyer", position: "Vice Chairman", bio: "Third-year Engineering student and captain of the debate team." },
    { _id: "cand5", name: "Vikram Malhotra", position: "Vice Chairman", bio: "President of the Cultural Club. Dedicated to organizing bigger university fests." },
    { _id: "cand6", name: "Zoya Siddiqui", position: "Vice Chairman", bio: "Environmental activist. Goal: Make the campus 100% sustainable and green." },
    { _id: "cand7", name: "Siddharth Goel", position: "Secretary", bio: "Data Science enthusiast. Plans to automate the elective selection process." },
    { _id: "cand8", name: "Tanvi Shah", position: "Secretary", bio: "Sports secretary intern. Focused on improving athletic facilities for all students." },
    { _id: "cand9", name: "Rohan Joshi", position: "Secretary", bio: "Library volunteer. Mission: Modernizing the library with e-resources and 24/7 zones." }
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
    // Find existing active election or create one
    let election = await Election.findOne({ status: 'ACTIVE' });
    if (!election) {
      election = await Election.create({
        title: "Main Council Elections 2026",
        description: "Official election for Student Council positions: Chairman, Vice Chairman, and Secretary.",
        startDate: new Date(Date.now() - 1000000),
        endDate: new Date(Date.now() + 100000000),
        status: "ACTIVE",
        candidates: [
          { name: "Dr. Arvind Subramanian", position: "Chairman", bio: "Current HOD of Computer Science with 15+ years of academic excellence.", voteCount: 0 },
          { name: "Prof. Meera Deshmukh", position: "Chairman", bio: "Lead of Student Welfare Committee. Committed to enhancing extracurricular funding.", voteCount: 0 },
          { name: "Col. (Retd.) Rajesh Khanna", position: "Chairman", bio: "Ex-Army officer focusing on campus discipline, security, and efficiency.", voteCount: 0 },
          { name: "Ananya Iyer", position: "Vice Chairman", bio: "Third-year Engineering student and captain of the debate team.", voteCount: 0 },
          { name: "Vikram Malhotra", position: "Vice Chairman", bio: "President of the Cultural Club. Dedicated to organizing bigger university fests.", voteCount: 0 },
          { name: "Zoya Siddiqui", position: "Vice Chairman", bio: "Environmental activist. Goal: Make the campus 100% sustainable and green.", voteCount: 0 },
          { name: "Siddharth Goel", position: "Secretary", bio: "Data Science enthusiast. Plans to automate the elective selection process.", voteCount: 0 },
          { name: "Tanvi Shah", position: "Secretary", bio: "Sports secretary intern. Focused on improving athletic facilities for all students.", voteCount: 0 },
          { name: "Rohan Joshi", position: "Secretary", bio: "Library volunteer. Mission: Modernizing the library with e-resources and 24/7 zones.", voteCount: 0 }
        ]
      });
    }
    res.json({ success: true, election });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Admin Routes
app.get('/api/admin/elections', adminAuthMiddleware, adminController.getAllElections);
app.get('/api/admin/elections/:electionId/results', adminAuthMiddleware, adminController.getElectionResults);
app.post('/api/admin/elections/:electionId/reset', adminAuthMiddleware, adminController.resetVotes);
app.post('/api/admin/elections/:electionId/add-candidate', adminAuthMiddleware, adminController.addCandidate);

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
