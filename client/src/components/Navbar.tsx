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
import { Link, useRouteMatch } from "react-router-dom";

const Navbar = () => {
  const match = useRouteMatch();

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
            <IconButton>
              <Badge badgeContent={4} color="secondary">
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
