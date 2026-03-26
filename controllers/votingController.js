const Election = require('../models/Election');
const CryptoJS = require('crypto-js');

/**
 * Controller for handling voting logic.
 * Ensures "One-Student-One-Vote" and atomic updates to candidate counts.
 */
const votingController = {
  submitVote: async (req, res) => {
    const { electionId } = req.params;
    const { candidateId, candidateIds } = req.body;
    const studentId = req.user.id; // Populated from Auth Middleware

    const idsToVote = candidateIds || (candidateId ? [candidateId] : []);

    if (idsToVote.length === 0) {
      return res.status(400).json({ success: false, message: "No candidate selections provided." });
    }

    try {
      // 1. Fetch the election and check if it's currently active
      const election = await Election.findById(electionId);
      if (!election) {
        return res.status(404).json({ success: false, message: "Election not found." });
      }

      if (election.status !== 'ACTIVE') {
        return res.status(400).json({ success: false, message: "This election is not currently active." });
      }

      // 2. Check if the current time is within the start and end dates
      const now = new Date();
      if (now < election.startDate || now > election.endDate) {
        return res.status(400).json({ success: false, message: "Election is outside of its scheduled voting period." });
      }

      // Build dynamic atomic update object supporting multiple candidates
      const incFields = {};
      const arrayFilters = [];
      
      idsToVote.forEach((id, idx) => {
        incFields[`candidates.$[elem${idx}].voteCount`] = 1;
        arrayFilters.push({ [`elem${idx}._id`]: id });
      });

      // 3. Atomically update the vote and register the student's participation
      // The condition `votersParticipated: { $ne: studentId }` prevents multiple votes
      const updatedElection = await Election.findOneAndUpdate(
        {
          _id: electionId,
          status: 'ACTIVE',
          votersParticipated: { $ne: studentId }
        },
        {
          $push: { votersParticipated: studentId },
          $inc: incFields
        },
        {
          arrayFilters: arrayFilters,
          new: true,
          runValidators: true
        }
      );

      // If no document was updated, it means either the student already voted or 
      // the status changed between the check and the update.
      if (!updatedElection) {
        return res.status(403).json({ 
          success: false, 
          message: "Unable to cast vote. You may have already voted or the election status changed." 
        });
      }

      // 4. (Optional) Log the vote for audit purposes (Anonymized)
      const auditLog = {
        electionId,
        candidateIds: idsToVote,
        ipHash: CryptoJS.SHA256(req.ip).toString(),
        timestamp: new Date()
      };
      // In a real app, save this to a separate Audit collection
      console.log('Vote Cast (Audit Log):', JSON.stringify(auditLog));

      return res.status(200).json({ 
        success: true, 
        message: "Your vote has been cast successfully!" 
      });

    } catch (error) {
      console.error("Voting submission error:", error);
      
      // Handle Mongoose CastError (invalid ObjectId format)
      if (error.name === 'CastError') {
        return res.status(400).json({ 
          success: false, 
          message: `Invalid ID format for ${error.path}. Expected a 24-character hex string.` 
        });
      }
      
      return res.status(500).json({ success: false, message: "Internal server error occurred." });
    }
  }
};

module.exports = votingController;
