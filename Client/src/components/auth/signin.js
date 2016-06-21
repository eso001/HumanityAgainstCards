import React, { Component } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import * as actions from '../../actions/index';

class Signin extends Component {

handleFormSubmit({username, password}){
	console.log("username, password sending to action creator", username, password)
	this.props.signinUser({username, password})
}
componentWillUnmount(){
	this.props.fetchUsername();
}

renderAlert(){
	if(this.props.errorMessage){
		return (
			<div className="alert alert-danger">
				<strong>Oops!</strong> {this.props.errorMessage}
			</div>
			)
	}
}
	render(){
		const { handleSubmit, fields: { username, password}} = this.props;
		return(
			<div>
				<h2 className="authBanner">Sign in</h2>
				<form className="authForm" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>	
					<fieldset className="form-group">
						<label>Username:</label>
						<input {...username} className="form-control" />
					</fieldset>
					<fieldset className="form-group">
						<label>Password:</label>
						<input type="password" {...password} className="form-control" />
					</fieldset>
					{this.renderAlert()}
					<Link className="btn btn-danger authButtons backButton" to="/">Back</Link>
					<button action="submit" className="btn btn-primary authButtons">Sign in</button>
				</form>
			</div>
		)
	}
}

function mapStateToProps(state){
	return {errorMessage: state.auth.error};
}

export default reduxForm({
	form: 'signin',
	fields: ['username', 'password']
}, mapStateToProps, actions)(Signin)