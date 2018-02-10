import React, {Component} from 'react';
import {connect} from "react-redux";
// import {Body, Container, Content, H1, Header, ListItem, View} from "native-base";
import { withNavigation} from 'react-navigation'

import {Icon} from "react-native-vector-icons";
import {Container} from "native-base";



@connect((state) => {
	return {
		logs: state.logs,
	};
})
@withNavigation
export default class EditLogScreen extends Component {


	static navigationOptions = ({ navigation }) => {
		const { params = {} } = navigation.state;

		return {title: "View",}
	};

	constructor(props) {
		super(props);
		this.state = {
			...this.state,
			log: this.props.navigation.state.params.log
		};
	}

	componentWillMount(){
		if (this.props.navigation.state.params.log === undefined) {
			this.props.navigation.goBack();
		}
	}

	render() {
		return (
			<Container>

				<h1>{this.state.log.route}</h1>
			</Container>
		);
	}
}
