import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/index';
import { Link, browserHistory } from 'react-router';
import io from 'socket.io-client';
import Loader from './loading';
var socket;
var token;
class Lobby extends Component {
	componentWillMount(){
		socket = io('http://52.38.25.70/')
		// socket = io('localhost:3090/');
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
		socket.on('begin', function(){

			browserHistory.push('/humanity/table/playPhase')
		})

	}
	begin(){
		socket.emit('begin', {room: this.props.room})
		browserHistory.push('/humanity/loading')

	}

		renderPlayers(){
			var counter = 0
		if(!this.props.playerList){
			return (<Loader />)
		} else {
			const currentLength = this.props.playerList.length;
			for(var i = 1; i < 6 - currentLength; i++){
				let temp = "slot " + (currentLength+ i) ;
				this.props.playerList.push({username:temp})
			}
		return [...this.props.playerList.map(player => {
			counter++
			console.log("player", player)
			return (<li key={counter} className="eachLobbyPlayer">{player.username}</li>)
		}), <li className="beginLobby" onClick={this.begin.bind(this)}>
						Begin
					</li>]
	}
	}
	render(){
			return (
			<div className="lobby">
				<ul className="lobbyList">
					<Link className="btn btn-danger" to="/humanity/rooms">Back</Link>
					<li className="lobbyTitle">Fight to the Death with</li>
					{this.renderPlayers()}
					
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

