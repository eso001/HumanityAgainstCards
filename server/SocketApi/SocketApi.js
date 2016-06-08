var Prompts = require('../cardCollection/fullCollection').prompts;
var Answers = require('../cardCollection/fullCollection').answers;
var _ = require('lodash');
const gameListeners = require('../socketListeners/gameListeners');

module.exports = {
	Game: Game
}

function Game(room, sockets, io){
	console.log(room, sockets, io, "new game instantiated")
	this.prompts = _.shuffle(Prompts);
	this.Answers = _.shuffle(Answers);
	this.room = room;
	this.allSockets = sockets;
	this.io = io;

	for(var i = 0; i < this.allSockets.length; i++){
		for(var props in gameListeners){
			console.log(gameListeners[props], props, "gamelistener[props], props")
			sockets[i].on(props, gameListeners[props].bind(this, sockets[i]))
		}
	}
}

Game.prototype.dealHandsToEachPlayer = function(){
	var fullHand = [];
	
	this.io.to(this.room).emit('dealFullHand', fullHand)
}

Game.prototype.OneCardToEachPlayer = function(){
	console.log("calling One card to Each Player")
	this.io.to(this.room).emit('dealOne', {text:"card info"})
}
