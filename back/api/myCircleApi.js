const MyCircle = require('../models/myCircle');

const createRoom = async (req, res, next) => {
	try {
		const room = new MyCircle(req.body);
		const result = await room.save();
		res.status(201).send(result._id);
	} catch (e) {
		if (e.name === 'ValidationError') {
			res.status(400).send(e);
		} else {
			res.status(500).send(e);
		}
	}
};

const getRoom = async (req, res, next) => {
	try {
		const room = await MyCircle.findOne({ name: req.params.roomname });
		res.status(200).send(room);
	} catch (e) {
		res.status(500).send(e);
	}
};

const updateRoom = async (req, res, next) => {
	const room = req.body;
	try {
		const result = await MyCircle.update(
			{ name: req.params.roomname },
			room
		);

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
		const result = await MyCircle.deleteOne({ name: req.params.roomname });
		if (result.deletedCount === 0) res.status(404).send();
		else res.status(200).send('Deleted Successfully');
	} catch (e) {
		res.status(500).send(e);
	}
};

const joinRoom = async (req, res, next) => {
	try {
		const result = await MyCircle.updateOne(
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
	createRoom,
	getRoom,
	deleteRoom,
	updateRoom,
	joinRoom
};
