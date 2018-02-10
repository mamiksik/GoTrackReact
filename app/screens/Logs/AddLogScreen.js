import React, {Component} from 'react';
import {connect} from "react-redux";
import autobind from "autobind-decorator"
import {FlatList, Button, Text} from "react-native";
import {Body, ListItem, View} from "native-base";
import {HeaderRight} from 'react-navigation'

import PieChart from 'react-minimal-pie-chart';
import {Icon} from "react-native-vector-icons";


@connect((state) => {
	return {
		logs: state.logs,
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
		}
	}

	render() {
		const logs = [];

		for (let k in this.props.logs.logs) {
			logs.push(this.props.logs.logs[k]);
		}

		return (
			<View>
				<Text>Add</Text>
			</View>
		);
	}

}
