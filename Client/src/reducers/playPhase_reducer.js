import { GIVE_ANSWER } from '../actions/types';

export default function(state = {}, action){
	switch(action.type){
		case GIVE_ANSWER:
			console.log("CURRENT ANSWER", action.payload)
			return {...state, currentAnswer: action.payload}
	}
	return state;
}