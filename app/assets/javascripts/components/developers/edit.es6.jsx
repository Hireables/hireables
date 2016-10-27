/* global Routes window */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import Snackbar from 'material-ui/Snackbar';
import _ from 'underscore';
import { FormsyCheckbox, FormsyText } from 'formsy-material-ui/lib';
import { css } from 'aphrodite';

// Child Components
import muiTheme from '../theme.es6';

// Mutations
import UpdateDeveloper from '../../mutations/developer/updateDeveloper.es6';

// Stylesheets
import formStyles from '../styles/forms.es6';
import chipStyles from '../styles/chips.es6';

class DeveloperEdit extends Component {
  static onKeyPress(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  constructor(props) {
    super(props);
    this.renderChip = this.renderChip.bind(this);
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.clearValidationErrors = this.clearValidationErrors.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.addNewPlatform = this.addNewPlatform.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.setNotification = this.setNotification.bind(this);

    const platforms = props.developer.platforms.map((elem, index) => (
      { key: index, label: elem }
    ));

    this.state = {
      open: false,
      value: 1,
      loaded: false,
      canSubmit: false,
      notification: '',
      platforms,
      validationErrors: {},
    };
  }

  setNotification(notification) {
    this.setState({
      notification,
    }, () => {
      this.setState({ open: true });
    });
  }

  submitForm(event) {
    event.preventDefault();
    const platforms = this.state.platforms.map(elem => (
      elem.label
    ));

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
      window.location.href = Routes.root_path();
    };

    const newModel = _.pick(Object.assign(this.formNode.getModel(), {
      platforms: platforms.toString(),
    }), _.identity);

    Relay.Store.commitUpdate(new UpdateDeveloper({
      id: this.props.developer.id,
      ...newModel,
    }), { onFailure, onSuccess });
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

  clearValidationErrors() {
    this.setState({
      validationErrors: {},
    });
  }

  addNewPlatform(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }

    if (event.keyCode === 13 || event.keyCode === 188 || event.keyCode === 32) {
      const newPlatform = event.target.value.trim();
      if (newPlatform === '') {
        this.setState({
          validationErrors: {
            platforms: 'Empty language',
          },
        });

        setTimeout(() => {
          this.clearValidationErrors();
        }, 3000);

        return;
      }

      const isDuplicate = this.state.platforms.some(platform => (
        platform.label === newPlatform
      ));

      if (isDuplicate) {
        this.platformNode.state.value = '';

        this.setState({
          validationErrors: {
            platforms: 'Duplicate platform',
          },
        });

        setTimeout(() => {
          this.clearValidationErrors();
        }, 3000);

        return;
      }

      const platforms = this.state.platforms.concat([{
        key: this.state.platforms.length + 1,
        label: newPlatform.toLowerCase(),
      }]);

      this.setState({ platforms }, () => {
        this.platformNode.state.value = '';
        this.setState({
          canSubmit: true,
        });
      });
    }
  }

  handleRequestClose() {
    this.setState({
      open: false,
    });
  }


  handleRequestDelete(key) {
    this.platforms = this.state.platforms;
    const platformToDelete = this.platforms
    .map(platform => platform.key)
    .indexOf(key);
    this.platforms.splice(platformToDelete, 1);
    this.setState({ platforms: this.platforms });
  }

