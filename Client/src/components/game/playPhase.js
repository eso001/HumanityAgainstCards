import React, {Component} from 'react';
import { connect } from 'react-redux';
import AnswerReceiver from './answerReceiver';

class playPhase extends Component {

	render(){

		return (
				<div>
					<div className="card">
						{this.props.prompt}
					</div>
					<AnswerReceiver/>
				</div>
			)
	}
}
function mapStateToProps(state){
	return {
		prompt: state.prompt,
		givenAnswer: state.playPhase.currentAnswer
			}
}
export default connect(mapStateToProps)(playPhase)