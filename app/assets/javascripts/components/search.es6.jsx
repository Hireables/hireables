/* global Turbolinks document $ location Routes */

import React, { Component } from 'react';
import Formsy from 'formsy-react';
import queryString from 'query-string';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import _ from 'underscore';
import {
  FormsyCheckbox,
  FormsyText,
} from 'formsy-material-ui/lib';
import muiTheme from './theme.es6';

const helpStyles = {
  fontSize: '12px',
  color: 'rgba(0, 0, 0, 0.298039)',
  margin: '10px 0',
  display: 'block',
  userSelect: 'none',
};

const filterStyles = {
  backgroundColor: 'white',
  padding: '10px',
  boxShadow: '0 0 16px 0 rgba(63,67,69,0.3)',
};

const styles = {
  chip: {
    margin: 4,
  },

  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  checkbox: {
    marginBottom: 16,
  },

  input: {
    marginBottom: 16,
  },

  select: {
    marginBottom: 16,
  },

  button: {
    marginBottom: 16,
  },
};

class Search extends Component {
  static onKeyPress(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }

  constructor(props) {
    super(props);
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
    this.checkComma = this.checkComma.bind(this);
    this.addNewLanguage = this.addNewLanguage.bind(this);
    this.renderChip = this.renderChip.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.clearValidationErrors = this.clearValidationErrors.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.queryObject = _.pick(
      queryString.parse(document.location.search),
      ['language', 'location', 'page', 'hireable']
    );

    let languagesData = [];
    if (this.queryObject.language) {
      languagesData = this.queryObject.language.split(',').map((elem, index) => (
        { key: index, label: elem }
      ));
    }

    this.state = {
      form: _.omit(this.queryObject, ['page', 'language']),
      open: false,
      value: 1,
      loaded: false,
      canSubmit: false,
      languagesData,
      validationErrors: {},
    };
  }

  handleRequestDelete(key) {
    this.languagesData = this.state.languagesData;
    const languageToDelete = this.languagesData
    .map(language => language.key)
    .indexOf(key);
    this.languagesData.splice(languageToDelete, 1);
    this.setState({ languagesData: this.languagesData });
  }

  enableButton() {
    this.setState({
      canSubmit: true,
    });
  }

  disableButton() {
    this.setState({
      canSubmit: false,
    });
  }

  submitSearch(event) {
    event.preventDefault();
    const languages = this.state.languagesData.map(elem => (
      elem.label
    ));

    const newModel = _.pick(Object.assign(this.formNode.getModel(), {
      language: languages.toString(),
    }), _.identity);

    const query = queryString.stringify(newModel);

    if (query === '') {
      Turbolinks.visit(Routes.root_path());
    } else {
      Turbolinks.visit(`/search?${query}`);
    }
  }

  checkComma(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.addNewLanguage(event);
    }

    if (event.keyCode === 188 || event.keyCode === 32) {
      this.addNewLanguage(event);
    }
  }

  clearValidationErrors() {
    this.setState({
      validationErrors: {},
    });
  }

  addNewLanguage(event) {
    const newLanguage = event.target.value.trim();
    if (newLanguage === '') {
      this.setState({
        validationErrors: {
          language: 'Empty language',
        },
      });

      setTimeout(() => {
        this.clearValidationErrors();
      }, 3000);

      return;
    }

    const isDuplicate = this.state.languagesData.some(item => (
      item.label === newLanguage
    ));

    if (isDuplicate) {
      this.languageNode.state.value = '';

      this.setState({
        validationErrors: {
          language: 'Duplicate language',
        },
      });

      setTimeout(() => {
        this.clearValidationErrors();
      }, 3000);

      return;
    }

    const languagesData = this.state.languagesData.concat(
      [{ key: this.state.languagesData.length + 1, label: newLanguage }]
    );

    this.setState({ languagesData }, () => {
      this.languageNode.state.value = '';
      this.setState({
        canSubmit: true,
      });
    });
  }

  renderChip(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleRequestDelete(data.key)}
        style={styles.chip}
      >
        {data.label}
      </Chip>
    );
  }

  render() {
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="filters" style={filterStyles}>
          <Formsy.Form
            onValid={this.enableButton}
            onKeyDown={Search.onKeyPress}
            autoComplete="off"
            ref={node => (this.formNode = node)}
            onInvalid={this.disableButton}
            validationErrors={this.state.validationErrors}
          >

            <div className="search-box language">
              <FormsyText
                id="text-field-default"
                placeholder="(ex: ruby, python)"
                name="language"
                onKeyDown={this.checkComma}
                ref={node => (this.languageNode = node)}
                floatingLabelText="Search by programming languages"
                floatingLabelFixed
                fullWidth
                autoFocus
              />

              <div style={styles.wrapper}>
                {this.state.languagesData.map(this.renderChip, this)}
              </div>
            </div>

            <div className="search-box location">
              <FormsyText
                id="text-field-default"
                placeholder="(ex: london)"
                name="location"
                fullWidth
                defaultValue={this.state.form.location}
                floatingLabelText="Search by developer location"
                floatingLabelFixed
              />
            </div>
            <div className="search-box preferences">
              <span style={helpStyles}>
                * Beta filters
              </span>

              <FormsyCheckbox
                label="Hireable"
                style={styles.checkbox}
                defaultChecked={this.state.form.hireable === "true"}
                name="hireable"
              />
            </div>

            <RaisedButton
              label="Apply filters"
              secondary
              type="submit"
              onClick={this.submitSearch}
              disabled={!this.state.canSubmit}
              style={styles.button}
            />
          </Formsy.Form>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default Search;
