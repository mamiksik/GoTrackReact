import {AppRegistry, NativeModules} from 'react-native';
import AppComponent from "./app/app";

import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

// Reactotron.configure({host:'martin.local'});
// Reactotron.useReactNative({asyncStorage: { ignore: ['secret'] }});
// Reactotron.use(reactotronRedux());
//
// Reactotron.connect();
//
// console.tron = Reactotron;

// global.XMLHttpRequest = global.originalXMLHttpRequest ?
// 	global.originalXMLHttpRequest :
// 	global.XMLHttpRequest;
// global.FormData = global.originalFormData ?
// 	global.originalFormData :
// 	global.FormData;

// if (__DEV__) {
// 	NativeModules.DevSettings.setIsDebuggingRemotely(true)
// }

AppRegistry.registerComponent('GoTrackReact', () => AppComponent);
