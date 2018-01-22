import React, {Component} from 'react';
import {Button, StyleSheet, Text, View} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import {BleManager} from "react-native-ble-plx";
import {Device} from "react-native-ble-plx/src/Device";
// import {UUID} from "../ble/UUID";
import SQLite from "react-native-sqlite-storage";
import {connect} from "react-redux";
import {Characteristic} from "react-native-ble-plx/src/Characteristic";
import autobind from "autobind-decorator"
import type {Session, TrackData} from "../reducers/SessionReducer";
import type {Base64} from "react-native-ble-plx/src/TypeDefinition";


const UUID = {
	client: {
		uuid: "9036ca89-2ad3-46f0-a9c1-7b6811fe2fd0",
		sync: "9036ca89-2ad3-46f0-a9c1-7b6811fe2fd1",
		timestamp: "9036ca89-2ad3-46f0-a9c1-7b6811fe2fd2",
	},
	sensors: {
		uuid: "9036ca89-2ad3-46f0-a9c1-7b6811fe2bd0",
		acc: "9036ca89-2ad3-46f0-a9c1-7b6811fe2bd1",
		baro: "9036ca89-2ad3-46f0-a9c1-7b6811fe2bd2",
		gyro: "9036ca89-2ad3-46f0-a9c1-7b6811fe2bd3",
		mag: "9036ca89-2ad3-46f0-a9c1-7b6811fe2bd4",
		info: "9036ca89-2ad3-46f0-a9c1-7b6811fe2bd5",
	}
};

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
		console.log(atob("IDgsMTc="));
		console.log(atob(atob("SURFMkxERTI=")));

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
			device: null,
		};

	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.status}>{this.state.task}</Text>
				<Text style={styles.status}>Acelerometer: {this.state.char[0]}</Text>
				<Text style={styles.status}>Baro: {this.state.char[1]}</Text>
				<Text style={styles.status}>Gyro: {this.state.char[2]}</Text>
				<Text style={styles.status}>Magnetometer: {this.state.char[3]}</Text>

				<Button onPress={this.sync} title="Sync">Sync</Button>
				<Button onPress={this.upload} title="Upload">Sync</Button>
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

	@autobind
	upload() {
		this.state.dispatch({type: 'POST_SESSIONS'});
	}

	@autobind
	async sync() {
		console.log(this.state.device);
		if (this.state.device) {
			const dateTime = Date.now();
			const timestamp = Math.floor(dateTime / 1000);

			let device: Device = this.state.device;

			await device.writeCharacteristicWithResponseForService(UUID.client.uuid, UUID.client.timestamp, btoa(timestamp));

			// Get latest synced session id
			// const max = Math.max.apply(Math, this.state.session.map(function (o) {
			// 	return o.key;
			// }));

			let max: Base64 = btoa("-1");

			await device.writeCharacteristicWithResponseForService(UUID.client.uuid, UUID.client.sync, max);

			const monitor = device.monitorCharacteristicForService(UUID.sensors.uuid, UUID.sensors.info, (error: ?Error, characteristic: ?Characteristic) => {
				// console.log(error);
				console.log(characteristic);
				console.log(atob(characteristic.value));
				// console.log(atob(characteristic.value));

				if (characteristic.value === "") {
					monitor.unsubscribe();
					console.log("Synced!");
					return;
				}

				let info = atob(characteristic.value).split(",");

				// let trackerData: TrackData = {
				// 	key: info[0],
				// 	time: info[1]
				//
				// };

				// let session: Session = {
				// 	sessionId: info[0],
				// data: {
				// timestamp: info[1]
				// },
				// };
				const sessionId = info[0];

				let acc = device.readCharacteristicForService(UUID.sensors.uuid, UUID.sensors.acc);
				let baro = device.readCharacteristicForService(UUID.sensors.uuid, UUID.sensors.baro);
				let gyro = device.readCharacteristicForService(UUID.sensors.uuid, UUID.sensors.gyro);
				let mag = device.readCharacteristicForService(UUID.sensors.uuid, UUID.sensors.mag);

				Promise.all([acc, baro, gyro, mag]).then((characteristics) => {
					if (characteristics[0].value === null) {
						return;
					}

					let acc = atob(characteristics[0].value).split(",");
					let baro = atob(characteristics[1].value).split(",");
					let gyro = atob(characteristics[2].value).split(",");
					let mag = atob(characteristics[3].value).split(",");

					//Parse regex
					// trackerData = {
					// 	...trackerData,
					// 	acc: {
					// 		x: acc[0],
					// 		y: acc[1],
					// 		z: acc[2],
					// 	},
					// 	pressure: baro[0],
					// 	temperature: baro[1],
					// 	gyro: {
					// 		x: gyro[0],
					// 		y: gyro[1],
					// 		z: gyro[2],
					// 	},
					// 	mag: {
					// 		x: mag[0],
					// 		y: mag[1],
					// 		z: mag[2],
					// 	},
					// };

					const data = {
						// ....data,
						accelerometerX: acc[0],
						accelerometerY: acc[1],
						accelerometerZ: acc[2],

						gyroscopeX: gyro[0],
						gyroscopeY: gyro[1],
						gyroscopeZ: gyro[2],

						magnetometerX: mag[0],
						magnetometerY: mag[1],
						magnetometerZ: mag[2],


						pressure: baro[0],
						timestamp: baro[1],
					};

					// console.log(session);

					this.props.dispatch({type: 'ADD_SESSION', data: data, sessionId: sessionId});

				}).catch((error) => {
					console.log(error);
				});
			});

		}
	}

	@autobind
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
						this.state.device = device;

						console.log("Discovering services and characteristics");
						return device.discoverAllServicesAndCharacteristics();
					})
					.then((device) => {
						console.log("Setting notifications");
						console.log(device);

						return this.setupInteractiveMode(device)
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

	@autobind
	async setupInteractiveMode(device: Device) {
		const time = Number(new Date());

		const dateTime = Date.now();
		const timestamp = Math.floor(dateTime / 1000);

		console.log(time);
		console.log(timestamp);
		console.log(btoa(timestamp));

		await device.writeCharacteristicWithResponseForService("9036ca89-2ad3-46f0-a9c1-7b6811fe2fd0", "9036ca89-2ad3-46f0-a9c1-7b6811fe2fd2", btoa(timestamp));
		// const char = await device.readCharacteristicForService("9036ca89-2ad3-46f0-a9c1-7b6811fe2bd0", "9036ca89-2ad3-46f0-a9c1-7b6811fe2bd5");
		console.log(this.state.baseUUID + "5");

		// const service = this.state.baseUUID + "0";
		// const monitor = device.monitorCharacteristicForService(service, this.state.baseUUID + "5", async (error: ?Error, characteristic: ?Characteristic) => {
		// 	console.log(error);
		// 	console.log(characteristic);
		// 	for (const i in this.state.char) {
		// 		const uiidSufix = 1 + parseInt(i, 10);
		// 		console.log(uiidSufix);
		// 		console.log(i);
		// 		await device.readCharacteristicForService(service, this.state.baseUUID + uiidSufix).then((char: Characteristic) => {
		// 			// this.state.char[i] = atob(char.value);
		// 			var state = this.state.char;
		// 			state[i] = atob(char.value);
		// 			this.setState({...this.state, char: state});
		// 			console.log(this.state.char);
		// 		}).catch((error) => {
		// 			console.log(error);
		// 		});
		// 		// device.
		// 		// device.readCharacteristicForService("9036ca89-2ad3-46f0-a9c1-7b6811fe2bd0", "9036ca89-2ad3-46f0-a9c1-7b6811fe2bd5").then((Characteristic) => {
		// 		// 	console.log(characteristic);
		// 		// });
		// 	}
		// });

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
