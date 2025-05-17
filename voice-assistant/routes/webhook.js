import express from 'express';
import { Claude } from '@anthropic-ai/claude-code';
import { PersonalAssistant } from '../mcp/assistant.mjs';
import { sendEmail } from '../services/email.js';


const router = express.Router();
const claude = new Claude({ apiKey: process.env.CLAUDE_API_KEY });

router.post('/', async (req, res) => {
  const { transcription } = req.body;
  if (!transcription) return res.status(400).json({ error: 'Missing transcription' });

  try {
    const result = await PersonalAssistant.run(claude, transcription, {
      agents: {
        email: async (input) => {
          console.log("📧 EmailAgent triggered:", input);
          await sendEmail(input);
          return "Email sent successfully.";
        }
      }
    });

    res.json({ response: result });
  } catch (err) {
    console.error("❌ Error:", err);
    res.status(500).json({ error: "Failed to process email request." });
  }
});

export default router;
