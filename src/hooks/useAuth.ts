import { API_LOGIN } from '../utils/constants';
import { Auth } from '../types/Auth';
import { api } from '../utils/api';

export const login = (username: string, password: string) =>
    api.post<Auth>(API_LOGIN, {
      username,
      password,
    }
);
