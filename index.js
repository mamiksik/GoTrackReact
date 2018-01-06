import {AppRegistry} from 'react-native';
import {StackNavigator, TabNavigator} from 'react-navigation';

import Settings from "./app/components/Settings";
import Home from "./app/components/Home";


const home = StackNavigator({
	Home: {screen: Home},
});

const App = TabNavigator({
	Home: {screen: home},
	Setting: {screen: Settings},
});

AppRegistry.registerComponent('GoTrackReact', () => App);
