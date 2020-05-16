const Event = require('../models/eventSchema');
const Room = require('../models/roomSchema');
const Profile = require('../models/profileSchema');

//contains api for event related communication with database and server

const eventList = async (req, res, next) => {             //find event list method
	try {
		const events = await Event.find({});
		res.status(200).send(events);
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
};

const categorySearch = async (req, res, next) => {        //search for category method
	try {
		const events = await Event.find({ categories: req.search });
		res.status(200).send(events);
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
};

const createEvent = async (req, res, next) => {          //create event method
	try {
		const event = new Event(req.body);
		const result = await event.save();
		// const id = mongoose.Types.ObjectId(JSON.parse(event.organiserID));
		const updateHistory = await Profile.findOneAndUpdate(
			{ _id: event.organiserID },
			{ $push: { history: event._id } }
		);
		res.status(201).send(result._id);
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
};

const getEvent = async (req, res, next) => {           //get event method
	try {
		const event = await Event.findOne({ _id: req.params.eventid });
		let rooms = [];
		const roomID = event.roomID;
		async function room() {
			for (let i = 0; i < roomID.length; i++) {
				const room = await Room.findOne({ _id: roomID[i] });
				rooms.push(room);
			}
		}
		await room();
		const organiser = await Profile.findOne({ _id: event.organiserID });
		const responseObj = {
			event: event,
			rooms: rooms,
			organiser: organiser,
		};
		res.status(200).send(responseObj);
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
};

// const updateRoom = async (req, res, next) => {
// 	const room = req.body;
// 	try {
// 		const result = await MyCircle.update(
// 			{ name: req.params.roomname },
// 			room
// 		);

// 		if (result.ok === 1) res.status(200).send('Update Success');
// 	} catch (e) {
// 		if (result.ok === 1 && result.nModified > 0)
// 			res.status(200).send('Update Success');
// 		else res.status(404).send('Room Not Found');

// 		if (e.name === 'ValidationError') {
// 			res.status(400).send(e);
// 		} else {
// 			res.status(500).send(e);
// 		}
// 	}
// };

// const deleteRoom = async (req, res, next) => {
// 	try {
// 		const result = await MyCircle.deleteOne({ name: req.params.roomname });
// 		if (result.deletedCount === 0) res.status(404).send();
// 		else res.status(200).send('Deleted Successfully');
// 	} catch (e) {
// 		res.status(500).send(e);
// 	}
// };

// const joinRoom = async (req, res, next) => {
// 	try {
// 		const result = await MyCircle.updateOne(
// 			{ name: req.params.roomname },
// 			{ $push: { parti: req.body.username } }
// 		);
// 		if (result.ok === 1 && result.nModified > 0)
// 			res.status(200).send('Join Successfully');
// 		else res.status(404).send('Room Not Found');
// 	} catch (e) {
// 		res.status(500).send(e);
// 	}
// };

module.exports = {       //encapsulation of the event api module
	eventList,
	createEvent,
	getEvent,
	categorySearch,
	// deleteRoom,
	// updateRoom,
	// joinRoom,
};
