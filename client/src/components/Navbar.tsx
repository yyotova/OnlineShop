import {
  AppBar,
  Tabs,
  Typography,
  Tab,
  Toolbar,
  Button,
  Box,
  Badge,
  IconButton,
} from "@material-ui/core";
import React from "react";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import { useSelector } from "react-redux";
import { AppState } from "../store";

const Navbar = () => {
  const history = useHistory();
  const match = useRouteMatch();
  const cart = useSelector((state: AppState) => state.userCart.cart);

  return (
    <AppBar>
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            width: "100%",
          }}
          component="div"
        >
          <Box>
            <Typography> DRESS IN STYLE </Typography>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Tabs>
              <Tab
                label="Products"
                value="/products"
                component={Link}
                to="/products"
              />
              <Tab
                label="Add Product"
                value="/manage-products"
                component={Link}
                to="/manage-products"
              />
              <Tab
                label="Manage Categories"
                value="/manage-categories"
                component={Link}
                to="/manage-categories"
              />
            </Tabs>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Button variant="contained" color="secondary">
              My Account
            </Button>
            <IconButton onClick={() => history.push("/cart")}>
              <Badge
                badgeContent={cart ? cart.items.length : 0}
                color="secondary"
              >
                <ShoppingBasketIcon />
              </Badge>
            </IconButton>
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
