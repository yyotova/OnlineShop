import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ManageProduct from "./components/ManageProduct";
import Navbar from "./components/Navbar";
import Products from "./components/products/Products";
import ProductView from "./components/ProductView";
import Register from "./components/forms/Register";
import Login from "./components/forms/Login";
import Cart from "./components/cart/Cart";
import CategoryView from "./components/CategoryView";
import Home from "./components/Home";
import {
  fetchCategories,
  fetchProducts,
  fetchUserCart,
} from "./actions/requests";
import { listSections } from "./actions/sectionActions";
import { useDispatch, useSelector } from "react-redux";
import UserManagement from "./components/UserManagement";
import PrivateRoute from "./components/auth/PrivateRoute";
import { ReduxState } from "./models/shared-types";
import { LoginActions } from "./models/user-types";
import OrdesManagement from "./components/OrdersManagement";
import socketIOClient from "socket.io-client";
import { ENDPOINT } from "./constants/global";

function App() {
  const dispatch = useDispatch();
  const userLogin: LoginActions = useSelector(
    (state: ReduxState) => state.userLogin
  );

  const { userInfo } = userLogin;

  const socket = socketIOClient(ENDPOINT);
  socket.on("message", (data) => {
    console.log(data);
  });
  socket.emit("message", "", "hello there");

  useEffect(() => {
    fetchProducts(dispatch);
    fetchCategories(dispatch);
    fetchUserCart(userInfo?._id || "", dispatch, userInfo);
    dispatch(listSections());
  }, [userInfo]);

  return (
    <BrowserRouter>
      <Navbar />

      <Switch>
        <Route exact path="/" component={Home} />

        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:id" component={ProductView} />
        <PrivateRoute
          exact
          path="/edit-products/:id"
          component={ManageProduct}
        />
        <PrivateRoute exact path="/manage-products" component={ManageProduct} />
        <PrivateRoute
          exact
          path="/manage-categories"
          component={CategoryView}
        />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/users" component={UserManagement} />
        <PrivateRoute exact path="/cart" component={Cart} />
        <PrivateRoute exact path="/orders" component={OrdesManagement} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
