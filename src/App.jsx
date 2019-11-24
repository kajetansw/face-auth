import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import * as faceapi from 'face-api.js';

import Register from './Register/Register';
import Login from './Login/Login';
import Home from './Home/Home';
import FaceSnapshots from './FaceSnapshots/FaceSnapshots';

import './App.css';

export default class App extends Component {
  state = {
    faceSnapshots: [],
    learningModelsLoaded: false
  };

  learningModelsLoaded = false;

  componentDidMount = () => {
    this.loadLearningModels();
  }

  handleAddFaceSnapshot = (newSnapshot) => {
    this.setState((prevState, props) => {
      return { faceSnapshots: [...prevState.faceSnapshots, newSnapshot] };
    });
  }

  loadLearningModels = () => {
    const path = process.env.PUBLIC_URL + '/models';
    Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri(path),
      faceapi.nets.faceLandmark68Net.loadFromUri(path),
      faceapi.nets.ssdMobilenetv1.loadFromUri(path)
    ]).then(() => this.setState({ learningModelsLoaded: true }));
  }

  render() {
    return (
      <BrowserRouter>
        {!this.state.learningModelsLoaded && 'Loading models...'}
        {this.state.learningModelsLoaded && <nav>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </nav>}

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
