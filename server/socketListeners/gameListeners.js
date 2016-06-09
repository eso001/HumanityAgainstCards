module.exports = {
	startGame: startGame,
	giveAnswer: giveAnswer
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

function giveAnswer(socket, data){


}