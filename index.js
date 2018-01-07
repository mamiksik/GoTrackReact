import {AppRegistry, NativeModules} from 'react-native';
import React from "react";
import AppComponent from "./app/app";


if (__DEV__) {
	NativeModules.DevSettings.setIsDebuggingRemotely(true)
}

AppRegistry.registerComponent('GoTrackReact', () => AppComponent);
