const express = require('express');
const cors = require('cors');
const errorHandler = require('errorhandler');
const passport = require('passport');

const { initDb } = require('./db');
const profileApi = require('./api/profileApi');
const myCircleApi = require('./api/myCircleApi');
const communityApi = require('./api/communityApi');

const isProduction = process.env.NODE_ENV === 'production';

const app = express();

initDb();
app.use(express.json());
app.use(cors());

if (!isProduction) {
	app.use(errorHandler());
}

//Profile
app.post('/signup', profileApi.createProfile);
app.get('/getUser/:username', profileApi.getProfile);
app.delete('/deleteUser/:username', profileApi.deleteProfile);
app.put('/updateUser/:username', profileApi.updateProfile);
app.patch('/updateUser/:username', profileApi.updateProfile);
app.post('/signin', profileApi.signIn);

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
// app.post('/createRoom', communityApi.createRoom);
// app.get('/getRoom/:roomname', communityApi.getRoom);
// app.delete('/deleteRoom/:roomname', communityApi.deleteRoom);
// app.put('/updateRoom/:roomname', communityApi.updateRoom);
// app.patch('/updateRoom/:roomname', communityApi.updateRoom);
// app.patch('/joinRoom/:roomname', communityApi.joinRoom);

app.listen(3000, () => {
	console.log('The app is running on port 3000');
});
