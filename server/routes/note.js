import express from 'express';
import {
	createNote,
	getNotes,
	updateNote,
	deleteNote,
} from '../controllers/note.js';

const router = express.Router();

router.post('/post/:id', createNote);
router.get('/', getNotes);
router.put('/:id', updateNote);
router.delete('/:id', deleteNote);

export default router;
