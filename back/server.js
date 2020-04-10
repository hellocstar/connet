const express = require('express');
const cors = require('cors');
const errorHandler = require('errorhandler');
const passport = require('passport');
// const session = require('express-session');

const { initDb, expressSession } = require('./db');
const { passportFunction } = require('./config/passport');
const profileApi = require('./api/profileApi');
const myCircleApi = require('./api/myCircleApi');
const communityApi = require('./api/communityApi');

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

initDb();
passportFunction();

app.use(express.static('public'));
app.use(expressSession);
app.use(express.json());
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());

if (!isProduction) {
	app.use(errorHandler());
}

//Profile
app.get('/getUser/:username', profileApi.getProfile);
app.delete('/deleteUser/:username', profileApi.deleteProfile);
app.put('/updateUser/:username', profileApi.updateProfile);
app.patch('/updateUser/:username', profileApi.updateProfile);

//Sign In

app.post('/signin', passport.authenticate('local'), profileApi.signIn);
// app.post(
// 	'/signin',
// 	passport.authenticate('local', {
// 		failureRedirect: '/signin-failure',
// 		successRedirect: '/signin-success',
// 	}),
// 	profileApi.signIn
// );
app.post('/signup', profileApi.signUp);
app.get('/signout', (req, res, next) => {
	req.logout();
	res.redirect('/signin');
});
app.get('/signin-success', (req, res, next) => {
	console.log(req.user);
	res.send('You successfully logged in.');
});
app.get('/signin-failure', (req, res, next) => {
	res.send('Username or password is incorrect.');
});

//MyCircle
app.get('/mycircle', myCircleApi.roomList);
app.post('/createRoom', myCircleApi.createRoom);
app.get('/getRoom/:roomname', myCircleApi.getRoom);
app.delete('/deleteRoom/:roomname', myCircleApi.deleteRoom);
app.put('/updateRoom/:roomname', myCircleApi.updateRoom);
app.patch('/updateRoom/:roomname', myCircleApi.updateRoom);
app.patch('/joinRoom/:roomname', myCircleApi.joinRoom);

//Community
app.get('/community', communityApi.eventList);
app.post('/newevent', communityApi.createEvent);
// app.get('/getRoom/:roomname', communityApi.getRoom);
// app.delete('/deleteRoom/:roomname', communityApi.deleteRoom);
// app.put('/updateRoom/:roomname', communityApi.updateRoom);
// app.patch('/updateRoom/:roomname', communityApi.updateRoom);
// app.patch('/joinRoom/:roomname', communityApi.joinRoom);

app.listen(3000, () => {
	console.log('The app is running on port 3000');
});
