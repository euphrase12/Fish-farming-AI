import express from 'express';
import cors from 'cors';
import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';
import nodemailer from 'nodemailer'; // Ikoreshwa mu kohereza email bwikora

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('./')); 

const activeApiKey = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: activeApiKey });

// Urutonde rw'amakode azewe
let VALID_ACCESS_CODES = ["PREMIUM_2026", "NYAMASHEKE_FISH_AI", "PATRICK_BOSS"];

// ⚙️ SYSTEM YO KOHEREZA EMAIL (Ubu buryo bwikora niba hari ikibazo)
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'patricksmartfarm@gmail.com', // Shira hano Email yawe ya Gmail
        pass: 'your-app-password' // Shira hano Password y'ikoranabuhanga (Gmail App Password)
    }
});

// Uburyo bwo kohereza Email mu mutekano
function sendEmailAlert(subject, messageText) {
    const mailOptions = {
        from: 'patricksmartfarm@gmail.com',
        to: 'manirafashapatrick@gmail.com', // Email y'umworozi cg iyawe Boss ngo itake
        subject: subject,
        text: messageText
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log("[Email Error] " + error);
        } else {
            console.log("[Email Sent] Alert notification dispatched: " + info.response);
        }
    });
}

// Endpoint y'iyandikisha
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
    if (VALID_ACCESS_CODES.includes(code.trim())) {
        res.json({ success: true });
    } else {
        res.json({ success: false });
    }
});

// KUGENZURA NO KOHEREZA INTEGUZA BIKORESHEJE AI N'AMAKURU YA SENSORS
app.post('/api/analyze', async (req, res) => {
    try {
        const { oxygen, ph, temp, serviceType, lang } = req.body;
        
        // 🚨 KORA CHECK Y'IKITUGUZA KANO KANYA MBERE YO KOHEREZA KURI AI
        if (oxygen < 4.0 || ph < 6.5 || ph > 8.5 || temp < 20.0 || temp > 30.0) {
            let alertContent = `URGENT FISHPOND ALERT!\n\nIbipimo by'amazi byageze mu gace kabi cyane:\n- Oxygen: ${oxygen} mg/L\n- pH: ${ph}\n- Ubushyuhe: ${temp} °C\n\nTabara kano kanya uhindure amazi cyangwa ufore Aerator ngo amafi atapfa!`;
            
            // Kohereza email bwikora
            sendEmailAlert("⚠️ Nyamasheke Smart Monitor: CRITICAL ALERT", alertContent);
        }

        let systemPrompt = "";
        if (lang === "rw") {
            if (serviceType === "analyze") {
                systemPrompt = `Uri umuhanga bwikora bwa AI kuri Nyamasheke Special Farming Crayfish Ltd. Subiza mu Kinyarwanda cyonyine. Tanga isesengura ry'ibipimo hanyuma utange inama 2 zifatika.`;
            } else {
                systemPrompt = `Uri Umwarimu mu by'Ubworozi bw'Amafi mu Rwanda. Tanga isomo rya kinyamwufu ku mazi n'uburyo bwo kuyarinda guhinduka nijoro.`;
            }
        } else {
            if (serviceType === "analyze") {
                systemPrompt = `You are an automated AI Aquaculture Expert. Respond strictly in simple English. Give water health report and 2 actionable steps.`;
            } else {
                systemPrompt = `You are an Expert Fish Farming Lecturer. Provide training on maintaining water quality and managing night oxygen drop.`;
            }
        }

        const userPrompt = `Parameters: Oxygen = ${oxygen} mg/L, pH = ${ph}, Temp = ${temp} °C. Language: ${lang}`;

        const completion = await groq.chat.completions.create({
            messages: [
                { role: "system", content: systemPrompt },
                { role: "user", content: userPrompt }
            ],
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