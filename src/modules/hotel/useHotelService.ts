import useSWRNative from '@/hooks/useSWRNative';
import { getContextService } from '@/utils/getContextService';
import { useState } from 'react';

export default function useHotelService() {
  const [value, setValue] = useState(0);
  const { data: hotelInfo = [], isValidating: hotelLoading } = useSWRNative(
    '/resource/list',
    API.authorization.resource.listResource.fetch
  );

  return {
    hotelInfo,
    hotelLoading,
    value,
    setValue,
  };
}

export const HotelContext = getContextService(useHotelService);

export const HotelProvider = HotelContext.Provider;
