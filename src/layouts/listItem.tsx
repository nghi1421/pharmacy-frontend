import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import PeopleIcon from '@mui/icons-material/People';
import BarChartIcon from '@mui/icons-material/BarChart';
import LayersIcon from '@mui/icons-material/Layers';
import { AttachMoney, Group, Handshake, ManageAccounts, VerticalAlignBottom } from '@mui/icons-material';

export const mainListItems = (
  <React.Fragment>
    <ListItemButton>
      <ListItemIcon>
        <ManageAccounts />
      </ListItemIcon>
      <ListItemText primary="Tài khoản" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <Group />
      </ListItemIcon>
      <ListItemText primary="Nhân viên" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <PeopleIcon />
      </ListItemIcon>
      <ListItemText primary="Khách hàng" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <Handshake />
      </ListItemIcon>
      <ListItemText primary="Nhà cung cấp" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <BarChartIcon />
      </ListItemIcon>
      <ListItemText primary="Danh mục thuốc" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <LayersIcon />
      </ListItemIcon>
      <ListItemText primary="Công dụng thuốc" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <VerticalAlignBottom />
      </ListItemIcon>
      <ListItemText primary="Nhập hàng" />
    </ListItemButton>

    <ListItemButton>
      <ListItemIcon>
        <AttachMoney />
      </ListItemIcon>
      <ListItemText primary="Bán hàng" />
    </ListItemButton>
  
  </React.Fragment>
);
