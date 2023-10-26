import {
  useFetch,
  useLoadMore,
  usePrefetch,
  useUpdate,
} from '../utils/reactQuery';
import {
  Staff,
} from '../types/Staff';
import { API_STAFF } from '../utils/constants';

// export const useGetAppointmentsList = () =>
//   useLoadMore<Staff[]>(API_USER);

const useGetStaffs = () => useFetch<any>(API_STAFF);

export {
    useGetStaffs
}