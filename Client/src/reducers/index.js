import { combineReducers } from 'redux';
import { reducer as form} from 'redux-form';
import auth from './auth_reducer';
import user from './user_reducer';
import lobby from './lobby_reducer';
import socket from './socket_reducer';
const rootReducer = combineReducers({
	form,
	auth,
	user,
	lobby,
	socket
});

export default rootReducer;
