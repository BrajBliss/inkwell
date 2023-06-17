import './notes.scss';

const Notes = () => {
	return (
		<div className='notes'>
			<div className='compose'>
				<input
					type='text'
					className='composer'
					placeholder='Type or Paste...'
				/>
			</div>

			<div className='notes-list'>
				<div className='list-header'>
					<div className='list-header-title'>Title</div>
					<div className='list-header-date'>Date</div>
				</div>

				<div className='list-items'>
					<div className='item1'>First Note</div>
				</div>
			</div>
		</div>
	);
};

export default Notes;
