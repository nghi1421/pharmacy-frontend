import { Paper, Button, TextField } from "@mui/material"

export const FormMessage = () => {
    return (
        <Paper sx={{
            display: 'flex',
            flexDirection: 'row'
        }}>
            <TextField
                fullWidth
                placeholder="Nhap tin nhan"
                size="small"
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
            >
                Gửi
            </Button>
        </Paper>
    )
}