import { Box, Button, Typography } from '@mui/material';

export const Forbidden403 = () => {
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
                403
            </Typography>
            <Typography variant="h6" style={{ color: '#0891b2' }}>
                Không có quyền truy cập.
            </Typography>
            <Button variant="contained" onClick={() => history.back()}>Quay về</Button>
        </Box>
    );
}