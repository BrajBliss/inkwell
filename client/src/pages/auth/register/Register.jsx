import './register.scss';
import axios from 'axios';
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Register = () => {
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	});

	const navigate = useNavigate();

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleClick = async (e) => {
		e.preventDefault();
		// console.log(inputs);

		try {
			await axios.post(
				'https://inkwell-server.vercel.app/api/auth/register',
				inputs
			);
			navigate('/login');
		} catch (err) {
			console.log(err);
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
					Sign up
				</button>
				<Link className='login' to='/login'>
					Login!
				</Link>
			</form>
		</div>
	);
};

export default Register;
