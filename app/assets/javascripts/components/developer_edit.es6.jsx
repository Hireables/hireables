import React, { Component } from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import { orangeA700 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import _ from 'underscore';

import {
  FormsyCheckbox,
  FormsyText,
} from 'formsy-material-ui/lib';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: orangeA700,
    accent1Color: orangeA700,
  },
});

const helpStyles = {
  fontSize: '12px',
  color: 'rgba(0, 0, 0, 0.298039)',
  margin: '10px 0',
  display: 'block',
  userSelect: 'none',
};

const formStyles = {
  backgroundColor: 'white',
  padding: '10px',
  boxShadow: '0 0 16px 0 rgba(63,67,69,0.3)',
  width: '600px',
  margin: '50px auto',
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
  constructor(props) {
    super(props);
    this.renderChip = this.renderChip.bind(this);
    this.clearValidationErrors = this.clearValidationErrors.bind(this);
    this.addNewPlatform = this.addNewPlatform.bind(this);
    this.addNewJob = this.addNewJob.bind(this);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);

    this.state = {
      open: false,
      value: 1,
      loaded: false,
      canSubmit: false,
      platforms: props.developer.platforms,
      jobs: props.developer.jobs,
      validationErrors: {},
    };
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

      const platforms = this.state.platforms.concat(
        [{ key: this.state.platforms.length, label: newPlatform }]
      );

      this.setState({ platforms }, () => {
        this.platformNode.state.value = '';
        this.setState({
          canSubmit: true,
        });
      });
    }
  }

  addNewJob(event) {
    if (event.keyCode === 13 || event.keyCode === 188 || event.keyCode === 32) {
      const newJob = event.target.value.trim();

      if (newJob === '') {
        this.setState({
          validationErrors: {
            jobs: 'Empty job',
          },
        });

        setTimeout(() => {
          this.clearValidationErrors();
        }, 3000);

        return;
      }

      const isDuplicate = this.state.jobs.some(job => (
        job.label === newJob
      ));

      if (isDuplicate) {
        this.jobNode.state.value = '';

        this.setState({
          validationErrors: {
            jobs: 'Duplicate job',
          },
        });

        setTimeout(() => {
          this.clearValidationErrors();
        }, 3000);

        return;
      }

      const jobs = this.state.jobs.concat(
        [{ key: this.state.jobs.length, label: newJob }]
      );

      this.setState({ jobs }, () => {
        this.jobNode.state.value = '';
        this.setState({
          canSubmit: true,
        });
      });
    }
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


  render() {
    const wrapperStyle = {
      paddingTop: '60px',
      paddingBottom: '60px',
      textAlign: 'center',
    };

    const { developer } = this.props;

    return (
       <MuiThemeProvider muiTheme={muiTheme}>
          <div className="developer-edit" style={formStyles}>
            <Formsy.Form
              onValid={this.enableButton}
              onKeyPress={this.onKeyPress}
              autoComplete="off"
              ref={node => (this.formNode = node)}
              onInvalid={this.disableButton}
              validationErrors={this.state.validationErrors}
            >
              <div className="search-box city">
                <FormsyText
                  id="text-field-default"
                  placeholder="(ex: London)"
                  autoFocus="true"
                  name="city"
                  fullWidth
                  defaultValue={developer.city}
                  floatingLabelText="Where you based?"
                  floatingLabelFixed
                />
              </div>

              <div className="search-box jobs">
                <FormsyText
                  id="text-field-default"
                  placeholder="(ex: full-time, part-time, remote, contract)"
                  name="jobs"
                  onKeyDown={this.addNewJob}
                  ref={node => (this.jobNode = node)}
                  floatingLabelText="Enter jobs interested in"
                  floatingLabelFixed
                  fullWidth
                />

                <div style={styles.wrapper}>
                  {this.state.jobs.map(this.renderChip, this)}
                </div>
              </div>

              <div className="search-box platforms">
                <FormsyText
                  id="text-field-default"
                  placeholder="(ex: ruby, python)"
                  name="platforms"
                  onKeyDown={this.addNewPlatform}
                  ref={node => (this.platformNode = node)}
                  floatingLabelText="Enter languages and frameworks you want to work with"
                  floatingLabelFixed
                  fullWidth
                />

                <div style={styles.wrapper}>
                  {this.state.platforms.map(this.renderChip, this)}
                </div>
              </div>

              <div className="search-box preferences" style={styles.preferences}>
                <FormsyCheckbox
                  label="Available now?"
                  style={styles.checkbox}
                  name="available"
                  defaultValue={developer.available}
                />

                <FormsyCheckbox
                  label="Willing to relocate?"
                  style={styles.checkbox}
                  name="relocate"
                  defaultValue={developer.relocate}
                />

                <FormsyCheckbox
                  label="Prefer Remote"
                  style={styles.checkbox}
                  name="remote"
                  defaultValue={developer.remote}
                />

                <FormsyCheckbox
                  label="Looking for a job?"
                  style={styles.checkbox}
                  name="subscribed"
                  defaultValue={developer.subscribed}
                />
                <span style={helpStyles}>
                  Recruiters will be able to contact you
                </span>
              </div>

              <RaisedButton
                label="Apply filters"
                secondary
                type="submit"
                onClick={this.submitSearch}
                disabled={!this.state.canSubmit}
                style={styles.button}
              />
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
        available,
        jobs,
        platforms,
        city,
      }
    `,
  },
});

export default DeveloperEditContainer;
