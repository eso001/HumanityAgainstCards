import React, {Component} from 'react';
import { connect } from 'react-redux';
import AnswerReceiver from './answerReceiver';
import * as actions from '../../actions/gameActions';
import {browserHistory} from 'react-router';
class PlayPhase extends Component {
	componentDidMount(){
		console.log(this.props, "PLAYPHASE PROPS")
		// this.props.receivePickPhaseOptions = this.props.receivePickPhaseOptions.bind(this)
		var { receivePickPhaseOptions, socket} = this.props;
		socket.on('chooseBestAnswer', function(options){
			console.log("options", options)
			receivePickPhaseOptions(options)
			browserHistory.push('/humanity/table/pickPhase')
		})
	}

	render(){
		return (
				<div>
				<div className="chosen-cards">
					<div className="card">
						{this.props.prompt}
					</div>
				</div>
				<div className="chosen-cards">
					<AnswerReceiver/>
				</div>
				</div>
			)
	}
}
function mapStateToProps(state){
	console.log("this is state", state)
	return {
		prompt: state.prompt,
		playPhase: state.playPhase,
		socket: state.socket.socket
			}
}
export default connect(mapStateToProps, actions)(PlayPhase)