const express = require('express');
const cors = require('cors');
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5500;

// 🔐 Initialize Supabase inside our Backend to verify client tokens
const supabaseUrl = process.env.SUPABASE_URL || "https://your-supabase-url.supabase.co";
const supabaseAnonKey = process.env.SUPABASE_ANON_KEY || "your-anon-key";
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// 🛡️ AUTHENTICATION MIDDLEWARE: Umurinzi w'Idirishya rya API
async function requireAuth(req, res, next) {
  const authHeader = req.headers.authorization;
  
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: "❌ Access Denied: Missing cryptographic Bearer Token from frontend." });
  }

  // Gukuramo rya token rirambuye
  const token = authHeader.split(' ')[1];

  try {
    // Isuzuma rya Supabase Auth ryerekana niba Token ari ry'ukuri kandi ritaratomboka
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return res.status(403).json({ error: "❌ Forbidden: The provided token is invalid or expired." });
    }

    // Niba umu-user ari uwo kwizerwa, amakuru ye tuyika muli request hanyuma tugakomeza (next())
    req.user = user;
    next();
  } catch (err) {
    console.error("Middleware Error:", err);
    return res.status(500).json({ error: "Internal Authentication Gateway Server Error." });
  }
}

// 🎯 API ROUTE POST SECURED BY MIDDLEWARE: Twayifunze dukoresheje 'requireAuth'
app.post('/api/analyze', requireAuth, async (req, res) => {
  const { temperature, ph, oxygen, language } = req.body;

  const apiKey = process.env.API_KEY || process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "Groq API Key configuration is missing." });
  }

  const systemPrompt = `You are a professional Aquaculture AI Telemetry Assistant.
Analyze the provided parameters: Temperature, pH, and Dissolved Oxygen.
CRITICAL INSTRUCTION: You must respond 100% in the following language: "${language}".
Format your response with:
1. Health Status (State if conditions are excellent, safe, or critical).
2. Concise Biological Analysis in "${language}".
3. 3 Direct Action Steps in "${language}".
Keep the style educational and friendly. Max length: 140 words.`;

  const userPrompt = `Telemetry values: Temperature: ${temperature}°C, pH: ${ph}, Dissolved Oxygen: ${oxygen} mg/L.`;

  try {
    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama3-8b-8192',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
        temperature: 0.2
      })
    });

    const data = await response.json();
    if (data.choices && data.choices[0]) {
      res.json({ result: data.choices[0].message.content });
    } else {
      res.status(500).json({ error: "No response from AI compilation." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error during Groq dispatch." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Fish-Farming-AI Server is operational on port ${PORT}`);
});