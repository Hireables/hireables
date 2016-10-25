import React from 'react';
import Relay from 'react-relay';

const DeveloperLocation = props => (
  <div className="location" style={{ marginTop: '5px' }}>
    <span style={{ color: '#333', fontWeight: '400' }}>
      <small>{props.developer.location}</small>
    </span>
  </div>
);

DeveloperLocation.propTypes = {
  developer: React.PropTypes.object,
};

const DeveloperLocationContainer = Relay.createContainer(
  DeveloperLocation, {
    fragments: {
      developer: () => Relay.QL`
        fragment on Developer {
          location,
        }
      `,
    },
  }
);

export default DeveloperLocationContainer;
