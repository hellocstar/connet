<<<<<<< HEAD
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const Profile = require("../models/profile");

const initPassport = () => {
  passport.use(
    new LocalStrategy(async (username, password, done) => {
      try {
        const user = await Profile.findOne({ username: username });
        if (!user) {
          return done(null, false, { message: "Profile not found." });
        }
        if (password !== user.password) {
          return done(null, false, { message: "Invalid password." });
        }
        return done(null, user);
      } catch (e) {
        return done(e);
      }
    })
  );
  passport.serializeUser((user, done) => {
    done(null, user.username);
  });

  passport.deserializeUser((username, done) => {
    Profile.findOne({ username }, (err, profile) => {
      done(err, profile);
    });
  });
};

const checkIfAuthenticated = (req, res, next) => {
  if (req.isAuthenticated()) {
    next();
  } else {
    res.status(401).send("You have to login first to use the function");
  }
};

module.exports = {
  initPassport,
  checkIfAuthenticated
=======
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const crypto = require('crypto');

const Profile = require('../models/profileSchema');

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
>>>>>>> master
};
