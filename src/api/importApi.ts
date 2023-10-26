import {
  useFetch,
  useLoadMore,
  usePrefetch,
  useUpdate,
} from '../utils/reactQuery';
import {
  User,
} from '../types/User';
import { API_IMPORT } from '../utils/constants';

// export const useGetAppointmentsList = () =>
//   useLoadMore<Staff[]>(API_USER);

const useGetImports = () => useFetch<any>(API_IMPORT);

export {
    useGetImports
}