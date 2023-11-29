import { ReactElement, ReactNode, useState } from "react";
import { Box, CssBaseline } from "@mui/material";
import { Container, Toolbar } from '@mui/material';
import Header from "./Header";
import { getAccessToken, getStaff } from "../store/auth";
import { Navigate } from "react-router-dom";
import { TodaySales } from "../components/TodaySales";

interface LayoutProps {
  children: ReactNode;
}

const SalesLayout: React.FC<LayoutProps> = ({ children }): ReactElement => {
    const [open, setOpen] = useState<boolean>(false);
    const token = getAccessToken();
    const staff = getStaff();

    if (!token || !staff) {
        return (
            <Navigate to="/login" />
        )
    }
    return (
        <Box sx={{ display: 'flex' }}>
          <CssBaseline />
            <Header open={open} setOpen={setOpen} preventOpen={true} />
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
                <Container maxWidth="xl" sx={{ mt: 4, mb: 4 }}>
                {children}
                </Container>
              </Box>
        </Box>
    )
}

export default SalesLayout