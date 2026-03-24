const Election = require('../models/Election');

/**
 * Controller for handling admin/management functionality.
 * Allows viewing vote totals and election results.
 */
const adminController = {
  getElectionResults: async (req, res) => {
    const { electionId } = req.params;

    try {
      const election = await Election.findById(electionId);
      if (!election) {
        return res.status(404).json({ success: false, message: "Election not found." });
      }

      // Calculate totals
      const totalVotes = election.votersParticipated.length;
      
      const results = election.candidates.map(candidate => ({
        name: candidate.name,
        bio: candidate.bio,
        voteCount: candidate.voteCount,
        percentage: totalVotes > 0 ? ((candidate.voteCount / totalVotes) * 100).toFixed(2) : 0
      }));

      return res.status(200).json({ 
        success: true, 
        election: {
          title: election.title,
          status: election.status,
          totalVotes: totalVotes,
          results: results
        }
      });

    } catch (error) {
      console.error("Admin results error:", error);
      return res.status(500).json({ success: false, message: "Internal server error." });
    }
  },

  getAllElections: async (req, res) => {
    try {
      const elections = await Election.find({}, 'title status startDate endDate votersParticipated');
      const electionData = elections.map(e => ({
        id: e._id,
        title: e.title,
        status: e.status,
        totalVotes: e.votersParticipated.length
      }));

      return res.status(200).json({ success: true, elections: electionData });
    } catch (error) {
      return res.status(500).json({ success: false, message: "Error fetching elections." });
    }
  },

  resetVotes: async (req, res) => {
    const { electionId } = req.params;
    try {
      const election = await Election.findById(electionId);
      if (!election) {
        return res.status(404).json({ success: false, message: "Election not found." });
      }

      // 1. Clear candidate counts
      election.candidates.forEach(candidate => {
        candidate.voteCount = 0;
      });

      // 2. Clear voters participated list
      election.votersParticipated = [];

      await election.save();

      return res.status(200).json({ 
        success: true, 
        message: "Election results have been successfully reset." 
      });
    } catch (error) {
      console.error("Admin reset error:", error);
      return res.status(500).json({ success: false, message: "Internal server error occurred while resetting votes." });
    }
  }
};

module.exports = adminController;
