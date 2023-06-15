import mongoose from 'mongoose';
const { Schema } = mongoose;

const noteSchema = new Schema({
	userId: {
		type: String,
		required: true,
	},
	content: {
		type: String,
		maxLength: 500,
		required: true,
	},
	createdAt: { type: Date, default: Date.now },
});

const Note = mongoose.model('Note', noteSchema);
export default Note;
