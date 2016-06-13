import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router';
import {Motion, spring} from 'react-motion';
import _ from 'lodash';

class Welcome extends Component {
	
			finalStyle(index){
				if(index > 5){
					index = index + 1;
				}
			return {
				top: spring(30 + (330 *(index%2)), {stiffness: 90, damping: 14})
			}
		}

	render(){

		this.finalStyle = this.finalStyle.bind(this);
		return (
			<div>
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
					<div className="col-lg-12 welcomeCardHolder relative">
			  		{_.range(12).map(index => {
	  					let defaultStyle = { top: -300 }
			  			let style = this.finalStyle(index)
			  			if(!this.props.authenticated){
			  			if(index === 2){
			  				return (
			  					<Motion defaultStyle={defaultStyle} style={style} key={index}>
			  						{(value) => {return ( 
			  							<div className="flyAway two" style={{top:value.top, left:(232 * (index%6))}}><Link className="welcomeLinks" to="/signin">Sign in</Link></div>
									)}}
			  					</Motion>
			  					)
			  			}
			  			if(index === 9){
			  				return (
			  					<Motion defaultStyle={defaultStyle} style={style} key={index}>
			  						{(value) => {return ( 
			  							<div className="flyAway nine" style={{top:value.top, left:(232 * (index%6))}}><Link className="welcomeLinks" to="/signup">Sign up</Link></div>
									)}}
			  					</Motion>
			  					)
			  			}
			  			} else {
			  				if(index === 8){
				  				return (
				  					<Motion defaultStyle={defaultStyle} style={style} key={index}>
				  						{(value) => {return ( 
				  							<div className="flyAway eight" style={{top:value.top, left:(232 * (index%6))}}><Link className="welcomeLinks" to="/humanity/rooms">Search For Game</Link></div>
										)}}
				  					</Motion>
				  				)
			  				}
			  			}
			  			return (
			  					<Motion defaultStyle={defaultStyle} style={style} key={index}>
			  						{(value) => {return ( 
			  							<div className="flyAway" style={{top:value.top, left:(232 * (index%6))}}></div>
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

	// renderAuthenticated(){
	// 	if(this.props.authenticated){
	// 		return <li><Link to="/humanity/rooms">Search For Game</Link></li>
	// 	} else {
	// 		return 	([<li key={1}>
	// 					
	// 				</li>,
	// 				<li key={2}>
	// 					<Link className="btn btn-default" to="/signup">Sign up</Link>
	// 				</li>])
	// 	}
	// }
