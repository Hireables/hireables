import React, { Component } from 'react';
import Formsy from 'formsy-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import { FormsyText } from 'formsy-material-ui/lib';
import Snackbar from 'material-ui/Snackbar';

/* global $ Routes Turbolinks window google MAPS_API_KEY */

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#6986BD',
    accent1Color: '#6986BD',
  },
});

const styles = {
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


class RecruiterRegistration extends Component {
  static onKeyPress(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.handleTouchTap = this.handleTouchTap.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.autocompleteCallback = this.autocompleteCallback.bind(this);
    this.clearAutocomplete = this.clearAutocomplete.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.selectAddress = this.selectAddress.bind(this);

    this.state = {
      form: {},
      open: false,
      autocompleteItems: [],
      loaded: false,
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
    $.post(this.props.action, this.formNode.getModel(), (data) => {
      if (data.verified) {
        window.location.href = Routes.root_path();
      } else {
        this.setState({
          open: true,
          notification: 'You have signed up successfully.' +
            'We will email you once your account is verified.',
        });
      }
    }).fail((xhr) => {
      if (xhr.status === 422) {
        const errors = {};
        Object.keys(xhr.responseJSON.errors).forEach((key) => {
          if ({}.hasOwnProperty.call(xhr.responseJSON.errors, key)) {
            const value = xhr.responseJSON.errors[key];
            errors[`recruiter[${key}]`] = `${key} ${value.toString()}`;
          }
        });
        this.formNode.updateInputsWithError(errors);
      } else {
        this.setState({
          open: true,
          notification: 'Something went wrong. Please refresh and try again!',
        });
      }
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
    }, () => {
      window.location.href = Routes.root_path();
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
      console.error('place autocomplete failed'); return;
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
                  name="recruiter[name]"
                  floatingLabelText="Full Name *"
                  autoFocus
                  required
                />
              </div>

              <div className="field">
                <FormsyText
                  id="text-field-default"
                  name="recruiter[company]"
                  floatingLabelText="Company Name *"
                  required
                />
              </div>

              <div className="field">
                <FormsyText
                  id="text-field-default"
                  name="recruiter[website]"
                  floatingLabelText="Website or Linkedin link *"
                  validations={{
                    isUrl: true,
                  }}
                  validationErrors={{
                    isUrl: 'Invalid website url',
                  }}
                  required
                />
              </div>

              <div className="field">
                <FormsyText
                  id="text-field-default"
                  type="text"
                  value={this.state.selectedLocation}
                  name="recruiter[location]"
                  floatingLabelText="Location * (ex: london)"
                  onChange={this.handleInputChange}
                  required
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
                  name="recruiter[email]"
                  type="email"
                  autoComplete="new-email"
                  onKeyDown={this.checkEmail}
                  floatingLabelText="Email *"
                  validations={{
                    isEmail: true,
                  }}
                  validationErrors={{
                    isEmail: 'Invalid email',
                  }}
                  required
                />
              </div>

              <div className="field">
                <FormsyText
                  id="text-field-default"
                  type="password"
                  autoComplete="new-password"
                  name="recruiter[password]"
                  floatingLabelText="Password *"
                  required
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
                secondary
                onClick={this.onFormSubmit}
                type="submit"
                title="Fill required fields before submitting"
                disabled={!this.state.canSubmit}
                style={styles.button}
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
      </MuiThemeProvider>
    );
  }
}

RecruiterRegistration.propTypes = {
  action: React.PropTypes.string,
  errors: React.PropTypes.any,
};

export default RecruiterRegistration;
