import { useEffect, useState } from 'react';
import axios from 'axios';
import './notes.scss';

const Notes = () => {
	const [notes, setNotes] = useState([]);
	const [note, setNote] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPages, setTotalPages] = useState(0);
	const [totalNotes, setTotalNotes] = useState(0);

	useEffect(() => {
		fetchNotes();
	}, [currentPage, pageSize]);

	const fetchNotes = async () => {
		try {
			const response = await axios.get(
				`https://inkwell-server.vercel.app/api/note?page=${currentPage}&pageSize=${pageSize}`
			);
			// console.log(response.data);
			setNotes(response.data.notes);
			setTotalPages(response.data.totalPages);
			setTotalNotes(response.data.totalNotes);
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
			await axios.post(
				'https://inkwell-server.vercel.app/api/note/post',
				{
					content: note,
				}
			);
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
			await axios.put(
				`https://inkwell-server.vercel.app/api/note/${noteId}`,
				{
					content: editedContent,
				}
			);
			// setNotes((prevNotes) =>
			// 	prevNotes.map((prevNote) =>
			// 		prevNote._id === noteId
			// 			? { ...prevNote, content: editedContent }
			// 			: prevNote
			// 	)
			// );
			fetchNotes();
		} catch (err) {
			console.log(err);
		}
	};

	const handleDelete = async (noteId) => {
		try {
			await axios.delete(
				`https://inkwell-server.vercel.app/api/note/${noteId}`
			);
			// setNotes((prevNotes) =>
			// 	prevNotes.filter((prevNote) => prevNote._id !== noteId)
			// );
			fetchNotes();
		} catch (err) {
			console.log(err);
		}
	};

	const handlePageChange = (pageNumber) => setCurrentPage(pageNumber);

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

			<div className='pagination'>
				{Array.from({ length: totalPages }, (_, i) => i + 1).map(
					(pageNumber) => (
						<button
							key={pageNumber}
							className={
								pageNumber === currentPage ? 'active' : ''
							}
							onClick={() => handlePageChange(pageNumber)}>
							{pageNumber}
						</button>
					)
				)}
			</div>
		</div>
	);
};

export default Notes;
