"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_native_1 = require("react-native");
const react_navigation_1 = require("react-navigation");
const Home_1 = require("./components/Home");
const Settings_1 = require("./components/Settings");
const App = react_navigation_1.TabNavigator({
    Home: { screen: Home_1.Home },
    Settings: { screen: Settings_1.Settings },
});
react_native_1.AppRegistry.registerComponent('GoTrackReact', () => App);
//# sourceMappingURL=index.js.map