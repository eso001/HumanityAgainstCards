import React, { Component } from 'react';
import { Link } from 'react-router';
import { reduxForm } from 'redux-form';
import * as actions from '../../actions/index';

class Signup extends Component {
	//formProps will automatically have all hte fields you specified at the bottom
	renderAlert(){
		if(this.props.errorMessage){
			return (
				<div className="alert alert-danger">
					<strong>Oops!</strong> {this.props.errorMessage}
				</div>
				)
		}
	}
	handleFormSubmit(formProps){
		//call action creator to sign up the user
		this.props.signupUser(formProps)
	}
	componentWillUnmount(){
		this.props.fetchUsername();
	}
	render(){
		const {handleSubmit, fields: { username, password, passwordConfirm}} = this.props;
		return (
			<div>
			<h2 className="authBanner">Sign up</h2>
			<form className="authForm" onSubmit={handleSubmit(this.handleFormSubmit.bind(this))}>
				<fieldset className="form-group">
					<label>Username:</label>
					<input type="username" className="form-control" {...username} />
					{username.touched && username.error && <div className="error">{username.error}</div>}
				</fieldset>
				<fieldset className="form-group">
					<label>Password:</label>
					<input type="password" className="form-control" {...password} />
					{password.touched && password.error && <div className="error">{password.error}</div>}
				</fieldset>
				<fieldset className="form-group">
					<label>Confirm Password:</label>
					<input type="password" className="form-control" {...passwordConfirm} />
					{passwordConfirm.touched && passwordConfirm.error && <div className="error">{passwordConfirm.error}</div>}
				</fieldset>
				{this.renderAlert()}
				<Link className="btn btn-danger authButtons backButton" to="/">Back</Link>
				<button className="btn btn-primary authButtons" action="submit">Sign up</button>
			</form>
			</div>
			)
	}
}
function validate(formProps){
	const errors= {};
	if(!formProps.username){
		errors.username = 'Please enter an username';
	}

	if(!formProps.password){
		errors.password = 'Please enter a password';
	}
	if(!formProps.passwordConfirm){
		errors.passwordConfirm = 'Please enter a password confirmation'
	}
	if(formProps.password !== formProps.passwordConfirm){
		errors.password = "Passwords must match";
	}
	return errors;
}
function mapStateToProps(state){
	return {
		errorMessage: state.auth.error
	}
}
export default reduxForm({
	form: 'signup',
	fields: ['username', 'password', 'passwordConfirm'],
	validate}, mapStateToProps, actions)
	(Signup)


