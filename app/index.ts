import {AppRegistry} from 'react-native';
import {NavigationContainer, TabNavigator} from "react-navigation";

import {Home} from "./components/Home";
import {Settings} from "./components/Settings";

const App: NavigationContainer = TabNavigator({
	Home: {screen: Home},
	Settings: {screen: Settings},
});


AppRegistry.registerComponent('GoTrackReact', () => App);
