// Require React
React = require('react/addons');

// import material UI
import mui from 'material-ui';
let Toolbar = mui.Toolbar;
let ToolbarGroup = mui.ToolbarGroup;
let ToolbarTitle = mui.ToolbarTitle;
let ToolbarSeparator = mui.ToolbarSeparator;
let RaisedButton = mui.RaisedButton;
let FlatButton = mui.FlatButton;
let ThemeManager = mui.Styles.ThemeManager;
let FontIcon = mui.FontIcon;
let LightRawTheme = mui.Styles.LightRawTheme;
let Colors = mui.Styles.Colors;
let Avatar = mui.Avatar;

// Define component
const NavBar = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getInitialState () {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
    };
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  componentWillMount() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.blueA400
    });
    this.setState({muiTheme: newMuiTheme});
  },

  render() {

    const toolbarStyles = {
      backgroundColor: 'transparent',
      maxWidth: '1140px',
      textAlign: 'center',
      padding: '0',
      margin: '0 auto',
    };

    const fontStyles = {
      paddingLeft: '0px',
      marginRight: '10px',
      verticalAlign: 'middle',
      color: '#fff',
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
    }

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
                <ToolbarTitle text="Hireables" style={logoStyles}  />
              </a>
              <span style={betaStyles}>BETA</span>
            </ToolbarGroup>
            <ToolbarGroup key={1} float="right">
              {this.props.authenticated ?
                <div className="logged in">
                  <Avatar src={this.props.developer.data.avatar_url} style={userImageStyles} />
                  <a
                    href={Routes.developer_path(this.props.developer.login)}
                    className={`profile--link ${Routes.developer_path(this.props.developer.login) === window.location.pathname ? 'active' : ''}`}
                  >
                    <ToolbarTitle text={this.props.developer.name} style={toolbarTitleStyles}  />
                  </a>
                  <a
                    href={Routes.destroy_developer_session_path()}
                    className="logout--link"
                    data-method="delete"
                  >
                    <ToolbarTitle text="Logout" style={toolbarTitleStyles}  />
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

});

module.exports = NavBar;
