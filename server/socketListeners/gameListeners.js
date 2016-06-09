module.exports = {
	startGame: startGame,
	sendCard: sendCard,
	theChosenOne: theChosenOne
}

function startGame(socket){
		if(this.started === true){
			return "game already started";
		}
		console.log("game begun");
		this.dealHandsToEachPlayer()
		this.dealAPrompt()
		this.started = true;
}

function sendCard(socket, data){
	console.log("this is the card a player sent",socket, data)
	this.playerAnswers.push(data)
	if(this.playerAnswers.length === 1){
		console.log("this.playerAnswers", this.playerAnswers)
		this.io.to(this.room).emit('chooseBestAnswer', this.playerAnswers)
	}
	this.playersReady = 0;
}

function theChosenOne(socket, data){
	console.log("this is the chosen one", data)
}