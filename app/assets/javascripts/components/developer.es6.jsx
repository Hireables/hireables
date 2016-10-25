/* global $ Routes */

import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import DeveloperMeta from './developer_meta.es6';
import DeveloperLinks from './developer_links.es6';
import DeveloperName from './developer_name.es6';
import DeveloperLocation from './developer_location.es6';
import DeveloperBio from './developer_bio.es6';

const paragraphStyles = {
  height: 'auto',
  paddingRight: '10px',
};

const badgeStyles = {
  fontSize: 14,
  lineHeight: '24px',
  position: 'absolute',
  color: 'white',
  width: 24,
  height: 24,
  verticalAlign: 'middle',
  backgroundColor: '#66bb6a',
  fontWeight: 600,
  borderRadius: '100%',
  padding: 0,
  left: 65,
  textAlign: 'center',
  top: 6,
  zIndex: 10,
  boxShadow: 'rgba(63, 67, 69, 0.298039) 0px 0px 16px 0px',
  border: '1px solid white',
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
        <a
          href={Routes.developer_path(props.developer.login)}
          target="_blank"
          style={{ textDecoration: 'none', color: 'inherit' }}
          rel="noopener noreferrer"
        >
          {props.developer.hireable ? <div style={badgeStyles}> H </div> : ''}
          <Avatar src={props.developer.avatar_url} size={80} />
        </a>
      }
      disabled
      style={paragraphStyles}
      secondaryTextLines={1}
    >
      <DeveloperName developer={props.developer} />
      <DeveloperLocation developer={props.developer} />
      <div style={{ position: 'absolute', right: 0, top: '10px' }}>
        <DeveloperMeta developer={props.developer} />
      </div>
      <DeveloperBio developer={props.developer} />
      <DeveloperLinks developer={props.developer} />
    </ListItem>
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
        avatar_url,
        hireable,
        login,
        premium,
        ${DeveloperName.getFragment('developer')},
        ${DeveloperLinks.getFragment('developer')},
        ${DeveloperMeta.getFragment('developer')},
        ${DeveloperLocation.getFragment('developer')},
        ${DeveloperBio.getFragment('developer')},
      }
    `,
  },
});

export default DeveloperContainer;
