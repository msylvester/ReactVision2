/**
 * @format
 */

import {AppRegistry} from 'react-native';

import App from './src/App';
import AppProvider from './src/AppProvider';
import {name as appName} from './app.json';
import {firebase} from '@react-native-firebase/app';
// import admin from 'firebase-admin';
import {initializeApp} from '@react-native-firebase/app';
import serviceAccount from './ServiceAccount.json';

// firebase.initializeApp({
//   credential: firebase.admin.credential.cert(serviceAccount),
// });
// initializeApp(serviceAccount);
AppRegistry.registerComponent(appName, () => AppProvider);
