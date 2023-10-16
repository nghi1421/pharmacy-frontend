import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  typography: {
    fontFamily: ['Montserrat', 'sans-serif'].join(','),
    fontSize: 16,
    button: {
      fontFamily: ['Montserrat', 'sans-serif'].join(','),
      fontSize: 16,
      fontWeight: 500,
    },
  }
});