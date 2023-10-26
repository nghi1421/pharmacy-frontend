import {
  useFetch,
  useLoadMore,
  usePrefetch,
  useUpdate,
} from '../utils/reactQuery';

import { API_CUSTOMER } from '../utils/constants';

// export const useGetAppointmentsList = () =>
//   useLoadMore<Staff[]>(API_USER);

const useGetCustomers = () => useFetch<any>(API_CUSTOMER);

export {
    useGetCustomers
}