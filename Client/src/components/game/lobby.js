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
		this.props.giveSocket(socket);
		token = localStorage.getItem('token')
		token = { token }
	}
	componentDidMount(){
		const {giveRoom, updatePlayerList} = this.props;
			socket.on('initLobby', function(data){
			socket.emit('joinRoom', token)
		})
		socket.on('roomInfo', function(data){
			if(data.slots){
				giveRoom(data._id)
			updatePlayerList(data.slots)
			} else {
				giveRoom(data._id)
				updatePlayerList(data.userSlots)
			} 
		})

	}
	begin(){
		socket.emit('begin', {room: this.props.room})
		browserHistory.push('/humanity/table/playPhase');
	}

		renderPlayers(){
			var counter = 0
		if(!this.props.playerList){
			return (<li className="eachLobbyPlayer">Loading...</li>)
		} else {
			const currentLength = this.props.playerList.length;
			for(var i = this.props.playerList.length; i < 5; i++){
				let temp = "slot " + (currentLength+ i) ;
				this.props.playerList.push({username:temp})
			}
		return this.props.playerList.map(player => {
			counter++
			console.log("player", player)
			return (<li key={counter} className="eachLobbyPlayer">{player.username}</li>)
		})
	}
	}
	render(){
			return (
			<div className="lobby">
				<ul className="lobbyList">
					<Link className="btn btn-danger" to="/humanity/rooms">Back</Link>
					<li className="lobbyTitle">Fight to the Death with</li>
					{this.renderPlayers()}
					<li className="beginLobby" onClick={this.begin.bind(this)}>
						Begin
					</li>
				</ul>
			</div>
			)
	}
}
function mapStateToProps(state){
	return { message: state.auth.message,
			 playerList: state.lobby.playerList,
			 room: state.socket.room}
}
export default connect(mapStateToProps, actions)(Lobby)

