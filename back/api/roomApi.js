const Profile = require('../models/profileSchema');
const Room = require('../models/roomSchema');
const Event = require('../models/eventSchema');

const roomList = async (req, res, next) => {
	try {
		const user = await Profile.findOne({ _id: req.body.id });
		friends = user.friends;
		const rooms = [];
		for (let i = 0; i < friends.length; i++) {
			const friendRooms = await Room.find({ hostID: friends[i] });
			for (let j = 0; j < friendRooms.length; i++) {
				if (friendRooms[j].type === 'mycircle') {
					rooms.push(friendRooms[j]);
				}
			}
		}
		const roomByMe = await Room.find({ hostID: user._id });
		for (let i = 0; i < roomByMe.length; i++) {
			if (roomByMe[i].type === 'mycircle') {
				rooms.push(roomByMe[i]);
			}
		}
		console.log(rooms);
		res.status(200).send(rooms);
	} catch (e) {
		res.status(500).send(e);
	}
};

const createRoom = async (req, res, next) => {
	try {
		const room = new Room(req.body);
		const result = await room.save();
		const updateHistory = await Profile.findOneAndUpdate(
			{ _id: room.hostID },
			{ $push: { history: room._id } }
		);
		if (room.type !== 'mycircle') {
			const updateEvent = await Event.findOneAndUpdate(
				{ _id: room.type },
				{ $push: { roomID: result._id } }
			);
		}
		res.status(201).send(result._id);
	} catch (e) {
		res.status(500).send(e);
	}
};

const getRoom = async (req, res, next) => {
	try {
		const room = await Room.findOne({ _id: req.params.roomid });
		const host = await Profile.findOne({ _id: room.hostID });
		let typeName = room.type;
		if (room.type != 'mycircle') {
			const event = await Event.findOne({ _id: room.type });
			typeName = event.name;
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
			type: room.type,
			typeName: typeName,
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
		// if (result.deletedCount === 0) res.status(404).send();
		res.status(200).send('Deleted Successfully');
	} catch (e) {
		res.status(500).send(e);
	}
};

const joinRoom = async (req, res, next) => {
	try {
		const result = await Room.updateOne(
			{ _id: req.body.roomID },
			{ $push: { participants: req.body.userID } }
		);
		if (result.ok === 1 && result.nModified > 0)
			res.status(200).send({ joined: true });
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
