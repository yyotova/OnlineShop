import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./components/products/Products";
import ProductView from "./components/productView/ProductView";

function App() {
  return (
    <BrowserRouter>
      <Route path="/">
        <Navbar />
      </Route>

      <Switch>
        <Route exact path="/products" component={Products} />
        <Route exact path="/products/:id" component={ProductView} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
