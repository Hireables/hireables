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

class EmployerNewPassword extends Component {
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
    $.post(this.props.action, this.formNode.getModel(), () => {
      this.setState({
        open: true,
        notification: 'You will receive an email with instructions on ' +
        'how to reset your password in a few minutes.',
      });
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
            title="Change your password"
            style={cardTitleStyle}
            titleStyle={{
              color: '#333',
              fontSize: 18,
              fontWeight: 500,
            }}
          />
          <CardText style={{ padding: '16px 16px 0', fontSize: 16 }}>
            <div className="form new-password">
              <Formsy.Form
                action={action}
                method="post"
                onKeyDown={EmployerNewPassword.onKeyPress}
                onValid={this.enableButton}
                ref={node => (this.formNode = node)}
                autoComplete="off"
                onInvalid={this.disableButton}
              >
                <div className="row">
                  <div className="field no-float">
                    <FormsyText
                      id="text-field-default"
                      name="employer[email]"
                      type="email"
                      autoFocus
                      autoComplete="new-email"
                      onKeyDown={this.checkEmail}
                      floatingLabelText="Your Email"
                      required
                      updateImmediately
                      validations={{
                        isEmail: true,
                      }}
                      validationErrors={{
                        isEmail: 'Invalid email',
                      }}
                    />
                  </div>
                </div>
                <div className="actions">
                  <RaisedButton
                    label="Reset password"
                    primary
                    onClick={this.onFormSubmit}
                    type="submit"
                    disabled={!this.state.canSubmit}
                    className={css(formStyles.button)}
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

EmployerNewPassword.propTypes = {
  action: React.PropTypes.string,
  signup_url: React.PropTypes.string,
  login_url: React.PropTypes.string,
};

export default EmployerNewPassword;
