module.exports = {
	sendCard: sendCard,
	theChosenOne: theChosenOne,
	myUsername: myUsername
}

function disconnect(socket){
	console.log(this.allInfo[socket.id], " has disconnected inside game listener");
}
function sendCard(socket, data){
	console.log("this is the card a player sent", data)
	data.player = this.allInfo[socket.id];
	this.playerAnswers.push(data)
	if(this.playerAnswers.length === this.numberOfPlayers - 1){
		console.log("this.playerAnswers", this.playerAnswers)
		this.emitToRoom('chooseBestAnswer', this.playerAnswers)
		this.playerAnswers = [];
	}
	this.playersReady = 0;
}

function theChosenOne(socket, data){

	const winner = data.player;

	const matchResults = {
		prompt: this.currentPrompt,
		answer: data,
		winner: winner
	}
		console.log("the chosen one is heard", winner)
	this.matchHistory.push(matchResults);

	this.addOneToWinner(winner)
	this.oneCardToEachPlayer()
	this.dealAPrompt()
	this.giveCurrentChooser();
}

function myUsername(socket, data){
	console.log("calling myUsername", socket.id)
	this.allInfo[socket.id] = data
	this.allInfo[data] = socket.id
	var truther = false;
	for(var i = 0; i < this.scoreboard.length; i++){
		if(this.scoreboard[i].username === data){
			truther = true
		}
	}
	if(truther === false){
	this.setupScoreboard(data)
	}
	if(this.scoreboard.length === this.numberOfPlayers){
		this.giveCurrentChooser()
		this.emitToRoom('updateScoreboard', this.scoreboard)
	}
	console.log("all info", this.allInfo)
}