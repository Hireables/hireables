/* global Routes */

// Modules
import React from 'react';
import Relay from 'react-relay';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

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
import Orgs from './orgs.es6';
import Company from './company.es6';
import Actions from './actions.es6';
import Achievements from './achievements.es6';
import Preferences from './preferences.es6';

// StyleSheets
import '../styles/profile.sass';

// Utils
import CurrentUser from '../../helpers/currentUser.es6';

const currentUser = new CurrentUser();

const DeveloperShow = (props) => {
  const { developer } = props;

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className={`profile--show ${developer.premium ? 'premium' : ''}`}>
        <header className="header header--bg">
          <div className="container">
            <div className="wrapper">
              <div className="image">
                {developer.hireable ?
                  <div className="badge hireable big"> H
                  <span className="full">ireable</span></div> :
                  !developer.company ?
                    <div className="badge hireable big maybe"> M
                    <span className="full">ay be hireable</span></div> : ''
                }
                <Avatar
                  src={developer.avatar_url}
                  size={150}
                  className="avatar"
                />

                <br />
                {currentUser.isEmployer ? <Actions developer={developer} /> : ''}
                <Meta developer={developer} />
                <Orgs developer={developer} />
              </div>
              <div className="basic">
                <Name developer={developer} />
                <div style={{ display: 'flex' }}>
                  <Location developer={developer} />
                  <Company developer={developer} />
                </div>
                <Bio developer={developer} />
                <Links developer={developer} signedIn={props.signedIn} />
                <Languages developer={developer} />
                {props.signedIn ?
                  <div className="pro-info">
                    <JobTypes developer={developer} />
                    <Preferences developer={developer} />
                    <Levels developer={developer} />
                  </div> : ''
                }
              </div>

              {developer.premium ?
                <div className="premium-badge">
                  Premium
                </div> : ''
              }
            </div>
          </div>
          <Achievements developer={developer} />
        </header>
      </div>
    </MuiThemeProvider>
  );
};

DeveloperShow.propTypes = {
  developer: React.PropTypes.object,
  signedIn: React.PropTypes.bool,
};

const DeveloperShowContainer = Relay.createContainer(DeveloperShow, {
  fragments: {
    developer: () => Relay.QL`
      fragment on Developer {
        id,
        avatar_url,
        login,
        hireable,
        premium,
        company,
        ${Preferences.getFragment('developer')}
        ${Achievements.getFragment('developer')},
        ${Name.getFragment('developer')},
        ${Company.getFragment('developer')},
        ${Orgs.getFragment('developer')},
        ${Location.getFragment('developer')}
        ${Languages.getFragment('developer')},
        ${JobTypes.getFragment('developer')},
        ${Levels.getFragment('developer')},
        ${Meta.getFragment('developer')},
        ${Links.getFragment('developer')},
        ${Bio.getFragment('developer')},
        ${Actions.getFragment('developer')}
      }
    `,
  },
});

export default DeveloperShowContainer;
