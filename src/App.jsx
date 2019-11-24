import React from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import Register from './Register/Register';
import Login from './Login/Login';
import Home from './Home/Home';

import './App.css';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/register">Register</Link>
        <Link to="/login">Login</Link>
      </nav>

      <Switch>
        <Route path="/register">
          <Register />
        </Route>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch> 
    </BrowserRouter>
  );
}

export default App;
