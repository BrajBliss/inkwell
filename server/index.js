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

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Server is running on port 3000'));

module.exports = (req, res) => {
	//set header first to allow request or origin domain (value can be different)
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader(
		'Access-Control-Allow-Headers',
		'Origin, X-Requested-With, Content-Type, Accept'
	);
	res.setHeader('Access-Control-Allow-Credentials', true);
	res.setHeader(
		'Access-Control-Allow-Methods',
		'GET, POST, PUT, PATCH, OPTIONS, DELETE'
	);

	//---- other code

	//Preflight CORS handler
	if (req.method === 'OPTIONS') {
		return res.status(200).json({
			body: 'OK',
		});
	}
};
