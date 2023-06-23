import User from '../models/User.js';
import bcrypt from 'bcrypt';

const saltRounds = 10;

export const register = async (req, res) => {
	const { email, password } = req.body;
	try {
		// check if user already exists
		const alreadyExists = await User.findOne({ email: email });
		if (alreadyExists) {
			return res.status(401).send('Email already exists. Please login.');
		} else {
			// hash the password using salt
			const digest = await bcrypt.hash(password, saltRounds);

			const newUser = new User({ email, password: digest });
			const user = await newUser.save();
			res.status(201).json(user);
		}
	} catch (err) {
		console.log(err);
	}
};

export const login = async (req, res) => {
	const { email, password } = req.body;

	try {
		// check if user exists
		const userExists = await User.findOne({ email: email });
		if (userExists) {
			// compare password
			const isMatch = await bcrypt.compare(password, userExists.password);
			if (isMatch) {
				const userId = userExists._id.toString();
				res.cookie('userId', userId, {
					httpOnly: true,
					sameSite: 'none',
					secure: true,
					domain: 'inkwell-server.netlify.app',
				})
					.status(200)
					.json('logged in successfully');
			} else res.status(401).send('Invalid credentials');
		} else {
			return res
				.status(401)
				.send('Email does not exist. Please register.');
		}
	} catch (err) {
		console.log(err);
	}
};

export const getUser = async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		res.status(200).json(user);
		// console.log(user._id.toString());
	} catch (err) {
		console.log(err);
	}
};

export const logout = (req, res) => {
	res.clearCookie('userId', {
		httpOnly: true,
		sameSite: 'none',
		secure: true,
	})
		.status(200)
		.json('logged out successfully');
};
