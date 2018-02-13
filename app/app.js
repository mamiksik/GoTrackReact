import React from "react";
import {connect, Provider} from "react-redux";
import {Container, StyleProvider} from "native-base";
import getTheme from './assets/native-base-theme/components';
import platform from './assets/native-base-theme/variables/platform';

// import {NavigationActions} from 'react-navigation';
import {PersistGate} from "redux-persist/es/integration/react";

import {AppNavigator} from "./Route";
import {store, persistor} from "./Redux";
import NavigationActions from "react-navigation/lib/NavigationActions";


// console.log(store);

@connect((state) => {
	return {
		logs: state.logs,
		auth: state.auth,
	};
})
class AuthComponent extends React.Component {

	constructor(props) {
		super(props);
		// this.props.dispatch({type: "GET_REST_TOKEN"});

		this.state = {
			...this.state,
			initial: true,
			navigator: null,
			auth: this.props.auth
		};

		// this.handleAuth.bind(this);

		// console.log(this.state);
		// console.log(store)
	}


	componentDidMount() {
		// console.log(nextProps);
		// console.log(this.props.store);
		// this.props.store.subscribe(this.handleAuth);
	}

	componentWillReceiveProps(nextProps) {
		console.log(nextProps.auth);
		console.log(this.props.auth.isLoggedIn);
		if (nextProps.auth.isLoggedIn !== this.props.auth.isLoggedIn) {
		     this.state.auth = nextProps.auth;
		     this.handleAuth();
		}
	}


	handleAuth = () => {
		// return
		if (this.state.navigator) {

			this.setState({initial: false});
			let action;

			if (this.state.auth.isLoggedIn) {
				action = NavigationActions.reset({
					index: 0,
					actions: [NavigationActions.navigate({routeName: 'Tabs'})],
					key: null
				});
			} else {
				action = NavigationActions.reset({
					index: 0,
					actions: [NavigationActions.navigate({routeName: 'Login'})],
					key: null
				});
			}

			this.state.navigator.dispatch(action);
		} else {
			setTimeout(this.handleAuth, 200);
		}
	};

	render() {
		return (
			<AppNavigator ref={nav => {
				if (this.state.initial) {
					this.setState({navigator: nav});
					this.handleAuth(this.state.auth);
				}
			}}/>
		);
	}
}


export default AppComponent = () => {
	return (
		<Provider store={store}>
			<PersistGate persistor={persistor}>
				<StyleProvider style={getTheme(platform)}>
					<AuthComponent store={store}/>
				</StyleProvider>
			</PersistGate>
		</Provider>
	);

};
