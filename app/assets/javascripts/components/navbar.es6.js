// Require React
React = require('react/addons');

import mui from 'material-ui';

// Material Component
let Toolbar = mui.Toolbar;
let ToolbarGroup = mui.ToolbarGroup;
let ToolbarTitle = mui.ToolbarTitle;
let ToolbarSeparator = mui.ToolbarSeparator;
let RaisedButton = mui.RaisedButton;
let ThemeManager = mui.Styles.ThemeManager;
let FontIcon = mui.FontIcon;
let LightRawTheme = mui.Styles.LightRawTheme;
let Colors = mui.Styles.Colors

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

    let toolbarStyles = {
      backgroundColor: 'transparent',
      width: '980px',
      padding: '0',
      margin: '0 auto'
    };

    let fontStyles = {
      paddingLeft: '0px',
      marginRight: '10px',
      color: '#fff'
    };

    let toolbarTitleStyles = {
      fontSize: '16px',
      color: '#fff'
    };

    let toolbarSeperatorStyles = {
      fontSize: '16px',
      color: '#fff',
      backgroundColor: '#fff'
    };

    return (
        <div className="nav bg-horizon">
          <Toolbar style={toolbarStyles}>
            <ToolbarGroup key={0} float="left">
              <FontIcon className="muidocs-icon-custom-github" style={fontStyles} />
              <a href="/" className="link m-r-20">
                <ToolbarTitle text="Github Hire" style={toolbarTitleStyles}  />
              </a>
            </ToolbarGroup>
            <ToolbarGroup key={1} float="right">
              <ToolbarSeparator style={toolbarSeperatorStyles} />
              <RaisedButton label="BETA" primary={true} />
            </ToolbarGroup>
          </Toolbar>
        </div>
      );
  },
});

module.exports = NavBar;
