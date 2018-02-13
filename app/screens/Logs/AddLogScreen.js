import React, {Component} from 'react';
import {connect} from "react-redux";
import autobind from "autobind-decorator"
import {FlatList, Button, Text, NavigatorIOS, TouchableOpacity, StyleSheet} from "react-native";
import {Body, Container, Content, Header, ListItem, View} from "native-base";
import {HeaderRight} from 'react-navigation'

import PieChart from 'react-minimal-pie-chart';
import {Icon} from "react-native-vector-icons";
import {Field} from "redux-form";
import AddLogForm from "../../components/AddLogForm";
import QRCodeScanner from "react-native-qrcode-scanner";
import {Utils} from "../../Utils/Utils";

import * as axios from "axios";


@connect((state) => {
	return {
		logs: state.logs,
		auth: state.auth
	};
})
export default class AddLogScreen extends Component {


	static navigationOptions = ({navigation}) => {
		const {params = {}} = navigation.state;

		return {title: "Add",}
	};

	constructor(props) {
		super(props);
		// console.log(props);
		console.log(this.props.logs.logs);
		this.state = {
			...this.state,
			logs: {},
			refreshing: false,
			log: null,
			waiting: false,
		}
	}

	// @autobind
	onQrRead(qr) {
		this.setState({
			waiting: true
		});

		console.log(qr.data);

		// const URI = require('urijs');
		// const segments = URI(qr.data).segment();


		this.setState({
			log: {}, waiting: false
		});
		// axios.get(Utils.getUrl('/', this.state.store)).then(()=> {
		//
		// });
	}

	render() {
		const logs = [];

		/*<View>*/
		/*<Text>Add</Text>*/
		/*</View>*/

		let render = <AddLogForm log={this.state.log}/>;

		if (this.state.log === null) {
			render = <QRCodeScanner
				topContent={<Text>Scan route Qr code</Text>}
				onRead={this.onQrRead.bind(this)}
			/>
		}

		if (this.state.waiting) {
			render = <Text>Please wait...</Text>;
		}

		return (
			<Container>
				{render}
			</Container>
		);
	}


}


const styles = StyleSheet.create({
	centerText: {
		flex: 1,
		fontSize: 18,
		padding: 32,
		color: '#777',
	},

	textBold: {
		fontWeight: '500',
		color: '#000',
	},

	buttonText: {
		fontSize: 21,
		color: 'rgb(0,122,255)',
	},

	buttonTouchable: {
		padding: 16,
	},
});
