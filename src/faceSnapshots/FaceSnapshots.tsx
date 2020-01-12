import React, { Component } from 'react';

import './FaceSnapshots.css';

type FaceSnapshotsProps = {
  snapshots: string[];
};

export default class FaceSnapshots extends Component<FaceSnapshotsProps> {
  render() {
    return (
      <div className="FaceSnapshots__container">
        {this.props.snapshots.map((image, idx) => (
          <img 
            className="FaceSnapshots__image" 
            src={image}
            key={idx}
            alt={`Face sample number ${idx}`}
          />
        ))}
      </div>
    );
  }
}