const mongoose = require('mongoose');

const myCircle = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'room name needed']
	},
	date: {
		type: Date,
		required: [true, 'date needed']
	},
	// time: {
	// 	type: TimeRanges
	// 	// required: [true, 'time needed'] //required but data type is what?
	// },
	location: {
		type: String,
		required: [true, 'venue needed']
	},
	hostID: {
		type: String, //id of host
		required: [true, 'host needed']
	},
	description: {
		type: String
	},
	photo: {
		type: String //datatype to be updated
	},
	categories: {
		type: [String]
	},
	maxNoOfParticipants: {
		type: String //datatype to be updated
	},
	participants: {
		type: [String] //id of participant
	},
	pending_parti: {
		type: [String] //id of pending participant
	}
});

const MyCircle = mongoose.model('MyCircle', myCircle);
module.exports = MyCircle;
