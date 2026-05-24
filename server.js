import express from 'express';
import cors from 'cors';
import { Groq } from 'groq-sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());
app.use(express.static('./')); 

// Niba process.env.GROQ_API_KEY idakora, ihita ifata ya Key yawe toka mu buryo bwizewe!
const activeApiKey = process.env.GROQ_API_KEY || "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";

const groq = new Groq({ 
    apiKey: activeApiKey
});

app.post('/api/analyze', async (req, res) => {
    try {
        const { problem, feedback } = req.body;
        const feedbackText = feedback ? feedback.join("\n") : "Nta feedback yabonetse.";

        const completion = await groq.chat.completions.create({
            messages: [
                {
                    role: "system",
                    content: `Uri umuhanga mu gusesengura imishinga y'ubworozi bw'amafi (Aquaculture Business Analyst). 
                    Sesengura amakuru n'ibitekerezo (stakeholder feedback) uhereye ku kibazo umworozi afite.
                    Tanga igisubizo mu Kinyarwanda gisobanutse neza kandi gitekereje.
                    Gira ibice utunganya gutya:
                    PATTERNS: Ni izihe nsanganyamatsiko cyangwa ibintu bisubiramo ku borozi benshi? (3-5 bullets)
                    SURPRISES: Ni hehe aborozi cyangwa abaguzi batandukanyiriza imvugo kandi bivuze iki? (3-5 bullets)
                    ASSUMPTIONS TO REVISIT: Ni ibihe bintu twibwiraga ko bimeze gutyo ariko feedback yerekanye ko twibeshye? (3-5 bullets)
                    RED FLAGS: Ni izihe nkemyi cyangwa ibyago bikomeye byagaragaye mu bworozi bwabo? (3-5 bullets)
                    TOP 3 INSIGHTS: Ni ibihe bintu 3 bikuru by'ingenzi umworozi agomba guhita akora kuri iki kibazo cy'ubushyuhe bw'amazi? (3-5 bullets)`
                },
                {
                    role: "user",
                    content: `Ikibazo cy'Umworozi: ${problem}\n\nIbitekerezo by'Abafatanyabikorwa:\n${feedbackText}`
                }
            ],
            model: "llama-3.3-70b-versatile",
            temperature: 0.7
        });

        res.json({ text: completion.choices[0].message.content });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
