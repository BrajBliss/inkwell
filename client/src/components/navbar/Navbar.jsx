import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { AuthContext } from '../../context/authContext';
import './navbar.scss';

const Navbar = () => {
	// const navigate = useNavigate();

	const { logout } = useContext(AuthContext);

	const handleClick = () => {
		logout();
		// navigate('/login');
	};

	return (
		<div className='navbar'>
			<Link to='/' className='logo'>
				Ink Well
			</Link>
			<button className='user' onClick={handleClick}>
				Log out
			</button>
		</div>
	);
};

export default Navbar;
