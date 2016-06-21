import React, {Component} from 'react';
import {Link} from 'react-router'
import { connect } from 'react-redux';

class Loser extends Component {
	render (){
		return (
			<div> 
				<Link className="backHomeLink" to="/">Back to Home</Link>
				<div className="gameWinner">
					You lost
				</div>
				<ul className="chosen-cards winnerCardList finalWinnerCards">
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

export default connect(mapStateToProps)(Loser)