import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import authRoutes from './routes/auth.js';
import noteRoutes from './routes/note.js';

const app = express();
app.use(express.json());
app.use(cookieParser());

mongoose
	.connect(process.env.MONGODB)
	.then(() => console.log('Connected to MongoDB'));

app.use('/api/auth', authRoutes);
app.use('/api/note', noteRoutes);

app.listen(3000, () => console.log('Server is running on port 3000'));
