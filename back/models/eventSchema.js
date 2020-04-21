const mongoose = require('mongoose');

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
	photo: {
		type: String, //datatype to be updated
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
