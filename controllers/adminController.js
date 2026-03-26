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
        position: candidate.position,
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

      // Atomically reset all candidate vote counts and clear participated voters
      await Election.updateOne(
        { _id: electionId },
        { 
          $set: { "candidates.$[].voteCount": 0, votersParticipated: [] } 
        }
      );

      console.log(`[Admin] Election ${electionId} votes reset successfully.`);

      return res.status(200).json({ 
        success: true, 
        message: "Election results have been successfully reset." 
      });
    } catch (error) {
      console.error("Admin reset error:", error);
      return res.status(500).json({ success: false, message: "Internal server error occurred while resetting votes." });
    }
  },

  addCandidate: async (req, res) => {
    const { electionId } = req.params;
    const { name, position, bio } = req.body;

    if (!name || !position) {
      return res.status(400).json({ success: false, message: "Candidate name and position are required." });
    }

    try {
      const election = await Election.findById(electionId);
      if (!election) {
        return res.status(404).json({ success: false, message: "Election not found." });
      }

      election.candidates.push({
        name,
        position,
        bio: bio || '',
        voteCount: 0
      });

      await election.save();

      return res.status(201).json({
        success: true,
        message: `Candidate "${name}" added for ${position}.`,
        election
      });
    } catch (error) {
      console.error("Add candidate error:", error);
      return res.status(500).json({ success: false, message: "Failed to add candidate." });
    }
  }
};

module.exports = adminController;
