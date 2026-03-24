<div style="text-align: center; font-family: 'Times New Roman', Times, serif;">

# SECURE DIGITAL STUDENT VOTING SYSTEM
<br><br>
### A MINOR PROJECT REPORT
<p>submitted in partial fulfilment of the requirements for the award of</p>
<br>
## Diploma
<p>in</p>
### COMPUTER ENGINEERING
<p>of</p>
### STATE BOARD OF TECHNICAL EDUCATION, KERALA
<br><br>
<p>by</p>
<br>
**ASLAM (2301112345)**
<br><br>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Emblem_of_India.svg/200px-Emblem_of_India.svg.png" width="100" />
<br><br>
### DEPARTMENT OF COMPUTER ENGINEERING
### GOVERNMENT POLYTECHNIC COLLEGE, MANANTHAVADY
### 2025-26

</div>

<div style="page-break-after: always;"></div>

<div style="text-align: center;">

### DEPARTMENT OF COMPUTER ENGINEERING
### GOVERNMENT POLYTECHNIC COLLEGE
### MANANTHAVADY

<br>
<img src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c3/Emblem_of_India.svg/200px-Emblem_of_India.svg.png" width="80" />
<br>

## CERTIFICATE
</div>

<p style="text-align: right;">03-03-2026</p>

<p style="text-indent: 50px; text-align: justify;">
This is to certify that the minor project report entitled **Secure Digital Student Voting System** is a bonafide record of the work done by **Aslam (2301112345)** under our guidance towards partial fulfillment of the requirements for the award of **Diploma in Computer Engineering** of the State Board of Technical Education, Government of Kerala during the year 2025-26.
</p>

<br><br><br>

<div style="display: flex; justify-content: space-between;">
  <span>(Guide)</span>
  <span>(Head of Department)</span>
  <span>(Co-ordinator)</span>
</div>

<br><br>
<p style="text-align: center;">(Seal)</p>

<div style="page-break-after: always;"></div>

## ACKNOWLEDGEMENTS

I express my sincere gratitude and thanks to **Mr. Biju M J**, Principal Govt. Polytechnic College, Mananthavady and **Mr. Karunakaran V N**, Head of the Computer Engineering Department for providing necessary facilities and their encouragement and support during the course of this project.

I owe special thanks to the project guide **Ms. Remitha N V**, Lecturer in Computer Engineering, coordinators **Mr. Amal Wilson**, Lecturer in Computer Engineering and **Ms. Aiswarya M**, Lecturer in Computer Engineering for their corrections, suggestions and sincere efforts to co-ordinate the project under a tight schedule.

I express my sincere thanks to all staff members in the Department of Computer Engineering who have taken sincere efforts in guiding and correcting me in conducting this project.

Finally, I wish to thank my family and friends for their unwavering support and motivation, which kept me focused and driven to complete this report.

<p style="text-align: right;">i</p>

<div style="page-break-after: always;"></div>

## ABSTRACT

The Secure Digital Student Voting System is a web-based application designed to modernize the electoral process within educational institutions. By leveraging the MERN (MongoDB, Express, React, Node.js) stack, the system provides a robust platform that ensures "One-Student-One-Vote" integrity through atomic database transactions and secure college email authentication. 

The project focuses on delivering a high-quality user experience with a "vibrant modern" aesthetic using glassmorphism and smooth animations. Key features include a secure voter portal with real-time participation tracking and a comprehensive administrator dashboard for monitoring live results and managing election status. This system effectively mitigates common election issues such as fraud, geographical barriers, and manual counting errors, providing a transparent and efficient alternative to traditional paper-based voting.

<p style="text-align: right;">ii</p>

<div style="page-break-after: always;"></div>

## TABLE OF CONTENTS

- **ACKNOWLEDGEMENTS** (i)
- **ABSTRACT** (ii)
- **1. Introduction** (1)
  - 1.1 Overview (1)
  - 1.2 Background & Motivation (2)
  - 1.3 Problem Statement (2)
  - 1.4 Objectives (2)
  - 1.5 Methodology (2)
  - 1.6 Organization of the Report (3)
- **2. Requirements Specifications** (4)
  - 2.1 Methodology (4)
  - 2.2 Hardware Requirements (4)
  - 2.3 Software Requirements (5)
  - 2.4 Functional Requirements (5)
  - 2.5 Non Functional Requirements (5)
- **3. Design** (6)
  - 3.1 System architecture (6)
  - 3.4 Database Design (6)
  - 3.5 UI/UX Designs (6)
- **4. Implementation** (7)
  - 4.1 Module Descriptions (7)
  - 4.2 Core Algorithms (7)
  - 4.3 Challenges (7)
- **5. Testing** (8)
- **6. Results and Analysis** (9)
- **7. Conclusions and Future Scope** (11)
- **REFERENCES** (12)
- **APPENDIX C: Source Code** (16)

<div style="page-break-after: always;"></div>

## CHAPTER 1: Introduction

