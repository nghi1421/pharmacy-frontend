import { io } from "socket.io-client";
import { SOCKET_URL } from "../utils/constants";
import { getAccessToken } from "../store/auth";

const createSocket = () => {
    return io(SOCKET_URL, {
        query: {
            token: getAccessToken()
        }
    });
}
export const socket = createSocket()
