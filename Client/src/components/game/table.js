import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';


class Table extends Component {
	render(){
			return (
			<div>
			<button onClick={this.play.bind(this)} className="btn btn-primary">Play!</button>
			</div>
			)
	}
}
function mapStateToProps(state){
	return { message: state.auth.message }
}
export default connect(mapStateToProps, actions)(Table)