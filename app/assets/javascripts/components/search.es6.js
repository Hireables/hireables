// Require React
React = require('react/addons');
var TagsInput = require('react-tagsinput');
// Material UI
import mui from 'material-ui';
let RaisedButton = mui.RaisedButton;
let Colors = mui.Styles.Colors;
let ThemeManager = mui.Styles.ThemeManager;
let Snackbar = mui.Snackbar;
let LightRawTheme = mui.Styles.LightRawTheme;

// Define component
const Search = React.createClass({
  mixins: [React.addons.LinkedStateMixin],
  childContextTypes: {
    muiTheme: React.PropTypes.object
  },

  getInitialState () {
    return {
      muiTheme: ThemeManager.getMuiTheme(LightRawTheme),
      tags: []
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
      marginRight: '20px',
      marginTop: '10px'
    }

    let menuItems = [
       { payload: '1', text: 'repos', placeholder: '>= 5 or >10' },
       { payload: '2', text: 'location', placeholder: 'london or france, south america' },
       { payload: '3', text: 'language', placeholder: 'ruby or rust, c++' },
       { payload: '4', text: 'followers', placeholder: '>=100 or >1000' },
       { payload: '5', text: 'joined', placeholder: '>=2012-04-30 or >2012-04-29' },
    ];

    return (
        <form ref="search" method="GET" action={this.props.action} onSubmit={this._handleSubmit}>
          <TagsInput ref='tags' name="q" onTagAdd={this._addTag} />
          <RaisedButton label="Find" primary={true} onClick={this._handleSubmit} />
          <Snackbar
            ref="snackbar"
            message="Search can't be empty"
            action="error"
            autoHideDuration={5000} />
        </form>
      );
  },

  _addTag(event) {
    // Add value to input
    $('.react-tagsinput-input').val(this.refs.tags.getTags().join(', '));
    // finally submit the form
    var formData = $(this.refs.search.getDOMNode()).serialize();
    // Pre-fetch the page to warm up cache
    $.get('/members', formData, function(data) {
    }, "html");
  },

  _handleSubmit(event) {
    event.preventDefault();
    // Only submit if there are any tags
    if (this.refs.tags.getTags().join(', ').length > 0) {
      // finally submit form
      var formData = $(this.refs.search.getDOMNode()).serialize();
      // Fetch members based on search
      this.props.searchMembers('/members/search', formData);
    } else {
      // Empty stop event and show error
      event.stopPropagation();
      this.refs.snackbar.show();
    }
  }

});

module.exports = Search;
