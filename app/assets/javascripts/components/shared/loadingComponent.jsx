import React from 'react';
import Loader from 'react-loader';

// Loading component //TODO
const LoadingComponent = () => (
  <div className='overlay'>
    <Loader loaded={false} />
  </div>
);

export default LoadingComponent;
