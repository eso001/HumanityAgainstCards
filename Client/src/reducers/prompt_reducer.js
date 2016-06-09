import { CURRENT_PROMPT, FULL_HAND } from '../actions/types';

export default function(state = null, action){
	switch(action.type){
		case CURRENT_PROMPT:
			return action.payload
	}
	return state;
}