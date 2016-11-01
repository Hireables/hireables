/* global $ Routes Turbolinks window */

import React, { Component } from 'react';
import Formsy from 'formsy-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import { FormsyText } from 'formsy-material-ui/lib';
import Snackbar from 'material-ui/Snackbar';
import {
  Card,
  CardTitle,
  CardText,
} from 'material-ui/Card';
import muiTheme from '../theme.es6';

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

const cardTitleStyle = {
  padding: '8px 16px 8px',
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid #d8d8d8',
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
      this.setState({
        open: true,
        notification: 'Your password has been changed successfully.',
      });
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
    }).always(() => {
      setTimeout(() => {
        window.location.href = Routes.root_path();
      }, 3000);
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
        <Card className="card small">
          <CardTitle
            title="Recover your password"
            style={cardTitleStyle}
            titleStyle={{
              color: '#333',
              fontSize: 18,
              fontWeight: 500,
            }}
          />
          <CardText style={{ padding: '16px 16px 0', fontSize: 16 }}>
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
                      updateImmediately
                      required
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
                      updateImmediately
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

                <div className="extra-actions">
                  <RaisedButton
                    label="Register"
                    secondary
                    href={this.props.signup_url}
                    style={styles.button}
                  />

                  <RaisedButton
                    label="Login"
                    secondary
                    href={this.props.login_url}
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
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

RecruiterUpdatePassword.propTypes = {
  action: React.PropTypes.string,
  errors: React.PropTypes.any,
  signup_url: React.PropTypes.string,
  login_url: React.PropTypes.string,
};

export default RecruiterUpdatePassword;
