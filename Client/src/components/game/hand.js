import React, {Component} from 'react';
import { connect } from 'react-redux';
import Card from './hand-card';
class Hand extends Component {
		renderHand(){
				return this.props.hand.map(card =>{
					return(
						<li key={card.id} className="card-place-holder">
							<Card info={card}></Card>
						</li>
					)
				})
		}

	render(){
		return (
				<div>
					<ul className="hand">
						{this.renderHand()}
					</ul>
				</div>
			)
	}
}
function mapStateToProps(state){
	return{
		hand: state.hand
	}
}
export default connect(mapStateToProps)(Hand);