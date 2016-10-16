/* global $ */
import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import DeveloperStatus from './developer_status.es6';
import DeveloperMeta from './developer_meta.es6';

const developerStyle = {
  fontWeight: '500',
  backgroundColor: 'white',
};

const paragraphStyles = {
  height: 'auto',
  paddingRight: '10px',
};

const Developer = props => (
  <div
    style={developerStyle}
    className={`developer developer--item ${props.developer.premium ? 'premium' : ''}`}
    id={`developer_${props.developer.id}`}
  >
    <ListItem
      leftAvatar={<Avatar src={props.developer.avatar_url} />}
      rightIconButton={(
        <DeveloperMeta
          positionClass="pull-right"
          developer={props.developer}
        />
      )}
      secondaryText={
        <DeveloperStatus developer={props.developer} />
      }
      primaryText={props.developer.name}
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
        ${PremiumDeveloperStatus.getFragment('developer')},
        ${DeveloperStatus.getFragment('developer')},
        ${DeveloperMeta.getFragment('developer')},
      }
    `,
  },
});

export default DeveloperContainer;
