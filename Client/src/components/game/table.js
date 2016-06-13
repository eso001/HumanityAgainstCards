import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/gameActions';
import Scoreboard from './scoreboard';
import Hand from './hand';
import {DragDropContext} from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class Table extends Component {
	componentDidMount(){
		if(!this.props.socket){
			return;
		}
		var {username, giveChooser, socket, giveFullHand, currentPrompt} = this.props
		console.log("start game emitted")
		socket.on('dealOne', function(){
		})
		socket.on('dealFullHand', function(data){
			giveFullHand(data);
		})
		socket.on('currentPrompt', function(data){
			currentPrompt(data.text)
		})
		socket.on('giveAllUsernames', function(){
			socket.emit('myUsername', username)
		})
		socket.on('chooser', function(data){
			console.log("chooser is here", data)
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
	}
	render(){
			return (
			<div>
				<Scoreboard />
				<div>
					{this.props.children}
				</div>
				<div> Your Hand </div>
				<Hand />
			</div>
			)
	}
}
function mapStateToProps(state){
	return { socket: state.socket.socket,
			 username: state.user.name}
}
export default DragDropContext(HTML5Backend)(connect(mapStateToProps, actions)(Table))