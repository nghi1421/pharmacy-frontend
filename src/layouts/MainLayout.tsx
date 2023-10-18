import { ReactElement, ReactNode, useState } from "react";
import { Box, CssBaseline, styled } from "@mui/material";
import { Container, Divider, Toolbar } from '@mui/material';
import IconButton from '@mui/material/IconButton'
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import MuiDrawer from '@mui/material/Drawer'
import { Column } from "../types/Column";
import Header from "./Header";
import { RootState } from "../redux/store/store";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { SideBar } from "../components/Sidebar";

interface LayoutProps {
  children: ReactNode;
}

const drawerWidth: number = 240;

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    '& .MuiDrawer-paper': {
      position: 'relative',
      whiteSpace: 'nowrap',
      width: drawerWidth,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      boxSizing: 'border-box',
      ...(!open && {
        overflowX: 'hidden',
        transition: theme.transitions.create('width', {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.leavingScreen,
        }),
        width: theme.spacing(7),
        [theme.breakpoints.up('sm')]: {
          width: theme.spacing(9),
        },
      }),
    },
  }),
);

function createData(
  id: number,
  username: string,
  role: string,
  belongsTo: string,
  createdAt: string,
  updatedAt: string,
) {
  return { id, username, role, belongsTo, createdAt, updatedAt };
}

const rows = [
  createData(1, 'thanhnghi123', 'Quản lí', 'Nguyễn Thanh Nghị', new Date().toLocaleString(), new Date().toLocaleString()),
  createData(2, 'thanhnghi123', 'Quản lí', 'Nguyễn Thanh Nghị', new Date().toLocaleString(), new Date().toLocaleString()),
  createData(3, 'thanhnghi123', 'Quản lí', 'Nguyễn Thanh Nghị', new Date().toLocaleString(), new Date().toLocaleString()),
  createData(4, 'thanhnghi123', 'Quản lí', 'Nguyễn Thanh Nghị', new Date().toLocaleString(), new Date().toLocaleString()),
  createData(5, 'thanhnghi123', 'Quản lí', 'Nguyễn Thanh Nghị', new Date().toLocaleString(), new Date().toLocaleString()),
  createData(6, 'thanhnghi123', 'Quản lí', 'Nguyễn Thanh Nghị', new Date().toLocaleString(), new Date().toLocaleString()),
  createData(7, 'thanhnghi123', 'Quản lí', 'Nguyễn Thanh Nghị', new Date().toLocaleString(), new Date().toLocaleString()),
  createData(8, 'thanhnghi123', 'Quản lí', 'Nguyễn Thanh Nghị', new Date().toLocaleString(), new Date().toLocaleString()),
  createData(9, 'thanhnghi123', 'Quản lí', 'Nguyễn Thanh Nghị', new Date().toLocaleString(), new Date().toLocaleString()),
  createData(10, 'thanhnghi123', 'Quản lí', 'Nguyễn Thanh Nghị', new Date().toLocaleString(), new Date().toLocaleString()),
];

const columns: Column[] = [
  { key: 'id', value: 'Mã tài khoản'},
  { key: 'username', value: 'Tên đăng nhập'},
  { key: 'role', value: 'Quyền'},
  { key: 'belongsTo', value: 'Tên nhân viên'},
  { key: 'createdAt', value: 'Ngày tạo'},
  { key: 'updatedAt', value: 'Ngày cập nhật'},
]

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
      
        <Drawer variant="permanent" open={open}>
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
            {/* <TableComponent
              rows={rows}
              tableName="Quản lí tài khoản"
              columns={columns}
            ></TableComponent> */}
            </Container>
          </Box>
      </Box>
  );
};

export default Layout;