import * as axios from "axios";

export const loginService = store => next => action => {
	next(action);


	const tokenURL = store.getState().auth.tokenURL + "?loginToken=" + store.getState().auth.loginToken;
	switch (action.type) {
		case 'GET_REST_TOKEN':

			let instance = axios.create({
				withCredentials: true,
				// credentials: 'include',

			});

			// instance.get('https://facebook.github.io/react-native/movies.json').then(function(response) {
			// 	console.log(response);
			// }).catch(function(error) {
			// 	// alert(error)
			// 	console.warn(error)
			// });

			instance.get(tokenURL).then((response) => {
				next({
					type: 'GET_REST_TOKEN_RECEIVED',
					data: response.data.data
				})
			}).catch((error) => {
				console.log(error);
				return next({
					type: 'GET_REST_TOKEN_ERROR',
					error
				})
			});
			break;
		default:
			break;
	}
};
