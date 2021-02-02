import { getContextService } from '@/utils/getContextService';
import useSWR from 'swr';

export class OrderInfo {
  orderId = 0;
  orderNo = '';
}

function fetchOrder(): Promise<OrderInfo[]> {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve([
        { orderId: 1, orderNo: 'aaa' },
        { orderId: 2, orderNo: 'bbb' },
      ]);
    }, 2000);
  });
}

export default function useOrderService() {
  const { data: orderList = [], isValidating } = useSWR('/order', fetchOrder);

  return {
    orderList,
    orderLoading: isValidating,
  };
}

export const OrderContext = getContextService(useOrderService);
export const OrderProvider = OrderContext.Provider;
