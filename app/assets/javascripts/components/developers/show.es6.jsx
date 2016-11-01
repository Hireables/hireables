/* global Routes */

// Modules
import React from 'react';
import Relay from 'react-relay';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { css } from 'aphrodite';
import ActionEdit from 'material-ui/svg-icons/image/edit';
import ActionDelete from 'material-ui/svg-icons/action/delete';

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
import '../styles/profile.sass';

const DeveloperShow = (props) => {
  const { developer } = props;

  return (
    <MuiThemeProvider muiTheme={muiTheme}>
      <div className={`profile--show ${developer.premium ? 'premium' : ''}`}>
        <header className="header header--bg">
          <div className="container">
            <div className="wrapper">
              <div
                className="image"
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

                {props.can_edit ?
                  <RaisedButton
                    primary
                    label="Edit"
                    icon={<ActionEdit />}
                    className="edit-link"
                    href={Routes.edit_developer_path(developer.login)}
                  /> : ''
                }

                {props.can_edit ?
                  <RaisedButton
                    primary
                    label="Delete"
                    icon={<ActionDelete />}
                    data-method="delete"
                    data-confirm="This will delete your account. Okay?"
                    className="edit-link"
                    style={{ marginTop: 20, marginLeft: 10 }}
                    href={Routes.cancel_developer_registration_path()}
                  /> : ''
                }
              </div>

              <div className="profile">
                <Name developer={developer} />
                <Location developer={developer} />
                <Bio developer={developer} />
                <Links developer={developer} />
                <div className="clearfix" />
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
  can_edit: React.PropTypes.bool,
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
        premium,
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
