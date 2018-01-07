import HomeScreen from "./components/HomeScreen";
import {addNavigationHelpers, StackNavigator, TabNavigator, withNavigation} from "react-navigation";

import React from "react";
import {Linking} from "react-native";
import LoginScreen from "./components/LoginScreen";
import SettingsScreen from "./components/SettingsScreen";
import {applyMiddleware, combineReducers, createStore} from "redux";
import { composeWithDevTools } from 'redux-devtools-extension';
import {connect, Provider} from "react-redux";

import queryString from 'query-string';

import {authReducer} from "./reducers/AuthReducer";
import {loginService} from "./api/LoginService";
import {logsService} from "./api/LogsService";
import {logsReducer} from "./reducers/LogsReducer";

//
// Navigation
//

// const Home = StackNavigator({
// 	Home: {screen: HomeScreen}
// });

const Tabs = TabNavigator({
	Home: {screen: HomeScreen},
	Setting: {screen: SettingsScreen},
});

//
// Settings
//


const appReducer = combineReducers({
	auth: authReducer,
	logs: logsReducer,
});


const store = createStore(appReducer, composeWithDevTools(
	applyMiddleware(loginService),
	applyMiddleware(logsService),
));

window.store = store;

@connect((state) => {
	return {
		logs: state.logs,
		auth: state.auth,
	};
})
@withNavigation
class AuthComponent extends React.Component {

	constructor(props) {
		super(props);
		this.props.dispatch({type: "GET_REST_TOKEN"});
	}

	componentDidMount() {
		// this.props.store.dispatch({type: "GET_REST_TOKEN"});
		// Linking.addEventListener('url', this._handleOpenURL);
	}

	componentWillUnmount() {
		// Linking.removeEventListener('url', this._handleOpenURL);
	}
	                                                                  s
	_handleOpenURL(event) {
		const params = queryString.parse(event.url);
		// this.props.store.dispatch({type: "SET_REFRESH_TOKEN_URL", url: params[0]});
		// this.props.store.dispatch({type: "LOGIN"});
	}

	render() {
		if (this.props.auth.isLoggedIn) {
			return (<Tabs/>)
		} else {
			return (<LoginScreen />)
		}
	}
}

class AppComponent extends React.Component {
	render() {

		const Stack = StackNavigator({AuthComponent: {screen: AuthComponent}});
		return (
			<Provider store={store}>
				<Stack/>
			</Provider>
		)
	}
}


export default AppComponent;
/*= () => {
   return (
	   <Provider store={store}>
		   <AuthComponent/>
	   </Provider>
   );
};*/
