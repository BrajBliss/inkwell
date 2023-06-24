import axios from 'axios';
import { createContext, useState, useEffect } from 'react';
// import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
	const [userId, setUserId] = useState(
		JSON.parse(localStorage.getItem('userId')) || null
	);

	useEffect(() => {
		localStorage.setItem('userId', JSON.stringify(userId));
	}, [userId]);

	const login = async (inputs) => {
		const res = await axios.post('/api/auth/login', inputs);
		setUserId(res.data.userId);
	};

	const logout = async () => {
		await axios.get('/api/auth/logout');
		setUserId(null);
	};

	const authContextValue = {
		userId,
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
