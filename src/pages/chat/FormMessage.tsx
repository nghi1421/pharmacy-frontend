import { Paper, Button, TextField } from "@mui/material"

interface FormMessageProps {
    message: string,
    setMessage: (s: string) => void,
    handleSendMessage: () => void
}
export const FormMessage: React.FC<FormMessageProps> = ({
    message,
    setMessage,
    handleSendMessage
}) => {

    return (
        <Paper sx={{
            display: 'flex',
            flexDirection: 'row'
        }}>
            <TextField
                fullWidth
                placeholder="Nhập tin nhắn"
                size="small"
                value={message}
                onKeyDown={(event) => {
                    if (event.key === "Enter")
                        handleSendMessage();
                }}
                onChange={(event) => {
                    setMessage(event.target.value as string)
                }}
                sx={{
                    outline: 'none',
                    '&:hover': {
                        outline: 'none',
                    }
                }}
            ></TextField>
            <Button
                variant="contained"
                sx={{ textTransform: 'none' }}
                onClick={handleSendMessage}
            >
                Gửi
            </Button>
        </Paper>
    )
}