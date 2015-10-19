// Require React
React = require('react/addons');

import mui from 'material-ui';

// Material Component
let Toolbar = mui.Toolbar;
let ToolbarGroup = mui.ToolbarGroup;
let ToolbarTitle = mui.ToolbarTitle;
let ThemeManager = mui.Styles.ThemeManager;
let FontIcon = mui.FontIcon;
let LightRawTheme = mui.Styles.LightRawTheme;

// Define component
const Footer = React.createClass({

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

  render() {

    let toolbarStyles = {
      backgroundColor: 'transparent',
      maxWidth: '980px',
      padding: '0',
      margin: '0 auto'
    };

    let fontStyles = {
      paddingLeft: '0px',
      marginRight: '10px',
      color: '#bdbdbd'
    };

    let toolbarTitleStyles = {
      fontSize: '16px',
      color: '#bdbdbd'
    };

    let betaStyles = {
      fontSize: '11px',
      color: '#bdbdbd'
    };

    return (
        <div className="footer">
          <div className="container">
            <Toolbar style={toolbarStyles} className="footer--toolbar">
              <ToolbarGroup key={0} float="left">
                <a href="https://github.com" target="_blank" className="link">
                  <ToolbarTitle text="Powered by Github API" style={toolbarTitleStyles}  />
                </a>
                <span style={betaStyles}>BETA</span>
              </ToolbarGroup>
            </Toolbar>
          </div>
        </div>
      );
  },
});

module.exports = Footer;
