import React from "react";
import {StackNavigator, TabNavigator, withNavigation} from "react-navigation";


import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension';
import {connect, Provider} from "react-redux";
import {persistStore, persistReducer} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

//Screens
import HomeScreen from "./components/HomeScreen";
import SettingsScreen from "./components/SettingsScreen";
import LoginScreen from "./components/LoginScreen";

//Services
import {loginService} from "./services/AuthService";
import {logsService} from "./services/LogsService";

//Reducers
import {authReducer} from "./reducers/AuthReducer";
import {logsReducer} from "./reducers/LogsReducer";
import {sessionReducer} from "./reducers/SessionReducer";
import {PersistGate} from "redux-persist/es/integration/react";
import {sessionService} from "./services/SessionService";

function console(target, name, descriptor) {
	let fn = descriptor.value;
	console.log(descriptor);

	window.console = {
		...window.console,
		fn
	};
}

//
// Navigation
//

const Tabs = TabNavigator({
	Home: {screen: HomeScreen},
	Setting: {screen: SettingsScreen},
});


//
// Redux
//

const appReducer = combineReducers({
	auth: authReducer,
	logs: logsReducer,
	session: sessionReducer,
});

const persistConfig = {
	key: 'root',
	storage: storage,
};
const persistedReducer = persistReducer(persistConfig, appReducer);

// @console
export const  store = createStore(persistedReducer, composeWithDevTools(
	applyMiddleware(loginService),
	applyMiddleware(logsService),
	applyMiddleware(sessionService),
));

window.store = store;

// @console
// let persistor = persistStore(store);
// window.persistor = persistor;

// persistor.purge();

//
// Auth
//

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

	render() {
		if (this.props.auth.isLoggedIn) {
			return (<Tabs/>)
			/*return (<LoginScreen/>)*/
		} else {
			// return (<Tabs/>)
			return (<LoginScreen/>)
		}
	}
}

class AppComponent extends React.Component {
	render() {

		const Stack = StackNavigator({AuthComponent: {screen: AuthComponent}});
		return (
			<Provider store={store}>
				{/*<PersistGate persistor={persistor}>*/}
					<Stack/>
				{/*</PersistGate>*/}
			</Provider>
		)
	}
}

export default AppComponent;
