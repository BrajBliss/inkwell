import './login.scss';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';
import { useContext, useState } from 'react';

const Login = () => {
	const [inputs, setInputs] = useState({
		email: '',
		password: '',
	});

	const navigate = useNavigate();

	const { login } = useContext(AuthContext);

	const handleChange = (e) => {
		setInputs((prev) => ({ ...prev, [e.target.name]: e.target.value }));
	};

	const handleClick = async (e) => {
		e.preventDefault();
		// console.log(inputs);

		try {
			await login(inputs);
			navigate('/');
		} catch (err) {
			console.log(err);
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
					Login
				</button>
				<Link className='sign-up' to='/register'>
					Sign up!
				</Link>
			</form>
		</div>
	);
};

export default Login;
