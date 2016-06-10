var Lobby = require('../models/lobby');
var User = require('../models/user');
const jwt = require('jwt-simple');
var parseString = require('./globalServices').parseString;
module.exports = {
	joinRoom: joinRoom,
	leaveRoom: leaveRoom,
	findUsername: findUsername,
	startGame: startGame
};

function startGame(lobbyId){
	Lobby.findOneAndUpdate({_id: lobbyId}, {started: true}, function(){
		console.log("game start saved in db")
	})
}
function saveUserLobby(id, lobbyId) {
	User.findOneAndUpdate(
		{ _id: id },
		{ currentLobby: lobbyId },
	    { upsert: true },
		function(err, doc) {
			if (err) {
				return err;
			}
		})
};

function deleteUserLobby(id) {
	User.findById(id, function(err, doc) {
		doc.currentLobby = false;
		doc.save(function(err) {
			if (err) {
				return err
			}
		})
	})
};

function findPlayerLobby(id) {
	return new Promise(function(resolve) {
		User.findById(id, function(err, doc) {
			if (err) {
				return err;
			}
			console.log("this is inside lobby", parseString(doc))
			resolve(parseString(doc).currentLobby)
		})
	})
}
function findUsername(id){
	return new Promise(function(resolve){
		User.findById(id, function(err, doc){
			if(err) {
				return err;
			}
			resolve(parseString(doc).username)
		})
	})
}
function findPlayerList(id) {
	return new Promise(function(resolve) {
		console.log("id find player list:", id)
		Lobby.findById(id, function(err, doc) {
			if (err) {
				console.log("this is err inside list", err)
				resolve(err);
				return err;
			}
			console.log("this is inside findplayerlist", doc)
			resolve(parseString(doc));
		})

	})
}
//joinRoom adds user to a room if a room with spots exists.
//if there are no rooms available it creates a new room for the user to join.
function leaveRoom(id) {
	return new Promise(function(resolve) {
		Lobby.findOne({
			userSlots: {
				$elemMatch: {
					id: id
				}
			}
		}, function(err, doc) {
			console.log("this is the found user lobby")

			if (!doc) {
				resolve("user is not in a lobby")
				return
			}
			for (var i = 0; i < doc.userSlots.length; i++) {
				if (doc.userSlots[i].id == id) {
					doc.userSlots.splice(i, 1)
					deleteUserLobby(id);
					doc.save(function(err) {
						if (err) {
							return err;
						}
					})
					resolve(doc);
					return
				}
			}
		})
	})
}

function joinRoom(id) {
	console.log("JoinRoom called", id)
	return new Promise(function(resolve) {
		User.findById(id, function(err, data) {
			const user = parseString(data)
			const username = user.username;
			console.log("this is user data", user)
			if (user.currentLobby !== false && user.currentLobby !== 'false') {
				findPlayerLobby(id)
					.then(function(lobbyId) {
						findPlayerList(lobbyId)
							.then(function(data) {
								resolve(data)
								return
							})
					})
			} else {
				Lobby.findOne({
					$and: [{
						full: false
					}, {
						started: false
					}]
				}, function(err, data) {
					if (err) {
						return err;
					}
					const joiningUser = {
						id: id,
						username: username
					}
					data = parseString(data)
					if (!data) {
						const lobby = new Lobby({
							userSlots: joiningUser,
							started: false,
							full: false
						})
						const lobbyId = parseString(lobby)._id
						saveUserLobby(id, lobbyId)
						lobby.save(function(err, doc) {
							if (err) {
								return err;
							}
							console.log(lobby)
							resolve({
								_id: lobby._id,
								userSlots: lobby.userSlots
							})
						})
					} else {
						Lobby.findOneAndUpdate({
								$and: [{
									full: false
								}, {
									started: false
								}]
							}, {
								$push: {
									userSlots: joiningUser
								}
							}, {
								safe: true,
								upsert: true
							},
							function(err, model) {
								if (err) {
									return err;
								}
								const lobbyId = parseString(model)._id;
								saveUserLobby(id, lobbyId)
								findPlayerList(lobbyId)
									.then(function(data) {
										resolve(data)
									})
								model.checkAvailability()
							}
						);
					}
				})
			}
		})
	})
}


