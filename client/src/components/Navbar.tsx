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
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@material-ui/core";
import React from "react";
import ShoppingBasketIcon from "@material-ui/icons/ShoppingBasket";
import { ReduxState } from "../models/shared-types";
import { useSelector } from "react-redux";
import { LoginActions } from "../models/user-types";
import { Link } from "react-router-dom";
import AddIcon from '@material-ui/icons/Add';
import ShopIcon from '@material-ui/icons/Shop';
import PeopleIcon from '@material-ui/icons/People';
import useStyles from './styles';

const Navbar = () => {
  const classes = useStyles();

  const userLogin: LoginActions = useSelector(
    (state: ReduxState) => state.userLogin
  );

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
            <Typography> DRESS IN STYLE </Typography>
          </Box>

          <Box sx={{ display: "flex" }}>
            <Tabs>
              <Tab label="Products" />
            </Tabs>
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            { userInfo?.isAdmin && (
              <Link to="/manage-items" className={classes.link}>
                <ListItem button>
                  <ListItemIcon>
                    <AddIcon />
                  </ListItemIcon>
                  <ListItemText primary={'Manage Items'} />
                </ListItem>
              </Link>
            ) }
            {userInfo?.isAdmin ? (
               <>
               <Link to="/orders" className={classes.link}>
                 <ListItem button>
                   <ListItemIcon>
                     <ShopIcon />
                   </ListItemIcon>
                   <ListItemText primary={'Orders'} />
                 </ListItem>
               </Link>
               <Link to="/users" className={classes.link}>
                 <ListItem button>
                   <ListItemIcon>
                     <PeopleIcon />
                   </ListItemIcon>
                   <ListItemText primary={'Users'} />
                 </ListItem>
               </Link>
             </>
            ) : (
                userInfo && (
                  <>
                    <Button variant="contained" color="secondary">
                      My Account
                    </Button>
                    <IconButton>
                      <Badge badgeContent={4} color="secondary">
                        <ShoppingBasketIcon />
                      </Badge>
                    </IconButton>
                  </>
                )
              )}
          </Box>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
