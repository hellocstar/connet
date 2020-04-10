const assert = require('assert');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
let _db;

const connecionString =
	'mongodb+srv://admin:CSCI3100@cluster-tqoug.azure.mongodb.net/test?retryWrites=true&w=majority';

const initDb = async () => {
	if (_db) {
		console.warn('Trying to init DB again!');
		return;
	}
	try {
		await mongoose.connect(connecionString, {
			useFindAndModify: false,
			useNewUrlParser: true,
		});
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

const sessionStore = new MongoStore({
	mongooseConnection: mongoose.connection,
	collection: 'sessions',
});

const expressSession = session({
	// secret: process.env.SECRET,
	secret: 'some secret',
	resave: false,
	saveUninitialized: true,
	store: sessionStore,
	cookie: {
		maxAge: 1000 * 30,
	},
});

module.exports = {
	initDb,
	getDb,
	getCollection,
	expressSession,
};
