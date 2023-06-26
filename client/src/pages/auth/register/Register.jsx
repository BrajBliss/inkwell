import './register.scss';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import SyncLoader from 'react-spinners/SyncLoader';

const Register = () => {
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	});

	const [isLoading, setIsLoading] = useState(false);
	const color = 'rgba(255, 255, 255, 0.87)';

	const navigate = useNavigate();

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleClick = async (e) => {
		e.preventDefault();
		// console.log(inputs);

		try {
			setIsLoading(true);
			await axios.post('/api/auth/register', inputs);
			setIsLoading(false);
			navigate('/login');
		} catch (err) {
			setIsLoading(false);
			console.log(err);
			err.response.data === 'Enter correct email address' &&
				alert('Enter correct email address');
		}
	};

	return (
		<div className='container'>
			<h1>Register</h1>
			<form className='form'>
				<input
					name='email'
					type='email'
					required
					placeholder='email'
					onChange={handleChange}
				/>
				<input
					name='password'
					type='password'
					required
					placeholder='password'
					onChange={handleChange}
				/>
				<button className='sign-up-btn' onClick={handleClick}>
					{isLoading ? (
						<SyncLoader
							color={color}
							loading={isLoading}
							// cssOverride={override}
							size={3}
							margin={0}
						/>
					) : (
						'Sign up'
					)}
				</button>
				<Link className='login' to='/login'>
					Login!
				</Link>
			</form>
		</div>
	);
};

export default Register;
