import { FULL_HAND, ADD_CARD, GIVE_ANSWER } from '../actions/types';
import _ from 'lodash';

export default function(state = [], action){
	switch(action.type){
		case FULL_HAND:
			return action.payload;
		case ADD_CARD:
			return [...state, action.payload]
		case GIVE_ANSWER:
			return _.filter(state, item => {
				return item.id !== action.payload.id
			})
	}
	return state;
}