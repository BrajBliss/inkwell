import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';
import authRoutes from './routes/auth.js';

const app = express();
app.use(express.json());

mongoose
	.connect(process.env.MONGODB)
	.then(() => console.log('Connected to MongoDB'));

app.use('/api/auth', authRoutes);
app.get('/', (req, res) => res.send('Hello from homepage'));

app.listen(3000, () => console.log('Server is running on port 3000'));
