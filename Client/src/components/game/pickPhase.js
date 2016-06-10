import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/gameActions';
import { browserHistory } from 'react-router';
class pickPhase extends Component {
	componentDidMount(){
		var counter = 0;
		var {socket, addCard, currentPrompt, clearAnswer} = this.props;
		socket.on('dealOneCard', function(data){
			console.log("deal one card receieved")

			addCard(data)
			counter++;
			console.log(counter)
				browserHistory.push('/humanity/table/playPhase')
		})
		clearAnswer();
	}
	chooseFunniest(event){
		var {socket} = this.props
		var chosenOne;
		var cardId = event.target.getAttribute('class').split(' ')[0];
		console.log("choosing funniest", cardId, this.props.options)
		cardId = +cardId;
			this.props.options.forEach(function(item){
			if(item.id === cardId){
				chosenOne = item
		console.log("thechosenone", chosenOne)
		socket.emit("theChosenOne", chosenOne)
			}
			})		
	}
	renderOptions(){
		return this.props.options.map(card => {
			return (
					<li key={card.id} onClick={this.chooseFunniest.bind(this)} className={card.id + " chosen-card card"}>
						{card.text}
					</li>
				)
		})
	}
	render(){

		return (
				<div>
					<ul className="chosen-cards">
						<li className="chosen-card card">
							{this.props.prompt}
						</li>
						<li>
							Pick A Card!
						</li>
					</ul>
						<ul className="chosen-cards">
							{this.renderOptions()}
						</ul>
				</div>
			)
	}
}
function mapStateToProps(state){
	return {
		socket: state.socket.socket,
		prompt: state.prompt,
		options: state.pickPhase.options
	}
}
export default connect(mapStateToProps, actions)(pickPhase)