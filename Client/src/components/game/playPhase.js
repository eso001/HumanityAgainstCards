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
	// timerEnded(){
	// 	console.log("herro i am the timer function")
	// 	if(!this.props.chosenOne){
	// 		const cardToSend = this.props.hand[0];
	// 		this.props.giveAnswer(cardToSend)
	// 		this.props.socket.emit('sendCard', cardToSend);
	// 	}
	// }
	render(){
		return (
				<div>
				<div className="prompt-holder">
					<div className="prompt card">
						{this.props.prompt}
					</div>
				</div>
				<div className="answer-receiver chosen-cards">
					<AnswerReceiver/>
				</div>
				</div>
			)
	}
}
function mapStateToProps(state){
	console.log("this is state", state)
	return {
		chosenOne: state.table.chooser.chosenOne,
		hand: state.hand,
		prompt: state.table.prompt,
		playPhase: state.playPhase,
		socket: state.socket.socket
			}
}
export default connect(mapStateToProps, actions)(PlayPhase)