import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    display: "flex",
  },
  root: {
    flexGrow: 1,
  },
  items: {
    maxHeight: "100%",
    overflow: "scrow",
  },
  chat: {
    width: "20%",
    position: "fixed",
    bottom: 0,
    right: 0,
  },
}));
