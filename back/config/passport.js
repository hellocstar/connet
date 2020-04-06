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
};
