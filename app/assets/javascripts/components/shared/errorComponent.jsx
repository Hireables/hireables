import React from 'react';

// Error component
const ErrorComponent = (props) => (
  <div className="overlay">
    <div className="error">
      Something went wrong loading this page...
      <a onClick={props.retry} href='#'>
        Retry again
      </a>
    </div>
  </div>
);

ErrorComponent.propTypes = {
  retry: React.PropTypes.func,
};

export default ErrorComponent;
