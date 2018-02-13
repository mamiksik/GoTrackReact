import React, {Component} from 'react';
import {connect} from "react-redux";
import {Text, Body, Container, Content, H1, H2, Header, ListItem, H3} from "native-base";
import {withNavigation} from 'react-navigation'

import {Icon} from "react-native-vector-icons";
// import {Body, Container, H1, H2, Text} from "native-base";
import {StyleSheet, View} from "react-native";
// import {Moment} from "react-moment";
import Moment from 'react-moment';

@connect((state) => {
	return {
		logs: state.logs,
	};
})
@withNavigation
export default class EditLogScreen extends Component {


	static navigationOptions = ({navigation}) => {
		const {params = {}} = navigation.state;

		return {title: "Detail",}
	};

	constructor(props) {
		super(props);
		this.state = {
			...this.state,
			log: this.props.navigation.state.params.log
		};
	}

	componentWillMount() {
		if (this.props.navigation.state.params.log === undefined) {
			this.props.navigation.goBack();
		}
	}

	render() {
		console.log(this.state.log);
		const dateToFormat = '1976-04-19T12:59-0500';
		return (
			<Container style={styles.container}>
				<Content>
					    <Body style={styles.body}>
				<H1 style={styles.spaceBig}>Log information</H1>

				<H3 style={styles.spaceSmall}>Name:</H3>
				<Text>{this.state.log.route.name}</Text>

				<H3 style={styles.spaceSmall}>Added on:</H3>
				<Moment element={Text} format="YYYY/MM/DD" >{this.state.log.addedDate}</Moment>

				<H1 style={styles.spaceBig}>Route information</H1>
				<View style={{
					flex: 1,
					flexDirection: 'row',
					justifyContent: 'center',
					alignItems: 'center',
				}}>
					<View style={{backgroundColor: this.state.log.route.colors[0], height: 20, width: 20}} ></View>
					<View style={{backgroundColor: this.state.log.route.colors[1], height: 20, width: 20, marginLeft: 10}} ></View>
					<View style={{backgroundColor: this.state.log.route.colors[2], height: 20, width: 20, marginLeft: 10}} ></View>
				</View>
				<H3 style={styles.spaceSmall} >Name:</H3>
				<Text>{this.state.log.route.name}</Text>
				<Text>{this.state.log.route.description}</Text>

				<H3 style={styles.spaceSmall} >Difficulty:</H3>
				<Text>UIAA:{this.state.log.route.difficulty.UIAA}</Text>
				<Text>FRL:{this.state.log.route.difficulty.FRL}</Text>

				<H3 style={styles.spaceSmall}>Wall:</H3>
				<Text>{this.state.log.wall.name}</Text>
					    </Body>
				</Content>
			</Container>
		);
	}
}

const styles = StyleSheet.create({
	listItem: {
		paddingLeft: 10
	},

	spaceBig: {
		paddingTop: 20
	},

	spaceSmall: {
		paddingTop: 10
	},

	container: {
		marginTop: 20,
		// textAlign: 'left',
		// backgroundColor: '#F5FCFF',
	},

	body: {
		// textAlign: 'left'
		marginLeft: -40,
		alignItems: 'flex-start'
	},
	box: {
		height: 5,
		width: 5,
	}


});

