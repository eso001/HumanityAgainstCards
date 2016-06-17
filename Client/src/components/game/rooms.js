import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import {browserHistory} from 'react-router';

class Rooms extends Component {
	play(){
		console.log("play is clicked")
		browserHistory.push('/humanity/lobby');
	}
	render(){
			return (
			<div className="container playDiv">
			<div className="row">
				<div className="col-md-3 xs-hidden"></div>
				<div className="col-md-6 col-xs-12 roomText">Click to get placed in a lobby</div>
			</div>
			<div className="row">
				<div className="col-md-3 xs-hidden"></div>
				<div className="col-md-6 col-xs-12">
					<button onClick={this.play.bind(this)} className="playButton">Play!</button>
				</div>
			</div>
			</div>
			)
	}
}
function mapStateToProps(state){
	return { message: state.auth.message }
}
export default connect(mapStateToProps, actions)(Rooms)