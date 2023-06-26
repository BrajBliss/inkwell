import { Link } from 'react-router-dom';
import { useContext, useState } from 'react';
import { AuthContext } from '../../context/authContext';
import './navbar.scss';
import SyncLoader from 'react-spinners/SyncLoader';

const Navbar = () => {
	// const navigate = useNavigate();

	const [isLoading, setIsLoading] = useState(false);
	const color = 'rgba(255, 255, 255, 0.87)';

	const { logout } = useContext(AuthContext);

	const handleClick = async () => {
		setIsLoading(true);
		await logout();
		setIsLoading(false);
		// navigate('/login');
	};

	return (
		<div className='navbar'>
			<Link to='/' className='logo'>
				Ink Well
			</Link>
			<button className='user' onClick={handleClick}>
				{isLoading ? (
					<SyncLoader
						color={color}
						loading={isLoading}
						// cssOverride={override}
						size={3}
						margin={0}
					/>
				) : (
					'Log out'
				)}
			</button>
		</div>
	);
};

export default Navbar;
