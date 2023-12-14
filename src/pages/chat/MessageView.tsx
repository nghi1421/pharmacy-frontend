import { Box, Paper } from "@mui/material"
import { useEffect, useRef } from "react";
import { MessageItem } from "./MessageItem";

export const MessageView = () => {
    const scrollableRef = useRef();

    useEffect(() => {
        //@ts-ignore
        scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    }, []);
    return (
        //@ts-ignore
        <Paper
            ref={scrollableRef}
            sx={{ overflowY: 'auto', height: '75vh', p: 2, position: 'relative' }}
        >
            {/* <Box
                sx={{
                    position: 'sticky',
                    top: 0,
                    w: '100%',
                    h: 40,
                    bgcolor: '#fff'
                }}
            >
                Nguyen Thanh Nghi
            </Box> */}
            <MessageItem
                time='20:20:11'
                content="hello ban"
                isRight={false}
            />
            <MessageItem
                time='20:20:11'
                content="hello ban"
                isRight={true}
            />
            <MessageItem
                time='20:20:11'
                content="hello ban"
                isRight={true}
            />
            <MessageItem
                time='20:20:11'
                content="hello ban"
                isRight={true}
            />
            <MessageItem
                time='20:20:11'
                content="hello ban"
                isRight={false}
            />
            <MessageItem
                time='20:20:11'
                content="hello ban"
                isRight={false}
            />
            <MessageItem
                time='20:20:11'
                content="hello ban"
                isRight={false}
            />
            <MessageItem
                time='20:20:11'
                content="hello ban"
                isRight={true}
            />
            <MessageItem
                time='20:20:11'
                content="hello ban"
                isRight={false}
            />
            <MessageItem
                time='20:20:11'
                content="hello ban"
                isRight={false}
            />
            <MessageItem
                time='20:20:11'
                content="hello ban"
                isRight={true}
            /><MessageItem
                time='20:20:11'
                content="hello ban"
                isRight={true}
            />
            <MessageItem
                time='20:20:11'
                content="hello ban"
                isRight={false}
            />
            <MessageItem
                time='20:20:11'
                content="hello ban"
                isRight={false}
            />
            <MessageItem
                time='20:20:11'
                content="hello ban"
                isRight={false}
            />
            <MessageItem
                time='20:20:11'
                content="hello ban"
                isRight={true}
            />
            <MessageItem
                time='20:20:11'
                content="hello ban"
                isRight={false}
            />
            <MessageItem
                time='20:20:11'
                content="hello ban"
                isRight={false}
            />
            <MessageItem
                time='20:20:11'
                content="hello ban"
                isRight={false}
            />
        </Paper>
    )
}