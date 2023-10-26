import {
  useFetch,
  useLoadMore,
  usePrefetch,
  useUpdate,
} from '../utils/reactQuery';
import { API_TYPE_BY_USE } from '../utils/constants';

// export const useGetAppointmentsList = () =>
//   useLoadMore<Staff[]>(API_USER);

const useGetTypeByUses = () => useFetch<any>(API_TYPE_BY_USE);

export {
    useGetTypeByUses
}