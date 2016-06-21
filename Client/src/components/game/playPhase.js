import React, {Component} from 'react';
import { connect } from 'react-redux';
import AnswerReceiver from './answerReceiver';
import * as actions from '../../actions/gameActions';
import {browserHistory} from 'react-router';
class PlayPhase extends Component {
	componentDidMount(){
		var { receivePickPhaseOptions, socket} = this.props;
		socket.on('chooseBestAnswer', function(options){
			receivePickPhaseOptions(options)
			browserHistory.push('/humanity/table/pickPhase')
		})
	}
	render(){
		return (
				<div>
					<div className="answer-receiver chosen-cards">
						<div className="prompt card">
							{this.props.prompt}
						</div>
						<AnswerReceiver/>
					</div>
				</div>
			)
	}
}
function mapStateToProps(state){
	return {
		chosenOne: state.table.chooser.chosenOne,
		hand: state.hand,
		prompt: state.table.prompt,
		playPhase: state.playPhase,
		socket: state.socket.socket
	}
}
export default connect(mapStateToProps, actions)(PlayPhase)