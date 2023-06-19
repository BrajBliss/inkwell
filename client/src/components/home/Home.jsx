import Notes from '../../pages/Notes/Notes';
import Navbar from '../navbar/Navbar';
import './home.scss';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import Login from '../../pages/auth/login/Login';

const Home = () => {
	const { currentUser } = useContext(AuthContext);

	return (
		// <div className='home'>
		// 	{currentUser ? (
		// 		<>
		// 			<Navbar />
		// 			<Notes />
		// 		</>
		// 	) : (
		// 		<Login />
		// 	)}
		// </div>
		<div className='home'>
			<Navbar />
			<Notes />
		</div>
	);
};

export default Home;
