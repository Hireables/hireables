/* global $ Routes Turbolinks window */

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
import muiTheme from '../theme.es6';

// Stylesheets
import formStyles from '../styles/forms.es6';

const cardTitleStyle = {
  padding: '8px 16px 8px',
  backgroundColor: '#f5f5f5',
  borderBottom: '1px solid #d8d8d8',
};

class EmployerUpdatePassword extends Component {
  static onKeyPress(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }

  constructor(props) {
    super(props);
    this.onFormSubmit = this.onFormSubmit.bind(this);
    this.setNotification = this.setNotification.bind(this);
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
      this.setNotification('Your password has been changed successfully.');
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
    }, () => {
      window.location.href = Routes.root_path();
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
                onKeyDown={EmployerUpdatePassword.onKeyPress}
                onValid={this.enableButton}
                ref={node => (this.formNode = node)}
                autoComplete="off"
                onInvalid={this.disableButton}
              >
                <div className="row">
                  <div className="field">
                    <FormsyText
                      id="text-field-default"
                      name="employer[password]"
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
                      name="employer[password_confirmation]"
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
                    primary
                    onClick={this.onFormSubmit}
                    type="submit"
                    disabled={!this.state.canSubmit}
                    className={css(formStyles.button)}
                    required
                  />
                </div>

                <div className="extra-actions">
                  <RaisedButton
                    label="Register"
                    primary
                    href={this.props.signup_url}
                    className={css(formStyles.button)}
                  />

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

EmployerUpdatePassword.propTypes = {
  action: React.PropTypes.string,
  signup_url: React.PropTypes.string,
  login_url: React.PropTypes.string,
};

export default EmployerUpdatePassword;
