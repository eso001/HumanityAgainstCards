const io = require('../common').io;
const app = require('../common').app;
const express = require('../common').express;
const router = express.Router();
const translateTokenToId = require('../services/globalServices').translateTokenToId;
const lobbyListener = require('../socketListeners/lobbyListener').lobbyListener;

io.on('connection', function(socket){
	lobbyListener(socket, io);
})
router.post('/join', function(req, res, next){

	
})
router.get('/', function(req, res){
	res.send("hi");
})

module.exports = router;