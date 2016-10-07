/* global Routes window */
import React, { Component } from 'react';
import mui from 'material-ui';

const Toolbar = mui.Toolbar;
const ToolbarGroup = mui.ToolbarGroup;
const ToolbarTitle = mui.ToolbarTitle;
const FlatButton = mui.FlatButton;
const ThemeManager = mui.Styles.ThemeManager;
const FontIcon = mui.FontIcon;
const LightRawTheme = mui.Styles.LightRawTheme;
const Colors = mui.Styles.Colors;
const Avatar = mui.Avatar;

class NavBar extends Component {
  constructor(props) {
    super(props);
    this.muiTheme = ThemeManager.getMuiTheme(LightRawTheme);
  }

  componentWillMount() {
    const newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.blueA400,
    });
    this.setState({ muiTheme: newMuiTheme });
  }

  render() {
    const toolbarStyles = {
      backgroundColor: 'transparent',
      maxWidth: '1140px',
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
    };

    const userImageStyles = {
      verticalAlign: 'middle',
      marginRight: '16px',
    };

    const style = {
      margin: 12,
    };

    return (
      <div className="nav bg-horizon">
        <div className="container">
          <Toolbar style={toolbarStyles} className="nav--toolbar">
            <ToolbarGroup key={0} style={toolbarGroupStyles}>
              <a href="/" className="link bold">
                <ToolbarTitle text="Hireables" style={logoStyles} />
              </a>
              <span style={betaStyles}>BETA</span>
            </ToolbarGroup>
            <ToolbarGroup key={1} float="right">
              {this.props.authenticated ?
                <div className="logged in">
                  <Avatar
                    src={this.props.developer.data.avatar_url}
                    style={userImageStyles}
                  />
                  <a
                    href={Routes.developer_path(this.props.developer.login)}
                    className={
                      `profile--link ${Routes.developer_path(this.props.developer.login) === window.location.pathname ? 'active' : ''}`
                    }
                  >
                    <ToolbarTitle
                      text={this.props.developer.name}
                      style={toolbarTitleStyles}
                    />
                  </a>
                  <a
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
                    secondary={true}
                    label="Login"
                    icon={<FontIcon className="muidocs-icon-custom-github" />}
                    style={style}
                  />
                </div>
              }
            </ToolbarGroup>
          </Toolbar>
        </div>
      </div>
    );
  }
}

NavBar.propTypes = {
  developer: React.PropTypes.shape,
  authenticated: React.PropTypes.bool,
};

export default NavBar;
