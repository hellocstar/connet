const Profile = require('../models/profileSchema');
const Room = require('../models/roomSchema');
const Event = require('../models/eventSchema');

const roomList = async (req, res, next) => {
	try {
		const room = await Room.findOne({});
		res.status(200).send(room);
	} catch (e) {
		res.status(500).send(e);
	}
};

const createRoom = async (req, res, next) => {
	try {
		const room = new Room(req.body);
		const result = await room.save();
		res.status(201).send(result._id);
	} catch (e) {
		res.status(500).send(e);
	}
};

const getRoom = async (req, res, next) => {
	try {
		const room = await Room.findOne({ _id: req.params.roomid });
		const host = await Profile.findOne({ _id: room.hostID });
		const typeName = 'MyCircle';
		if (room.type != 'MyCircle') {
			const event = await Event.findOne({ _id: room.type });
			const typeName = event.name;
		}
		let participants = [];
		const partiID = room.participants;
		async function getParti() {
			for (let i = 0; i < partiID.length; i++) {
				const parti = await Profile.findOne({ _id: partiID[i] });
				participants.push({
					id: parti._id,
					username: parti.username,
				});
			}
		}
		await getParti();
		const responseObj = {
			room: room,
			host: {
				id: host._id,
				username: host.username,
			},
			type: typeName,
			participants: participants,
		};
		res.status(200).send(responseObj);
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
};

const updateRoom = async (req, res, next) => {
	const room = req.body;
	try {
		const result = await Room.update({ name: req.params.roomname }, room);

		if (result.ok === 1) res.status(200).send('Update Success');
	} catch (e) {
		if (result.ok === 1 && result.nModified > 0)
			res.status(200).send('Update Success');
		else res.status(404).send('Room Not Found');

		if (e.name === 'ValidationError') {
			res.status(400).send(e);
		} else {
			res.status(500).send(e);
		}
	}
};

const deleteRoom = async (req, res, next) => {
	try {
		const result = await Room.deleteOne({ name: req.params.roomname });
		if (result.deletedCount === 0) res.status(404).send();
		else res.status(200).send('Deleted Successfully');
	} catch (e) {
		res.status(500).send(e);
	}
};

const joinRoom = async (req, res, next) => {
	try {
		const result = await Room.updateOne(
			{ name: req.params.roomname },
			{ $push: { parti: req.body.username } }
		);
		if (result.ok === 1 && result.nModified > 0)
			res.status(200).send('Join Successfully');
		else res.status(404).send('Room Not Found');
	} catch (e) {
		res.status(500).send(e);
	}
};

module.exports = {
	roomList,
	createRoom,
	getRoom,
	deleteRoom,
	updateRoom,
	joinRoom,
};