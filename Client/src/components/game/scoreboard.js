import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions/gameActions';

class Scoreboard extends Component {

	componentDidMount(){
		var {socket, updateScoreboard} = this.props
		socket.on('updateScoreboard', function(data){
			updateScoreboard(data)
			console.log(data, "scoreboard")
		})
	}
	renderScoreboard(){
		return this.props.scoreboard.map(user => {
			if(user.played){
				return <li>{"user has played" + user.username + ": " + user.score}</li>
			}
			return (<li>{user.username + ": " + user.score}</li>)

		})
	}
	render(){
			return (
			<div>
				<br />
					<ul className="flexContainer">
						{this.renderScoreboard()}
					</ul>
				<br />
			</div>
			)
	}
}
function mapStateToProps(state){
	return { socket: state.socket.socket,
			 scoreboard: state.scoreboard}
}

export default connect(mapStateToProps, actions)(Scoreboard)