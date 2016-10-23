/* global $ */
import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import FontIcon from 'material-ui/FontIcon';
import IconButton from 'material-ui/IconButton';
import DeveloperStatus from './developer_status.es6';
import DeveloperMeta from './developer_meta.es6';

const paragraphStyles = {
  height: 'auto',
  paddingRight: '10px',
};

const iconStyles = {
  position: 'absolute',
  top: '4px',
  padding: '12px',
};

const Developer = props => (
  <div
    id={`developer_${props.developer.id}`}
    className={
      `developer developer--item ${props.developer.premium ? 'premium' : ''}`
    }
  >
    <ListItem
      innerDivStyle={{ padding: '20px 10px 16px 115px' }}
      leftAvatar={
        <Avatar src={props.developer.avatar_url} size={80} />
      }
      rightIconButton={(
        <DeveloperMeta
          positionClass="pull-right meta"
          developer={props.developer}
        />
      )}
      secondaryText={
        <DeveloperStatus developer={props.developer} />
      }
      primaryText={
        <div>
          {props.developer.name}
          {props.developer.premium ?
            <IconButton
              tooltip="Premium profile"
              tooltipPosition="bottom-center"
              style={iconStyles}
            >
              <FontIcon
                className="material-icons"
              >
                grade
              </FontIcon>
            </IconButton> :
              <IconButton
                iconClassName="muidocs-icon-custom-github"
                disableTouchRipple
                tooltip="Github profile"
                tooltipPosition="bottom-center"
                style={iconStyles}
              />
          }
        </div>
      }
      disabled
      style={paragraphStyles}
      secondaryTextLines={1}
    />
  </div>
);

Developer.propTypes = {
  developer: React.PropTypes.object,
};

const DeveloperContainer = Relay.createContainer(Developer, {
  fragments: {
    developer: () => Relay.QL`
      fragment on Developer {
        id,
        name,
        avatar_url,
        premium,
        ${DeveloperStatus.getFragment('developer')},
        ${DeveloperMeta.getFragment('developer')},
      }
    `,
  },
});

export default DeveloperContainer;
