import { io } from "socket.io-client";
import { SOCKET_URL } from "../utils/constants";
import { getAccessToken } from "../store/auth";

export const socket = io(SOCKET_URL, {
    query: {
        token: getAccessToken()
    }
});