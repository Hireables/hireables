/* global $ Routes Turbolinks window google MAPS_API_KEY */

import React, { Component } from 'react';
import Formsy from 'formsy-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { FormsyText } from 'formsy-material-ui/lib';
import Snackbar from 'material-ui/Snackbar';
import { css } from 'aphrodite';
import {
  Card,
  CardTitle,
  CardText,
} from 'material-ui/Card';

// Local components
import muiTheme from '../theme.es6';

// Stylesheets
import formStyles from '../styles/forms.es6';

const cardTitleStyle = {
  padding: '8px 16px 8px',
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid #d8d8d8',
};

class EmployerRegistration extends Component {
  static onKeyPress(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.setNotification = this.setNotification.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.autocompleteCallback = this.autocompleteCallback.bind(this);
    this.clearAutocomplete = this.clearAutocomplete.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.selectAddress = this.selectAddress.bind(this);

    this.state = {
      open: false,
      autocompleteItems: [],
      canSubmit: false,
      suggesting: false,
      notification: '',
      selectedLocation: '',
    };
  }

  componentWillMount() {
    if (typeof google === 'undefined') {
      $.getScript(
        `https://maps.googleapis.com/maps/api/js?key=${MAPS_API_KEY}&libraries=places`,
        (data, textStatus) => {
          if (textStatus === 'success') {
            this.autocompleteService = new google.maps.places.AutocompleteService();
            this.autocompleteOK = google.maps.places.PlacesServiceStatus.OK;
          }
        });
    } else {
      this.autocompleteService = new google.maps.places.AutocompleteService();
      this.autocompleteOK = google.maps.places.PlacesServiceStatus.OK;
    }
  }

  onFormSubmit(event) {
    event.preventDefault();
    $.post(this.props.action, this.formNode.getModel(), () => {
      this.setNotification('You have signed up successfully. ' +
          'We will email you once your account is verified.');

      setTimeout(() => {
        window.location.href = Routes.root_path();
      }, 2000);
    }).fail((xhr) => {
      if (xhr.status === 422) {
        const errors = {};
        Object.keys(xhr.responseJSON.errors).forEach((key) => {
          if ({}.hasOwnProperty.call(xhr.responseJSON.errors, key)) {
            const value = xhr.responseJSON.errors[key];
            errors[`employer[${key}]`] = `${key} ${value.toString()}`;
          }
        });
        this.formNode.updateInputsWithError(errors);
      } else {
        this.setNotification('Something went wrong. Please refresh and try again!');
      }
    });
  }

  setNotification(notification) {
    this.setState({
      notification,
    }, () => {
      this.setState({ open: true });
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

  clearAutocomplete() {
    this.setState({ autocompleteItems: [], suggesting: false });
  }

  autocompleteCallback(predictions, status) {
    if (status !== this.autocompleteOK) {
      this.setNotification('Place autocomplete failed');
    }

    this.setState({
      suggesting: true,
      autocompleteItems: predictions.map((p, idx) => ({
        suggestion: p.description,
        placeId: p.place_id,
        active: false,
        index: idx,
      })),
    });
  }

  handleInputChange(event) {
    if (!event.target.value.trim()) {
      this.clearAutocomplete();
      return;
    }

    this.autocompleteService.getPlacePredictions(
      { input: event.target.value.trim() },
      this.autocompleteCallback
    );
  }

  selectAddress(address) {
    this.setState({ selectedLocation: address }, () => {
      this.clearAutocomplete();
    });
  }

  render() {
    const { action } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <Card
          className="card"
        >
          <CardTitle
            title="Register as employer"
            style={cardTitleStyle}
            titleStyle={{
              color: '#333',
              fontSize: 18,
              fontWeight: 500,
            }}
          />

          <CardText style={{ padding: '16px 16px 0', fontSize: 16 }}>
            <div className="form registration">
              <Formsy.Form
                action={action}
                method="post"
                onValidSubmit={this.onFormSubmit}
                onValid={this.enableButton}
                ref={node => (this.formNode = node)}
                autoComplete="off"
                onInvalid={this.disableButton}
              >
                <div className="row">
                  <div className="field">
                    <FormsyText
                      id="text-field-default"
                      name="employer[name]"
                      floatingLabelText="Full Name *"
                      autoFocus
                      required
                    />
                  </div>

                  <div className="field">
                    <FormsyText
                      id="text-field-default"
                      name="employer[company]"
                      floatingLabelText="Company Name *"
                      required
                    />
                  </div>

                  <div className="field">
                    <FormsyText
                      id="text-field-default"
                      name="employer[website]"
                      floatingLabelText="Website or Linkedin link *"
                      required
                      updateImmediately
                      validations={{
                        isUrl: true,
                      }}
                      validationErrors={{
                        isUrl: 'Invalid website url',
                      }}
                    />
                  </div>

                  <div className="field">
                    <FormsyText
                      id="text-field-default"
                      type="text"
                      value={this.state.selectedLocation}
                      name="employer[location]"
                      floatingLabelText="Location * (ex: london)"
                      onChange={this.handleInputChange}
                      required
                      updateImmediately
                    />
                    <div
                      id="PlacesAutocomplete__autocomplete-container"
                      className={`dropdown autocomplete ${this.state.suggesting ? 'suggesting' : ''}`}
                    >
                      {this.state.autocompleteItems.map(p => (
                        <div
                          key={p.placeId}
                          className="suggestion"
                          onClick={() => this.selectAddress(p.suggestion)}
                        >
                          {p.suggestion}
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="field">
                    <FormsyText
                      id="text-field-default"
                      name="employer[email]"
                      type="email"
                      autoComplete="new-email"
                      floatingLabelText="Email *"
                      updateImmediately
                      required
                      validations={{
                        isEmail: true,
                      }}
                      validationErrors={{
                        isEmail: 'Invalid email',
                      }}
                    />
                  </div>

                  <div className="field">
                    <FormsyText
                      id="text-field-default"
                      type="password"
                      autoComplete="new-password"
                      name="employer[password]"
                      floatingLabelText="Password *"
                      required
                      updateImmediately
                      validations={{
                        minLength: 8,
                      }}
                      validationErrors={{
                        minLength: 'Password should be minimum 8 characters',
                      }}
                    />
                  </div>
                </div>

                <div className="actions">
                  <RaisedButton
                    label="Register"
                    primary
                    onClick={this.onFormSubmit}
                    type="submit"
                    title="Fill required fields before submitting"
                    disabled={!this.state.canSubmit}
                    className={css(formStyles.button)}
                  />
                </div>

                <div className="extra-actions">
                  <RaisedButton
                    label="Login"
                    primary
                    href={this.props.login_url}
                    className={css(formStyles.button, formStyles.input)}
                  />
                </div>

                <div className="notifications">
                  <Snackbar
                    open={this.state.open}
                    ref={node => (this.notification = node)}
                    message={this.state.notification}
                    autoHideDuration={5000}
                    onRequestClose={this.handleRequestClose}
                  />
                </div>
              </Formsy.Form>
            </div>
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

EmployerRegistration.propTypes = {
  action: React.PropTypes.string,
  login_url: React.PropTypes.string,
};

export default EmployerRegistration;
