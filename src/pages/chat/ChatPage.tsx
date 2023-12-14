import { Box, Grid, Typography } from "@mui/material"
import { socket } from '../../config/socket'
import { useEffect } from "react";
import { SideBarRoom } from "./SideBarRoom";
import { MessageView } from "./MessageView";
import { FormMessage } from "./FormMessage";

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
        <Box sx={{ w: 'full' }}>
            <Grid container gap={2} >
                <Grid item xs={8} sm={4}>
                    <SideBarRoom />
                </Grid>

                <Grid item xs={8} sm={7.5}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    >
                        <MessageView>
                        </MessageView>
                        <FormMessage />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ChatPage