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

		case 'GET_LOGS_FLAT':
			let values = [];
			for(let key in state.logs) {
				if(state.hasOwnProperty(key)) {
					values.push(state[key]);
				}
			}

			return values;
		default:
			return state;

	}
};
