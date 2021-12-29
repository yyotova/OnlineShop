import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./components/products/Products";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/"><Products/></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
