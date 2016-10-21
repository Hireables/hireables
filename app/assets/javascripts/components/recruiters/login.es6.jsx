import React, { Component } from 'react';
import Formsy from 'formsy-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import { FormsyText } from 'formsy-material-ui/lib';

/* global $ Routes Turbolinks */

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


class RecruiterLogin extends Component {
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

    this.state = {
      form: {},
      open: false,
      loaded: false,
      canSubmit: false,
      validationErrors: { recruiter: {} },
    };
  }

  onFormSubmit(event) {
    event.preventDefault();
    $.post(this.props.action, this.formNode.getModel(), () => {
      window.location.href = Routes.root_path;
    }).fail((xhr) => {
      this.formNode.updateInputsWithError({
        'recruiter[email]': xhr.responseText,
      });
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
            onKeyDown={RecruiterLogin.onKeyPress}
            onValid={this.enableButton}
            ref={node => (this.formNode = node)}
            autoComplete="off"
            onInvalid={this.disableButton}
            validationErrors={this.state.validationErrors}
          >
            <div className="row">
              <div className="header-separator">Login</div>
              <div className="field">
                <FormsyText
                  id="text-field-default"
                  placeholder="john@doe.com"
                  name="recruiter[email]"
                  type="email"
                  autoFocus
                  autoComplete="new-email"
                  onKeyDown={this.checkEmail}
                  floatingLabelText="Your Email"
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
                  floatingLabelText="Password"
                  floatingLabelFixed
                />
              </div>
            </div>
            <div className="actions">
              <RaisedButton
                label="Login"
                secondary
                onClick={this.onFormSubmit}
                type="submit"
                disabled={!this.state.canSubmit}
                style={styles.button}
              />
            </div>
          </Formsy.Form>
        </div>
      </MuiThemeProvider>
    );
  }
}

RecruiterLogin.propTypes = {
  action: React.PropTypes.string,
  errors: React.PropTypes.any,
};

export default RecruiterLogin;
