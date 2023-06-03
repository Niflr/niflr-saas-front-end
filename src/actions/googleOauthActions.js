import { SIGN_IN, SIGN_OUT } from '../types';

export const googleOAuthLogin = (response) => {
	const action = { type: SIGN_IN };
	let payload;
	if (typeof response === 'undefined' || response.error) {
		// If login fails
		payload = null;
	} else {
		payload = response;
	}
	action.payload = payload;
	return action;
};

export const googleOAuthLogout = () => {
	const action = { type: SIGN_OUT };
	return action;
};
