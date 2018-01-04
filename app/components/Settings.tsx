import * as React from "react";
import {Component} from "react";
import {Platform, StyleSheet, Text, View} from "react-native";
import {NavigationScreenOptions} from "react-navigation";


export class Settings extends Component<{}>
{
	static navigationOptions: NavigationScreenOptions = {
		title: 'Settings',
	};

	render()
	{
		return (
			<View>
				<Text>TestTest</Text>
			</View>
		);
	}
}
