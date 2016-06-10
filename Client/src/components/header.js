import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link, browserHistory } from 'react-router';
import * as actions from '../actions/index';

class Header extends Component {
	componentWillMount(){
		console.log("this is props", this.props);
		if(this.props.authenticated){
		this.props.fetchUsername()
		}
	}
	renderLinks(){
		if(this.props.authenticated){
			return (
				[<li key={1} className="nav-item">
					<Link className="nav-link" to="/signout">Sign Out</Link>
				</li>,
				<li key={2} className="nav-item">
					{this.props.user.name}
				</li>]
				)
		} else {
			return [
				<li className="nav-item" key={1}>
					<Link className="nav-link" to="/signin">Sign in</Link>
				</li>,
				<li className="nav-item" key={2}>
					<Link className="nav-link" to="/signup">Sign up</Link>
				</li>
				]
		}
	}
	render(){

		return (
				<nav className="navbar navbar-light">
					<Link to="/" className="navbar-brand">Humanity Against Cards</Link>
					<ul className="nav navbar-nav">
						{this.renderLinks()}
					</ul>
				</nav>
			)
	}
}

function mapStateToProps(state){
	return { 
		authenticated: state.auth.authenticated,
		user: state.user
	}
}
export default connect(mapStateToProps, actions)(Header)