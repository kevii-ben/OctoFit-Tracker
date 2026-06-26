import express from 'express';
import mongoose from 'mongoose';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

app.get('/api', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API is running' });
});

const start = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/octofit_db');
    console.log('Connected to MongoDB');
  } catch (error) {
    console.error('MongoDB connection failed:', error);
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`Backend listening on port ${port}`);
  });
};

start();
