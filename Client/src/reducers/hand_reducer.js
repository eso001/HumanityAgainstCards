import { FULL_HAND, ADD_CARD, GIVE_ANSWER } from '../actions/types';
import _ from 'lodash';

export default function(state = [], action){
	switch(action.type){
		case FULL_HAND:
			console.log("full hand is given");
			return action.payload;
		case ADD_CARD:
			console.log("adding a card", action.payload)
			return [...state, action.payload]
		case GIVE_ANSWER:
			console.log("giving answer", action.payload, state)
			var newState = [];
			state.forEach((item) => {
				console.log(item);
				if(item.id !== action.payload.id){
					newState.push(item)
				} else {
				console.log("DID NOT PASS TEST", item);

				}
			})
			console.log("new hand after given answer", newState)
			return newState;
	}
	return state;
}