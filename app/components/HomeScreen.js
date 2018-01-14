import React, {Component} from 'react';
import {StatusBar, StyleSheet, Text, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {BleManager} from "react-native-ble-plx";
import {Device} from "react-native-ble-plx/src/Device";
import {UUID} from "../ble/UUID";
import SQLite from "react-native-sqlite-storage";
import {connect} from "react-redux";
import {Characteristic} from "react-native-ble-plx/src/Characteristic";

@connect((state) => {
	return {
		session: state.session,
	};
})
export default class HomeScreen extends Component {
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

		this.state = {
			...this.state,
			task: "Looking for GoTrack device...",
			baseUUID: "9036ca89-2ad3-46f0-a9c1-7b6811fe2bd",
			char: [
				acc = "",
				baro = "",
				gyro = "",
				mag = "",
			],
		};

		this.setupNotifications = this.setupNotifications.bind(this);
		this.scanAndConnect = this.scanAndConnect.bind(this);
	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.status}>{this.state.task}</Text>
				<Text style={styles.status}>Acelerometer: {this.state.char[0]}</Text>
				<Text style={styles.status}>Baro: {this.state.char[1]}</Text>
				<Text style={styles.status}>Gyro: {this.state.char[2]}</Text>
				<Text style={styles.status}>Magnetometer: {this.state.char[3]}</Text>
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
		this.bleManager.startDeviceScan(null,
			null, (error: ?Error, device: ?Device) => {
				if (!device || device.name !== "GoTrack - Prototype 1") {
					return;
				}

				this.bleManager.stopDeviceScan();
				this.state.task = "Device found!";

				device.connect()
					.then((device) => {
						console.log("Discovering services and characteristics");
						return device.discoverAllServicesAndCharacteristics();
					})
					.then((device) => {
						console.log("Setting notifications");

						console.log(device);
						// device.services().then((services) => {
						// 	for (const i in services) {
						// 		console.log(i);
						// 		services[i].characteristics().then((characteristics) => {
						// 				for (const y in characteristics) {
						// 					if (characteristics[y].isNotifiable) {
						// 						console.log("services===========");
						// 						device.monitorCharacteristicForService(characteristics[y].serviceUUID, characteristics[y].uuid, (error: ?Error, characteristic: ?Characteristic) => {
						// 							console.log(error);
						// 							console.log(characteristic);
						// 						});
						// 					}
						// 				}
						// 			}
						// 		);
						// 	}
						// 	console.log(services);
						// 	device.isConnected().then((bol) => {
						// 		console.log(bol);
						// 	});
						// });


						return this.setupNotifications(device)
					})
					.then(() => {
						console.log("Listening...");
					}, (error) => {
						console.log("Listening " + error);
					});

				device.onDisconnected((error, device) => {
					console.log("disconected");
					this.scanAndConnect();
				});

			});
	}

	async setupNotifications(device: Device) {
		const time = Number(new Date());

		const dateTime = Date.now();
		const timestamp = Math.floor(dateTime / 1000);

		console.log(time);
		console.log(timestamp);
		console.log(btoa(timestamp));

		await device.writeCharacteristicWithResponseForService("9036ca89-2ad3-46f0-a9c1-7b6811fe2fd0", "9036ca89-2ad3-46f0-a9c1-7b6811fe2fd2", btoa(timestamp));
		// const char = await device.readCharacteristicForService("9036ca89-2ad3-46f0-a9c1-7b6811fe2bd0", "9036ca89-2ad3-46f0-a9c1-7b6811fe2bd5");
		console.log(this.state.baseUUID + "5");

		const service = this.state.baseUUID + "0";
		const monitor = device.monitorCharacteristicForService(service, this.state.baseUUID + "5", async (error: ?Error, characteristic: ?Characteristic) => {
			console.log(error);
			console.log(characteristic);
			for (const i in this.state.char) {
				const uiidSufix = 1 + parseInt(i, 10);
				console.log(uiidSufix);
				console.log(i);
				await device.readCharacteristicForService(service, this.state.baseUUID + uiidSufix).then((char: Characteristic) => {
					// this.state.char[i] = atob(char.value);
					var state = this.state.char;
					state[i] = atob(char.value);
					this.setState({...this.state, char: state});
					console.log(this.state.char);
				}).catch((error) => {
					console.log(error);
				});
				// device.
				// device.readCharacteristicForService("9036ca89-2ad3-46f0-a9c1-7b6811fe2bd0", "9036ca89-2ad3-46f0-a9c1-7b6811fe2bd5").then((Characteristic) => {
				// 	console.log(characteristic);
				// });
			}
		});

	}
}

// const mapStateToProps = (state) => {
// 	return {
// 		navigationState: state.Home
// 	}
// };

// export default connect(mapStateToProps)(HomeScreen)

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
