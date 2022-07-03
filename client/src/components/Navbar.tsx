import {
  AppBar,
  Typography,
  Toolbar,
  Button,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Badge,
} from "@material-ui/core";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import PermIdentityIcon from "@material-ui/icons/PermIdentity";
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { ReduxState } from "../models/shared-types";
import { LoginActions } from "../models/user-types";
import { loginAction } from "../actions/userActions";
import { AppState } from "../store";
import { setUserCart } from "../actions/cartActions";
import { ListItemButton, ListItem, List, ListItemText } from "@mui/material";
import { SectionType } from "../models/section-model";
import { CategoryActions } from "../models/category-types";

const Navbar = () => {
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState<Element | null>(null);
  const [womenAnchorEl, setWomenAnchorEl] = useState<Element | null>(null);
  const [menAnchorEl, setMenAnchorEl] = useState<Element | null>(null);

  const cart = useSelector((state: AppState) => state.userCart.cart);

  const sections = useSelector((state: AppState) => state.allSections.sections);

  const womenSection: SectionType = sections.find(
    (s) => s.name === "Women"
  ) || { _id: "", name: "" };
  const menSection: SectionType = sections.find((s) => s.name === "Men") || {
    _id: "",
    name: "",
  };

  const userLogin: LoginActions = useSelector(
    (state: ReduxState) => state.userLogin
  );
  const dispatch = useDispatch();

  const logout = () => {
    setAnchorEl(null);
    dispatch(loginAction("", ""));
    dispatch(setUserCart({ _id: "", userId: "", items: [] }));
  };

  const flexContainer = {
    display: "flex",
    flexDirection: "row",
    padding: 0,
  };

  const { userInfo } = userLogin;

  const categoryAction: CategoryActions = useSelector(
    (state: AppState) => state.allCategories
  );
  const { categories } = categoryAction;

  const allSections: SectionType[] = useSelector(
    (state: AppState) => state.allSections.sections
  );
  const ws = allSections.find((s) => s.name === "Women")?._id || "";
  const ms = allSections.find((s) => s.name === "Men")?._id || "";
  const wCategories = categories.filter((c) => c.section === ws);
  const mCategories = categories.filter((c) => c.section === ms);

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
              to="/"
            >
              DRESS IN STYLE
            </Typography>
          </Box>

          <Box>
            <List sx={flexContainer}>
              <ListItem key={womenSection._id} disablePadding>
                <ListItemButton
                  sx={{ textAlign: "center" }}
                  onClick={(event) => setWomenAnchorEl(event.currentTarget)}
                >
                  <ListItemText primary={womenSection.name} />
                </ListItemButton>
              </ListItem>

              <ListItem key={menSection._id} disablePadding>
                <ListItemButton
                  sx={{ textAlign: "center" }}
                  onClick={(event) => setMenAnchorEl(event.currentTarget)}
                >
                  <ListItemText primary={menSection.name} />
                </ListItemButton>
              </ListItem>
            </List>
          </Box>

          <Menu
            anchorEl={womenAnchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={!!womenAnchorEl}
            onClose={() => setWomenAnchorEl(null)}
          >
            {wCategories.map((c) => (
              <MenuItem
                onClick={() => setWomenAnchorEl(null)}
                component={Link}
                to={{ pathname: `/products`, state: { catId: c._id } }}
              >
                {c.name}
              </MenuItem>
            ))}
          </Menu>

          <Menu
            anchorEl={menAnchorEl}
            anchorOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            keepMounted
            transformOrigin={{
              vertical: "top",
              horizontal: "right",
            }}
            open={!!menAnchorEl}
            onClose={() => setMenAnchorEl(null)}
          >
            {mCategories.map((c) => (
              <MenuItem
                onClick={() => setMenAnchorEl(null)}
                component={Link}
                to={{ pathname: `/products`, state: { catId: c._id } }}
              >
                {c.name}
              </MenuItem>
            ))}
          </Menu>

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
            <div>
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
            </div>
          )}
          <MenuItem onClick={logout}>Logout</MenuItem>
        </Menu>
        {userInfo && !userInfo?.isAdmin && (
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
