import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/gameActions';
import { browserHistory } from 'react-router'
import Loader from 'react-loader';

class Loading extends Component {
	componentDidMount(){
		let routed = false;
		let counter = 0;

	}

	render (){
			var options = {
    lines: 7,
    length: 50,
    width: 80,
    radius: 20,
    corners: 0,
    rotate: 10,
    direction: 1,
    color: 'black',
    speed: .8,
    trail: 100,
    shadow: true,
    hwaccel: false,
    zIndex: 10,
    top: '50%',
    left: '50%',
    scale: 1.00
};
		return (

<Loader loaded={false} options={options} className="spinner" >
</Loader>
			)
	}
}

function mapStateToProps(state){
	return {
		socket: state.socket.socket,
		username: state.user.name
	}
}
export default connect(mapStateToProps, actions)(Loading)