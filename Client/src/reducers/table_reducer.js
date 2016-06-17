import { LOADED_TABLE, CURRENT_PROMPT, NEW_CHOOSER, ROUND_WINNER } from '../actions/types';

export default function(state = {prompt: null, chooser: {}, LOADED_TABLE: false, roundWinner: {}}, action){
	switch(action.type){
		case CURRENT_PROMPT:
			return {...state, prompt: action.payload};
		case NEW_CHOOSER:
			return {...state, chooser: action.payload}
		case ROUND_WINNER:
			return {... state, roundWinner: action.payload};
		case LOADED_TABLE:
			return {... state, loaded: action.payload};
	}
	return state;
}