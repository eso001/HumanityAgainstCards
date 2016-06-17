import React, { Component } from 'react';

import { connect } from 'react-redux';
import {Link} from 'react-router';
import * as actions from '../../actions/index';

class Signout extends Component {
	componentWillMount(){
		if(this.props.socket){
			this.props.socket.disconnect();
		}
		this.props.signoutUser();
		}
	render(){
		return <div> Sorry to see you go :(
				<Link to="/">Back to Home</Link>
				</div>
	}
}
function mapStateToProps(state){
	return {
		socket: state.socket.socket
	}
}
export default connect(mapStateToProps, actions)(Signout)