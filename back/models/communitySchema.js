const mongoose = require('mongoose');

const community = new mongoose.Schema({
	name: {
		type: String,
		required: [true, 'room name needed'],
	},
	date: {
		type: String,
		required: [true, 'date needed'],
	},
	// time: {
	// 	type: TimeRanges
	// },
	location: {
		type: String,
		required: [true, 'venue needed'],
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

const Community = mongoose.model('Community', community, 'community');
module.exports = Community;
