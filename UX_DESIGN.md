# UX/UI Design & User Journey – College Voting App

This document outlines the user experience for the mobile-first College Voting platform, focusing on high engagement and transparency.

## User Flow: From Login to Vote Confirmed

1.  **Onboarding & SSO Login**:
    -   Student opens the app and sees the "VOTE NOW" hero banner.
    -   Clicks "Login with College ID" (Google/Microsoft SSO).
    -   Verified student landing page with current active elections.

2.  **Election Discovery**:
    -   Dashboard shows "2 Days Remaining" countdown.
    -   Selection of an active election (e.g., "Student Body President 2026").

3.  **Candidate Research**:
    -   Clicks a candidate to view their profile.
    -   **Candidate Profile Screen**: Quick bio, video pitch (embedded), and "Why Vote for Me" top-3 bullet points.
    -   Side-by-side comparison tool (Compare manifestos).

4.  **Digital Ballot**:
    -   The student selects their candidate by tapping their card.
    -   A confirmation modal appears: "You are voting for [Candidate Name]. This action cannot be undone."

5.  **Vote Submission**:
    -   Tap "Confirm Vote."
    -   Processing animation (shield icon indicating encryption).

6.  **Vote Confirmed (The 'Wow' Moment)**:
    -   "VOTE SUCCESSFUL" green checkmark.
    -   Confetti effect.
    -   "I Voted" digital sticker for social sharing.
    -   Live progress bar showing *participation rate* (not results yet, to avoid bias).

---

## Key Screens Description

| Screen | Key Features |
| :--- | :--- |
| **Candidate Profiles** | Video playback for 60s pitches, LinkedIn integration, and a 'Manifesto' PDF viewer. |
| **Digital Ballot** | Clean, large touch targets; clear highlighting of selected candidate; accessible color contrast. |
| **Election Countdown** | Persistent banner on all screens with a ticking clock to create urgency. |
| **Results Dashboard** | Real-time 'Turnout' stats (e.g., "Dept of Science: 45% Voted"). |

---

## Creative Notification Strategy

1.  **The "Friendly Reminder" (T-minus 24h)**: "The polls close tomorrow! Your department currently has the 3rd lowest turnout—let's get to #1!"
2.  **The "Candidate Update"**: "[Candidate X] just added a new video addressing student parking. Check it out before you vote!"
3.  **The "Final Hour"**: "Last chance! 60 minutes left to have your say in the Student Body elections."
