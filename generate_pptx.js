const pptxgen = require('pptxgenjs');
const path = require('path');
const fs = require('fs');

const pres = new pptxgen();
pres.title = "Secure Digital Student Voting System";
pres.layout = 'LAYOUT_WIDE';

// Define theme colors
const PRIMARY = '6366f1';
const SECONDARY = 'a855f7';
const BG_DARK = '0f172a';
const TEXT_LIGHT = 'f8fafc';
const CARD_BG = 'f1f5f9';

const ASSETS_DIR = '/home/aslam/Pictures/minor project/presentation_assets/';

// Helper to get image path (handling timestamps)
const getImage = (prefix) => {
    const files = fs.readdirSync(ASSETS_DIR);
    const found = files.find(f => f.startsWith(prefix));
    return found ? path.join(ASSETS_DIR, found) : null;
};

// 1. Title Slide
let slide = pres.addSlide();
slide.background = { color: BG_DARK };
slide.addText("SECURE DIGITAL STUDENT VOTING SYSTEM", { 
    x: 0, y: 2.0, w: '100%', h: 1.5, 
    fontSize: 44, bold: true, color: PRIMARY, align: 'center', fontFace: 'Arial' 
});
slide.addText("A Modern MERN-Stack Election Platform", { 
    x: 0, y: 3.5, w: '100%', h: 0.8, 
    fontSize: 22, italic: true, color: TEXT_LIGHT, align: 'center' 
});
slide.addText("Presented by: ASLAM (2301112345)\nGuided by: MS. REMITHA N V", { 
    x: 0, y: 5.2, w: '100%', h: 1.0, 
    fontSize: 16, color: TEXT_LIGHT, align: 'center' 
});

// 2. Introduction
slide = pres.addSlide();
slide.addText("THE CHALLENGE", { x: 0.5, y: 0.4, w: 9, h: 0.6, fontSize: 32, bold: true, color: PRIMARY });
slide.addText([
    { text: "• Traditional Voting Issues", options: { bold: true, color: SECONDARY, fontSize: 20 } },
    { text: "\n  - Long physical queues and high administrative cost\n  - Paper waste and manual counting errors\n  - Potential for vote duplication and fraud" },
    { text: "\n\n• Our Solution", options: { bold: true, color: PRIMARY, fontSize: 20 } },
    { text: "\n  - Modern web-based portal with instant results\n  - Zero physical infrastructure requirements\n  - End-to-end encryption for tamper-proof counting" }
], { x: 0.5, y: 1.2, w: 12, h: 5, fontSize: 18 });

// 3. Objectives
slide = pres.addSlide();
slide.addText("PROJECT OBJECTIVES", { x: 0.5, y: 0.4, w: 9, h: 0.6, fontSize: 32, bold: true, color: PRIMARY });
slide.addTable([
    [{ text: 'SECURITY', options: { bold: true, color: PRIMARY } }, 'Ensuring one-student-one-vote through atomic database operations.'],
    [{ text: 'USABILITY', options: { bold: true, color: SECONDARY } }, 'Modern, intuitive UI using glassmorphism and smooth animations.'],
    [{ text: 'TRANSPARENCY', options: { bold: true, color: PRIMARY } }, 'Live visualization of results for administrators.'],
    [{ text: 'EFFICIENCY', options: { bold: true, color: SECONDARY } }, 'Automated calculations with zero manual overhead.']
], { x: 0.5, y: 1.5, w: 12, colW: [2.5, 9.5], fontSize: 16, border: { pt: 1, color: PRIMARY }, valign: 'middle', rowH: 1.0 });

// 4. Tech Stack
slide = pres.addSlide();
slide.addText("TECHNOLOGY STACK (MERN)", { x: 0, y: 0.4, w: '100%', h: 0.6, fontSize: 32, bold: true, color: PRIMARY, align: 'center' });

// Frontend Card
slide.addShape(pres.ShapeType.rect, { x: 0.5, y: 1.5, w: 4, h: 4, fill: { color: CARD_BG }, line: { color: SECONDARY, width: 2 } });
slide.addText("FRONTEND", { x: 0.5, y: 1.7, w: 4, h: 0.5, fontSize: 20, bold: true, color: SECONDARY, align: 'center' });
slide.addText("React.js, Vite,\nFramer Motion,\nAxios, Lucide React", { x: 0.5, y: 2.5, w: 4, h: 2.5, fontSize: 16, align: 'center' });