### 1.1 Overview
The digital transformation of academic processes has reached a stage where manual voting during student union elections is often seen as inefficient and prone to errors. This project presents a **Secure Digital Student Voting System** that simplifies the voting process while maintaining the highest standards of security and transparency.

### 1.2 Background & Motivation
Traditional voting methods in colleges often involve long queues, significant paper waste, and manual counting that can take days. The motivation for this project is to provide an instant, secure, and accessible platform that students can use from any device, encouraging higher voter turnout and ensuring immediate, undisputed results.

### 1.3 Problem Statement
Existing manual systems suffer from potential vote duplication, loss of ballot papers, and significant administrative overhead. This project aims to solve these by implementing a centralized, authenticated, and immutable digital database for recording student choices.

### 1.4 Objectives
1.  **Security**: Ensure only authorized students can vote and only once.
2.  **Vibrancy**: Create a modern UI to engage the student body.
3.  **Efficiency**: Automated counting and real-time result analytics for admins.
4.  **Integrity**: Use atomic operations to prevent database race conditions.

### 1.5 Methodology
The system follows a full-stack MERN architecture. React.js is used for a responsive frontend, Node.js and Express for the API layer, and MongoDB for flexible data storage. Authentication is currently simulated via `@college.edu` email verification.

<p style="text-align: right;">1</p>

<div style="page-break-after: always;"></div>

## CHAPTER 2: Requirements Specifications

### 2.2 Hardware Requirements
- **Development**: CPU i3 or higher, 8GB RAM.
- **Production Server**: 1 vCPU, 1GB RAM (AWS Free Tier or Render).
- **Client**: Any device with a modern web browser (Chrome, Safari, Firefox).

### 2.3 Software Requirements
- **OS**: Windows/Linux/macOS.
- **Runtime**: Node.js v18+.
- **Database**: MongoDB v7.0.
- **Frontend**: React 18, Vite, Framer Motion.

### 2.4 Functional Requirements
- **SSO Login**: Users log in authenticated as students or admins.
- **Vote Casting**: Students select candidates and confirm their choice.
- **Admin Dashboard**: Real-time visualization of vote distribution.
- **Reset Logic**: Authority to clear test data.

### 2.5 Non Functional Requirements
- **Security**: Data integrity via Mongoose schema validation.
- **Scalability**: Capable of handling hundreds of concurrent users.
- **Usability**: Mobile-first responsive design.

<p style="text-align: right;">4</p>

<div style="page-break-after: always;"></div>

## CHAPTER 3: Design

### 3.1 System Architecture
The application follows a Client-Server architecture:
1.  **Frontend**: React components communicating via Axios.
2.  **API**: RESTful endpoints built with Express.
3.  **Database**: NoSQL MongoDB cluster.

### 3.4 Database Design
The schema uses two primary collections:
1.  **User**: Stores identifiers, roles (Student/Admin), and profiles.
2.  **Election**: Stores title, status, an array of candidate objects (including `voteCount`), and a reference array `votersParticipated`.

<p style="text-align: right;">6</p>

<div style="page-break-after: always;"></div>

## CHAPTER 4: Implementation

### 4.1 Module Descriptions
- **Voting Controller**: Manages the logic for atomically updating votes using MongoDB operators like `$inc` and `$push`.
- **Admin Dashboard**: A React-based module that queries detailed result metrics.
- **Auth Middleware**: Ensures routes are protected based on the user's role.

### 4.2 Core Algorithms
The "Single Vote" algorithm:
```javascript
const updated = await Election.findOneAndUpdate(
  { _id, votersParticipated: { $ne: studentId } },
  { $push: { votersParticipated: studentId }, $inc: { voteCount: 1 } }
);
```
This ensures that the vote count only increases if the user has NOT already participated.

<p style="text-align: right;">7</p>

<div style="page-break-after: always;"></div>

## CHAPTER 7: Conclusions and Future Scope

### 7.1 Conclusion
The Secure Digital Student Voting System successfully demonstrates a modern, efficient, and fraud-resistant alternative to traditional voting. The implementation of atomic database operations and role-based access creates a reliable foundation for institutional elections.

### 7.2 Future Scope
1.  **Biometric Integration**: Adding fingerprint or facial recognition for 2FA.
2.  **Blockchain**: Using a decentralized ledger for the voting history to provide public proof of audit.
3.  **Push Notifications**: Real-time alerts for students when polls open or close.

<p style="text-align: right;">11</p>

<div style="page-break-after: always;"></div>

## REFERENCES

[1] MERN Stack Development, MongoDB Documentation.
[2] "Atomic Transactions in MongoDB," MongoDB University.
[3] "React.js: Modern Frontend UX Design," O'Reilly Media.

<div style="page-break-after: always;"></div>

## APPENDIX C: Source Code
The full source code for this project is available on GitHub:
[https://github.com/Pumpkaboo123/collegevote](https://github.com/Pumpkaboo123/collegevote)
