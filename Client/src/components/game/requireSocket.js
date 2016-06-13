import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent){

	class RequireSocket extends Component {
		static contextTypes = {
			router: React.PropTypes.object
		}
		componentWillMount(){
			if(!this.props.socket){
				if(!this.props.authenticated){
					this.context.router.push('/');
				} else {
					this.context.router.push('/humanity/rooms')
				}
			}
		}

		componentWillUpdate(nextProps){
			if(!nextProps.authenticated){
				this.context.router.push('/');
			}
		}
		render(){
			return <ComposedComponent {...this.props} />
		}
	}
	function mapStateToProps(state){
		return {authenticated: state.auth.authenticated,
				socket: state.socket.socket};
	}
	return connect(mapStateToProps)(RequireSocket);
}
