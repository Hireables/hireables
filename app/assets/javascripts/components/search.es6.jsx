/* global Turbolinks mixpanel document $ location Routes window */

// Modules
import React, { Component } from 'react';
import Formsy from 'formsy-react';
import queryString from 'query-string';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import _ from 'underscore';
import AutoComplete from 'material-ui/AutoComplete';
import { FormsyText } from 'formsy-material-ui/lib';
import { css } from 'aphrodite';
import {
  Card,
  CardText,
  CardTitle,
} from 'material-ui/Card';

// Local components
import muiTheme from './theme.es6';
import LanguageList from '../utils/languages.json';
import CurrentUser from '../helpers/currentUser.es6';
import Environment from '../helpers/environment.es6';

// Stylesheets
import chipStyles from './styles/chips.es6';

const environment = new Environment();
const currentUser = new CurrentUser();

const cardTitleStyle = {
  padding: '0px 16px',
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid #d8d8d8',
};

class Search extends Component {
  static onKeyPress(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }

  static makeSticky() {
    if ($(window).width() > 1024) {
      $(document).scroll(() => {
        if ($(window).scrollTop() > 450 &&
            !($(document).height() - $(window).scrollTop() < 600)
          ) {
          $('.search-filters, .employer-profile').addClass('sticky');
        } else {
          $('.search-filters, .employer-profile').removeClass('sticky');
        }
      });
    }
  }

  constructor(props) {
    super(props);
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
    this.addNewLanguage = this.addNewLanguage.bind(this);
    this.onInvalidLanguageSelection = this.onInvalidLanguageSelection.bind(this);
    this.renderChip = this.renderChip.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.clearValidationErrors = this.clearValidationErrors.bind(this);
    this.submitSearch = this.submitSearch.bind(this);
    this.queryObject = _.pick(
      queryString.parse(document.location.search),
      ['language', 'location', 'hireable', 'repos', 'page']
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

  componentDidMount() {
    Search.makeSticky();
    $(window).resize(() => {
      Search.makeSticky();
    });
  }

  onInvalidLanguageSelection() {
    this.languageNode.state.searchText = '';
    this.languageNode.focus();
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

    if (environment.isProduction) {
      mixpanel.track('Search query', {
        query,
        userId: currentUser.id,
        userType: currentUser.type,
        userName: currentUser.name,
      });
    }

    if (query === '') {
      Turbolinks.visit(Routes.root_path());
    } else {
      Turbolinks.visit(`/search?${query}`);
    }
  }

  clearValidationErrors() {
    this.setState({
      validationErrors: {},
    });
  }

  handleRequestDelete(key) {
    this.languagesData = this.state.languagesData;
    const languageToDelete = this.languagesData
    .map(language => language.key)
    .indexOf(key);
    this.languagesData.splice(languageToDelete, 1);
    this.setState({ languagesData: this.languagesData });
  }

  addNewLanguage(selectedLanguage, index) {
    const newLanguage = selectedLanguage.trim();
    if (index === -1) {
      this.onInvalidLanguageSelection();
      return;
    }

    if (newLanguage === '') {
      this.onInvalidLanguageSelection();
      return;
    }

    const isDuplicate = this.state.languagesData.some(language => (
      language.label === newLanguage
    ));

    if (isDuplicate) {
      this.onInvalidLanguageSelection();
      return;
    }

    const languagesData = this.state.languagesData.concat([{
      key: this.state.languagesData.length + 1,
      label: newLanguage,
    }]);

    this.setState({ languagesData }, () => {
      this.languageNode.state.searchText = '';
      this.languageNode.focus();
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
        className={css(chipStyles.badge)}
      >
        {data.label}
      </Chip>
    );
  }

  render() {
    const languageKeys = Object.keys(LanguageList);

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Card
          style={{
            boxShadow: 'none',
            border: 0,
            borderRadius: 0,
          }}
        >
          <CardTitle
            title="Search"
            className="search-card-title"
            style={cardTitleStyle}
            titleStyle={{
              color: '#333',
              fontSize: 18,
              fontWeight: 400,
            }}
          />

          <CardText style={{ padding: 16, fontSize: 16 }}>
            <Formsy.Form
              onValid={this.enableButton}
              onKeyDown={Search.onKeyPress}
              autoComplete="off"
              ref={node => (this.formNode = node)}
              onInvalid={this.disableButton}
              validationErrors={this.state.validationErrors}
            >

              <div className="search-field language">
                <AutoComplete
                  id="text-field-default"
                  placeholder="(ex: ruby, python)"
                  name="language"
                  className="languages"
                  onNewRequest={this.addNewLanguage}
                  onKeyDown={Search.onKeyPress}
                  floatingLabelText="By programming languages"
                  floatingLabelFixed
                  fullWidth
                  ref={node => (this.languageNode = node)}
                  filter={AutoComplete.fuzzyFilter}
                  dataSource={languageKeys}
                  maxSearchResults={5}
                />

                <div className={css(chipStyles.wrapper)}>
                  {this.state.languagesData.map(this.renderChip, this)}
                </div>
              </div>

              <div className="search-field location">
                <FormsyText
                  id="text-field-default"
                  placeholder="(ex: london)"
                  name="location"
                  fullWidth
                  defaultValue={this.state.form.location}
                  floatingLabelText="By location"
                  floatingLabelFixed
                />
              </div>

              <div className="search-field repos">
                <FormsyText
                  id="text-field-default"
                  placeholder="(ex: >=40)"
                  name="repos"
                  fullWidth
                  defaultValue={this.state.form.repos}
                  floatingLabelText="By number of repos"
                  floatingLabelFixed
                />
              </div>
              <RaisedButton
                label="Apply filters"
                primary
                type="submit"
                style={{ marginTop: '10px' }}
                onClick={this.submitSearch}
                disabled={!this.state.canSubmit}
              />
            </Formsy.Form>
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default Search;
