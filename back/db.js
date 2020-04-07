const assert = require('assert');
const mongoose = require('mongoose');
let _db;

const initDb = async () => {
	if (_db) {
		console.warn('Trying to init DB again!');
		return;
	}
	try {
		await mongoose.connect(
			'mongodb+srv://admin:CSCI3100@cluster-tqoug.azure.mongodb.net/test?retryWrites=true&w=majority',
			{
				useFindAndModify: false,
				useNewUrlParser: true,
			}
		);
		_db = mongoose.connection;
		console.log('Connected successfully to mongodb');
	} catch (e) {
		console.log('Connection error.', e);
	}
};

const getDb = () => {
	assert.ok(_db, 'Db has not been initialized.'); // if not initialized
	return _db; // if has been initialized
};

const getCollection = (collectionName) => {
	assert.ok(_db, 'Db has not been initialized.'); // if not initialized
	return _db.collection(collectionName); // if has been initialized
};

module.exports = {
	initDb,
	getDb,
	getCollection,
};
