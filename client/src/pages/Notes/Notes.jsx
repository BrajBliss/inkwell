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
					<div className='item1 item'>
						<div className='content'>First Note Content</div>
						<div className='btn'>
							<button className='edit'>EDIT</button>
							<button className='delete'>DELETE</button>
						</div>
					</div>
					<div className='item2 item'>
						<div className='content'>Second Note Content</div>
						<div className='btn'>
							<button className='edit'>EDIT</button>
							<button className='delete'>DELETE</button>
						</div>
					</div>
					<div className='item3 item'>
						<div className='content'>Third Note Content</div>
						<div className='btn'>
							<button className='edit'>EDIT</button>
							<button className='delete'>DELETE</button>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Notes;
