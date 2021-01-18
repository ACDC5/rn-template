import React, { useContext } from 'react';
import { Image } from 'react-native';
import { Box, Button, Input, Text, WhiteSpace } from '@td-design/react-native';
import Container from '@/components/Container';
import { AuthService } from '../auth/useAuthService';
import sentryReport, { Severity } from '@/utils/sentry';

export default function Homepage() {
  const authService = useContext(AuthService);

  return (
    <Container>
      <Box>
        <Text testID="homepage">Homepage</Text>
        <Text>hello, td-design</Text>
        <WhiteSpace />
        <Image source={require('@/assets/certify_fail.webp')} style={{ width: 200, height: 200 }} />
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
      </Box>
    </Container>
  );
}
