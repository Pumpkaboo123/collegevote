const mongoose = require('mongoose');
require('dotenv').config();
const Election = require('./models/Election');

const candidatesData = [
  // Chairman Candidates
  {
    name: "Dr. Arvind Subramanian",
    position: "Chairman",
    bio: "Current HOD of Computer Science with 15+ years of academic excellence. Seeking to bring digital transformation to campus management.",
    voteCount: 0
  },
  {
    name: "Prof. Meera Deshmukh",
    position: "Chairman",
    bio: "Lead of Student Welfare Committee. Committed to enhancing extracurricular funding and industrial tie-ups.",
    voteCount: 0
  },
  {
    name: "Col. (Retd.) Rajesh Khanna",
    position: "Chairman",
    bio: "Ex-Army officer focusing on campus discipline, security, and administrative efficiency.",
    voteCount: 0
  },
  
  // Vice Chairman Candidates
  {
    name: "Ananya Iyer",
    position: "Vice Chairman",
    bio: "Third-year Engineering student and captain of the debate team. Aiming for better student-faculty dialogue.",
    voteCount: 0
  },
  {
    name: "Vikram Malhotra",
    position: "Vice Chairman",
    bio: "President of the Cultural Club. Dedicated to organizing bigger, better university fests and events.",
    voteCount: 0
  },
  {
    name: "Zoya Siddiqui",
    position: "Vice Chairman",
    bio: "Environmental activist. Goal: Make the campus 100% sustainable and green within two years.",
    voteCount: 0
  },

  // Secretary Candidates
  {
    name: "Siddharth Goel",
    position: "Secretary",
    bio: "Data Science enthusiast. Plans to automate the elective selection process and grievance portal.",
    voteCount: 0
  },
  {
    name: "Tanvi Shah",
    position: "Secretary",
    bio: "Sports secretary intern. Focused on improving athletic facilities and gym equipment for all students.",
    voteCount: 0
  },
  {
    name: "Rohan Joshi",
    position: "Secretary",
    bio: "Library volunteer. Mission: Modernizing the library with more e-resources and 24/7 study zones.",
    voteCount: 0
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    // Create a new election or update the existing one
    const electionTitle = "Main Council Elections 2026";
    let election = await Election.findOne({ title: electionTitle });

    if (election) {
      console.log('Updating existing election...');
      election.candidates = candidatesData;
      await election.save();
    } else {
      console.log('Creating new election...');
      election = await Election.create({
        title: electionTitle,
        description: "Official election for Student Council positions: Chairman, Vice Chairman, and Secretary. Cast your vote for each category to ensure fair representation.",
        startDate: new Date(),
        endDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days from now
        status: "ACTIVE",
        candidates: candidatesData
      });
    }

    console.log('Successfully seeded candidates for Chairman, Vice Chairman, and Secretary!');
    process.exit();
  } catch (err) {
    console.error('Seeding error:', err);
    process.exit(1);
  }
}

seed();
