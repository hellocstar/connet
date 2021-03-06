//contains necessary code for communicating with server

const express = require('express');
const cors = require('cors');
const errorHandler = require('errorhandler');
const passport = require('passport');

const { initDb, expressSession } = require('./db');
const { passportFunction } = require('./config/passport');
const profileApi = require('./api/profileApi');
const roomApi = require('./api/roomApi');
const eventApi = require('./api/eventApi');

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

initDb();
passportFunction();

app.use(expressSession);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

if (!isProduction) {
	app.use(errorHandler());
}

//Profile
app.get('/profile/:profileid', profileApi.getProfile);
app.post('/updateprofile/:profileid', profileApi.updateProfile);
app.post('/search', profileApi.searchUsername);
app.post('/addfriend/', profileApi.addFriend);
// app.delete('/deleteUser/:username', profileApi.deleteProfile);

//Sign In
app.post('/signin', passport.authenticate('local'), profileApi.signIn);
app.post('/signup', profileApi.signUp);
app.get('/signout', profileApi.signOut);
app.get('/signin-success', profileApi.signInSuccess);
app.get('/signin-failure', profileApi.signInFail);

//MyCircle
app.post('/mycircle', roomApi.roomList);
app.post('/newroom', roomApi.createRoom);
app.get('/room/:roomid', roomApi.getRoom);
app.post('/joinroom/', roomApi.joinRoom);
// app.delete('/deleteRoom/:roomname', roomApi.deleteRoom);
// app.put('/updateRoom/:roomname', roomApi.updateRoom);
// app.patch('/updateRoom/:roomname', roomApi.updateRoom);
// app.patch('/joinRoom/:roomname', roomApi.joinRoom);

//Community
app.get('/community', eventApi.eventList);
app.post('/newevent', eventApi.createEvent);
app.get('/event/:eventid', eventApi.getEvent);
// app.post('/categorysearch', eventApi.categorySearch);
// app.delete('/deleteRoom/:roomname', eventApi.deleteRoom);
// app.put('/updateRoom/:roomname', eventApi.updateRoom);
// app.patch('/updateRoom/:roomname', eventApi.updateRoom);
// app.patch('/joinRoom/:roomname', eventApi.joinRoom);

app.listen(3000, () => {
	console.log('The app is running on port 3000');
});
