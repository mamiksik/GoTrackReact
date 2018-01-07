//GoTrackReact://?loginToken=__TOKEN__

export interface LogState {

}

const initState: [LogState] = [];

export const logsReducer = (state = initState, action) => {
	switch (action.type) {
		case 'GET_LOGS_ERROR':
			console.log("ERROR");
			console.log(action);
			return state;
		case 'GET_LOGS_RECEIVED':
			console.log("RECIVED");
			console.log(action);
			return action.data;
		default:
			return state;

	}
};
