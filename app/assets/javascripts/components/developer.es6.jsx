/* global $ Routes */

import React from 'react';
import Relay from 'react-relay';
import { ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import IconButton from 'material-ui/IconButton';
import ActionGrade from 'material-ui/svg-icons/action/grade';
import Meta from './meta.es6';
import Links from './links.es6';
import Name from './name.es6';
import JobTypes from './job_types.es6';
import Location from './location.es6';
import Bio from './bio.es6';

const iconStyles = {
  position: 'absolute',
  padding: 0,
  left: 'calc(104px / 3)',
  textAlign: 'center',
  width: 24,
  height: 24,
  top: 85,
};

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
          {props.developer.premium ?
            <IconButton
              tooltip="Premium profile"
              tooltipStyles={{ top: '15px', backgroundColor: '#000' }}
              tooltipPosition="bottom-center"
              style={iconStyles}
            >
              <ActionGrade />
            </IconButton> : ''
          }
        </a>
      }
      disabled
      style={paragraphStyles}
      secondaryTextLines={1}
    >
      <Name developer={props.developer} />
      <Location developer={props.developer} />
      <div style={{ position: 'absolute', right: 0, top: '10px' }}>
        <Meta developer={props.developer} />
      </div>
      <Bio developer={props.developer} />
      <Links developer={props.developer} />
      <JobTypes developer={props.developer} />
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
        ${Name.getFragment('developer')},
        ${Links.getFragment('developer')},
        ${JobTypes.getFragment('developer')},
        ${Meta.getFragment('developer')},
        ${Location.getFragment('developer')},
        ${Bio.getFragment('developer')},
      }
    `,
  },
});

export default DeveloperContainer;
