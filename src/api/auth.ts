import { API_LOGIN } from '../utils/constants';
import { Auth } from '../types/Auth';
import { useFetch } from '../utils/reactQuery';
import { api } from '../utils/api';
export const login = (username: string, password: string) =>
  api.post<Auth>(API_LOGIN, {
    username,
    password,
  });

// export const useGetProfile = () => {
//   const context = useFetch<{ auth: Auth }>(
//     apiRoutes.getProfile,
//     undefined,
//     { retry: false }
//   );
//   return { ...context, data: context.data?.user };
// };