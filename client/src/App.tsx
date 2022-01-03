import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import ManageProduct from "./components/ManageProduct";
import Navbar from "./components/Navbar";
import Products from "./components/products/Products";
import ProductView from "./components/ProductView";
import Register from "./components/forms/Register";
import Login from "./components/forms/Login";
import UserManagement from "./components/UserManagment";

function App() {
  return (
    <BrowserRouter>
      <Route path="/">
        <Navbar />
      </Route>

      <Switch>
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:id" component={ProductView} />
        <Route exact path="/edit-products/:id" component={ManageProduct} />
        <Route exact path="/manage-products" component={ManageProduct} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
        <Route exact path="/users" component={UserManagement} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
