import React, { Component, createRef } from 'react';

import './Register.css';

export default class Register extends Component {
  videoRef;
  canvasRef;

  constructor(props) {
    super(props);
    this.videoRef = createRef();
    this.canvasRef = createRef();
  }

  componentDidMount() {
    this.initializeWebCam();
  }

  componentWillUnmount() {
    this.stopWebCam();
  }

  initializeWebCam = () => {
    if (navigator.mediaDevices.getUserMedia) {
      navigator.mediaDevices.getUserMedia({ video: true })
        .then(stream => this.videoRef.current.srcObject = stream)
        .catch(console.error);
    }
  }

  stopWebCam = () => {
    const stream = this.videoRef.current.srcObject;
    const tracks = stream.getTracks();

    tracks.forEach(track => track.stop());

    this.videoRef.current.srcObject = null;
  }

  takeSnapshot = () => {
    const canvasEl = this.canvasRef.current;
    const canvasContext = canvasEl.getContext('2d');
    canvasContext.drawImage(this.videoRef.current, 0.0, 0.0, canvasEl.width, canvasEl.height);

    this.props.onAddImage(canvasEl.toDataURL('image/jpg'));
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
      </React.Fragment>
    );
  }
}