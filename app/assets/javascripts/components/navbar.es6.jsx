/* global Routes window */
import React from 'react';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';
import Avatar from 'material-ui/Avatar';

const NavBar = (props) => {
  const toolbarStyles = {
    backgroundColor: 'transparent',
    maxWidth: '980px',
    textAlign: 'center',
    padding: '0',
    margin: '0 auto',
  };

  const toolbarTitleStyles = {
    fontSize: '16px',
    color: '#fff',
    padding: 0,
  };

  const logoStyles = {
    color: '#fff',
    padding: 0,
    fontSize: '20px',
  };

  const betaStyles = {
    fontSize: '11px',
    color: '#fff',
    paddingLeft: '5px',
  };

  const toolbarGroupStyles = {
    float: 'none',
    display: 'inline-block',
    link: {
      textDecoration: 'none',
    },
    slogan: {
      fontSize: '16px',
      color: 'white',
    },
  };

  const userImageStyles = {
    verticalAlign: 'middle',
    marginRight: '16px',
  };

  const buttonStyle = {
    margin: 12,
    color: 'white',
  };

  return (
    <MuiThemeProvider>
      <div className="nav">
        <div className="container">
          <Toolbar style={toolbarStyles} className="nav--toolbar">
            <ToolbarGroup key={0} style={toolbarGroupStyles}>
              <a
                data-turbolinks="false"
                href="/"
                className="link bold"
                style={toolbarGroupStyles.link}
              >
                <ToolbarTitle text="Hireables" style={logoStyles} />
              </a>
              <span style={betaStyles}>BETA</span>
            </ToolbarGroup>

            <ToolbarGroup key={1}>
              <ToolbarTitle
                text="Search hireable developers through Github"
                style={toolbarGroupStyles.slogan}
              />
            </ToolbarGroup>

            <ToolbarGroup key={2}>
              {props.authenticated ?
                <div className="logged in">
                  <Avatar
                    src={props.developer.avatar_url}
                    style={userImageStyles}
                  />
                  <a
                    style={toolbarGroupStyles.link}
                    href={Routes.developer_root_path()}
                    className={
                      `profile--link ${Routes.developer_root_path() === window.location.pathname ? 'active' : ''}`
                    }
                  >
                    <ToolbarTitle
                      text={props.developer.name}
                      style={toolbarTitleStyles}
                    />
                  </a>
                  <a
                    style={toolbarGroupStyles.link}
                    href={Routes.destroy_developer_session_path()}
                    className="logout--link"
                    data-method="delete"
                  >
                    <ToolbarTitle text="Logout" style={toolbarTitleStyles} />
                  </a>
                </div> :
                  <div className="logged out">
                    <FlatButton
                      href={Routes.developer_github_omniauth_authorize_path()}
                      secondary
                      label="Login"
                      icon={<FontIcon className="muidocs-icon-custom-github" />}
                      style={buttonStyle}
                    />
                  </div>
              }
            </ToolbarGroup>
          </Toolbar>
        </div>
      </div>
    </MuiThemeProvider>
  );
};

NavBar.propTypes = {
  developer: React.PropTypes.object,
  authenticated: React.PropTypes.bool,
};

export default NavBar;
