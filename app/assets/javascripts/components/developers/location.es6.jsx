import React from 'react';
import Relay from 'react-relay';

const Location = props => (
  <div className="location" style={{ marginTop: '5px' }}>
    <span style={{ color: '#333', fontWeight: '400' }}>
      <small>{props.developer.location}</small>
    </span>
  </div>
);

Location.propTypes = {
  developer: React.PropTypes.object,
};

const LocationContainer = Relay.createContainer(
  Location, {
    fragments: {
      developer: () => Relay.QL`
        fragment on Developer {
          location,
        }
      `,
    },
  }
);

export default LocationContainer;
