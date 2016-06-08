import React, { Component } from 'react';


export default class Scoreboard extends Component {
	render(){
			return (
			<div>
				<nav className="navbar navbar-light">
					<div>
						Scoreboard
					</div>
					<br />
					<ul className="nav navbar-nav">
						<li className="nav-item" key={1}>
							Player 1 : 0
						</li>
						<li className="nav-item" key={2}>
							Player 2 : 0 
						</li>
						<li className="nav-item" key={3}>
							Player 3 : 0
						</li>
						<li className="nav-item" key={4}>
							Player 4 : 0
						</li>
						<li className="nav-item" key={5}>
							Player 5 : 0
						</li>
					</ul>
				</nav>
				<br />
			</div>
			)
	}
}