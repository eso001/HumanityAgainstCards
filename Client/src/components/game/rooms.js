import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

import {browserHistory} from 'react-router';

class Rooms extends Component {
	play(){
		console.log("play is clicked")
		browserHistory.push('/humanity/lobby');
	}
	componentWillMount(){
		this.props.fetchMessage();
	}
	render(){
			return (
			<div>
			<button onClick={this.play.bind(this)} className="btn btn-primary">Play!</button>
			</div>
			)
	}
}
function mapStateToProps(state){
	return { message: state.auth.message }
}
export default connect(mapStateToProps, actions)(Rooms)