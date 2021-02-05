import 'react-native-gesture-handler';
import { AppRegistry } from 'react-native';
import * as Sentry from '@sentry/react-native';
import { enableES5 } from 'immer';

import { name as appName } from './app.json';
import App from './src/App';
import '@/api';

enableES5();

Sentry.init({
  dsn: 'http://4871ac1b6eb442c997d3940e475db957@60.12.241.84:29177/4',
});

AppRegistry.registerComponent(appName, () => App);
