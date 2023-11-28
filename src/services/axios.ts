import axios, { AxiosHeaders, InternalAxiosRequestConfig } from "axios";
import { backendUrl } from "../config/config";
import { getAccessToken, setAccessToken, setStaff } from "../store/auth";
import { enqueueSnackbar } from "notistack";
import { API_FRESH_TOKEN } from "../utils/constants";
import { ConstructionOutlined } from "@mui/icons-material";

let token = getAccessToken();
let custom = {
    "Authorization" : "",
    "Content-Type" : "application/json"
};
if (token) {
    custom["Authorization"] = `Bearer ${token}`;
}

const axiosClient = axios.create({
    withCredentials: true,
    baseURL: backendUrl,
    headers: custom,
}) 

axiosClient.interceptors.request.use(
    (config: InternalAxiosRequestConfig<any>) => {
        const newHeaders = new AxiosHeaders({
            ...config.headers,
            'Authorization':  `Bearer ${getAccessToken()}`,
        });
        return {...config, headers: newHeaders};
    },
    (error) => Promise.reject(error),
);

axiosClient.interceptors.response.use(
    (response) => response
    , async (error) => {
        const { config ,response: { status } } = error;
        if (status == 401) {
            try {
                const { data } = await axiosClient.post(API_FRESH_TOKEN)
                setAccessToken(data.accessToken)
                axiosClient(config)
            }
            catch (_error) {
                setAccessToken(null)
                setStaff(null)
                enqueueSnackbar('Phiên đăng nhập đã hết hạn.', {
                    variant: 'error',
                    autoHideDuration: 3000
                })
                //@ts-ignore
                window.location = '/login'
            }
        }

        if (status == 403) {
            //@ts-ignore
            window.location = '/403'
        }
        return Promise.reject(error);
    }
);

export default axiosClient;