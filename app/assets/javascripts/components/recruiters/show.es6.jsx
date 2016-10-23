/* global Routes */

import React from 'react';
import Relay from 'react-relay';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { grey700 } from 'material-ui/styles/colors';

const RecruiterShow = (props) => {
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

  const { recruiter } = props;
  return (
    <MuiThemeProvider>
      <div className="recruiters-show">
        <header className="header header--bg">
          <div className="container">
            <div style={wrapperStyle}>
              <Avatar src={recruiter.avatar_url} size={100} />
              <h1 className="no-margin">
                <a href={Routes.recruiter_path(recruiter.id)} style={linkStyles}>
                  {recruiter.name}
                </a>
              </h1>
              {recruiter.website ?
                <small>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      color: grey700,
                      marginLeft: '10px',
                      paddingBottom: '5px',
                      cursor: 'pointer',
                    }}
                    href={recruiter.website}
                  >
                    Website
                  </a>
                </small> : ''
              }
            </div>
          </div>
        </header>
      </div>
    </MuiThemeProvider>
  );
};

RecruiterShow.propTypes = {
  recruiter: React.PropTypes.object,
};

const RecruiterShowContainer = Relay.createContainer(RecruiterShow, {
  fragments: {
    recruiter: () => Relay.QL`
      fragment on Developer {
        id,
        name,
        avatar_url,
        website,
        company,
        location,
      }
    `,
  },
});

export default RecruiterShowContainer;
