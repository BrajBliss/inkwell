import Note from '../models/Note.js';

export const createNote = async (req, res) => {
	try {
		const newNote = new Note({
			userId: req.params.id,
			content: req.body.content,
		});
		const savedNote = await newNote.save();
		res.status(200).json(savedNote);
	} catch (err) {
		console.log(err);
	}
};

export const getNotes = async (req, res) => {
	try {
		const page = parseInt(req.query.page) || 1;
		const pageSize = parseInt(req.query.pageSize) || 5;
		const skip = (page - 1) * pageSize;
		// if (req.cookies.userId) {
		try {
			const totalNotes = await Note.countDocuments({
				userId: req.query.userId,
			});
			const totalPages = Math.ceil(totalNotes / pageSize);

			const notes = await Note.find({ userId: req.query.userId })
				.sort({
					createdAt: 'desc',
				})
				.skip(skip)
				.limit(pageSize);
			res.status(200).json({
				notes,
				currentPage: page,
				totalPages,
				totalNotes,
			});
		} catch (err) {
			console.log(err);
		}
		// } else {
		// 	res.status(401).json({
		// 		message: 'Unauthorized, no cookie',
		// 	});
		// }
		// const notes = await Note.find();
		// res.status(200).json(notes);
	} catch (err) {
		console.log(err);
	}
};

export const updateNote = async (req, res) => {
	try {
		await Note.findByIdAndUpdate(req.params.id, {
			content: req.body.content,
		});
		res.status(200).json({ message: 'Note updated' });
	} catch (err) {
		console.log(err);
	}
};

export const deleteNote = async (req, res) => {
	try {
		await Note.findByIdAndDelete(req.params.id);
		res.status(200).json({ message: 'Note deleted' });
	} catch (err) {
		console.log(err);
	}
};
