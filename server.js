import express from 'express';
import cors from 'cors';
import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('./')); 

const activeApiKey = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: activeApiKey });

let VALID_ACCESS_CODES = ["PREMIUM_2026", "NYAMASHEKE_FISH_AI", "PATRICK_BOSS"];

// 🔋 AMADATA Y'IBIPIMO BYA SENSORS
let currentSensorData = {
    oxygen: 5.5,
    ph: 7.2,
    temp: 25.4,
    lastUpdated: new Date().toLocaleTimeString(),
    lastSeenTimestamp: 0 // Igihe icyuma giherukira kwaka (In Miliseconds)
};

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'patricksmartfarm@gmail.com', 
        pass: 'your-app-password' 
    }
});

function sendEmailAlert(subject, messageText) {
    const mailOptions = {
        from: 'patricksmartfarm@gmail.com',
        to: 'manirafashapatrick@gmail.com', 
        subject: subject,
        text: messageText
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) { console.log("[Email Error] " + error); }
        else { console.log("[Email Sent] " + info.response); }
    });
}

// 🌐 1. ENDPOINT YAKIRA AMACURU AVA KURI SENSOR (ESP32)
app.post('/api/update-sensors', (req, res) => {
    const { oxygen, ph, temp } = req.body;
    
    if (oxygen !== undefined && ph !== undefined && temp !== undefined) {
        currentSensorData.oxygen = parseFloat(oxygen).toFixed(1);
        currentSensorData.ph = parseFloat(ph).toFixed(1);
        currentSensorData.temp = parseFloat(temp).toFixed(1);
        currentSensorData.lastUpdated = new Date().toLocaleTimeString();
        currentSensorData.lastSeenTimestamp = Date.now(); // Fata igihe ya kano kanya ESP32 ivugiye

        console.log(`[Sensor Sync] Received Data -> DO: ${oxygen}, pH: ${ph}, Temp: ${temp}`);

        if (oxygen < 4.0 || ph < 6.5 || ph > 8.5 || temp < 20.0 || temp > 30.0) {
            let alertContent = `URGENT FISHPOND ALERT FROM REAL SENSORS!\n\nIbipimo by'amazi byageze mu gace kabi cyane:\n- Oxygen: ${oxygen} mg/L\n- pH: ${ph}\n- Ubushyuhe: ${temp} °C\n\nTabara kano kanya!`;
            sendEmailAlert("⚠️ Nyamasheke Smart Monitor: REAL-TIME CRITICAL ALERT", alertContent);
        }

        return res.json({ success: true, message: "Sensor data updated successfully!" });
    }
    
    return res.status(400).json({ success: false, message: "Missing parameters." });
});

// 🌐 2. ENDPOINT IPIMA NIBA SENSOR IRI DETECTION (Urashaka ko tuyireba)
app.get('/api/live-sensors', (req, res) => {
    // Reba niba ESP32 yigeze ivugisha server mu masegonda 60 ashize
    let timeDifference = Date.now() - currentSensorData.lastSeenTimestamp;
    
    let isDetected = false;
    if (currentSensorData.lastSeenTimestamp !== 0 && timeDifference < 60000) {
        isDetected = true; // Sensor iriho kandi iri gukora
    }
    
    res.json({
        ...currentSensorData,
        detected: isDetected
    });
});

app.post('/api/register', (req, res) => {
    const { name } = req.body;
    const cleanName = name.replace(/\s+/g, '').toUpperCase().substring(0, 7);
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const generatedCode = `${cleanName}-${randomNumber}`;
    VALID_ACCESS_CODES.push(generatedCode);
    res.json({ success: true, code: generatedCode });
});

app.post('/api/verify-code', (req, res) => {
    const { code } = req.body;
    if (VALID_ACCESS_CODES.includes(code.trim())) { res.json({ success: true }); }
    else { res.json({ success: false }); }
});

app.post('/api/analyze', async (req, res) => {
    try {
        const { oxygen, ph, temp, serviceType, lang } = req.body;
        let systemPrompt = "";
        
        if (lang === "rw") {
            if (serviceType === "analyze") {
                systemPrompt = `Uri umuhanga bwikora bwa AI kuri Nyamasheke Special Farming Crayfish Ltd. Subiza mu Kinyarwanda cyonyine. Tanga isesengura ry'ibipimo nyakuri byavuye kuri sensor hanyuma utange inama 2 zifatika.`;
            } else {
                systemPrompt = `Uri Umwarimu n'Umujyanama Mukuru w'Ubworozi bw'Amafi mu Rwanda. Tanga ISOMO RYUZUYE 100% rishingiye ku nkingi 4 z'ubworozi bw'amafi bugezweho mu Kinyarwanda cy'umuco kandi kinyamwufu...`;
            }
        } else {
            if (serviceType === "analyze") {
                systemPrompt = `You are an automated AI Aquaculture Expert. Respond strictly in simple English. Give water health report based on sensor hardware and 2 actionable steps.`;
            } else {
                systemPrompt = `You are an Expert Fish Farming Lecturer. Provide a 100% COMPREHENSIVE TRAINING LESSON structured into 4 foundational pillars...`;
            }
        }

        const userPrompt = `Parameters: Oxygen = ${oxygen} mg/L, pH = ${ph}, Temp = ${temp} °C. Language: ${lang}`;
        const completion = await groq.chat.completions.create({
            messages: [{ role: "system", content: systemPrompt }, { role: "user", content: userPrompt }],
            model: "llama-3.3-70b-versatile",
            temperature: 0.5
        });
        res.json({ text: completion.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));