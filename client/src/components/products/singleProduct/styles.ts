import { makeStyles } from "@material-ui/core/styles";

export default makeStyles(() => ({
  root: {
    maxWidth: "100%",
  },
  media: {
    height: "0%",
    paddingTop: "56%",
    objectFit: 'fill',
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
  cardContent: {
    display: "flex",
    justifyContent: "space-between",
  },
  btn: {
    backgroundColor: "#800095",
    '&:hover': {
      backgroundColor: "#800089",
    },
    color: 'white'
  },
}));
