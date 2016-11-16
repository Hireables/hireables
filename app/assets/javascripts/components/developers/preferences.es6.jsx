/* eslint-disable jsx-a11y/no-static-element-interactions, no-nested-ternary */
/* global $ ga location window Routes */

// Modules
import React from 'react';
import Relay from 'react-relay';
import FontIcon from 'material-ui/FontIcon';
import Chip from 'material-ui/Chip';
import Avatar from 'material-ui/Avatar';
import { css } from 'aphrodite';

// Stylesheet
import iconStyles from '../styles/icons.es6';

const Links = props => (
  <div className="links">
    <div className={css(iconStyles.links)}>
      {props.developer.remote ?
        <Chip
          labelStyle={{ fontSize: 14 }}
          className={css(iconStyles.linkIcon)}
        >
          <Avatar
            className={css(iconStyles.iconAvatar)}
            icon={
              <FontIcon
                className={`material-icons ${css(iconStyles.chipIcon)}`}
              >settings_remote</FontIcon>
            }
          />
          Remote
        </Chip> : ''
      }

      {props.developer.relocate ?
        <Chip
          labelStyle={{ fontSize: 14 }}
          className={css(iconStyles.linkIcon)}
        >
          <Avatar
            className={css(iconStyles.iconAvatar)}
            icon={
              <FontIcon
                className={`material-icons ${css(iconStyles.chipIcon)}`}
              >location_on</FontIcon>}
          />
          Relocate
        </Chip> : ''
      }
    </div>
  </div>
);

Links.propTypes = {
  developer: React.PropTypes.object,
};

const LinksContainer = Relay.createContainer(
  Links, {
    fragments: {
      developer: () => Relay.QL`
        fragment on Developer {
          remote,
          relocate
          hireable,
        }
      `,
    },
  }
);

export default LinksContainer;
