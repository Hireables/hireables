/* global Routes */

import React from 'react';
import Relay from 'react-relay';

const Name = props => (
  <div className="name">
    <a
      href={Routes.developer_path(props.developer.login)}
      target="_blank"
      style={{ textDecoration: 'none', color: 'inherit' }}
      rel="noopener noreferrer"
    >
      <h3 style={{ margin: 0, fontWeight: '500' }}>
        {props.developer.name ? props.developer.name : 'Anonymous'}
      </h3>
    </a>
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
