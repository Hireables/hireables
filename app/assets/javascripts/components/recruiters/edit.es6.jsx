/* global $ Routes Turbolinks window google MAPS_API_KEY */

import React, { Component } from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { FormsyText } from 'formsy-material-ui/lib';
import _ from 'underscore';
import Snackbar from 'material-ui/Snackbar';
import { css } from 'aphrodite';
import muiTheme from '../theme.es6';

// Mutations
import UpdateRecruiter from '../../mutations/recruiter/updateRecruiter.es6';

// Stylesheets
import formStyles from '../styles/forms.es6';

class RecruiterEdit extends Component {
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
    this.setNotification = this.setNotification.bind(this);

    this.state = {
      open: false,
      autocompleteItems: [],
      canSubmit: false,
      suggesting: false,
      notification: '',
      selectedLocation: this.props.recruiter.location,
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
    this.setNotification('Saving...');

    const onFailure = (transaction) => {
      const error = transaction.getError() || new Error('Mutation failed.');
      let errorMessage;

      if (error.source.errors && Array.isArray(error.source.errors)) {
        errorMessage = error.source.errors[0].message;
      } else {
        errorMessage = error.message;
      }

      this.setNotification(errorMessage);
    };

    const onSuccess = () => {
      window.location.href = Routes.recruiter_path(this.props.recruiter.login);
    };

    Relay.Store.commitUpdate(new UpdateRecruiter({
      id: this.props.recruiter.id,
      ...this.formNode.getModel(),
    }), { onFailure, onSuccess });
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
    const { recruiter } = this.props;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="form registration">
          <Formsy.Form
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
                  name="name"
                  floatingLabelText="Full Name *"
                  defaultValue={recruiter.name}
                  autoFocus
                  required
                />
              </div>

              <div className="field">
                <FormsyText
                  id="text-field-default"
                  name="company"
                  floatingLabelText="Company Name *"
                  defaultValue={recruiter.company}
                  required
                />
              </div>

              <div className="field">
                <FormsyText
                  id="text-field-default"
                  name="website"
                  floatingLabelText="Website or Linkedin link *"
                  defaultValue={recruiter.website}
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
                  name="location"
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
                  name="email"
                  type="email"
                  autoComplete="new-email"
                  floatingLabelText="Email *"
                  defaultValue={recruiter.email}
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
                  name="password"
                  floatingLabelText="New password"
                  hintText="(leave blank if don't want to update)"
                  updateImmediately
                />

              </div>

              <div className="field">
                <FormsyText
                  id="text-field-default"
                  type="password"
                  autoComplete="new-current-password"
                  name="current_password"
                  floatingLabelText="Current Password *"
                  hintText="Current password is required"
                  required
                />
              </div>
            </div>

            <div className="actions">
              <div className="clearfix" />
              <RaisedButton
                label="Register"
                secondary
                className={css(formStyles.button)}
                onClick={this.onFormSubmit}
                type="submit"
                title="Fill required fields before submitting"
                disabled={!this.state.canSubmit}
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

RecruiterEdit.propTypes = {
  recruiter: React.PropTypes.object,
};

const RecruiterEditContainer = Relay.createContainer(RecruiterEdit, {
  fragments: {
    recruiter: () => Relay.QL`
      fragment on Recruiter {
        id,
        name,
        bio,
        login,
        company,
        website,
        location,
        email,
      }
    `,
  },
});

export default RecruiterEditContainer;
