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
        <div className="pagination">
          {this.props.links.map(link => (
            <RaisedButton key={link.id} label={link.label} style={{marginTop: '20px', marginRight: '10px'}}  primary={true} onClick={this._loadPage.bind(this, link.url)} />
          ))}
        </div>
      </div>
    );
  },

  _loadPage(link) {
    Turbolinks.visit('/members' + '?' + decodeURIComponent(link));
  }

});

module.exports = Pagination;
