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
      demo: false,
      error: false,
      demo_count: 0,
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
        <form ref="search" method="POST" action={this.props.action} onSubmit={this._handleSubmit}>
          <label>
            Click on any tag to see a demo
          </label>
          <small className="block m-t-10">
            <span className="react-tagsinput-tag" onClick={this._addDemoTag}>location:london</span>
            <span className="react-tagsinput-tag" onClick={this._addDemoTag}>language:ruby</span>
            <span className="react-tagsinput-tag" onClick={this._addDemoTag}>followers:>=100</span>
          </small>
          <div className="search-box">
            <TagsInput ref='tags' name="q" transform={this._formatTag} valueLink={this.linkState("tags")} validate={this._validateTag} onTagAdd={this._addTag} placeholder="Type filter and enter to search" />
            <RaisedButton label="Find" primary={true} onClick={this._handleSubmit} />
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
            ref="snackbar_demo_1"
            message="Awesome you got it! Click on another demo tag and hit find"
            action="done"
            autoHideDuration={5000} />
          <Snackbar
            ref="snackbar_demo_2"
            message="You are now a pro! Enter your keywords and hit find"
            action="done"
            autoHideDuration={7000} />
          <Snackbar
            ref="snackbar_uniqueness_error"
            message="Keyword already added"
            action="error"
            autoHideDuration={5000} />
          <Snackbar
            ref="snackbar_invalid_keyword"
            message="Not a valid keyword! Allowed keywords are: language, location, joined, repos, followers"
            action="error"
            autoHideDuration={10000} />
          <Snackbar
            ref="snackbar_invalid_format"
            message="Not a valid format! See demo tags and format correctly ex: location:london"
            action="error"
            autoHideDuration={10000} />
        </form>
      );
  },

  _validateTag(tag, done) {
    var keywords = ["location", "followers", "repos", "joined", "language"];

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

  _addDemoTag(event){
    this.setState({demo: true, demo_count: this.state.demo_count + 1});
    var tag = $(event.target).text();
    this.refs.tags.addTag(tag);
    this._addTag;
    if(!this.state.error) {
      this.refs.snackbar_hint.show();
    }
  },

  _addTag(event) {
    this._preFetchPage(this._getFormData());
  },

  _getFormData() {
    // Add value to input
    $('.react-tagsinput-input').val(this.refs.tags.getTags().join(', '));
    // finally submit the form
    return $(this.refs.search.getDOMNode()).serialize();
  },

  _preFetchPage(formData) {
    // Pre-fetch the page to warm up cache
    $.get('/members', formData, function(data) {
    }, "html");
  },

  _handleSubmit(event) {
    event.preventDefault();
    // Only submit if there are any tags
    if (this.refs.tags.getTags().join(', ').length > 0) {
      // Fetch members based on search
      this.props.searchMembers('/members/search', this._getFormData());
      if(this.state.demo && this.state.demo_count === 1) {
        this.setState({demo: false});
        this.refs.snackbar_demo_1.show();
      } else if(this.state.demo && this.state.demo_count === 2) {
        this.setState({demo: false, demo_count: 0});
        this.refs.tags.clear();
        this.refs.snackbar_demo_2.show();
      }
    } else {
      // Empty stop event and show error
      event.stopPropagation();
      this.refs.snackbar_error.show();
    }
  }

});

module.exports = Search;
