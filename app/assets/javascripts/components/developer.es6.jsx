/* global $ */
import React from 'react';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import DeveloperStatus from './developer_status.es6';
import DeveloperMeta from './developer_meta.es6';

const developerStyle = {
  fontWeight: '500',
};

const paragraphStyles = {
  height: 'auto',
};

const Developer = props => (
  <div
    style={developerStyle}
    className="developer developer--item"
    id={`developer_${props.developer.id}`}
  >
    <ListItem
      leftAvatar={<Avatar src={props.developer.avatar_url} />}
      rightIconButton={(
        <DeveloperMeta
          positionClass="pull-right"
          followers={props.developer.followers}
          gists={props.developer.public_gists}
          repos={props.developer.public_repos}
        />
      )}
      secondaryText={
        <DeveloperStatus developer={props.developer} />
      }
      primaryText={props.developer.name}
      disabled={true}
      style={paragraphStyles}
      secondaryTextLines={1}
    />
  </div>
);


Developer.propTypes = {
  developer: React.PropTypes.object,
};

export default Developer;
