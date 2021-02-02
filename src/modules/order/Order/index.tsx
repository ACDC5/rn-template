import React from 'react';
import useOrderService from '../useOrderService';
import type { OrderInfo } from '../useOrderService';
import { Box, Text } from '@td-design/react-native';
import { ActivityIndicator } from 'react-native';

export default function Order() {
  const orderService = useOrderService();

  return (
    <Box>
      <Text>订单</Text>
      {orderService.orderLoading ? (
        <ActivityIndicator />
      ) : (
        <Box>
          {orderService.orderList.map(order => (
            <OrderItem key={order.orderId} {...order} />
          ))}
        </Box>
      )}
    </Box>
  );
}

function OrderItem(order: OrderInfo) {
  return (
    <Box>
      <Box>
        <Text>订单ID：</Text>
        <Text>{order.orderId}</Text>
      </Box>
      <Box>
        <Text>订单编号：</Text>
        <Text>{order.orderNo}</Text>
      </Box>
    </Box>
  );
}
