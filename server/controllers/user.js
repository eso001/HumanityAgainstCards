const io = require('../common').io;
const app = require('../common').app;
const express = require('../common').express;
const router = express.Router();
const User = require('../models/user');
const jwt = require('jwt-simple');
const secret = require('../config').secret;

router.post('/getUsername', function(req, res){
	const id = jwt.decode(req.body.token, secret)
	User.findById(id.sub, function(err, data){
		console.log("INSIDE GET USERNAME", data)
		const userUsername = data.username
			res.send({username: userUsername})
	})

})

module.exports = router;