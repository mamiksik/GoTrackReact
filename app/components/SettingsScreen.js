import React, {Component} from 'react';

import {
	Platform,
	StyleSheet,
	Text,
	View
} from 'react-native';

import {BleManager} from 'react-native-ble-plx'
import {Device} from "react-native-ble-plx/src/Device";
import {Service} from "react-native-ble-plx/src/Service";
import {Characteristic} from "react-native-ble-plx/src/Characteristic";
import Ionicons from "react-native-vector-icons/Ionicons";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";

@connect((state) => {
	return {
		logs: state.logs,
		auth: state.auth,
	};
})
@withNavigation
export default class SettingsScreen extends Component {

	constructor(props){
		super(props);
		console.log(props);
		this.props.dispatch({type: 'GET_LOGS'});
	}

	static navigationOptions = {
		tabBarLabel: 'SettingsScreen',
		tabBarIcon: ({ tintColor, focused }) => (
			<Ionicons
				name={focused ? 'ios-settings' : 'ios-settings-outline'}
				size={26}
				style={{ color: tintColor }}
			/>
		),
	};

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					GoTrack
				</Text>
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
