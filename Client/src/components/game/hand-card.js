import React, {Component} from 'react';
import { DragSource } from 'react-dnd'
var cardSource = {
	beginDrag(props){
		return {id: props.info.id,
				text: props.info.text};
	}
}
function collect(connect, monitor) {
 	return {
    	connectDragSource: connect.dragSource(),
    	isDragging: monitor.isDragging()
  	}
}

class handCard extends Component {

	render(){
		const {connectDragSource, isDragging} = this.props;
		return connectDragSource(
		<div style={{opacity: isDragging ? 0.5 : 1.0 }} className="card hand-item">{this.props.info.text}</div>
		)
	}
}

export default DragSource('card', cardSource, collect)(handCard);