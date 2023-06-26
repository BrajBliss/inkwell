import { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import './notes.scss';
import { AuthContext } from '../../context/authContext';
import SyncLoader from 'react-spinners/SyncLoader';

const Notes = () => {
	const [notes, setNotes] = useState([]);
	const [note, setNote] = useState('');
	const [currentPage, setCurrentPage] = useState(1);
	const [pageSize, setPageSize] = useState(5);
	const [totalPages, setTotalPages] = useState(0);
	const [totalNotes, setTotalNotes] = useState(0);
	const [isLoading, setIsLoading] = useState(false);
	const color = 'rgba(255, 255, 255, 0.87)';
	// const userIdFromParam = window.location.pathname.split('/')[1];
	// console.log(userIdFromParam);

	const { userId } = useContext(AuthContext);

	useEffect(() => {
		fetchNotes();
	}, [currentPage, pageSize]);

	const fetchNotes = async () => {
		try {
			setIsLoading(true);
			const response = await axios.get(
				`/api/note?page=${currentPage}&pageSize=${pageSize}&userId=${userId}`
			);
			// console.log(response.data);
			setNotes(response.data.notes);
			setTotalPages(response.data.totalPages);
			setTotalNotes(response.data.totalNotes);
			setIsLoading(false);
		} catch (err) {
			setIsLoading(false);
			console.log(err);
		}
	};

	const handleChange = (e) => {
		setNote(e.target.value);
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		try {
			await axios.post(`/api/note/post/${userId}`, {
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
	const [isEditingNoteLoading, setIsEditingNoteLoading] = useState(false);

	const handleEditClick = (noteId) => {
		setEditingNoteId(noteId);
	};

	const handleEditSubmit = async (noteId, editedContent) => {
		await handleEdit(noteId, editedContent);
		setEditingNoteId(null);
	};

	const handleEdit = async (noteId, editedContent) => {
		try {
			setIsEditingNoteLoading(true);
			await axios.put(`/api/note/${noteId}`, {
				content: editedContent,
			});
			// setNotes((prevNotes) =>
			// 	prevNotes.map((prevNote) =>
			// 		prevNote._id === noteId
			// 			? { ...prevNote, content: editedContent }
			// 			: prevNote
			// 	)
			// );
			setIsEditingNoteLoading(false);
			fetchNotes();
		} catch (err) {
			setIsEditingNoteLoading(false);
			console.log(err);
		}
	};

	const [isDeletingNote, setIsDeletingNote] = useState(false);

	const handleDelete = async (noteId) => {
		try {
			setIsDeletingNote(true);
			await axios.delete(`/api/note/${noteId}`);
			// setNotes((prevNotes) =>
			// 	prevNotes.filter((prevNote) => prevNote._id !== noteId)
			// );
			setIsDeletingNote(false);
			fetchNotes();
		} catch (err) {
			setIsDeletingNote(false);
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
				{isLoading ? (
					<SyncLoader
						className='loader-main'
						color={color}
						loading={isLoading}
						// cssOverride={override}
						size={3}
						margin={0}
					/>
				) : (
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
														prevNotes.map(
															(prevNote) =>
																prevNote._id ===
																note._id
																	? {
																			...prevNote,
																			content:
																				e
																					.target
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
												{/* {isEditingNoteLoading ? (
													<SyncLoader
														className='loader-save'
														color={color}
														loading={
															isEditingNoteLoading
														}
														size={3}
														margin={0}
													/>
												) : (
													'Save'
												)} */}
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
												{/* {isDeletingNote ? (
													<SyncLoader
														className='loader-delete'
														color={color}
														loading={isDeletingNote}
														size={3}
														margin={0}
													/>
												) : (
													'Delete'
												)} */}
											</button>
										</div>
									</>
								)}
							</div>
						))}
					</div>
				)}
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
