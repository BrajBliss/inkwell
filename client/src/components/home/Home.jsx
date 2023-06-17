import Notes from '../../pages/Notes/Notes';
import Navbar from '../navbar/Navbar';
import './home.scss';

const Home = () => {
	return (
		<div className='home'>
			<Navbar />
			<Notes />
		</div>
	);
};

export default Home;
