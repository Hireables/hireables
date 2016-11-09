/* global Routes $ */

// Modules
import React, { Component } from 'react';
import Relay from 'react-relay';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { List, ListItem } from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import Avatar from 'material-ui/Avatar';
import 'dialog-polyfill/dialog-polyfill.css';
import Checkbox from 'material-ui/Checkbox';
import update from 'immutability-helper';
import Snackbar from 'material-ui/Snackbar';

// Util
import muiTheme from '../../theme.es6';
import Dialog from '../../../utils/dialog.es6';

// Stylesheet
import '../../styles/popup.sass';
import '../../styles/pins.sass';

class Github extends Component {
  constructor(props) {
    super(props);
    this.enableButton = this.enableButton.bind(this);
    this.disableButton = this.disableButton.bind(this);
    this.selectRepo = this.selectRepo.bind(this);
    this.handleRequestClose = this.handleRequestClose.bind(this);
    this.savePinnedRepos = this.savePinnedRepos.bind(this);
    this.state = { selections: [], open: false };
  }

  componentDidMount() {
    this.dialog = new Dialog({
      reactNodeId: 'popups-container',
      dialogId: this.popupNode.id,
    });

    this.dialog.toggle();
    this.dialog.get().classList.add('pulse');
    setTimeout(() => {
      this.dialog.get().classList.remove('pulse');
    }, 300);
  }

  selectRepo(event, repo) {
    const uncheckedBoxes = $('.popup input:checkbox:not(:checked)');
    const index = this.state.selections.indexOf(repo.id);
    $(event.target).closest('.list-item').toggleClass('pinned');

    if (index === -1) {
      this.setState({
        selections: update(this.state.selections, { $push: [repo.id] }),
      }, () => {
        if (this.state.selections.length >= 6) {
          uncheckedBoxes.attr({ disabled: true });
          uncheckedBoxes.closest('.list-item').addClass('disabled');
        }
      });
    } else {
      this.setState({
        selections: update(this.state.selections, { $splice: [[index, 1]] }),
      }, () => {
        uncheckedBoxes.attr({ disabled: false });
        uncheckedBoxes.closest('.list-item').removeClass('disabled');
      });
    }
  }

  savePinnedRepos(event) {
    event.preventDefault();
    // const platforms = this.state.platforms.map(elem => (
    //   elem.label
    // ));

    // this.setNotification('Saving...');

    // const onFailure = (transaction) => {
    //   const error = transaction.getError() || new Error('Mutation failed.');
    //   let errorMessage;

    //   if (error.list.errors && Array.isArray(error.list.errors)) {
    //     errorMessage = error.list.errors[0].message;
    //   } else {
    //     errorMessage = error.message;
    //   }

    //   this.setNotification(errorMessage);
    // };

    // const onSuccess = () => {
    //   window.location.href = Routes.developer_path(this.props.developer.login);
    // };

    // const newModel = Object.assign(this.formNode.getModel(), {
    //   platforms: platforms.toString(),
    // });

    // Relay.Store.commitUpdate(new UpdateDeveloper({
    //   id: this.props.developer.id,
    //   ...newModel,
    // }), { onFailure, onSuccess });
  }

  handleRequestClose() {
    this.setState({
      open: false,
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
    const { developer } = this.props;
    return (
      <MuiThemeProvider muiTheme={muiTheme}>
        <dialog
          id={`developer-profile-${developer.id}`}
          className="popup"
          ref={node => (this.popupNode = node)}
        >
          <div className="import-container">
            <div className="list-header github">
              <div className="list-header-content">
                <h3 className="list-header-title">Pin Top Github Repos </h3>
                <span>Connect to import and pin your top github repos.</span>
              </div>
            </div>
            <Avatar
              size={50}
              className="close"
              onClick={() => this.dialog.close()}
              icon={<FontIcon className="material-icons">close</FontIcon>}
            />
            <div className="content">
              <List style={{ paddingBottom: 0, paddingTop: 0 }}>
                {developer.repos.edges.map(({ node }) => (
                  <ListItem
                    key={node.id}
                    className={`list-item ${node.pinned ? 'pinned' : ''}`}
                    leftCheckbox={
                      <Checkbox
                        disabled={this.state.disabled}
                        style={{ top: 'calc(100% / 3)' }}
                        onCheck={event => this.selectRepo(event, node)}
                      />
                    }
                    rightIcon={
                      <div
                        style={{
                          right: 20,
                          top: 20,
                          display: 'flex',
                          justifyContent: 'space-between',
                          color: '#777',
                        }}
                      >
                        {node.stargazers_count}
                        <FontIcon
                          color="#777"
                          className="material-icons"
                        >
                          star
                        </FontIcon>
                      </div>
                    }

                    primaryText={node.name}
                    secondaryText={
                      <span
                        className="description"
                        style={{ maxWidth: '70%' }}
                      >
                        {node.description}
                      </span>
                    }
                    secondaryTextLines={2}
                  />
                ))}
              </List>
            </div>
            <div className="actions">
              <span className="notification">
                {6 - this.state.selections.length} remaining
              </span>
              <RaisedButton
                label="Save pinned repos"
                primary
                className="pull-right"
                type="submit"
                onClick={this.savePinnedRepos}
              />
            </div>

            <div className="notifications">
              <Snackbar
                open={this.state.open}
                message="Maximum 6 selections allowed"
                autoHideDuration={5000}
                onRequestClose={this.handleRequestClose}
              />
            </div>
          </div>
        </dialog>
      </MuiThemeProvider>
    );
  }
}

Github.propTypes = {
  developer: React.PropTypes.object,
};

const GithubContainer = Relay.createContainer(
  Github, {
    initialVariables: {
      first: 20,
    },

    fragments: {
      developer: () => Relay.QL`
        fragment on Developer {
          id,
          repos(first: $first) {
            edges {
              node {
                id,
                name,
                full_name,
                description,
                pinned,
                stargazers_count,
                html_url,
                forks_count,
                language,
              }
            }
          }
        }
      `,
    },
  }
);

export default GithubContainer;
