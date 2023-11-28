import { Box, Button, Typography } from '@mui/material';

export const NotFound404 = () => {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                flexDirection: 'column',
                minHeight: '100vh',
                backgroundColor: '#ffffff',
            }}
        >
            <Typography variant="h1" style={{ color: '#0891b2' }}>
                404
            </Typography>
            <Typography variant="h6" style={{ color: '#0891b2' }}>
                Trang không tồn tại.
            </Typography>
            <Button variant="contained" onClick={() => history.back()}>Quay về</Button>
        </Box>
    );
}