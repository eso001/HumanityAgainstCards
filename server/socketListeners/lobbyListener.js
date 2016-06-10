const services = require('../services/lobbyServices');
const translateTokenToId = require('../services/globalServices').translateTokenToId;
const parseString = require('../services/globalServices').parseString;
const Game = require('../socketApi/socketApi').Game;

module.exports = {
lobbyListener: lobbyListener
};

function lobbyListener(socket, io){
	var game;
	var id;
	var currentRoomId;
	var username;
	console.log('socket.id', socket.id)
	socket.emit('initLobby', {message: "hello there"})
	socket.on('joinRoom', function(data){

		id = translateTokenToId(data.token);
		services.joinRoom(id)
			.then(function(data){
				services.findUsername(id)
					.then(function(data){
						username = data;
						console.log("this is my username", data)
					})

				console.log("emitting roomInfo", data);
				currentRoomId = data._id
				socket.join(currentRoomId)
				io.to(currentRoomId).emit('roomInfo', data)
			})
	})

	socket.on('disconnect', function(){
		console.log('user has disconnected')
		services.leaveRoom(id)	
	.then(function(data){
		data = parseString(data)
		socket.leave(currentRoomId)
		console.log(data, "returned join room helper function")
		io.to(currentRoomId).emit('roomInfo', {data:data})
	})
	})
	
	socket.on('begin', function(data){
		console.log("begin received", data);
		var sockets = [];
		var namespace = '/';
		var roomName = data.room;

		for (var socketId in io.nsps[namespace].adapter.rooms[roomName].sockets) {
		    sockets.push(io.sockets.connected[socketId]);
		}

		var game = new Game(data.room, sockets, io);
		game.init();
	})
	socket.on('intro', function(data){
		console.log(data)
		io.emit("herro")
	})
	
}