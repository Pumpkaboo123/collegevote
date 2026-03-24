# College Voting System - Backend

A secure, web-based voting system for colleges built with Node.js, Express, and MongoDB.

## Features
- **One-Student-One-Vote**: Prevents duplicate voting using MongoDB atomic operations.
- **Secure Authentication**: Designed for integration with College Email OAuth (SSO).
- **Anonymized Audit Logs**: Logs IP hashes and timestamps for fraud detection without compromising secret ballots.

## Installation
1. Clone the repository.
2. Run `npm install`.
3. Create a `.env` file with your `MONGODB_URI`.
4. Run `npm start`.

## API Endpoints
- `POST /api/elections/:electionId/vote`: Cast a vote for a candidate.
  - Required Body: `{ "candidateId": "..." }`
  - Authentication: Requires a JWT/Session (Mocked in `server.js` for demo).

## Implementation Details
The system uses `findOneAndUpdate` with a condition `votersParticipated: { $ne: studentId }` to ensure that a student can only vote once, even if multiple requests are sent simultaneously.
