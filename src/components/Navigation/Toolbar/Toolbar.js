import {
  AppBar,
  Box,
  IconButton,
  makeStyles,
  Menu,
  MenuItem,
  Toolbar,
  Typography,
} from '@material-ui/core';
import { AccountCircle } from '@material-ui/icons';

import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { AuthContext } from '../../../context/authContext';

const useStyles = makeStyles((theme) => ({
  appBar: {
    // zIndex: theme.zIndex.drawer + 1,
  },
  menuItem: {
    width: 150,
    padding: theme.spacing(1),
  },
}));

const CustomToolbar = () => {
  const classes = useStyles();
  const history = useHistory();
  const authContext = useContext(AuthContext);
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const menuClickHandler = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const menuCloserHandler = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed">
      <Toolbar>
        <Box pl={4} style={{ flexGrow: 1 }}>
          <Typography variant="h5">
            <strong>ZIPNOTE</strong>
          </Typography>
        </Box>
        <IconButton
          edge="end"
          color="inherit"
          aria-label="Account of Current User"
          onClick={menuClickHandler}
        >
          <Box pr={1} pt={1}>
            <AccountCircle />
          </Box>
          <Typography display="inline">
            {authContext.authState?.name}
          </Typography>
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={open}
          onClose={menuCloserHandler}
        >
          <MenuItem
            className={classes.menuItem}
            onClick={() => {
              history.push('/logout');
            }}
          >
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default CustomToolbar;
