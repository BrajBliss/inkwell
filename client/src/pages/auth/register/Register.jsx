import { Link } from 'react-router-dom';
import './register.scss';

const Register = () => {
	return (
		<div className='container'>
			<h1>Register</h1>
			<form className='form'>
				<input type='email' placeholder='email' />
				<input type='password' placeholder='password' />
				<button className='sign-up-btn'>Sign up</button>
				<Link className='login' to='/login'>
					Login!
				</Link>
			</form>
		</div>
	);
};

export default Register;
