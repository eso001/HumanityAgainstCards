import { UPDATE_SCOREBOARD } from '../actions/types';

export default function(state = [], action){
	switch(action.type){
		case UPDATE_SCOREBOARD:
			return action.payload
	}
	return state;
}