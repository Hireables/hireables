/* global Turbolinks document $ location */

import React, { Component } from 'react';
import TagsInput from 'react-tagsinput';
import Snackbar from 'material-ui/Snackbar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

const textFieldStyles = {
  marginRight: '20px',
  marginTop: '10px',
  marginBottom: '20px',
  width: '100%',
};

const helpStyles = {
  fontSize: '12px',
  color: '#777',
  fontStyle: 'italic',
};

class Search extends Component {
  constructor(props) {
    super(props);
    this.populateForm = this.populateForm.bind(this);
    this.validateTag = this.validateTag.bind(this);
    this.formatTag = this.formatTag.bind(this);
    this.addTag = this.addTag.bind(this);
    this.getFormData = this.getFormData.bind(this);
    this.preFetchPage = this.preFetchPage.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
      error: false,
      tags: [],
      open: false,
    };
  }

  componentDidMount() {
    this.populateForm();
    setTimeout(() => {
      this.refs.tags.focus();
    }, 2000);
  }

  getFormData() {
    return this.state.tags.join('+');
  }

  handleChange(tags) {
    this.setState({ tags });
  }


  handleTouchTap() {
    this.setState({
      open: true,
    });
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  formatTag(tag) {
    return tag.trim().toLowerCase();
  }

  addTag() {
    this.preFetchPage();
  }

  validateTag(tag, done) {
    const keywords = ['location', 'followers', 'repos', 'created', 'language', 'name'];

    const unique = this.state.tags.indexOf(tag) === -1;
    if (!unique) {
      this.setState({ error: true });
      this.refs.snackbar_uniqueness_error.show(); return done(false);
    }

    // Split the term
    const terms = tag.split(':');

    // Check if number of terms are === 2
    if (terms.length !== 2) {
      this.setState({ error: true });
      this.refs.snackbar_invalid_format.show();
      return done(false);
    }
    // Check if search keyword exists in keywords
    if (keywords.indexOf(terms[0]) === -1) {
      this.setState({ error: true });
      this.refs.snackbar_invalid_keyword.show();
      return done(false);
    }

    // All passes then return valid true
    this.setState({ error: false });
    done(true);
    return true;
  }


  preFetchPage() {
    // Pre-fetch the page to warm up cache
    $.get(`/developers?q=${decodeURIComponent(this.getFormData())}`, () => {
    }, 'html');
  }

  handleKeyDown(event) {
    if (event.keyCode === 13) {
      $(event.target.closest('form')).submit(() => false);
    }
  }

  handleSubmit() {
    if (this.refs.tags.getTags().join(', ').length > 0) {
      this.preFetchPage();
      Turbolinks.visit(`/developers?q=${decodeURIComponent(this.getFormData())}`);
    } else {
      Turbolinks.visit('/');
    }
  }

  populateForm() {
    const queryParams = decodeURIComponent(document.location.search.replace('?', ''));
    if (queryParams && location.search.indexOf('q=') >= 0) {
      const fragments = queryParams.split('q=');
      const query = fragments[1].split('&');
      const field = query[0].split('+');
      field.map((elem) => {
        if (elem.indexOf('+') > -1) {
          this.state.tags.push(elem.replace('+', ''));
        } else {
          this.state.tags.push(elem);
        }

        return elem;
      });
    }
  }

  render() {
    return (
      <MuiThemeProvider>
        <div className="filters">
          <form
            ref="search"
            method="GET"
            action={this.props.action}
            onKeyDown={this.handleKeyDown}
          >
            <span style={helpStyles}>
              * Apply multiple filters one by one
            </span>

            <div className="search-box">
              <TagsInput
                autoFocus="true"
                style={textFieldStyles}
                ref="tags"
                name="q"
                value={this.state.tags}
                onChange={this.handleChange}
                transform={this.formatTag}
                validate={this.validateTag}
                onTagRemove={this.handleSubmit}
                onTagAdd={this.handleSubmit}
                placeholder="Type a filter(ex: location:london)"
              />
            </div>

            <Snackbar
              open={this.state.open}
              ref="snackbar_error"
              message="Search can't be empty"
              action="error"
              autoHideDuration={5000}
              onRequestClose={this.handleRequestClose}
            />
            <Snackbar
              open={this.state.open}
              ref="snackbar_hint"
              message="Now click find or enter key to search"
              action="hint"
              autoHideDuration={5000}
              onRequestClose={this.handleRequestClose}
            />
            <Snackbar
              open={this.state.open}
              ref="snackbar_uniqueness_error"
              message="Keyword already added"
              action="error"
              autoHideDuration={5000}
              onRequestClose={this.handleRequestClose}
            />
            <Snackbar
              open={this.state.open}
              ref="snackbar_invalid_keyword"
              message="Not a valid keyword! Allowed: name, language,
              location, created, repos, followers"
              action="error"
              autoHideDuration={10000}
              onRequestClose={this.handleRequestClose}
            />
            <Snackbar
              open={this.state.open}
              ref="snackbar_invalid_format"
              message="Not a valid format! See demo tags and format
              correctly ex: location:london"
              action="error"
              autoHideDuration={10000}
              onRequestClose={this.handleRequestClose}
            />
          </form>
        </div>
      </MuiThemeProvider>
    );
  }
}

Search.propTypes = {
  action: React.PropTypes.string,
};

export default Search;