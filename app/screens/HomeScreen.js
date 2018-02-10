import React, {Component} from 'react';
import {StyleSheet, View} from "react-native";
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

import {Container, Header, Content, Text, Button, Body} from 'native-base';
// import Container, Header, Content, Button, Text from 'native-base';

// import { Button } from 'native-base';

import Animation from 'lottie-react-native';
// import anim from './../assets/loading.json';
// import anim from './../assets/loader_animation.json';

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
		bus: "9036ca89-2ad3-46f0-a9c1-7b6811fe2bd6",
	}
};

@connect((state) => {
	return {
		session: state.session,
	};
})
export default class HomeScreen extends Component {
	static navigationOptions = {
		title: 'Home',
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

			isReady: false,
			isSyncing: false,
			logNumber: "",
		};

	}

	render() {

		let state = null;
		let button = null;

		if (!this.state.isSyncing) {

			if (this.state.device == null) {
				state = "Searching for GoTrack";
			} else if (this.state.device.isConnected) {
				state = "Now you can sync device";
			}

			if (this.state.isReady){
				button = <Button block onPress={this.sync}><Text>Sync</Text></Button>
			}

		} else {
			state = "Syncing! " + this.state.logNumber;
		}



		return (
			<Container>
				<Header title="Home"></Header>
				<Body>
					<Text>{state}</Text>
					{button}
					<Button block onPress={this.upload}><Text>Upload</Text></Button>

					<Text>{this.props.session.latestSession}</Text>
				</Body>
			</Container>
		);
	}

	componentDidMount() {
		const subscription = this.bleManager.onStateChange((state) => {
			if (state === 'PoweredOn') {
				this.scanAndConnect();
				subscription.remove();
			}
		}, true);
	}

	@autobind
	upload() {
		console.log(this.props.session);

		this.props.dispatch({type: 'POST_SESSIONS'});
	}

	@autobind
	async sync() {
		console.log(this.state.device);

		if (this.state.device) {
			this.setState({isSyncing: true});

			const dateTime = Date.now();
			const timestamp = Math.floor(dateTime / 1000);

			// await device.writeCharacteristicWithResponseForService(UUID.client.uuid, UUID.client.timestamp, btoa(timestamp));

			let device: Device = this.state.device;
			const latested = btoa(this.props.session.latestSession);
			await device.writeCharacteristicWithResponseForService(UUID.client.uuid, UUID.client.sync, latested);

			let sub = device.monitorCharacteristicForService(UUID.sensors.uuid, UUID.sensors.info, (error: ?Error, characteristic: ?Characteristic) => {
				// console.log(atob(characteristic.value));

				if (atob(characteristic.value) === "==TRANSMISSION_END==") {
					sub.remove();
					sub = null;
					console.log("Synced!");
					return;
				}

				let info = atob(characteristic.value).split(",");
				const sessionId = info[0];

				let acc = device.readCharacteristicForService(UUID.sensors.uuid, UUID.sensors.acc);
				let baro = device.readCharacteristicForService(UUID.sensors.uuid, UUID.sensors.baro);
				let gyro = device.readCharacteristicForService(UUID.sensors.uuid, UUID.sensors.gyro);
				let mag = device.readCharacteristicForService(UUID.sensors.uuid, UUID.sensors.mag);

				let promise = this.state.device.writeCharacteristicWithResponseForService(UUID.sensors.uuid, UUID.sensors.bus, btoa("next"));

				// this.state.device.writeCharacteristicWithoutResponseForService("9036ca89-2ad3-46f0-a9c1-7b6811fe2bd0", "9036ca89-2ad3-46f0-a9c1-7b6811fe2bd5", btoa("next")).then((device2) => {
				// 	console.log(device2);
				// }).catch((e) => {
				// 	console.log(e);
				// });

				Promise.all([acc, baro, gyro, mag, promise]).then((promises) => {
					if (promises[0].value === null) {
						return;
					}

					let acc = atob(promises[0].value).split(",");
					let baro = atob(promises[1].value).split(",");
					let gyro = atob(promises[2].value).split(",");
					let mag = atob(promises[3].value).split(",");

					if (acc[2] == null) {
						console.error(promises);
					}

					const data = {
						// ....data,
						accelerometerX: acc[0],
						accelerometerY: acc[1],
						accelerometerZ: acc[2],
						// accelerometerO: acc[2],

						gyroscopeX: gyro[0],
						gyroscopeY: gyro[1],
						gyroscopeZ: gyro[2],

						magnetometerX: mag[0],
						magnetometerY: mag[1],
						magnetometerZ: mag[2],


						pressure: baro[0],
						temperature: baro[1],

						timestamp: info[1],
					};



					// console.log(session);


					this.setState({logNumber: sessionId});
					this.props.dispatch({type: 'ADD_SESSION', data: data, sessionId: sessionId});

				}).catch((error) => {
					// this.setState({isSyncing: false});
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
						console.log("Discovering services and characteristics");

						this.setState({device: device});
						return device.discoverAllServicesAndCharacteristics();
					})
					.then((device) => {
						console.log("Setting notifications");
						return this.initialSync()
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
	async initialSync() {
		//Update device time
		const timestamp = Math.floor(Date.now() / 1000);
		// await this.state.device.writeCharacteristicWithResponseForService("9036ca89-2ad3-46f0-a9c1-7b6811fe2fd0", "9036ca89-2ad3-46f0-a9c1-7b6811fe2fd2", btoa(timestamp));
		await this.state.device.writeCharacteristicWithResponseForService(UUID.client.uuid, UUID.client.timestamp, btoa(timestamp));


		//Moved
		// // console.log(s)
		// const latested = this.props.session.latestSession;
		// console.log(latested);
		// // await this.state.device.writeCharacteristicWithResponseForService(UUID.CLIENT.CLIENT_SERVICE_UUID, UUID.CLIENT.CLIENT_TIMESTAMP_UUID, btoa(latested));
		// await this.state.device.writeCharacteristicWithResponseForService("9036ca89-2ad3-46f0-a9c1-7b6811fe2fd0", "9036ca89-2ad3-46f0-a9c1-7b6811fe2fd1", btoa(latested));

		this.setState({isReady: true});
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	}
});
