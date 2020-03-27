const mongoose = require('mongoose');

const myCircle = new mongoose.Schema({
    roomID:{
        type: String,
        required: true
    },
    name:{
        type: String,
        required: [true,'name needed']
    },
    date:{
        type:Date,
        required: [true, 'date needed']
    },
    venue:{
        type: String,
        required: [true, 'venue needed']
    },
    host:{
        type: String, //id of host
        required: [true, 'host needed']
    },
    parti:{
        type: [String] //id of participant
    },
    pending_parti:{
        type: [String] //id of pending participant
    }
})

const MyCircle = mongoose.model('MyCircle', myCircle);
module.exports = MyCircle;