import express from 'express';
import dotenv from 'dotenv';
import webhookRouter from './routes/webhook.js';

dotenv.config();

const app = express();
app.use(express.json());

app.use('/webhook', webhookRouter);

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
});
