import { Box } from "@mui/material"
import { socket } from '../../config/socket'
import { useEffect } from "react";

const ChatPage = () => {

    useEffect(() => {
        socket.on('connect_error', data => {
            alert(JSON.stringify(data))
        });

        return () => {
            socket.off('message');
        };
    }, []);
    return (
        <Box>
            chatapp
        </Box>
    )
}

export default ChatPage