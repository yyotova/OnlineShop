import { makeStyles, createStyles, Theme } from '@material-ui/core';

export default makeStyles((theme: Theme) =>
  createStyles({
    root: {
      '& > *': {
        margin: theme.spacing(1),
        width: '25ch',
      },
    },
    btn: {
      backgroundColor: "#800095",
      '&:hover': {
        backgroundColor: "#800089",
      }
    },
  })
);