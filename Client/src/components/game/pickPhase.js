import React, {Component} from 'react';

export default class pickPhase extends Component {

	render(){

		return (
				<div>
					<div className="card">
						Prompt:
					</div>
					<ul className="chosen-cards">
						<li key={1} className="chosen-card card">
							Chosen Card 1
						</li>
						<li key={2} className="chosen-card card">
							Chosen Card 2
						</li>
						<li key={3} className="chosen-card card">
							Chosen Card 3
						</li>
					</ul>
				</div>
			)
	}
}