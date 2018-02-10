import React from "react";
import {connect, Provider} from "react-redux";
import {Container, StyleProvider} from "native-base";


import {NavigationActions} from 'react-navigation';
import {PersistGate} from "redux-persist/es/integration/react";

import {AppNavigator} from "./Route";
import {store, persistor} from "./Redux";


console.log(store);

@connect((state) => {
	return {
		logs: state.logs,
		auth: state.auth,
	};
})
class AuthComponent extends React.Component {

	constructor(props) {
		super(props);
		this.props.dispatch({type: "GET_REST_TOKEN"});
	}

	// componentDidMount() {
	// }

	render() {
		// if (this.props.auth.isLoggedIn) {
		// 	NavigationActions.navigate({routeName: 'Tabs'})
		// } else {
		// 	NavigationActions.navigate({routeName: 'Login'})
		// }

		return (
			<AppNavigator/>
		);
	}
}


export default AppComponent = () => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<AuthComponent/>
			</PersistGate>
		</Provider>
	);

};
