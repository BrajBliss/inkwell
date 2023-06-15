import express from 'express';
import mongoose from 'mongoose';
import 'dotenv/config';

const app = express();

mongoose
	.connect(process.env.MONGODB)
	.then(() => console.log('Connected to MongoDB'));

app.use(express.json());

app.listen(8080, () => console.log('Server is running on port 8080'));
