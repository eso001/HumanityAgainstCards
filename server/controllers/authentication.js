const User = require('../models/user');
const jwt = require('jwt-simple');
const config = require('../config');

function tokenForUser(user){
	//jwt is a standard, they have a sub property
	//sub means subject, the person who the token belongs to
	//iat means "issued at time"
	const timestamp = new Date().getTime();
	return jwt.encode({ sub: user.id, iat:timestamp }, config.secret)
}

exports.signin = function(req, res, next){
	console.log("passed middleware signin", req.user)
	res.send({token: tokenForUser(req.user)});
}
exports.signup = function(req, res, next){
	console.log(req.body)
	const username = req.body.username;
	const password = req.body.password;

	if(!username || !password){
		return res.status(422).send({ error: "You must pass in a username and a password"})
	}
	//if user with given username exists
	User.findOne({username: username}, function(err, existingUser){
		if(err){ return next(err);}

		if(existingUser){
	//if a user with username does exist, return an error
			return res.status(422).send({error: 'username is in use' })
		}
	//if a user with username does Not exist, create and save user record
		const user = new User({
			username: username,
			password: password
		})
		user.save(function(err){
			if(err){ return next(err); }
	//respond to request indicating the user was created
			res.json({token: tokenForUser(user)})
		});
	})

}

