import { ReactElement, ReactNode, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { Container, Divider, Toolbar } from '@mui/material';
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import Header from "./Header";
import { RootState } from "../redux/store/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { SideBar } from "../components/Sidebar";
import { Drawer } from '../themes/DrawerTheme'

interface LayoutProps {
  children: ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }): ReactElement => {
  const [open, setOpen] = useState(true);
    const toggleDrawer = () => {
      setOpen(!open);
  };
  const isAuthenticated: boolean = useSelector(
    (state: RootState) => state.login.accessToken !== '123'
  )
  
  if (!isAuthenticated) {
    return (
      <Navigate replace to="/login" />
    )
  }
  else 
  return (
      <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      
        <Header />
      
        <Drawer variant="permanent" open={open} SlideProps={{ unmountOnExit: true }}>
          <Toolbar
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'flex-end',
              px: [1],
            }}
          >
            <IconButton onClick={toggleDrawer}>
              <ChevronLeftIcon />
            </IconButton>
          </Toolbar>
        <Divider />
        
        <SideBar/>
        
        </Drawer>
          <Box
            component="main"
            sx={{
              backgroundColor: (theme) =>
                theme.palette.mode === 'light'
                  ? theme.palette.grey[100]
                  : theme.palette.grey[900],
              flexGrow: 1,
              height: '100vh',
              overflow: 'auto',
            }}
          >
          <Toolbar />
        <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
          { children }
            </Container>
          </Box>
      </Box>
  );
};

export default Layout;