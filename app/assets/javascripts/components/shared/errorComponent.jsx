import React from 'react';

// Error component
const ErrorComponent = (props) => (
  <div className="overlay">
    <div className="error">
      Something went wrong...
      <a onClick={props.retry}>
        Retry
      </a>
    </div>
  </div>
);

ErrorComponent.propTypes = {
  retry: React.PropTypes.func,
};

export default ErrorComponent;
