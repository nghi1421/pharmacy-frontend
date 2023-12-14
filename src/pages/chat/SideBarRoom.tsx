import { Paper } from "@mui/material"
import { RoomItem } from "./RoomItem"

export const SideBarRoom = () => {
    return (
        <Paper sx={{ height: '100%', overflowY: 'auto' }}>
            <RoomItem />
            <RoomItem />
            <RoomItem />
            <RoomItem />
        </Paper>
    )
}