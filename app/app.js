import HomeScreen from "./components/homeScreen";
import {StackNavigator, TabNavigator} from "react-navigation";
import Settings from "./components/settingsScreen";

import React from "react";
import {Component} from "react";
import AuthProvider from "./providers/authProvider";


const Home = StackNavigator({
	Home: {screen: HomeScreen},
});

const Navigation = TabNavigator({
	Home: {screen: Home},
	Setting: {screen: Settings},
});

export default class AppComponent extends Component<{}> {


	render() {
		return (
			<AuthProvider>
				<Navigation/>
			</AuthProvider>
		);
	}
}
