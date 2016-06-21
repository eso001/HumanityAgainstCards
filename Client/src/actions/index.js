import axios from 'axios';
import { browserHistory } from 'react-router';
import { PLAYER_LIST,
		 AUTH_USER,
		 AUTH_ERROR,
		 UNAUTH_USER,
		 FETCH_MESSAGE,
		 USER_NAME,
		 SOCKET_TYPE,
		 ROOM_TYPE
	    } from './types'
//we can use browserHistory to make changes to the url

// const ROOT_URL = 'http://localhost:3090';

const ROOT_URL = 'http://52.38.25.70';

export function giveRoom(room){
	return {
		type: ROOM_TYPE,
		payload: room
	}
}
export function giveSocket(socket){
	return {
		type: SOCKET_TYPE,
		payload: socket
	}
}
export function updatePlayerList(list){
	return {
		type: PLAYER_LIST,
		payload: list
	}
}
export function fetchUsername(){
	const token = localStorage.getItem('token')
	console.log(token, "this is the token")
	return function(dispatch){
	axios.post(`${ROOT_URL}/user/getUsername`, {token})
		.then(response => {
			console.log("response.data: ",response.data)
			dispatch({type: USER_NAME, payload: response.data.username})

		})
	}
}
export function signinUser({ username, password }){
	return function(dispatch){
		axios.post(`${ROOT_URL}/signin`, {username, password})
			.then(response => {
				dispatch({ type: AUTH_USER });
				localStorage.setItem('token', response.data.token)
				browserHistory.push('/humanity/rooms');
		//if request is good
		//update state to indicate user is authenticated
		//save JWT token
		//redirect to the route '/feature'
			})
			.catch(()=>{
		//if request is bad...
		//show an error to the user
				dispatch(authError("Bad Login Info"))
			})
	}
}
export function signupUser({username, password}){
	return function(dispatch){
	axios.post(`${ROOT_URL}/signup`, {username, password})
	  .then(response => {
	  	dispatch({ type: AUTH_USER });
	  	localStorage.setItem('token', response.data.token)
	  	browserHistory.push('/humanity/rooms')
	  })
	  .catch(response=>{
	  	dispatch(authError("response.data.error"))
	  })
	}
}
export function signoutUser(){
	localStorage.removeItem('token');
	return {
		type: UNAUTH_USER
	}
}
export function authError(error){
	return {
		type: AUTH_ERROR,
		payload: error
	}
}