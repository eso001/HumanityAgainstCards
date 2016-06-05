import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import App from './components/app';
import reducers from './reducers';
import Signin from './components/auth/signin';
import reduxThunk from 'redux-thunk';
import Signout from './components/auth/signout'
import Signup from './components/auth/signup';
import RequireAuth from './components/auth/require_auth'
import Welcome from './components/welcome';
import Rooms from './components/game/rooms';
import Lobby from './components/game/lobby';
import Table from './components/game/table';
import {AUTH_USER} from './actions/types';

const createStoreWithMiddleware = applyMiddleware(reduxThunk)(createStore);

const store = createStoreWithMiddleware(reducers);

const token = localStorage.getItem('token');
//if we get a token consider user to be signed in

if(token){
	//the dispatch method is a property of the store

	store.dispatch({ type: AUTH_USER})
}
ReactDOM.render(
  <Provider store={store}>
  	<Router history={browserHistory} >
  		<Route path="/" component={App}>
  			<IndexRoute component={Welcome} />
  			<Route path="signin" component={Signin} />
  			<Route path="signout" component={Signout} />
  			<Route path="signup" component={Signup} />
  			<Route path="humanity/rooms" component={RequireAuth(Rooms)} />
        <Route path="humanity/lobby" component={RequireAuth(Lobby)} />
        <Route path="humanity/table" component={RequireAuth(Table)} />
  		</Route>
  	</Router>
  </Provider>
  , document.querySelector('.container'));
