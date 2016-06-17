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
	this.indexOfCurrentPicker = Math.floor(Math.random()*this.numberOfPlayers)
	for(var i = 0; i < this.allSockets.length; i++){
		for(var props in gameListeners){
			console.log(gameListeners[props], props, "gamelistener[props], props")
			sockets[i].on(props, gameListeners[props].bind(this, sockets[i]))
		}
	}
}

Game.prototype.init = function(){

	console.log("game is inited, give all usernames emitted")
	
	this.emitToRoom('giveAllUsernames')
	if(this.started === true){
			return "game already started";
		}
		console.log("game begun");
		this.dealHandsToEachPlayer()
		
		this.dealAPrompt()
		this.started = true;
}
Game.prototype.giveCurrentChooser = function(){
	var currentChooser = this.allInfo[this.allSockets[this.indexOfCurrentPicker].id]
	this.emitToRoom('chooser', {chooser: currentChooser})
	if(this.indexOfCurrentPicker >= this.numberOfPlayers - 1){
	this.indexOfCurrentPicker = 0;
	} else {
		this.indexOfCurrentPicker++;
	}
}
Game.prototype.emitToEach = function(event, data){

	for(var i = 0; i < this.allSockets.length; i++){
		if(!data[i]){
			continue;
		}
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
}

Game.prototype.dealAPrompt = function(){
	this.currentPrompt = this.prompts.shift()
	this.emitToRoom('currentPrompt', this.currentPrompt)
}

Game.prototype.oneCardToEachPlayer = function(socketid){
	var oneCardToEach = [];

	for(var i = 0; i < this.allSockets.length; i++){
		if(this.allSockets[i].id === socketid){
			oneCardToEach.push(null)
			continue;
		}
		oneCardToEach.push(this.answers.shift())
	}
	this.emitToEach('dealOneCard', oneCardToEach);
}
Game.prototype.setupScoreboard = function(username){
	if(this.scoreboard.length === this.numberOfPlayers){
		return;
	}
	this.scoreboard.push({username: username, score: 0, played: false})
}
Game.prototype.endGame = function(username){
	this.emitToRoom('updateScoreboard', this.scoreboard)
	this.emitToRoom('endGame', {winner: username})
}
Game.prototype.addOneToWinner = function(username){
	var gameOver = false;
	console.log("adding one to winner, winner username:", username)
	for(var i = 0; i < this.scoreboard.length; i++){
	if(this.scoreboard[i].username === username){
		this.scoreboard[i].score++
		if(this.scoreboard[i].score >= 5){
			this.endGame(this.scoreboard[i])
			gameOver = true;
		}
	}
	}
	this.emitToRoom('updateScoreboard', this.scoreboard)
	return gameOver;
}
Game.prototype.sendWinner = function(info){
	console.log("emitting roundWinner", info)
	this.emitToRoom('roundWinner', info)
}
Game.prototype.playedCard = function(username){

	for(var i = 0; i < this.scoreboard.length; i++){
		if(this.scoreboard[i].username === username){
			this.scoreboard[i].played = true;
		}
	}
	this.emitToRoom('updateScoreboard', this.scoreboard)
}
Game.prototype.resetPlayed = function(){
	for(var i = 0; i < this.scoreboard.length; i++){
		this.scoreboard[i].played = false;
	}
	this.emitToRoom('updateScoreboard', this.scoreboard)
}