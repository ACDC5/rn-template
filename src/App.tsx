import React, { useEffect } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { ThemeProvider } from '@td-design/react-native';
import SplashScreen from 'react-native-splash-screen';
import codePush from 'react-native-code-push';

import useAuthService, { AuthService } from './modules/auth/useAuthService';
import Stack from './stacks';
import { Platform } from 'react-native';

const App = () => {
  const authService = useAuthService();

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <AuthService.Provider value={authService}>
          <NavigationContainer>
            <Stack />
          </NavigationContainer>
        </AuthService.Provider>
      </ThemeProvider>
    </SafeAreaProvider>
  );
};

export default codePush({
  checkFrequency: codePush.CheckFrequency.ON_APP_START,
  mandatoryInstallMode: codePush.InstallMode.IMMEDIATE,
  installMode: codePush.InstallMode.ON_NEXT_RESTART,
  updateDialog:
    Platform.OS === 'ios'
      ? null
      : {
          // 是否显示更新描述
          appendReleaseDescription: true,
          // 更新描述的前缀。 默认为"Description"
          descriptionPrefix: '\n\n更新内容：\n',
          // 强制更新按钮文字，默认为continue
          mandatoryContinueButtonLabel: '立即更新',
          // 强制更新时的信息. 默认为"An update is available that must be installed."
          mandatoryUpdateMessage: '必须更新后才能使用',
          // 非强制更新时，按钮文字,默认为"ignore"
          optionalIgnoreButtonLabel: '稍后',
          // 非强制更新时，确认按钮文字. 默认为"Install"
          optionalInstallButtonLabel: '更新',
          // 非强制更新时，检查到更新的消息文本
          optionalUpdateMessage: '有新版本了，是否更新？',
          // Alert窗口的标题
          title: '更新',
        },
})(App);
