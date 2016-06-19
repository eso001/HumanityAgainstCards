import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {Motion, spring} from 'react-motion';
import _ from 'lodash';

class Welcome extends Component {
			finalStyle(index){
			return {
				bottom: spring(0, {stiffness: 90, damping: 14})
			}
		}

	render(){

		this.finalStyle = this.finalStyle.bind(this);
		return (
			<div className="welcome-holder">
			<div className="container-fluid">
				<div className="row">
					<div className="relative welcomeTitleBanner col-sm-12 col-lg-12">
					<h1 className="terribleH1">Terrible People</h1>
					<h6>the Gathering</h6>
					<h5 className="slogan">For those who don't want to shuffle nine hundred seventy six million four hundred seventeen thousand one hundred and ninety-one cards</h5>
					</div>
				</div>
			</div>
			<div className="container-fluid ">
				<div className="row gray">
					<div className="col-lg-12 col-md-12 col-sm-12 welcomeCardHolder relative firstWelcomeCardHolder">
			  		{_.range(6).map(index => {
	  					let defaultStyle = { bottom: 800 }
			  			let style = this.finalStyle(index)
			  			if(!this.props.authenticated){
			  			if(index === 2){
			  				return (
			  					<Motion defaultStyle={defaultStyle} style={style} key={index}>
			  						{(value) => {return ( 
			  							<div className="flyAway two" style={{bottom: value.bottom}}><Link className="welcomeLinks" to="/signin">Sign in</Link></div>
									)}}
			  					</Motion>
			  					)
			  			}
			  			if(index === 3){
			  				return (
			  					<Motion defaultStyle={defaultStyle} style={style} key={index}>
			  						{(value) => {return ( 
			  							<div className="flyAway nine" style={{bottom: value.bottom}}><Link className="welcomeLinks" to="/signup">Sign up</Link></div>
									)}}
			  					</Motion>
			  					)
			  			}
			  			} 
			  			return (
			  					<Motion defaultStyle={defaultStyle} style={style} key={index}>
			  						{(value) => {return ( 
			  							<div className="flyAway" style={{bottom: value.bottom}}></div>
									)}}
			  					</Motion>
								)
			  			})
			  		}
			  		</div>
			  		<div className="col-lg-12 col-md-12 col-sm-12 welcomeCardHolder relative">
			  		{_.range(6).map(index => {
	  					let defaultStyle = { bottom: 800 }
			  			let style = this.finalStyle(index)
			  			if(index===2){
							return (<Motion defaultStyle={defaultStyle} style={style} key={index}>
				  						{(value) => {return ( 
				  							<div className="flyAway ten" style={{bottom: value.bottom}}>Cards are real, all natural and gluten-free straight from Cards Against Humanity™</div>
										)}}
				  					</Motion>)
			  			}
			  			if(this.props.authenticated){
			  				if(index === 3){
				  				return (
				  					<Motion defaultStyle={defaultStyle} style={style} key={index}>
				  						{(value) => {return ( 
				  							<div className="flyAway eight" style={{bottom: value.bottom}}><Link className="welcomeLinks" to="/humanity/rooms">Search For Game</Link></div>
										)}}
				  					</Motion>
				  				)
			  				}
			  			}
			  			return (
			  					<Motion defaultStyle={defaultStyle} style={style} key={index}>
			  						{(value) => {return ( 
			  							<div className="flyAway" style={{bottom: value.bottom}}></div>
									)}}
			  					</Motion>
								)
			  			})
			  		}
			  		</div>
			  	</div>
			</div>
			</div>
		)
	}

}

function mapStateToProps(state){
	return {
		authenticated: state.auth.authenticated
	}
}

export default connect(mapStateToProps)(Welcome);
