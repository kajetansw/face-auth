import React, { Component } from 'react';

import './SampleFaceImages.css';

export default class SampleFaceImages extends Component {
  render() {
    return (
      <div className="SampleFaceImages__container">
        {this.props.faceImages.map((image, idx) => (
          <img 
            className="SampleFaceImages__image" 
            src={image} 
            alt={`Face sample number ${idx}`}
          />
        ))}
      </div>
    );
  }
}