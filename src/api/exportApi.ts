import {
  useFetch,
  useLoadMore,
  usePrefetch,
  useUpdate,
} from '../utils/reactQuery';
import { API_EXPORT } from '../utils/constants';

// export const useGetAppointmentsList = () =>
//   useLoadMore<Staff[]>(API_USER);

const useGetExports = () => useFetch<any>(API_EXPORT);

export {
    useGetExports
}