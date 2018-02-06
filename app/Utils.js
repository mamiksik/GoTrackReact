import {Store} from 'redux'
import {AuthState} from "./reducers/AuthReducer";


export class Utils {


	static getUrl(route: string, store: Store) {
		const auth: AuthState = store.getState().auth;
		// console.log(auth);

		const divider = route.indexOf('?') === -1 ? '?' : '&';
		const token = auth.restToken ? divider + 'token=' + auth.restToken : '';

		const final = auth.apiUrl + route + token;
		console.log(final);

		return final;
	}

	static getColour(id: number){

	}
}
