/* global Routes window */

import React, { Component } from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import _ from 'underscore';
import {
  FormsyCheckbox,
  FormsyText,
} from 'formsy-material-ui/lib';
import muiTheme from './theme.es6';
import UpdateDeveloper from '../mutations/developer/updateDeveloper.es6';

const helpStyles = {
  fontSize: '12px',
  color: 'rgba(0, 0, 0, 0.298039)',
  margin: '10px 0',
  display: 'block',
  userSelect: 'none',
};

const styles = {
  chip: {
    margin: 4,
  },
  wrapper: {
    display: 'flex',
    flexWrap: 'wrap',
  },

  preferences: {
    marginTop: 16,
  },

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


class DeveloperEdit extends Component {
  static onKeyPress(event) {
    if (event.keyCode === 13) {
      event.preventDefault();
    }
  }

  constructor(props) {
    super(props);
    this.renderChip = this.renderChip.bind(this);
    this.handleRequestDelete = this.handleRequestDelete.bind(this);
    this.clearValidationErrors = this.clearValidationErrors.bind(this);
    this.submitForm = this.submitForm.bind(this);
    this.addNewPlatform = this.addNewPlatform.bind(this);
    this.addNewJobType = this.addNewJobType.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);

    const platforms = props.developer.platforms.map((elem, index) => (
      { key: index, label: elem }
    ));

    const jobTypes = props.developer.job_types.map((elem, index) => (
      { key: index, label: elem }
    ));

    this.state = {
      open: false,
      value: 1,
      loaded: false,
      canSubmit: false,
      platforms,
      jobTypes,
      validationErrors: {},
    };
  }

  submitForm(event) {
    event.preventDefault();
    const platforms = this.state.platforms.map(elem => (
      elem.label
    ));

    const jobTypes = this.state.jobTypes.map(elem => (
      elem.label
    ));

    const onFailure = (transaction) => {
      const error = transaction.getError() || new Error('Mutation failed.');
    };

    const onSuccess = () => {
      window.location.href = Routes.root_path();
    };

    const newModel = _.pick(Object.assign(this.formNode.getModel(), {
      platforms: platforms.toString(),
      job_types: jobTypes.toString(),
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
        label: newPlatform,
      }]);

      this.setState({ platforms }, () => {
        this.platformNode.state.value = '';
        this.setState({
          canSubmit: true,
        });
      });
    }
  }

  addNewJobType(event) {
    if (event.keyCode === 13 || event.keyCode === 188 || event.keyCode === 32) {
      const newJobType = event.target.value.trim();
      if (newJobType === '') {
        this.setState({
          validationErrors: {
            job_types: 'Empty job type',
          },
        });

        setTimeout(() => {
          this.clearValidationErrors();
        }, 3000);

        return;
      }

      const isDuplicate = this.state.jobTypes.some(jobType => (
        jobType.label === newJobType
      ));

      if (isDuplicate) {
        this.jobTypeNode.state.value = '';

        this.setState({
          validationErrors: {
            job_types: 'Duplicate job type',
          },
        });

        setTimeout(() => {
          this.clearValidationErrors();
        }, 3000);

        return;
      }

      const jobTypes = this.state.jobTypes.concat([{
        key: this.state.jobTypes.length + 1,
        label: newJobType,
      }]);

      this.setState({ jobTypes }, () => {
        this.jobTypeNode.state.value = '';
        this.setState({
          canSubmit: true,
        });
      });
    }
  }

  handleRequestDelete(key) {
    this.platforms = this.state.platforms;
    const platformToDelete = this.platforms
    .map(platform => platform.key)
    .indexOf(key);
    this.platforms.splice(platformToDelete, 1);
    this.setState({ platforms: this.platforms });
  }

  handleRequestDeleteJobType(key) {
    this.jobTypes = this.state.jobTypes;
    const jobTypeToDelete = this.jobTypes
    .map(jobType => jobType.key)
    .indexOf(key);
    this.jobTypes.splice(jobTypeToDelete, 1);
    this.setState({ jobTypes: this.jobTypes });
  }

  renderChip(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleRequestDelete(data.key)}
        style={styles.chip}
      >
        {data.label}
      </Chip>
    );
  }

  renderJobTypeChip(data) {
    return (
      <Chip
        key={data.key}
        onRequestDelete={() => this.handleRequestDeleteJobType(data.key)}
        style={styles.chip}
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
            onKeyDown={DeveloperEdit.onKeyPress}
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
                defaultValue={developer.bio}
                floatingLabelText="A brief into"
                floatingLabelFixed
              />
            </div>

            <div className="search-box location">
              <FormsyText
                id="text-field-default"
                placeholder="(ex: London)"
                name="location"
                fullWidth
                defaultValue={developer.location}
                floatingLabelText="Where you based?"
                floatingLabelFixed
              />
            </div>

            <div className="search-box linkedin">
              <FormsyText
                id="text-field-default"
                placeholder="(ex: https://linkedin.com)"
                name="linkedin"
                fullWidth
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

            <div className="search-box platforms">
              <FormsyText
                id="text-field-default"
                placeholder="(ex: ruby, python)"
                name="platforms"
                onKeyDown={this.addNewPlatform}
                ref={node => (this.platformNode = node)}
                floatingLabelText="Languages and frameworks you want to work with"
                floatingLabelFixed
                fullWidth
              />

              <div style={styles.wrapper}>
                {this.state.platforms.map(this.renderChip, this)}
              </div>
            </div>

            <div className="header-separator top-margin">Preferences</div>
            <div className="search-box preferences" style={styles.preferences}>
              <FormsyCheckbox
                label="Available"
                style={styles.checkbox}
                name="hireable"
                defaultChecked={developer.hireable}
              />

              <FormsyCheckbox
                label="Willing to relocate?"
                style={styles.checkbox}
                name="relocate"
                defaultChecked={developer.relocate}
              />

              <FormsyCheckbox
                label="Prefer Remote"
                style={styles.checkbox}
                name="remote"
                defaultChecked={developer.remote}
              />

              <div className="search-box job_types">
                <FormsyCheckbox
                  label="Part-Time"
                  style={styles.checkbox}
                  name="part_time"
                  defaultChecked={developer.part_time}
                />

                <FormsyCheckbox
                  label="Full-Time"
                  style={styles.checkbox}
                  name="full_time"
                  defaultChecked={developer.full_time}
                />

                <FormsyCheckbox
                  label="Contract"
                  style={styles.checkbox}
                  name="contract"
                  defaultChecked={developer.contract}
                />

                <FormsyCheckbox
                  label="Freelance"
                  style={styles.checkbox}
                  name="freelance"
                  defaultChecked={developer.freelance}
                />

                <FormsyCheckbox
                  label="Internship"
                  style={styles.checkbox}
                  name="internship"
                  defaultChecked={developer.internship}
                />
              </div>

              <FormsyText
                id="text-field-default"
                placeholder="in USD($)"
                name="compensation"
                type="number"
                floatingLabelText="Expected Compensation per year"
                floatingLabelFixed
                updateImmediately
                defaultValue={developer.compensation}
                validations={{
                  isNumeric: true,
                  maxLength: 10,
                }}
                validationErrors={{
                  isNumeric: 'Should be a valid number',
                  maxLength: 'Maximum 10 figure',
                }}
              />
            </div>

            <div className="header-separator top-margin">
              Subscriptions
            </div>
            <div className="search-box subscribe" style={styles.preferences}>
              <FormsyCheckbox
                label="Looking for a new job? *"
                style={styles.checkbox}
                name="subscribed"
                defaultChecked={developer.subscribed}
              />
              <span style={helpStyles}>
                * Recruiters will be able to contact you
              </span>

              <FormsyText
                id="text-field-default"
                placeholder="5"
                name="subscriptions"
                floatingLabelText="Recruiter emails per week"
                floatingLabelFixed
                type="number"
                updateImmediately
                defaultValue={developer.subscriptions}
                validations={{
                  isNumeric: true,
                  maxLength: 2,
                }}
                validationErrors={{
                  isNumeric: 'Should be a valid number',
                  maxLength: 'Maximum 2 digits',
                }}
              />
            </div>

            <div className="actions">
              <RaisedButton
                label="Update"
                secondary
                type="submit"
                onClick={this.submitForm}
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

DeveloperEdit.propTypes = {
  developer: React.PropTypes.object,
};

const DeveloperEditContainer = Relay.createContainer(DeveloperEdit, {
  fragments: {
    developer: () => Relay.QL`
      fragment on Developer {
        id,
        name,
        remote,
        hireable,
        bio,
        linkedin,
        subscribed,
        relocate,
        platforms,
        job_types,
        compensation,
        subscriptions,
        location,
      }
    `,
  },
});

export default DeveloperEditContainer;
