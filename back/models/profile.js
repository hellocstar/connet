const mongoose = require('mongoose');

const profile = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Username is required'],
		unique: true
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true
	},
	password: {
		type: String,
		required: [true, 'Password is required']
	},
	friends_ID: {
		type: [String] //id of user friends
	},
	pending_friend: {
		type: [String] //id of friend requests
	},
	MyCircle_parti: {
		type: [String] //id of participants in a room
	},
	MyCircle_host: {
		type: String //id of the host of a room
	},
	history: {
		type: [String] //id of rooms history
	}
});

const Profile = mongoose.model('Profile', profile);

module.exports = Profile;
