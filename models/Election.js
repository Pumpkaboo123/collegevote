const mongoose = require('mongoose');

const electionSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: String,
  startDate: {
    type: Date,
    required: true
  },
  endDate: {
    type: Date,
    required: true
  },
  candidates: [{
    name: {
      type: String,
      required: true
    },
    bio: String,
    photoUrl: String,
    voteCount: {
      type: Number,
      default: 0
    }
  }],
  status: {
    type: String,
    enum: ['DRAFT', 'ACTIVE', 'COMPLETED'],
    default: 'DRAFT'
  },
  votersParticipated: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }]
}, { timestamps: true });

module.exports = mongoose.model('Election', electionSchema);
