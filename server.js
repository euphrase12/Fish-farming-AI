const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ROUTE 1: Umutekano w'Amakuru ya Telemetry n'ubuzima bw'amafi
app.get('/api/pond-status', (req, res) => {
    // Ibi ni ibipimo biva mu bidaka bya Nyamasheke biherekejwe na Fish Health Status
    const pondMetrics = {
        oxygen: 3.2, 
        ph: 7.4,
        temperature: 22.5,
        fishHealth: "POOR (Hypoxia Stress / Ubuzima buri mu kaga)"
    };
    res.json(pondMetrics);
});

// ROUTE 2: Gateway y'Indimi na AI Teach-Me Engine
app.post('/api/teach-me', async (req, res) => {
    const { errorContext, language } = req.body;
    const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

    if (!GEMINI_API_KEY) {
        return res.status(500).json({ error: "Server configuration anomaly: Missing API key." });
    }

    try {
        const prompt = `Explain this aquaculture system error to Patrick in professional ${language === 'rw' ? 'Kinyarwanda cyanditse neza' : language === 'fr' ? 'French' : 'English'}. Context: ${errorContext}`;
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${GEMINI_API_KEY}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }] })
        });
        const data = await response.json();
        res.json({ breakdown: data.candidates[0].content.parts[0].text });
    } catch (e) {
        res.status(500).json({ error: "Internal operational server error." });
    }
});

app.listen(PORT, () => {
    console.log(`🚀 Fish-Farming-AI Server is operational on port ${PORT}`);
});