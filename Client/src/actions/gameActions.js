import { NEW_CHOOSER, CURRENT_PROMPT, FULL_HAND, ADD_CARD, GIVE_ANSWER, PICKPHASE_OPTIONS, UPDATE_SCOREBOARD, CLEAR_ANSWER } from './types';

export function updateScoreboard(scoreboard){
	return {
			type: UPDATE_SCOREBOARD,
			payload: scoreboard
	}
}
export function currentPrompt(prompt){
	return {
		type: CURRENT_PROMPT,
		payload: prompt
	}
}
export function giveFullHand(fullHand){
	return {
		type: FULL_HAND,
		payload: fullHand
	}
}
export function addCard(card){
	return {
		type: ADD_CARD,
		payload: card
	}
}

export function giveAnswer(card){
	return {
		type: GIVE_ANSWER,
		payload: card
	}
}
export function receivePickPhaseOptions(cardList){
	return {
		type: PICKPHASE_OPTIONS,
		payload: cardList
	}
}
export function clearAnswer(){
	return {
		type: CLEAR_ANSWER,
		payload: ''
	}
}

export function giveChooser(chooserName){
	console.log("giveChooser is called", chooserName)
	return {
		type: NEW_CHOOSER,
		payload: chooserName
	}
}