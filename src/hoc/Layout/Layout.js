import { Box } from '@material-ui/core';
import React from 'react';
import CustomToolbar from '../../components/Navigation/Toolbar/Toolbar';

const Layout = (props) => {
  return (
    <Box
      display="flex"
      height="100%"
      bgcolor="primary.light"
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexGrow: 1,
        paddingTop: '72px',
      }}
    >
      <CustomToolbar />
      {props.children}
    </Box>
  );
};

export default Layout;
