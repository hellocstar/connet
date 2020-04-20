<<<<<<< HEAD
const express = require('express')
const cors = require('cors')
const errorHandler = require('errorhandler')
const { initDb } = require('./db')
const profileApi = require('./api/profileApi')
const myCircleApi = require('./api/myCircleApi')
const passport = require('passport')
const { initPassport } = require('./config/passport')
const { checkIfAuthenticated } = require('./config/passport')

const isProduction = process.env.NODE_ENV === 'production'
=======
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const errorHandler = require('errorhandler');
const passport = require('passport');

const { initDb, expressSession } = require('./db');
const { passportFunction } = require('./config/passport');
const profileApi = require('./api/profileApi');
const roomApi = require('./api/roomApi');
const eventApi = require('./api/eventApi');
>>>>>>> master

const app = express()

<<<<<<< HEAD
initDb()
app.use(express.json())
app.use(cors())
=======
const app = express();

initDb();
passportFunction();

// app.use(bodyParser.urlencoded({ extended: true }));
// app.use(bodyParser.json());
app.use(express.static('public'));
app.use(expressSession);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
>>>>>>> master

if (!isProduction) {
  app.use(errorHandler())
}
app.use(passport.initialize())
app.use(passport.session())
initPassport()

//Profile
<<<<<<< HEAD
app.post(
  '/login',
  passport.authenticate('local', {
    successRedirect: '/',
    failureRedirect: '/login',
    failureFlash: true,
  }),
)
app.get('/logout', checkIfAuthenticated, profileApi.logOut)
app.get('/auth', profileApi.checkAuth)
app.post('/signup', profileApi.createProfile)
app.get('/getUser/:username', profileApi.getProfile)
app.delete(
  '/deleteUser/:username',
  checkIfAuthenticated,
  profileApi.deleteProfile,
)
app.patch(
  '/updateUser/:username',
  checkIfAuthenticated,
  profileApi.updateProfile,
)

//MyCircle
app.post('/createRoom', checkIfAuthenticated, myCircleApi.createRoom)
app.get('/getRoom/:roomname', checkIfAuthenticated, myCircleApi.getRoom)
app.delete(
  '/deleteRoom/:roomname',
  checkIfAuthenticated,
  myCircleApi.deleteRoom,
)
app.patch('/updateRoom/:roomname', checkIfAuthenticated, myCircleApi.updateRoom)
app.patch('/joinRoom/:roomname', checkIfAuthenticated, myCircleApi.joinRoom)

//Community
=======
app.get('/profile/:profileid', profileApi.getProfile);
// app.delete('/deleteUser/:username', profileApi.deleteProfile);
app.put('/updateprofile/:profileid', profileApi.updateProfile);
// app.patch('/updateUser/:username', profileApi.updateProfile);

//Sign In
app.post('/signin', passport.authenticate('local'), profileApi.signIn);
app.post('/signup', profileApi.signUp);
app.get('/signout', profileApi.signOut);
app.get('/signin-success', profileApi.signInSuccess);
app.get('/signin-failure', profileApi.signInFail);

//MyCircle
// app.get('/mycircle', roomApi.roomList);
// app.post('/createRoom', roomApi.createRoom);
app.get('/room/:roomid', roomApi.getRoom);
// app.delete('/deleteRoom/:roomname', roomApi.deleteRoom);
// app.put('/updateRoom/:roomname', roomApi.updateRoom);
// app.patch('/updateRoom/:roomname', roomApi.updateRoom);
// app.patch('/joinRoom/:roomname', roomApi.joinRoom);

//Community
app.get('/community', eventApi.eventList);
app.post('/newevent', eventApi.createEvent);
app.get('/event/:eventid', eventApi.getEvent);
// app.delete('/deleteRoom/:roomname', eventApi.deleteRoom);
// app.put('/updateRoom/:roomname', eventApi.updateRoom);
// app.patch('/updateRoom/:roomname', eventApi.updateRoom);
// app.patch('/joinRoom/:roomname', eventApi.joinRoom);
>>>>>>> master

app.listen(3000, () => {
  console.log('The app is running on port 3000')
})
