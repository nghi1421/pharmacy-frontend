import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { backendUrl } from "../config/config";
import { getAccessToken, setAccessToken, setStaff } from "../store/auth";
import { enqueueSnackbar } from "notistack";
import { API_FRESH_TOKEN } from "../utils/constants";

let token = getAccessToken();
let customerConfig = {
    "Authorization" : "",
    "Content-Type" : "application/json"
};
if (token) {
    customerConfig["Authorization"] = `Bearer ${token}`;
}

const axiosClient = axios.create({
    withCredentials: true,
    baseURL: backendUrl,
    headers : customerConfig
}) 

axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
        const token = getAccessToken()
        const newHeaders = new AxiosHeaders({
            ...config.headers,
            'Authorization':  `Bearer ${token}`,
        });
        return {...config, headers: newHeaders};
    },
    (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
(response) => response
, async (error) => {
    const { response: { status } } = error;
    if (status == 401) {
        await axiosClient.post(API_FRESH_TOKEN)
            .then(response => {
                setAccessToken(response.data.accessToken)
            })
            .catch(_ => {
                setAccessToken(null)
                setStaff(null)
                enqueueSnackbar('Phiên đăng nhập đã hết hạn.', {
                    variant: 'error',
                    autoHideDuration: 3000
                })
            }) 
    }
    return Promise.reject(error);
});

export default axiosClient;