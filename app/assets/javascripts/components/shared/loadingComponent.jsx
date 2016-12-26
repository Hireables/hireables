import React from 'react';
import Loader from 'react-loader';

const LoadingComponent = props => (
  <div className={`overlay ${props.cssClass || 'absolute'}`}>
    <Loader loaded={false} />
  </div>
);

LoadingComponent.propTypes = {
  cssClass: React.PropTypes.string,
};

export default LoadingComponent;
