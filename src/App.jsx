import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';

import Register from './Register/Register';
import Login from './Login/Login';
import Home from './Home/Home';
import SampleFaceImages from './SampleFaceImages/SampleFaceImages';

import './App.css';

export default class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <nav>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </nav>

        <SampleFaceImages />

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
}
