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
      error: false,
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

  componentDidMount() {
    if(this.isMounted()) {
      this._populate_form();
    }
  },

  render() {

    let textFieldStyles = {
      marginRight: '20px',
      marginTop: '10px',
      marginBottom: '20px',
      width: '100%'
    }

    return (
        <div className="filters">
          <form ref="search" method="GET" action={this.props.action} onKeyDown={this._handleKeyDown}>
            <div className="search-box">
              <TagsInput autoFocus="true" style={textFieldStyles} ref='tags' name="q" transform={this._formatTag} valueLink={this.linkState("tags")} validate={this._validateTag} onTagRemove={this._handleSubmit} onTagAdd={this._handleSubmit} placeholder="Type a filter(ex: location:london)" />
            </div>
            <Snackbar
              ref="snackbar_error"
              message="Search can't be empty"
              action="error"
              autoHideDuration={5000} />
            <Snackbar
              ref="snackbar_hint"
              message="Now click find or enter key to search"
              action="hint"
              autoHideDuration={5000} />
            <Snackbar
              ref="snackbar_uniqueness_error"
              message="Keyword already added"
              action="error"
              autoHideDuration={5000} />
            <Snackbar
              ref="snackbar_invalid_keyword"
              message="Not a valid keyword! Allowed: name, language, location, created, repos, followers"
              action="error"
              autoHideDuration={10000} />
            <Snackbar
              ref="snackbar_invalid_format"
              message="Not a valid format! See demo tags and format correctly ex: location:london"
              action="error"
              autoHideDuration={10000} />
          </form>
        </div>
      );
  },

  _validateTag(tag, done) {
    var keywords = ["location", "followers", "repos", "created", "language", "name"];

    var unique = this.state.tags.indexOf(tag) === -1;
    if (!unique) {
      this.setState({error: true});
      this.refs.snackbar_uniqueness_error.show(); return done(false);
    }

    // Split the term
    var terms = tag.split(':');

    // Check if number of terms are === 2
    if(terms.length != 2){
      this.setState({error: true});
      this.refs.snackbar_invalid_format.show();
      return done(false);
    }
    // Check if search keyword exists in keywords
    if(keywords.indexOf(terms[0]) === -1) {
      this.setState({error: true});
      this.refs.snackbar_invalid_keyword.show();
      return done(false);
    }

    // All passes then return valid true
    this.setState({error: false});
    done(true);

   },

  _formatTag(tag) {
    return tag.trim().toLowerCase();
  },

  _addTag() {
    this._preFetchPage();
  },

  _getFormData() {
    // finally submit the form
    return this.state.tags.join('+');
  },

  _preFetchPage() {
    // Pre-fetch the page to warm up cache
    $.get('/members?q=' + decodeURIComponent(this._getFormData()), function(data) {
    }, "html");
  },

  _handleKeyDown(event) {
    // Dont' submit form on enter
    if(event.keyCode === 13) {
      $(event.target.closest('form')).submit(function(){
        return false;
      });
    }
  },

  _handleSubmit() {
    // Only submit if there are any tags
    if (this.refs.tags.getTags().join(', ').length > 0) {
      this._preFetchPage();
      // Don't submit empty form fields
      Turbolinks.visit('/members?q=' + decodeURIComponent(this._getFormData()));
    } else {
      // Empty stop submit event and show error
      Turbolinks.visit('/');
    }
  },

  _populate_form(){
    //grab the entire query string
    var query_params = decodeURIComponent(document.location.search.replace('?', ''));
    if(query_params && location.search.indexOf('q=')>=0) {
      //first get the query fragments
      var fragments = query_params.split('q=');

      // Split query from other params
      var query = fragments[1].split('&');

      //Split query params
      var field = query[0].split("+");

      //loop query params and push it to tags
      field.map(function(elem, i) {
        if(elem.indexOf("+") > -1) {
          this.state.tags.push(elem.replace('+', ''))
        } else {
          this.state.tags.push(elem)
        }
      }.bind(this));
    }
  }


});

module.exports = Search;
