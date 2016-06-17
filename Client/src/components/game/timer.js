import React, { Component } from 'react';

export default class Timer extends Component {
	constructor(props){
		super(props);
		this.state = {
			time: props.time,
			lowTime: false
		};
		this.decrement = this.decrement.bind(this);
	}
	componentDidMount(){
		let {time, callback} = this.props;
		let {decrement} = this;
		let handle = setInterval(function(){
			console.log("interval", time)

			time--;
			if (time < 5){
				decrement(time, true);
			} else {
			decrement(time, false);
			}
			if(time === 0){
				callback()
				clearInterval(handle);
				console.log("interval cleared")
			}
		}, 1000)

	}
	decrement(newTime, lowTime){
		this.setState({lowTime})
		this.setState({time: newTime})
	}
	render(){
		let style
		if(this.state.lowTime){
			style = {color: 'red'}
		} else {
			style = {color: 'white'}
		}
		return (
				<div className="timer"style={style}>
					{this.state.time}
				</div>
			)
	}
}