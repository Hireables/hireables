// Require React
React = require('react/addons');
var $ = require('jquery-browserify')
// Material UI
import mui from 'material-ui';
let RaisedButton = mui.RaisedButton;
let Colors = mui.Styles.Colors;
let TextField = mui.TextField;
let ThemeManager = mui.Styles.ThemeManager;
let LightRawTheme = mui.Styles.LightRawTheme;

// Define component
const Search = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getInitialState () {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
    };
  },

  componentWillMount() {
    let newMuiTheme = ThemeManager.modifyRawThemePalette(this.state.muiTheme, {
      accent1Color: Colors.deepOrange500
    });
    this.setState({muiTheme: newMuiTheme});
  },

  getChildContext() {
    return {
      muiTheme: this.state.muiTheme,
    };
  },

  render() {

    let textFieldStyles = {
      marginRight: '20px'
    }

    return (
        <form ref="search" method="GET" action={this.props.action}>
          <TextField
            hintText="Type username ex: 'github'"
            style={textFieldStyles}
            ref="org"
            name="id"
            errorText={this.state.error2Text}
            errorStyle={{color:'orange'}}
            defaultValue="" />
          <RaisedButton label="Find" primary={true} />
        </form>
      );
  }

});

module.exports = Search;
