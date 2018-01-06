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

const instructions = Platform.select({
	ios: 'Press Cmd+R to reload,\n' +
	'Cmd+D or shake for dev menu',
	android: 'Double tap R on your keyboard to reload,\n' +
	'Shake or press menu button for dev menu',
});

export default class Settings extends Component<{}> {

	static navigationOptions = {
		tabBarLabel: 'Settings',
		tabBarIcon: ({ tintColor, focused }) => (
			<Ionicons
				name={focused ? 'ios-settings' : 'ios-settings-outline'}
				size={26}
				style={{ color: tintColor }}
			/>
		),
	};

	constructor(props) {
		super(props);
		this.manager = new BleManager();
		this.state = {info: "", values: {}};
		// this.prefixUUID = "f000aa";
		// this.suffixUUID = "-0451-4000-b000-000000000000";

		this.sensors = {
			"Gyroscope": "9036ca89-2ad3-46f0-a9c1-7b6811fe2bd9",
			// "Accelerometer": "9036ca89-2ad3-46f0-a9c1-7b6811fe2bd8",
			// "Barometer": "9038ca89-2ad3-46f0-a9c3-7b6811fe2bd9",
			// "Magnetometer": "9038ca89-2ad3-46f0-a9c1-7b6811fe2bd9",
		};

		this.char = {
			"Gyroscope": "cc29118a-2988-4c55-9f51-60c2f5110a71",
			// "Accelerometer": "cc29118a-2988-4c55-9f51-60c2f5110a77",
			// "Barometer": "ac29118a-2988-4c45-9f51-60c2f5110a71",
			// "Magnetometer": "ac29118a-2988-4c55-9f51-60c2f5110a71",
		};

		this.notify = {
			"Gyroscope": "cc29118a-2988-4c55-9f51-60c2f511df72",
		};

		this.devices = []


	}

	render() {
		return (
			<View style={styles.container}>
				<Text style={styles.welcome}>
					GoTrack
				</Text>
				<Text style={styles.instructions}>
					To get started, edit App.js sad
				</Text>
				<Text style={styles.instructions}>
					{instructions}
				</Text>

				{/*<Text>{this.state.info}</Text>*/}
				{Object.keys(this.sensors).map((key) => {
					return <Text key={key}>
						{key + ": " + (this.state.values[this.char[key]] || "-")}
					</Text>
				})}
			</View>
		);
	}

	scanAndConnect() {
		this.manager.startDeviceScan(null,
			null, (error: ?Error, scannedDevice: ?Device) => {


				if (!this.devices.includes(scannedDevice.id)) {
					// console.log(error);
					this.devices.push(scannedDevice.id);
					console.log(scannedDevice.name);
					// console.log(scannedDevice);
				}


				if (scannedDevice.name === "GoTrack - Prototype 1") {
					console.log("connect");
					this.manager.stopDeviceScan();


					scannedDevice.connect()
						.then((scannedDevice) => {
							console.log("Discovering services and characteristics");
							return scannedDevice.discoverAllServicesAndCharacteristics();
						})
						.then((scannedDevice) => {
							console.log("Setting notifications");
							return this.setupNotifications(scannedDevice).bind(this);
						})
						.then(() => {
							console.log("Listening...");
						}, (error) => {
							console.log("Listening " + error);
						});
				}
			}
		);
	}

	async setupNotifications(device: Device) {
		device.services().then((services: Service[]) => {
			// console.log("Services:");
			// console.log(services);

			for (const id: number in services) {
				services[id].characteristics().then((chars: [Characteristic]) => {
					for (const idCh: number in chars) {
						// console.log(chars[idCh]);
						chars[idCh].monitor((error, charValue) => {

							// console.log(error);
							// console.log(charValue);
							// this.updateValue(charValue.uuid, charValue.value);
						});


						// chars[idCh].read().then((char) => {
						// 	// console.log(char);
						// 	// this.updateValue(char.uuid, atob(char.value));
						// 	// console.log(atob(char.value));
						// });
						// console.log(chars[idCh].value);
					}
				});
			}
		});

		for (const id in this.sensors) {
			// const service = this.serviceUUID(id);
			const service = this.sensors[id];
			const characteristicW = this.notify[id];
			const characteristicN = this.char[id];
			console.log(service + "(" + id + "+) : " + characteristicN);

			// const characteristic = await device.writeCharacteristicWithResponseForService(
			// 	service, characteristicW, "AQ==" /* 0x01 in hex */
			// );


			setTimeout(() => {
				const subs = device.monitorCharacteristicForService(service, characteristicN, (error, characteristic) => {
					if (error) {
						console.log('MONITOR');
						console.log(error);
						return;
					}
					this.updateValue(characteristic.uuid, atob(characteristic.value));
				});
			}, 500);
		}
	}

	updateValue(key, value) {
		// console.log(key + ": " + value);
		this.setState({values: {...this.state.values, [key]: value}})
	}

	componentWillMount() {
		const subscription = this.manager.onStateChange((state) => {
			if (state === 'PoweredOn') {
				this.scanAndConnect();
				subscription.remove();
			}
		}, true);
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
