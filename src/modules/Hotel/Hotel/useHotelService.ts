import useSWRNative from '@/hooks/useSWRNative';
import { getContextService } from '@/utils/getContextService';

export default function useHotelService() {
  const { data: hotelInfo = [], isValidating: hotelLoading } = useSWRNative(
    '/resource/list',
    API.authorization.resource.listResource.fetch
  );

  return {
    hotelInfo,
    hotelLoading,
  };
}

export const HotelContext = getContextService(useHotelService);
