const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require('./user');
//Define our model

const lobbySchema = new Schema({
	userSlots: [{id: String, username: String}],
	started: Boolean,
	full: Boolean
})

// On Save Hook, ecrypt password
lobbySchema.pre('checkAvailability', function(next) {
	var lobby = this;
	lobby = JSON.parse(JSON.stringify(lobby));
	console.log("this is number of users in lobby", lobby, lobby.userSlots.length >= 5)
	if (lobby.userSlots.length >= 4) {
		ModelClass.findOneAndUpdate({
			_id: lobby._id
		}, {
			full: true
		}, function(err, data) {
			console.log("data after findoneandupdate", data)
			next();

		})
	} else {
		lobby.full = false
		next();
	}

})

lobbySchema.methods.checkAvailability = function() {

}

//before saving a model, run this function
//Create model class
const ModelClass = mongoose.model('lobby', lobbySchema)
	//Export the model
module.exports = ModelClass;