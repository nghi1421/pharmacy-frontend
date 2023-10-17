import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../../types/User';
import { Auth } from '../../types/Auth';
import { authenticate } from '../async/Authenticate';

type AuthState = {
    accessToken: string
    refreshToken: string
    data : User | null;
    loading: boolean;
    error? : string | null;
}

const initialState: AuthState = {
    accessToken: "",
    refreshToken: "",
    data : null, 
    loading: false,
    error : null
}

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

export default authSlice.reducer;