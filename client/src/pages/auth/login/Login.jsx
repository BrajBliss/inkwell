import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import { useContext, useState } from 'react';
import SyncLoader from 'react-spinners/SyncLoader';

const Login = () => {
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	});

	const [isLoading, setIsLoading] = useState(false);
	const color = 'rgba(255, 255, 255, 0.87)';
	const navigate = useNavigate();

	const { login } = useContext(AuthContext);

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleClick = async (e) => {
		e.preventDefault();
		// console.log(inputs);

		try {
			setIsLoading(true);
			await login(inputs);
			setIsLoading(false);
			navigate('/');
		} catch (err) {
			setIsLoading(false);
			console.log(err);
			if (err.response && err.response.data) {
				if (err.response.data === 'Enter correct email address') {
					alert('Please enter a valid email address.');
				} else if (err.response.data === 'Wrong password') {
					alert('Please enter the correct password.');
				} else if (
					err.response.data ===
					'Email does not exist. Please register.'
				) {
					alert('Email does not exist. Please register.');
				} else {
					alert('Please try again.');
				}
			} else {
				alert('Please try again.');
			}
		}
	};

	return (
		<div className='container'>
			<h1>Login</h1>
			<form className='form'>
				<input
					type='email'
					placeholder='email'
					name='email'
					required
					onChange={handleChange}
				/>
				<input
					type='password'
					placeholder='password'
					name='password'
					required
					onChange={handleChange}
				/>
				<button className='login-btn' onClick={handleClick}>
					{isLoading ? (
						<SyncLoader
							color={color}
							loading={isLoading}
							// cssOverride={override}
							size={3}
							margin={0}
						/>
					) : (
						'Login'
					)}
				</button>
				<Link className='sign-up' to='/register'>
					Sign up!
				</Link>
			</form>
		</div>
	);
};

export default Login;
