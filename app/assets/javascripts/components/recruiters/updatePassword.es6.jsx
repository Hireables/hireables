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


class RecruiterUpdatePassword extends Component {
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
    this.handleRequestClose = this.handleRequestClose.bind(this);

    this.state = {
      form: {},
      open: false,
      loaded: false,
      canSubmit: false,
      notification: '',
    };
  }

  onFormSubmit(event) {
    event.preventDefault();
    $.put(this.props.action, this.formNode.getModel(), () => {
      window.location.href = Routes.root_path;
    }).fail((xhr) => {
      if (xhr.status === 422) {
        const errors = {};
        Object.keys(xhr.responseJSON.errors).forEach((key) => {
          if ({}.hasOwnProperty.call(xhr.responseJSON.errors, key)) {
            errors[`recruiter[${key}]`] = `${key} ${xhr.responseJSON.errors[key].toString()}`;
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

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }

  render() {
    const { action } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="form change-password">
          <Formsy.Form
            action={action}
            method="post"
            onKeyDown={RecruiterUpdatePassword.onKeyPress}
            onValid={this.enableButton}
            ref={node => (this.formNode = node)}
            autoComplete="off"
            onInvalid={this.disableButton}
          >
            <div className="row">
              <div className="field">
                <FormsyText
                  id="text-field-default"
                  name="recruiter[password]"
                  type="password"
                  autoFocus
                  autoComplete="new-password"
                  floatingLabelText="New Password"
                  validations={{
                    minLength: 8,
                  }}
                  validationErrors={{
                    minLength: 'Password should be minimum 8 characters',
                  }}
                />
              </div>

              <div className="field">
                <FormsyText
                  id="text-field-default"
                  name="recruiter[password_confirmation]"
                  type="password"
                  autoComplete="new-password-confirmation"
                  floatingLabelText="New Password Confirmation"
                  required
                  validations={{
                    minLength: 8,
                    equalsField: 'password',
                  }}
                  validationErrors={{
                    minLength: 'Password should be minimum 8 characters',
                    equalsField: 'Password do not match',
                  }}
                />
              </div>
            </div>
            <div className="actions">
              <RaisedButton
                label="Save password"
                secondary
                onClick={this.onFormSubmit}
                type="submit"
                disabled={!this.state.canSubmit}
                style={styles.button}
                required
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

RecruiterUpdatePassword.propTypes = {
  action: React.PropTypes.string,
  errors: React.PropTypes.any,
};

export default RecruiterUpdatePassword;
