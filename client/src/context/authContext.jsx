import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [user, setUser] = useState(
		JSON.parse(localStorage.getItem('userId')) || null
	);

	useEffect(() => {
		localStorage.setItem('userId', JSON.stringify(user));
	}, [user]);

	const login = async (inputs) => {
		const res = await axios.post('/api/auth/login', inputs);
		setUser(res.data.userId);
	};

	const logout = async () => {
		await axios.get('/api/auth/logout');
		setUser(null);
	};

	const authContextValue = {
		user,
		login,
		logout,
	};

	return (
		<AuthContext.Provider value={authContextValue}>
			{children}
		</AuthContext.Provider>
	);
};

// AuthContextProvider.propTypes = {
// 	children: PropTypes.node.isRequired,
// };
