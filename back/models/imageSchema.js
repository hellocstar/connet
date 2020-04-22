const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
	imageName: {
		type: String,
		default: 'none',
		tequire: true,
	},
	imageData: {
		type: String,
		require: true,
	},
});

var Image = mongoose.model('Image', ImageSchema);
module.exports = Image;
