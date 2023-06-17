import Bookmarks from '../../pages/Bookmarks/Bookmarks';
import Navbar from '../navbar/Navbar';
import './home.scss';

const Home = () => {
	return (
		<div className='home'>
			<Navbar />
			<Bookmarks />
		</div>
	);
};

export default Home;
