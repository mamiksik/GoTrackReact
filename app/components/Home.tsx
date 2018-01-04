import * as React from "react";
import {Component} from "react";

import {BleManager} from "react-native-ble-plx";

import {Platform, StatusBar, StyleSheet, Text, View} from "react-native";
import {NavigationScreenOptions} from "react-navigation";

export class Home extends Component<{}>
{

	static navigationOptions: NavigationScreenOptions = {
		title: 'Home',
	};

	private bleManager: BleManager;

	constructor(props: object){
		super(props);
		this.bleManager = new BleManager();
	}

	render()
	{
		return (
			<View>
				<StatusBar
					backgroundColor="blue"
					barStyle="light-content"
				/>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10,
	},
	instructions: {
		textAlign: 'center',
		color: '#333333',
		marginBottom: 5,
	},
});
