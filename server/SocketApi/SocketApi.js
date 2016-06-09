var Prompts = require('../cardCollection/fullCollection').prompts;
var Answers = require('../cardCollection/fullCollection').answers;
console.log(Answers, Prompts, "ANSWERS AND PROMPTS")
var _ = require('lodash');
const gameListeners = require('../socketListeners/gameListeners');

module.exports = {
	Game: Game
}

function Game(room, sockets, io){
	console.log(room, sockets, io, "new game instantiated")
	this.prompts = _.shuffle(Prompts);
	this.answers = _.shuffle(Answers);
	this.room = room;
	this.allSockets = sockets;
	this.io = io;
	this.started = false;
	this.numberOfPlayers = this.allSockets.length;
	this.playerAnswers = [];
	this.playersReady = 0;

	for(var i = 0; i < this.allSockets.length; i++){
		for(var props in gameListeners){
			console.log(gameListeners[props], props, "gamelistener[props], props")
			sockets[i].on(props, gameListeners[props].bind(this, sockets[i]))
		}
	}
}

Game.prototype.emitToEach = function(event, data){
	for(var i = 0; i < this.allSockets.length; i++){
		this.allSockets[i].emit(event, data[i])
	}
}
Game.prototype.dealHandsToEachPlayer = function(){
	var fullHands = [];
	for(var i = 0; i < this.allSockets.length; i++){
		fullHands.push(this.answers.splice(0,7))
	}
	this.emitToEach('dealFullHand', fullHands)
	console.log("dealHandsToEachPlayer called", fullHands)
}

Game.prototype.dealAPrompt = function(){
	const currentPrompt = this.prompts.shift()
	this.io.to(this.room).emit('currentPrompt', currentPrompt)
}

Game.prototype.OneCardToEachPlayer = function(){
	console.log("calling One card to Each Player")
	var oneCardToEach = [];
	for(var i = 0; i < this.allSockets.length; i++){
		oneCardEach.push(this.answers.shift())
	}
	this.emitToEach('dealOneCard', oneCardToEach);
}
