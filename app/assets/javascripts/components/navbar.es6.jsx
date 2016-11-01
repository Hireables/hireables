/* global Routes window Turbolinks */
import React, { Component } from 'react';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import ActionContentMail from 'material-ui/svg-icons/content/mail';
import muiTheme from './theme.es6';

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);

    this.state = {
      open: false,
    };
  }

  handleTouchTap(event) {
    event.preventDefault();
    this.setState({
      open: true,
      anchorEl: event.currentTarget,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    const toolbarStyles = {
      backgroundColor: 'transparent',
      textAlign: 'center',
      padding: '0',
    };

    const toolbarTitleStyles = {
      fontSize: '16px',
      color: '#fff',
      padding: 0,
    };

    const logoStyles = {
      color: '#fff',
      padding: 0,
      fontWeight: '400',
      fontFamily: 'Roboto mono, sans-serif',
      fontSize: '22px',
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
      color: '#333',
      backgroundColor: 'white',
    };

    const { current_user, authenticated } = this.props;
    const currentUserProfilePath = current_user.type === 'recruiter' ?
      Routes.recruiter_path(current_user.login) : Routes.developer_root_path();

    const currentUserLogoutPath = current_user.type === 'recruiter' ?
      Routes.destroy_recruiter_session_path() : Routes.destroy_developer_session_path();

    const active = currentUserProfilePath === window.location.pathname ? 'active' : '';

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="nav">
          <div className="container">
            <Toolbar style={toolbarStyles}>
              <ToolbarGroup key={0} style={toolbarGroupStyles}>
                <a
                  href={Routes.root_path()}
                  className="link bold"
                  style={toolbarGroupStyles.link}
                >
                  <ToolbarTitle text="hireables" style={logoStyles} />
                </a>
                <span style={betaStyles}>beta2</span>
              </ToolbarGroup>

              <ToolbarGroup key={2}>
                {authenticated ?
                  <div className="logged in">
                    <Avatar
                      src={current_user.avatar_url}
                      style={userImageStyles}
                    />
                    <a
                      style={toolbarGroupStyles.link}
                      href={currentUserProfilePath}
                      className={
                        `profile--link ${active}`
                      }
                    >
                      <ToolbarTitle
                        text={current_user.name}
                        style={toolbarTitleStyles}
                      />
                    </a>
                    <a
                      style={toolbarGroupStyles.link}
                      href={currentUserLogoutPath}
                      className="logout--link"
                      data-method="delete"
                    >
                      <ToolbarTitle text="Logout" style={toolbarTitleStyles} />
                    </a>
                  </div> :
                    <div className="logged out">
                      <RaisedButton
                        onTouchTap={this.handleTouchTap}
                        label="Login"
                        style={buttonStyle}
                      />
                      <Popover
                        open={this.state.open}
                        anchorEl={this.state.anchorEl}
                        anchorOrigin={{ horizontal: 'left', vertical: 'bottom' }}
                        targetOrigin={{ horizontal: 'left', vertical: 'top' }}
                        onRequestClose={this.handleRequestClose}
                      >
                        <Menu>
                          <MenuItem
                            leftIcon={<FontIcon className="muidocs-icon-custom-github" />}
                            href={Routes.developer_github_omniauth_authorize_path()}
                            primaryText="Developer"
                            innerDivStyle={{ padding: '0px 16px 0px 50px' }}
                          />
                          <MenuItem
                            innerDivStyle={{ padding: '0px 16px 0px 50px' }}
                            href={Routes.new_recruiter_session_path()}
                            primaryText="Recruiter"
                            leftIcon={<ActionContentMail />}
                          />
                        </Menu>
                      </Popover>
                    </div>
                }
              </ToolbarGroup>
            </Toolbar>
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

NavBar.propTypes = {
  current_user: React.PropTypes.object,
  authenticated: React.PropTypes.bool,
};

export default NavBar;
