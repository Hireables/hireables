/* global Turbolinks document $ location */

import React, { Component } from 'react';
import Formsy from 'formsy-react';
import queryString from 'query-string';
import { orangeA700 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import {
  FormsyCheckbox,
  FormsyText,
} from 'formsy-material-ui/lib';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: orangeA700,
    accent1Color: orangeA700,
  },
});

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
  width: '342px',
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
  constructor(props) {
    super(props);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
    this.checkComma = this.checkComma.bind(this);
    this.addNewLanguage = this.addNewLanguage.bind(this);
    this.renderChip = this.renderChip.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.clearValidationErrors = this.clearValidationErrors.bind(this);
    this.submitSearch = this.submitSearch.bind(this);

    this.state = {
      error: false,
      tags: [],
      query: {},
      open: false,
      value: 1,
      canSubmit: false,
      languagesData: [],
      validationErrors: {},
    };
  }

  onKeyPress(event) {
    if (event.which === 13) {
      event.preventDefault();
    }
  }

  handleRequestDelete(key) {
    this.languagesData = this.state.languagesData;
    const languageToDelete = this.languagesData.map(language => language.key).indexOf(key);
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

    const newModel = Object.assign(
      this.formNode.getModel(),
      { language: languages.toString() }
    );

    console.log(newModel);
    console.log(queryString.stringify(newModel));
  }

  checkComma(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      this.addNewLanguage(event);
    }

    if (event.keyCode === 188) {
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
      [{ key: this.state.languagesData.length, label: newLanguage }]
    );

    this.setState({ languagesData }, () => {
      this.languageNode.state.value = '';
      this.setState({
        canSubmit: true,
      });
    });
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
            action={this.props.action}
            onValid={this.enableButton}
            onKeyPress={this.onKeyPress}
            autoComplete="off"
            ref={node => (this.formNode = node)}
            onInvalid={this.disableButton}
            validationErrors={this.state.validationErrors}
          >
            <div className="search-box keyword">
              <FormsyText
                id="text-field-default"
                placeholder="Type a name (ex: david)"
                autoFocus="true"
                name="keyword"
                fullWidth
                floatingLabelText="Search by developer name"
                floatingLabelFixed
              />
            </div>

            <div className="search-box language">
              <FormsyText
                id="text-field-default"
                placeholder="Separated by comma (ex: ruby, python)"
                name="language"
                onKeyDown={this.checkComma}
                ref={node => (this.languageNode = node)}
                floatingLabelText="Search by programming languages"
                floatingLabelFixed
                fullWidth
              />

              <div style={styles.wrapper}>
                {this.state.languagesData.map(this.renderChip, this)}
              </div>
            </div>

            <div className="search-box location">
              <FormsyText
                id="text-field-default"
                placeholder="Type a location (ex: london)"
                name="location"
                fullWidth
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
                name="hireable"
              />

              <FormsyCheckbox
                label="Relocate"
                style={styles.checkbox}
                name="relocate"
              />

              <FormsyCheckbox
                label="Remote"
                style={styles.checkbox}
                name="remote"
              />

              <FormsyCheckbox
                label="Full-Time"
                style={styles.checkbox}
                name="full-time"
              />

              <FormsyCheckbox
                label="Part-Time"
                style={styles.checkbox}
                name="part-time"
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

Search.propTypes = {
  action: React.PropTypes.string,
};

export default Search;
