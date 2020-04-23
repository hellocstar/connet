const Profile = require('../models/profileSchema');
const Event = require('../models/eventSchema');
const Room = require('../models/roomSchema');
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
		res.status(200).send(profile);
	} catch (e) {
		if (e.name === 'ValidationError') {
			res.status(400).send(e);
		} else {
			res.status(500).send(e);
		}
	}
};

const signOut = async (req, res, next) => {
	try {
		req.logout();
		res.redirect('/signin');
	} catch (e) {
		res.status(500).send(e);
	}
};

const signInSuccess = async (req, res, next) => {
	try {
		res.send('You successfully logged in.');
	} catch (e) {
		res.status(500).send(e);
	}
};

const signInFail = async (req, res, next) => {
	try {
		res.send('Username or password is incorrect.');
	} catch (e) {
		res.status(500).send(e);
	}
};

const getProfile = async (req, res, next) => {
	try {
		const profile = await Profile.findOne({
			_id: req.params.profileid,
		});
		let friends = [];
		const friendID = profile.friends;
		async function getFriends() {
			for (let i = 0; i < friendID.length; i++) {
				const frd = await Profile.findOne({ _id: friendID[i] });
				friends.push({
					id: frd._id,
					username: frd.username,
				});
			}
		}
		await getFriends();
		let histEvents = [];
		const historyID = profile.history;
		async function getHistory() {
			for (let i = 0; i < historyID.length; i++) {
				let EventHist = await Event.findOne({ _id: historyID[i] });
				const roomHist = await Room.findOne({ _id: historyID[i] });
				if (EventHist) {
					histEvents.push({
						obj: EventHist,
						type: 'event',
					});
				} else if (roomHist) {
					histEvents.push({
						obj: roomHist,
						type: 'room',
					});
				} else {
					continue;
				}
			}
		}
		await getHistory();
		const responseObj = {
			profile: profile,
			friends: friends,
			history: histEvents,
		};
		res.status(200).send(responseObj);
	} catch (e) {
		console.log(e);
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
		const result = await Profile.findOneAndUpdate(
			{ _id: profile.id },
			{
				imageName: profile.imageName,
				imageData: profile.imageData,
				biography: profile.biography,
				birthday: profile.birthday,
				interests: profile.interests,
			}
		);
		res.status(200).send(profile.id);
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
};

const searchUsername = async (req, res, next) => {
	const username = req.body.username;
	try {
		const profile = await Profile.findOne({ username: username });
		if (profile) {
			res.status(200).send(profile);
		} else {
			res.status(200).send({ username: false });
		}
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
};

const addFriend = async (req, res, next) => {
	try {
		const result = await Profile.findOneAndUpdate(
			{ _id: req.body.me },
			{ $push: { friends: req.body.friend } }
		);
		res.status(200).send(result);
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
};

module.exports = {
	signIn,
	signUp,
	signOut,
	signInSuccess,
	signInFail,
	getProfile,
	deleteProfile,
	updateProfile,
	searchUsername,
	addFriend,
};
