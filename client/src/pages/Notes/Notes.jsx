import { useState } from 'react';
import axios from 'axios';
import './notes.scss';

const Notes = () => {
	const [note, setNote] = useState('');

	const handleSubmit = (e) => {
		e.preventDefault();
		setNote(e.target.note.value);
		e.target.note.value = '';
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
					/>
				</form>
			</div>

			<div className='notes-list'>
				<div className='list-header'>
					<div className='list-header-Content'>Content</div>
					<div className='list-header-options'>Options</div>
				</div>

				<div className='list-items'>
					<div className='item1 item'>
						<div className='content'>{note}</div>
						<div className='btn'>
							<button className='edit'>Edit</button>
							<button
								className='delete'
								onClick={() => setNote('')}>
								Delete
							</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Notes;
