const mongoose = require('mongoose');

//contains all of event-related data types

const eventSchema = new mongoose.Schema({
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
	},
	location: {
		type: String,
		required: [true, 'location needed'],
	},
	organiserID: {
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
	roomID: {
		type: [String], //datatype to be updated
	},
});

const Event = mongoose.model('event', eventSchema);
module.exports = Event;
