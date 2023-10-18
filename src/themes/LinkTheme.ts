import { Theme } from "@emotion/react";
import { createStyles, makeStyles } from '@mui/styles';

export const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    activeLink: {
      backgroundColor: '#19ABC0',
      color: '#FFFFFF',
      transition: "background 0.3s, color 0.3s",
      '& .MuiSvgIcon-root': {
        color: '#FFFFFF',
        stroke: '#FFFFFF',
        fill: '#19ABC0',
      },
      "&:hover": {
        backgroundColor: "#80B3FF",
        color: '#FFFFFF',
        '& .MuiSvgIcon-root': {
          transition: "background 0.3s, color 0.3s",
          color: '#FFFFFF',
          stroke: '#FFFFFF',
          fill: '#FFFFFF',
        },
      }
    },
    linkClass: {  
      "&:hover": {
        transition: "background 0.3s, color 0.3s",
        backgroundColor: "#80B3FF",
        color: '#FFFFFF',
        '& .MuiSvgIcon-root': {
          transition: "background 0.3s, color 0.3s",
          color: '#FFFFFF',
          stroke: '#FFFFFF',
          fill: '#FFFFFF',
        },
      }
    }
  })
);