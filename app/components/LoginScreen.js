import React from 'react'
import {Component} from 'react'
import {Button, Text, View, WebView} from 'react-native';
import {Linking} from "react-native";
import {connect} from "react-redux";

@connect((state) => {
	return {
		auth: state.auth,
	};
})
export default class LoginScreen extends Component {

	constructor(props){
		super(props);
		console.log(props);
		console.log(this.props);
		console.log(this.state);
		this.login.bind(this);
	}

	static navigationOptions = {
		tabBarLabel: 'Login',
		title: 'Login',
	};

	render() {
		return (
				<WebView onLoadEnd={() => {
					this.login()
				}}
					source={{uri: this.props.auth.authUrl}}
				/>

		);
	};

	login() {
		this.props.dispatch({type: 'GET_REST_TOKEN'});
	}
}
