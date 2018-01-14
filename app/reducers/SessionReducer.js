//GoTrackReact://?loginToken=__TOKEN__

export interface TrackData {
	gyroscope: {
		x: number,
		y: number,
		z: number,
	},
	magnetometer: {
		x: number,
		y: number,
		z: number,
	},
	accelerometer: {
		x: number,
		y: number,
		z: number,
	},
	pressure: number,
	timestamp: number,
}

const initState: [TrackData] = [];

export const sessionReducer = (state = initState, action) => {
	switch (action.type) {
		case 'ADD':
			return [...state,
				action.newData
			];
		default:
			return state;

	}
};
