import { Paper } from "@mui/material"
import { RoomItem } from "./RoomItem"
import { Message, Room } from "../../hooks/useChat"

interface SideBarRoom {
    listRoom: Room[]
    chooseRoom: (r: any) => void
    setChat: (r: Message[]) => void
    updateChat: (n: Message) => void
}

export const SideBarRoom: React.FC<SideBarRoom> = ({ listRoom, chooseRoom, setChat, updateChat }) => {

    return (
        <Paper sx={{ height: '100%', overflowY: 'auto' }}>
            {
                listRoom.map((room: Room) => (
                    <RoomItem
                        room={room}
                        chooseRoom={chooseRoom}
                        setChat={setChat}
                        updateChat={updateChat}
                    />
                ))
            }

        </Paper>
    )
}