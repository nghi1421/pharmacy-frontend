import { Box, Typography } from "@mui/material"
import { useEffect } from "react";
import { socket } from "../../config/socket";
import dayjs from "dayjs";
import { Message } from "../../hooks/useChat";

interface RoomItemProps {
    room: any
    chooseRoom: (r: any) => void
    setChat: (r: Message[]) => void
    updateChat: (n: Message) => void
}

export const RoomItem: React.FC<RoomItemProps> = ({ room, chooseRoom, setChat }) => {

    useEffect(() => {
        if (room.selected) {
            socket.emit('join-room', room.id)

            socket.on('message', (newMessage: any, fromCustomer: boolean) => {
                console.log(newMessage);
                setChat((prevChat) => [...prevChat, {
                    time: dayjs(newMessage.time).format('HH:mm'),
                    id: newMessage.id,
                    content: newMessage.content,
                    fromCustomer: fromCustomer
                }])
            });

        }

        return () => {
            if (room.selected) {
                socket.off('join-room')
                socket.off('message')
            }
        }
    }, []);

    return (
        <Box
            onClick={() => chooseRoom(room)}
            sx={{
                width: 'full',
                border: 1,
                borderColor: room.selected ? '#22d3ee' : '#e5e5e5',
                bgcolor: room.selected ? '#f0fdfa' : 'white',
                borderRadius: 2,
                m: 1,
                '&:hover': {
                    bgcolor: '#e4e4e7',
                    cursor: 'pointer'
                }
            }}
        >
            <Typography
                align='center'
                sx={{
                    textAlign: 'left',
                    my: 'auto',
                    p: 1,
                    fontSize: 16,
                }}
            >
                {room.name}
            </Typography>

            <Typography
                align='center'
                sx={{
                    textAlign: 'left',
                    my: 'auto',
                    fontSize: 13,
                    color: '#9ca3af',
                    p: 1
                }}
            >
                {room.recent}
            </Typography>
        </Box>
    )
}