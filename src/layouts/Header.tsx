import { AccountCircle } from "@mui/icons-material"
import { Divider, IconButton, Menu, MenuItem, Toolbar, Typography, styled } from "@mui/material"
import MuiAppBar, { AppBarProps as MuiAppBarProps  } from '@mui/material/AppBar';
import { useContext, useEffect, useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';
import { getAccessToken, getStaff, setAccessToken, setStaff } from "../store/auth";
import { useNavigate } from "react-router-dom";
import { enqueueSnackbar } from "notistack";
import { AuthContext } from "../App";
import { useRefreshToken } from "../hooks/useAuth";
import { useQueryClient } from "react-query";
import { ModalComponent } from "../components/Modal";
import { ProfilePage } from "../pages/ProfilePage";


interface HeaderProps {
  open: boolean;
  setOpen: (newOpen: boolean) => void
  preventOpen?: boolean
}

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}

const drawerWidth: number = 240;

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})<AppBarProps>(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Header: React.FC<HeaderProps> = ({ open, setOpen, preventOpen }) => {
  const [avatarEl, setAvatarEl] = useState<HTMLButtonElement | null>(null);
  const [openModal, setOpenModal] = useState<boolean>(false)
  const { roleId, setRoleId } =  useContext(AuthContext)
  const freshToken = useRefreshToken()
  const staff = getStaff();
  const navigate = useNavigate()
  const openSetting = Boolean(avatarEl);
  const accessToken = getAccessToken()

  useEffect(() => {
    if (!staff) {
      navigate('/login')
    }
    if (!accessToken) {
      freshToken.mutate()
    }
  })

  const handleAvatarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAvatarEl(e.currentTarget);
  };

  const handleAvatarClose = () => {
    setAvatarEl(null);
  };

  const handleLogout = () => {
    setStaff(null);
    setAccessToken(null);
    setRoleId(null)
    enqueueSnackbar('Đăng xuất thành công.', {
      variant: 'success',
      autoHideDuration: 3000
    })
    navigate('/login')
    const queryClient = useQueryClient();
    queryClient.removeQueries();
  }

  const toggleDrawer = () => {
      setOpen(!open);
  };
    return (
        <AppBar position="absolute" open={open}>
             <ModalComponent
                title='Cập nhật thông tin'
                initOpen={openModal}
                
                handleClose={() => setOpenModal(false)}
                children={<ProfilePage />}
            ></ModalComponent>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
            {
              preventOpen ?
              null
              :
              <IconButton
                edge="start"
                color="inherit"
                aria-label="open drawer"
                onClick={toggleDrawer}
                sx={{
                  marginRight: '36px',
                  ...(open && { display: 'none' }),
                }}
              >
                <MenuIcon />
              </IconButton>
            }
            
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
          >
              { roleId == 1 ? 'Trang quản lí' : 'Trang bán hàng'}
          </Typography>

          <Typography
              variant="body2"
              color="inherit"
              noWrap
            >
              {staff.name}
          </Typography>
          <IconButton
            id="basic-button"
            color="inherit"
            onClick={handleAvatarClick}
          >
              <AccountCircle />
          </IconButton>
          <Menu
            id="basic-menu"
            anchorEl={avatarEl}
            open={openSetting}
            onClose={handleAvatarClose}
            MenuListProps={{
              'aria-labelledby': 'basic-button',
            }}
          >
            <MenuItem onClick={() => setOpenModal(true)}>Cập nhật thông tin</MenuItem>
            <MenuItem onClick={handleAvatarClose}>Đổi mật khẩu</MenuItem>
              <Divider />
            <MenuItem onClick={handleLogout}>Đăng xuất</MenuItem>
          </Menu>
        </Toolbar>
        </AppBar>
    )
}

export default Header