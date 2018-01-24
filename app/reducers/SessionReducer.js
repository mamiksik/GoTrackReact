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

const initState/*: { sessionId: [] }*/ = {};

export const sessionReducer = (state = initState, action) => {
	// console.log(state);
	// console.log(action);
	const {type, data, sessionId} = action;
	switch (type) {
		case 'ADD_SESSION':

			// const data = state.reduce((previousValue, currentValue, currentIndex, array) => {
			// 	if (currentValue.sessionId === action.data.sessionId) {
			// 		currentValue.data = [...currentValue.data, action.data.data]
			// 	}
			// }, null);

			let newState = {...state};
			if (state.hasOwnProperty(sessionId)) {
				// newState[sessionId] = {}
				newState[sessionId].data = [...state[sessionId].data, data];
			} else {
				newState[sessionId] = {
					sessionId: sessionId,
					data: [data]
				};

			}

			return newState;

		default:
			return state;
	}
};
