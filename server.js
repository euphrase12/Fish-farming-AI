import express from 'express';
import cors from 'cors';
import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('./')); 

const activeApiKey = process.env.GROQ_API_KEY;
const groq = new Groq({ apiKey: activeApiKey });

// Urutonde rw'amakode rurimo n'ay'ukuri Boss akoresha
let VALID_ACCESS_CODES = ["PREMIUM_2026", "NYAMASHEKE_FISH_AI", "PATRICK_BOSS"];

// Endpoint nshya yo KWIRAHOM (Self-Registration API)
app.post('/api/register', (req, res) => {
    const { name } = req.body;
    
    // Remba code yikora ishingiye ku izina (urugero: PATRICK-4821)
    const cleanName = name.replace(/\s+/g, '').toUpperCase().substring(0, 7);
    const randomNumber = Math.floor(1000 + Math.random() * 9000);
    const generatedCode = `${cleanName}-${randomNumber}`;

    // Yongere mu rutonde rw'izewe ako kanya!
    VALID_ACCESS_CODES.push(generatedCode);

    console.log(`[Self-Reg] New code created: ${generatedCode} for ${name}`);
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
        let systemPrompt = "";

        if (lang === "rw") {
            if (serviceType === "analyze") {
                systemPrompt = `Uri umuhanga akaba n'ubugenzuzi bwikora bwa AI kuri Nyamasheke Special Farming Crayfish Ltd mu Rwanda.
                Tegeko: Subiza mu Kinyarwanda cyonyine cyiza kandi cyoroshye. Siba amagambo y'izindi ndimi.
                1. **LIVE ALERT**: Niba Oxygen < 4.5 mg/L cyangwa pH < 6.0, tanga SMS y'Ibutsa ikaze.
                2. **WATER HEALTH REPORT**: Sobanura uko Oxygen, pH, n'ubushyuhe bimeze kano kanya.
                3. **FARMER RECOMMENDATION**: Inama 2 zifatika umworozi akora kano kanya mu rurimi rw'Ikinyarwanda gusa.`;
            } else {
                systemPrompt = `Uri Umwarimu n'Umujyanama mu by'Ubworozi bw'Amafi mu Rwanda (Aquaculture Expert).
                Tegeko: Tanga ISOMO RY'UBWOROZI BW'AMAFI mu Kinyarwanda cyonyine.
                1. **UKO GUKORORA AMAFI BIKORWA**: Sobanura uburyo bwo koroza amafi neza n'uko bayagaburira.
                2. **IKIBRAZO CY'IJORO NA OXYGEN**: Ihugure umworozi ku buryo 80% by'igihombo biba nijoro kubera oxygen igabanuka, n'uko yakoresha aerators.
                3. **AMASHURI Y'IBIPIMO**: Amasomo ku bijyanye n'uburyo bwo kurinda pH n'ubushyuhe guhinduka.`;
            }
        } else {
            if (serviceType === "analyze") {
                systemPrompt = `You are an automated AI Aquaculture Expert at Nyamasheke Special Farming Crayfish Ltd in Rwanda.
                Rule: Respond strictly in professional yet simple English. 
                1. **LIVE ALERT**: If Oxygen < 4.5 mg/L or pH < 6.0, provide a critical urgent SMS alert format.
                2. **WATER HEALTH REPORT**: Explain the current status of Oxygen, pH, and Temperature.
                3. **FARMER RECOMMENDATION**: Provide 2 immediate actionable steps for the farmer.`;
            } else {
                systemPrompt = `You are an Expert Fish Farming Lecturer and Advisor in Rwanda.
                Rule: Provide a comprehensive FISH FARMING TRAINING LESSON strictly in English.
                1. **FISH BREEDING & MANAGEMENT BASICS**: Explain best practices for breeding, feeding, and stock optimization.
                2. **THE NIGHT-TIME OXYGEN CHALLENGE**: Educate the farmer on why 80% of fish losses happen at night due to dissolved oxygen drops, and how to use aerators.
                3. **PARAMETER MAINTENANCE**: Lessons on keeping pH and temperature stable.`;
            }
        }

        const userPrompt = `Parameters: Oxygen = ${oxygen} mg/L, pH = ${ph}, Temp = ${temp} °C. Language choice: ${lang}`;

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