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
      },
      color: 'white',
    },
    link: {
      textDecoration: 'none',
      color: theme.palette.text.primary,
    },
    orderContainer: {
      display: 'grid',
      gap: '15px'
    },
    orderDialog: {
      // width: '40%',
      display: 'grid',
      gap: '5px'
    }
  })
);