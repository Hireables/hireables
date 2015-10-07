// Require React
React = require('react/addons');
// Material UI
import mui from 'material-ui';
let RaisedButton = mui.RaisedButton;
let ThemeManager = mui.Styles.ThemeManager;
let LightRawTheme = mui.Styles.LightRawTheme;

// Define component
const Jumbotron = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getInitialState () {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
    };
  },

  render() {

    return (
        <div className="jumbotron jumbotron--small">
          <div className="col-6">
            <h3 className="bold">Explore real problems, together.</h3>
            <p className="p-r-60">
              ProblemWall brings people, companies and entrepreneurs together to explore real problems. Its a place to share problems and collaborate with companies and people who are facing and solving these problems.
            </p>
            <RaisedButton label="Learn more" primary={true} />
          </div>
        </div>
      );
  },
});

module.exports = Jumbotron;
