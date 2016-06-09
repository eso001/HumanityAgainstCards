import { CURRENT_PROMPT, FULL_HAND, ADD_CARD, GIVE_ANSWER } from './types';

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