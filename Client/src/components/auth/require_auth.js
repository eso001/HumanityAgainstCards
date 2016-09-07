import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function(ComposedComponent){

	class Authentication extends Component {
		//this is related to "this.context"
		//context is just like props but skips levels in hierarchy
		//you are forced to define these context type properties to 
		//get access to the this.context object
		//this gives us ability to access "Authentication.contextTypes"
		static contextTypes = {
			router: React.PropTypes.object
		}
		componentWillMount(){
			console.log("HOC REQUIRE AUTH");
			if(!this.props.authenticated){
			this.context.router.push('/');
		}
		}

		componentWillUpdate(nextProps){
			//nextProps represents next set of 
			//properties this component will be rerendered with
			//calls this when component is about to be updated
			if(!nextProps.authenticated){
				this.context.router.push('/');
			}
		}
		render(){
			return <ComposedComponent {...this.props} />
		}
	}
	function mapStateToProps(state){
		return {authenticated: state.auth.authenticated};
	}
	return connect(mapStateToProps)(Authentication);
}

//in some other location ... not in this file...
// we want to use this HOC

// import Authentication //this is my HOC

// import Resources // This is the component I want to wrap

// const ComposedComponent = Authentication(Resources);