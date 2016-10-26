/* global Routes */

import React from 'react';
import Relay from 'react-relay';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Languages from './languages.es6';
import muiTheme from './theme.es6';
import DeveloperLinks from './developer_links.es6';
import DeveloperMeta from './developer_meta.es6';
import DeveloperBio from './developer_bio.es6';
import JobTypes from './job_types.es6';
import Compensation from './compensation.es6';
import DeveloperLocation from './developer_location.es6';

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
  left: 75,
  textAlign: 'center',
  top: 6,
  zIndex: 10,
  boxShadow: 'rgba(63, 67, 69, 0.298039) 0px 0px 16px 0px',
  border: '1px solid white',
};

const DeveloperShow = (props) => {
  const wrapperStyle = {
    paddingTop: '60px',
    paddingBottom: '60px',
    textAlign: 'center',
  };

  const linkStyles = {
    textStyle: 'none',
    textDecoration: 'none',
    color: '#333',
  };

  const { developer } = props;

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className={`developers-show ${developer.premium ? 'premium' : ''}`}>
        <header className="header header--bg">
          <div className="container">
            <div style={wrapperStyle}>
              <RaisedButton
                label="Update profile"
                secondary
                className="edit-link"
                href={Routes.edit_developer_path(developer.login)}
              />

              <div
                style={{
                  position: 'relative',
                  maxWidth: 100,
                  margin: '0 auto',
                }}
              >
                {developer.hireable ? <div style={badgeStyles}> H </div> : ''}
                <Avatar
                  src={developer.avatar_url}
                  size={100}
                  className="avatar"
                />
              </div>

              <div className="basic-info">
                <h1 className="name no-margin">
                  <a href={developer.html_url} style={linkStyles}>
                    {developer.name}
                  </a>
                </h1>
              </div>
              <DeveloperLocation developer={props.developer} />
              <DeveloperBio developer={developer} />
              <DeveloperLinks developer={developer} />
              <Languages developer={developer} />
              <JobTypes developer={developer} />
              <Compensation developer={developer} />
              <DeveloperMeta developer={developer} />
            </div>
          </div>
        </header>
      </div>
    </MuiThemeProvider>
  );
};

DeveloperShow.propTypes = {
  developer: React.PropTypes.object,
};

const DeveloperShowContainer = Relay.createContainer(DeveloperShow, {
  fragments: {
    developer: () => Relay.QL`
      fragment on Developer {
        id,
        name,
        avatar_url,
        login,
        hireable,
        ${DeveloperLocation.getFragment('developer')}
        ${Languages.getFragment('developer')},
        ${JobTypes.getFragment('developer')},
        ${DeveloperMeta.getFragment('developer')},
        ${DeveloperLinks.getFragment('developer')},
        ${DeveloperBio.getFragment('developer')},
        ${Compensation.getFragment('developer')},
      }
    `,
  },
});

export default DeveloperShowContainer;
