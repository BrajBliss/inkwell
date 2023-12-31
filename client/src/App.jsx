import './App.css';
import {
	RouterProvider,
	createBrowserRouter,
	Navigate,
} from 'react-router-dom';
import Register from './pages/auth/register/Register';
import Login from './pages/auth/login/Login';
import Home from './components/home/Home';
import { useContext } from 'react';
import { AuthContext } from './context/authContext';
import axios from 'axios';

// axios.defaults.baseURL = 'http://localhost:3000/';
axios.defaults.baseURL = 'https://inkwell-server.vercel.app/';
axios.defaults.withCredentials = true;

function App() {
	const { userId } = useContext(AuthContext);

	const router = createBrowserRouter([
		{
			path: '/',

			element: userId ? <Home /> : <Navigate to='/login' />,
			// element: <Home />,
		},
		{
			path: '/register',
			element: userId ? <Navigate to='/' /> : <Register />,
		},
		{
			path: '/login',
			element: userId ? <Navigate to='/' /> : <Login />,
		},
		{
			path: '/:userIdId',
			element: userId ? <Home /> : <Navigate to='/login' />,
		},
	]);

	return (
		<div className='app'>
			<div className='container'>
				<RouterProvider router={router} />
			</div>
		</div>
	);
}

export default App;
