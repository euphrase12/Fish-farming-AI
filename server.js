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

app.post('/api/analyze', async (req, res) => {
    try {
        const { oxygen, ph, temp, serviceType, lang } = req.body;
        
        if (oxygen < 4.0 || ph < 6.5 || ph > 8.5 || temp < 20.0 || temp > 30.0) {
            let alertContent = `URGENT FISHPOND ALERT!\n\nIbipimo by'amazi byageze mu gace kabi cyane:\n- Oxygen: ${oxygen} mg/L\n- pH: ${ph}\n- Ubushyuhe: ${temp} °C\n\nTabara kano kanya!`;
            sendEmailAlert("⚠️ Nyamasheke Smart Monitor: CRITICAL ALERT", alertContent);
        }

        let systemPrompt = "";
        
        if (lang === "rw") {
            if (serviceType === "analyze") {
                systemPrompt = `Uri umuhanga bwikora bwa AI kuri Nyamasheke Special Farming Crayfish Ltd. Subiza mu Kinyarwanda cyonyine. Tanga isesengura ry'ibipimo hanyuma utange inama 2 zifatika.`;
            } else {
                // 📘 ISOMO RYUZUYE 100% MU KINYARWANDA
                systemPrompt = `Uri Umwarimu n'Umujyanama Mukuru w'Ubworozi bw'Amafi mu Rwanda. Tanga ISOMO RYUZUYE 100% rishingiye ku nkingi 4 z'ubworozi bw'amafi bugezweho mu Kinyarwanda cy'umuco kandi kinyamwufu. 
                Gura isomo utya:
                
                📘 NYAMASHEKE FISH FARMING ACADEMY (Isomo Ryuzuye Ry'Ubworozi)
                
                ■ IGBCE CYA 1: GUTEGURA ICYESE (Pond Construction & Management)
                - Uburyo bwo guhitamo ubutaka n'amazi meza adahumanye.
                - Kurinda amazi no kuyashiramo imiti isukura mbere yo kuzanamo amafi (Liming & Fertilization).
                
                ■ IGICE CYA 2: IKIBRAZO CY'IJORO NA OXYGEN (Water Quality Parameters)
                - Sobanura impamvu 80% by'igihombo cy'amafi biba nijoro (kubera phytoplankton no kubura oxygen).
                - Ibipimo ngenderwaho: Oxygen (>5.0 mg/L), pH (6.5 - 8.5), n'ubushyuhe (20°C - 30°C).
                - Uburyo bwo gukoresha Aerators cyangwa guhindura amazi nijoro.
                
                ■ IGICE CYA 3: IKIGERO CYO GUGABURIRA N'IBIRYO (Feeding & Nutrition)
                - Uko batoranya ibiryo bifite poroteyine (Protein content > 30%) bitewe n'ikigero cy'ifi (Fingerlings vs Adults).
                - Isaha n'uburyo bwo kugaburira bwikora (Floating pellets vs Sinking pellets).
                
                ■ IGICE CYA 4: ACCOUNTRABILITY N'UMUSARURO (Harvesting & Business)
                - Uko barinda indwara z'amafi no gukurikirana ub kura bwayo (Sampling).
                - Ubucuruzi bw'ifi n'uko bategura isoko.
                
                Subiza mu buryo bugaragara neza bwanditse ku manirandanga (Bullet points) kugira ngo umworozi mushya ahite asobanukirwa 100% nta gihombo!`;
            }
        } else {
            if (serviceType === "analyze") {
                systemPrompt = `You are an automated AI Aquaculture Expert. Respond strictly in simple English. Give water health report and 2 actionable steps.`;
            } else {
                // 📘 ISOMO RYUZUYE 100% MU CYONGEREZA
                systemPrompt = `You are an Expert Fish Farming Lecturer. Provide a 100% COMPREHENSIVE TRAINING LESSON structured into 4 foundational pillars:
                
                📘 NYAMASHEKE FISH FARMING ACADEMY (Complete Masterclass)
                
                ■ MODULE 1: POND PREPARATION & MANAGEMENT
                - Soil selection, pond lining, and initialization (liming and natural fertilization).
                
                ■ MODULE 2: THE WATER QUALITY & THE NIGHT-TIME OXYGEN CHALLENGE
                - Deep dive into why 80% of fish losses occur at night due to dissolved oxygen drops.
                - Critical thresholds: DO (>5.0 mg/L), pH (6.5 - 8.5), and Temperature (20°C - 30°C).
                - Use of aerators and urgent mitigation strategies.
                
                ■ MODULE 3: FEEDING STRATEGIES & NUTRITION
                - Protein-rich diets (>30% protein) for different growth stages.
                - Feeding frequencies, timing, and minimizing water pollution from overfeeding.
                
                ■ MODULE 4: DISEASES CONTROL & BUSINESS HARVESTING
                - Bio-security, regular sampling, and scaling production for the market.
                
                Format with clean bullet points and clear professional headings. Make it 100% ready for a new user to start learning.`;
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