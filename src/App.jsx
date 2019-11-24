import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';

import Register from './Register/Register';
import Login from './Login/Login';
import Home from './Home/Home';
import FaceSnapshots from './FaceSnapshots/FaceSnapshots';

import './App.css';

export default class App extends Component {
  state = {
    faceSnapshots: []
  };

  handleAddFaceSnapshot = (newSnapshot) => {
    this.setState((prevState, props) => {
      return { faceSnapshots: [...prevState.faceSnapshots, newSnapshot] };
    });
  }

  render() {
    return (
      <BrowserRouter>
        <nav>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </nav>

        <FaceSnapshots snapshots={this.state.faceSnapshots}/>

        <Switch>
          <Route path="/register">
            <Register onAddSnapshot={this.handleAddFaceSnapshot}/>
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
