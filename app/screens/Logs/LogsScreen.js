import React, {Component} from 'react';
import {connect} from "react-redux";
import autobind from "autobind-decorator"
import {FlatList, Button, Text, StyleSheet} from "react-native";
import {Body, Container, ListItem} from "native-base";
import {HeaderRight, withNavigation} from 'react-navigation'

import PieChart from 'react-minimal-pie-chart';
import {Icon} from "react-native-vector-icons";
// import {ListView} from "@shoutem/ui/components/ListView";
// import {View} from "@shoutem/ui/components/View";
// import {Tile} from "@shoutem/ui/components/Tile";
// import {Subtitle, Title} from "@shoutem/ui/components/Text";
// import {Divider} from "@shoutem/ui/components/Divider";
import {Screen} from "@shoutem/ui/components/Screen";
import Ionicons from "react-native-vector-icons/Ionicons";
// import {Header} from "rea-na-ele";
// import {Row} from "@shoutem/ui/components/Row";
// import {NavigationBar} from "@shoutem/ui/navigation/NavigationBar";


@connect((state) => {
	return {
		logs: state.logs,
	};
})
@withNavigation
export default class LogsScreen extends Component<{}> {


	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;

		return {
			title: "Logs",
			headerRight:  (<Button title = "Add log" onPress = { () => {navigation.navigate('AddLog')} } ></Button>),
			tabBarIcon: ({ tintColor, focused }) => (
				<Ionicons
					name={focused ? 'ios-clipboard' : 'ios-clipboard-outline'}
					size={26}
					style={{ color: tintColor }}
				/>
			),
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
			<Container style={styles.container}>
				{/*<Body>*/}
				<FlatList
					data={logs}
					renderItem={this.renderItem}
					keyExtractor={item => item.id}

					// refreshing={this.state.refreshing}
					// onRefreach={this.getLogs}
				>
				</FlatList>
				{/*</Body>*/}
			</Container>
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
			<ListItem button onPress={() => {this.itemPressed(item)}} style={styles.listItem}>
				<Body>
					<Text style={styles.title}>{item.route.name}</Text>
					<Text>{item.route.difficulty.UIAA} / {item.route.difficulty.FRL}</Text>
				</Body>
			</ListItem>
		);
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

const styles = StyleSheet.create({
	listItem: {
		paddingLeft: 10
	},
	title: {
		fontSize: 16
	},

	container: {
		// backgroundColor: '#F5FCFF',
	} ,
});
