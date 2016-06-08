import { SOCKET_TYPE, ROOM_TYPE } from '../actions/types';

export default function(state = {}, action){
	switch(action.type){
		case SOCKET_TYPE:
			console.log("socket given", action.payload)
			return {...state, socket: action.payload}
		case ROOM_TYPE:
			console.log("room given", action.payload)
			return {...state, room: action.payload}
	}
	return state;
}