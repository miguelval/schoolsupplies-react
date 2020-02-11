import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/app';
import Home from './components/views/home';
import Contact from './components/views/contact';
import Product from './components/views/product';
import Login from './components/views/login';
import Cart from './components/views/cart';

export default (
  <Route path='/' component={App}>
    <IndexRoute component={Home} />
    <Route path='contact' component={Contact} />
    <Route path='login' component={Login} />
    <Route path='product/:id' component={Product} />
    <Route path='cart' component={Cart} />
    <Route path='*' component={Home} />
  </Route>
);