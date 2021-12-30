import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Products from "./components/products/Products";
import Register from "./components/forms/Register";
import Login from "./components/forms/Login";
import UserManagement from "./components/UserManagment";

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <Switch>
        <Route exact path="/"><Products/></Route>
        <Route exact path="/register"><Register/></Route>
        <Route exact path="/login"><Login/></Route>
        <Route exact path="/users"><UserManagement/></Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
