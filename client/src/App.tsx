import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import ManageProduct from "./components/ManageProduct";
import Navbar from "./components/Navbar";
import Products from "./components/products/Products";
import ProductView from "./components/ProductView";
import Register from "./components/forms/Register";
import Login from "./components/forms/Login";
import UserManagement from "./components/UserManagment";
import PublicRoute from "./components/auth/PublicRoute";
import PrivateRoute from "./components/auth/PrivateRoute";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Switch>
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:id" component={ProductView} />
        <PrivateRoute exact path="/edit-products/:id" component={ManageProduct} />
        <PrivateRoute exact path="/manage-products" component={ManageProduct} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <PrivateRoute exact path="/users" component={UserManagement} />
        <Redirect to="/products" />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
