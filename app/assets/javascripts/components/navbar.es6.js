// Require React
React = require('react/addons');

import mui from 'material-ui';

let Toolbar = mui.Toolbar;
let ToolbarGroup = mui.ToolbarGroup;
let ToolbarTitle = mui.ToolbarTitle;
let ToolbarSeparator = mui.ToolbarSeparator;
let RaisedButton = mui.RaisedButton;
let ThemeManager = mui.Styles.ThemeManager;
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
      accent1Color: Colors.deepOrange500
    });

    this.setState({muiTheme: newMuiTheme});
  },

  render() {

    return (
        <div className="nav">
          <Toolbar>
            <ToolbarGroup key={0} float="left">
              <a href="/" className="link m-r-20">
                <ToolbarTitle text="Github Hire" />
              </a>
              <a href="/organizations" className="link">
                <ToolbarTitle text="All organizations" />
              </a>
            </ToolbarGroup>
            <ToolbarGroup key={1} float="right">
              <ToolbarTitle text="Options" />
              <ToolbarSeparator/>
              <RaisedButton label="Create Broadcast" primary={true} />
            </ToolbarGroup>
          </Toolbar>
        </div>
      );
  },
});

module.exports = NavBar;
