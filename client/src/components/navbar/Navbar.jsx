import { Link } from 'react-router-dom';
import './navbar.scss';

const Navbar = () => {
	return (
		<div className='navbar'>
			<Link to='/' className='logo'>
				Ink Well
			</Link>
			<Link to='/login' className='user'>
				Log out
			</Link>
		</div>
	);
};

export default Navbar;
