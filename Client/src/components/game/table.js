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
		var {username, socket, giveFullHand, currentPrompt} = this.props
		socket.emit("startGame")
		console.log("start game emitted")
		socket.on('dealOne', function(){
			console.log("I GOT DEALT ONE");
		})
		socket.on('dealFullHand', function(data){
			console.log("this is the full hand", data)
			giveFullHand(data);
		})
		socket.on('currentPrompt', function(data){
			console.log("this is prompt", data)
			currentPrompt(data.text)
		})
		socket.on('giveAllUsernames', function(){
			socket.emit('myUsername', username)
			console.log("EMITTING MYUSERNAME", username)
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