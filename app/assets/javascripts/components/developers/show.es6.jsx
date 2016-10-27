/* global Routes */

// Modules
import React from 'react';
import Relay from 'react-relay';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { css } from 'aphrodite';

// Child components
import Languages from './languages.es6';
import muiTheme from '../theme.es6';
import JobTypes from './jobTypes.es6';
import Levels from './levels.es6';
import Meta from './meta.es6';
import Links from './links.es6';
import Name from './name.es6';
import Location from './location.es6';
import Bio from './bio.es6';

// StyleSheets
import badgeStyles from '../styles/badges.es6';

const DeveloperShow = (props) => {
  const wrapperStyle = {
    paddingTop: '60px',
    paddingBottom: '60px',
    display: 'flex',
  };

  const { developer } = props;

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className={`profile--show ${developer.premium ? 'premium' : ''}`}>
        <header className="header header--bg">
          <div className="container">
            <div style={wrapperStyle}>
              <div
                className="image"
                style={{
                  position: 'relative',
                  minWidth: 200,
                }}
              >
                {developer.hireable ?
                  <div
                    className={
                      css(
                        badgeStyles.badge,
                        badgeStyles.hireable,
                        badgeStyles.big
                      )
                    }
                  > H </div> : ''
                }
                <Avatar
                  src={developer.avatar_url}
                  size={150}
                />
                <br /><br />
                <Meta developer={developer} />
                <br />
                <RaisedButton
                  label="Edit profile"
                  secondary
                  className="edit-link"
                  style={{ margin: '0 auto' }}
                  href={Routes.edit_developer_path(developer.login)}
                />
              </div>

              <div
                className="profile"
                style={{ marginLeft: 50 }}
              >
                <Name developer={props.developer} />
                <Location developer={props.developer} />
                <Bio developer={developer} />
                <Links developer={developer} />
                <Languages developer={developer} />
                <JobTypes developer={developer} />
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
