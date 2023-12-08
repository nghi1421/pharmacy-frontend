import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { CustomLink } from '../components/CustomLink';

export const ForgotPassword = () => {

  return (
    <Box
        sx={{
            my: 8,
            mx: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        }}
    >
        <Typography marginTop={15} component="h1" variant="h3" color='primary'>
            Quên mật khẩu
        </Typography>
        
        <Box component="form" noValidate sx={{ mt: 2 }}>
            
              
            <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 4, mb: 2 }}
            >
                Xác thực
            </Button>
            <Grid container>
                <Grid item xs>
                    <CustomLink title='Quay về' link='/login'/>
                </Grid>
            <Grid item>
            </Grid>
            </Grid>
        </Box>
    </Box>
    
  );
}