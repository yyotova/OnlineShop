import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
  title: {
    marginTop: "5%",
  },
  checkoutButton: {
    minWidth: "150px",
  },
  cardDetails: {
    display: "flex",
    marginTop: "5%",
    marginBottom: "5%",
    width: "100%",
    justifyContent: "space-between",
  },
}));
