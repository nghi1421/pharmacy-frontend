import {
  useFetch,
  useLoadMore,
  usePrefetch,
  useUpdate,
} from '../utils/reactQuery';
import {
  User,
} from '../types/User';
import { API_USER } from '../utils/constants';

// export const useGetAppointmentsList = () =>
//   useLoadMore<Staff[]>(API_USER);

const useGetUsers = () => useFetch<any>(API_USER);

export {
    useGetUsers
}