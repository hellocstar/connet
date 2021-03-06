const mongoose = require('mongoose');

//contains all of room-related data types

const roomSchema = new mongoose.Schema({
	type: {
		type: String,
		required: [true, 'type (MyCircle/Event ID) needed'],
	},
	name: {
		type: String,
		required: [true, 'room name needed'],
	},
	date: {
		type: Date,
		required: [true, 'date needed'],
	},
	time: {
		type: String,
		// required: [true, 'time needed'] //required but data type is what?
	},
	location: {
		type: String,
		required: [true, 'venue needed'],
	},
	hostID: {
		type: String, //id of host
		required: [true, 'host needed'],
	},
	description: {
		type: String,
	},
	imageName: {
		type: String,
		default: 'none',
		// require: true,
	},
	imageData: {
		type: String,
		// require: true,
	},
	categories: {
		type: [String],
	},
	maxNoOfParticipants: {
		type: Number,
	},
	participants: {
		type: [String], //id of participant
	},
	// pending_parti: {
	// 	type: [String], //id of pending participant
	// },
});

const Room = mongoose.model('room', roomSchema);
module.exports = Room;
