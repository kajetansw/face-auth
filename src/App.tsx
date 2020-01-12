import React, { Component } from 'react';
import { BrowserRouter, Link, Switch, Route } from 'react-router-dom';
import * as faceapi from 'face-api.js';

import Register from './Register/Register';
import Login from './Login/Login';
import Home from './Home/Home';
import FaceSnapshots from './FaceSnapshots/FaceSnapshots';

import './App.css';

type AppState = {
  faceSnapshots: string[];
  learningModelsLoaded: boolean;
  faceMatcher: faceapi.FaceMatcher | null
};

export default class App extends Component<{}, AppState> {
  state: AppState = {
    faceSnapshots: [],
    learningModelsLoaded: false,
    faceMatcher: null
  };

  componentDidMount = () => {
    this.loadLearningModels();
  }

  handleAddFaceSnapshot = (newSnapshot: string) => {
    this.setState((prevState, props) => {
      return { faceSnapshots: [...prevState.faceSnapshots, newSnapshot] };
    });
  }

  loadLearningModels = () => {
    const path = process.env.PUBLIC_URL + '/models';
    return Promise.all([
      faceapi.nets.faceRecognitionNet.loadFromUri(path),
      faceapi.nets.faceLandmark68Net.loadFromUri(path),
      faceapi.nets.ssdMobilenetv1.loadFromUri(path)
    ]).then(() => this.setState({ learningModelsLoaded: true }));
  }

  loadLabeledFaceDescriptorsFromSnapshots = async () => {
    const descriptions: Float32Array[] = [];
    for (const snapshot of this.state.faceSnapshots) {
      const imgEl = await faceapi.fetchImage(snapshot);
      const detections = await faceapi.detectSingleFace(imgEl)
        .withFaceLandmarks()
        .withFaceDescriptor();

      descriptions.push(detections!.descriptor);
    }
    return Promise.all([
      new faceapi.LabeledFaceDescriptors('user', descriptions)
    ]);
  }

  createFaceMatcher = async () => {
    const labeledFaceDescriptors = await this.loadLabeledFaceDescriptorsFromSnapshots();
    const levelOfConfidence = 0.6;
    return new faceapi.FaceMatcher(labeledFaceDescriptors, levelOfConfidence);
  }

  updateFaceMatcher = () => {
    this.createFaceMatcher().then(faceMatcher => 
      this.setState({ faceMatcher })
    );
  }

  matchLoginToCollectedSnapshots = async (imgSrc: string) => {
    const image = await faceapi.fetchImage(imgSrc);
    const detection = await faceapi
      .detectSingleFace(image)
      .withFaceLandmarks()
      .withFaceDescriptor();
    const displaySize = { width: image.width, height: image.height };

    if (!!detection && !!this.state.faceMatcher) {
      const resizedDetections = faceapi.resizeResults([detection], displaySize);
      const results = resizedDetections.map(d => 
        this.state.faceMatcher!.findBestMatch(d.descriptor)
      );
      const [firstResult] = results;
      console.log('Logged in: ', firstResult.toString().startsWith('user'))
    } else {
      console.error('No face detected!');
    }
  }

  render() {
    return (
      <BrowserRouter>
        {!this.state.learningModelsLoaded && 'Loading models...'}
        {this.state.learningModelsLoaded && <nav>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </nav>}

        <FaceSnapshots snapshots={this.state.faceSnapshots}/>

        <Switch>
          <Route path="/register">
            <Register 
              onAddSnapshot={this.handleAddFaceSnapshot}
              onRegister={this.updateFaceMatcher}
            />
          </Route>
          <Route path="/login">
            <Login onLogin={this.matchLoginToCollectedSnapshots}/>
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}
