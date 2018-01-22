import React from 'react'
import {Component} from 'react'
import {Button, Text, View, WebView} from 'react-native';
import {Linking} from "react-native";
import {connect} from "react-redux";
import CookieManager from "react-native-cookies";
import autobind from "autobind-decorator"

@connect((state) => {
	return {
		auth: state.auth,
	};
})
export default class LoginScreen extends Component {

	constructor(props) {
		super(props);
		console.log(props);
		console.log(this.props);
		console.log(this.state);
		this.login.bind(this);

		CookieManager.clearAll()
			.then((res) => {
				console.log('CookieManager.clearAll =>', res);
			});
	}

	static navigationOptions = {
		tabBarLabel: 'Login',
		title: 'Login',
	};


	render() {
		return (
			<WebView
				ref={'webview'}
				javaScriptEnabled={true}
				onNavigationStateChange={this.login}
				startInLoadingState={true}
				scalesPageToFit={true}
				source={{uri: this.props.auth.authURL}}
			/>


		);
	};

	@autobind
	login(webViewState) {
		console.log(webViewState);
		if (!webViewState) {
			return;
		}
		const url = webViewState.url;

		let urlParams = {};
		url.replace(
			new RegExp("([^?=&]+)(=([^&]*))?", "g"),
			function ($0, $1, $2, $3) {
				urlParams[$1] = $3;
			}
		);

		if (urlParams.loginToken) {
			this.props.dispatch({type: 'SET_LOGIN_TOKEN', data: urlParams.loginToken});
			this.props.dispatch({type: 'GET_REST_TOKEN'});
		}
	}
}
