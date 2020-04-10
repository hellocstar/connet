const Profile = require('../models/profileSchema');
const Passport = require('../config/passport');

const signIn = async (req, res, next) => {
	try {
		res.status(200).send(req.user);
	} catch (e) {
		if (e.name === 'ValidationError') {
			res.status(400).send(e);
		} else {
			res.status(500).send(e);
		}
	}
};

const signUp = async (req, res, next) => {
	try {
		const hashPw = Passport.genPassword(req.body.password);
		const user = {
			username: req.body.username,
			email: req.body.email,
			hash: hashPw.hash,
			salt: hashPw.salt,
		};
		const profile = new Profile(user);
		await profile.save();
		res.status(201).send('Successfully created an account!');
	} catch (e) {
		if (e.name === 'ValidationError') {
			res.status(400).send(e);
		} else {
			res.status(500).send(e);
		}
	}
};

const getProfile = async (req, res, next) => {
	try {
		const profile = await Profile.findOne({
			username: req.params.username,
		});
		res.status(200).send(profile);
	} catch (e) {
		res.status(500).send(e);
	}
};

const deleteProfile = async (req, res, next) => {
	try {
		const result = await Profile.deleteOne({
			username: req.params.username,
		});
		if (result.deletedCount === 0) res.status(404).send();
		else res.status(200).send('Deleted Successfully');
	} catch (e) {
		res.status(500).send(e);
	}
};

const updateProfile = async (req, res, next) => {
	const profile = req.body;
	try {
		const result = await Profile.update(
			{ username: req.params.username },
			profile
		);

		if (result.ok === 1) res.status(200).send('Update Success');

		if (result.ok === 1 && result.nModified > 0)
			res.status(200).send('Update Success');
		else res.status(404).send('Profile Not Found');
	} catch (e) {
		if (e.name === 'ValidationError') {
			res.status(400).send(e);
		} else {
			res.status(500).send(e);
		}
	}
};

module.exports = {
	signIn,
	signUp,
	getProfile,
	deleteProfile,
	updateProfile,
};
