import React, { Component } from 'react';
import Formsy from 'formsy-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import { FormsyText } from 'formsy-material-ui/lib';

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

    this.state = {
      form: {},
      open: false,
      loaded: false,
      canSubmit: false,
      validationErrors: {recruiter: {}},
    };
  }

  onFormSubmit(event) {
    $.post(this.props.action, this.formNode.getModel(), (data, textStatus, xhr) => {
      console.log(xhr);
    }).fail((xhr, textStatus, errorThrown) => {
      const response = JSON.parse(xhr.responseText);
      this.setState({ validationErrors: { recruiter: { email: 'is invalid' } }});
      console.log(response.errors)
    }).done((xhr, textStatus, errorThrown) => {
      const response = JSON.parse(xhr.responseText);
    })
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
    console.log(this.state.validationErrors);
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="form registration">
          <h2>Sign up</h2>
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
            <div className="field">
              <FormsyText
                id="text-field-default"
                placeholder="John Doe"
                name="recruiter[name]"
                floatingLabelText="Full Name"
                floatingLabelFixed
              />
            </div>

            <div className="field">
              <FormsyText
                id="text-field-default"
                placeholder="Appleseed Inc."
                name="recruiter[company]"
                floatingLabelText="Company Name"
                floatingLabelFixed
              />
            </div>

            <div className="field">
              <FormsyText
                id="text-field-default"
                placeholder="http://www.example.com"
                name="recruiter[website]"
                floatingLabelText="Website Link"
                floatingLabelFixed
              />
            </div>

            <div className="field">
              <FormsyText
                id="text-field-default"
                placeholder="john@doe.com"
                name="recruiter[email]"
                type="email"
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
                name="recruiter[password]"
                floatingLabelText="Password"
                floatingLabelFixed
              />
            </div>
            <div className="field">
              <FormsyText
                id="text-field-default"
                placeholder="8 Characters"
                type="password"
                name="recruiter[password_confirmation]"
                floatingLabelText="Password confirmation"
                floatingLabelFixed
              />
            </div>
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
