import React, {Component} from 'react';
import {Link, browserHistory} from 'react-router'
import {connect} from 'react-redux';
import Timer from './timer';

class roundWinner extends Component {
	routeToPlayphase(){
		browserHistory.push('/humanity/table/playPhase');
	}
	render (){
		return (
			<div>
				<Timer time={3} callback={this.routeToPlayphase.bind(this)} />
				<div className="roundWinner">
					{this.props.winnerData.winner} has won!
				</div>
				<ul className="chosen-cards winnerCardList">
					<li key={1} className="prompt winnerCards card">{this.props.winnerData.prompt.text}</li>
					<li key={2} className="card winnerCards">{this.props.winnerData.answer.text}</li>
				</ul>
			</div>

			)
	}
}

function mapStateToProps(state){
	return {winnerData: state.table.roundWinner}
}
export default connect(mapStateToProps)(roundWinner)
