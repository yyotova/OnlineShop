import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  Box,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Badge,
} from "@material-ui/core";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import PermIdentityIcon from '@material-ui/icons/PermIdentity';
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../models/shared-types";
import { LoginActions } from "../models/user-types";
import { loginAction } from "../actions/userActions";

const Navbar = () => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);

  const cart = useSelector((state: AppState) => state.userCart.cart);

  const userLogin: LoginActions = useSelector(
    (state: ReduxState) => state.userLogin
  );
  const dispatch = useDispatch();

  const logout = () => {
    setAnchorEl(null);
    dispatch(loginAction("", ""));
  };

  const { userInfo } = userLogin;

  return (
    <AppBar position="sticky">
      <Toolbar>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
          component="div"
        >
          <Box>
            <Typography
              style={{
                textDecoration: "none",
                color: "white",
                fontSize: "22px",
              }}
              component={Link}
              to="/products"
            >
              DRESS IN STYLE
            </Typography>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {userInfo ? (
              <>
                <Typography component="span">
                  Hello, {userInfo?.firstName} {userInfo?.lastName}!
                </Typography>
                <IconButton
                  onClick={(event) => setAnchorEl(event.currentTarget)}
                >
                  <PermIdentityIcon />
                </IconButton>
              </>
            ) : (
                <Button
                  type="button"
                  variant="contained"
                  color="secondary"
                  onClick={() => history.push("/login")}
                >
                  Login
                </Button>
              )}
          </Box>
        </Box>
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={!!anchorEl}
          onClose={() => setAnchorEl(null)}
        >
          {" "}
          {userInfo?.isAdmin && (
            <>
              <MenuItem
                onClick={() => setAnchorEl(null)}
                component={Link}
                to="/manage-categories"
              >
                Manage Categories
              </MenuItem>
              <MenuItem
                onClick={() => setAnchorEl(null)}
                component={Link}
                to="/manage-products"
              >
                Manage Products
              </MenuItem>
              <MenuItem
                onClick={() => setAnchorEl(null)}
                component={Link}
                to="/orders"
              >
                Orders
              </MenuItem>
              <MenuItem component={Link} to="/users">
                Users
              </MenuItem>
            </>
          )}
            <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
        {!userInfo?.isAdmin && (
          <>
            <IconButton onClick={() => history.push("/cart")}>
              <Badge
                badgeContent={cart ? cart.items.length : 0}
                color="secondary"
              >
                <ShoppingBasketIcon />
              </Badge>
            </IconButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
