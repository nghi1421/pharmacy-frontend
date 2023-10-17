import { createAsyncThunk } from "@reduxjs/toolkit";
import { Auth } from "../../types/Auth";
import axiosClient from "../../services/axios";
import { AxiosError } from "axios";

type ErrorLogin = {
    errorMessage: string
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