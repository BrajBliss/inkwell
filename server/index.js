import express from 'express';
import mongoose from 'mongoose';
import cookieParser from 'cookie-parser';
import 'dotenv/config';
import authRoutes from './routes/auth.js';
import noteRoutes from './routes/note.js';

const app = express();
app.use((req, res, next) => {
	res.header('Access-Control-Allow-Origin', 'ORIGIN');
	res.header(
		'Access-Control-Allow-Methods',
		'PUT, GET, HEAD, POST, PATCH, DELETE, CONNECT, OPTIONS'
	);
	res.header(
		'Access-Control-Allow-Headers',
		'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept, *'
	);
	res.header('Access-Control-Allow-Credentials', 'true');
	res.header('Access-Control-Expose-Headers', '*');
	next();
});

app.use(express.json());
app.use(cookieParser());

mongoose
	.connect(process.env.MONGODB)
	.then(() => console.log('Connected to MongoDB'));

app.use('/api/auth', authRoutes);
app.use('/api/note', noteRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log('Server is running on port ' + PORT));
