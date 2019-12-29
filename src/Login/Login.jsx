import React, { Component, createRef } from 'react';

import './Login.css';
import { startWebCam, stopWebCam } from '../utils/web-cam';
import { captureSnapshot } from '../utils/capture-snapshot';

export default class Login extends Component {
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
    this.props.onLogin(captureSnapshot(this.videoRef.current, this.canvasRef.current));
  }

  render() {
    return (
      <React.Fragment>
        <video 
          autoPlay={true} 
          id="webcam" 
          ref={this.videoRef} 
        ></video>
        <canvas 
          className="Login__capturing-canvas" 
          ref={this.canvasRef}
          width="500" 
          height="350"
        ></canvas>

        <button onClick={this.takeSnapshot}>LOGIN</button>
      </React.Fragment>
    );
  }
}