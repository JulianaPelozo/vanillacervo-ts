import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import itemsRouter from './routes/items';

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/items', itemsRouter);

// Health check
app.get('/health', (req, res) => {
  res.json({ message: 'Server is running!' });
});

export default app;