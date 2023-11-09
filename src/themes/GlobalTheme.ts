import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  typography: {
    fontFamily: ['sans-serif'].join(','),
    fontSize: 15,
    fontWeightRegular: 500,
    fontWeightBold: 600,
    button: {
      fontFamily: ['sans-serif'].join(','),
      fontSize: 15,
      fontWeight: 500
    },
    subtitle1: {
      fontSize: 12,
    },
    body1: {
      fontWeight: 500,
    },
  },
});

theme.typography.h3 = {
  fontSize: '1.2rem',
  '@media (min-width:600px)': {
    fontSize: '1.5rem',
  },
  [theme.breakpoints.up('md')]: {
    fontSize: '2.4rem',
  },
};

export default theme