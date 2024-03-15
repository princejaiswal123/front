"use client"
import React, { FC } from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: "##FFFFFF",
    },
    secondary: {
      main: '#E0C2FF',
    },
  },
});

const Loader = () => {
  return (
    <div className=''>
      <ThemeProvider theme={theme}>
        {/* Use the 'style' prop to set the color manually */}
        <CircularProgress style={{ color: theme.palette.primary.main }} />
      </ThemeProvider>
    </div>
  );
};

export default Loader;