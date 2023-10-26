import {
  useFetch,
  useLoadMore,
  usePrefetch,
  useUpdate,
} from '../utils/reactQuery';
import { API_DRUG_CATEGORY } from '../utils/constants';

// export const useGetAppointmentsList = () =>
//   useLoadMore<Staff[]>(API_USER);

const useGetDrugCategories = () => useFetch<any>(API_DRUG_CATEGORY);

export {
    useGetDrugCategories
}