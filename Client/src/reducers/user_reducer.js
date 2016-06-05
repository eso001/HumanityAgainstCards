import { USER_NAME } from '../actions/types';

export default function(state = {}, action){
	switch(action.type){
		case USER_NAME:
			return {name: action.payload}
	}
	return state;
}