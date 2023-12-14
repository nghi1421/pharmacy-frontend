import { Box, Typography } from "@mui/material"

export type MessgaeItemType = {
    time: string;
    isRight: boolean;
    content: string;
}

export const MessageItem: React.FC<MessgaeItemType> = ({ time, isRight, content }) => {
    return (
        <Box sx={{ display: 'flex', justifyContent: isRight ? 'end' : 'start' }}>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    bgcolor: isRight ? '#06b6d4' : '#f7fee7',
                    color: isRight ? '#fafafa' : '#171717',
                    width: 'fit-content',
                    borderRadius: 2.5,
                    p: 1,
                    m: 0.5
                }}
            >
                <Typography sx={{ w: 'auto', }}>
                    {content}
                </Typography>
                <Typography sx={{ w: 'auto', fontSize: 11 }}>
                    {time}
                </Typography>
            </Box>
        </Box>
    )
}