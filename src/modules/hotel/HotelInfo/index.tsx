import { useNavigation } from '@react-navigation/native';
import { Box, Text, Button, WhiteSpace } from '@td-design/react-native';
import React, { useContext } from 'react';
import { HotelContext } from '../useHotelService';

export default function HotelInfo() {
  const navigation = useNavigation();
  const hotelService = useContext(HotelContext);

  return (
    <Box>
      <Text>酒店基本信息</Text>
      <Button title="setValue" onPress={() => hotelService.setValue(123)} />
      <WhiteSpace />
      <Button title="HotelOtherInfo" onPress={() => navigation.navigate('HotelOtherInfo')} />
    </Box>
  );
}
