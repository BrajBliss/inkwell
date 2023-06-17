import './App.css';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Register from './pages/auth/register/Register';
import Login from './pages/auth/login/Login';
import Home from './components/home/Home';

const router = createBrowserRouter([
	{
		path: '/',
		element: <Home />,
	},
	{
		path: '/register',
		element: <Register />,
	},
	{
		path: '/login',
		element: <Login />,
	},
]);

function App() {
	return (
		<div className='app'>
			<div className='container'>
				<RouterProvider router={router} />
			</div>
		</div>
	);
}

export default App;
