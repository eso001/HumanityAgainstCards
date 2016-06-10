import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';

class Welcome extends Component {
	renderAuthenticated(){
		if(this.props.authenticated){
			return <li><Link to="/humanity/rooms">Search For Game</Link></li>
		} else {
			return 	([<li key={1}>
						<Link className="btn btn-default" to="/signin">Sign in</Link>
					</li>,
					<li key={2}>
						<Link className="btn btn-default" to="/signup">Sign up</Link>
					</li>])
		}
	}
	render(){

		return (
			<ul>
				{this.renderAuthenticated()}
			</ul>
		)
	}

}


function mapStateToProps(state){
	return {
		authenticated: state.auth.authenticated
	}
}

export default connect(mapStateToProps)(Welcome);