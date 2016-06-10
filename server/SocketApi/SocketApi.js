var Prompts = require('../cardCollection/fullCollection').prompts;
var Answers = require('../cardCollection/fullCollection').answers;
var _ = require('lodash');
const gameListeners = require('../socketListeners/gameListeners');

module.exports = {
	Game: Game
}

function Game(room, sockets, io){
	this.prompts = _.shuffle(Prompts);
	this.answers = _.shuffle(Answers);
	this.room = room;
	this.allInfo = {};
	this.allSockets = sockets;
	this.io = io;
	this.started = false;
	this.currentPrompt;
	this.numberOfPlayers = this.allSockets.length;
	this.playerAnswers = [];
	this.playersReady = 0;
	this.matchHistory = [];
	this.scoreboard = [];
	for(var i = 0; i < this.allSockets.length; i++){
		for(var props in gameListeners){
			console.log(gameListeners[props], props, "gamelistener[props], props")
			sockets[i].on(props, gameListeners[props].bind(this, sockets[i]))
		}
	}
}

Game.prototype.init = function(){
	console.log("game is inited, give all usernames emitted")
	this.io.to(this.room).emit('giveAllUsernames')
	if(this.started === true){
			return "game already started";
		}
		console.log("game begun");
		this.dealHandsToEachPlayer()
		this.dealAPrompt()
		this.started = true;
}
Game.prototype.emitToEach = function(event, data){

	for(var i = 0; i < this.allSockets.length; i++){
		this.allSockets[i].emit(event, data[i])
	}
}
Game.prototype.emitToRoom = function(event, data){
	this.io.to(this.room).emit(event, data);
}
Game.prototype.dealHandsToEachPlayer = function(){
	var fullHands = [];
	for(var i = 0; i < this.allSockets.length; i++){
		fullHands.push(this.answers.splice(0,7))
	}
	for(var j = 0; j < fullHands.length; j++){
		for(var k = 0; k < fullHands[j].length; k++){
			fullHands[j][k].username = this.allInfo[this.allSockets[j].id]
		}
	}
	this.emitToEach('dealFullHand', fullHands)
	console.log("dealHandsToEachPlayer called", fullHands)
}

Game.prototype.dealAPrompt = function(){
	this.currentPrompt = this.prompts.shift()
	this.emitToRoom('currentPrompt', this.currentPrompt)
}

Game.prototype.oneCardToEachPlayer = function(){
	console.log("calling One card to Each Player")
	var oneCardToEach = [];
	for(var i = 0; i < this.allSockets.length; i++){
		oneCardToEach.push(this.answers.shift())
	}
	this.emitToEach('dealOneCard', oneCardToEach);
}
Game.prototype.setupScoreboard = function(username){

	this.scoreboard.push({username: username, score: 0, played: false})
}
Game.prototype.addOneToWinner = function(username){
	for(var i = 0; i < this.scoreboard.length; i++){
	if(this.scoreboard[i].username === username){
		this.scoreboard[i].score++
	}
	}
	this.emitToRoom('updateScoreboard', this.scoreboard)
}