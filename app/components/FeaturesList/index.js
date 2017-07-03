/**
 * Created by orel- on 03/Jul/17.
 */
import React from 'react';

const FeaturesList = props => (
  <div className="features-list w-100 d-flex flex-column align-items-center">
    <h3>Fully customizable</h3>
    <div className="d-flex w-100 padding-30 flex-row justify-content-between align-items-center features-row">
      <div className="d-flex flex-column feature-item align-items-center">
        <img className="feature-img" src="/static/img/feature-location.png" />
        <h5>Choose Location</h5>
      </div>
      <div className="d-flex flex-column feature-item align-items-center">
        <img className="feature-img" src="/static/img/feature-days.png" />
        <h5>Adjust Length</h5>
      </div>
      <div className="d-flex flex-column feature-item align-items-center">
        <img className="feature-img" src="/static/img/feature-orientation.png" />
        <h5>Select Orientation</h5>
      </div>
    </div>
  </div>
);

export default FeaturesList;