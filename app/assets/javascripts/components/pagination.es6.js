// Require React
React = require('react/addons');

// import material UI
import mui from 'material-ui';
// Dependent component
let RaisedButton = mui.RaisedButton;
let ThemeManager = mui.Styles.ThemeManager;
let LightRawTheme = mui.Styles.LightRawTheme;
let Colors = mui.Styles.Colors

// Define component
const Pagination = React.createClass({

  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getInitialState () {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme)
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
        <div className="container">
          <div className="pull-right">
            {this.props.links.prev? <RaisedButton label="Prev" style={{marginTop: '20px'}}  primary={true} onClick={this.props.loadPrev} /> : ""}
            {this.props.links.next? <RaisedButton label="Next" style={{marginLeft: '20px', marginTop: '20px'}} primary={true} onClick={this.props.loadNext} /> : ""}
          </div>
        </div>
    );
  },
});

module.exports = Pagination;
