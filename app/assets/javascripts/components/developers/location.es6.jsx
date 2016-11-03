import React from 'react';
import Relay from 'react-relay';

const Location = props => (
  <div
    className="location"
    style={{ color: 'rgba(0, 0, 0, 0.7)', fontWeight: 400, marginTop: 5 }}
  >
    <a
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: 'inherit', textDecoration: 'none' }}
      onClick={event => event.stopPropagation()}
      href={`/search?location=${props.developer.location}`}
    >
      <small>Based in {props.developer.location}</small>
    </a>
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
