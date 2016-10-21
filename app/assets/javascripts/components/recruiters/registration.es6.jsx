import React, { Component } from 'react';
import Formsy from 'formsy-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import { FormsyText } from 'formsy-material-ui/lib';
import Snackbar from 'material-ui/Snackbar';

/* global $ Routes Turbolinks window */

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

    this.state = {
      form: {},
      open: false,
      loaded: false,
      canSubmit: false,
      notification: '',
      validationErrors: { recruiter: {} },
    };
  }

  onFormSubmit(event) {
    event.preventDefault();
    $.post(this.props.action, this.formNode.getModel(), (data) => {
      if (data.verified) {
        window.location.href = Routes.root_path();
      } else {
        this.setState({
          open: true,
          notification: 'You have signed up successfully. We will email you once your account is verified.',
        });
      }
    }).fail((xhr) => {
      const errors = {};
      Object.keys(xhr.responseJSON.errors).forEach((key) => {
        if ({}.hasOwnProperty.call(xhr.responseJSON.errors, key)) {
          errors[`recruiter[${key}]`] = xhr.responseJSON.errors[key].toString();
        }
      });
      this.formNode.updateInputsWithError(errors);
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

  render() {
    const { action } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="form registration">
          <Formsy.Form
            action={action}
            method="post"
            onKeyDown={RecruiterRegistration.onKeyPress}
            onValid={this.enableButton}
            ref={node => (this.formNode = node)}
            autoComplete="off"
            onInvalid={this.disableButton}
            validationErrors={this.state.validationErrors}
          >
            <div className="row">
              <div className="header-separator">About (for verification)</div>

              <div className="field">
                <FormsyText
                  id="text-field-default"
                  placeholder="John Doe"
                  name="recruiter[name]"
                  floatingLabelText="Full Name *"
                  floatingLabelFixed
                />
              </div>

              <div className="field">
                <FormsyText
                  id="text-field-default"
                  placeholder="Appleseed Inc."
                  name="recruiter[company]"
                  floatingLabelText="Company Name *"
                  floatingLabelFixed
                />
              </div>

              <div className="field">
                <FormsyText
                  id="text-field-default"
                  placeholder="http://www.example.com"
                  name="recruiter[website]"
                  floatingLabelText="Website or Linkedin *"
                  floatingLabelFixed
                />
              </div>
            </div>

            <div className="row">
              <div className="header-separator top-margin">Login (for account)</div>

              <div className="field">
                <FormsyText
                  id="text-field-default"
                  placeholder="john@doe.com"
                  name="recruiter[email]"
                  type="email"
                  autoComplete="new-email"
                  onKeyDown={this.checkEmail}
                  floatingLabelText="Email *"
                  floatingLabelFixed
                />
              </div>
              <div className="field">
                <FormsyText
                  id="text-field-default"
                  placeholder="8 Characters"
                  type="password"
                  autoComplete="new-password"
                  name="recruiter[password]"
                  floatingLabelText="Password *"
                  floatingLabelFixed
                />
              </div>
            </div>
            {/*
            <div className="row">
              <div className="header-separator top-margin">Preferences (optional)</div>
              <div className="field">
                <FormsyText
                  id="text-field-default"
                  placeholder="ex: ruby, python"
                  type="text"
                  name="recruiter[language]"
                  floatingLabelText="Default language to search"
                  floatingLabelFixed
                />
              </div>

              <div className="field">
                <FormsyText
                  id="text-field-default"
                  placeholder="ex: london"
                  type="text"
                  name="recruiter[location]"
                  floatingLabelText="Default location to search"
                  floatingLabelFixed
                />
              </div>
            </div>
            */}
            <div className="actions">
              <RaisedButton
                label="Register"
                secondary
                onClick={this.onFormSubmit}
                type="submit"
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
