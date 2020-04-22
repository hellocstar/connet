const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
	username: {
		type: String,
		required: [true, 'Username is required'],
		unique: true,
	},
	salt: {
		type: String,
		required: [true, 'Password is required'],
	},
	hash: {
		type: String,
		required: [true, 'Password is required'],
	},
	email: {
		type: String,
		required: [true, 'Email is required'],
		unique: true,
	},
	imageName: {
		type: String,
		default: 'none',
	},
	imageData: {
		type: String,
	},
	biography: {
		type: String,
	},
	birthday: {
		type: Date, //any "Date" datatype?
	},
	friends: {
		type: [String], //id of user friends
	},
	history: {
		type: [String], //id of rooms history
	},
	interests: {
		type: [String],
	},
});

const Profile = mongoose.model('profile', profileSchema);
module.exports = Profile;
