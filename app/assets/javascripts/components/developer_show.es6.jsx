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

              <Avatar
                src={developer.avatar_url}
                size={100}
                className="avatar"
              />

              <div className="basic-info">
                <h1 className="name no-margin">
                  <a href={developer.html_url} style={linkStyles}>
                    {developer.name}
                  </a>
                </h1>
              </div>

              <DeveloperBio developer={props.developer} />
              <DeveloperLinks developer={props.developer} />
              <Languages languages={developer.platforms} />

              <div className="p-t-20">
                <DeveloperMeta developer={developer} />
              </div>
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
        platforms,
        ${DeveloperMeta.getFragment('developer')}
        ${DeveloperLinks.getFragment('developer')}
        ${DeveloperBio.getFragment('developer')}
      }
    `,
  },
});

export default DeveloperShowContainer;
