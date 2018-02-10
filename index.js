import {AppRegistry, NativeModules} from 'react-native';
import React from "react";
import AppComponent from "./app/app";

global.XMLHttpRequest = global.originalXMLHttpRequest ?
	global.originalXMLHttpRequest :
	global.XMLHttpRequest;
global.FormData = global.originalFormData ?
	global.originalFormData :
	global.FormData;

if (__DEV__) {
	NativeModules.DevSettings.setIsDebuggingRemotely(true)
}

AppRegistry.registerComponent('GoTrackReact', () => AppComponent);
