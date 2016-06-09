import { combineReducers } from 'redux';
import { reducer as form} from 'redux-form';
import auth from './auth_reducer';
import user from './user_reducer';
import lobby from './lobby_reducer';
import socket from './socket_reducer';
import prompt from './prompt_reducer';
import hand from './hand_reducer';
import playPhase from './playPhase_reducer';
import pickPhase from './pickPhase_reducer';
const rootReducer = combineReducers({
	form,
	auth,
	user,
	lobby,
	socket,
	prompt,
	playPhase,
	hand,
	pickPhase
});

export default rootReducer;
