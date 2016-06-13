import React, { Component } from 'react';
import {connect} from 'react-redux';
import { Link, browserHistory } from 'react-router';
import * as actions from '../actions/index';
import { Navbar, Nav, NavItem, NavDropdown, MenuItem } from 'react-bootstrap';
class Header extends Component {
	componentWillMount(){
		console.log("this is props", this.props);
		if(this.props.authenticated){
		this.props.fetchUsername()
		}
	}
	render(){

		return (
				  <Navbar inverse>
				    <Navbar.Header>
				      <Navbar.Brand>
				  			<Link className="headerRelativeOpposite" to="/">Terrible People</Link>
				      </Navbar.Brand>
				      <Navbar.Toggle />
				    </Navbar.Header>
				    <Navbar.Collapse>
				      <Nav pullRight>
				        <NavItem eventKey={1} className="headerRelativeOpposite">{this.props.user.name}</NavItem>
				        <NavItem eventKey={2}></NavItem>
				        <NavItem eventKey={3}><Link className="headerRelative" to="/signout">Sign Out</Link></NavItem>
				      </Nav>
				    </Navbar.Collapse>
				  </Navbar>
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