//GoTrackReact://?loginToken=__TOKEN__


export interface TrackData {

	// gyroscope: {
	// 	x: number,
	// 	y: number,
	// 	z: number,
	// },
	// magnetometer: {
	// 	x: number,
	// 	y: number,
	// 	z: number,
	// },
	// accelerometer: {
	// 	x: number,
	// 	y: number,
	// 	z: number,
	// },
	accelerometerX: number,
	accelerometerY: number,
	accelerometerZ: number,

	gyroscopeX: number,
	gyroscopeY: number,
	gyroscopeZ: number,

	magnetometerX: number,
	magnetometerY: number,
	magnetometerZ: number,


	pressure: number,
	timestamp: number,

}

// export interface Session {
// 	sessionId: { TrackData }
// }

const initState = {
	latestSession: 0,
	latestUpdate: Date.now(),
	sessions: []
};

export const sessionReducer = (state = initState, action) => {
	// console.log(state);
	// console.log(action);
	const {type, data, sessionId} = action;
	switch (type) {
		case 'ADD_SESSION':

			let newState = {...state};
			if (state.sessions.hasOwnProperty(sessionId)) {
				// newState[sessionId] = {}
				newState.sessions[sessionId].data = [...state.sessions[sessionId].data, data];
			} else {
				newState.sessions[sessionId] = {
					sessionId: sessionId,
					data: [data]
				};
			}

			if (sessionId > state.latestSession){
				newState.latestSession = sessionId;
			}

			return newState;

		default:
			return state;
	}
};
