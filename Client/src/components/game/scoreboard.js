import React, { Component } from 'react';
import { connect } from 'react-redux'
import * as actions from '../../actions/gameActions';

class Scoreboard extends Component {

	componentDidMount(){
		var {socket, updateScoreboard, loadedTable} = this.props
		console.log('updateScoreboard', this.props.scoreboard)
		socket.on('updateScoreboard', function(data){
			updateScoreboard(data)
				loadedTable(true)

			console.log(data, "scoreboard")
		})
	}
	renderScoreboard(){
		let { chooser } = this.props
		return this.props.scoreboard.map(user => {
			console.log("scoreboard user",user)
			var tempInsert = null;
			if(chooser === user.username){
				return (<li key={user.username} className="scoreboard-unit"><img src="../../../assets/crown.svg" className="miniPlayedCardImg" />{" " +  user.username + ": " + user.score}</li>)
			} else {
				if(user.played){
						return (<li key={user.username} className="scoreboard-unit"><span className="miniPlayedCard" style={{background: 'green'}}> </span>{" " +  user.username + ": " + user.score}</li>)
				} else {
						return (<li key={user.username} className="scoreboard-unit"><span className="miniPlayedCard" style={{background: 'red'}}> </span>{" " +  user.username + ": " + user.score}</li>)
				}
			}
		})
	}
	render(){
			return (
			<div>
				<br />
					<ul className="flexContainer scoreboard">
						{this.renderScoreboard()}
					</ul>
				<br />
			</div>
			)
	}
}
function mapStateToProps(state){
	return { socket: state.socket.socket,
			username: state.user.name,
			 scoreboard: state.scoreboard,
			 chooser: state.table.chooser.chooserName
			}
}

export default connect(mapStateToProps, actions)(Scoreboard)