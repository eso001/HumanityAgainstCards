const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');
//Define our model
const userSchema = new Schema({
	username: { type: String,
		     unique: true,
		     lowercase: true
		   },
	password: String,
	currentLobby: {type: String, default: false}
})

// On Save Hook, ecrypt password

//before saving a model, run this function
userSchema.pre('save', function(next) {
	const user = this;

	bcrypt.genSalt(10, function(err, salt){
		if(err){ return next(err); }
		bcrypt.hash(user.password, salt, null, function(err, hash){
			if(err){ return next(err); }
			user.password = hash;
			next();
		})
	})
})

userSchema.methods.comparePassword = function(candidatePassword, callback){
		bcrypt.genSalt(10, function(err, salt){
		if(err){ return next(err); }
		bcrypt.hash(candidatePassword, salt, null, function(err, hash){
		})
	})


	bcrypt.compare(candidatePassword, this.password, function(err, isMatch){
		if(err){ return callback(err) }
	callback(null, isMatch);

	})
}
//Create model class
const ModelClass = mongoose.model('user', userSchema)
//Export the model
module.exports = ModelClass;