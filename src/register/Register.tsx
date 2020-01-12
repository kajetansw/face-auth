import React, { Component, createRef } from 'react';
import { stopWebCam, startWebCam } from '../utils/web-cam';
import { captureSnapshot } from '../utils/capture-snapshot';

import './Register.css';

type RegisterProps = {
  onAddSnapshot: (snapshot: string) => void;
  onRegister: () => void;
};

export default class Register extends Component<RegisterProps> {
  videoRef: React.RefObject<HTMLVideoElement>;
  canvasRef: React.RefObject<HTMLCanvasElement>;

  constructor(props: RegisterProps) {
    super(props);
    this.videoRef = createRef();
    this.canvasRef = createRef();
  }

  componentDidMount() {
    startWebCam(this.videoRef!.current);
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