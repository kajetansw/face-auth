import React, { Component, createRef } from 'react';

import './Register.css';
import { stopWebCam, startWebCam } from '../utils/web-cam';
import { captureSnapshot } from '../utils/capture-snapshot';

export default class Register extends Component {
  videoRef;
  canvasRef;

  constructor(props) {
    super(props);
    this.videoRef = createRef();
    this.canvasRef = createRef();
  }

  componentDidMount() {
    startWebCam(this.videoRef.current);
  }

  componentWillUnmount() {
    stopWebCam(this.videoRef.current);
  }

  takeSnapshot = () => {
    this.props.onAddSnapshot(captureSnapshot(this.videoRef.current, this.canvasRef.current));
  }

  render() {
    return (
      <React.Fragment>
        <video 
          autoPlay={true} 
          id="webcam" 
          ref={this.videoRef} 
          onClick={this.takeSnapshot}
        ></video>
        <canvas 
          className="Register__capturing-canvas" 
          ref={this.canvasRef}
          width="500" 
          height="350"
        ></canvas>
        <button onClick={this.props.onRegister}>REGISTER</button>
      </React.Fragment>
    );
  }
}