import React, { useContext } from 'react';
import { Image, ScrollView } from 'react-native';
import { Button, Input, Text, WhiteSpace } from '@td-design/react-native';
import { AuthService } from '../auth/useAuthService';
import sentryReport, { Severity } from '@/utils/sentry';

import Container from '@/components/Container';
import Echarts from '@/components/Echarts';

export default function Homepage() {
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
        <Echarts
          option={{
            title: {
              text: 'ECharts demo',
            },
            tooltip: {
              show: true,
              formatter: `$$(params) => params.name + ': ' + params.value$$`,
            },
            legend: {
              data: ['销量'],
            },
            xAxis: {
              data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
            },
            yAxis: {},
            series: [
              {
                name: '销量',
                type: 'bar',
                data: [5, 20, 36, 10, 10, 20],
              },
            ],
          }}
        />
      </ScrollView>
    </Container>
  );
}
