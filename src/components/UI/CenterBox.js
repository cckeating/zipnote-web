import React from 'react';
import { Box } from '@material-ui/core';

const CenterBox = (props) => {
  return (
    <Box marginTop={16} display="flex" justifyContent="center" {...props}>
      {props.children}
    </Box>
  );
};

export default CenterBox;
