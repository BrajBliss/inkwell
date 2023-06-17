import './login.scss';
import { Link } from 'react-router-dom';

const Login = () => {
	return (
		<div className='container'>
			<h1>Login</h1>
			<form className='form'>
				<input type='email' placeholder='email' />
				<input type='password' placeholder='password' />
				<button className='login-btn'>Login</button>
				<Link className='sign-up' to='/register'>
					Sign up!
				</Link>
			</form>
		</div>
	);
};

export default Login;
