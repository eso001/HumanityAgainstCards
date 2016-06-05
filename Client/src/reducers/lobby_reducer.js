import { PLAYER_LIST } from '../actions/types';

export default function(state = {}, action){
	switch(action.type){
		case PLAYER_LIST:
			return {...state, playerList: action.payload}
	}
	return state;
}