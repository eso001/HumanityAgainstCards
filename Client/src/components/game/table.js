import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/gameActions';
import Scoreboard from './scoreboard';
import Hand from './hand';

class Table extends Component {
	componentDidMount(){
		if(!this.props.socket){
			return;
		}
		var {socket} = this.props
		socket.emit("startGame")
		console.log("start game emitted")
		socket.on('dealOne', function(){
			console.log("I GOT DEALT ONE");
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
	return { socket: state.socket.socket}
}
export default connect(mapStateToProps, actions)(Table)