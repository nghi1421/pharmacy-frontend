import axios from "axios";
import { backendUrl } from "../config/config";

let token = sessionStorage.getItem("token");
let config = {
    "Authorization" : "",
    "Content-Type" : "application/json"
};
if (token) {
    config["Authorization"] = `Token ${token}`;
}

const axiosClient = axios.create({
    withCredentials: true,
    baseURL: backendUrl,
    headers : config
}) 

export default axiosClient;