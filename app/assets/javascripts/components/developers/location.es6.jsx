/* global document Turbolinks */

import React from 'react';
import Relay from 'react-relay';
import queryString from 'query-string';
import _ from 'underscore';

const Location = (props) => {
  const { developer } = props;
  const queryObject = _.pick(
    queryString.parse(document.location.search),
    ['language', 'location', 'page', 'hireable', 'repos']
  );

  const query = (location) => {
    const newQuery = Object.assign(queryObject, { location });
    return queryString.stringify(newQuery);
  };

  return (
    <div
      className="location"
      style={{ color: 'rgba(0, 0, 0, 0.7)', fontWeight: 400, marginTop: 5 }}
    >
      <a
        target="_blank"
        rel="noopener noreferrer"
        style={{ color: 'inherit', textDecoration: 'none', cursor: 'pointer' }}
        onClick={(event) => {
          Turbolinks.visit(`/search?${query(developer.location)}`);
          event.stopPropagation();
        }}
      >
        <small>{developer.location}</small>
      </a>
    </div>
  );
};

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
