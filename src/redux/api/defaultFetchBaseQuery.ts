import { fetchBaseQuery } from "@reduxjs/toolkit/query";
import { RootState } from "../store/store";
import { backendUrl } from "../../config/config";

export const defaultFetchBaseQuery = fetchBaseQuery({
    baseUrl: backendUrl,
    prepareHeaders: (headers, { getState }) => {
        const token = (getState() as RootState).login.accessToken

        if (token) {
            headers.set('authorization', `Bearer ${token}`)
        }

        return headers
    }
});