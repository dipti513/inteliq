import React from 'react';
import { Box, CssBaseline, ThemeProvider, createTheme } from '@mui/material';
import Sidebar from './Sidebar';
import ChatArea from '../Chat/ChatArea';

const theme = createTheme({
  palette: {
    primary: {
      main: '#4361ee', 
    },
    background: {
      default: '#ffffff',
      paper: '#f7f7f8',
    },
  },
  typography: {
    fontFamily: [
      '"Google Sans"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
    ].join(','),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
        },
      },
    },
  },
});

const AppLayout: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box sx={{ display: 'flex', height: '100vh' }}>
        <Sidebar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            bgcolor: 'background.default',
          }}
        >
          <ChatArea />
        </Box>
      </Box>
    </ThemeProvider>
  );
};

export default AppLayout;
