import { Box, Grid } from "@mui/material"
import { socket } from '../../config/socket'
import { useContext, useEffect, useState } from "react";
import { SideBarRoom } from "./SideBarRoom";
import { MessageView } from "./MessageView";
import { FormMessage } from "./FormMessage";
import { Room, useGetMessages } from "../../hooks/useChat";
import { Message } from "yup";
import { AuthContext } from "../../App";

const ChatPage = () => {
    const { data } = useGetMessages()
    const { username } = useContext(AuthContext)
    const [chat, setChat] = useState<any[]>([])
    const [rooms, setRooms] = useState<Room[]>([])
    const [message, setMessage] = useState<string>('')

    const handleSendMessage = () => {
        if (message && message.trim().length > 0) {
            socket.emit('chat message', 1, message, '', username);
            setMessage('')
        }
    }
    const chooseRoom = (room: Room) => {
        const newRooms = rooms.map((item) => {
            return room.id === item.id ? { ...room, selected: true } : { ...item, selected: false }
        })
        setRooms(newRooms)
        setChat(room.messages)
    }

    const updateChat = (newMessage: Message) => {

    }

    useEffect(() => {
        if (data && data.length > 0) {
            const newRoom = data.map((room: any) => {
                return { ...room, selected: false }
            })

            newRoom[0].selected = true
            setRooms(newRoom)
            setChat(data[0].messages)
        }
    }, [data])

    return (
        <Box sx={{ w: 'full' }}>
            <Grid container gap={2} >
                <Grid item xs={8} sm={4}>
                    <SideBarRoom
                        listRoom={rooms}
                        chooseRoom={chooseRoom}
                        setChat={setChat}
                        updateChat={updateChat}
                    />
                </Grid>

                <Grid item xs={8} sm={7.5}>
                    <Box sx={{
                        display: 'flex',
                        flexDirection: 'column',
                    }}
                    >
                        <MessageView messages={chat} />
                        <FormMessage
                            message={message}
                            setMessage={setMessage}
                            handleSendMessage={handleSendMessage}
                        />
                    </Box>
                </Grid>
            </Grid>
        </Box>
    )
}

export default ChatPage