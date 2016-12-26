/* global Routes window Turbolinks */
import React, { Component } from 'react';
import {
  Toolbar,
  ToolbarGroup,
  ToolbarTitle,
} from 'material-ui/Toolbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import IconMenu from 'material-ui/IconMenu';
import Badge from 'material-ui/Badge';
import IconButton from 'material-ui/IconButton';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';
import FontIcon from 'material-ui/FontIcon';
import Popover from 'material-ui/Popover';
import Menu from 'material-ui/Menu';
import MenuItem from 'material-ui/MenuItem';
import Avatar from 'material-ui/Avatar';
import ActionContentMail from 'material-ui/svg-icons/content/mail';
import muiTheme from './theme.es6';
import nameBadge from '../utils/nameBadge.es6';

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
        cursor: 'pointer',
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

    const currentUserLogoutPath = current_user.type === 'employer' ?
      Routes.destroy_employer_session_path() : Routes.destroy_developer_session_path();

    const currentUserSearchPath = current_user.type === 'employer' ?
      Routes.root_path() : Routes.search_index_path();

    let currentUserEditProfilePath = null;
    let currentUserProfilePath = null;
    let active = false;

    if (authenticated) {
      currentUserProfilePath = current_user.type === 'employer' ?
      Routes.employer_path(current_user.login) :
        Routes.developer_path(current_user.login);
      currentUserEditProfilePath = current_user.type === 'employer' ?
        Routes.edit_employer_registration_path() :
          Routes.edit_developer_path(current_user.login);
      active = currentUserProfilePath === window.location.pathname ? 'active' : '';
    }

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

              <ToolbarGroup
                key={2}
                style={{ display: 'block' }}
              >
                {authenticated ?
                  <div
                    className="logged-in"
                    style={{ display: 'flex', alignItems: 'center' }}
                  >
                    <div
                      className={
                        `inbox ${
                          Routes.mailbox_path('inbox') === window.location.pathname ?
                            'active' : ''
                          }`
                      }
                    >
                      <Badge
                        badgeContent={this.props.current_user.unread_inbox_count}
                        style={{
                          verticalAlign: 'middle',
                          padding: 0,
                          position: 'initial',
                        }}
                        badgeStyle={
                          this.props.current_user.unread_inbox_count === 0 ?
                          { display: 'none' } : { top: 10, right: 10 }
                        }
                      />
                      <IconButton
                        href={Routes.mailbox_path('inbox')}
                        touch
                        style={{
                          verticalAlign: 'middle',
                          height: 56,
                          width: 56,
                        }}
                      >
                        <FontIcon
                          color="white"
                          className="material-icons"
                        >inbox</FontIcon>
                      </IconButton>
                    </div>
                    {current_user.avatar_url ?
                      <Avatar
                        src={current_user.avatar_url}
                        style={userImageStyles}
                        onClick={() => Turbolinks.visit(currentUserProfilePath)}
                        className="avatar-image"
                      /> : <Avatar
                        style={userImageStyles}
                        onClick={() => Turbolinks.visit(currentUserProfilePath)}
                        className="avatar-badge"
                      >{nameBadge(current_user.name)}</Avatar>
                    }
                    <a
                      style={toolbarGroupStyles.link}
                      className={`profile-link ${active}`}
                    >
                      <IconMenu
                        anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                        targetOrigin={{ horizontal: 'right', vertical: 'top' }}
                        iconButtonElement={
                          <IconButton
                            touch
                            style={{
                              verticalAlign: 'middle',
                            }}
                          >
                            <NavigationExpandMoreIcon color="white" />
                          </IconButton>
                        }
                      >
                        <MenuItem
                          innerDivStyle={{ padding: '0px 16px 0px 50px' }}
                          href={currentUserProfilePath}
                          primaryText="Profile"
                          leftIcon={
                            <FontIcon className="material-icons">
                              account_box
                            </FontIcon>
                          }
                        />

                        <MenuItem
                          innerDivStyle={{ padding: '0px 16px 0px 50px' }}
                          href={currentUserSearchPath}
                          primaryText="Search"
                          leftIcon={
                            <FontIcon
                              className="material-icons"
                            >
                              search</FontIcon>
                          }
                        />

                        <MenuItem
                          innerDivStyle={{ padding: '0px 16px 0px 50px' }}
                          href={currentUserEditProfilePath}
                          primaryText="Edit"
                          leftIcon={
                            <FontIcon className="material-icons">
                              mode_edit
                            </FontIcon>
                          }
                        />

                        <MenuItem
                          leftIcon={
                            <FontIcon
                              className="material-icons"
                            >power_settings_new</FontIcon>
                          }
                          href={currentUserLogoutPath}
                          data-method="delete"
                          primaryText="Logout"
                          innerDivStyle={{ padding: '0px 16px 0px 50px' }}
                        />
                      </IconMenu>
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
                          href={Routes.new_employer_session_path()}
                          primaryText="Employer"
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
  unread_inbox_count: React.PropTypes.number,
  authenticated: React.PropTypes.bool,
};

export default NavBar;
