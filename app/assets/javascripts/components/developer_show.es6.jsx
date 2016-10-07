import React, { Component } from 'react';
import mui from 'material-ui';
import DeveloperMeta from './developer_meta.es6.jsx';
import DeveloperStatus from './developer_status.es6.jsx';
import Languages from './languages.es6.jsx';

const Avatar = mui.Avatar;
const Colors = mui.Styles.Colors;
const ThemeManager = mui.Styles.ThemeManager;
const LightRawTheme = mui.Styles.LightRawTheme;

class DeveloperShow extends Component {
  constructor(props) {
    super(props);
    this.muiTheme = ThemeManager.getMuiTheme(LightRawTheme);
  }

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  }

  render() {
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

    const { developer } = this.props;

    return (
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
                      color: Colors.grey700,
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
                <DeveloperMeta
                  followers={developer.followers}
                  gists={developer.public_gists}
                  repos={developer.public_repos}
                />
              </div>
            </div>
          </div>
        </header>
      </div>
    );
  }
}

DeveloperShow.childContextTypes = {
  muiTheme: React.PropTypes.object,
};

DeveloperShow.propTypes = {
  developer: React.PropTypes.object,
};

export default DeveloperShow;
