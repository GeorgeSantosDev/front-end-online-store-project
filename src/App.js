import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import Provider from './context/Provider';
import Home from './pages/Home';

function App() {
  return (
    <Provider>
      <BrowserRouter>
        <Switch>
          <Route exact path="/" component={ Home } />
          {/* <Route exact path="/shoppingcart" component={ ShoppingCart } />
          <Route exact path="/productdetails/:id" component={ ProductDetails } />
          <Route exact path="/checkout" component={ Checkout } /> */}
        </Switch>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
