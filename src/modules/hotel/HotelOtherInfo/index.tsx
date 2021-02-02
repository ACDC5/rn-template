import { Box, Text } from '@td-design/react-native';
import React, { useContext } from 'react';
import { HotelContext } from '../useHotelService';

export default function HotelOtherInfo() {
  const hotelService = useContext(HotelContext);

  return (
    <Box>
      <Text>{hotelService.value}</Text>
    </Box>
  );
}
