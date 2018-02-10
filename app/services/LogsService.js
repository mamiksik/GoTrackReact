import request from 'superagent'
import {Utils} from "../Utils/Utils";

export const logsService = store => next => action => {
	next(action);

	// console.log(store);
	// console.log(Utils.getUrl('logs/', store));
	switch (action.type) {
		case 'GET_LOGS':
			request
				.get( Utils.getUrl('logs/', store))
				.end((err, res) => {
					if (err) {
						/*
						in case there is any error, dispatch an action containing the error
						*/
						return next({
							type: 'GET_LOGS_ERROR',
							err
						})
					}

					const data = JSON.parse(res.text).data;
					next({
						type: 'GET_LOGS_RECEIVED',
						data
					})
				});
			break;
		default:
			break;
	}
};
