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

const app = express()

initDb()
app.use(express.json())
app.use(cors())

if (!isProduction) {
  app.use(errorHandler())
}
app.use(passport.initialize())
app.use(passport.session())
initPassport()

//Profile
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

app.listen(3000, () => {
  console.log('The app is running on port 3000')
})
