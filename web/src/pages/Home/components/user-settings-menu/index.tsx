import { ListItemIcon, Menu, MenuItem } from "@mui/material";
import { MyAccountCircle, UserSettingsMenuContainer } from "./styles";
import { Logout } from "@mui/icons-material";
import React from "react";

export function UserSettingsMenu(){

  const [anchorEl, setAnchorEl] = React.useState<null | SVGSVGElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  function handleClickLogout(){

    window.alert('logout')

  }

  return (
    <UserSettingsMenuContainer>
        <MyAccountCircle onClick={(e) => (handleClick(e))}/>
        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          slotProps={{
            paper: {
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                width: '12rem',
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            },
          }}
          transformOrigin={{ horizontal: 'right', vertical: 'top' }}
          anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
        >
          <MenuItem onClick={handleClickLogout}>
            <ListItemIcon>
              <Logout fontSize="small" />
            </ListItemIcon>
            Sair
          </MenuItem>
      </Menu>
      </UserSettingsMenuContainer>
  )

}