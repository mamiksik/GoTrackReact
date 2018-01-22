//GoTrackReact://?loginToken=__TOKEN__

export interface AuthState {
	isLoggedIn: boolean,
	restToken: string,
	apiUrl: string,
	refreshTokenUrl: string,
	authUrl: string,
}

const initAuthState: AuthState = {
	isLoggedIn: false,
	restToken: "",
	loginToken: "",
	apiUrl: "",
	tokenURL: "http://martin.local/GoClimb/www/gotrack/en",
	authURL: "http://martin.local/GoClimb/www/auth/cs/go_track/login?back=http%3A%2F%2Fmartin.local%2FGoClimb%2Fwww%2Fgotrack%2Fcs%2F%3FloginToken%3D__TOKEN__",
};

export const authReducer = (state = initAuthState, action) => {
	switch (action.type) {
		case 'SET_LOGIN_TOKEN': {
			return {
				...state,
				loginToken: action.data
			};
		}
		case 'GET_REST_TOKEN_ERROR':
			return {
				...state,
				isLoggedIn: false
			};
		case 'GET_REST_TOKEN_RECEIVED':
			if ( action.data.apiUrl !== '' && action.data.restToken !== '') {
				return {
					...state,
					apiUrl: action.data.apiUrl,
					restToken: action.data.restToken,
					isLoggedIn: true
				};
			} else {
				return state;
			}
		case 'SET_API_URL_MARTIN':
			return {
				...state,
				apiUrl: "http://martin.local/GoClimb/www/api/en/v1/",
			};
		case 'SET_API_URL_PROXY':
			return {
				...state,
				apiUrl: "http://localhost.charlesproxy.com/GoClimb/www/api/en/v1/",
			};
		default:
			return state;

	}
};
