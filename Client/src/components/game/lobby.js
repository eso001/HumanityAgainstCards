import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import { Link, browserHistory } from 'react-router';
import io from 'socket.io-client';

var socket;
var token;
class Lobby extends Component {
	componentWillMount(){
		socket = io("localhost:3090")
		token = localStorage.getItem('token')
		token = { token }
	}
	componentDidMount(){
		const {updatePlayerList} = this.props;
			socket.on('initLobby', function(data){
				console.log("lobby inited", token)
			socket.emit('joinRoom', token)
		})
		socket.on('roomInfo', function(data){
			console.log("this is roomInfo")
			if(data.slots){

			updatePlayerList(data.slots)
			} else {
				updatePlayerList(data.userSlots)
			} 
		})
		socket.on('herro', function(){
			console.log("herro there");
		})
	}
	begin(){
		socket.emit('intro', {message: "hello"})
		// browserHistory.push('/humanity/table');
	}

		renderPlayers(){
			var counter = 0
		if(!this.props.playerList){
			return (<li></li>)
		} else {
		return this.props.playerList.map(player => {
			counter++
			console.log("player", player)
			return (<li key={counter}>{player.username}</li>)
		})
	}
	}
	render(){
			return (
			<div>
			<Link className="btn btn-danger" to="/humanity/rooms">Back</Link>
			<ul>
				{this.renderPlayers()}
			</ul>
			<button onClick={this.begin.bind(this)}>Begin!</button>
			</div>
			)
	}
}
function mapStateToProps(state){
	return { message: state.auth.message,
			 playerList: state.lobby.playerList}
}
export default connect(mapStateToProps, actions)(Lobby)