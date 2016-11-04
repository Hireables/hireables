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

class EmployerLogin extends Component {
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
        notification: 'Logging in...',
      });
    }).fail((xhr) => {
      switch (xhr.status) {
        case 401: {
          this.setState({
            notification: xhr.responseText,
          }, () => {
            this.setState({ open: true });
          });
          break;
        }
        default: {
          this.setState({
            open: true,
            notification: 'Something went wrong!',
          });
        }
      }
    }).always(() => {
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
            title="Employer Login"
            style={cardTitleStyle}
            titleStyle={{
              color: '#333',
              fontSize: 18,
              fontWeight: 500,
            }}
          />
          <CardText style={{ padding: '16px 16px 0', fontSize: 16 }}>
            <div className="form login">
              <Formsy.Form
                action={action}
                method="post"
                onKeyDown={EmployerLogin.onKeyPress}
                onValid={this.enableButton}
                ref={node => (this.formNode = node)}
                autoComplete="off"
                onInvalid={this.disableButton}
              >
                <div className="row">
                  <div className="field">
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
                  <div className="field">
                    <FormsyText
                      id="text-field-default"
                      type="password"
                      autoComplete="new-password"
                      name="employer[password]"
                      floatingLabelText="Password"
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
                    label="Login"
                    primary
                    className={css(formStyles.button)}
                    onClick={this.onFormSubmit}
                    type="submit"
                    disabled={!this.state.canSubmit}
                  />
                </div>

                <div className="extra-actions">
                  <RaisedButton
                    label="Register"
                    className={css(formStyles.button)}
                    primary
                    href={this.props.signup_url}
                  />

                  <RaisedButton
                    label="Forgot your password?"
                    className={css(formStyles.button, formStyles.input)}
                    primary
                    href={this.props.forgot_password_url}
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

EmployerLogin.propTypes = {
  action: React.PropTypes.string,
  signup_url: React.PropTypes.string,
  forgot_password_url: React.PropTypes.string,
};

export default EmployerLogin;
