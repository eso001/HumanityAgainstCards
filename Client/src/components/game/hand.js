import React, {Component} from 'react';

export default class Hand extends Component {

	render(){

		return (
				<div>
					<ul className= "hand">
						<li className="card hand-item">Card 1</li>
						<li className="card hand-item">Card 2</li>
						<li className="card hand-item">Card 3</li>
						<li className="card hand-item">Card 4</li>
						<li className="card hand-item">Card 5</li>
						<li className="card hand-item">Card 6</li>
						<li className="card hand-item">Card 7</li>
					</ul>
				</div>
			)
	}
}