import React, {Component} from 'react';
import {connect} from "react-redux";
import autobind from "autobind-decorator"
import {FlatList, Button, Text} from "react-native";
import {Body, ListItem} from "native-base";
import {HeaderRight, withNavigation} from 'react-navigation'

import PieChart from 'react-minimal-pie-chart';
import {Icon} from "react-native-vector-icons";
// import {ListView} from "@shoutem/ui/components/ListView";
// import {View} from "@shoutem/ui/components/View";
// import {Tile} from "@shoutem/ui/components/Tile";
// import {Subtitle, Title} from "@shoutem/ui/components/Text";
// import {Divider} from "@shoutem/ui/components/Divider";
import {Screen} from "@shoutem/ui/components/Screen";
// import {Header} from "rea-na-ele";
// import {Row} from "@shoutem/ui/components/Row";
// import {NavigationBar} from "@shoutem/ui/navigation/NavigationBar";


@connect((state) => {
	return {
		logs: state.logs,
	};
})
@withNavigation
export default class LogsScreen extends Component {


	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;

		return {
			title: "Logs",
			headerRight:  (<Button title = "AddLog" onPress = { () => {alert("asd")} } ></Button>)
		}
	};

	constructor(props) {
		super(props);
		// console.log(props);
		// console.log(this.props.logs.logs);
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
			<Screen>
				{/*{this.props.logs}*/}
				<FlatList
					data={logs}
					renderItem={this.renderItem}
					keyExtractor={item => item.id}

					refreshing={this.state.refreshing}
					onRefreach={this.getLogs}
				>
				</FlatList>
				{/*<ListView*/}
					{/*data={logs}*/}
					{/*renderRow={this.renderItem}*/}
				{/*/>*/}
			</Screen>
		);
	}

	componentWillMount() {
		// this.state.logs = this.props.dispatch({type: 'GET_LOGS_FLAT'})
	}

	@autobind
	getLogs() {
		this.state.logs = this.props.dispatch({type: 'GET_LOGS_FLAT'})
	}

	@autobind
	renderItem(row) {
		// console.log(row);
		const item = row.item;
		// const item = row;

		return (
			<ListItem button onPress={() => {this.itemPressed(item.route)}} style={{marginLeft: 0}} >
				<Body>
				<Text>{item.route.name}</Text>
				<Text>{item.route.difficulty.UIAA} / {item.route.difficulty.FRL}</Text>
				</Body>
			</ListItem>
		);

		// return (
		// 	<Row>
		// 	<View>
		// 			<Tile>
		// 				<Title styleName="md-gutter-bottom">{item.route.name}</Title>
		// 				<Subtitle styleName="sm-gutter-horizontal">{item.route.difficulty.UIAA} / {item.route.difficulty.FRL}</Subtitle>
		// 			</Tile>
		// 		{/*<Divider styleName="line" />*/}
		// 	</View>
		// 	</Row>
		// );
	}

	@autobind
	itemPressed(item){
		console.log('NavigateEdit');
		this.props.navigation.navigate(
			'EditLog',
			{
				log: item
			}
		);
	}
}
