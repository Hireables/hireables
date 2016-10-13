import React, { Component } from 'react';
import Relay from 'react-relay';
import Formsy from 'formsy-react';
import { orangeA700 } from 'material-ui/styles/colors';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import RaisedButton from 'material-ui/RaisedButton';
import Chip from 'material-ui/Chip';
import AutoComplete from 'material-ui/AutoComplete';
import _ from 'underscore';
import UpdateDeveloper from '../mutations/developer/updateDeveloper.es6';

import {
  FormsyCheckbox,
  FormsyText,
} from 'formsy-material-ui/lib';

const muiTheme = getMuiTheme({
  palette: {
    primary1Color: '#6986BD',
    accent1Color: '#6986BD',
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
  static onKeyPress(event) {
    console.log('I run');
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
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);

    const platforms = props.developer.platforms.map((elem, index) => {
      return { key: index, label: elem };
    });

    this.state = {
      open: false,
      value: 1,
      loaded: false,
      canSubmit: false,
      platforms,
      validationErrors: {},
    };
  }

  submitForm(event) {
    event.preventDefault();
    const platforms = this.state.platforms.map(elem => (
      elem.label
    ));

    const onFailure = (transaction) => {
      const error = transaction.getError() || new Error('Mutation failed.');
    };

    const onSuccess = (response) => {
      console.log(response);
    };

    const newModel = _.pick(Object.assign(this.formNode.getModel(), {
      platforms: platforms.toString()
    }), _.identity);

    Relay.Store.commitUpdate(new UpdateDeveloper({
      id: this.props.developer.id,
      ...newModel,
    }), { onFailure, onSuccess });

    console.log(newModel);
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
              onKeyDown={DeveloperEdit.onKeyPress}
              autoComplete="off"
              ref={node => (this.formNode = node)}
              onInvalid={this.disableButton}
              validationErrors={this.state.validationErrors}
            >
              <label className="header-separator">About</label>
              <div className="search-box bio">
                <FormsyText
                  id="text-field-default"
                  placeholder="(ex: I am a full-stack developer)"
                  autoFocus="true"
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
                  autoFocus="true"
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
                  autoFocus="true"
                  name="linkedin"
                  fullWidth
                  defaultValue={developer.linkedin}
                  floatingLabelText="Linkedin"
                  floatingLabelFixed
                />
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

              <label className="header-separator top-margin">Preferences</label>
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
              </div>

              <label className="header-separator top-margin">
                Subscribe
              </label>
              <div className="search-box subscribe" style={styles.preferences}>
                <FormsyCheckbox
                  label="Looking for a new job?*"
                  style={styles.checkbox}
                  name="subscribed"
                  defaultChecked={developer.subscribed}
                />
                <span style={helpStyles}>
                  Note: *Recruiters will be able to contact you
                </span>
              </div>

              <RaisedButton
                label="Apply filters"
                secondary
                type="submit"
                onClick={this.submitForm}
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
        hireable,
        bio,
        linkedin,
        subscribed,
        relocate,
        platforms,
        location,
      }
    `,
  },
});

export default DeveloperEditContainer;
