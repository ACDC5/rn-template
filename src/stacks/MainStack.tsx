import React from 'react';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';

import Homepage from '@/modules/homepage';
import HotelInfo from '@/modules/hotel/HotelInfo';
import HotelOtherInfo from '@/modules/hotel/HotelOtherInfo';
import Order from '@/modules/order/Order';

import useHotelService, { HotelProvider } from '@/modules/hotel/useHotelService';

const Stack = createStackNavigator();
const MainStack = (screenOptions: StackNavigationOptions) => {
  const hotelService = useHotelService();

  /** HotelInfo 和 HotelOtherInfo 处于同一个限界上下文HotelContext，所以应该用同一个HotelProvider包裹，value需要共享同一个hooks，否则数据会不一致 */
  const HotelInfoScreen = () => (
    <HotelProvider value={hotelService}>
      <HotelInfo />
    </HotelProvider>
  );
  const HotelOtherInfoScreen = () => (
    <HotelProvider value={hotelService}>
      <HotelOtherInfo />
    </HotelProvider>
  );

  return (
    <Stack.Navigator initialRouteName="Homepage" mode="card" headerMode="screen" screenOptions={screenOptions}>
      <Stack.Screen name="Homepage" component={Homepage} options={{ headerTitle: 'Homepage' }} />
      <Stack.Screen name="HotelInfo" component={HotelInfoScreen} options={{ headerTitle: 'HotelInfo' }} />
      <Stack.Screen
        name="HotelOtherInfo"
        component={HotelOtherInfoScreen}
        options={{ headerTitle: 'HotelOtherInfo' }}
      />
      <Stack.Screen name="Order" component={Order} options={{ headerTitle: 'Order' }} />
    </Stack.Navigator>
  );
};

export default MainStack;
