const io = require('../common').io;
const app = require('../common').app;
const express = require('../common').express;
const router = express.Router();
const User = require('../models/user');
const jwt = require('jwt-simple');
const secret = require('../config').secret;

router.post('/getUsername', function(req, res){
	console.log("THIS IS THE TOKEN", req.body.token)
	const id = jwt.decode(req.body.token, secret)
	console.log("INSIDE GET USER NAME ROUTE", id)
	User.findById(id.sub, function(err, data){
		const userUsername = JSON.parse(JSON.stringify(data)).username
			res.send({username: userUsername})
	})

})

module.exports = router;