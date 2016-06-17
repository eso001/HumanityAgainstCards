import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/gameActions';
// import Timer from './timer';

class pickPhase extends Component {
	chooseFunniest(event){
		if(!this.props.chosenOne){
			return;
		}
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
		if(!this.props.options){
			return <li key={1} className="hvr-float-shadow chosen-card card"> You have disconnected from a session</li>
		}
		return this.props.options.map(card => {
			return (
					<li key={card.id} onClick={this.chooseFunniest.bind(this)} className={card.id + " chosen-card card hvr-float-shadow"}>
						{card.text}
					</li>
				)
		})
	}
	// chooseRandom(){
	// 	if(this.props.chosenOne){
	// 		// const randomIndex = Math.floor(Math.random()*this.props.options.length);
	// 		// const randomWinner = this.props.options[randomIndex]
	// 		const randomWinner = this.props.options[0];
	// 		this.props.socket.emit('theChosenOne', randomWinner)
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
						<ul className="chosen-cards">
							{this.renderOptions()}
						</ul>
				</div>
			)
	}
}
function mapStateToProps(state){
	return {
		hand: state.hand,
		chosenOne: state.table.chooser.chosenOne,
		chooserName: state.table.chooser.chooserName,
		socket: state.socket.socket,
		prompt: state.table.prompt,
		options: state.pickPhase.options
	}
}
export default connect(mapStateToProps, actions)(pickPhase)