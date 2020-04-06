const Profile = require('../models/profile')
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;


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

const getProfile = async (req, res, next) => {
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
  passport.use(new LocalStrategy(
    function(username, password, done) {
      Profile.findOne({ username: username }, function(err, user) {
        if (err) { return done(err); }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  ));

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
