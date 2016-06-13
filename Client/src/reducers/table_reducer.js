import { CURRENT_PROMPT, NEW_CHOOSER } from '../actions/types';

export default function(state = {prompt: null, chooser: {}}, action){
	switch(action.type){
		case CURRENT_PROMPT:
		console.log("this is prompt", action.payload)
			return {...state, prompt: action.payload}
		case NEW_CHOOSER:
			console.log("chooser object", action.payload);
			return {...state, chooser: action.payload}
	}
	return state;
}