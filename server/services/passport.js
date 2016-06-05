const passport = require('passport');
const User = require('../models/user');
const config = require('../config');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt

//create local strategy
const LocalStrategy = require('passport-local');

const localOptions = {usernameField: 'username'}
const localLogin = new LocalStrategy(localOptions, function(username, password, done){
	//verify this username and password, call done with the user
	//if it is correct username and password, verify user
	//otherwise call false when done
	User.findOne({ username: username }, function(err, user){
		if(err){
			return done(err);
		}
		if(!user){
			return done(null, false);
		}

		//compare passwords - is 'password' equal to user.password
		user.comparePassword(password, function(err, isMatch){
			if(err) { return done(err); }
			if(!isMatch){ return done(null, false)}

				return done(null, user);
		})
	})

});
//passport is an ecosystem that is formed by strategies

//a strategy is a method for authenticating a user

//our strategy is to verify a user with a JWT
//you could also verify user with a username and password


//1
//setup options for JWT  Strategy
const jwtOptions = {
	jwtFromRequest: ExtractJwt.fromHeader('authorization'),
	secretOrKey: config.secret
};

//2
//create JWT strategy
const jwtLogin = new JwtStrategy(jwtOptions, function(payload, done){
	//the payload is the decoded jwt token, so we will get the sub and iat back
	//done is a callback function that we need to call if we successffully authenticate user
	//see if userID and payload exists in our database, if it does, call 'done' with taht user

	//otherwise, call done without a user object

	User.findById(payload.sub, function(err, user){
		if(err){
			return done(err, false); 
		}
		if(user){
			done(null, user);
		} else {
			done(null, false);
		}
	})
})

passport.use(jwtLogin)
passport.use(localLogin)
//3
//Tell passport to use this strategy