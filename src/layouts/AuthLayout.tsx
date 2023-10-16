import { FC, ReactNode } from "react";
import { Grid } from '@mui/material';

type AuthLayoutProps = {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  return (
    <Grid 
      container 
      height='100vh'
      width='100%'
    >
        <Grid item width='33%' />
      <Grid
        item width='34%'
        display='flex'
        justifyContent='center'
        marginLeft='10px'
        marginRight='10px'
      >
          { children }
        </Grid>
        <Grid item width='33%' />
    </Grid>
  )
};

export default AuthLayout;