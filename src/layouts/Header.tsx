import { AccountCircle } from "@mui/icons-material"
import { Divider, IconButton, Menu, MenuItem, Toolbar, Typography, styled } from "@mui/material"
import MuiAppBar, { AppBarProps as MuiAppBarProps  } from '@mui/material/AppBar';
import { useState } from "react";
import MenuIcon from '@mui/icons-material/Menu';

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

const Header: React.FC = () => {
  const [avatarEl, setAvatarEl] = useState<HTMLButtonElement|null>(null);
  const openSetting = Boolean(avatarEl);

  const handleAvatarClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setAvatarEl(e.currentTarget);
  };

  const handleAvatarClose = () => {
    setAvatarEl(null);
  };

  const [open, setOpen] = useState(true);
  const toggleDrawer = () => {
      setOpen(!open);
  };
    return (
        <AppBar position="absolute" open={open}>
          <Toolbar
            sx={{
              pr: '24px',
            }}
          >
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
            <Typography
              component="h1"
              variant="h6"
              color="inherit"
              noWrap
              sx={{ flexGrow: 1 }}
            >
              Trang quản lí
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
            <MenuItem onClick={handleAvatarClose}>Cập nhật thông tin</MenuItem>
            <MenuItem onClick={handleAvatarClose}>Đổi mật khẩu</MenuItem>
              <Divider />
            <MenuItem onClick={handleAvatarClose}>Đăng xuất</MenuItem>
          </Menu>
        </Toolbar>
        </AppBar>
    )
}

export default Header