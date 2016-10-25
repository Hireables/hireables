/* global Routes */

import React from 'react';
import Relay from 'react-relay';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';

const iconStyles = {
  position: 'absolute',
  top: '4px',
  padding: '12px',
};

const DeveloperName = props => (
  <div className="name">
    <a
      href={Routes.developer_path(props.developer.login)}
      target="_blank"
      style={{ textDecoration: 'none', color: 'inherit' }}
      rel="noopener noreferrer"
    >
      {props.developer.name ? props.developer.name : 'Anonymous'}
    </a>
    {props.developer.premium ?
      <IconButton
        tooltip="Premium profile"
        tooltipPosition="bottom-center"
        style={iconStyles}
      >
        <ActionGrade />
      </IconButton> : ''
    }
  </div>
);

DeveloperName.propTypes = {
  developer: React.PropTypes.object,
};

const DeveloperNameContainer = Relay.createContainer(
  DeveloperName, {
    fragments: {
      developer: () => Relay.QL`
        fragment on Developer {
          name,
          premium,
          login,
        }
      `,
    },
  }
);

export default DeveloperNameContainer;
