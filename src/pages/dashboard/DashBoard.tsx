import { FC, ReactElement } from 'react';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';

const Dashboard: FC = (): ReactElement => {
  return (
    <Box sx={{ flexGrow: 1, p: 2}} >
      <Grid container spacing={2} >
        Đây là trang quản trị
      </Grid>
    </Box>
  );
}

export default Dashboard;