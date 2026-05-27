import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Gushyira mu bikorwa dotenv ngo isome .env file niba ihari
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Umutekano w'Imiyoboro (CORS): Gufungurira amapaji yose uburenganzira bwo gusoma amakuru
app.use(cors({
    origin: '*',
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));
app.use(express.json());

// ==========================================
// ROUTE 1: Telemetry Data & Fish Health (Lesson 10 & 11)
// ==========================================
app.get('/api/pond-status', (req, res) => {
    // Ibi ni ibipimo biva mu kidaka byerekanwa na Sensor AI
    const pondMetrics = {
        oxygen: 3.2, 
        ph: 7.4,
        temperature: 22.5,
        fishHealth: "POOR (Hypoxia Stress / Ubuzima buri mu kaga)"
    };
    res.json(pondMetrics);
});

// ==========================================
// ROUTE 2: AI Teach-Me Engine (Lesson 3 & 12)
// ==========================================
app.post('/api/teach-me', async (req, res) => {
    const { errorContext, language } = req.body;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
        return res.status(500).json({ error: "Server error: Missing Gemini API Key in .env file." });
    }

    try {
        const prompt = `Explain this aquaculture system error to a fish farmer in professional ${language === 'rw' ? 'Kinyarwanda cyanditse neza' : 'English'}. Context: ${errorContext}`;
        
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        
        const data = await response.json();
        res.json({ breakdown: data.candidates[0].content.parts[0].text });
    } catch (e) {
        res.status(500).json({ error: "Internal AI Engine operational error." });
    }
});

// Tangiza server ku muhora wa 0.0.0.0 ngo Codespaces ikwemerere kuyibona
app.listen(PORT, '0.0.0.0', () => {
    console.log(`🚀 Fish-Farming-AI Server is operational on port ${PORT}`);
});// Paste iyi code ku mpera kabisa ya server.js kugira ngo ikureho rya kosa rya "Cannot GET /"
app.get('/', (req, res) => {
    res.send("<h1>🌊 Fish-Farming-AI Backend iri gukora neza cyane Patrick!</h1>");
});