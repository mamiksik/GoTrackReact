"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const React = require("react");
const react_1 = require("react");
const react_native_ble_plx_1 = require("react-native-ble-plx");
const react_native_1 = require("react-native");
class Home extends react_1.Component {
    constructor(props) {
        super(props);
        this.bleManager = new react_native_ble_plx_1.BleManager();
    }
    render() {
        return (<react_native_1.View>
				<react_native_1.StatusBar backgroundColor="blue" barStyle="light-content"/>
			</react_native_1.View>);
    }
}
Home.navigationOptions = {
    title: 'Home',
};
exports.Home = Home;
const styles = react_native_1.StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});
//# sourceMappingURL=Home.js.map