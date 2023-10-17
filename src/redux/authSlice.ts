import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from './store/store';
import { User } from '../types/User';
import { Auth } from '../types/Auth';
import axiosClient from '../services/axios';
import { AxiosError } from 'axios';

type AuthState = {
    accessToken: string
    refreshToken: string
    data : User | null;
    loading: boolean;
    error? : string | null;
}

type ErrorLogin = {
    errorMessage: string
}

const initialState: AuthState = {
    accessToken: "",
    refreshToken: "",
    data : null, 
    loading: false,
    error : null
}

export const authenticate = createAsyncThunk<
    Auth,
    { username: string, password: string},
    { rejectValue: ErrorLogin }
> (
    'login/startAuth',
    async (data, { rejectWithValue }) => {
        try {
            const body = JSON.stringify(data);
            const response = await axiosClient.post(`login`, body)
            console.log(response)
            return response.data;
        }
        catch (err) {
            const error: AxiosError<ErrorLogin> = err as any;
            if (!error.response) {
                throw err;
            }
            console.log(error)

            return rejectWithValue(error.response.data)
        }       
  }
);

export const authSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder  
    .addCase(authenticate.pending, (state) => {
        state.loading = true
    })
    .addCase(authenticate.fulfilled, (state, action: PayloadAction<Auth>) => {
        const auth: Auth = action.payload
        state.accessToken= auth.accessToken
        state.refreshToken= auth.refreshToken
        state.data = auth.data 
        state.error = null 
        state.loading= false
    })
    .addCase(authenticate.rejected, (state, action) => {
        state.loading = false
        if (action.payload) {
            const errorMesage: string = action.payload.errorMessage
            state.error = errorMesage
        }
    });
  },
});

// export const { increment, decrement, incrementByAmount } = authSlice.actions;

export const selectAccessToken = (state: RootState) => state.login.accessToken;

export default authSlice.reducer;