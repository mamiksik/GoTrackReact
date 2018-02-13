import React, {Component} from 'react';

import {
	Platform,
	StyleSheet,
	Text, Touchable, TouchableOpacity,
	View
} from 'react-native';

import {BleManager} from 'react-native-ble-plx'
import {Device} from "react-native-ble-plx/src/Device";
import {Service} from "react-native-ble-plx/src/Service";
import {Characteristic} from "react-native-ble-plx/src/Characteristic";
import Ionicons from "react-native-vector-icons/Ionicons";
import {withNavigation} from "react-navigation";
import {connect} from "react-redux";
import {Body, Container, Content, Header, Icon, Left, List, ListItem, Right, Switch} from "native-base";

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
		this.state = {
			...this.state,
			autoSync: false
		};

		// this.logOut.bind(this);
	}

	static navigationOptions = {
		tabBarLabel: 'Settings',
		title: 'Settings',
		tabBarIcon: ({ tintColor, focused }) => (
			<Ionicons
				name={focused ? 'ios-settings' : 'ios-settings-outline'}
				size={26}
				style={{ color: tintColor }}
			/>
		),
	};

	// @autobind
	logOut = () => {
		// console.log(this.props);
		// console.log(this.props);
		this.props.dispatch({type: "LOG_OUT_USER"});
	};

	render() {
			{/*<View style={styles.container}>*/}
				{/*<Text style={styles.welcome}>*/}
					{/*GoTrack*/}
				{/*</Text>*/}
			{/*</View>*/}
		return (
			<Container>
				<Header />
				<Content>
					<List>
						<ListItem icon>
							<Left>
								{/*<Icon name="plane" />*/}
								<Ionicons name="ios-cloud" size={26} />
							</Left>
							<Body>
							<Text>Auto sync</Text>
							</Body>
							<Right>
								<Switch onValueChange={ () => {
									this.setState({autoSync: !this.state.autoSync});
								}}
								        value={this.state.autoSync}
								/>
							</Right>
						</ListItem>
						<ListItem icon>
							<Left>
								{/*<Icon name="bluetooth" />*/}
								<Ionicons name="ios-person" size={26} />
							</Left>
							<Body>
							<TouchableOpacity onPress={this.logOut}>
								<Text>Log out</Text>
							</TouchableOpacity>
							</Body>
							<Right>
								{/*<Text>On</Text>*/}
								<Icon name="close" />
							</Right>
						</ListItem>
					</List>
				</Content>
			</Container>
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
