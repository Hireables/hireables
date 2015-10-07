// Require React
React = require('react/addons');

import mui from 'material-ui';
let RaisedButton = mui.RaisedButton;
let TextField = mui.TextField;
let ThemeManager = mui.Styles.ThemeManager;
let LightRawTheme = mui.Styles.LightRawTheme;

// Define component
const OrganizationSearch = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getInitialState () {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
    };
  },

  render() {

    let textFieldStyles = {
      marginRight: '20px'
    }

    return (
        <div className="jumbotron jumbotron--small">
          <div className="col-6">
            <h3 className="bold">Enter company name to search</h3>
            <TextField
              hintText="Enter name, ex: Github"
              style={textFieldStyles}
              errorText={this.state.error2Text}
              errorStyle={{color:'orange'}}
              defaultValue="" />
            <RaisedButton label="Find" primary={true} />
          </div>
        </div>
      );
  },
});

module.exports = OrganizationSearch;
