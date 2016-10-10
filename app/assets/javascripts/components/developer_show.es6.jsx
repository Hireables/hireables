import React from 'react';
import Relay from 'react-relay';
import Avatar from 'material-ui/Avatar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { grey700 } from 'material-ui/styles/colors';
import DeveloperMeta from './developer_meta.es6';
import DeveloperStatus from './developer_status.es6';
import Languages from './languages.es6';

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
    <MuiThemeProvider>
      <div className="developers-show">
        <header className="header header--bg">
          <div className="container">
            <div style={wrapperStyle}>
              <Avatar src={developer.avatar_url} size={100} />
              <h1 className="no-margin">
                <a href={developer.html_url} style={linkStyles}>
                  {developer.name}
                </a>
              </h1>
              {developer.blog ?
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
                    href={developer.blog}
                  >
                    Website
                  </a>
                </small> : ''
              }

              <DeveloperStatus developer={developer} />
              <Languages languages={developer.languages} />

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
        ${DeveloperStatus.getFragment('developer')}
        ${DeveloperMeta.getFragment('developer')}
      }
    `,
  },
});

export default DeveloperShowContainer;
