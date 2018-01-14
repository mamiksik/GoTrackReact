import request from 'superagent'

export const loginService = store => next => action => {
	next(action);

	const loginUrl = store.getState().auth.refreshTokenUrl;
	switch (action.type) {
		case 'GET_REST_TOKEN':
			request
				.get( loginUrl )
				.end((err, res) => {
					if (err) {
						/*
						in case there is any error, dispatch an action containing the error
						*/
						return next({
							type: 'GET_REST_TOKEN_ERROR',
							err
						})
					}

					const data = JSON.parse(res.text).data;
					next({
						type: 'GET_REST_TOKEN_RECEIVED',
						data: data
					})
				});
			break;
		default:
			break;
	}
};
