const services = require('../services/lobbyServices');
const translateTokenToId = require('../services/globalServices').translateTokenToId;
const parseString = require('../services/globalServices').parseString;

module.exports = {
lobbyListener: lobbyListener
};

function lobbyListener(socket, io){
	var id;
	var currentRoomId;
	socket.emit('initLobby', {message: "hello there"})
	socket.on('joinRoom', function(data){

		id = translateTokenToId(data.token);
		services.joinRoom(id)
			.then(function(data){
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
	
	socket.on('intro', function(data){
		console.log(data)
		io.emit("herro")
	})
	
}