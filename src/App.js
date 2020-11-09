import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./App.css";
import Home from "./components/routers/Home";
import Catalogue from "./components/routers/Catalogue";
import Purchase from "./components/routers/Purchase";

const App = () => {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState({
    code: "",
    numOfCartons: 0,
    numOfUnits: 0,
  });

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/catalogue">Catalogue</Link>
          </li>
          <li>
            <Link to="/purchase">Purchase</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route path="/catalogue">
          <Catalogue products={products} setProducts={setProducts} />
        </Route>
        <Route path="/purchase">
          <Purchase
            order={order}
            setOrder={setOrder}
            products={products}
            setProducts={setProducts}
          />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  );
};

export default App;
