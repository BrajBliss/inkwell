import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [currentUser, setCurrentUser] = useState(
		JSON.parse(localStorage.getItem('user')) || null
	);

	useEffect(() => {
		localStorage.setItem('user', JSON.stringify(currentUser));
	}, [currentUser]);

	const login = async (inputs) => {
		const res = await axios.post('/api/auth/login', inputs);
		setCurrentUser(res.data);
	};

	const logout = async () => {
		await axios.get('/api/auth/logout');
		setCurrentUser(null);
	};

	const authContextValue = {
		currentUser,
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
