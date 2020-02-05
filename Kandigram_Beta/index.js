/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
// import bgMessaging from './src/Common/PushNotifications/BgMessaging'; 

AppRegistry.registerComponent(appName, () => App);
// AppRegistry.registerHeadlessTask('RNFirebaseBackgroundMessage', () => bgMessaging); 
