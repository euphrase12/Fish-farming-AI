const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

app.post('/api/analyze', async (req, res) => {
  // Isoma imibare hamwe n'ururimi (language) biturutse muli frontend
  const { temperature, ph, oxygen, language } = req.body;

  const apiKey = process.env.API_KEY || process.env.GROQ_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: "API Key is completely missing." });
  }

  // System prompt itegeka AI gukoresha ururimi umu-user yahisemo neza
  const systemPrompt = `You are a professional Aquaculture AI Telemetry Assistant.
Analyze the provided parameters: Temperature, pH, and Dissolved Oxygen.
CRITICAL INSTRUCTION: You must respond 100% in the following language: "${language}".
Format your response with:
1. Health Status (State if conditions are excellent, safe, or critical).
2. Concise Biological Analysis (Explain the numbers to the farmer).
3. 3 Direct Action Steps (Clear bullet points on what to do next).
Keep the style educational and friendly. Max length: 150 words.`;

  const userPrompt = `Telemetry values: Temperature: ${temperature}°C, pH: ${ph}, Dissolved Oxygen: ${oxygen} mg/L. Language requested: ${language}`;

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
      res.status(500).json({ error: "No response from AI brain." });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error." });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Fish-Farming-AI Server is operational on port ${PORT}`);
});