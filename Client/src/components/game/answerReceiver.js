import React, { Component } from 'react';
import HandCard from './hand-card';
import { DropTarget } from 'react-dnd';
import { connect } from 'react-redux';
import * as actions from '../../actions/gameActions';
	
	var cardTarget = {
  		drop: function(props, monitor) {
  			var item = monitor.getItem()
			props.giveAnswer(item)
			console.log("card is sent");
			props.socket.emit('sendCard', item)
  		},
  		canDrop: function(props, monitor){
  			if(!props.info && !props.chosenOne){
  				return true
  			}
  			return false
  		}
	};

	function collect(connect, monitor) {
  		return {
    		connectDropTarget: connect.dropTarget(),
    		isOver: monitor.isOver(),
    		canDrop: monitor.canDrop()
  		};
	}
class AnswerReceiver extends Component{
	renderCard(){
	const { connectDropTarget, isOver, canDrop, chosenOne } = this.props;
		if(!this.props.info && !chosenOne){
			return (
				<div style={{height: '100%', width: '100%', opacity: isOver && 0.5, backgroundColor: isOver && 'green'}}>Place a card.</div>
				)
		} else {
			if(this.props.info){
				return (
				<div className="card" style={{opacity: isOver && 0.5, backgroundColor: isOver && 'red'}}>{this.props.info.text}</div>
				)
			} else {
				return (
				<div className="card" style={{opacity: isOver && 0.5, backgroundColor: isOver && 'red'}}>Don't place a card, you're picking this round.</div>
				)
			}
		}
	}
	render(){
		const { connectDropTarget, isOver } = this.props;
		return connectDropTarget(
				<div className="card">
					{this.renderCard()}
				</div>
				)
	}
}
function mapStateToProps(state){
	return { info: state.playPhase.currentAnswer,
			 socket: state.socket.socket,
			 chosenOne: state.table.chooser.chosenOne
			  };

}

export default connect(mapStateToProps, actions)(DropTarget('card', cardTarget, collect)(AnswerReceiver))