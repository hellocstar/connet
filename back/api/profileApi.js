<<<<<<< HEAD
const Profile = require('../models/profile')
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy

const createProfile = async (req, res, next) => {
  try {
    console.log(req)
    const profile = new Profile(req.body)
    const result = await profile.save()
    res.status(201).send(result._id)
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(400).send(e)
    } else {
      res.status(500).send(e)
    }
  }
}
=======
const Profile = require('../models/profileSchema');
const Event = require('../models/eventSchema');
const Passport = require('../config/passport');
const mongoose = require('mongoose');

const signIn = async (req, res, next) => {
	try {
		res.status(200).send(req.user);
	} catch (e) {
		if (e.name === 'ValidationError') {
			res.status(400).send(e);
		} else {
			res.status(500).send(e);
		}
	}
};
>>>>>>> master

const signUp = async (req, res, next) => {
	try {
		const hashPw = Passport.genPassword(req.body.password);
		const user = {
			username: req.body.username,
			email: req.body.email,
			hash: hashPw.hash,
			salt: hashPw.salt,
		};
		const profile = new Profile(user);
		await profile.save();
		res.status(200).send(profile._id);
	} catch (e) {
		if (e.name === 'ValidationError') {
			res.status(400).send(e);
		} else {
			res.status(500).send(e);
		}
	}
};

const signOut = async (req, res, next) => {
	try {
		req.logout();
		res.redirect('/signin');
	} catch (e) {
		res.status(500).send(e);
	}
};

const signInSuccess = async (req, res, next) => {
	try {
		console.log(req.user);
		res.send('You successfully logged in.');
	} catch (e) {
		res.status(500).send(e);
	}
};

const signInFail = async (req, res, next) => {
	try {
		res.send('Username or password is incorrect.');
	} catch (e) {
		res.status(500).send(e);
	}
};

const getProfile = async (req, res, next) => {
<<<<<<< HEAD
  try {
    const profile = await Profile.findOne({
      username: req.params.username,
    })
    res.status(200).send(profile)
  } catch (e) {
    res.status(500).send(e)
  }
}

const deleteProfile = async (req, res, next) => {
  try {
    const result = await Profile.deleteOne({
      username: req.params.username,
    })
    if (result.deletedCount === 0) res.status(404).send()
    else res.status(200).send('Deleted Successfully')
  } catch (e) {
    res.status(500).send(e)
  }
}

const updateProfile = async (req, res, next) => {
  const profile = req.body
  try {
    const result = await Profile.update(
      { username: req.params.username },
      profile,
    )

    if (result.ok === 1) res.status(200).send('Update Success')

    if (result.ok === 1 && result.nModified > 0)
      res.status(200).send('Update Success')
    else res.status(404).send('Profile Not Found')
  } catch (e) {
    if (e.name === 'ValidationError') {
      res.status(400).send(e)
    } else {
      res.status(500).send(e)
    }
  }
}

const logIn = async (req, res, next) => {
  passport.use(
    new LocalStrategy(function(username, password, done) {
      Profile.findOne({ username: username }, function(err, user) {
        if (err) {
          return done(err)
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' })
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' })
        }
        return done(null, user)
      })
    }),
  )

  const logOut = async (req, res, next) => {
    req.logout()
    res.status(200).send('logout successed')
  }

  const checkAuth = async (req, res, next) => {
    if (req.isAuthenticated()) {
      res.status(204).send()
    } else {
      res.status(401).send()
    }
  }

  module.exports = {
    createProfile,
    getProfile,
    deleteProfile,
    updateProfile,
    logIn,
    logOut,
    checkAuth,
  }
}
=======
	try {
		console.log(req.params.profileid);
		const profile = await Profile.findOne({
			_id: req.params.profileid,
		});
		let friends = [];
		const friendID = profile.friends;
		async function getFriends() {
			for (let i = 0; i < friendID.length; i++) {
				const frd = await Profile.findOne({ _id: friendID[i] });
				friends.push({
					id: frd._id,
					username: frd.username,
				});
			}
		}
		await getFriends();
		let histEvents = [];
		const historyID = profile.history;
		async function getHistory() {
			for (let i = 0; i < historyID.length; i++) {
				const hist = await Event.findOne({ _id: historyID[i] });
				histEvents.push({
					id: hist._id,
					name: hist.name,
				});
			}
		}
		await getHistory();
		const responseObj = {
			profile: profile,
			friends: friends,
			history: histEvents,
		};
		console.log(responseObj);
		res.status(200).send(responseObj);
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
};

const deleteProfile = async (req, res, next) => {
	try {
		const result = await Profile.deleteOne({
			username: req.params.username,
		});
		if (result.deletedCount === 0) res.status(404).send();
		else res.status(200).send('Deleted Successfully');
	} catch (e) {
		res.status(500).send(e);
	}
};

const updateProfile = async (req, res, next) => {
	const profile = req.body;
	try {
		const id = mongoose.Types.ObjectId(JSON.parse(profile.id));
		const result = await Profile.findOneAndUpdate(
			{ _id: id },
			{
				biography: profile.biography,
				birthday: profile.birthday,
				interests: profile.interests,
			}
		);
		console.log(result);
		res.status(200).send('Update Success');
	} catch (e) {
		console.log(e);
		res.status(500).send(e);
	}
};

module.exports = {
	signIn,
	signUp,
	signOut,
	signInSuccess,
	signInFail,
	getProfile,
	deleteProfile,
	updateProfile,
};
>>>>>>> master
