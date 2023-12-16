import { Paper } from "@mui/material"
import { useEffect, useRef } from "react";
import { MessageItem } from "./MessageItem";
import { Message } from "../../hooks/useChat";

interface MessageViewProps {
    messages: Message[]
}

export const MessageView: React.FC<MessageViewProps> = ({ messages }) => {
    const scrollableRef = useRef();

    useEffect(() => {
        //@ts-ignore
        scrollableRef.current.scrollTop = scrollableRef.current.scrollHeight;
    });
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
            {
                messages.map((message) => (
                    <MessageItem
                        time={message.time}
                        content={message.content}
                        isRight={!message.fromCustomer}
                    />
                ))
            }

        </Paper>
    )
}