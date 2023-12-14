import { Box, Typography } from "@mui/material"

export const RoomItem = () => {
    return (
        <Box sx={{
            width: 'full',
            height: 40,
            border: 1,
            borderColor: '#cbd5e1',
            borderRadius: 2,
            m: 1,
            '&:hover': {
                bgcolor: '#e4e4e7',
                cursor: 'pointer'
            }
        }}>
            <Typography
                align='center'
                sx={{
                    textAlign: 'left',
                    my: 'auto',
                    p: 1
                }}
            >
                Nguyen Thanh Nghi
            </Typography>
        </Box>
    )
}