  renderChip(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleRequestDelete(data.key)}
        style={chipStyles.chip}
      >
        {data.label}
      </Chip>
    );
  }

  render() {
    const { developer } = this.props;

    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <div className="developer-edit card">
          <Formsy.Form
            onValid={this.enableButton}
            autoComplete="off"
            ref={node => (this.formNode = node)}
            onInvalid={this.disableButton}
            validationErrors={this.state.validationErrors}
          >
            <div className="header-separator">About</div>
            <div className="search-box bio">
              <FormsyText
                id="text-field-default"
                placeholder="(ex: I am a full-stack developer)"
                autoFocus
                name="bio"
                fullWidth
                multiLine
                defaultValue={developer.bio}
                floatingLabelText="A brief into"
                floatingLabelFixed
                updateImmediately
                validations={{
                  minLength: 50,
                  maxLength: 140,
                }}
                validationErrors={{
                  minLength: 'Bio should be minimum 50 characters',
                  maxLength: 'Bio should be minimum 140 characters',
                }}
              />
            </div>

            <div className="search-box">
              <FormsyText
                id="text-field-default"
                placeholder="(ex: London, Toronto, Oslo)"
                name="location"
                fullWidth
                onKeyDown={DeveloperEdit.onKeyPress}
                defaultValue={developer.location}
                floatingLabelText="Where are you based?"
                floatingLabelFixed
                className={css(formStyles.half)}
              />

              <FormsyText
                id="text-field-default"
                placeholder="(ex: https://linkedin.com)"
                name="linkedin"
                className={css(formStyles.half)}
                fullWidth
                onKeyDown={DeveloperEdit.onKeyPress}
                defaultValue={developer.linkedin}
                floatingLabelText="Linkedin"
                floatingLabelFixed
                updateImmediately
                validations={{
                  isUrl: true,
                }}
                validationErrors={{
                  isUrl: 'Should be a valid url',
                }}
              />
            </div>

            <div className="search-box">
              <FormsyText
                id="text-field-default"
                placeholder="(ex: ruby, python)"
                name="platforms"
                className="platforms"
                onKeyDown={this.addNewPlatform}
                ref={node => (this.platformNode = node)}
                floatingLabelText="Languages and frameworks you want to work with"
                floatingLabelFixed
                fullWidth
              />

              <div style={chipStyles.wrapper}>
                {this.state.platforms.map(this.renderChip, this)}
              </div>
            </div>

            <div className="header-separator top-margin">Availability</div>
            <br />
            <div className="hireable">
              <FormsyCheckbox
                label="Hireable *"
                className={css(formStyles.inline)}
                name="hireable"
                defaultChecked={developer.hireable}
              />
              <div className="clearfix" />
              <span className={css(formStyles.help)}>
                * Recruiters will be able see your email and contact you
              </span>
            </div>

            <div className="clearfix" />
            <div className="header-separator top-margin">Preferences</div>
            <div className="search-box">
              <div className={css(formStyles.preferences)}>
                <FormsyCheckbox
                  label="Relocate"
                  className={css(formStyles.inline)}
                  name="relocate"
                  defaultChecked={developer.relocate}
                />

                <FormsyCheckbox
                  label="Remote"
                  className={css(formStyles.inline)}
                  name="remote"
                  defaultChecked={developer.remote}
                />
              </div>

              <div className="clearfix" />
              <div className="search-box job">
                <div className="header-separator">Job Type</div>
                <br />
                <FormsyCheckbox
                  label="Part-Time"
                  className={css(formStyles.inline)}
                  name="part_time"
                  defaultChecked={developer.part_time}
                />

                <FormsyCheckbox
                  label="Full-Time"
                  className={css(formStyles.inline)}
                  name="full_time"
                  defaultChecked={developer.full_time}
                />

                <FormsyCheckbox
                  label="Contract"
                  className={css(formStyles.inline)}
                  name="contract"
                  defaultChecked={developer.contract}
                />

                <FormsyCheckbox
                  label="Freelance"
                  className={css(formStyles.inline)}
                  name="freelance"
                  defaultChecked={developer.freelance}
                />

                <FormsyCheckbox
                  label="Internship"
                  className={css(formStyles.inline)}
                  name="internship"
                  defaultChecked={developer.internship}
                />

                <FormsyCheckbox
                  label="Startup"
                  className={css(formStyles.inline)}
                  name="startup"
                  defaultChecked={developer.startup}
                />
              </div>

              <div className="clearfix" />
              <div className="search-box level">
                <div className="header-separator">Level</div>
                <br />
                <FormsyCheckbox
                  label="CTO"
                  className={css(formStyles.inline)}
                  name="cto"
                  defaultChecked={developer.cto}
                />

                <FormsyCheckbox
                  label="Lead"
                  className={css(formStyles.inline)}
                  name="lead"
                  defaultChecked={developer.lead}
                />

                <FormsyCheckbox
                  label="Senior"
                  className={css(formStyles.inline)}
                  name="senior"
                  defaultChecked={developer.senior}
                />

                <FormsyCheckbox
                  label="Mid-level"
                  className={css(formStyles.inline)}
                  name="mid"
                  defaultChecked={developer.mid}
                />

                <FormsyCheckbox
                  label="Junior"
                  className={css(formStyles.inline)}
                  name="junior"
                  defaultChecked={developer.junior}
                />

                <FormsyCheckbox
                  label="Student"
                  className={css(formStyles.inline)}
                  name="student"
                  defaultChecked={developer.student}
                />
              </div>
            </div>

            <div className="clearfix" />
            <div className="actions">
              <RaisedButton
                label="Update"
                secondary
                type="submit"
                onClick={this.submitForm}
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

DeveloperEdit.propTypes = {
  developer: React.PropTypes.object,
};

const DeveloperEditContainer = Relay.createContainer(DeveloperEdit, {
  fragments: {
    developer: () => Relay.QL`
      fragment on Developer {
        id,
        name,
        bio,
        linkedin,
        location,

        platforms,

        hireable,

        remote,
        relocate,

        part_time,
        full_time,
        contract,
        freelance,
        internship,
        startup,

        cto,
        lead,
        senior,
        mid,
        junior,
        student,
      }
    `,
  },
});

export default DeveloperEditContainer;
