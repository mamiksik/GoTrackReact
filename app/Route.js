import {StackNavigator, TabNavigator} from "react-navigation";
import SettingsScreen from "./screens/SettingsScreen";
import LoginScreen from "./screens/LoginScreen";
import HomeScreen from "./screens/HomeScreen";

import LogsScreen from "./screens/Logs/LogsScreen";
import AddLogScreen from "./screens/Logs/AddLogScreen";
import EditLogScreen from "./screens/Logs/EditLogScreen";

// const TabsComponent = props => (
// 	<View style={{ flex: 1, backgroundColor: '#43484d' }}>
// 		<View
// 			style={{ marginTop: 40, justifyContent: 'center', alignItems: 'center' }}
// 		>
// 			<Image
// 				source={require('./src/images/logo.png')}
// 				style={{ width: SCREEN_WIDTH * 0.57 }}
// 				resizeMode="contain"
// 			/>
// 		</View>
// 		<View style={{marginLeft: 10}}>
// 			<DrawerItems {...props} />
// 		</View>
// 	</View>
// );


const Logs = StackNavigator({
	Logs: {screen: LogsScreen},
	AddLog: {screen: AddLogScreen},
	EditLog: {screen: EditLogScreen},
}, {
	// headerMode: 'none',
	initialRouteName: 'Logs'

});

const Tabs = TabNavigator({
	Home: {screen: HomeScreen},
	Setting: {screen: SettingsScreen},
	Logs: {screen: Logs},
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

