import { GIVE_ANSWER } from '../actions/types';

export default function(state = {}, action){
	switch(action.type){
		case GIVE_ANSWER:
			return {...state, currentAnswer: action.payload}
	}
	return state;
}