// Backend Card
slide.addShape(pres.ShapeType.rect, { x: 4.65, y: 1.5, w: 4, h: 4, fill: { color: CARD_BG }, line: { color: PRIMARY, width: 2 } });
slide.addText("BACKEND", { x: 4.65, y: 1.7, w: 4, h: 0.5, fontSize: 20, bold: true, color: PRIMARY, align: 'center' });
slide.addText("Node.js, Express,\nMongoose ODM,\nBcrypt, JWT", { x: 4.65, y: 2.5, w: 4, h: 2.5, fontSize: 16, align: 'center' });

// Database Card
slide.addShape(pres.ShapeType.rect, { x: 8.8, y: 1.5, w: 4, h: 4, fill: { color: CARD_BG }, line: { color: SECONDARY, width: 2 } });
slide.addText("DATABASE", { x: 8.8, y: 1.7, w: 4, h: 0.5, fontSize: 20, bold: true, color: SECONDARY, align: 'center' });
slide.addText("MongoDB Atlas,\nCloud Document Storage,\nNoSQL Architecture", { x: 8.8, y: 2.5, w: 4, h: 2.5, fontSize: 16, align: 'center' });

// Helper for UI slides
const addUISlide = (title, subtitle, imgPrefix) => {
    const s = pres.addSlide();
    s.addText(title, { x: 0.5, y: 0.3, w: 12, h: 0.6, fontSize: 28, bold: true, color: PRIMARY });
    if (subtitle) s.addText(subtitle, { x: 0.5, y: 0.8, w: 12, h: 0.4, fontSize: 14, color: '666666' });
    const imgPath = getImage(imgPrefix);
    if (imgPath) s.addImage({ path: imgPath, x: 0.5, y: 1.3, w: 12.3, h: 6.0 });
};

// UI Slides
addUISlide("SECURE ACCESS", "Custom email validation for student authentication.", '1_login');
addUISlide("VOTER ONBOARDING", "Registration portal for first-time student users.", '2_register');
addUISlide("VOTER DASHBOARD", "Unified interface for monitoring active elections.", '3_student_dashboard_retry');
addUISlide("CANDIDATE INSIGHTS", "Detailed profiles and campaign bios.", '4_candidate');
addUISlide("THE VOTING PROCESS", "Multi-step confirmation to eliminate errors.", '5_vote_confirmation');
addUISlide("VOTE CONFIRMATION", "Instant feedback upon successful vote casting.", '6_success');
addUISlide("ADMIN ANALYTICS", "Real-time results dashboard and visualization.", '7_admin');

// 12. Future Scope
slide = pres.addSlide();
slide.addText("FUTURE HORIZONS", { x: 0.5, y: 0.4, w: 9, h: 0.6, fontSize: 32, bold: true, color: PRIMARY });
slide.addText([
    { text: "• Blockchain Integration", options: { fontSize: 22, bold: true, color: SECONDARY } },
    { text: "\nEnsuring immutable audit trails for every vote.\n\n", options: { fontSize: 16 } },
    { text: "• Biometric Authentication", options: { fontSize: 22, bold: true, color: PRIMARY } },
    { text: "\nAdding face/fingerprint recognition for identity proof.\n\n", options: { fontSize: 16 } },
    { text: "• Mobile App Release", options: { fontSize: 22, bold: true, color: SECONDARY } },
    { text: "\nNative mobile support for seamless voting on-the-go.", options: { fontSize: 16 } }
], { x: 0.5, y: 1.5, w: 12, h: 5 });

// Final Thank You Slide
slide = pres.addSlide();
slide.background = { color: BG_DARK };
slide.addText("THANK YOU!", { x: 0, y: 3.0, w: '100%', h: 1.0, fontSize: 60, bold: true, color: PRIMARY, align: 'center' });
slide.addText("Questions & Discussion", { x: 0, y: 4.2, w: '100%', h: 0.5, fontSize: 24, color: TEXT_LIGHT, align: 'center' });

// Save the Presentation
pres.writeFile({ fileName: "CollegeVoter_Presentation.pptx" })
    .then(fileName => console.log(`Presentation saved as: ${fileName}`))
    .catch(err => console.error(err));
