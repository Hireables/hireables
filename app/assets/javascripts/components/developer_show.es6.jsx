/* global Routes */

import React from 'react';
import Relay from 'react-relay';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Languages from './languages.es6';
import muiTheme from './theme.es6';
import JobTypes from './job_types.es6';
import Levels from './levels.es6';
import Meta from './meta.es6';
import Links from './links.es6';
import Name from './name.es6';
import Location from './location.es6';
import Bio from './bio.es6';

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
  left: 115,
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
    display: 'flex',
  };

  const { developer } = props;

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className={`developers-show ${developer.premium ? 'premium' : ''}`}>
        <header className="header header--bg">
          <div className="container">
            <div style={wrapperStyle}>
              <RaisedButton
                label="Edit profile"
                secondary
                className="edit-link"
                href={Routes.edit_developer_path(developer.login)}
              />

              <div
                className="image"
                style={{
                  position: 'relative',
                  minWidth: 200,
                }}
              >
                {developer.hireable ? <div style={badgeStyles}> H </div> : ''}
                <Avatar
                  src={developer.avatar_url}
                  size={150}
                />

                <Meta developer={developer} />
              </div>

              <div
                className="profile"
                style={{ marginLeft: 50 }}
              >
                <Name developer={props.developer} />
                <Location developer={props.developer} />
                <Bio developer={developer} />
                <Links developer={developer} />
                <div className="header-separator top-margin">Platforms</div>
                <Languages developer={developer} />
                <div className="header-separator top-margin">Job Types</div>
                <JobTypes developer={developer} />
                <div className="header-separator top-margin">Levels</div>
                <Levels developer={developer} />
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
        avatar_url,
        login,
        hireable,
        ${Name.getFragment('developer')}
        ${Location.getFragment('developer')}
        ${Languages.getFragment('developer')},
        ${JobTypes.getFragment('developer')},
        ${Levels.getFragment('developer')},
        ${Meta.getFragment('developer')},
        ${Links.getFragment('developer')},
        ${Bio.getFragment('developer')},
      }
    `,
  },
});

export default DeveloperShowContainer;
