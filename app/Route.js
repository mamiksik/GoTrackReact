import {StackNavigator, TabNavigator} from "react-navigation";
import SettingsScreen from "./screens/SettingsScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

import LogsScreen from "./screens/Logs/LogsScreen";
import AddLogScreen from "./screens/Logs/AddLogScreen";
import EditLogScreen from "./screens/Logs/EditLogScreen";
import Ionicons from "react-native-vector-icons/Ionicons";

// import QRCodeScanner from 'react-native-qrcode-scanner';

const Logs = StackNavigator({
	Logs: {screen: LogsScreen},
	AddLog: {screen: AddLogScreen},
	// QrView: {screen: QRCodeScanner},
	EditLog: {screen: EditLogScreen},
}, {
	// headerMode: 'none',
	initialRouteName: 'Logs'

});

const Tabs = TabNavigator({
	Home: {screen: HomeScreen},
	Logs: {
		screen: Logs,
		title: "Logs",
		tabBarIcon: ({tintColor, focused}) => (
			<Ionicons
				name={focused ? 'ios-clipboard' : 'ios-clipboard-outline'}
				size={26}
				style={{color: tintColor}}
			/>
		),
	},
	Setting: {screen: SettingsScreen},
}, {
	initialRouteName: 'Home'
	// contentComponent: TabsComponent
});

export const AppNavigator = StackNavigator({
	Login: {screen: LoginScreen},
	Tabs: {screen: Tabs},
}, {
	initialRouteName: 'Login',
	headerMode: 'none'
});

