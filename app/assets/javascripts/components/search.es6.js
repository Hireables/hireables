// Require React
React = require('react/addons');
var $ = require('jquery-browserify')
// Material UI
import mui from 'material-ui';
let RaisedButton = mui.RaisedButton;
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

  render() {

    let textFieldStyles = {
      marginRight: '20px'
    }

    return (
        <div className="col-6">
          <form ref="search" method="GET" action={this.props.action}>
            <TextField
              hintText="Enter name or username"
              style={textFieldStyles}
              ref="org"
              name="id"
              errorText={this.state.error2Text}
              errorStyle={{color:'orange'}}
              defaultValue="" />
            <RaisedButton label="Find" primary={true} />
          </form>
        </div>
      );
  }

});

module.exports = Search;
