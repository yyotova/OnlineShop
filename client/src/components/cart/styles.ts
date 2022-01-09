import { makeStyles } from "@material-ui/core/styles";

export default makeStyles((theme) => ({
  toolbar: theme.mixins.toolbar,
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
