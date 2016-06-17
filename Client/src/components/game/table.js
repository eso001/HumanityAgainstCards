import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/gameActions';
import Scoreboard from './scoreboard';
import Hand from './hand';
import {DragDropContext} from 'react-dnd';
import { browserHistory } from 'react-router';
import HTML5Backend from 'react-dnd-html5-backend';
import Loader from 'react-loader';

class Table extends Component {

	componentDidMount(){
		console.log("component remounted");
		
		var {
			loadedTable,
			updateScoreboard,
			 username,
			 giveChooser,
			 socket,
			 currentPrompt,
			 addCard,
			 clearAnswer,
			 hand,
			 chosenOne,
			 currentWinner,
			 giveFullHand,
			 scoreboard,
			 prompt
			 } = this.props
			if(prompt && socket && hand && scoreboard){
				loadedTable(true)
			}
		
		socket.on('dealFullHand', function(data){
			giveFullHand(data);
		})
		socket.on('giveAllUsernames', function(){
			if(!username){
				return;
			}
			socket.emit('myUsername', username)
		})

		socket.on('dealOneCard', function(card){
			addCard(card)
			clearAnswer();
		})
		socket.on('roundWinner', function(winnerData){
			console.log('roundwinner received');
			currentWinner(winnerData)
			browserHistory.push('/humanity/table/roundWinner')
		})
		socket.on('currentPrompt', function(prompt){
			currentPrompt(prompt.text)
		})

		socket.on('giveAllUsernames', function(){
			socket.emit('myUsername', username)
		})


		socket.on('chooser', function(data){
			var amITheChosenOne;
			if(username === data.chooser){
				amITheChosenOne = {
					chooserName: data.chooser,
					chosenOne: true
				}
			} else {
				amITheChosenOne = {
					chooserName: data.chooser,
					chosenOne: false
				}
			}
			giveChooser(amITheChosenOne)
		})
		socket.on('endGame', function(data){
			if(data.winner.username === username){
				socket.disconnect()
				browserHistory.push('/humanity/table/winner')
			} else {
				socket.disconnect()
				browserHistory.push('/humanity/table/loser')

			}
		})
	}
	render(){
		var options = {
		    lines: 7,
		    length: 40,
		    width: 60,
		    radius: 15,
		    corners: 0,
		    rotate: 10,
		    direction: 1,
		    color: 'black',
		    speed: .8,
		    trail: 100,
		    shadow: true,
		    hwaccel: false,
		    zIndex: 10,
		    top: '50%',
		    left: '50%',
		    scale: 1.00
		};


		return (
			
				<div className="container-fluid table">
					<div className="scoreboardHolder">
						<Scoreboard />
					</div>
					<Loader loaded={true} options={options} className="spinner" >
						<div>
							{this.props.children}
						</div>

						<Hand />
					</Loader>

				</div>
			)
	}
}
function mapStateToProps(state){
	return { socket: state.socket.socket,
			 prompt: state.table.prompt,
			 username: state.user.name,
			 hand: state.hand,
			 chosenOne: state.table.chooser.chosenOne,
			 scoreboard: state.scoreboard,
			 loaded: state.table.loaded
			}
}
export default DragDropContext(HTML5Backend)(connect(mapStateToProps, actions)(Table))