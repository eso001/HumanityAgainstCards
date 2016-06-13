import React, {Component} from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/gameActions';
import { browserHistory } from 'react-router';
class pickPhase extends Component {
	componentDidMount(){
		var {socket, addCard, clearAnswer} = this.props;
		socket.on('dealOneCard', function(data){
			console.log("deal one card receieved")
			if(this.props.hand.length < 7){
			addCard(data)
			}
				browserHistory.push('/humanity/table/playPhase')
		})
		clearAnswer();
	}
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
			return <li key={1} className="chosen-card card"> You have disconnected from a session</li>
		}
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
					<div>
						{this.props.chooserName + " is the chosen one."}
					</div>
					<ul className="chosen-cards">
						<li className="chosen-card card">
							{this.props.prompt}
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
		hand: state.hand,
		chosenOne: state.table.chooser.chosenOne,
		chooserName: state.table.chooser.chooserName,
		socket: state.socket.socket,
		prompt: state.table.prompt,
		options: state.pickPhase.options
	}
}
export default connect(mapStateToProps, actions)(pickPhase)