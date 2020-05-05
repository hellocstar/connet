const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');

const Profile = require('../models/profileSchema');

//contains api for passport related communication with database and server

function validPassword(password, hash, salt) {
	const hashVerify = crypto
		.pbkdf2Sync(password, salt, 10000, 64, 'sha512')
		.toString('hex');
	return hash === hashVerify;
}

function genPassword(password) {
	const salt = crypto.randomBytes(32).toString('hex');
	const genHash = crypto
		.pbkdf2Sync(password, salt, 10000, 64, 'sha512')
		.toString('hex');

	return {
		salt: salt,
		hash: genHash,
	};
}

const passportFunction = () => {
	passport.use(
		new LocalStrategy(function (username, password, cb) {
			Profile.findOne({ username: username })
				.then((user) => {
					if (!user) {
						return cb(null, false);
					}

					const isValid = validPassword(
						password,
						user.hash,
						user.salt
					);

					if (isValid) {
						return cb(null, user);
					} else {
						return cb(null, false);
					}
				})
				.catch((err) => {
					cb(err);
				});
		})
	);

	passport.serializeUser(function (user, cb) {
		cb(null, user.id);
	});

	passport.deserializeUser(function (id, cb) {
		Profile.findById(id, function (err, user) {
			if (err) {
				return cb(err);
			}
			cb(null, user);
		});
	});
};

module.exports = {
	genPassword,
	passportFunction,
};
