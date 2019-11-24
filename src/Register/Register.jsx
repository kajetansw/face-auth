import React, { Component, createRef } from 'react';

export default class Register extends Component {
  videoRef;

  constructor(props) {
    super(props);
    this.videoRef = createRef();
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

  render() {
    return (
      <React.Fragment>
        <video autoPlay="true" id="webcam" ref={this.videoRef}></video>
      </React.Fragment>
    );
  }
}