/* global Turbolinks mixpanel document $ location Routes window */

// Modules
import React, { Component } from 'react';
import Formsy from 'formsy-react';
import queryString from 'query-string';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import _ from 'underscore';
import { FormsyText } from 'formsy-material-ui/lib';
import { css } from 'aphrodite';
import {
  Card,
  CardText,
  CardTitle,
} from 'material-ui/Card';

// Local components
import muiTheme from './theme.es6';
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
        if ($(window).scrollTop() > 350 &&
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
    this.checkComma = this.checkComma.bind(this);
    this.addNewLanguage = this.addNewLanguage.bind(this);
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
        className={css(chipStyles.badge)}
      >
        {data.label}
      </Chip>
    );
  }

  render() {
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

                <div className={css(chipStyles.wrapper)}>
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
                  floatingLabelText="Search by location"
                  floatingLabelFixed
                />
              </div>

              <div className="search-box repos">
                <FormsyText
                  id="text-field-default"
                  placeholder="(ex: >=40)"
                  name="repos"
                  fullWidth
                  defaultValue={this.state.form.repos}
                  floatingLabelText="Search by number of repos"
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
