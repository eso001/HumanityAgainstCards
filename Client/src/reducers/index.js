import { combineReducers } from 'redux';
import { reducer as form} from 'redux-form';
import auth from './auth_reducer';
import user from './user_reducer';
import lobby from './lobby_reducer';
const rootReducer = combineReducers({
	form,
	auth,
	user,
	lobby
});

export default rootReducer;
