/* global Routes */

import React from 'react';
import Relay from 'react-relay';

const Name = props => (
  <div className="name">
    <h3
      style={{
        margin: 0,
        fontWeight: '500',
        whiteSpace: 'nowrap',
        width: 260,
        textOverflow: 'ellipsis',
        overflow: 'hidden',
      }}
    >
      {props.developer.name ? props.developer.name : 'Anonymous'}
    </h3>
  </div>
);

Name.propTypes = {
  developer: React.PropTypes.object,
};

const NameContainer = Relay.createContainer(
  Name, {
    fragments: {
      developer: () => Relay.QL`
        fragment on Developer {
          name,
          login,
        }
      `,
    },
  }
);

export default NameContainer;
