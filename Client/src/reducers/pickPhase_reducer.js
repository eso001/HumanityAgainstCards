import { PICKPHASE_OPTIONS } from '../actions/types';

export default function(state = {}, action){
	switch(action.type){
		case PICKPHASE_OPTIONS:
			return {...state, options: action.payload}
	}
	return state;
}