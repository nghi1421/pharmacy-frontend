import { CssBaseline, Grid, Paper, ThemeProvider, createTheme } from "@mui/material";
import { FC, ReactNode } from "react";
import background from '../assets/images/background.jpg'
const defaultTheme = createTheme();

type AuthLayoutProps = {
  children: ReactNode;
}

const AuthLayout: FC<AuthLayoutProps> = ({ children }) => {
  
  return (
    <ThemeProvider theme={defaultTheme}>
      <Grid container component="main" sx={{ height: '100vh' }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${background})`,
            backgroundRepeat: 'no-repeat',
            backgroundColor: (t) =>
              t.palette.mode === 'light' ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6}
          square
          sx={{ my: 'auto',boxShadow: 0, padding: 4 }}
        >
            {children}
        </Grid>
      </Grid>
    </ThemeProvider>
  )
};

export default AuthLayout;