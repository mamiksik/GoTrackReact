import request from 'superagent'
import {Utils} from "../Utils";
import {AuthState} from "../reducers/AuthReducer";
import {TrackData} from "../reducers/SessionReducer";

export const sessionService = store => next => action => {
	next(action);

	console.log(store);
	console.log(Utils.getUrl('session/', store));

	const state: [TrackData] = store.getState().session;
	console.log(state);

	switch (action.type) {
		case 'POST_SESSIONS':
			request
				.post( Utils.getUrl('session/', store))
				.send({'sessions': state})
				.end((err, res) => {
					if (err) {
						/*
						in case there is any error, dispatch an action containing the error
						*/
						return next({
							type: 'POST_SESSIONS_ERROR',
							err
						})
					}

					const data = JSON.parse(res.text).data;
					next({
						type: 'POST_SESSIONS_SUCCESS',
						data
					})
				});
			break;
		default:
			break;
	}
};
