import React, {Component} from 'react';
import {StatusBar, StyleSheet, Text, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {BleManager} from "react-native-ble-plx";
import {Device} from "react-native-ble-plx/src/Device";
import {UUID} from "../ble/UUID";
import SQLite from "react-native-sqlite-storage";

export default class Home extends Component<{}> {
	static navigationOptions = {
		tabBarLabel: 'Home',
		title: 'Home',
		tabBarIcon: ({tintColor, focused}) => (
			<Ionicons
				name={focused ? 'ios-home' : 'ios-home-outline'}
				size={26}
				style={{color: tintColor}}
			/>
		),
	};

	constructor(props) {
		super(props);
		this.bleManager = new BleManager();
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.status}>Looking for GoTrack device...</Text>
			</View>
		);
	}

	componentWillMount() {
		const subscription = this.bleManager.onStateChange((state) => {
			if (state === 'PoweredOn') {
				this.scanAndConnect();
				subscription.remove();
			}
		}, true);
	}

	scanAndConnect() {
		this.manager.startDeviceScan(null,
			null, (error: ?Error, device: ?Device) => {
				if (device.name !== "GoTrack - Prototype 1") {
					return;
				}

				this.manager.stopDeviceScan();

				device.connect()
					.then((device) => {
						console.log("Discovering services and characteristics");
						return device.discoverAllServicesAndCharacteristics();
					})
					.then((device) => {
						console.log("Setting notifications");
						return this.setupNotifications(device);
					})
					.then(() => {
						console.log("Listening...");
					}, (error) => {
						console.log("Listening " + error);
					});

				device.onDisconnected((error, device) => {
					this.scanAndConnect();
				});

			});
	}

	async setupNotifications(device: Device) {
		const char = await device.readCharacteristicForService(UUID.CLIENT_SERVICE, UUID.CLIENT_HANDSHAKE);

		if (atob(char.value) !== "GoTrack") {
			return;
		}

		const lastSessionId: string = "";

		await device.writeCharacteristicWithResponseForService(UUID.CLIENT_SERVICE, UUID.CLIENT_LAST_SESSION, btoa(lastSessionId));



	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#F5FCFF',
	},
	status: {
		fontSize: 16,
		textAlign: 'center',
		margin: 10,
	},
});
