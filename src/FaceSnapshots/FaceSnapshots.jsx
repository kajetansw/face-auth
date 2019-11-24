import React, { Component } from 'react';

import './FaceSnapshots.css';

export default class FaceSnapshots extends Component {
  render() {
    return (
      <div className="FaceSnapshots__container">
        {this.props.snapshots.map((image, idx) => (
          <img 
            className="FaceSnapshots__image" 
            src={image} 
            alt={`Face sample number ${idx}`}
          />
        ))}
      </div>
    );
  }
}