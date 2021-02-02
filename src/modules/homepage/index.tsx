import React, { useContext } from 'react';
import { Image, ScrollView } from 'react-native';
import { Button, Input, Text, WhiteSpace } from '@td-design/react-native';
import { AuthService } from '../auth/useAuthService';
import sentryReport, { Severity } from '@/utils/sentry';

import Container from '@/components/Container';
import { useNavigation } from '@react-navigation/native';

export default function Homepage() {
  const navigation = useNavigation();
  const authService = useContext(AuthService);

  return (
    <Container>
      <ScrollView>
        <Text testID="homepage">Homepage</Text>
        <Text>hello, td-design</Text>
        <WhiteSpace />
        <Image source={require('./assets/certify_fail.webp')} style={{ width: 200, height: 200 }} />
        <WhiteSpace />
        <Input placeholder="hello" />
        <WhiteSpace />
        <Button
          title="click"
          onPress={() => {
            sentryReport(new Error('My Forth Sentry Error'), 'custom', Severity.Error);
          }}
        />
        <WhiteSpace />
        <Button title="退出登录" onPress={() => authService.logout()} />
        <WhiteSpace />
        <Button title="HotelInfo" onPress={() => navigation.navigate('HotelInfo')} />
      </ScrollView>
    </Container>
  );
}
