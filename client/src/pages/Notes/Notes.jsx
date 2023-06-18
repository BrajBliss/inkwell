import { useEffect, useState } from 'react';
import axios from 'axios';
import './notes.scss';

const Notes = () => {
	const [notes, setNotes] = useState([]);
	const [note, setNote] = useState('');

	useEffect(() => {
		fetchNotes();
	}, []);

	const fetchNotes = async () => {
		try {
			const response = await axios.get('/api/note');
			// console.log(response.data);
			setNotes(response.data);
		} catch (err) {
			console.log(err);
		}
	};

	const handleChange = (e) => {
		setNote(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post('/api/note/post', {
				content: note,
			});
			// console.log(note);
			fetchNotes();
		} catch (err) {
			console.log(err);
		}
		e.target.note.value = '';
	};

	const [editingNoteId, setEditingNoteId] = useState(null);

	const handleEditClick = (noteId) => {
		setEditingNoteId(noteId);
	};

	const handleEditSubmit = (noteId, editedContent) => {
		handleEdit(noteId, editedContent);
		setEditingNoteId(null);
	};

	const handleEdit = async (noteId, editedContent) => {
		try {
			await axios.put(`/api/note/${noteId}`, {
				content: editedContent,
			});
			setNotes((prevNotes) =>
				prevNotes.map((prevNote) =>
					prevNote._id === noteId
						? { ...prevNote, content: editedContent }
						: prevNote
				)
			);
			// fetchNotes();
		} catch (err) {
			console.log(err);
		}
	};

	const handleDelete = async (noteId) => {
		try {
			await axios.delete(`/api/note/${noteId}`);
			setNotes((prevNotes) =>
				prevNotes.filter((prevNote) => prevNote._id !== noteId)
			);
			// fetchNotes();
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className='notes'>
			<div className='compose'>
				<form onSubmit={handleSubmit}>
					<input
						name='note'
						type='text'
						className='composer'
						placeholder='Type or Paste...'
						onChange={handleChange}
					/>
				</form>
			</div>

			<div className='notes-list'>
				<div className='list-header'>
					<div className='list-header-Content'>Content</div>
					<div className='list-header-options'>Options</div>
				</div>

				<div className='list-items'>
					{notes.map((note, index) => (
						<div className='item' key={index}>
							{editingNoteId === note._id ? (
								<>
									<div className='content'>
										<input
											type='text'
											value={note.content}
											className='composer'
											onChange={(e) => {
												setNotes((prevNotes) =>
													prevNotes.map((prevNote) =>
														prevNote._id ===
														note._id
															? {
																	...prevNote,
																	content:
																		e.target
																			.value,
															  }
															: prevNote
													)
												);
											}}
										/>
									</div>

									<div className='btn'>
										<button
											className='Save'
											onClick={(e) => {
												e.preventDefault();
												handleEditSubmit(
													note._id,
													note.content
												);
											}}>
											Save
										</button>
										<button
											onClick={() => {
												setEditingNoteId(null);
												fetchNotes();
											}}
											className='discard'>
											Discard
										</button>
									</div>
								</>
							) : (
								<>
									<div className='content'>
										{note.content}
									</div>

									<div className='btn'>
										<button
											onClick={() =>
												handleEditClick(note._id)
											}
											className='edit'>
											Edit
										</button>
										<button
											onClick={() =>
												handleDelete(note._id)
											}
											className='delete'>
											Delete
										</button>
									</div>
								</>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Notes;
